'use client'

import dynamic from 'next/dynamic'
import type { Location } from '@/data/locations'

const ServiceAreasMap = dynamic(() => import('@/components/ServiceAreasMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] lg:h-[560px] bg-[#0d0f0d] rounded-xl border border-white/10 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Loading map&hellip;</span>
      </div>
    </div>
  ),
})

export default function ServiceAreasMapLoader({ locations }: { locations: Location[] }) {
  return <ServiceAreasMap locations={locations} />
}
