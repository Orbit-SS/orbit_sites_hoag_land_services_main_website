/**
 * Content generator for location pages.
 * Produces unique LocationPageData for each location × service combination.
 *
 * Hand-crafted content from the existing 9 Tier 1 pages is preserved.
 * All other locations use template-based generation with location-specific details.
 */

import type { LocationPageData } from '@/types/location'
import type { Location, ServiceCategory } from './locations'
import { SERVICE_CATEGORIES, ALL_LOCATIONS, getLocation } from './locations'
import {
  PHONE,
  PHONE_HREF,
  COMPANY,
  REVIEW_STATS,
  CERTS,
  EST_YEAR,
  REVIEWS,
} from '@/shared/constants'

// ──────────────────────────────────────────────────────
// HAND-CRAFTED LOCAL CONTEXT (from Tier 1 agent builds)
// ──────────────────────────────────────────────────────

const HAND_CRAFTED_CONTEXT: Record<string, string> = {
  'orlando-tree': [
    "<p>Orlando is the biggest market we cover and the one where the trees are oldest relative to the houses. The established neighborhoods inside the 408 and along the chain of lakes were platted when live oaks and camphors were planted as street trees, and those are now eighty to a hundred years old with canopies spreading over roofs, driveways and power lines that were never planned around them.</p>",
    "<p>Orlando is an incorporated city, so the city&rsquo;s own arbor rules apply rather than Orange County&rsquo;s, and they are stricter than most people expect. Trees above a certain trunk diameter need a permit before removal, replacement planting can be required as a condition, and a tree that is genuinely dead or dangerous is handled differently from one that is simply inconvenient. We check which case yours is against your address before quoting, and we file the paperwork rather than handing you a form.</p>",
    "<p>The work splits between two very different jobs here. On older lots it is structural pruning and risk assessment on mature canopy, usually because something is now over a roof or a pool cage. On newer ground toward the edges it is clearing and grading, where a lot needs opening up before anything else happens. We do both with the same crew.</p>",
    "<p>We are based in DeLeon Springs and we travel for Orlando work, which means we quote it honestly: if the job is small enough that travel makes us the wrong call, we will say so. Tyler Hoag is ISA Certified (FL-9491A) and Tree Risk Assessment Qualified, so where you need a written opinion for a permit, an insurer or an HOA, it comes from somebody qualified to sign it.</p>",
  ].join('\n'),

  'deltona-tree': [
    "<p>Deltona is the largest city in Volusia County and almost all of it went up at once. The subdivisions were cut into sandy pine flatwoods from the sixties onward, and the slash pine, laurel oak and water oak left standing or planted at buildout are now fifty and sixty years old on quarter-acre lots they have long outgrown.</p>",
    "<p>That history is why the calls here are what they are. Laurel oaks and water oaks are not long-lived trees. They hollow at the trunk and start shedding structural limbs at exactly this age, often while the crown above still looks green and healthy, which is why the first sign of trouble is usually a limb on a roof rather than a dead-looking tree. Slash pine in a cleared lot, left standing without the stand around it, is a different problem: it grew tall and thin for the company it used to have.</p>",
    "<p>Deltona is incorporated, so the city&rsquo;s tree ordinance governs rather than Volusia County&rsquo;s, and the thresholds and forms are its own. We check your address against the right set before we quote and we deal with the application. Being fifteen miles from base, this is a short run for us, not a trip we price as one.</p>",
    "<p>We handle removal and hazard work, crown reduction and structural pruning, palm pruning, storm response and stump grinding, and written tree risk assessments from an ISA Certified Arborist (FL-9491A, TRAQ qualified). If you have an oak over the house you are not sure about, that assessment is usually what settles it either way.</p>",
  ].join('\n'),

  'ormond-beach-tree': [
    "<p>Ormond Beach runs from the Halifax River to the Atlantic, and the tree work changes completely depending on which side of the river you are on. Beachside, everything lives in salt air and wind, and the canopy is lower, tougher and more sculpted by weather. On the mainland, particularly the older streets near the river and along the Loop, there are live oaks with genuine age on them and the arching canopy that goes with it.</p>",
    "<p>Those older live oaks are the reason to call an arborist rather than a tree cutter. A mature live oak is a long-lived, structurally sound tree that in most cases should be pruned and kept, not removed, and the difference between reducing a limb properly and topping a tree is the difference between another fifty years and a decade of decline. We will tell you when a tree should stay.</p>",
    "<p>Ormond Beach is incorporated, so the city&rsquo;s own tree rules apply instead of the county&rsquo;s. Coastal and riverfront parcels can carry an extra layer on top of that depending on where the work sits. We check both against your specific address before quoting, which is better found out before the equipment arrives.</p>",
    "<p>Hurricane exposure here is real and recurring, so a good share of what we do is storm response and the pruning that reduces what storms can take. Tyler Hoag is ISA Certified (FL-9491A) and Tree Risk Assessment Qualified. Call for an honest read and a no-pressure estimate.</p>",
  ].join('\n'),

  'new-smyrna-beach-tree': [
    "<p>New Smyrna Beach is two places as far as trees are concerned. On the barrier island it is salt wind, sandy soil, cabbage palm and sculpted scrub, where the work is mostly palm pruning, storm cleanup and keeping growth off roofs and decks. On the mainland, through the historic streets off Canal and out toward the river, there are large live oaks over narrow lots and older houses.</p>",
    "<p>The island side rewards maintenance over removal. Wind-pruned coastal canopy is doing a job, and taking too much off a tree that has grown into its exposure usually makes the next storm worse rather than better. The mainland oaks are the opposite question: big, long-lived trees where the right answer is almost always structural pruning and a clear-eyed look at what is actually over the house.</p>",
    "<p>New Smyrna Beach is an incorporated city, so its tree ordinance applies rather than Volusia County&rsquo;s, with its own thresholds and its own forms. Waterfront and island parcels can bring an additional layer. We check your address against the right set before we quote, and we handle the application.</p>",
    "<p>We cover removal, crown reduction and structural pruning, palm pruning, storm response, stump grinding, and written assessments from an ISA Certified Arborist (FL-9491A, TRAQ qualified). Call for an honest read and a no-pressure estimate.</p>",
  ].join('\n'),

  'flagler-beach-tree': [
    "<p>Flagler Beach is a small coastal city on a narrow strip between the Atlantic and the Intracoastal, and almost everything about tree work here follows from that. Salt wind, sandy soil, and lots where the distance from the ocean to the back fence is measured in feet rather than acres. Cabbage palm, live oak that has grown low and wide into the wind, and very little room to drop anything.</p>",
    "<p>Access is the thing that decides most jobs here. Narrow lots, close neighbors, overhead lines along the older streets and limited room to stage equipment mean the work has to be planned and rigged rather than simply felled. That is not a reason to pay more; it is a reason to use somebody who has done it on this kind of lot before.</p>",
    "<p>Flagler Beach is incorporated, so the city&rsquo;s own rules apply rather than Flagler County&rsquo;s, and coastal parcels can carry an extra layer depending on where the work sits. We check your address before quoting rather than after.</p>",
    "<p>Storm exposure here is as direct as it gets on this coast, so storm response and the preventative pruning that limits damage are a large part of what we do. Tyler Hoag is ISA Certified (FL-9491A) and Tree Risk Assessment Qualified. Call for an honest read and a no-pressure estimate.</p>",
  ].join('\n'),

  'maitland-fence': [
    "<p>Maitland is an established Orange County suburb with mature lots, serious tree canopy and a lot of properties backing onto water or conservation. That combination decides most of the fencing here: posts going into root-heavy ground, lines that have to work around trunks you are not allowed to remove, and rear boundaries where what you can build is not entirely up to you.</p>",
    "<p>The practical consequence is that the layout matters more than the material. A fence line surveyed around existing canopy, with post positions planned instead of spaced evenly on paper, lasts longer and looks like it belongs. Running a line straight through a root plate damages the tree and eventually the fence.</p>",
    "<p>We install wood privacy, vinyl, aluminum and chain link, plus gates sized for the access you actually need rather than the standard width. Maitland is incorporated, so the city&rsquo;s own permitting and height rules apply rather than Orange County&rsquo;s, and corner lots and waterfront boundaries have their own constraints. We check before quoting.</p>",
    "<p>Because we also do tree work and land clearing, a fence line that needs clearing first is one crew and one schedule rather than two. Call for a measured quote and a no-pressure estimate.</p>",
  ].join('\n'),

  'ocoee-fence': [
    "<p>Ocoee sits on the west side of Orlando and most of its housing stock is newer subdivision ground, which makes for a specific kind of fencing job: rear boundaries shared three ways, HOA rules about material, color and height, and lots where the usable yard is smaller than the plat suggests once easements are accounted for.</p>",
    "<p>The HOA question is usually the one that decides the job. Many Ocoee communities specify permitted materials and heights, and some require approval before anything goes in. We will tell you at the quote what is likely to apply to your community rather than building something that has to come down.</p>",
    "<p>We install wood privacy, vinyl, aluminum and chain link, with gate widths set to the access you need for a mower, a trailer or a pool build rather than whatever is standard. Ocoee is incorporated, so city permitting applies rather than Orange County&rsquo;s.</p>",
    "<p>Because we run tree and land clearing crews as well, a boundary that needs undergrowth or a line of scrub taken out first is handled by the same outfit on the same schedule. Call for a measured quote and a no-pressure estimate.</p>",
  ].join('\n'),

  'lake-mary-fence': [
    "<p>Lake Mary fencing is mostly about two things: established subdivisions with HOA requirements, and lots where mature canopy sits exactly where a boundary wants to run. Both are solvable, and both are better dealt with at the quote rather than on install day.</p>",
    "<p>On the tree side we have an advantage here, because we are arborists as well as fencers. A post line planned around a root plate protects the tree and the fence; cutting through roots to hold a straight line damages both and is the usual reason a panel goes out of true a couple of years later. We survey the line with the trees in mind.</p>",
    "<p>Lake Mary is an incorporated city, so the city&rsquo;s own permitting, height and setback rules apply rather than Seminole County&rsquo;s. That catches people out, because a neighbor on unincorporated land nearby is working to a different set entirely. We check your address against the right one before quoting.</p>",
    "<p>We install wood privacy, vinyl, aluminum and chain link, with gates sized for real access. If the line needs clearing first, that is the same crew and the same schedule. Call for a measured quote and a no-pressure estimate.</p>",
  ].join('\n'),


  // DeLeon Springs, Volusia County — unincorporated, and Hoag's own base. Named
  // by Tyler as a focus town. Being the local outfit is the whole advantage here,
  // so the copy leads with it instead of burying it.
  'deleon-springs-tree': [
    "<p>DeLeon Springs is where we are based, so this is the one town where you are not hiring somebody who drives in from a county over. It is unincorporated Volusia, strung along US 17 between DeLand and Pierson, with the state park and the spring at its center and large wooded lots running back off the highway on both sides. Live oaks, water oaks, slash pine, and a lot of cabbage palm.</p>",
    "<p>Because it is unincorporated, Volusia County&rsquo;s rules govern tree removal here rather than a city ordinance, and the trunk-diameter thresholds are what decide whether your job needs a permit. We check your specific parcel before quoting and we handle the paperwork rather than handing you a form to work out. If your lot backs onto wetland or the spring run, there can be a second layer on top of that, and it is better to know before the equipment arrives than after.</p>",
    "<p>The work here splits two ways. On the residential side it is hazard removals, structural pruning on oaks that have grown over a roof or a drive, palm pruning, and storm cleanup. On the acreage side it is clearing, forestry mulching, and getting a building pad or a pasture ready, which is the other half of what we do. Plenty of DeLeon Springs properties need both, and it is the same crew either way.</p>",
    "<p>Tyler Hoag is ISA Certified (FL-9491A) and Tree Risk Assessment Qualified, so if you need a written opinion on whether an oak is actually a hazard or just looks like one, you get a report from somebody qualified to write it. Call for an honest read and a no-pressure estimate.</p>",
  ].join('\n'),

  // Pierson, Volusia County — incorporated town, and the fern capital. The
  // agricultural angle is the thing a generated page would never produce, and it
  // is most of why the calls here are different from DeLand's.
  'pierson-tree': [
    "<p>Pierson calls itself the Fern Capital of the World and it has the shade houses to prove it. Leatherleaf fern has been the business here for generations, which means a lot of the land around town is working agricultural ground rather than subdivision lots, and the tree work reflects that: fence lines to clear, windbreaks to manage, oaks and pines along the edges of growing operations, and access tracks that need to stay passable.</p>",
    "<p>Pierson is an incorporated town sitting inside Volusia County, so there can be town requirements alongside the county&rsquo;s arbor rules depending on where your property sits and what is coming down. We check which applies to your address before we quote. For agricultural parcels the answer is often different from a residential lot on the same road, and that distinction is worth getting right the first time.</p>",
    "<p>What we handle in Pierson: tree removal and hazard work, structural pruning, palm pruning, storm response, stump grinding, and land clearing and forestry mulching on the larger parcels. We are based in DeLeon Springs, which is the next town south on US 17, so this is a short run for us rather than a trip.</p>",
    "<p>Tyler Hoag is ISA Certified (FL-9491A) and Tree Risk Assessment Qualified. If you have a tree you are unsure about, a fence line that has grown in, or ground that needs opening up, call us for an honest read and a no-pressure estimate.</p>",
  ].join('\n'),

  // Lake Helen, Volusia County — incorporated city, so the city ordinance governs
  // rather than the county's. Same distinction we already publish for Sanford and
  // Lake Mary, and it is the thing homeowners get wrong.
  'lake-helen-tree': [
    "<p>Lake Helen is a small incorporated city between DeLand and Orange City, and it is one of the most heavily shaded places in west Volusia. The old grid around Euclid and Main sits under live oaks that were mature before most of the houses were built, with narrow lots, short setbacks, and power lines threaded through the canopy. It is pretty, and it is exactly the kind of street where a removal has to be planned rather than just turned up to.</p>",
    "<p>Because Lake Helen is incorporated, the city&rsquo;s own tree rules apply rather than Volusia County&rsquo;s, with their own thresholds and their own forms. That catches people out, because a neighbor half a mile away on unincorporated land is under a different set entirely. We check your address against the right one before we quote, and we deal with the application rather than leaving it with you.</p>",
    "<p>Out from the center, toward Cassadaga and the lake itself, the lots get larger and the work changes: clearing, brush and undergrowth, fence lines, and the oaks and pines along property boundaries. We do that side too, with the same crew and the same equipment, which is usually simpler than coordinating two outfits.</p>",
    "<p>Tyler Hoag is ISA Certified (FL-9491A) and Tree Risk Assessment Qualified, so a written assessment for your insurer, your city application, or your own peace of mind comes from somebody qualified to sign it. Call us for an honest read and a no-pressure estimate.</p>",
  ].join('\n'),

  // Heathrow, Seminole County — requested by Tyler Hoag on 2026-09-23 as a
  // target market for tree work. The generated copy gave it the generic
  // suburban opener; a gated, HOA-governed community with forty-year-old
  // canopy needs its own. Key format is `${slug}-${service}`.
  'heathrow-tree': [
    "<p>Heathrow is a gated, master-planned community in unincorporated Seminole County, built out from the late eighties onward around the country club and golf course off Lake Mary Boulevard. That build history matters more than most people realize: the live oaks, laurel oaks, and southern magnolias planted through those first phases are now thirty-five to forty years old. Live oaks are just hitting their stride. Laurel oaks are not — they tend to start hollowing at the trunk and shedding structural limbs right around this age, often while the canopy above still looks perfectly green.</p>",
    "<p>Tree work in Heathrow comes with a second layer most properties don&rsquo;t have. Removals and major pruning generally need architectural review from your HOA before anything starts, and Seminole County&rsquo;s arbor ordinance covers unincorporated areas like Heathrow — trees above certain trunk diameters need a county permit to come down. We&rsquo;ll tell you at the estimate which of the two applies to your job, and we handle the paperwork rather than handing you a form. Our crew carries current certificates of insurance for gate and management-company files, and we schedule around guardhouse access instead of turning up and hoping.</p>",
    "<p>What we do here: tree removal, crown reduction and structural pruning on mature oaks hanging over roofs and pool cages, palm pruning, storm-damage response, stump grinding, and — the one worth asking about before you need it — a written tree risk assessment. Tyler Hoag is ISA Certified (FL-9491A) and Tree Risk Assessment Qualified, which means the report you get for your HOA, your insurer, or your permit application is signed by someone qualified to write it. On Heathrow lots that usually decides the question: is this tree a real hazard, or does it just look like one.</p>",
    "<p>We work clean because we have to. Paver drives, irrigation heads, landscape lighting, and mature understory plantings don&rsquo;t forgive a crew that treats a lot like an open field. Mats down, drop zones planned, debris hauled, the place left the way we found it minus the problem. If you&rsquo;ve got an oak leaning toward the house, a laurel oak you&rsquo;re quietly worried about, or an HOA letter asking for an arborist&rsquo;s opinion, call us for an honest read and a no-pressure estimate.</p>",
  ].join('\n'),

  // Sanford, Seminole County. 1,132 impressions over 90 days at position 22.1,
  // the worst impressions-to-rank ratio on the site, and templated copy was
  // part of why. The historic district and the city's own arbor ordinance are
  // the two things a Sanford homeowner is actually trying to find out.
  'sanford-tree': [
    "<p>Sanford is the Seminole County seat, sitting on the south shore of Lake Monroe where the St. Johns River widens out. The old part of town is the part that generates most of our calls: the historic district off First Street and Sanford Avenue, where 1880s to 1920s homes sit on narrow lots under live oaks and camphor trees that were mature long before their current owners bought the place. Big canopy, small setbacks, brick streets, and utility lines threaded through all of it.</p>",
    "<p>Two things make Sanford tree work different from the county around it. The first is that Sanford is an incorporated city, so the city&rsquo;s own arbor ordinance applies rather than Seminole County&rsquo;s, with its own thresholds and its own forms. The second is the historic district, where work on a property can bring preservation review into the conversation alongside the tree permit. We check both against your specific address before we quote, not after.</p>",
    "<p>North of downtown, Lake Monroe gives storms a clean run at the tree line, and the older oaks near the waterfront take the brunt of it. South and west, out along Rinehart Road and SR 46, the newer subdivisions have the opposite problem: street trees and yard plantings put in at buildout, now large enough to reach roofs and drive lines, and never structurally pruned in their lives.</p>",
    "<p>We handle the full range here: tree removal, crown reduction and structural pruning, palm pruning, storm response, stump grinding, and written tree risk assessments from an ISA Certified Arborist (FL-9491A, TRAQ qualified). If you have an oak over the house you are unsure about, a camphor dropping limbs, or a city form you are trying to work out how to fill in, call us for an honest read and a no-pressure estimate.</p>",
  ].join('\n'),

  // Lake Mary, Seminole County. Incorporated, so the city ordinance governs
  // rather than the county's. Worth publishing: it is the thing homeowners
  // get wrong, and it keeps this page distinct from the Heathrow one.
  'lake-mary-tree': [
    "<p>Lake Mary grew up fast between the eighties and the mid-2000s, and its trees grew with it. The subdivisions off Lake Mary Boulevard, Rinehart Road and Country Club Road were planted out at buildout with live oaks, laurel oaks, sand pines, crepe myrtles and sabal palms. Thirty-odd years later those plantings are full-sized trees sitting a good deal closer to roofs, drives and pool cages than anyone pictured at the time.</p>",
    "<p>The laurel oaks are the ones worth watching. They went in heavily through those years because they establish fast, and they start failing structurally at roughly the age the oldest Lake Mary plantings have now reached: hollowing at the trunk, shedding major limbs, often while the crown above still looks entirely healthy. A trained eye can tell the difference. A glance from the driveway cannot.</p>",
    "<p>One practical thing people here get wrong: Lake Mary is an incorporated city, so tree removal falls under the city&rsquo;s arbor ordinance rather than Seminole County&rsquo;s. Heathrow, a few minutes up the road, is unincorporated and follows the county instead. Different rules, different thresholds, and an HOA architectural review usually sits in front of both. We work out which applies to your address during the estimate and handle the filing.</p>",
    "<p>What we do in Lake Mary: tree removal, crown reduction and structural pruning, palm pruning, storm-damage response, stump grinding, and written tree risk assessments from an ISA Certified Arborist (FL-9491A, TRAQ qualified), which is the document an HOA board, an insurer, or a permit reviewer will actually accept. Licensed, insured, and careful with irrigation, lighting and pavers.</p>",
  ].join('\n'),

  // ───────────────────────────────────────────────────────────────────────
  // SITE WORK, Tyler's thirteen core towns.
  //
  // Added 2026-10-27. Tyler's stated goal is enough machine work on the books
  // to justify a full-time equipment operator, and until now every hand-written
  // town page on this site was a tree or fence page. These are the first `-site`
  // entries. DeLand is not here because it already has its own bespoke page at
  // /services/site-work/deland.
  //
  // Keep these grounded. General geography and land use only; no invented
  // ordinance numbers, permit thresholds or soil series.
  // ───────────────────────────────────────────────────────────────────────

  'deleon-springs-site': [
    "<p>DeLeon Springs is where we are based, so this is not a town we drive out to. It is the yard the machines come home to. If you are off Ponce DeLeon Boulevard, out along Grand Avenue, or on one of the parcels backing onto the state park, we are minutes away rather than an hour, and that shows up in what a job costs you and how fast we can get to it.</p>",
    "<p>The land here is rural and it is working land: pasture, old grove, fern acreage, and large wooded parcels that have grown in over decades. The jobs follow from that. Clearing a homesite out of twenty years of scrub, cutting a drive back to a buildable spot, bush hogging pasture that got away from somebody, pulling stumps and root plates after a clearing run, and grading so water leaves the pad instead of sitting on it.</p>",
    "<p>Low, flat ground is the thing that catches people out on this side of Volusia. A lot that looks fine in April behaves very differently in September, and a pad set without thinking about where the water goes becomes somebody&rsquo;s problem every wet season. We shoot grades before we move dirt and build the fall into the job rather than coming back to fix it.</p>",
    "<p>Land clearing, forestry mulching, bush hogging, excavation, house pads, driveways, culverts, drainage, stump grinding and demolition with haul off. Our own machines and our own crew, which is why we can price a half-day job honestly instead of pricing it like a mobilization. Call for a walk of the property and a firm number.</p>",
  ].join('\n'),

  'pierson-site': [
    "<p>Pierson calls itself the Fern Capital of the World and the land use round here reflects it. Shade houses, fern beds, packing sheds and the acreage that supports them run through this whole stretch of north Volusia along US 17. That makes for a particular kind of machine work: access tracks, drainage that has to actually function, pads for equipment and structures, and clearing that has to respect what is still in production next door.</p>",
    "<p>We are the next town south, in DeLeon Springs, so Pierson is a short run for us rather than a trip. That matters on the jobs where you want a machine for a day and a half and do not want to pay for somebody&rsquo;s travel from Orlando.</p>",
    "<p>The other half of the work here is the residential and small-acreage side. Lots that have grown in, fence lines swallowed by vines and saplings, pasture that has not been cut in years, old grove being turned back into something usable. Forestry mulching handles most of that in a single pass without the burning and hauling that traditional clearing drags along with it.</p>",
    "<p>What we bring to Pierson: land clearing, forestry mulching, bush hogging and brush mowing, grubbing and root raking, excavation, grading and drainage, house pads, driveway work and culverts, stump grinding, and demolition. Licensed and insured, equipment is ours, and the crew that quotes it is the crew that turns up.</p>",
  ].join('\n'),

  'seville-site': [
    "<p>Seville sits at the top of Volusia County on US 17, close enough to the Putnam line that plenty of our work up here straddles both. It is agricultural country: fern, pasture, timber and large rural parcels, with the kind of acreage where a job is measured in days rather than hours and the right machine matters more than the number of bodies on site.</p>",
    "<p>Most of what we get called for in Seville is land that has been left alone and now needs to do something. Clearing a building envelope out of mature growth, opening a drive into a back parcel, mulching scrub back to manageable, cutting pasture that has gone to saplings, and the grading and drainage that have to follow if any of it is going to hold up.</p>",
    "<p>We are based in DeLeon Springs, straight down 17, which keeps mobilization sensible on this end of the county. For anything north of here toward Crescent City or west toward the river, this is the same run for us.</p>",
    "<p>Land clearing, forestry mulching, bush hogging, grubbing, excavation and earthworks, house pads, rough grading, drainage and culvert work, stump grinding, fill dirt and hauling, demolition with haul off. Walk the parcel with us and you get a firm price, not an hourly rate that drifts.</p>",
  ].join('\n'),

  'astor-site': [
    "<p>Astor is river country. The St. Johns runs right through it, the Ocala National Forest starts on the other side, and a large share of the property here is low, sandy and close to water. That shapes every job. Access is often the hard part, ground conditions change with the season, and anything built without thinking about water finds that out the first time the river comes up.</p>",
    "<p>We work the clearing and earthmoving side of that: opening and widening drives onto riverfront and back lots, clearing homesites out of palmetto and scrub oak, pulling stumps, building pads up where they need the elevation, and putting in the swales, culverts and fall that keep a property usable rather than soggy.</p>",
    "<p>Soft ground is the thing to plan for rather than discover. We bring tracked equipment where tyres would do damage, and if a job is better done in a dry month we will say so instead of tearing up your lot to finish on a date that suited us.</p>",
    "<p>Land clearing, forestry mulching, bush hogging, excavation, house pads and fill, driveway construction and gravel repair, culvert installation, drainage and erosion work, stump grinding, storm debris cleanup, and demolition. Based in DeLeon Springs, so Astor is a comfortable run for us.</p>",
  ].join('\n'),

  'bunnell-site': [
    "<p>Bunnell is the Flagler County seat and it is surrounded by exactly the kind of land that keeps machines busy: large rural parcels, old agricultural ground, timber, and a lot of acreage west of US 1 that has never been built on. Jobs out here tend to be bigger and more open than the residential work closer to the coast, which usually means better value per acre for the owner.</p>",
    "<p>The work splits two ways. There is raw land being brought into use, which is clearing, grubbing, access roads, pads and the drainage to make it hold. And there is land that was in use and has gone back, which is mulching, bush hogging, fence line clearing and pulling out what grew in while nobody was watching.</p>",
    "<p>Flagler ground is flat and it holds water in places, so grading and drainage are rarely optional extras here. We shoot the fall before we start and build it into the price rather than leaving you with a pad and a problem.</p>",
    "<p>Land clearing, forestry mulching, bush hogging and brush mowing, fire breaks, excavation and earthworks, house pads, driveway grading and gravel work, culverts, drainage and erosion control, stump grinding, fill dirt and hauling, and demolition with haul off. Licensed, insured, and running our own equipment.</p>",
  ].join('\n'),

  'lake-helen-site': [
    "<p>Lake Helen is a small incorporated city between DeLand and Orange City, and the machine work here changes depending on which part of it you are on. The old grid near the center is tight: narrow lots, short setbacks, mature canopy and neighbours close enough that how a crew works matters as much as what it does. Out toward Cassadaga and the lake the parcels open up and the work gets properly rural.</p>",
    "<p>Because Lake Helen is incorporated, the city&rsquo;s own rules apply rather than the county&rsquo;s, which catches people out when a neighbour half a mile away on unincorporated land is under a different set entirely. We check your address against the right one before quoting and deal with the paperwork rather than handing you a form.</p>",
    "<p>On the larger lots the jobs are the usual run: clearing undergrowth and scrub, mulching, taking fence lines back, cutting pasture, grading and drainage, pads, and drive work. On the tighter in-town lots it is smaller machines, careful access and protecting what you are keeping.</p>",
    "<p>Land clearing, forestry mulching, bush hogging, excavation, grading, drainage and culverts, house pads, driveway work, stump grinding, and demolition. We are ten minutes up the road in DeLeon Springs.</p>",
  ].join('\n'),

  'orange-city-site': [
    "<p>Orange City sits between DeLand and Deltona on US 17-92, and it is more built up than most of the places we work. That changes the job rather than removing it. Lots are smaller, neighbours are closer, driveways and irrigation and utilities are all in play, and the machine that fits through the gate is often the one that decides whether the work is straightforward or awkward.</p>",
    "<p>What we get called for here: clearing overgrown back lots and vacant parcels, taking out what is left after a tree removal, regrading yards that drain toward the house rather than away from it, driveway repair and gravel work, small pads for sheds and additions, and demolition where something is coming down before something else goes up.</p>",
    "<p>Drainage is the recurring one in Orange City. A lot of these properties sit on flat ground with no natural fall, so water goes wherever the last person to touch the yard sent it. Swales, French drains and regrading fix that properly, which is cheaper than living with it.</p>",
    "<p>Land clearing, lot clearing, bush hogging, excavation, yard leveling and backfill, grading, drainage and French drains, driveway grading and gravel repair, culverts, stump grinding, and demolition with haul off. Fifteen minutes from our yard.</p>",
  ].join('\n'),

  'debary-site': [
    "<p>DeBary runs along the St. Johns River at the south end of Volusia, and it is a mix we see a lot: established subdivisions on one side, large wooded and riverfront parcels on the other, and ground that is flatter and wetter than people expect. Machine work here tends to be about water as much as it is about dirt.</p>",
    "<p>On the residential side that means yards that pond, drives that wash out, pool and addition pads that need the ground prepared properly first, and lots that have grown in behind the fence line. On the larger parcels it is clearing, mulching, access tracks and the drainage to keep them passable.</p>",
    "<p>Anything near the river deserves a proper look at elevation before the work starts, not after. We shoot grades, plan where the water is meant to go, and tell you if what you are asking for is going to fight the site rather than work with it.</p>",
    "<p>Land clearing, forestry mulching, bush hogging, excavation, house and shed pads, yard leveling, regrading, French drains and yard drainage, culvert installation, driveway grading, erosion repair, stump grinding, and demolition. Our own machines, our own crew.</p>",
  ].join('\n'),

  'samsula-spruce-creek-site': [
    "<p>Samsula is agricultural Volusia, inland from New Smyrna, and it is working ground: pasture, small farms, equestrian property and acreage parcels with real room on them. The machine work that comes out of a place like this is the kind we are built for, because it is open, it is measured in acres, and it is usually about making land usable rather than tidying it.</p>",
    "<p>Typical jobs here are pasture that has gone to saplings and needs cutting back, fence lines disappearing under vines, clearing for a barn, arena or new homesite, pads and access for outbuildings, and drainage so paddocks and tracks are not a write-off after a wet week.</p>",
    "<p>Flat ground and a high water table mean grading is the difference between a pad that works and one that sits in a puddle. We build the fall in from the start, and we will tell you when a job wants a dry month rather than pushing through and churning your ground up.</p>",
    "<p>Land clearing, forestry mulching, bush hogging and field mowing, fence line clearing, grubbing and root raking, excavation, pads, driveway and track work, culverts, drainage, erosion control, stump grinding, fill dirt and hauling, and demolition.</p>",
  ].join('\n'),

  'crescent-city-site': [
    "<p>Crescent City sits on the lake in south Putnam County, and the country around it is rural in the way the far north of Volusia is: big parcels, agricultural history, timber, and a lot of land that has been left to grow. We run up here regularly from DeLeon Springs, straight up US 17, so it is a normal part of our patch rather than an outlier.</p>",
    "<p>The jobs are open-land jobs. Clearing and mulching acreage back to something you can walk and use, cutting in access, taking pasture back from scrub, pulling stumps after a clearing run, and building the pads, drives and drainage that turn a cleared parcel into a usable one.</p>",
    "<p>Lakeside and low-lying ground needs the drainage thought through properly, and anything near the water is worth getting right first time. We shoot grades and plan where the water goes as part of the job rather than as an afterthought.</p>",
    "<p>Land clearing, forestry mulching, bush hogging, grubbing, excavation and earthworks, house pads, driveway construction and gravel repair, culverts, drainage and erosion work, stump grinding, fill dirt and hauling, and demolition with haul off.</p>",
  ].join('\n'),

  'codys-corner-site': [
    "<p>Codys Corner is unincorporated Volusia out on SR 11, between DeLeon Springs and the Barberville side, and it is the kind of place where everybody has land and nobody has a small job. Pasture, woods, agricultural parcels and homesites spread well apart, which suits machine work and suits us, because we are a few minutes down the road.</p>",
    "<p>Most of what gets asked for here is land being brought back into use. Clearing scrub and undergrowth off a parcel, mulching through acreage in a single pass, cutting pasture that got away, opening or widening a drive, and pulling stumps and root plates so the ground can actually be used afterwards.</p>",
    "<p>Flat sandy ground that holds water in the wet months is the local reality, so grading and drainage get built into the job rather than sold as an extra. A pad or a drive without fall is a pad or a drive you will be calling somebody about next September.</p>",
    "<p>Land clearing, forestry mulching, bush hogging, grubbing and root raking, excavation, house pads, driveway and culvert work, grading and drainage, stump grinding, fill dirt, and demolition with haul off. Based in DeLeon Springs, so this is about as local as our work gets.</p>",
  ].join('\n'),

  'ormond-beach-site': [
    "<p>Ormond Beach covers more ground than people picture. There is the coastal side, and then there is everything west of I-95 running out toward the Tomoka basin and the Loop, where the parcels get large, wooded and genuinely rural. That western half is where most of our machine work here happens.</p>",
    "<p>Out there the jobs are clearing homesites and building envelopes, mulching through palmetto and scrub oak, access drives, pads, and the drainage that low wooded ground always ends up needing. Closer in, it is lot clearing, regrading yards that drain the wrong way, driveway work, stump removal and demolition.</p>",
    "<p>Hurricane seasons have left a lot of debris and damaged canopy across this area, and clearing that properly is different work from tidying it. We take it out, haul it, and grade behind us so the ground is left usable rather than just tidier.</p>",
    "<p>Land clearing, forestry mulching, bush hogging, storm debris cleanup, excavation, house pads, driveway grading and gravel repair, culverts, drainage and erosion control, yard leveling, stump grinding, and demolition with haul off. Licensed and insured, running our own equipment.</p>",
  ].join('\n'),
}

