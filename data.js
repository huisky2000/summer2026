/*
  ============================================================================
  TRIP DATA — edit this file to update the app
  ============================================================================
  This is the ONLY file you should need to touch to change trip content
  (days, bookings, hotels, things to do, app links). The screens in index.html
  read everything from the TRIP object below and render automatically.

  HOW TO ADD A NEW DAY
  ---------------------
  Copy one of the objects inside `TRIP.days`, paste it as a new entry, and
  edit the fields. Every field is plain text or a simple list, no code
  required. `id` must be unique (use the date, e.g. "2026-07-12").

  HOW TO ADD A HIGHLIGHT / THING TO DO
  -------------------------------------
  Add an entry to a day's `highlights` array:
    { title: "Short name", time: "Optional time", note: "One or two lines",
      mapQuery: "Exact place name, City, Country" }
  `mapQuery` is used to build the "Open in Maps" button. Leave it out (or
  set to null) if there's nothing to map.

  HOW TO ADD OR FIX A BOOKING
  -----------------------------
  Edit `TRIP.bookings`. Each booking belongs to one `provider` (must match
  an id in `TRIP.appLinks` below) so it can show the right "open app" button.

  HOW TO FIX AN APP LINK
  ------------------------
  Edit `TRIP.appLinks`. Each provider has a `web` link (always works) and an
  optional `app` link (a deep link straight into the installed app). Because
  airlines/agencies change their app deep-link format without notice and it
  is different per phone, the app field starts empty for most providers —
  open the booking once in your app, use its "copy link" / share feature,
  and paste that link in here (or directly in the app's Settings > App
  Links screen) so the button opens the app every time after that.

  WEATHER LOCATIONS
  -------------------
  Edit `TRIP.weatherLocations`. Coordinates come from Open-Meteo, lat/lon to
  4 decimal places is plenty.
  ============================================================================
*/

