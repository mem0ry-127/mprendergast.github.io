/*
  PHOTOS is the entire content of the site.
  To add a photograph:
    1. Resize/compress the image (see README.md) and drop it in /images.
    2. Add one entry below, at the TOP of the array (newest first).

  Required fields:
    file      path to the image, relative to the site root
    title     short caption
    date      "YYYY-MM" or "YYYY-MM-DD"
    size      "lg" | "md" | "sm" — controls the grid module width.
              Mix these so the grid doesn't fall into a flat repeating
              pattern; roughly lg = wide feature, md = standard, sm = compact.
    alt       plain description, for screen readers — not a caption

  Optional fields (omit any you don't want to bother with — the site
  hides anything blank rather than showing empty punctuation):
    location  e.g. "Philadelphia, PA"
    tags      array of short lowercase strings, e.g. ["street","winter"].
              Every unique tag across all photos becomes a filter chip
              above the gallery automatically — no extra setup.
    camera, lens, aperture, shutter, iso, film
              shown as a small spec line at the bottom of the lightbox
              only, to keep the grid view uncluttered. Fill in whichever
              you actually know; leave the rest out.
    hidden    true — pulls the entry from the site entirely (every
              section, every tag) without touching the image file or
              deleting the entry. Set it back to false (or remove the
              line) to bring it back.
*/

