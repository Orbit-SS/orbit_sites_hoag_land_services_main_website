'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import type { Location, ServiceCategory } from '@/data/locations'
import { SERVICE_CATEGORIES } from '@/data/locations'

/* ── Types ─────────────────────────────────────────────────────── */

interface CountyData {
  name: string
  label: string
  center: [number, number]
  locations: Location[]
}

interface MapData {
  counties: Record<string, CountyData>
  hq: { lng: number; lat: number; label: string; address: string }
}

/* ── County center coordinates [lng, lat] ──────────────────────── */

const COUNTY_CENTERS: Record<string, [number, number]> = {
  'Volusia':   [-81.18, 29.03],
  'Flagler':   [-81.26, 29.47],
  'Seminole':  [-81.24, 28.72],
  'Orange':    [-81.38, 28.50],
  'Lake':      [-81.73, 28.82],
  'Putnam':    [-81.68, 29.62],
  'St. Johns': [-81.39, 29.90],
  'Marion':    [-82.05, 29.18],
  'Brevard':   [-80.72, 28.30],
}

const HQ = {
  lng: -81.3584,
  lat: 29.1244,
  label: 'Hoag Land Services HQ',
  address: 'DeLeon Springs, FL 32130',
}

const SERVICE_KEYS: ServiceCategory[] = ['tree', 'site', 'fence']

/* ── Component ────────────────────────────────────────────────── */