const HAND_CRAFTED_TITLE: Record<string, string> = {
  'orlando-tree': 'Tree Service Orlando FL | Removal, Trimming, ISA Arborist',
  'deltona-tree': 'Tree Service Deltona FL | Removal, Trimming, ISA Arborist',
  'ormond-beach-tree': 'Tree Service Ormond Beach FL | Removal & ISA Arborist',
  'new-smyrna-beach-tree': 'Tree Service New Smyrna Beach FL | Removal & Arborist',
  'flagler-beach-tree': 'Tree Service Flagler Beach FL | Removal & Arborist',
  'maitland-fence': 'Fence Company Maitland FL | Privacy, Vinyl & Aluminum',
  'ocoee-fence': 'Fence Company Ocoee FL | Privacy, Vinyl & Aluminum',
  'lake-mary-fence': 'Lake Mary Fence Company | Privacy, Vinyl & Aluminum',

  // The DeLand and Daytona pages use this shape and Daytona went from no clicks
  // to five after the change, so new towns get the same treatment: name the town,
  // then name what we actually do.
  'deleon-springs-tree': 'Tree Service DeLeon Springs FL | Removal & ISA Arborist',
  'pierson-tree': 'Tree Service Pierson FL | Removal, Trimming, ISA Arborist',
  'lake-helen-tree': 'Tree Service Lake Helen FL | Removal, Trimming, Arborist',
  // Eustis fencing sat at position 5 on "fence services eustis" with 654
  // impressions and zero clicks. The page said Installation; the search says
  // Services.
  'eustis-fence': 'Eustis Fence Services | Installation, Privacy & Boundary',
  // Sanford carried 1,132 impressions over 90 days at position 22.1 while its
  // title read "Sanford, FL Tree Service & Storm Cleanup". The demand behind
  // those impressions is removal, trimming and arborist work. "arborist
  // sanford" alone sits at position 15.5. The title now names what people
  // actually type.
  'sanford-tree': 'Sanford Tree Removal, Trimming & Arborist',
  'lake-mary-tree': 'Lake Mary Tree Removal, Trimming & Arborist',

  // Site work, Tyler's core towns, added 2026-10-27. "Land clearing" is the
  // term with demand behind it on this site: it pulled 6,356 appearances over
  // six months against 511 for forestry mulching and 354 for bush hogging. So
  // it leads, and the machine words that people actually type follow it.
  'deleon-springs-site': 'Land Clearing DeLeon Springs FL | Grading & Excavation',
  'pierson-site': 'Land Clearing Pierson FL | Mulching, Grading & Excavation',
  'seville-site': 'Land Clearing Seville FL | Mulching, Grading & Excavation',
  'astor-site': 'Land Clearing Astor FL | Excavation, Driveways & Drainage',
  'bunnell-site': 'Land Clearing Bunnell FL | Mulching, Grading & Excavation',
  'lake-helen-site': 'Land Clearing Lake Helen FL | Grading, Drainage & Pads',
  'orange-city-site': 'Land Clearing Orange City FL | Grading, Drainage & Drives',
  'debary-site': 'Land Clearing DeBary FL | Grading, Drainage & Excavation',
  'samsula-spruce-creek-site': 'Land Clearing Samsula FL | Mulching, Pasture & Grading',
  'crescent-city-site': 'Land Clearing Crescent City FL | Mulching & Excavation',
  'codys-corner-site': 'Land Clearing Codys Corner FL | Mulching & Excavation',
  'ormond-beach-site': 'Land Clearing Ormond Beach FL | Grading, Drives & Drainage',
}