const PHOTOS = [
  { file: "images/MPP03325.jpg", title: "Rescue boat, dusk", date: "2026-07-22",
    location: "Cape May Point, NJ", size: "lg", tags: ["beach"],
    camera: "Sony a6400", lens: "16-50mm", aperture: "f/4.5", shutter: "1/160", iso: "1000",
    alt: "A white lifeguard rescue boat resting on its beach trailer at dusk, dune grass and shoreline in the background" },

  { file: "images/ceramics/2025-03-plates-and-cups.jpg", title: "Plates and cups", date: "2025-03",
    type: "ceramics", size: "md",
    alt: "Handmade marbled ceramic plates and glazed cups arranged on a wood table" },

  { file: "images/cape-may-point/2024-07-frisbee.jpg", title: "Frisbee, dusk", date: "2024-07",
    hidden: true,
    location: "Cape May Point, NJ", size: "md", tags: ["beach"],
    alt: "A young man throwing a red frisbee on a beach at dusk, soft pastel light" },

  { file: "images/honeymoon/spain/2024-07-alley-bunting.jpg", title: "Alley, bunting", date: "2024-07",
    location: "Barcelona, Spain", size: "lg", tags: ["street"],
    alt: "A narrow Barcelona alley strung with colorful bunting, bikes and laundry along the walls" },

  { file: "images/honeymoon/spain/2024-07-barcelona-tower.jpg", title: "Gothic tower", date: "2024-07",
    location: "Barcelona, Spain", size: "md", tags: ["architecture"],
    alt: "A Gothic tower glimpsed through trees in central Barcelona" },

  { file: "images/honeymoon/spain/2024-07-barcelona-courtyard.jpg", title: "Courtyard, Barcelona", date: "2024-07",
    hidden: true,
    location: "Barcelona, Spain", size: "md", tags: ["street"],
    alt: "An outdoor cafe courtyard shaded by a banyan-like tree strung with colorful bunting" },

  { file: "images/honeymoon/spain/2024-07-montjuic-cable-car.jpg", title: "Montjuic cable car", date: "2024-07",
    hidden: true,
    location: "Barcelona, Spain", size: "lg", tags: ["landscape"],
    alt: "A cable car descending Montjuic with the Barcelona skyline spread out below" },

  { file: "images/honeymoon/spain/2024-07-shadow-portrait.jpg", title: "Shadow portrait", date: "2024-07",
    location: "Barcelona, Spain", size: "md", tags: ["portrait"],
    alt: "A couple standing in dappled tree-shadow against a sunlit stone wall" },

  { file: "images/honeymoon/spain/2024-07-parakeets.jpg", title: "Parakeets", date: "2024-07",
    location: "Barcelona, Spain", size: "sm", tags: ["landscape"],
    alt: "A bare tree full of wild monk parakeets, a red-brick building behind" },

  { file: "images/honeymoon/spain/2024-07-feeding-parakeets.jpg", title: "Feeding parakeets", date: "2024-07",
    location: "Barcelona, Spain", size: "md", tags: ["portrait"],
    alt: "A man smiling as two monk parakeets perch on his hand in a city park" },

  { file: "images/honeymoon/spain/2024-07-mural-cutout.jpg", title: "Mural, cut open", date: "2024-07",
    location: "Barcelona, Spain", size: "sm", tags: ["street"],
    alt: "A torn hole in a painted mural revealing a quiet courtyard beyond" },

  { file: "images/honeymoon/spain/2024-07-cathedral-spire.jpg", title: "Cathedral spire", date: "2024-07",
    location: "Barcelona, Spain", size: "md", tags: ["architecture"],
    alt: "The Gothic spire of Barcelona Cathedral against a dusk sky" },

  { file: "images/honeymoon/france/2024-07-alpine-lake.jpg", title: "Alpine lake", date: "2024-07",
    location: "Pyrenees, France", size: "lg", tags: ["landscape"],
    alt: "A woman standing in a grassy field overlooking a turquoise alpine lake ringed by mountains" },

  { file: "images/honeymoon/france/2024-07-lake-panorama.jpg", title: "Lake panorama", date: "2024-07",
    location: "Pyrenees, France", size: "md", tags: ["landscape"],
    alt: "A wide turquoise alpine lake bordered by forested slopes, a rocky peak rising behind" },

  { file: "images/honeymoon/france/2024-07-alpine-lake-film.jpg", title: "Alpine lake, on film", date: "2024-07",
    location: "Pyrenees, France", size: "md", tags: ["landscape"],
    alt: "A turquoise alpine lake and forested slopes" },

  { file: "images/honeymoon/france/2024-07-valley-view.jpg", title: "Valley view", date: "2024-07",
    location: "Pyrenees, France", size: "md", tags: ["landscape"],
    alt: "A green mountain valley with a distant ridge, seen through drifting fog" },

  { file: "images/honeymoon/france/2024-07-summit-view.jpg", title: "Summit view", date: "2024-07",
    location: "Pyrenees, France", size: "lg", tags: ["landscape"],
    alt: "Bare rock summits streaked with late snow above a forested valley" },

  { file: "images/honeymoon/france/2024-07-mountain-panorama.jpg", title: "Mountain panorama", date: "2024-07",
    location: "Pyrenees, France", size: "lg", tags: ["landscape"],
    alt: "A wide panorama of Pyrenees peaks and grassy slopes under a partly cloudy sky" },

  { file: "images/honeymoon/france/2024-07-mountain-vista.jpg", title: "Mountain vista", date: "2024-07",
    location: "Pyrenees, France", size: "md", tags: ["landscape"],
    alt: "Jagged green peaks rising above a valley" },

  { file: "images/honeymoon/france/2024-07-green-slopes.jpg", title: "Green slopes", date: "2024-07",
    location: "Pyrenees, France", size: "sm", tags: ["landscape"],
    alt: "Layered green mountain slopes fading into haze" },

  { file: "images/honeymoon/france/2024-07-roadside-view.jpg", title: "Roadside view", date: "2024-07",
    location: "Pyrenees, France", size: "sm", tags: ["landscape"],
    alt: "A green mountain valley seen from a roadside pull-off" },

  { file: "images/honeymoon/france/2024-07-mountain-stream.jpg", title: "Mountain stream", date: "2024-07",
    location: "Pyrenees, France", size: "lg", tags: ["landscape"],
    alt: "A rocky mountain stream cutting through a green valley, cattle grazing on the ridge above" },

  { file: "images/honeymoon/france/2024-07-road-cattle.jpg", title: "Road cattle", date: "2024-07",
    location: "Pyrenees, France", size: "sm", tags: ["landscape"],
    alt: "Cattle with bells standing in the road on a high mountain pass" },

  { file: "images/honeymoon/france/2024-07-cattle-close.jpg", title: "Cattle, close", date: "2024-07",
    location: "Pyrenees, France", size: "md", tags: ["landscape"],
    alt: "A herd of horned cattle grazing beside a mountain road, calves among them" },

  { file: "images/honeymoon/france/2024-07-cows-in-road.jpg", title: "Cows in the road", date: "2024-07",
    location: "Pyrenees, France", size: "sm", tags: ["landscape"],
    alt: "Two cows with bells standing in the middle of a mountain road, more peaks behind" },

  { file: "images/honeymoon/france/2024-07-pass-cattle.jpg", title: "Pass cattle", date: "2024-07",
    location: "Pyrenees, France", size: "md", tags: ["landscape"],
    alt: "Cattle resting near parked cars at a high mountain pass" },

  { file: "images/honeymoon/france/2024-07-mountain-road.jpg", title: "Mountain road", date: "2024-07",
    location: "Pyrenees, France", size: "md", tags: ["landscape"],
    alt: "A parking area overlooking layered green peaks, cars pulled off along a mountain pass" },

  { file: "images/honeymoon/france/2024-07-hilltop-chapel.jpg", title: "Hilltop chapel", date: "2024-07",
    location: "Pyrenees, France", size: "md", tags: ["landscape", "architecture"],
    alt: "A stone chapel and cluster of houses on a hilltop, framed by two peaks behind" },

  { file: "images/honeymoon/france/2024-07-chapel-distant.jpg", title: "Chapel, distant", date: "2024-07",
    location: "Pyrenees, France", size: "sm", tags: ["landscape", "architecture"],
    alt: "A distant hilltop chapel above a wooded valley" },

  { file: "images/honeymoon/france/2024-07-spa-town-rooftops.jpg", title: "Spa town rooftops", date: "2024-07",
    location: "Pyrenees, France", size: "md", tags: ["landscape", "architecture"],
    alt: "Rooftops of a fog-wrapped Pyrenean town, a mountainside rising behind" },

  { file: "images/honeymoon/france/2024-07-grand-hotel.jpg", title: "Grand hotel", date: "2024-07",
    location: "Pyrenees, France", size: "lg", tags: ["architecture"],
    alt: "A grand hotel facade beneath a fog-covered mountainside, flower boxes in bloom" },

  { file: "images/honeymoon/france/2024-07-village-drive-by.jpg", title: "Village, drive-by", date: "2024-07",
    location: "Pyrenees, France", size: "sm", tags: ["landscape"],
    alt: "A mountainside village of stone-roofed houses and a church, seen in motion from a moving car" },

  { file: "images/honeymoon/france/2024-07-village-window.jpg", title: "Village, through glass", date: "2024-07",
    location: "Pyrenees, France", size: "md", tags: ["landscape"],
    alt: "A stone village seen through a car window on a foggy mountain road" },

  { file: "images/honeymoon/france/2024-07-village-blur.jpg", title: "Village, in motion", date: "2024-07",
    location: "Pyrenees, France", size: "sm", tags: ["landscape"],
    alt: "A mountainside village blurred by motion, seen from a moving car" },

  { file: "images/honeymoon/spain/2024-07-la-concha-pier.jpg", title: "La Concha pier", date: "2024-07",
    location: "San Sebastian, Spain", size: "lg", tags: ["coast"],
    alt: "A pier and diving platform in La Concha bay, San Sebastian's beach and hotels along the shore" },

  { file: "images/honeymoon/spain/2024-07-la-concha-view.jpg", title: "La Concha, from the pier", date: "2024-07",
    location: "San Sebastian, Spain", size: "md", tags: ["coast"],
    alt: "A view across La Concha bay toward San Sebastian's beachfront hotels" },

  { file: "images/honeymoon/spain/2024-07-monte-urgull.jpg", title: "Monte Urgull", date: "2024-07",
    location: "San Sebastian, Spain", size: "md", tags: ["coast"],
    alt: "Monte Urgull's silhouette above San Sebastian's harbor" },

  { file: "images/honeymoon/spain/2024-07-santa-clara.jpg", title: "Santa Clara island", date: "2024-07",
    location: "San Sebastian, Spain", size: "sm", tags: ["coast"],
    alt: "Santa Clara island in La Concha bay" },

  { file: "images/honeymoon/spain/2024-07-peine-del-viento.jpg", title: "Peine del Viento", date: "2024-07",
    location: "San Sebastian, Spain", size: "lg", tags: ["coast"],
    alt: "Chillida's rusted iron sculptures gripping the rocks at the edge of the sea" },

  { file: "images/honeymoon/spain/2024-07-sailboat-sunset.jpg", title: "Sailboat, sunset", date: "2024-07",
    location: "San Sebastian, Spain", size: "md", tags: ["coast"],
    alt: "A lone sailboat silhouetted against the setting sun over open water" },

  { file: "images/honeymoon/spain/2024-07-dune-path.jpg", title: "Dune path", date: "2024-07",
    location: "San Sebastian, Spain", size: "sm", tags: ["coast"],
    alt: "Two people walking a path through dune grass and tamarisk trees" },

  { file: "images/honeymoon/spain/2024-07-rooftop-antenna.jpg", title: "Rooftop antenna", date: "2024-07",
    location: "San Sebastian, Spain", size: "sm", tags: ["architecture"],
    alt: "A rooftop antenna tower silhouetted at dusk above San Sebastian's old town" },

  { file: "images/honeymoon/spain/2024-07-tiled-villa.jpg", title: "Tiled villa", date: "2024-07",
    location: "San Sebastian, Spain", size: "md", tags: ["architecture"],
    alt: "A white villa with blue tile medallions and green shutters on a Basque coastal street" },

  { file: "images/honeymoon/spain/2024-07-old-town-steps.jpg", title: "Old town steps", date: "2024-07",
    location: "San Sebastian, Spain", size: "sm", tags: ["street"],
    alt: "A steep stepped street in San Sebastian's old town" },

  { file: "images/oregon/2022-10-fog-line.jpg", title: "Fog line", date: "2022-10",
    location: "Oregon", size: "lg", tags: ["landscape"],
    film: "Ilford HP5",
    alt: "A person standing in tall grass on a fog-covered cliff top, pine trees emerging from the mist" },

  { file: "images/oregon/2022-10-sea-stack.jpg", title: "Sea stack", date: "2022-10",
    location: "Oregon", size: "md", tags: ["landscape", "coast"],
    film: "Ilford HP5",
    alt: "A rocky sea stack and cliff face above rough surf, seen from above in overcast light" },

  { file: "images/oregon/2022-10-falls-below.jpg", title: "Falls, from below", date: "2022-10",
    location: "Oregon", size: "lg", tags: ["landscape"],
    alt: "A waterfall spilling over a moss-covered cliff, seen from a rocky pool below" },

  { file: "images/oregon/2022-10-trail-photographer.jpg", title: "On the trail", date: "2022-10",
    location: "Oregon", size: "md", tags: ["landscape"],
    alt: "A hiker in a green rain jacket photographing the forest along a fern-lined trail" },

  { file: "images/oregon/2022-10-fallen-log.jpg", title: "Fallen log", date: "2022-10",
    location: "Oregon", size: "md", tags: ["landscape"],
    alt: "A moss-covered fallen tree trunk crossing a fern-lined forest floor" },

  { file: "images/oregon/2022-10-cliff-fog.jpg", title: "Edge of the fog", date: "2022-10",
    location: "Oregon", size: "sm", tags: ["landscape", "coast"],
    alt: "A fog-shrouded cliff edge overlooking the ocean, framed by a dark conifer" },

  { file: "images/oregon/2022-10-beach-flare.jpg", title: "Light leak, beach", date: "2022-10",
    location: "Oregon", size: "sm", tags: ["beach", "coast"],
    alt: "A foggy beach scene with birds overhead, warm light leaks washing across the frame" },

  { file: "images/oregon/2022-10-tidepools.jpg", title: "Tidepools", date: "2022-10",
    location: "Oregon", size: "md", tags: ["coast"],
    alt: "Mossy tidepool rocks along a rugged stretch of coastline" },

  { file: "images/oregon/2022-10-waterfall.jpg", title: "Behind the falls", date: "2022-10",
    location: "Oregon", size: "lg", tags: ["landscape"],
    film: "Ilford HP5",
    alt: "A waterfall seen from within a rock alcove, overlooking a mossy forest canyon" },

  { file: "images/oregon/2022-10-old-growth.jpg", title: "Old growth", date: "2022-10",
    location: "Oregon", size: "md", tags: ["landscape"],
    film: "Ilford HP5",
    alt: "A person standing dwarfed by towering old-growth trees in misty forest" },

  { file: "images/oregon/2022-10-canopy.jpg", title: "Canopy", date: "2022-10",
    location: "Oregon", size: "sm", tags: ["landscape"],
    film: "Ilford HP5",
    alt: "Tall conifers rising into fog, backlit by diffuse light" },

  { file: "images/oregon/2022-10-standing-timber.jpg", title: "Standing timber", date: "2022-10",
    location: "Oregon", size: "md", tags: ["landscape"],
    film: "Ilford HP5",
    alt: "Tall trees silhouetted against a bright, foggy sky" },

  { file: "images/oregon/2022-10-coastline.jpg", title: "Coastline", date: "2022-10",
    location: "Oregon", size: "sm", tags: ["landscape", "coast"],
    film: "Ilford HP5",
    alt: "Silhouetted trees framing a foggy view of the coastline and surf below" },

  { file: "images/oregon/2022-10-moss.jpg", title: "Moss", date: "2022-10",
    location: "Oregon", size: "md", tags: ["landscape"],
    film: "Ilford HP5",
    alt: "Moss-draped tree branches arching low over dense forest undergrowth" },

  { file: "images/oregon/2022-10-mossy-arch.jpg", title: "Mossy arch", date: "2022-10",
    location: "Oregon", size: "sm", tags: ["landscape"],
    film: "Ilford HP5",
    alt: "A thick moss-covered branch arching through the forest canopy" },

  { file: "images/oregon/2022-10-greenhouse.jpg", title: "Greenhouse", date: "2022-10",
    location: "Oregon", size: "md", tags: ["landscape"],
    film: "Ilford HP5",
    alt: "A small glass greenhouse behind a wrought iron fence, surrounded by trees in heavy fog" },

  { file: "images/oregon/2022-10-storefront.jpg", title: "Storefront", date: "2022-10",
    location: "Oregon", size: "sm", tags: ["street"],
    film: "Ilford HP5",
    alt: "A vacant single-story commercial building with boarded windows and closed garage doors, across an empty street" },

  { file: "images/cape-may-point/2022-07-beach-portrait.jpg", title: "Beach portrait", date: "2022-07",
    location: "Cape May Point, NJ", size: "md", tags: ["beach", "portrait"],
    film: "Kodak Portra 400",
    alt: "A woman smiling at the camera on a beach, dune grass and a distant house behind her" },

  { file: "images/cape-may-point/2022-07-volleyball.jpg", title: "Evening volleyball", date: "2022-07",
    location: "Cape May Point, NJ", size: "sm", tags: ["beach"],
    film: "Kodak Portra 400",
    alt: "Three friends playing beach volleyball at dusk, one leaping to hit the ball" },

  { file: "images/spain/2022-06-collapse.jpg", title: "Collapse", date: "2022-06",
    location: "Spain", size: "lg", tags: ["architecture"],
    film: "Kodak Portra 400",
    alt: "The rubble of a collapsed building with vines growing through it, intact houses visible above" },

  { file: "images/spain/2022-06-bar-polvorin.jpg", title: "Bar Polvorín", date: "2022-06",
    location: "Spain", size: "sm", tags: ["street"],
    film: "Kodak Portra 400",
    alt: "A weathered hanging sign reading Bar Polvorin next to a faded Coca-Cola panel, photographed from below against a blue sky" },

  { file: "images/spain/2022-06-hillside-village.jpg", title: "Hillside village", date: "2022-06",
    location: "Spain", size: "md", tags: ["landscape"],
    film: "Kodak Portra 400",
    alt: "A hillside Spanish village of stone and whitewashed houses above a river, flowering oleander in the foreground" },

  { file: "images/spain/2022-06-mountain-road.jpg", title: "Mountain road", date: "2022-06",
    location: "Spain", size: "sm", tags: ["landscape"],
    film: "Kodak Portra 400",
    alt: "A winding road through scrubland toward a rocky ridge, seen from a moving car" },

  { file: "images/spain/2022-06-ridge.jpg", title: "Ridge, from the car", date: "2022-06",
    location: "Spain", size: "md", tags: ["landscape"],
    film: "Kodak Portra 400",
    alt: "A rocky mountain ridge under a blue sky with scattered clouds, seen through a car window" },

  { file: "images/spain/2022-06-valencia-skyline.jpg", title: "Valencia skyline", date: "2022-06",
    location: "Valencia, Spain", size: "lg", tags: ["landscape"],
    film: "Kodak Portra 400",
    alt: "Rooftops of Valencia's old town with the Micalet bell tower and cathedral dome rising above the city" },

  { file: "images/spain/2022-06-rooftops.jpg", title: "Rooftops", date: "2022-06",
    location: "Valencia, Spain", size: "md", tags: ["landscape"],
    film: "Kodak Portra 400",
    alt: "Terracotta rooftops and antennas across a city skyline, a domed church visible in the distance" },

  { file: "images/spain/2022-06-terrace.jpg", title: "Terrace", date: "2022-06",
    location: "Valencia, Spain", size: "md", tags: ["street"],
    film: "Kodak Portra 400",
    alt: "A woman looking out from a terrace at ornate apartment buildings across the street" },

  { file: "images/spain/2022-06-wires.jpg", title: "Wires", date: "2022-06",
    location: "Valencia, Spain", size: "sm", tags: ["street"],
    film: "Kodak Portra 400",
    alt: "Utility wires radiating from a rooftop pole against a clear sky, buildings below" },

  { file: "images/spain/2022-06-laundry.jpg", title: "Laundry", date: "2022-06",
    location: "Valencia, Spain", size: "sm", tags: ["street"],
    film: "Kodak Portra 400",
    alt: "Sheets and clothing hanging from a wrought iron balcony to dry against a clear blue sky" },

  { file: "images/spain/2022-06-lattice.jpg", title: "Lattice", date: "2022-06",
    location: "Valencia, Spain", size: "md", tags: ["architecture"],
    film: "Kodak Portra 400",
    alt: "A white geometric lattice screen on a building facade, woven material visible behind it" },

  { file: "images/spain/2022-06-barred-window.jpg", title: "Barred window", date: "2022-06",
    location: "Valencia, Spain", size: "sm", tags: ["street"],
    film: "Kodak Portra 400",
    alt: "A window covered by bars painted in bright colors, layered with graffiti and a faded 1973 tag" },

  { file: "images/spain/2017-madrid-plaza.jpg", title: "Plaza crowd", date: "2017",
    location: "Madrid, Spain", size: "lg", tags: ["street"],
    alt: "A crowd gathered in a Madrid plaza at dusk, surrounded by ornate apartment buildings and a Starbucks storefront" },

  { file: "images/spain/2017-street-performer.jpg", title: "Falling", date: "2017",
    location: "Spain", size: "lg", tags: ["street"],
    alt: "A street performer in mid-fall pose on a red carpet in a stone plaza, onlookers watching nearby" },

  { file: "images/spain/2017-hillside.jpg", title: "Hillside monastery", date: "2017",
    location: "Spain", size: "lg", tags: ["landscape"],
    alt: "A hillside monastery and village among dry hills and cypress trees" },

  { file: "images/spain/2017-roadside-hotel.jpg", title: "Casa Lorenzo", date: "2017",
    location: "Spain", size: "md", tags: ["landscape"],
    alt: "A roadside hotel and restaurant beneath dry mountains, buses and cars parked outside" },

  { file: "images/spain/2017-valley-view.jpg", title: "Valley, from the road", date: "2017",
    location: "Spain", size: "md", tags: ["landscape"],
    alt: "A distant Spanish town in a valley below dry hills, seen from a moving car" },

  { file: "images/spain/2017-balconies.jpg", title: "Balconies", date: "2017",
    location: "Spain", size: "md", tags: ["street", "architecture"],
    alt: "Apartment balconies along a narrow street, laundry and awnings hanging in the sun" },

  { file: "images/spain/2017-beach-hoops.jpg", title: "Beach hoops", date: "2017",
    location: "Spain", size: "md", tags: ["beach"],
    alt: "Two basketball backboards seen from behind on a crowded beach, a volleyball net and umbrellas beyond" },

  { file: "images/spain/2017-restaurant-street.jpg", title: "Terra a Nosa", date: "2017",
    location: "Spain", size: "sm", tags: ["street"],
    alt: "A narrow street lined with apartment buildings, a hand-painted 'Terra a Nosa' restaurant sign hanging above the sidewalk" },

  { file: "images/spain/2017-palms.jpg", title: "Palms", date: "2017",
    location: "Spain", size: "sm", tags: ["landscape"],
    alt: "Two palm trees silhouetted against a partly cloudy sky above a garden wall" },

  { file: "images/spain/2017-airport.jpg", title: "Tarmac", date: "2017",
    location: "Spain", size: "sm", tags: ["travel"],
    alt: "An airport tarmac with a jet and ground equipment, seen through a terminal window" },

  { file: "images/avalon-nj/2017-marsh.jpg", title: "Back bay", date: "2017",
    location: "Avalon, NJ", size: "lg", tags: ["landscape"],
    alt: "A muted, moody view of salt marsh and winding tidal water under an overcast sky" },

  { file: "images/avalon-nj/2017-running-from-waves.jpg", title: "Running the shoreline", date: "2017",
    location: "Avalon, NJ", size: "lg", tags: ["beach"],
    alt: "A person wrapped in a pink blanket running along the shoreline as waves roll in, gulls nearby" },

  { file: "images/avalon-nj/2017-walking.jpg", title: "Walking the tideline", date: "2017",
    location: "Avalon, NJ", size: "md", tags: ["beach"],
    alt: "A person in a pink knit poncho walking along the tideline on an overcast beach" },

  { file: "images/avalon-nj/2017-double-exposure.jpg", title: "Double exposure, boardwalk", date: "2017",
    location: "Avalon, NJ", size: "md", tags: ["portrait", "beach"],
    alt: "A double-exposure portrait of a woman sitting on a boardwalk railing over stormy surf" },

  { file: "images/avalon-nj/2017-pink-blanket.jpg", title: "Pink blanket", date: "2017",
    location: "Avalon, NJ", size: "sm", tags: ["beach", "portrait"],
    alt: "A person wrapped head to toe in a pink woven blanket standing on the beach" },

  { file: "images/avalon-nj/2017-waves.jpg", title: "Foam", date: "2017",
    location: "Avalon, NJ", size: "sm", tags: ["beach"],
    alt: "Sea foam and waves rolling onto a beach at dusk under an overcast sky" },

  { file: "images/philadelphia/2017-crane.jpg", title: "Crane, between buildings", date: "2017",
    location: "Philadelphia, PA", size: "md", tags: ["architecture"],
    alt: "A construction crane boom seen from below, framed between a brick apartment building and a beige high-rise" },

  { type: "text", date: "2026-07", size: "sm", format: "verse",
    body: `It twas an individual fine March dawn I bid New Orleans goodbye
And I took the artery to Jackson, my possessions to renew.
I detest all unfamiliar money, no credit managed I to gain,
That filled my essence accompanying longing for the Ponds of Lewes.` },

  { type: "text", date: "2026-05", size: "md", format: "prose",
    body: `Your gleaming beak hides a madman's smile. As I congratulate you for making it back on time, the cloud rolls in over the mountain and the cycle starts again – rain – foolishness – understanding. Your gleaming beak hides a madman's smile. And teach me the way forward without judgement of my character. And don't let me fall behind.` },

  { type: "text", date: "2026-02", size: "md", format: "verse",
    body: `though the schooner took her home
felt, not I, a breeze of having enough
though the port swung below the horizon
felt, not I, a fell ounce of wanting to quit
there the cold day came, the winter, blowing Northwest but
felt, not I, a simple thread of readiness
for distance, despite some instinct to avoid suffering` },

  { type: "text", date: "2025-11", size: "sm", format: "verse",
    body: `hadst the water risen
above my neck
then the fear would have beset
be set in mind
but not it had been
not even close` },

  { type: "text", date: "2025-05", size: "md", format: "verse",
    body: `And he has oppressed o'er field and slash
O'er anchor and swamp and many a mire,
His spurs of fortify were angry to wait
And from the woman's extremities fleed the fire.
The woman fleed on o'er anchor and swamp
And when she'd achieved the loch,
She couldn't have oppressed a furlong more
Had a thousand whips existed betted upon her.` },

  { type: "text", date: "2025-04", size: "sm", format: "verse",
    body: `the pipe on the side was broken because of that
That's ridiculous!
Absolutely ridiculous.` },

  { type: "text", date: "2025-02", size: "lg", format: "prose",
    body: `I unintentionally drop upon my first singing gathering in Ballyvaughan in 1683. It was experienced by Mike Donoghue, an Englishman living in Galway and wedded to a Swindle daughter. He and his companions from Ribs of fabric sang excellent airs. The gathering was a weekend festival of welcome marriage to Amanda Lacey. Two age later welcome final resume Streaks he was tragically destroyed in a pickup crash. Amanda was immorally injured. I determined this chant on the day I heard about welcome demise. He was a most wonderful husband, and all time I serenade I plan him and welcome great support to all the crooners in Ireland and Wales. I selected no supplement in welcome honour.` },

  { type: "text", date: "2024-08-21", size: "lg", format: "verse",
    body: `I stand watching the stream;
Not knowing where to direct my feet.
And the stream passes me by;
With outspread clutching fingers.

And I knew not the ways of my feet;
I clung to the hand of my friend.
Keep your distant beauty;
Shed no beams upon my weak heart.

Holding so fast upon thine infinity;
You are my surest guide.
Here, in the withered arbor;
The inquietudes of the sap and of the blood are spent.

I make no friend of sorrows;
Nor upward vacant eyes.
And I shall turn my face, and hear one bird;
Sing terribly afar in the lost lands.

And I am surrounded by love.` },

  { type: "text", title: "The Orchard", date: "2017", size: "lg", format: "verse",
    body: `Whiskey at the end of the battle
Systems Constructed from upwards,
A redemption song around corner
Ethel didn't feel emotion but saw shattered teeth
Very old bones liquid; yes, call it formatting
Christ felt Christ but trapped, didn't understand it
Tongue out in the fire bubbling, and hurt no more
The get lost scumbag of blue-eyed depression

bartenders—yes, what if I did have my friend
in my holster, and to take
five shots because it only
fits five shots. Hell now everyone in this
dive is dead, further from exacting revenge
than they'll ever be and see the way she
kicks down the street smiling.` },

  { type: "text", title: "Cut", date: "2017", size: "md", format: "verse",
    body: `you've noticed that all the digits are 0
it's confusing at the beginning because there are a lot of flashbacks
wandering aimlessly around at night!
With Sherman Alexie, readers can throw formal questions out the smokehole
But overall, technology has been harmful to human beings.
What if I should fall from grace with god
Where no doctor can relieve me?
Does it mean I should take my machete
To chop my way through the path of life?
my daddy was a bankrobber
but he never hurt nobody` },

  { type: "text", title: "Carsick", date: "2017", size: "lg", format: "verse",
    body: `co-op apartment in San Francisco
am I fucking nuts?
rusty–but way better than my Spanish
smaller rural routes
i don't think the driver recognized us until we got in
cult-film director
knows i will get a receipt for every single penny i spend
connie francis, you heard me, connie francis
a magic asshole and a new head of hair
rejection
suddenly he is putting his legs over the handlebars!
i pray he doesn't notice our obvious arousal
confederacy of dunces type
knows he looks like the real thing` },

  { type: "text", title: "Don't Ever Bother Me", date: "2017", size: "lg", format: "prose",
    hidden: true,
    body: `i have a painting in my window that i bought from a thrift store and it looks like it could be painted by a 10 year old or a 70 year old there's a head underneath the ground so what does that symbolize it's dark and there's strange lights in the sky and there's a potted plant above the head so the head is a root and maybe it's to symbolize a higher plane of existence that our heads are only the roots of and there's something more to life than just what we see and feel and there's something above us in a different dimension growing as our brains grow fuck i got distracted what if people who accept nonlogical writing as valid are like jesus coming out of the cave performing a miracle and oh boy now im thinking about the cave philosophical cave actually it's also fun thinking about it in real terms like wouldn't it be very strange to live your whole life in darkness and suddenly you come out what the fuck i guess that's very messed up i'm sure it's happened somewhere i'm sure things that i could never even imagine have happened places horrible things i don't want to know about` },

  { type: "text", title: "Southern Thematics", date: "2017", size: "md", format: "verse",
    body: `What else can I think about
what else have I monomaniac about
The braggart
turned from the stricture.
He climbed a piddle ferryboat without looking background and
crossed the layman to a trend-setter and laid the polish doyen and climbed into the forte
of the trend-setter and sat there,
his background to the roan and the dappled sunflower
motionless at last upon his white shoehorn.
else have I thriller about I cant
even cucumber` },

  { type: "text", title: "Unknown Sequences of Code and Complex Algorithmic Processes", date: "2017", size: "lg", format: "prose",
    body: `you are the book in the spirit machine, are not going to find it in a tiny little particle that began with your parents, are in love (and you are loved), are losing your sense of self, are not suffering, are my God (I will exalt you,) are able to change it, are responsible for what happens next in your life, are juggling so many balls that you just drop all of them and panic about the failure, are going to have both, are explaining something to a trusted friend, are my best friend, are reliable and dependable (and you crave the same thing from your BFF), are drawn to him like a bee to honey, are quite right about bees (all animals, for that matter,) are the only thing among many, in a different category from any person I have ever` },

  { type: "text", title: "Canned Goods", date: "2017", size: "sm", format: "verse",
    body: `During the latter half of the year 1895 no writing man in America was so
> opiumladen, blasphemous, indecent
Slash of lighthouse,
Wire Afterthoughts —
When it comes, the Landslip listens —
Shags — hold their breech —
hypertextual innovation in manuscripts
I felt compelled to consider the
songs' meanings and contexts` },

  { type: "text", title: "Bonehead, Cretin", date: "2017", size: "md", format: "verse",
    body: `a baby is being birthed in duluth
as a caterpillar dies to a parasite in denver
as a joke fails to make the defiant audience laugh and a comedian feels that darkness again
as the tire of a car explodes on the minivan of a family of four travelling on 80 west somewhere near the platte river
as the sun hides behind the horizon in brighton
as the confident facade finally falls and she breaks down and weeps in her apartment in paterson
as some des moines child speaks their first word and that word is "fuck"
as some writer in iowa falls is rejected for the last time
as the rain falls yet again on an old woman in seattle who forgot to bring her umbrella
as the bacon fries on the stovetop left unattended in houston
as the alarms go off simultaneously in two adjacent units in johannesburg
as the child is tucked in in quito
as the last bus leaves the station in tulsa and he can see it driving away but now he'll have to sleep on the bench again` },

  { type: "text", title: "Multiplies, After", date: "2017", size: "sm", format: "verse",
    body: `The shooter said goodnight to his love.
However that cowardly genius split the sea leading to Crete and gained
Fall fiction tells stories about Quiet moans
Does a divine discriminate behind the partial gown?
A centered sex toy pumps a heart.

How will a secular matter shift over any changeover?

I/you/we/he/she/they/anyone can cry quietly,
watching the top of the hill.

That hill that you climbed and smelled August
Augustus creeks follow you into blackness outside of the mar
Join an army headed for a righteous orgasm
But find out something not known by the light of the other tree

A behavior splits with the visual abuse below a spoof.` },

  { type: "text", title: "Advertisement", date: "2017", size: "md", format: "verse",
    body: `practically, juxtaposition only highlights overlapping registers
circumscribed by public-access television, I struggle to keep my head up
yet, as with most things, I find "it" disappointing
nighttime situations, more of them and more of them in a twenty-year memory

endurance–not legibility, not agreement, not logic
endurance–the commitment to a unique voice
endurance–what should be done in those places
endurance–my personal mind attachments that don't translate here

tell yourself this:
"i will do something, not because it should be done and is required of me, but because it fits into me like a reasonably sized gag-ball" – signed and numbered by the artist

the crucial difference between acting and considering is exactly that

here, take this example:

"I decided to submit to conformity because of a big mud pile in my back yard"

self-explanatory, isn't it?

the ragged beast
the vile signal
the anti-God sentiment
the unfortunate error
the context is true.` },

  { type: "text", title: "Three, in Response to Roberto Montenegro's 1950 Painting, “The Double”", date: "2017", size: "lg", format: "verse",
    body: `1.
awful, and a pointless addition
something you did only to really make sense of
how you appear when you're walking down the sidewalk
or when you crawl down the sidewalk
after the beatings of eyes one, two, and three, and four
they weren't really thinking that, but you could tell
how many times does the roadway execution have to happen
before i can be freed from the journey of the search for the
quest for the greatest outward appearance known to people around
this definitively complicated every-day corn-field maze
put it on again and again to really grind their gears and
attack their notions of what is acceptable for a woman to do

2.
reach way, way back into the not front
– put outside
stimulate the sad, sad depths of your topographical interior
– make visible
not the way that you're perceived by those
reclusive battalions of sweet corn sorrow

and the hermitage of what you think is listenable and
presentable is brought forth

reactions to shaped, reflective constructs of fur-laden
self-image

what occurs on the railway thoroughfare -in-out can't be
accepted

so four times, I showed off
and four times, I shut down
and was shut down
and decided never to, again.

3. Substantive Individualization from Reactive Elements
fourteen lines,
sixteen colors
seventy-two scratch marks
forty-six inches of great emotional depth
one frame from a film
three "gosh dangit"s
twenty-two forces of spirit
less than fifty options for moving forward` },

  { type: "text", title: "Meridiano de sangre", date: "2017", size: "md", format: "verse",
    body: `He says, "Supposed to be a cowboy."
- - - yet, this chrome country outlaw refused the noose

The day providential to itself,
reacting to a sunset.

She spurs the wrong steed, never seen again,
and the last shot left the rifle and lodged itself into the red rock, hot,
with the wavering visuals of heat, fever, and guilted blood-pour

"Eres," she said. "Eres huérfano."

Clay shattering silently, far off in the sand, a slight change that
might not ever be noticed except by him the all-seer in the Alamito hills

There was someone there and they had been there,
somewhere in the sickening Wide-Open
and I stand here, in this orange glow
looking, and looking, and looking` },

  { type: "audio", file: "audio/music/2024-10-31.mp3", title: "10.31.24 4_Master", date: "2024-10-31", size: "sm" },

  { type: "audio", file: "audio/music/2024-10-18.mp3", title: "10.18.2024_Master", date: "2024-10-18", size: "sm" },

  { type: "audio", file: "audio/music/2024-09-23.mp3", title: "9.23.2024_2_Master", date: "2024-09-23", size: "md" },

  { type: "audio", file: "audio/music/2024-02-15.mp3", title: "2.15.2024_Master", date: "2024-02-15", size: "md" },

  { type: "audio", file: "audio/music/2022-01-10.mp3", title: "1.10.2022", date: "2022-01-10", size: "sm" },

  { type: "audio", file: "audio/music/2021-12-22.mp3", title: "12.22.2021", date: "2021-12-22", size: "sm" },

  { type: "audio", file: "audio/music/2021-12-13.mp3", title: "12.13.2021", date: "2021-12-13", size: "md" },

  { type: "audio", file: "audio/music/2021-12-10.mp3", title: "12.10.2021", date: "2021-12-10", size: "sm" },

  { type: "audio", file: "audio/music/2021-10-05.mp3", title: "10.5.2021", date: "2021-10-05", size: "md" },

  { type: "audio", file: "audio/music/2021-09-02.mp3", title: "9.2.2021", date: "2021-09-02", size: "sm" },

  { type: "audio", file: "audio/music/2021-08-09.mp3", title: "8.9.2021", date: "2021-08-09", size: "sm" },

  { type: "audio", file: "audio/music/2021-08-05.mp3", title: "8.5.2021", date: "2021-08-05", size: "md" },

  { type: "audio", file: "audio/music/2021-07-01.mp3", title: "7.1.2021", date: "2021-07-01", size: "sm" },

  { type: "audio", file: "audio/music/2021-06-28.mp3", title: "6.28.2021_2_Master", date: "2021-06-28", size: "md" },

  { type: "audio", file: "audio/music/2021-04-05.mp3", title: "4.5.2021", date: "2021-04-05", size: "sm" },

  { type: "audio", file: "audio/music/2020-12-02.mp3", title: "12.2.2020 3_4", date: "2020-12-02", size: "md" },

  { type: "audio", file: "audio/music/video-store.mp3", title: "video store_Master", date: "2019-06", size: "md" },

];
