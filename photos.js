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
*/

const PHOTOS = [
  { file: "images/MPP03325.jpg", title: "Rescue boat, dusk", date: "2026-07-22",
    location: "Cape May Point, NJ", size: "lg", tags: ["beach"],
    camera: "Sony a6400", lens: "16-50mm", aperture: "f/4.5", shutter: "1/160", iso: "1000",
    alt: "A white lifeguard rescue boat resting on its beach trailer at dusk, dune grass and shoreline in the background" },

  { file: "images/oregon/2022-10-fog-line.jpg", title: "Fog line", date: "2022-10",
    location: "Oregon", size: "lg", tags: ["landscape"],
    film: "Ilford HP5",
    alt: "A person standing in tall grass on a fog-covered cliff top, pine trees emerging from the mist" },

  { file: "images/oregon/2022-10-sea-stack.jpg", title: "Sea stack", date: "2022-10",
    location: "Oregon", size: "md", tags: ["landscape", "coast"],
    film: "Ilford HP5",
    alt: "A rocky sea stack and cliff face above rough surf, seen from above in overcast light" },

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

];