// Anything not keyed above falls through to the generator below, which
// produces template-based content from the location's county, zips, and
// character bucket.

// ──────────────────────────────────────────────────────
// CONTENT GENERATION
// ──────────────────────────────────────────────────────

const PROCESS_STEPS = {
  tree: [
    { title: 'Call or Request an Estimate', desc: 'Give us a call or fill out the form on this page. Tell us about your trees, your property, and what you need done. We will ask a few questions to understand the scope before scheduling a visit.' },
    { title: 'We Walk Your Property', desc: 'We visit your property in person, assess every tree involved, and give you an honest, no-pressure estimate on the spot. Our ISA Certified Arborist evaluates risk, health, and the safest approach for your specific situation.' },
    { title: 'We Get It Done Right', desc: 'Once you approve the estimate, we schedule the work at a time that works for you. Our crew shows up on time, completes the job safely and cleanly, and leaves your property better than we found it.' },
  ],
  site: [
    { title: 'Call or Request an Estimate', desc: 'Reach out by phone or through the form on this page. Describe your property, the acreage involved, and what you are looking to accomplish. The more detail, the better we can prepare.' },
    { title: 'We Walk Your Property', desc: 'We come out to your site, walk the full area, evaluate terrain, vegetation, access points, and any environmental considerations. You get a straightforward estimate with no hidden costs.' },
    { title: 'We Complete the Work', desc: 'We bring the right equipment for your specific project and get it done on schedule. From single lots to multi-acre clearings, we handle the full scope from clearing through final grading.' },
  ],
  fence: [
    { title: 'Call or Request an Estimate', desc: 'Give us a call or submit a request through this page. Tell us about your property, the type of fencing you are considering, and the approximate footage. We will follow up promptly.' },
    { title: 'We Walk Your Property', desc: 'We visit your property, measure the fence line, discuss material options, and provide an honest estimate. We will help you choose the right fencing for your needs, budget, and local requirements.' },
    { title: 'Professional Installation', desc: 'Our crew installs your fence with quality materials and careful workmanship. We respect your property, clean up after ourselves, and make sure the finished product is something you are proud of.' },
  ],
}