export default function ServiceAreasMap({ locations }: { locations: Location[] }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapboxglRef = useRef<typeof import('mapbox-gl').default | null>(null)
  const hqPopupRef = useRef<mapboxgl.Popup | null>(null)
  const [activeCounty, setActiveCounty] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Build county data
  const mapData: MapData = (() => {
    const counties: Record<string, CountyData> = {}
    for (const loc of locations) {
      if (!counties[loc.county]) {
        counties[loc.county] = {
          name: `${loc.county} County`,
          label: loc.county,
          center: COUNTY_CENTERS[loc.county] || [-81.3, 29.0],
          locations: [],
        }
      }
      counties[loc.county].locations.push(loc)
    }
    // Sort locations within each county
    for (const c of Object.values(counties)) {
      c.locations.sort((a, b) => {
        const p = { high: 0, medium: 1, low: 2 }
        return (p[a.priority] - p[b.priority]) || a.name.localeCompare(b.name)
      })
    }
    return { counties, hq: HQ }
  })()

  const countyKeys = Object.keys(mapData.counties).sort((a, b) => {
    const diff = mapData.counties[b].locations.length - mapData.counties[a].locations.length
    return diff !== 0 ? diff : a.localeCompare(b)
  })

  // Helper: update the active pin highlight on the native layers
  const updateActiveLayer = useCallback((slug: string | null) => {
    const map = mapRef.current
    if (!map || !map.getLayer('county-dots')) return
    // Active dot: only the selected county
    map.setFilter('county-dots-active', slug ? ['==', ['get', 'slug'], slug] : ['==', 'slug', '__none__'])
    // Active label: only the selected county
    map.setFilter('county-labels-active', slug ? ['==', ['get', 'slug'], slug] : ['==', 'slug', '__none__'])
  }, [])

  // Select county handler
  const selectCounty = useCallback((slug: string) => {
    setActiveCounty(slug)
    updateActiveLayer(slug)

    // Fly to county
    if (mapRef.current && COUNTY_CENTERS[slug]) {
      mapRef.current.flyTo({
        center: COUNTY_CENTERS[slug],
        zoom: 9.5,
        duration: 1200,
      })
    }

    // Mobile: scroll to detail panel
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('sa-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }

    // URL hash
    history.replaceState(null, '', `#${slug.toLowerCase().replace(/\.\s/g, '-').replace(/\s/g, '-')}`)
  }, [updateActiveLayer])

  // Init Mapbox
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const loadMapbox = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      await import('mapbox-gl/dist/mapbox-gl.css')
      mapboxglRef.current = mapboxgl

      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-81.35, 29.10],
        zoom: 7.8,
        minZoom: 6.5,
        maxZoom: 12,
        dragRotate: false,
        pitchWithRotate: false,
        touchPitch: false,
        attributionControl: false,
      })

      mapRef.current = map

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-left')
      map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-left')

      map.on('load', () => {
        setMapLoaded(true)

        // ── Build GeoJSON for county pins ──
        const countyFeatures = Object.entries(mapData.counties).map(([slug, county]) => ({
          type: 'Feature' as const,
          geometry: { type: 'Point' as const, coordinates: county.center },
          properties: { slug, label: county.label.toUpperCase(), count: county.locations.length },
        }))

        map.addSource('counties', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: countyFeatures },
        })

        // ── County dots (default state) ──
        map.addLayer({
          id: 'county-dots',
          type: 'circle',
          source: 'counties',
          paint: {
            'circle-radius': 8,
            'circle-color': '#4a7c59',
            'circle-stroke-width': 3,
            'circle-stroke-color': '#ffffff',
          },
        })

        // ── County dots (active / selected) ──
        map.addLayer({
          id: 'county-dots-active',
          type: 'circle',
          source: 'counties',
          filter: ['==', 'slug', '__none__'],   // nothing selected initially
          paint: {
            'circle-radius': 11,
            'circle-color': '#c2a878',
            'circle-stroke-width': 3,
            'circle-stroke-color': '#1a1c1a',
          },
        })

        // ── County labels (default) ──
        map.addLayer({
          id: 'county-labels',
          type: 'symbol',
          source: 'counties',
          layout: {
            'text-field': ['get', 'label'],
            'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
            'text-size': 11,
            'text-offset': [0, 1.6],
            'text-anchor': 'top',
            'text-letter-spacing': 0.05,
            'text-allow-overlap': true,
            'text-ignore-placement': true,
          },
          paint: {
            'text-color': '#ffffff',
            'text-halo-color': 'rgba(0,0,0,0.8)',
            'text-halo-width': 2,
          },
        })

        // ── County labels (active / selected) ──
        map.addLayer({
          id: 'county-labels-active',
          type: 'symbol',
          source: 'counties',
          filter: ['==', 'slug', '__none__'],
          layout: {
            'text-field': ['get', 'label'],
            'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
            'text-size': 13,
            'text-offset': [0, 1.4],
            'text-anchor': 'top',
            'text-letter-spacing': 0.05,
            'text-allow-overlap': true,
            'text-ignore-placement': true,
          },
          paint: {
            'text-color': '#c2a878',
            'text-halo-color': 'rgba(0,0,0,0.9)',
            'text-halo-width': 2,
          },
        })

        // ── HQ marker (native layer) ──
        map.addSource('hq', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [HQ.lng, HQ.lat] },
              properties: { label: HQ.label, address: HQ.address },
            }],
          },
        })

        // HQ uses a simple triangle/diamond icon via circle + label
        map.addLayer({
          id: 'hq-dot',
          type: 'circle',
          source: 'hq',
          paint: {
            'circle-radius': 7,
            'circle-color': '#4a7c59',
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#c2a878',
          },
        })
        map.addLayer({
          id: 'hq-label',
          type: 'symbol',
          source: 'hq',
          layout: {
            'text-field': 'HQ',
            'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
            'text-size': 10,
            'text-offset': [0, 1.5],
            'text-anchor': 'top',
            'text-allow-overlap': true,
            'text-ignore-placement': true,
          },
          paint: {
            'text-color': '#c2a878',
            'text-halo-color': 'rgba(0,0,0,0.8)',
            'text-halo-width': 1.5,
          },
        })

        // ── HQ popup on click ──
        const hqPopup = new mapboxgl.Popup({ offset: 14, closeButton: false, className: 'sa-hq-popup' })
        hqPopupRef.current = hqPopup

        map.on('click', 'hq-dot', (e) => {
          if (!e.features?.[0]) return
          const coords = (e.features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number]
          hqPopup
            .setLngLat(coords)
            .setHTML(`<strong>${HQ.label}</strong><br>${HQ.address}`)
            .addTo(map)
        })

        // ── Click on county dots ──
        map.on('click', 'county-dots', (e) => {
          if (!e.features?.[0]) return
          const slug = e.features[0].properties?.slug
          if (slug) selectCounty(slug)
        })
        map.on('click', 'county-dots-active', (e) => {
          if (!e.features?.[0]) return
          const slug = e.features[0].properties?.slug
          if (slug) selectCounty(slug)
        })

        // ── Pointer cursor on interactive layers ──
        const interactiveLayers = ['county-dots', 'county-dots-active', 'county-labels', 'county-labels-active', 'hq-dot']
        for (const layer of interactiveLayers) {
          map.on('mouseenter', layer, () => { map.getCanvas().style.cursor = 'pointer' })
          map.on('mouseleave', layer, () => { map.getCanvas().style.cursor = '' })
        }

        // Also allow clicking on labels to select
        map.on('click', 'county-labels', (e) => {
          if (!e.features?.[0]) return
          const slug = e.features[0].properties?.slug
          if (slug) selectCounty(slug)
        })
        map.on('click', 'county-labels-active', (e) => {
          if (!e.features?.[0]) return
          const slug = e.features[0].properties?.slug
          if (slug) selectCounty(slug)
        })

        // ── Fit bounds ──
        const bounds = new mapboxgl.LngLatBounds()
        Object.values(mapData.counties).forEach(c => bounds.extend(c.center))
        map.fitBounds(bounds, { padding: 60, maxZoom: 9 })

        // ── Check URL hash ──
        const h = location.hash.replace('#', '').replace(/-/g, ' ')
        const matchedCounty = countyKeys.find(k => k.toLowerCase().replace(/\.\s/g, ' ') === h.toLowerCase())
        if (matchedCounty) {
          setTimeout(() => selectCounty(matchedCounty), 500)
        }
      })
    }

    loadMapbox()

    return () => {
      hqPopupRef.current?.remove()
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Active county data
  const activeData = activeCounty ? mapData.counties[activeCounty] : null

  return (
    <>
      {/* ── Map styles (native layers need no marker CSS — only popup + control overrides) ── */}
      <style jsx global>{`
        /* ── HQ popup ── */
        .sa-hq-popup .mapboxgl-popup-content {
          background: #141614;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .sa-hq-popup .mapboxgl-popup-tip {
          border-top-color: #141614;
        }
        .sa-hq-popup strong {
          color: #c2a878;
        }

        /* ── Mapbox control overrides for dark theme ── */
        .mapboxgl-ctrl-group {
          background: #141614 !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 8px !important;
          overflow: hidden;
        }
        .mapboxgl-ctrl-group button {
          border-color: rgba(255,255,255,0.05) !important;
        }
        .mapboxgl-ctrl-group button span {
          filter: invert(1);
        }
        .mapboxgl-ctrl-attrib {
          background: rgba(20,22,20,0.8) !important;
          border-radius: 4px !important;
        }
        .mapboxgl-ctrl-attrib a {
          color: rgba(255,255,255,0.4) !important;
        }
      `}</style>

      {/* ── Layout: map + detail panel ── */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* MAP */}
        <div className="lg:w-[58%] lg:sticky lg:top-24 lg:self-start">
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0d0f0d]">
            <div
              ref={mapContainer}
              className="w-full h-[350px] sm:h-[420px] lg:h-[560px]"
              aria-label="Interactive map of Hoag Land Services coverage across 9 Central Florida counties"
            />
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0d0f0d]">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-gray-500">Loading map&hellip;</span>
                </div>
              </div>
            )}
          </div>
          {/* Map legend */}
          <div className="flex items-center gap-5 mt-3 px-1 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#4a7c59] border-2 border-white inline-block" />
              County
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#c2a878] border-2 border-[#1a1c1a] inline-block" />
              Selected
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v13h18V7L12 2z" fill="#4a7c59" stroke="#fff" strokeWidth="2"/>
              </svg>
              HQ
            </span>
          </div>
        </div>

        {/* DETAIL PANEL */}
        <div className="lg:w-[42%]" id="sa-detail">
          <div className="bg-[#141614] border border-white/5 rounded-xl min-h-[400px]">
            {!activeData ? (
              /* ── Default state ── */
              <div className="p-6 sm:p-8">
                <h2 className="font-display text-xl sm:text-2xl font-bold uppercase mb-5">
                  Explore Our Coverage
                </h2>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-[#1a1c1a] rounded-lg p-4 text-center">
                    <span className="block font-display text-2xl font-bold text-[#c2a878]">
                      {countyKeys.length}
                    </span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Counties</span>
                  </div>
                  <div className="bg-[#1a1c1a] rounded-lg p-4 text-center">
                    <span className="block font-display text-2xl font-bold text-[#c2a878]">
                      {locations.length}
                    </span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Areas</span>
                  </div>
                  <div className="bg-[#1a1c1a] rounded-lg p-4 text-center">
                    <span className="block font-display text-2xl font-bold text-[#c2a878]">3</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Services</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-6">
                  Click a pin on the map to explore the communities we serve and browse available services in that county.
                </p>

                {/* County quick-select buttons */}
                <div className="flex flex-wrap gap-2">
                  {countyKeys.map(county => (
                    <button
                      key={county}
                      type="button"
                      onClick={() => selectCounty(county)}
                      className="flex items-center gap-2 bg-[#1a1c1a] hover:bg-[#4a7c59]/10 border border-white/5 hover:border-[#4a7c59]/30 rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white transition-all duration-200"
                    >
                      {county}
                      <span className="text-xs text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">
                        {mapData.counties[county].locations.length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* ── County detail ── */
              <div className="p-6 sm:p-8 animate-in fade-in duration-300">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                  <button
                    onClick={() => {
                      setActiveCounty(null)
                      updateActiveLayer(null)
                      if (mapRef.current && mapboxglRef.current) {
                        const bounds = new mapboxglRef.current.LngLatBounds()
                        Object.values(mapData.counties).forEach(c => bounds.extend(c.center))
                        mapRef.current.fitBounds(bounds, { padding: 60, maxZoom: 9 })
                      }
                      history.replaceState(null, '', location.pathname)
                    }}
                    className="text-sm text-gray-500 hover:text-[#c2a878] transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    All Counties
                  </button>
                  <span className="text-xs text-gray-600 bg-white/5 px-2 py-1 rounded">
                    {activeData.locations.length} {activeData.locations.length === 1 ? 'area' : 'areas'}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold uppercase text-[#c2a878] mb-4">
                  {activeData.name}
                </h2>

                {/* City list with expandable services */}
                <div className="space-y-1.5">
                  {activeData.locations.map(loc => (
                    <CityAccordion key={loc.slug} location={loc} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

/* ── City accordion item ──────────────────────────────────────── */

function CityAccordion({ location }: { location: Location }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`border border-white/5 rounded-lg overflow-hidden transition-colors ${open ? 'bg-[#1a1c1a] border-[#4a7c59]/20' : 'bg-[#0d0f0d]/50'}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div>
          <span className="text-sm font-semibold text-white">{location.name}</span>
          <span className="text-xs text-gray-600 ml-2">{location.zipCodes.slice(0, 2).join(', ')}</span>
        </div>
        <svg
          className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 8"
          fill="none"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 px-4 pb-3">
          {SERVICE_KEYS.map(key => {
            const cat = SERVICE_CATEGORIES[key]
            return (
              <Link
                key={key}
                href={`/services/${cat.slug}/${location.slug}`}
                className="flex items-center gap-2 text-xs bg-[#4a7c59]/8 hover:bg-[#4a7c59]/15 text-[#4a7c59] hover:text-[#5a9c6d] rounded px-3 py-2 transition-colors"
              >
                <ServiceIcon service={key} />
                {cat.name}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ── Service icons ────────────────────────────────────────────── */

function ServiceIcon({ service }: { service: ServiceCategory }) {
  const cls = 'w-3.5 h-3.5 shrink-0'
  switch (service) {
    case 'tree':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V8m0 0l-4 4m4-4l4 4M7 3h10l-2 5H9L7 3z" />
        </svg>
      )
    case 'site':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14" />
        </svg>
      )
    case 'fence':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M7 3v18M12 3v18M17 3v18" />
        </svg>
      )
  }
}