const TRIP = {
  meta: {
    title: "Summer Trip Companion",
    subtitle: "7-17 July 2026 | Norway, Germany, Spain | 2 adults, 3 kids",
    shortName: "EuroTrip"
  },

  // ---------------------------------------------------------------------
  // APP LINKS — used by the Apps tab and by booking cards.
  // `app` = deep link straight into the installed app (fill in once you've
  //         confirmed it works on your phone — see note above).
  // `web` = official web page, always works, sometimes hands off to the
  //         app automatically (this is why Hotels.com already works).
  // ---------------------------------------------------------------------
  appLinks: {
    sas: {
      name: "SAS",
      web: "https://www.flysas.com/en/managemybooking",
      webCheckin: "https://www.flysas.com/us-en/checkin",
      app: "",
      appStoreIOS: "https://apps.apple.com/app/id1477376905",
      appStoreAndroid: "https://play.google.com/store/apps/details?id=se.sas.android",
      note: "Open the SAS app once, go to the trip, use Share > Copy Link, then paste that link into the app field above."
    },
    bookingCarRental: {
      name: "Booking.com Car Rental",
      web: "https://cars.booking.com/Manage",
      app: "",
      appStoreIOS: "https://apps.apple.com/app/id367003839",
      appStoreAndroid: "https://play.google.com/store/apps/details?id=com.booking",
      note: "The Booking.com app supports universal links from booking.com pages, so this should already hand off if the app is installed and you are logged in."
    },
    hotelscom: {
      name: "Hotels.com",
      web: "https://www.hotels.com/trips",
      webFind: "https://www.hotels.com/trips/booking-search?view=SEARCH_BY_ITINERARY_NUMBER_AND_EMAIL",
      app: "",
      appStoreIOS: "https://apps.apple.com/app/id398884927",
      appStoreAndroid: "https://play.google.com/store/apps/details?id=com.expedia.bookings",
      note: "Already confirmed working: this link opens the Hotels.com app directly."
    },
    gotogate: {
      name: "Gotogate",
      web: "https://us.gotogate.com/rf/postbooking-login",
      app: "",
      appStoreIOS: "",
      appStoreAndroid: "",
      note: "Gotogate is mainly a booking website; there isn't a widely used standalone Gotogate app. Use Vueling directly for the BCN-DUS flight."
    },
    vueling: {
      name: "Vueling",
      web: "https://m.vueling.com/MyBookings",
      webHome: "https://www.vueling.com/en",
      app: "",
      appStoreIOS: "https://apps.apple.com/app/id505574469",
      appStoreAndroid: "https://play.google.com/store/apps/details?id=com.vueling.vuelingapp",
      note: "Open the Vueling app once, find the booking, use Share/Copy Link if available, then paste that link into the app field above."
    }
  },

  // ---------------------------------------------------------------------
  // BOOKINGS — shown in the Bookings tab and linked to from day details.
  // `appLinkId` must match a key in TRIP.appLinks above.
  // ---------------------------------------------------------------------
  bookings: [
    {
      id: "sas-outbound",
      title: "SAS Outbound",
      ref: "YWLAOR",
      appLinkId: "sas",
      lines: [
        "SK377 TRD-OSL, 7 July 20:30-21:25",
        "SK816 OSL-DUS, 8 July 08:40-10:30"
      ]
    },
    {
      id: "car-rental",
      title: "Car Rental",
      ref: "786926825",
      appLinkId: "bookingCarRental",
      lines: [
        "Booking.com ref 786926825",
        "Enterprise, Standard SUV",
        "Pick up: 8 July 12:00, DUS airport terminal",
        "Drop off: 11 July 09:00, STR airport terminal"
      ]
    },
    {
      id: "vueling-to-bcn",
      title: "Vueling / Gotogate to BCN",
      ref: "NGMUUV",
      appLinkId: "vueling",
      lines: [
        "Gotogate order 1139-733-520",
        "Vueling ref NGMUUV",
        "VY1869 STR-BCN, 11 July 10:00-12:00"
      ]
    },
    {
      id: "vueling-to-dus",
      title: "Vueling / Gotogate to DUS",
      ref: "ZHMKSV",
      appLinkId: "vueling",
      lines: [
        "Gotogate order 1134-491-299",
        "Vueling ref ZHMKSV",
        "VY1896 BCN-DUS, 17 July 06:50-09:05"
      ]
    },
    {
      id: "sas-return",
      title: "SAS Return",
      ref: "YWFM5O",
      appLinkId: "sas",
      lines: [
        "SK817 DUS-OSL, 17 July 13:55-15:40",
        "SK364 OSL-TRD, 17 July 19:05-20:00"
      ]
    },
    {
      id: "hotels-summary",
      title: "Hotels",
      ref: "",
      appLinkId: "hotelscom",
      lines: [
        "7 July: Clarion Hotel Oslo Airport",
        "8 July: Best Western Wein- und Parkhotel Nierstein",
        "9-11 July: Hotel Royal Stuttgart",
        "11-14 July: Eurostars Sitges",
        "14-17 July: not booked yet"
      ]
    }
  ],

  // ---------------------------------------------------------------------
  // EDITABLE NOTES — free-text fields saved on this device only.
  // ---------------------------------------------------------------------
  noteFields: [
    { key: "carRental", label: "Car Rental Notes", placeholder: "Desk location, fuel policy, parking, damage photos" },
    { key: "hotelNotes", label: "Hotel Notes", placeholder: "Hotel confirmation numbers, parking, check-in times" },
    { key: "hotelSpainOpen", label: "14-17 July Hotel", placeholder: "Add hotel name, address, confirmation number when booked" },
    { key: "flights", label: "Flight Notes", placeholder: "Seats, baggage, check-in notes, passport reminders" }
  ],

  // ---------------------------------------------------------------------
  // WEATHER LOCATIONS — shown in the Weather tab. `id` is matched against
  // a day's `weatherLocationId` to show that location's forecast in the
  // day detail screen.
  // ---------------------------------------------------------------------
  weatherLocations: [
    { id: "oslo", name: "Oslo Airport", lat: 60.1939, lon: 11.1004 },
    { id: "nierstein", name: "Nierstein", lat: 49.8706, lon: 8.3366 },
    { id: "heidelberg", name: "Heidelberg", lat: 49.4106, lon: 8.7158 },
    { id: "stuttgart", name: "Stuttgart", lat: 48.7744, lon: 9.1726 },
    { id: "sitges", name: "Sitges", lat: 41.2372, lon: 1.8059 },
    { id: "barcelona", name: "Barcelona", lat: 41.2974, lon: 2.0833 }
  ],

  // ---------------------------------------------------------------------
  // DAYS — the heart of the app. Each day powers the Trip Dashboard card,
  // the Timeline entry, the Routes section, and the Day Detail screen.
  //
  // Fields:
  //   id              unique string, use the ISO date
  //   date            display label, e.g. "7 July"
  //   dateLong        full label, e.g. "Tuesday 7 July 2026"
  //   accent          one of: red | green | blue | airport (controls the
  //                   color stripe on cards, purely cosmetic)
  //   summary         one line shown on the dashboard card
  //   weatherLocationId  id from TRIP.weatherLocations to show in detail view
  //   stops           ordered array of {label} for the route diagram
  //                   (omit or leave empty if there's no driving route)
  //   route           optional {origin, destination, waypoints[], mode}
  //                   used to build the "Navigate" Google Maps button.
  //                   waypoints/origin/destination are place name strings.
  //   highlights      array of {title, time, note, mapQuery} — the things
  //                   to do / see, shown in the Day Detail screen
  //   bookingIds      array of booking ids (from TRIP.bookings) relevant
  //                   to this day
  //   hotel           optional {name, mapQuery} for where you sleep that night
  // ---------------------------------------------------------------------
  days: [
    {
      id: "2026-07-07",
      date: "7 July",
      dateLong: "Tuesday 7 July 2026",
      accent: "red",
      summary: "TRD to OSL, overnight at the airport",
      weatherLocationId: "oslo",
      stops: [],
      route: null,
      highlights: [
        {
          title: "Flight TRD to OSL",
          time: "20:30-21:25",
          note: "SAS SK377. Booking ref YWLAOR.",
          mapQuery: null
        },
        {
          title: "Clarion Hotel Oslo Airport",
          time: "Overnight",
          note: "Hans Gaardervei 15, 2060 Gardermoen.",
          mapQuery: "Clarion Hotel Oslo Airport, Hans Gaardervei 15, 2060 Gardermoen, Norway"
        }
      ],
      bookingIds: ["sas-outbound"],
      hotel: {
        name: "Clarion Hotel Oslo Airport",
        mapQuery: "Clarion Hotel Oslo Airport, Hans Gaardervei 15, 2060 Gardermoen, Norway"
      }
    },
    {
      id: "2026-07-08",
      date: "8 July",
      dateLong: "Wednesday 8 July 2026",
      accent: "red",
      summary: "OSL to DUS, pick up car, drive to Nierstein",
      weatherLocationId: "nierstein",
      stops: [
        { label: "Dusseldorf Airport (DUS)" },
        { label: "Cologne Cathedral" },
        { label: "Schloss Drachenburg" },
        { label: "Best Western Wein- und Parkhotel Nierstein" }
      ],
      route: {
        origin: "Dusseldorf Airport (DUS), Germany",
        destination: "Best Western Wein- und Parkhotel Nierstein, Nierstein, Germany",
        waypoints: ["Cologne Cathedral, Cologne, Germany", "Schloss Drachenburg, Koenigswinter, Germany"],
        mode: "driving"
      },
      highlights: [
        {
          title: "Flight OSL to DUS",
          time: "08:40-10:30",
          note: "SAS SK816. Booking ref YWLAOR.",
          mapQuery: null
        },
        {
          title: "Pick up rental car",
          time: "12:00",
          note: "Enterprise Standard SUV at DUS airport terminal. Booking.com ref 786926825.",
          mapQuery: "Dusseldorf Airport (DUS), Germany"
        },
        {
          title: "Cologne Cathedral",
          note: "Quick stop in the old town on the way south.",
          mapQuery: "Cologne Cathedral, Cologne, Germany"
        },
        {
          title: "Schloss Drachenburg",
          note: "Fairytale-style castle above the Rhine, good photo stop.",
          mapQuery: "Schloss Drachenburg, Koenigswinter, Germany"
        }
      ],
      bookingIds: ["sas-outbound", "car-rental"],
      hotel: {
        name: "Best Western Wein- und Parkhotel Nierstein",
        mapQuery: "Best Western Wein- und Parkhotel Nierstein, Nierstein, Germany"
      }
    },
    {
      id: "2026-07-09",
      date: "9 July",
      dateLong: "Thursday 9 July 2026",
      accent: "green",
      summary: "Nierstein to Stuttgart via Heidelberg and Sinsheim",
      weatherLocationId: "stuttgart",
      stops: [
        { label: "Best Western Wein- und Parkhotel Nierstein" },
        { label: "Heidelberg Castle and Old Town" },
        { label: "Technik Museum Sinsheim" },
        { label: "Hotel Royal Stuttgart" }
      ],
      route: {
        origin: "Best Western Wein- und Parkhotel Nierstein, Nierstein, Germany",
        destination: "Hotel Royal, Stuttgart, Germany",
        waypoints: ["Heidelberg Castle, Heidelberg, Germany", "Technik Museum Sinsheim, Sinsheim, Germany"],
        mode: "driving"
      },
      highlights: [
        {
          title: "Heidelberg Castle and Old Town",
          note: "Hilltop castle ruins plus a walkable historic centre. Good morning stop.",
          mapQuery: "Heidelberg Castle, Heidelberg, Germany"
        },
        {
          title: "Technik Museum Sinsheim",
          note: "Concorde, Tupolev Tu-144, and a huge vehicle collection. A hit with kids of most ages.",
          mapQuery: "Technik Museum Sinsheim, Sinsheim, Germany"
        }
      ],
      bookingIds: ["car-rental"],
      hotel: {
        name: "Hotel Royal, Stuttgart",
        mapQuery: "Hotel Royal, Stuttgart, Germany"
      }
    },
    {
      id: "2026-07-10",
      date: "10 July",
      dateLong: "Friday 10 July 2026",
      accent: "blue",
      summary: "Family day in Stuttgart, Tripsdrill recommended",
      weatherLocationId: "stuttgart",
      stops: [],
      route: {
        origin: "Hotel Royal, Stuttgart, Germany",
        destination: "Hotel Royal, Stuttgart, Germany",
        waypoints: ["Tripsdrill Theme Park, Cleebronn, Germany"],
        mode: "driving"
      },
      highlights: [
        {
          title: "Tripsdrill Theme Park (recommended)",
          note: "Strongest family choice for ages 10, 14, and 17. Rides plus a wildlife park.",
          mapQuery: "Tripsdrill Theme Park, Cleebronn, Germany"
        },
        {
          title: "Alternative: Mercedes-Benz and Porsche Museums",
          note: "Two car museums in Stuttgart, easy to combine in one day.",
          mapQuery: "Mercedes-Benz Museum, Stuttgart, Germany"
        },
        {
          title: "Alternative: Black Forest B500",
          note: "Scenic drive via Baden-Baden, Mummelsee, and Freudenstadt.",
          mapQuery: "Mummelsee, Seebach, Germany"
        }
      ],
      bookingIds: ["car-rental"],
      hotel: {
        name: "Hotel Royal, Stuttgart",
        mapQuery: "Hotel Royal, Stuttgart, Germany"
      }
    },
    {
      id: "2026-07-11",
      date: "11 July",
      dateLong: "Saturday 11 July 2026",
      accent: "blue",
      summary: "Drop off car at STR, fly to BCN, on to Sitges",
      weatherLocationId: "sitges",
      stops: [],
      route: {
        origin: "Hotel Royal, Stuttgart, Germany",
        destination: "Stuttgart Airport (STR), Germany",
        waypoints: [],
        mode: "driving"
      },
      highlights: [
        {
          title: "Drop off rental car",
          time: "09:00",
          note: "Enterprise drop-off at Stuttgart Airport (STR) terminal.",
          mapQuery: "Stuttgart Airport (STR), Germany"
        },
        {
          title: "Flight STR to BCN",
          time: "10:00-12:00",
          note: "Vueling VY1869. Gotogate order 1139-733-520, Vueling ref NGMUUV.",
          mapQuery: null
        },
        {
          title: "Transfer to Eurostars Sitges",
          note: "Drive or transfer from Barcelona Airport to the hotel in Sitges.",
          mapQuery: "Eurostars Sitges, Sitges, Spain"
        }
      ],
      bookingIds: ["car-rental", "vueling-to-bcn"],
      hotel: {
        name: "Eurostars Sitges",
        mapQuery: "Eurostars Sitges, Sitges, Spain"
      }
    },
    {
      id: "2026-07-12",
      date: "12 July",
      dateLong: "Sunday 12 July 2026",
      accent: "green",
      summary: "Sitges and Barcelona beach and city day",
      weatherLocationId: "sitges",
      stops: [],
      route: null,
      highlights: [
        {
          title: "Sitges beaches and old town",
          note: "Easy walking town, good swimming, relaxed pace.",
          mapQuery: "Sitges, Spain"
        },
        {
          title: "Optional: Barcelona day trip",
          note: "Short train ride from Sitges into central Barcelona.",
          mapQuery: "Barcelona, Spain"
        }
      ],
      bookingIds: [],
      hotel: {
        name: "Eurostars Sitges",
        mapQuery: "Eurostars Sitges, Sitges, Spain"
      }
    },
    {
      id: "2026-07-13",
      date: "13 July",
      dateLong: "Monday 13 July 2026",
      accent: "green",
      summary: "Sitges and Barcelona beach and city day",
      weatherLocationId: "sitges",
      stops: [],
      route: null,
      highlights: [
        {
          title: "Sitges and Barcelona, day two",
          note: "Use the hotel as a base, mix beach time with sightseeing.",
          mapQuery: "Sitges, Spain"
        }
      ],
      bookingIds: [],
      hotel: {
        name: "Eurostars Sitges",
        mapQuery: "Eurostars Sitges, Sitges, Spain"
      }
    },
    {
      id: "2026-07-14",
      date: "14 July",
      dateLong: "Tuesday 14 July 2026",
      accent: "blue",
      summary: "Hotel not booked yet",
      weatherLocationId: "barcelona",
      stops: [],
      route: null,
      highlights: [
        {
          title: "Hotel needed for 14-17 July",
          note: "Add the address and plans here once booked. See Booking Notes for the editable field.",
          mapQuery: null
        }
      ],
      bookingIds: [],
      hotel: null
    },
    {
      id: "2026-07-15",
      date: "15 July",
      dateLong: "Wednesday 15 July 2026",
      accent: "blue",
      summary: "Hotel not booked yet",
      weatherLocationId: "barcelona",
      stops: [],
      route: null,
      highlights: [
        {
          title: "Hotel needed for 14-17 July",
          note: "Add the address and plans here once booked.",
          mapQuery: null
        }
      ],
      bookingIds: [],
      hotel: null
    },
    {
      id: "2026-07-16",
      date: "16 July",
      dateLong: "Thursday 16 July 2026",
      accent: "blue",
      summary: "Hotel not booked yet",
      weatherLocationId: "barcelona",
      stops: [],
      route: null,
      highlights: [
        {
          title: "Hotel needed for 14-17 July",
          note: "Add the address and plans here once booked.",
          mapQuery: null
        }
      ],
      bookingIds: [],
      hotel: null
    },
    {
      id: "2026-07-17",
      date: "17 July",
      dateLong: "Friday 17 July 2026",
      accent: "airport",
      summary: "BCN to DUS to OSL to TRD, long travel day",
      weatherLocationId: "barcelona",
      stops: [],
      route: {
        origin: null,
        destination: "Barcelona Airport (BCN), Spain",
        waypoints: [],
        mode: "driving"
      },
      highlights: [
        {
          title: "Flight BCN to DUS",
          time: "06:50-09:05",
          note: "Vueling VY1896. Gotogate order 1134-491-299, ref ZHMKSV.",
          mapQuery: "Barcelona Airport (BCN), Spain"
        },
        {
          title: "Flight DUS to OSL",
          time: "13:55-15:40",
          note: "SAS SK817. Booking ref YWFM5O.",
          mapQuery: "Dusseldorf Airport (DUS), Germany"
        },
        {
          title: "Flight OSL to TRD",
          time: "19:05-20:00",
          note: "SAS SK364. Booking ref YWFM5O.",
          mapQuery: "Oslo Airport (OSL), Norway"
        }
      ],
      bookingIds: ["vueling-to-dus", "sas-return"],
      hotel: null
    }
  ],

  // ---------------------------------------------------------------------
  // TRAFFIC SHORTCUTS — quick map views centered on key cities.
  // ---------------------------------------------------------------------
  trafficSpots: [
    { name: "Cologne Traffic", lat: 50.9413, lon: 6.9583 },
    { name: "Heidelberg Traffic", lat: 49.4106, lon: 8.7158 },
    { name: "Stuttgart Traffic", lat: 48.7744, lon: 9.1726 }
  ],

  // ---------------------------------------------------------------------
  // TIPS — shown in the Tips tab, plain text only.
  // ---------------------------------------------------------------------
  tips: [
    { title: "Arrival Day", note: "Keep 8 July flexible. Luggage, car rental, food, and tired kids can easily use more time than expected." },
    { title: "Parking", note: "Check hotel parking before arrival. In old towns, use central parking garages and walk." },
    { title: "Family Rhythm", note: "Use one major stop before lunch and one after lunch. Avoid too many short village stops." },
    { title: "Offline Backup", note: "Download offline Google Maps areas for Cologne, Rhine/Main, Heidelberg, Stuttgart, and Black Forest." }
  ],
  carKitItems: [
    "Water, snacks, motion-sickness tablets, charging cables, and a small trash bag.",
    "Passports, driving license, car rental papers, hotel confirmations, and flight details.",
    "Light rain jackets. July can switch between warm sun and sudden showers."
  ]
// ---------------------------------------------------------------------
// CULTURE — curated cultural activities aligned with your route
// Keep rhythm: 1 major culture stop before lunch, 1 lighter after lunch
// ---------------------------------------------------------------------
culture: [

  // -------------------------
  // 8 July – Cologne / Rhine
  // -------------------------
  {
    date: "8 July",
    location: "Cologne",
    items: [
      {
        title: "Cologne Cathedral + Old Town Walk",
        note: "Iconic Gothic cathedral and riverside old town. Combine with short walking route along the Rhine bridges for views and street life."
      },
      {
        title: "Rhine Promenade Street Life",
        note: "Walk or sit along the river. Street performers and relaxed local atmosphere in summer evenings."
      },
      {
        title: "Evening Fireworks / River Events (if dates align)",
        note: "Cologne hosts summer river events and fireworks (e.g. Rhine celebrations), creating a strong local festival atmosphere. [1](https://germanytravel.blog/cities/cologne/best-time-to-visit/festivals-and-holidays/)"
      }
    ]
  },

  // -------------------------
  // 9 July – Heidelberg
  // -------------------------
  {
    date: "9 July",
    location: "Heidelberg",
    items: [
      {
        title: "Heidelberg Castle + Old Town Culture Walk",
        note: "Historic castle with panoramic views. Old town streets, cafes, and local shops make a classic cultural stop."
      },
      {
        title: "Philosopher’s Walk + River View",
        note: "Scenic walking path giving iconic views of the city – good quiet cultural break for kids."
      },
      {
        title: "Castle Illumination (if scheduled)",
        note: "Traditional summer event where the castle is lit with fireworks and lights, a historic cultural spectacle dating back centuries. [2](https://triplou.com/blog/germany-in-july/)"
      }
    ]
  },

  // -------------------------
  // 10 July – Stuttgart / Black Forest
  // -------------------------
  {
    date: "10 July",
    location: "Stuttgart / Black Forest",
    items: [
      {
        title: "Mercedes-Benz or Porsche Museum",
        note: "Strong engineering + culture experience. Good balance for teenagers and fits your engineering profile."
      },
      {
        title: "Black Forest Cultural Landscape Drive (B500)",
        note: "Traditional villages, local crafts, and regional food culture. Combine scenery with culture."
      },
      {
        title: "Local Summer Concerts / Open-air Events",
        note: "Black Forest region hosts open-air concerts and community events in July (check locally near Baden-Baden or Freudenstadt). [3](https://www.blackforest-highlights.com/experience/events)"
      }
    ]
  },

  // -------------------------
  // 11–13 July – Barcelona / Sitges
  // -------------------------
  {
    date: "11–13 July",
    location: "Barcelona / Sitges",
    items: [
      {
        title: "Gaudí Architecture Route (Sagrada Familia + Park Güell)",
        note: "Top cultural highlight. Book tickets in advance due to high demand in July. [4](https://barcelonahacks.com/barcelona-in-july/)"
      },
      {
        title: "Gothic Quarter + Street Culture",
        note: "Walk through historic streets, small squares, and street markets for authentic local atmosphere."
      },
      {
        title: "Beach + Evening Promenade Culture",
        note: "Barcelona in July blends beach life with city culture, especially in the evenings with music and street activities. [4](https://barcelonahacks.com/barcelona-in-july/)"
      },
      {
        title: "Optional: Flamenco Show",
        note: "Classic Spanish cultural experience combining music, dance, and storytelling."
      }
    ]
  },

  // -------------------------
  // 14–16 July – Spain flexible days
  // -------------------------
  {
    date: "14–16 July",
    location: "Spain (flexible)",
    items: [
      {
        title: "San Fermín Festival (Pamplona, if reachable)",
        note: "Major traditional Spanish festival (6–14 July) with parades and cultural events beyond the bull run. [5](https://www.el-born.com/calendar-2026-july)"
      },
      {
        title: "Barcelona / Madrid Exhibitions",
        note: "Large-scale exhibitions (art, history, immersive experiences) run across July in major cities. [6](https://www.esmadrid.com/en/events-calendar)"
      },
      {
        title: "Local Food & Market Experience",
        note: "Markets like La Boqueria offer strong cultural immersion through food and daily life."
      }
    ]
  }
],

// ---------------------------------------------------------------------
// OPTIONAL: QUICK DAY-PLANNING RULE FOR CULTURE
// ---------------------------------------------------------------------
cultureTips: [
  "Prioritise 1 major cultural highlight per day (cathedral, museum, castle).",
  "Add 1 relaxed local experience (walk, market, or river/beach time).",
  "Use evenings for festivals, concerts, or open-air events when available.",
  "In July, always assume crowd → go early morning or late evening."
]
};