function generateDifferentiators(loc: Location, service: ServiceCategory) {
  const base = [
    { title: 'ISA Certified Arborist', desc: `Tyler Hoag holds ISA Certified Arborist credentials (FL-9491A) and is Tree Risk Assessment Qualified (TRAQ). Every project is backed by professional knowledge, not guesswork.` },
    { title: `${new Date().getFullYear() - EST_YEAR}+ Years of Experience`, desc: `Since ${EST_YEAR}, Hoag Land Services has built a reputation on honest work, fair pricing, and showing up when we say we will. Our repeat customers and referrals speak for themselves.` },
    { title: 'Licensed, Insured & Screened', desc: `We carry full liability insurance and are HomeAdvisor Screened and Approved. Your property and your peace of mind are protected on every job.` },
  ]

  // Hyper-local block — unique per location
  const localBlock = {
    title: `Serving ${loc.name} Properties`,
    desc: getLocalDifferentiator(loc, service),
  }

  return [...base, localBlock]
}

function getLocalDifferentiator(loc: Location, service: ServiceCategory): string {
  const countyRef = `${loc.county} County`

  if (service === 'tree') {
    if (loc.character === 'coastal') {
      return `${loc.name} coastal properties face unique challenges from salt spray, wind exposure, and sandy soil. Our arborist understands the species and conditions specific to ${countyRef} shoreline communities.`
    }
    if (loc.character === 'rural') {
      return `${loc.name} acreage properties often have mature trees that need professional assessment. We work with large rural lots, agricultural parcels, and wooded homesteads throughout ${countyRef}.`
    }
    return `From established neighborhoods to newer developments, ${loc.name} properties feature a mix of native oaks, pines, palms, and ornamentals that benefit from certified arborist care.`
  }

  if (service === 'site') {
    if (loc.character === 'rural') {
      return `${loc.name} land often requires clearing of dense vegetation, palmetto, and overgrown timber before construction or agricultural use. We handle lots of all sizes in ${countyRef}.`
    }
    if (loc.character === 'coastal') {
      return `${loc.name} development projects require attention to coastal building codes, stormwater management, and environmental setbacks. We work within ${countyRef} permitting requirements.`
    }
    return `Whether you are clearing a residential lot, preparing a commercial site, or developing acreage in ${loc.name}, we bring the right equipment and experience for ${countyRef} soil and terrain.`
  }

  // fence
  if (loc.character === 'coastal') {
    return `${loc.name} coastal properties benefit from corrosion-resistant materials like vinyl and aluminum. We understand ${countyRef} fence codes, HOA requirements, and the demands of salt air exposure.`
  }
  if (loc.character === 'rural') {
    return `${loc.name} property owners need fencing that works — from livestock containment and agricultural boundaries to residential privacy. We install wood, vinyl, and aluminum fencing across ${countyRef} acreage.`
  }
  return `${loc.name} neighborhoods include a mix of privacy fencing, pool enclosures, and property boundaries. We install wood, vinyl, and aluminum fencing that meets ${countyRef} codes and HOA guidelines.`
}

function generateLocalContext(loc: Location, service: ServiceCategory): string {
  // Check for hand-crafted content first
  const key = `${loc.slug}-${service}`
  if (HAND_CRAFTED_CONTEXT[key]) return HAND_CRAFTED_CONTEXT[key]

  const countyRef = `${loc.county} County`
  const zips = loc.zipCodes.join(', ')

  if (service === 'tree') {
    return generateTreeContext(loc, countyRef, zips)
  }
  if (service === 'site') {
    return generateSiteContext(loc, countyRef, zips)
  }
  return generateFenceContext(loc, countyRef, zips)
}

// Stable per-slug variant index so each city consistently gets the same opener.
// Different slugs in the same character bucket get different opening patterns.
function variant(slug: string, mod: number): number {
  return Math.abs(hashCode(slug)) % mod
}

function generateTreeContext(loc: Location, county: string, zips: string): string {
  const paras: string[] = []
  const v = variant(loc.slug, 5)

  // ── Opening paragraph: 5 patterns per character bucket ──
  if (loc.character === 'coastal') {
    const openers = [
      `<p>${loc.name} sits along Florida's Atlantic coast in ${county}, where salt-laden winds, sandy soils, and seasonal storms create a demanding environment for trees. Live oaks, sabal palms, slash pines, and southern red cedars are common throughout the area, and many properties in the ${zips} zip code area feature mature canopies that require regular professional care.</p>`,
      `<p>Trees in ${loc.name} have to earn their keep. Coastal ${county} weather — salt spray, summer storms, hurricane-force gusts — punishes anything that hasn't been kept healthy. The mature oaks, palms, and pines lining the ${zips} streets and yards are part of what makes the area beautiful, but they need professional care to stay that way.</p>`,
      `<p>If you own property in ${loc.name}, your trees are doing battle with the Atlantic every day. Salt, wind, and seasonal storms wear down even the toughest live oaks and sabal palms. The species that thrive here in ${county} — coastal hardwoods, native palms, slash pines — all benefit from regular arborist attention to catch decline before it becomes danger.</p>`,
      `<p>${loc.name}, ${county}, sits where Florida's wild Atlantic meets the mainland canopy. Properties across the ${zips} area carry a mix of established live oaks, towering palms, and second-growth pines — beautiful when maintained, hazardous when ignored. Coastal trees age differently than inland ones, and the calls we get most often start with "I noticed something off after the last storm."</p>`,
      `<p>Coastal ${loc.name} property owners know that a healthy tree canopy isn't optional — it's the difference between a property that holds value and one that becomes a liability after a single storm. Across ${county}, the live oaks, palms, and pines on residential lots and commercial sites in the ${zips} area need regular professional attention to stay safe and structurally sound.</p>`,
    ]
    paras.push(openers[v])
  } else if (loc.character === 'rural') {
    const openers = [
      `<p>${loc.name} is a ${loc.popBracket === 'tiny' ? 'small, close-knit' : 'rural'} community in ${county} where properties often sit on larger lots with mature hardwoods, dense understory, and trees that have grown unchecked for years. Water oaks, laurel oaks, slash pines, and cabbage palms are common across the ${zips} zip code area.</p>`,
      `<p>Out in ${loc.name}, the lots are bigger and the trees have had time to do what they do. ${county}'s rural corridors are full of mature hardwoods, palmettos, and pine stands that have grown for decades — sometimes generations — without anyone in particular looking after them. The ${zips} area sees a lot of properties where the back acreage is essentially wild.</p>`,
      `<p>${loc.name} property owners in ${county} tend to have more land and bigger trees than their suburban neighbors. Mature water oaks shading homes, slash pines along driveways, palmetto thick along fence lines — it's the look that defines rural Central Florida. Without periodic professional attention, those same trees become hazards.</p>`,
      `<p>If you own acreage in ${loc.name}, your tree work is a different animal. ${county} rural properties in the ${zips} area carry the full Central Florida mix — hardwoods, conifers, palms, invasives — often on a scale that demands real equipment and an experienced crew. We're set up for it.</p>`,
      `<p>${loc.name}, in ${county}, is the kind of rural community where the property lines disappear into trees and the back of the lot has been doing whatever it wants for years. Mature oaks, pines, sweetgums, and cabbage palms make these properties beautiful — but also mean ongoing tree care work most homeowner-grade gear can't handle.</p>`,
    ]
    paras.push(openers[v])
  } else {
    const openers = [
      `<p>${loc.name} is a ${loc.popBracket === 'large' ? 'growing' : 'well-established'} community in ${county} with a diverse mix of residential neighborhoods, commercial corridors, and developing areas. Properties in the ${zips} zip code area feature a range of tree species common to Central Florida — live oaks, water oaks, laurel oaks, slash pines, sabal palms, and a variety of ornamentals.</p>`,
      `<p>Across ${loc.name}, ${county}, the mix of older neighborhoods and newer subdivisions has produced a wide variety of tree care needs. Homes in the ${zips} area sit under mature live oak canopies, beside slash pines, alongside palm-lined driveways — each species with its own maintenance cycle and its own failure modes.</p>`,
      `<p>${loc.name} property owners deal with the typical Central Florida tree mix: live oaks that need crown reduction, palms that need fronds cleaned, sweetgums dropping limbs in storms, the occasional pine threatening a roof. ${county} weather and soils mean even healthy trees in the ${zips} area need a professional eye every few years.</p>`,
      `<p>Whether your ${loc.name} home is in an older neighborhood with established trees or a newer subdivision still growing in, ${county}'s climate keeps tree care on the to-do list. The ${zips} area's oaks, pines, palms, and ornamentals all want different things — and getting it right takes someone who actually knows the species.</p>`,
      `<p>${loc.name} sits in the middle of ${county}, where Florida's most common tree species — live oak, water oak, sand pine, slash pine, sabal palm — are both the area's biggest aesthetic asset and its most common source of expensive surprises. Properties in the ${zips} area benefit from preventive care long before they need emergency removal.</p>`,
    ]
    paras.push(openers[v])
  }

  // ── Middle paragraph: what we do (rotates across 3 phrasings) ──
  const middles = [
    `<p>Hoag Land Services provides ISA Certified Arborist tree care to ${loc.name} residential and commercial properties. Whether you need dead limb removal to reduce storm risk, crown reduction to clear structures and sight lines, full tree removal for hazardous or declining trees, or palm pruning to keep your property maintained, our crew handles the job with the equipment, training, and insurance to do it right. As an ISA Tree Risk Assessment Qualified (TRAQ) arborist, Tyler Hoag evaluates every tree we touch for structural defects, root stability, and species-specific risks before any work begins.</p>`,
    `<p>We bring ISA Certified Arborist work to ${loc.name} — tree removal, trimming, palm pruning, stump grinding, storm cleanup, and new tree installation. Tyler Hoag is ISA Certified (FL-9491A) and Tree Risk Assessment Qualified (TRAQ), which means every tree we touch gets a real evaluation for health, structure, and species-specific failure risk before any cutting happens. Licensed, insured, and accountable from quote through cleanup.</p>`,
    `<p>What we do in ${loc.name}: tree removal (small to giant), tree trimming and crown reduction, palm pruning and fruit-cluster cleanup, hazard assessments by a TRAQ-qualified arborist, storm response when conditions allow, and tree installation done right the first time. Tyler runs the assessments personally. Our crew brings the equipment and the insurance to handle anything Central Florida throws at us.</p>`,
  ]
  paras.push(middles[variant(loc.slug, 3)])

  // ── Closing paragraph: permits + CTA ──
  const closers = [
    `<p>${county} tree ordinances may require permits for removal of certain protected species or trees above specific diameter thresholds. We can advise you on local requirements and help guide you through the permitting process when needed. If you have trees near your home, along your fence line, overhanging a neighbor's property, or showing signs of decline, call Hoag Land Services for an honest assessment and a no-pressure estimate.</p>`,
    `<p>Tree work in ${county} sometimes involves permits — especially for protected species, larger diameters, or trees in environmentally sensitive areas. We'll tell you upfront if your project needs one and help you through the paperwork. For everything else, just call. We give honest estimates, show up when we say we will, and leave the place cleaner than we found it.</p>`,
    `<p>Depending on your specific ${loc.name} address, ${county} may require a permit for the work you have in mind. We've been through the process plenty of times and will tell you what's required during the estimate. No pressure, no upsell — just an honest read on what your trees need and what it costs to do it right.</p>`,
  ]
  paras.push(closers[variant(loc.slug, 3)])

  return paras.join('\n')
}

function generateSiteContext(loc: Location, county: string, zips: string): string {
  const paras: string[] = []
  const v = variant(loc.slug, 5)

  if (loc.character === 'coastal') {
    const openers = [
      `<p>${loc.name} properties in ${county} present unique site preparation challenges due to sandy coastal soils, high water tables, and strict environmental regulations. The ${zips} zip code area includes a mix of established lots that may need reclearing, undeveloped parcels with decades of overgrowth, and new development sites requiring full preparation.</p>`,
      `<p>Site work near the coast plays by different rules. ${loc.name} sits in ${county} where stormwater regs, buffer setbacks, and sandy fill conditions all change how clearing and grading have to be done. The ${zips} area includes everything from infill lots in older neighborhoods to multi-acre parcels still being built out.</p>`,
      `<p>If you're preparing land in ${loc.name}, ${county}, the soil and the rules both want attention. Coastal lots in the ${zips} area sit on sand that drains fast but settles unevenly, often inside drainage districts with specific requirements. Getting the prep right the first time saves expensive rework when permits and inspections come around.</p>`,
      `<p>Coastal ${loc.name} development isn't the same as inland clearing. Between ${county}'s building codes, FEMA flood zone considerations, and the practical reality of working in sandy soils with shallow groundwater, properties in the ${zips} area need a contractor who understands how the conditions affect every step from clearing through final grade.</p>`,
      `<p>${loc.name} property owners and builders working in ${county} face a particular set of site-work realities: tidal influence on water tables, stricter stormwater management requirements, and lots that may have been graded once and need to be reworked because of subsidence or drainage changes. The ${zips} area sees this regularly.</p>`,
    ]
    paras.push(openers[v])
  } else if (loc.character === 'rural') {
    const openers = [
      `<p>${loc.name} sits in the ${loc.popBracket === 'tiny' ? 'rural heart' : 'agricultural corridor'} of ${county}, where land clearing projects range from reclaiming overgrown homestead lots to preparing multi-acre parcels for agriculture, construction, or habitat management. Properties in the ${zips} zip code area are often densely vegetated with palmetto, pine, scrub oak, and invasive species.</p>`,
      `<p>Rural ${loc.name} land clearing is acreage work. Property owners in ${county}'s ${zips} area routinely call us about lots that haven't been touched in 20 years — palmetto, pine, oak scrub, and assorted invasives all jockeying for space. The work needs heavy equipment, real planning, and someone who's done it on this scale before.</p>`,
      `<p>${loc.name} is the kind of ${county} community where land clearing means clearing land — not trimming a yard. The ${zips} area is full of properties with 5, 10, 40 acres of overgrowth waiting to be turned into pasture, building site, or habitat. The mix of sandy uplands and wet bottoms makes equipment selection and approach matter.</p>`,
      `<p>Out in ${loc.name}, site work usually starts with clearing — sometimes lots of it. ${county}'s rural parcels in the ${zips} area can carry years of palmetto, scrub oak, and pine that need to come out before grading, drainage, or building can begin. We handle full sweeps from initial clear through final grade.</p>`,
      `<p>${loc.name} land in ${county} doesn't behave like a suburban lot. Properties in the ${zips} area often need full forestry mulching or grub-and-grade before anything else can happen. We bring the equipment built for it and the experience to know when mulching beats hauling, when bermed swales beat culverts, and when to slow down for wetlands.</p>`,
    ]
    paras.push(openers[v])
  } else {
    const openers = [
      `<p>${loc.name} is a ${loc.popBracket === 'large' ? 'rapidly growing' : 'developing'} community in ${county} where new construction, lot development, and property improvement projects keep site work in steady demand. The ${zips} zip code area includes residential subdivisions with buildable lots, older properties needing reclearing, and commercial parcels requiring full site preparation.</p>`,
      `<p>${loc.name} sits in a steady-growth corner of ${county} where lots are clearing, neighborhoods are filling in, and contractors are always looking for a site-prep partner who shows up. The ${zips} area mixes infill construction, light commercial, and residential improvements — all of which start with clean, graded, drained ground.</p>`,
      `<p>Site work demand in ${loc.name} reflects ${county}'s broader growth. Builders need lots cleared, homeowners need overgrowth removed, and commercial projects need full prep from initial clearing through compaction. Central Florida sand and the ${zips} area's flat terrain create predictable drainage challenges if the grading isn't done right the first time.</p>`,
      `<p>If you're building, expanding, or just trying to make a lot useful in ${loc.name}, ${county}, site work is the first step that has to go right. The ${zips} area's mix of older neighborhoods and newer development means every project starts a little differently — but the fundamentals of clearing, drainage, and grade don't change.</p>`,
      `<p>${loc.name} property work in ${county} ranges from single-day lot clearing to multi-week development prep. The ${zips} area sees both — homeowners reclaiming neglected backyards, contractors prepping for ground-up builds, and businesses expanding existing sites. All of it depends on doing the dirt work right.</p>`,
    ]
    paras.push(openers[v])
  }

  // Middle: what we do (3 variants)
  const middles = [
    `<p>Hoag Land Services provides complete site work and land clearing services to ${loc.name} property owners, builders, and developers. Our capabilities include full vegetation clearing, forestry mulching, stump grinding, excavation, grading, drainage solutions, and erosion control. We bring the right equipment for the scope — single residential lots through multi-acre commercial sites — and work within ${county} permitting requirements from start to finish.</p>`,
    `<p>We do site work the way builders want it done: full vegetation clearing, forestry mulching for environmentally sensitive areas, stump grinding, excavation, building pads, road and drive prep, drainage installation, and erosion control. ${loc.name} projects in ${county} get our own equipment and our own crew — no sub-out, no scheduling games, no surprise change orders.</p>`,
    `<p>What we bring to ${loc.name} site work: heavy equipment for clearing and grubbing, forestry mulching machines for low-disturbance work, excavators and dozers for grading and pads, and the experience to handle ${county} permitting. We've been doing this since ${EST_YEAR} and our repeat builder clients are the best advertisement we have.</p>`,
  ]
  paras.push(middles[variant(loc.slug, 3)])

  // Closing
  const closers = [
    `<p>Whether you need a lot cleared for new construction, overgrown vegetation removed from an existing property, or a full site development package in ${loc.name}, Hoag Land Services delivers honest estimates and reliable execution. Call us or submit a request through the form above to schedule a site walk.</p>`,
    `<p>If your ${loc.name} project needs site work — clearing, grading, drainage, the whole package — call us or fill out the form on this page. We'll come walk it with you, talk through what's needed, and give you a real estimate. No pressure.</p>`,
    `<p>${county} site work projects sometimes need permits from the county, water management district, or local municipality. We'll tell you what's required before you sign anything. For an honest walk-through and an estimate on your ${loc.name} project, reach out by phone or form.</p>`,
  ]
  paras.push(closers[variant(loc.slug, 3)])

  return paras.join('\n')
}

function generateFenceContext(loc: Location, county: string, zips: string): string {
  const paras: string[] = []
  const v = variant(loc.slug, 5)

  if (loc.character === 'coastal') {
    const openers = [
      `<p>${loc.name} coastal properties in ${county} demand fencing materials and installation methods that can withstand salt air, high winds, and sandy soils. The ${zips} zip code area includes beachside homes, canal-front properties, and mainland neighborhoods where fencing serves purposes ranging from pool safety barriers to full perimeter privacy.</p>`,
      `<p>Coastal fence work in ${loc.name} is its own discipline. Salt air eats unprotected hardware, sand undercuts shallow posts, and ${county} pool-code requirements make a lot of fence-store DIY kits non-starters. The ${zips} area sees vinyl and aluminum used heavily for that exact reason — both shrug off salt and Florida sun the way wood can't.</p>`,
      `<p>If you're fencing a ${loc.name} property near the Atlantic, materials matter more than they do inland. ${county} coastal lots in the ${zips} area get punished by salt spray, gusts, and a sun that doesn't quit. Vinyl and aluminum hold up; wood needs to be the right species, sealed properly, and set deep.</p>`,
      `<p>${loc.name} fence installations face the realities of coastal ${county} living — salt, wind, soil that won't always hold a post the first try. The ${zips} area is mostly residential with a mix of pool barriers, privacy fences, and property-line work, plus the occasional commercial estate. Material selection drives most decisions here.</p>`,
      `<p>Fencing in ${loc.name} comes down to two things: surviving the salt, and meeting ${county}'s pool code. The ${zips} area sees aluminum used heavily around pools and on estates, vinyl for residential privacy, and wood mostly for inland or larger lots away from direct salt exposure. We install all three.</p>`,
    ]
    paras.push(openers[v])
  } else if (loc.character === 'rural') {
    const openers = [
      `<p>${loc.name} property owners in ${county} rely on fencing for a wide range of purposes — from residential privacy and pool enclosures to livestock containment, pasture boundaries, and property line definition on larger acreage. The ${zips} zip code area includes homesteads, agricultural parcels, equestrian properties, and wooded lots where fencing needs go well beyond a standard suburban privacy fence.</p>`,
      `<p>Rural ${loc.name} fencing is real fencing. Property owners in the ${zips} area of ${county} need barbed wire and field fence for cattle, horse fence for paddocks, board fence for the front of the property, and sometimes all three on one parcel. We install everything from a single gate replacement to perimeter fencing across multi-acre tracts.</p>`,
      `<p>${loc.name} ranch and homestead properties in ${county} have fencing needs that suburb-only contractors aren't set up for. The ${zips} area's lots run from a few acres to a few hundred, and the fence specs change accordingly: woven wire for livestock, board fence for visual, barbed for the back, vinyl or aluminum for the residential portion near the house.</p>`,
      `<p>Out in ${loc.name}, fencing solves real problems — keeping cattle in, keeping coyotes out, defining a property line that runs through woods. ${county} rural properties in the ${zips} area need fence built right for sandy soil and seasonal flooding, set deep enough to hold against animals and weather both.</p>`,
      `<p>${loc.name} fence work in ${county} covers the full agricultural spectrum: horse fence, livestock fence, perimeter fence, gate work, and the residential privacy/picket fencing closer to the house. The ${zips} area is largely unincorporated, which usually means fewer code restrictions but the same physics — posts have to be set right or the fence fails.</p>`,
    ]
    paras.push(openers[v])
  } else {
    const openers = [
      `<p>${loc.name} is a ${loc.popBracket === 'large' ? 'growing' : 'well-established'} community in ${county} where property owners install fencing for privacy, security, pool safety, pet containment, and property line definition. The ${zips} zip code area includes a mix of single-family neighborhoods, newer subdivisions with HOA requirements, and larger lots where fencing serves both residential and boundary purposes.</p>`,
      `<p>Fencing demand in ${loc.name} reflects what you'd expect from a ${county} community of its size — privacy fence going up between neighbors, pool barriers required by code, pet containment for new dogs, the occasional full perimeter replacement. The ${zips} area mixes older neighborhoods with newer HOA-governed subdivisions, each with its own material and style restrictions.</p>`,
      `<p>${loc.name} property owners install fence for the same reasons everyone does — privacy, security, code compliance, curb appeal — but ${county} adds its own wrinkles: HOA architectural reviews, pool-code requirements under Florida Building Code Chapter 3109, and setback rules that vary by zoning. The ${zips} area is mostly residential with the occasional commercial project.</p>`,
      `<p>If you're fencing a ${loc.name} property, you've probably already noticed how much the answer depends on the lot. ${county} HOAs in the ${zips} area can be picky about material and color. Older neighborhoods are looser. Pool barriers have their own rules. We've worked through all of it and will steer you toward what works for your specific situation.</p>`,
      `<p>${loc.name} fence projects in ${county} cover privacy, security, pets, pools, and curb appeal — sometimes all on the same property. The ${zips} area runs the gamut from suburban lots needing 6-foot wood privacy to estates wanting aluminum perimeter with custom gate hardware. We install wood, vinyl, and aluminum across all of it.</p>`,
    ]
    paras.push(openers[v])
  }

  // Middle: what we do
  const middles = [
    `<p>Hoag Land Services installs wood, vinyl, and aluminum fencing for ${loc.name} residential and commercial properties. We handle the full scope — from clearing the fence line and removing old fencing to installing posts at proper depth for ${county}'s soil conditions and completing the job with quality materials built to last. For HOA communities, we work within architectural guidelines for approved styles, heights, and materials.</p>`,
    `<p>What we install in ${loc.name}: wood board, privacy, barbed wire, field fence, and horse fence; vinyl privacy, picket, and ranch-style; aluminum for pools, estates, and commercial perimeters. We're one of the few contractors who'll clear the fence line ourselves first — most companies require you to have the line clear before they show up. We don't.</p>`,
    `<p>${loc.name} fence installation, the way we do it: we walk the line with you, recommend the material that actually fits the job (not the most expensive one), pull or modify any existing fence, set posts at proper depth for ${county} soils, and finish the job clean. We carry the insurance and license to do it right, and we'll handle any permits the project needs.</p>`,
  ]
  paras.push(middles[variant(loc.slug, 3)])

  // Closing
  const closers = [
    `<p>${county} fence codes typically regulate height, setback from property lines, and requirements for pool barriers under Florida Building Code Chapter 3109. Many ${loc.name} neighborhoods also have HOA architectural guidelines for approved materials, colors, and styles. We'll walk your property, discuss your options, and provide an estimate that accounts for local requirements. Call Hoag Land Services to get started.</p>`,
    `<p>Most ${loc.name} fence projects need a permit, and HOA-governed neighborhoods in ${county} usually need architectural review too. We'll tell you upfront what's required and handle as much of the back-and-forth as you want us to. For a site walk and honest estimate, call or use the form on this page.</p>`,
    `<p>Whether your ${loc.name} project is a single gate, a 200-foot privacy fence, or perimeter for a multi-acre property, the process starts the same way: we come out, walk the line, talk material and timeline, and give you a real number. No high-pressure sales pitch, no upsell games. Call Hoag Land Services or submit a request above.</p>`,
  ]
  paras.push(closers[variant(loc.slug, 3)])

  return paras.join('\n')
}

function generateFAQs(loc: Location, service: ServiceCategory): LocationPageData['faqs'] {
  const cat = SERVICE_CATEGORIES[service]

  if (service === 'tree') {
    return [
      { q: `How much does tree removal cost in ${loc.name}?`, a: `It depends on the size, species, location, and complexity of the tree. A small tree in an open yard costs significantly less than a large oak next to your house or power lines. We provide free on-site estimates with honest, no-pressure pricing for all tree work in ${loc.name}.` },
      { q: 'Are you a certified arborist?', a: `Yes. Tyler Hoag is an ISA Certified Arborist (FL-9491A) and ISA Tree Risk Assessment Qualified (TRAQ). Every tree we assess and every job we perform is backed by professional credentials and over ${new Date().getFullYear() - EST_YEAR} years of hands-on experience.` },
      { q: `Do I need a permit to remove a tree in ${loc.name}?`, a: `${loc.county} County may require permits for certain protected species or trees above specific diameter thresholds. Requirements can differ between incorporated cities and unincorporated areas. We can advise you on whether your project requires a permit and help guide you through the process.` },
      { q: 'Do you offer stump grinding?', a: 'Yes. We can grind stumps down below grade so you can replant, resod, or repurpose the area. Stump grinding can be included in your tree removal estimate or performed as a standalone service.' },
      { q: 'Do you provide emergency storm damage service?', a: 'Yes. Storm damage, fallen trees, and hazardous limbs do not wait for business hours. Call us and we will respond as soon as conditions safely allow. We handle leaning trees, split trunks, uprooted root plates, and debris removal.' },
      { q: `What areas near ${loc.name} do you serve?`, a: `We serve ${loc.name} and surrounding communities throughout ${loc.county} County and Central Florida, including ${loc.nearby.slice(0, 3).map(s => { const n = getLocation(s); return n ? n.name : s }).join(', ')}, and more. If you are in the area, give us a call.` },
    ]
  }

  if (service === 'site') {
    return [
      { q: `How much does land clearing cost in ${loc.name}?`, a: `Cost depends on acreage, density of vegetation, terrain, access, and what needs to happen after clearing — stump removal, grading, drainage, etc. We provide free on-site estimates for all land clearing projects in ${loc.name} and surrounding ${loc.county} County.` },
      { q: 'What is forestry mulching?', a: 'Forestry mulching uses specialized equipment to grind standing vegetation — trees, brush, and stumps — into mulch in a single pass. It is faster and more environmentally friendly than traditional clearing because it eliminates the need for burning, hauling, or disposal, and the mulch protects the soil from erosion.' },
      { q: `Do I need a permit for land clearing in ${loc.name}?`, a: `${loc.county} County typically requires permits for land clearing depending on the size of the project, proximity to wetlands, and local zoning. Stormwater management requirements from the water management district may also apply. We can advise you on what is needed for your specific property.` },
      { q: 'How long does land clearing take?', a: 'Timeline depends on the size of the area, density of vegetation, and scope of work. A single residential lot may take one to two days. Larger multi-acre projects can take a week or more. We will give you a realistic timeline during your estimate.' },
      { q: 'Do you handle grading and drainage?', a: 'Yes. We provide complete site preparation including clearing, grading, drainage installation, and erosion control. Proper grading and drainage are critical in Central Florida where sandy soils and flat terrain can create standing water issues.' },
      { q: `What areas near ${loc.name} do you serve?`, a: `We serve ${loc.name} and surrounding ${loc.county} County, including ${loc.nearby.slice(0, 3).map(s => { const n = getLocation(s); return n ? n.name : s }).join(', ')}, and more. Whether your project is a half-acre lot or a large-scale development, give us a call.` },
    ]
  }

  // fence
  return [
    { q: `How much does fence installation cost in ${loc.name}?`, a: `Cost depends on the type of material (wood, vinyl, or aluminum), total linear footage, terrain, and any existing fencing that needs removal. We provide free on-site estimates for all fencing projects in ${loc.name} and surrounding ${loc.county} County.` },
    { q: 'What types of fencing do you install?', a: 'We install wood fencing (board, privacy, barbed wire, field fence, horse fence), vinyl fencing (privacy, picket, ranch style), and aluminum fencing (estates, pools, residential and commercial communities). We will help you choose the right material for your needs and budget.' },
    { q: `Do I need a permit for a fence in ${loc.name}?`, a: `${loc.county} County and local municipalities may have requirements for fence height, setback from property lines, and pool barrier compliance. Requirements vary between incorporated cities and unincorporated areas. We can advise you on what applies to your specific property.` },
    { q: 'How long does fence installation take?', a: 'Most residential fence projects are completed in one to three days depending on the total footage, material type, and site conditions. Larger commercial or agricultural projects may take longer. We will give you a realistic timeline with your estimate.' },
    { q: 'Do you remove old fencing?', a: 'Yes. We can remove and dispose of existing fencing as part of your installation project. If your old fence is damaged, leaning, or deteriorated, we handle the full replacement from removal through new installation.' },
    { q: `What areas near ${loc.name} do you serve?`, a: `We serve ${loc.name} and surrounding communities throughout ${loc.county} County and Central Florida, including ${loc.nearby.slice(0, 3).map(s => { const n = getLocation(s); return n ? n.name : s }).join(', ')}, and more. Contact us for a free estimate.` },
  ]
}

function generateSchema(loc: Location, service: ServiceCategory, title: string, metaDesc: string, url: string, heroImage: string, faqs: LocationPageData['faqs']) {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': service === 'tree' ? ['LocalBusiness', 'TreeService'] : service === 'fence' ? ['LocalBusiness', 'FenceContractor'] : ['LocalBusiness', 'GeneralContractor'],
    name: COMPANY,
    url: 'https://www.hlsdeland.com',
    logo: '/photos/HLSlogo-nobackground.png',
    image: heroImage,
    description: `${SERVICE_CATEGORIES[service].name} in ${loc.name}, ${loc.stateAbbr} by ${COMPANY}. ISA Certified Arborist (FL-9491A). Licensed and insured. ${REVIEW_STATS.stars} stars on Google.`,
    telephone: PHONE,
    email: 'tyler@hlsdeland.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'DeLeon Springs',
      addressRegion: 'FL',
      postalCode: '32130',
      addressCountry: 'US',
    },
    areaServed: { '@type': 'City', name: loc.name },
    // No aggregateRating/review here. This block renders on ~360 city pages;
    // the rating belongs on /reviews, where the reviews are actually shown.
    sameAs: [
      'https://facebook.com/hoaglandservices',
      'https://instagram.com/hls_deland',
    ],
    priceRange: '$$',
    foundingDate: String(EST_YEAR),
    slogan: 'Built on Hard Work',
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.hlsdeland.com' },
      { '@type': 'ListItem', position: 2, name: SERVICE_CATEGORIES[service].name, item: `https://www.hlsdeland.com/services/${SERVICE_CATEGORIES[service].slug}` },
      { '@type': 'ListItem', position: 3, name: loc.name, item: url },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: metaDesc,
    url,
    isPartOf: { '@type': 'WebSite', url: 'https://www.hlsdeland.com', name: COMPANY },
    about: { '@type': 'LocalBusiness', name: COMPANY },
    primaryImageOfPage: { '@type': 'ImageObject', url: heroImage },
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'en-US',
  }

  return { localBusiness, breadcrumbs, faqPage, webPage }
}

// ──────────────────────────────────────────────────────
// MAIN GENERATOR
// ──────────────────────────────────────────────────────

export function generateLocationPageData(loc: Location, service: ServiceCategory): LocationPageData {
  const cat = SERVICE_CATEGORIES[service]
  const heroImage = cat.heroImages[Math.abs(hashCode(loc.slug)) % cat.heroImages.length]
  const canonicalUrl = `https://www.hlsdeland.com/services/${cat.slug}/${loc.slug}`

  // Title: max 60 chars. Rotate across 4 patterns per service so we don't ship
  // 122 cities with identical-shape titles. The variant index is stable per slug.
  // NOTE: the root layout's title template auto-appends " | Hoag Land Services",
  // so these patterns must NOT include the brand suffix themselves.
  const serviceLabel = service === 'tree' ? 'Tree Service' : service === 'site' ? 'Land Clearing' : 'Fence Company'
  const titleVariant = variant(loc.slug, 4)
  const titlePatterns: Record<ServiceCategory, string[]> = {
    tree: [
      `Tree Service in ${loc.name}, ${loc.stateAbbr}`,
      `${loc.name} Tree Removal & Trimming`,
      `Tree Care in ${loc.name}, ${loc.stateAbbr} — ISA Certified Arborist`,
      `${loc.name}, FL Tree Service & Storm Cleanup`,
    ],
    // Forty of these town pages now rank top-ten and take almost no clicks. The
    // tree pages that earned clicks all name the services after the town, so
    // these do the same.
    site: [
      `Land Clearing ${loc.name} ${loc.stateAbbr} | Grading & Site Prep`,
      `${loc.name} Land Clearing | Forestry Mulching & Grading`,
      `Site Work ${loc.name} ${loc.stateAbbr} | Clearing, Grading, Drainage`,
      `${loc.name} ${loc.stateAbbr} Land Clearing & Excavation`,
    ],
    // Same problem the site-work pages had. Maitland, Ocoee, Umatilla,
    // Fruitland Park, Montverde and Sorrento all rank page one on fencing and
    // take zero clicks between them, and two of these four patterns named no
    // service at all.
    fence: [
      `Fence Company ${loc.name} ${loc.stateAbbr} | Privacy, Wood & Vinyl`,
      `${loc.name} Fence Installation | Wood, Vinyl & Aluminum`,
      `Fencing ${loc.name} ${loc.stateAbbr} | Privacy, Pool & Boundary`,
      `${loc.name} ${loc.stateAbbr} Fence Contractor | Install & Repair`,
    ],
  }
  // A hand-crafted title beats the rotation where Search Console shows the
  // generated one is aimed at the wrong intent. Same slug-service key.
  // The root layout appends " | Hoag Land Services", so keep these short.
  const title = HAND_CRAFTED_TITLE[`${loc.slug}-${service}`] ?? titlePatterns[service][titleVariant]

  // Meta description: 140-155 chars
  const metaDesc = generateMetaDescription(loc, service, serviceLabel)

  // H1 \u2014 rotate across 3 patterns per service so the visible headline isn't
  // identical across all cities. Keeps brand voice ("Built on Hard Work")
  // visible on most but not all pages.
  const h1Variant = variant(loc.slug, 3)
  const h1Patterns: Record<ServiceCategory, string[]> = {
    tree: [
      `${serviceLabel} in ${loc.name}, ${loc.stateAbbr} \u2014 Built on Hard Work`,
      `${loc.name} ${serviceLabel} by an ISA Certified Arborist`,
      `Trusted ${serviceLabel} in ${loc.name}, ${loc.stateAbbr}`,
    ],
    site: [
      `${serviceLabel} in ${loc.name}, ${loc.stateAbbr} \u2014 Built on Hard Work`,
      `${loc.name} ${serviceLabel} & Site Preparation`,
      `Land Clearing & Site Work in ${loc.name}, ${loc.stateAbbr}`,
    ],
    fence: [
      `${serviceLabel} in ${loc.name}, ${loc.stateAbbr} \u2014 Built on Hard Work`,
      `${loc.name} Fence Installation You Can Count On`,
      `Wood, Vinyl & Aluminum Fencing in ${loc.name}, ${loc.stateAbbr}`,
    ],
  }
  const h1 = h1Patterns[service][h1Variant]

  // Subheadline
  const subheadline = generateSubheadline(loc, service)

  const faqs = generateFAQs(loc, service)
  const schema = generateSchema(loc, service, title, metaDesc, canonicalUrl, heroImage, faqs)

  const nearbyLocations = loc.nearby
    .map(slug => {
      const n = getLocation(slug)
      if (!n) return null
      return { name: n.name, href: `/services/${cat.slug}/${slug}` }
    })
    .filter((n): n is { name: string; href: string } => n !== null)

  return {
    location: loc.name,
    state: 'Florida',
    stateAbbr: loc.stateAbbr,
    zipCodes: loc.zipCodes,
    canonicalUrl,
    primaryKeyword: `${serviceLabel.toLowerCase()} ${loc.name.toLowerCase()} fl`,
    secondaryKeywords: generateSecondaryKeywords(loc, service),
    title,
    metaDescription: metaDesc,
    ogImage: heroImage,
    heroImage,
    h1,
    subheadline,
    ctaText: 'Call For a Free Estimate',
    ctaHref: PHONE_HREF,
    serviceCategory: service,
    serviceCategoryName: cat.name,
    services: cat.services,
    processSteps: PROCESS_STEPS[service],
    differentiators: generateDifferentiators(loc, service),
    localContext: generateLocalContext(loc, service),
    faqs,
    nearbyLocations,
    schema: {
      localBusiness: schema.localBusiness,
      breadcrumbs: schema.breadcrumbs,
      faqPage: schema.faqPage,
      webPage: schema.webPage,
    },
  }
}

// ── Helpers ──

function hashCode(s: string): number {
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return hash
}

function generateMetaDescription(loc: Location, service: ServiceCategory, label: string): string {
  const v = variant(loc.slug, 4)
  if (service === 'tree') {
    const opts = [
      `ISA Certified Arborist tree service in ${loc.name}, FL. Tree removal, trimming & storm cleanup. ${REVIEW_STATS.stars} stars. Free estimates.`,
      `Tree removal, trimming, palm pruning & storm cleanup in ${loc.name}, ${loc.county} County. ISA Certified Arborist. Licensed & insured.`,
      `${loc.name} tree service by an ISA Certified Arborist. Removal, trimming, palm pruning & emergency storm work. Free, honest estimates.`,
      `Professional tree care for ${loc.name} homes & businesses. ISA Certified Arborist, fully insured. Removal, trimming & palm work. Call today.`,
    ]
    return opts[v]
  }
  if (service === 'site') {
    const opts = [
      `Professional land clearing in ${loc.name}, FL. Forestry mulching, grading, drainage & site prep. Licensed & insured. Free estimates.`,
      `${loc.name} land clearing, forestry mulching, grading, and drainage work. Single lots to multi-acre commercial projects. Free estimates.`,
      `Site work in ${loc.name}, ${loc.county} County: clearing, mulching, excavation, grading, drainage. Heavy equipment, licensed crew. Call today.`,
      `Land clearing and site preparation for ${loc.name} builders and property owners. Forestry mulching, drainage, and grading done right.`,
    ]
    return opts[v]
  }
  const opts = [
    `Trusted fence installation in ${loc.name}, FL. Wood, vinyl & aluminum fencing. ${REVIEW_STATS.stars} stars on Google. Free estimates.`,
    `${loc.name} fence installation — wood, vinyl, and aluminum. Privacy, pool, agricultural, and boundary fencing. Free estimates.`,
    `Wood, vinyl, and aluminum fencing for ${loc.name} homes, ranches, and commercial properties. Licensed, insured. Free site walks.`,
    `Fence installation and replacement in ${loc.name}, ${loc.county} County. Privacy, livestock, pool barrier, and boundary work. Free estimates.`,
  ]
  return opts[v]
}

function generateSubheadline(loc: Location, service: ServiceCategory): string {
  if (service === 'tree') {
    if (loc.character === 'coastal') return `Professional tree care for ${loc.name} coastal properties. ISA Certified Arborist serving ${loc.county} County homes and businesses.`
    if (loc.character === 'rural') return `Dependable tree care for ${loc.name} acreage and homesteads. ISA Certified Arborist serving rural ${loc.county} County.`
    return `Professional tree care for ${loc.name} homes and businesses. ISA Certified Arborist serving ${loc.county} County since ${EST_YEAR}.`
  }
  if (service === 'site') {
    if (loc.character === 'rural') return `Land clearing, forestry mulching, and site preparation for ${loc.name} properties. From single lots to hundreds of acres.`
    return `Professional land clearing and site preparation for ${loc.name} residential and commercial properties. From single lots to full-scale development.`
  }
  if (loc.character === 'coastal') return `Wood, vinyl, and aluminum fencing for ${loc.name} coastal properties. Built to handle salt air and Florida weather.`
  if (loc.character === 'rural') return `Residential, agricultural, and property boundary fencing for ${loc.name} homeowners and landowners.`
  return `Professional wood, vinyl, and aluminum fence installation for ${loc.name} homes and properties.`
}

function generateSecondaryKeywords(loc: Location, service: ServiceCategory): string[] {
  const name = loc.name.toLowerCase()
  if (service === 'tree') {
    return [`tree removal ${name}`, `tree trimming ${name}`, `arborist ${name}`, `stump grinding ${name}`, `palm pruning ${name}`]
  }
  if (service === 'site') {
    return [`land clearing ${name}`, `forestry mulching ${name}`, `lot clearing ${name}`, `site preparation ${name}`, `grading ${name}`]
  }
  return [`fence installation ${name}`, `fencing ${name} fl`, `vinyl fence ${name}`, `wood fence ${name}`, `fence contractor ${name}`]
}
