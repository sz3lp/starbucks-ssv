// Starbucks Shift Supervisor (SSV) Master Reference Data
// Up to date with modern store standards, routines, recipes, and food safety

const SSV_DATA = {
  // 1. Shift Routines & Checklists
  routines: {
    open: {
      title: "Opening Routine (Pre-Open to Peak)",
      duration: "30-45 minutes before store opens",
      description: "Set the team and store up for success. High focus on safety, cash, calibration, and brew cadence.",
      tasks: [
        { id: "op-1", text: "Two-partner arrival: Survey parking lot/perimeter, unlock, enter, relock door immediately.", tag: "Safety", critical: true },
        { id: "op-2", text: "Disarm store security alarm with supervisor code within grace period.", tag: "Safety", critical: true },
        { id: "op-3", text: "Perform safe opening audit: Verify safe par count (standard ~$1,000 - $1,500).", tag: "Cash", critical: true },
        { id: "op-4", text: "Count and assign morning tills ($200 standard par per drawer: Drive-thru, Front 1, Front 2).", tag: "Cash", critical: true },
        { id: "op-5", text: "Record temperature logs: Milk fridges (<40°F), Freezer (<0°F), warming stations.", tag: "Food Safety", critical: true },
        { id: "op-6", text: "Turn on and calibrate Mastrena II espresso machines: pull test shots, check shot times (18-24s standard espresso).", tag: "Bar", critical: true },
        { id: "op-7", text: "Brew fresh Iced Coffee (1 bag + ice to 4L line) and Iced Teas (Black, Green, Passion, White). Date sticker 12h.", tag: "Brew" },
        { id: "op-8", text: "Brew batch drip coffees: Pike Place Roast, Dark Roast (Verona/Komodo), Blonde Roast (Veranda). Reset 30m brew cadence.", tag: "Brew" },
        { id: "op-9", text: "Warming & Pastry: Stock pastry case or display, review pull-to-thaw sheet for morning items.", tag: "Warming" },
        { id: "op-10", text: "Set up sanitizer buckets: Test strips must read 200 - 400 PPM quaternary sanitizer.", tag: "Food Safety", critical: true },
        { id: "op-11", text: "Restock line: Milks, syrups, inclusion bins, cups, lids, sleeves, ice bins filled.", tag: "CS" },
        { id: "op-12", text: "Unlock main doors and open Drive-Thru prompt on the dot at opening minute. Smile and welcome first guests!", tag: "Operations", critical: true }
      ]
    },
    peak: {
      title: "Peak & Playcaller Routine (Morning / Afternoon Rush)",
      duration: "Typically 7:00 AM - 9:30 AM / High volume hours",
      description: "The Playcaller (SSV) leads from the floor, actively managing bottlenecks, morale, and drive-thru times.",
      tasks: [
        { id: "pk-1", text: "Build the Play: Deploy 'Aces in their Places' based on partner strengths (DTO/DTW, Bar 1, Bar 2, CS).", tag: "Playcaller", critical: true },
        { id: "pk-2", text: "Ensure all pre-peak 10-minute breaks are given prior to rush onset.", tag: "People" },
        { id: "pk-3", text: "Maintain planted positions: Baristas stay in their stations; only Support/Playcaller flexes.", tag: "Playcaller", critical: true },
        { id: "pk-4", text: "Monitor Drive-Thru Window Times (target <45-50 seconds) and OTW (Out-the-Window) handoff.", tag: "Drive-Thru" },
        { id: "pk-5", text: "Manage Mobile Order & Pay (MOP) queue: Ensure handoff plane is organized and bagged neatly.", tag: "Customer" },
        { id: "pk-6", text: "Maintain CS (Customer Support) cadence: 8-10 min timer for coffee, ice, milks, sleeves, cups.", tag: "CS", critical: true },
        { id: "pk-7", text: "Perform till drops/skims: Drop large bills ($20s, $50s, $100s) from registers into safe drop boxes.", tag: "Cash", critical: true },
        { id: "pk-8", text: "Floor coaching in the moment: Use ACT model (Appreciate, Coach, Thank). Keep energy high!", tag: "Leadership" }
      ]
    },
    mid: {
      title: "Mid-Shift & Transition Routine",
      duration: "10:30 AM - 3:00 PM",
      description: "Transition off peak, run partner lunches, execute midday pulls, and prep the closing team.",
      tasks: [
        { id: "md-1", text: "Conduct Shift Handover / Huddle: Debrief morning peak metrics, DT times, sales, and labor.", tag: "Leadership" },
        { id: "md-2", text: "Run Partner Meal Breaks (30 min) and remaining 10 min rest breaks according to schedule.", tag: "People", critical: true },
        { id: "md-3", text: "Execute the 18-Hour Food Pull & Thaw (Pastries, Breakfast Sandwiches, Paninis, Cake Pops).", tag: "Food Safety", critical: true },
        { id: "md-4", text: "Perform midday safe count and till audits: verify drawers and drop surplus cash.", tag: "Cash", critical: true },
        { id: "md-5", text: "Complete midday temperature logs and sanitize high-touch contact points.", tag: "Food Safety" },
        { id: "md-6", text: "Restock backroom prep: Sweet Cream pitchers, Mocha sauce, Chai backstock, Whipped Creams.", tag: "Prep" },
        { id: "md-7", text: "Cycle dishes through Hobart dishwasher: ensure wash is >120°F and sanitizing rinse >180°F.", tag: "Cleanliness" },
        { id: "md-8", text: "Receive and verify daily delivery orders (Milk, Fresh Food, or Royston order if scheduled).", tag: "Inventory" }
      ]
    },
    close: {
      title: "Closing Routine (Pre-Close to Post-Close)",
      duration: "Last 2-3 hours of operating day + 30m post-close",
      description: "Secure all store assets, clean all brewing equipment to standard, and set open team up for a flawless morning.",
      tasks: [
        { id: "cl-1", text: "Conduct Afternoon / Evening 3-Hour Pull & Thaw adjustments as needed.", tag: "Food Safety" },
        { id: "cl-2", text: "Pre-close cleaning: Clean and break down cold bar pumps, syrup racks, and one Mastrena 2.", tag: "Cleanliness" },
        { id: "cl-3", text: "Clean and sanitize drip brewers (Urnex / urn cleaner) and wipe down brew baskets.", tag: "Brew" },
        { id: "cl-4", text: "Lock exterior doors promptly at close (e.g. 9:00 PM). Turn off DT headset chime.", tag: "Safety", critical: true },
        { id: "cl-5", text: "Pull all registers/tills: Count down each till to $200 par. Log cash into Cash Management portal.", tag: "Cash", critical: true },
        { id: "cl-6", text: "Count total deposit, prepare tamper-evident deposit bag, record bag number, dual-witness lock.", tag: "Cash", critical: true },
        { id: "cl-7", text: "Final safe count: Reconcile change fund to standard store par. Lock safe completely.", tag: "Cash", critical: true },
        { id: "cl-8", text: "Break down pastry case: Discard expired display food or donate via FoodShare donation bags.", tag: "Food Safety" },
        { id: "cl-9", text: "Clean and sanitize remaining Mastrena II: Run cleaning cycle with Cafiza tablets, soak steam wands.", tag: "Bar", critical: true },
        { id: "cl-10", text: "Hobart final cycles: Wash blender pitchers, shakers, steam pitchers, and dump sanitizer basins.", tag: "Cleanliness" },
        { id: "cl-11", text: "Take out trash and recycling (never open back door after dusk — use main front entrance if needed).", tag: "Safety", critical: true },
        { id: "cl-12", text: "Complete final Walkthrough: Check back doors locked, ice machine closed, water shutoffs checked.", tag: "Safety" },
        { id: "cl-13", text: "Set store security alarm with closing code, exit with closing partner, double-check door latch.", tag: "Safety", critical: true }
      ]
    },
    cleanPlay: {
      title: "Weekly Clean Play Routine",
      duration: "Dedicated weekly 2-3 hour deep clean block",
      description: "Deep sanitary maintenance to maintain pristine QASA / Steritech audit scores and equipment health.",
      tasks: [
        { id: "cp-1", text: "Ice Machine: Empty ice bin completely, clean interior surfaces, sanitize, check gasket for mold.", tag: "Deep Clean", critical: true },
        { id: "cp-2", text: "Floor Drains: Pull drain grates, scrub with disinfectant and drain brush, treat with enzyme foam.", tag: "Deep Clean", critical: true },
        { id: "cp-3", text: "Refrigeration: Clean internal shelves, wipe door gaskets, vacuum condenser dust grates.", tag: "Deep Clean" },
        { id: "cp-4", text: "Dishwasher / Hobart: Delime machine, descale jets, clean scrap trays.", tag: "Deep Clean" },
        { id: "cp-5", text: "Espresso Machines (Mastrena II): Clean bean hoppers with mild warm soapy water (let dry completely before refilling).", tag: "Bar", critical: true },
        { id: "cp-6", text: "Syrup risers & Backsplash: Remove all syrup bottles, wash plexiglass risers, degrease tile walls.", tag: "Cleanliness" },
        { id: "cp-7", text: "Ovens (Merrychef / TurboChef): Run deep oven clean cycle, clean catalytic converters and crumb trays.", tag: "Warming" }
      ]
    }
  },

  // 2. Shelf-Life & Day-Dot Expiration Database
  shelfLife: [
    {
      category: "Espresso & Sauces",
      name: "Mocha Sauce",
      ambient: "24 Hours",
      refrigerated: "N/A",
      notes: "Mix 1 packet with 2L hot water (120-140°F). Whisk thoroughly. Ambient only.",
      hours: 24,
      tag: "Sauce"
    },
    {
      category: "Espresso & Sauces",
      name: "White Chocolate Mocha",
      ambient: "14 Days",
      refrigerated: "N/A",
      notes: "Pump bottle stored at room temperature. Check pump calibration.",
      hours: 336, // 14 days
      tag: "Sauce"
    },
    {
      category: "Espresso & Sauces",
      name: "Chai Concentrate",
      ambient: "24 Hours (once pumped on bar) / Box carton 5 days once opened",
      refrigerated: "N/A",
      notes: "Ambient on bar in pump dispenser.",
      hours: 24,
      tag: "Tea"
    },
    {
      category: "Espresso & Sauces",
      name: "Dark Caramel Sauce",
      ambient: "14 Days",
      refrigerated: "N/A",
      notes: "Pump container at room temperature.",
      hours: 336,
      tag: "Sauce"
    },
    {
      category: "Espresso & Sauces",
      name: "Pumpkin Spice / Seasonal Sauces",
      ambient: "14 Days",
      refrigerated: "N/A",
      notes: "Always label tub or bottle upon opening.",
      hours: 336,
      tag: "Sauce"
    },
    {
      category: "Dairy & Cold Foam",
      name: "Whipped Cream (Prepared Canister)",
      ambient: "N/A",
      refrigerated: "24 Hours",
      notes: "Recipe: 4 pumps Vanilla + Heavy Cream to Venti line. Charge with 1 N2O charger, shake 4-5 times, lay flat in fridge.",
      hours: 24,
      tag: "Dairy"
    },
    {
      category: "Dairy & Cold Foam",
      name: "Vanilla Sweet Cream (VSC Pitcher / Cube)",
      ambient: "N/A",
      refrigerated: "48 Hours",
      notes: "Pitcher Recipe: 13 pumps Vanilla (or 350ml), 2% Milk to Tall line (600ml), Heavy Cream to Max line (1000ml).",
      hours: 48,
      tag: "Dairy"
    },
    {
      category: "Dairy & Cold Foam",
      name: "Opened Milk Cartons (Whole, 2%, Nonfat, Oat, Almond, Soy, Coconut)",
      ambient: "4 Hours (in carafe) / Must stay <40°F",
      refrigerated: "7 Days (or printed carton date, whichever is sooner)",
      notes: "Keep in fridge when not pouring. Never leave on counter during rush.",
      hours: 168,
      tag: "Dairy"
    },
    {
      category: "Cold Brew & Teas",
      name: "Cold Brew Concentrate (Brewed Toddy)",
      ambient: "Brew 20 Hours ambient",
      refrigerated: "7 Days (diluted or undiluted)",
      notes: "Grind coarse on French Press setting. Add 14L cold water (7L inside filter, 7L outside).",
      hours: 168,
      tag: "Cold Brew"
    },
    {
      category: "Cold Brew & Teas",
      name: "Cold Brew Keg (Nitro / Tap)",
      ambient: "N/A",
      refrigerated: "5 Days once kegged",
      notes: "Always sanitize keg and disconnect lines before tapping.",
      hours: 120,
      tag: "Cold Brew"
    },
    {
      category: "Cold Brew & Teas",
      name: "Brewed Iced Teas (Black, Passion, Green)",
      ambient: "12 Hours",
      refrigerated: "N/A",
      notes: "1 tea bag + 1L boiling water. Steep 5 min. Remove bag, add 1 venti scoop ice, fill cold water to 2L.",
      hours: 12,
      tag: "Tea"
    },
    {
      category: "Cold Brew & Teas",
      name: "Brewed Iced Coffee (Curtis Dispenser)",
      ambient: "8 - 12 Hours (store policy)",
      refrigerated: "N/A",
      notes: "1 packet brewed on half batch + 2 venti scoops ice into Curtis.",
      hours: 12,
      tag: "Brew"
    },
    {
      category: "Refreshers & Inclusions",
      name: "Refresher Bases (Strawberry Açaí, Mango Dragonfruit, Pineapple Passionfruit)",
      ambient: "72 Hours (3 Days) opened carton or diluted pitcher",
      refrigerated: "72 Hours",
      notes: "Pitcher: 1:1 ratio base + cold filtered water.",
      hours: 72,
      tag: "Refreshers"
    },
    {
      category: "Refreshers & Inclusions",
      name: "Freeze-Dried Fruit Inclusions (Strawberries, Dragonfruit, Pineapple)",
      ambient: "5 Days (ambient in inclusion bin with lid)",
      refrigerated: "N/A",
      notes: "Keep bins sealed tight with clear lids to prevent moisture absorption.",
      hours: 120,
      tag: "Refreshers"
    },
    {
      category: "Frappuccino Ingredients",
      name: "Frappuccino Roast (Frap Roast)",
      ambient: "48 Hours",
      refrigerated: "N/A",
      notes: "1 packet + 2L room temp water. Whisk till dissolved. Room temp pump station.",
      hours: 48,
      tag: "Frappuccino"
    },
    {
      category: "Frappuccino Ingredients",
      name: "Coffee & Crème Syrup Bases",
      ambient: "30 Days",
      refrigerated: "N/A",
      notes: "Standard room temp pump bottle.",
      hours: 720,
      tag: "Frappuccino"
    },
    {
      category: "Syrups & Drizzles",
      name: "Standard Sugar Syrups (Vanilla, Caramel, Hazelnut, Classic, etc.)",
      ambient: "30 Days",
      refrigerated: "N/A",
      notes: "Write date on bottom or collar of pump when opened.",
      hours: 720,
      tag: "Syrups"
    },
    {
      category: "Syrups & Drizzles",
      name: "Caramel Drizzle (Gravity Bottle)",
      ambient: "14 Days",
      refrigerated: "N/A",
      notes: "Fill gravity bottles from pouch. Check nozzle clean.",
      hours: 336,
      tag: "Syrups"
    },
    {
      category: "Food Pull & Thaw",
      name: "Breakfast Sandwiches & Wraps",
      ambient: "N/A",
      refrigerated: "2 Days (48 Hours from thaw start) or per current IMS label",
      notes: "Thaw in refrigerator. Keep dated trays separated.",
      hours: 48,
      tag: "Food"
    },
    {
      category: "Food Pull & Thaw",
      name: "Egg Bites (Bacon Gruyère, Egg White, etc.)",
      ambient: "N/A",
      refrigerated: "7 Days from thaw date (or 3-day short shelf if noted)",
      notes: "Must remain sealed in plastic wrap until ready to warm.",
      hours: 168,
      tag: "Food"
    },
    {
      category: "Food Pull & Thaw",
      name: "Pastries (Croissants, Scones, Loaves, Muffins)",
      ambient: "2 Days (Pull day + 1 day / 48 hrs ambient)",
      refrigerated: "N/A",
      notes: "Thaw overnight (18-hour pull) for morning display.",
      hours: 48,
      tag: "Food"
    },
    {
      category: "Food Pull & Thaw",
      name: "Cake Pops",
      ambient: "2 Days (48 Hours ambient)",
      refrigerated: "N/A",
      notes: "Ensure tongs or wax paper used at all times.",
      hours: 48,
      tag: "Food"
    },
    {
      category: "Food Pull & Thaw",
      name: "Paninis & Lunch Sandwiches",
      ambient: "N/A",
      refrigerated: "2 Days (48 Hours)",
      notes: "Refrigerated pull, display in grab-and-go RTD&E case.",
      hours: 48,
      tag: "Food"
    }
  ],

  // 3. Playcaller Deployments by Partner Count
  deployments: {
    dtStore: [
      {
        partnerCount: 2,
        name: "2-Partner Play (Minimum Store Staffing)",
        primaryFocus: "Safety, Security, Core Delivery",
        positions: [
          { role: "Shift Supervisor / Lead (Planted Register & Warming)", primary: "Front POS, Warming, DTO flex", secondary: "Safe drops, CS spot check" },
          { role: "Barista (Main Bar)", primary: "Hot Bar, Cold Bar, DT Window", secondary: "Rinse pitchers, wipe steam wand" }
        ],
        tips: "Keep play simple. If rush occurs, park cars or advise mobile guests politely of slight queue. SSV protects the Barista."
      },
      {
        partnerCount: 3,
        name: "3-Partner Play (Early Open / Late Evening)",
        primaryFocus: "DT flow + Dedicated Bar",
        positions: [
          { role: "Drive-Thru Specialist", primary: "DTO & DT Window", secondary: "Stock cups/lids at DT" },
          { role: "Barista 1 (Planted Bar)", primary: "All Espresso & Blended drinks", secondary: "Call out mobile orders" },
          { role: "Playcaller / SSV (Support & Register)", primary: "Front POS, Warming Oven, Customer Support", secondary: "Run breaks, cash drops" }
        ],
        tips: "Playcaller owns Warming and Front register so the Bar barista NEVER leaves espresso."
      },
      {
        partnerCount: 4,
        name: "4-Partner Play (Mid-Volume / Shoulder Hours)",
        primaryFocus: "Separated DT + Dedicated Bar + Front/Warming",
        positions: [
          { role: "DTO (Order Taker)", primary: "DT headset, greet within 3 sec, punch orders", secondary: "Brew coffee, warm DT food if close" },
          { role: "DTW (Window Handoff)", primary: "Tender payments, connect with guests, hand drinks", secondary: "Organize DT straw/carrier queue" },
          { role: "Hot & Cold Bar", primary: "All beverage production", secondary: "Keep milk fridges closed between pours" },
          { role: "Playcaller / Front & Warming", primary: "Front POS, Warming Oven, Customer Support flex", secondary: "Run 10-minute breaks" }
        ],
        tips: "SSV coordinates breaks before customer surges."
      },
      {
        partnerCount: 5,
        name: "5-Partner Play (Standard Peak Play)",
        primaryFocus: "Dedicated Bar 1, Dedicated Warming, Split DT",
        positions: [
          { role: "DTO (Order Taker)", primary: "Drive-thru headset ordering", secondary: "Bag warming items for DT" },
          { role: "DTW (Window Handoff)", primary: "Window connection & payment", secondary: "Keep DT staging rack organized" },
          { role: "Bar 1 (Drive-Thru Drinks)", primary: "Dedicated to Drive-Thru espresso/iced", secondary: "Bar cleanliness" },
          { role: "Warming & Front", primary: "Ovens, pastry warming, Front café till", secondary: "Hand-off mobile orders" },
          { role: "Customer Support / Playcaller (CS)", primary: "Coffee cadence, ice, milks, dishes, floor triage", secondary: "Direct traffic, encourage team" }
        ],
        tips: "Golden rule: Customer Support stays on the timer cycle so Bar never runs out of ice, milk, or cups!"
      },
      {
        partnerCount: 6,
        name: "6-Partner Play (High Peak / Heavy Volume)",
        primaryFocus: "Split Bars (DT Bar & Café/MOP Bar) + Dedicated CS",
        positions: [
          { role: "DTO (Drive-thru Order)", primary: "Taking DT orders, upselling", secondary: "Support DTW handoffs" },
          { role: "DTW (Drive-thru Window)", primary: "Payment, customer connection, window times", secondary: "Check drink lids" },
          { role: "Bar 1 (Drive-Thru Drinks)", primary: "DT Espresso & Refreshers", secondary: "Clean bar zone" },
          { role: "Bar 2 (Café & Mobile Orders)", primary: "Café & Mobile Order & Pay beverages", secondary: "MOP hand-off plane" },
          { role: "Warming (Ovens)", primary: "Planted at ovens, bagging sandwiches/pastries", secondary: "Organize warming delivery line" },
          { role: "Customer Support (CS / SSV)", primary: "Planted Playcaller & CS cycle", secondary: "Till skims, coach in the moment" }
        ],
        tips: "With 6 partners, DT times can drop below 40 seconds if Warming and Bar 1 work in sync."
      },
      {
        partnerCount: 7,
        name: "7-8 Partner Play (Super-Peak Rush)",
        primaryFocus: "Complete Specialization & Expeditor Flow",
        positions: [
          { role: "DTO", primary: "Headset orders", secondary: "Team cheerleading" },
          { role: "DTW", primary: "Handoff & connection score", secondary: "Payment receipt" },
          { role: "Cold Bar / Blender", primary: "Frappuccinos, cold foams, refreshers, shaken teas", secondary: "Cold bar syrups" },
          { role: "Hot Bar 1 (DT)", primary: "DT Hot & Iced espresso", secondary: "Steam milk cadence" },
          { role: "Hot Bar 2 (MOP/Café)", primary: "Mobile & In-store espresso", secondary: "Sleeve & lid staging" },
          { role: "Dedicated Warming", primary: "Both ovens operating continuously", secondary: "Sandwich tongs hygiene" },
          { role: "Expeditor / Hand-off", primary: "Sort tickets, match food + drink, direct customers", secondary: "Mobile plane triage" },
          { role: "Playcaller / CS", primary: "Float, restock milk & ice, time check, celebrate wins", secondary: "Manage bottlenecks" }
        ],
        tips: "The Playcaller should NOT be trapped on a station. Stand back, observe bottlenecks, and flex to where tickets are building up!"
      }
    ],
    cafeStore: [
      {
        partnerCount: 2,
        name: "2-Partner Café Play",
        primaryFocus: "Counter & Bar harmony",
        positions: [
          { role: "Partner 1 (Bar & CS flex)", primary: "Espresso, Blended, Refreshers, dish cycle", secondary: "Milks restock" },
          { role: "Partner 2 / SSV (POS & Warming)", primary: "Front register, warming ovens, customer greeting", secondary: "Safe counts, brew coffee" }
        ],
        tips: "Communicate clearly out loud across the bar."
      },
      {
        partnerCount: 3,
        name: "3-Partner Café Play",
        primaryFocus: "Dedicated Barista, Register, and Support",
        positions: [
          { role: "Bar 1", primary: "All beverage production", secondary: "Bar wipedown" },
          { role: "Front & Warming", primary: "Orders, food warming, customer connection", secondary: "Pastry restock" },
          { role: "Customer Support / SSV", primary: "CS cycle, brew coffee every 15-30m, trash, dishes", secondary: "Cover partner breaks" }
        ],
        tips: "CS partner covers 10-minute breaks seamlessly without disrupting Bar."
      },
      {
        partnerCount: 4,
        name: "4+ Partner Café Play",
        primaryFocus: "Dual Bar + Warming + Front",
        positions: [
          { role: "Bar 1 (Hot)", primary: "Hot espresso drinks, flat whites, macchiatos", secondary: "Milk pitcher wash" },
          { role: "Bar 2 (Cold & MOP)", primary: "Cold foam, iced drinks, refreshers, frappuccinos", secondary: "Ice restock" },
          { role: "Front POS & Hand-off", primary: "Take orders, hand off drinks, connect with guests", secondary: "Clean lobby" },
          { role: "Warming & CS (SSV)", primary: "Ovens, batch brewing, CS cycle, floor leadership", secondary: "Till skims & breaks" }
        ],
        tips: "Ensure Hand-off partner is warmly calling customer names and confirming order modifications."
      }
    ]
  },

  // 4. Beverage & Bar Standards Cheat Sheet
  recipes: [
    {
      category: "Espresso Standards",
      name: "Espresso Shots Standard (Lattes, Mochas, Cappuccinos)",
      short: "1 shot",
      tall: "1 shot",
      grande: "2 shots",
      ventiHot: "2 shots",
      ventiIced: "3 shots",
      trenta: "N/A",
      notes: "Standard espresso pull time is 18 - 24 seconds on Mastrena II. Blonde espresso standard 15 - 26 seconds."
    },
    {
      category: "Espresso Standards",
      name: "Americano Shot Standards (Hot & Iced)",
      short: "1 shot",
      tall: "2 shots",
      grande: "3 shots",
      ventiHot: "4 shots",
      ventiIced: "4 shots",
      trenta: "N/A",
      notes: "Hot: Shots first, fill with hot water. Iced: Shots first, cold water to top green line, add ice."
    },
    {
      category: "Espresso Standards",
      name: "Flat White Standards (Ristretto + Whole Milk)",
      short: "2 shots",
      tall: "2 shots",
      grande: "3 shots",
      ventiHot: "3 shots",
      ventiIced: "4 shots",
      trenta: "N/A",
      notes: "Ristretto espresso shots default. Aerate whole milk 2-3 sec, pour slow from height, finish with iconic white dot in center."
    },
    {
      category: "Syrup & Sweetener",
      name: "Standard Syrup Pumps (Hot Drinks)",
      short: "2 pumps",
      tall: "3 pumps",
      grande: "4 pumps",
      ventiHot: "5 pumps",
      ventiIced: "6 pumps",
      trenta: "7 pumps",
      notes: "Full-dose pumps standard. For half-dose pumps (caramel macchiato gets 1 less pump vanilla: 1/2/3/4/5)."
    },
    {
      category: "Syrup & Sweetener",
      name: "Standard Syrup Pumps (Iced Drinks)",
      short: "N/A",
      tall: "3 pumps",
      grande: "4 pumps",
      ventiHot: "N/A",
      ventiIced: "6 pumps (Venti Iced)",
      trenta: "7 pumps (Iced Coffee / Cold Brew / Tea)",
      notes: "Trenta receives 7 pumps. Shaken Espresso default gets classic: Tall 3, Grande 4, Venti 6 (half-dose pumps)."
    },
    {
      category: "Cold Foam Recipes",
      name: "Vanilla Sweet Cream Cold Foam (Standard VSCCF)",
      ingredients: "100 ml Vanilla Sweet Cream",
      steps: "Pour 100ml Sweet Cream into cold foam blender pitcher. Press Button #3. Pour on top of drink.",
      notes: "Yields 1 perfect silky cold foam serving."
    },
    {
      category: "Cold Foam Recipes",
      name: "Salted Caramel Cream Cold Foam",
      ingredients: "100 ml Sweet Cream + 2 packets Salt",
      steps: "Add 100ml Sweet Cream into cold foam pitcher, add 2 packets salt. Blend on #3. (Drink base receives 2 pumps Caramel in body).",
      notes: "Check salt packets: always use real salt packets, not salted syrup."
    },
    {
      category: "Cold Foam Recipes",
      name: "Chocolate Cold Foam",
      ingredients: "100 ml Sweet Cream + 2 scoops Chocolate Malt Powder",
      steps: "Add 100ml Sweet Cream + 2 scoops malt powder. Blend on #3.",
      notes: "Do not use mocha sauce for chocolate cold foam unless malt is depleted."
    },
    {
      category: "Cold Foam Recipes",
      name: "Matcha Cold Foam",
      ingredients: "100 ml Sweet Cream + 2 scoops Matcha Powder",
      steps: "Add 100ml Sweet Cream + 2 level scoops ceremonial matcha. Blend on #3.",
      notes: "Silky bright green foam with rich earthy flavor."
    },
    {
      category: "Teas & Refreshers",
      name: "Shaken Iced Tea & Refresher Ratios",
      ratio: "Base to water/lemonade/milk line (1:1), syrup, scoop ice, inclusion scoop",
      notes: "Shake 10 times with lid on tightly. Shaking aerates the beverage and creates refreshing texture and optimal temperature."
    },
    {
      category: "Frappuccinos",
      name: "Frappuccino Build Sequence (Coffee & Crème)",
      steps: "1. Pump Frap Roast (2/3/4) -> 2. Milk to lower line -> 3. Pour into blender -> 4. Flavor syrup/inclusions -> 5. Ice scoop -> 6. Base pumps (2/3/4) -> 7. Blend #1.",
      notes: "Never skip the coffee base / crème base emulsifier, or ice will separate instantly."
    }
  ],

  // 5. Cash Management & Safe Reference
  cashGuide: {
    tillPar: 200,
    safeParDefault: 1200,
    guidelines: [
      { rule: "Dual Witness Principle", desc: "Whenever the safe is opened, deposits sealed, or money transferred, 2 partners must be present in the backroom." },
      { rule: "Drawer Skims / Drops", desc: "Never let registers accumulate more than $200 in loose cash. Drop all $50 and $100 bills immediately into the lockbox." },
      { rule: "Change Orders", desc: "Verify armored car change delivery bag against the bank manifest immediately. Log in Cash Management within 1 hour." },
      { rule: "Deposit Bags", desc: "Record 7-digit bag serial number on deposit log. Drop into interior depository safe immediately. Never leave cash unattended." },
      { rule: "Drawer Variances", desc: "Under/over +/- $10 requires supervisor recount. Variances > $20 must be documented and Store Manager notified." }
    ],
    coinRollValues: {
      pennies: 0.50,
      nickels: 2.00,
      dimes: 5.00,
      quarters: 10.00
    }
  },

  // 6. Food Safety & QASA / Steritech Audit Standards
  foodSafety: [
    { title: "Milk Refrigerator Temperature", target: "< 40°F (4.4°C)", rule: "Check every 2-4 hours. Log in digital store book. If 41-45°F, inspect door seal. If >45°F for 2+ hours, toss all dairy.", critical: true },
    { title: "Freezer Temperature", target: "< 0°F (-18°C)", rule: "All sandwiches and pastries must be rock-frozen until pulled for thaw.", critical: false },
    { title: "Quat Sanitizer Concentration", target: "200 - 400 PPM", rule: "Test every bucket with test strips. Water must be lukewarm (never hot). Replace every 2 hours or when soiled.", critical: true },
    { title: "Dishwashing Machine (Hobart)", target: "Wash >120°F, Rinse >180°F", rule: "If rinse falls below 180°F, dishwasher does not sanitize! Switch to 3-compartment sink method with quat sanitizer.", critical: true },
    { title: "Handwashing Standards", target: "20 Seconds with warm water & soap", rule: "Wash hands when switching tasks, touching hair/face, handling cash, clearing trash, or returning from breaks.", critical: true },
    { title: "Day-Dots & Shelf Expirations", target: "100% Labeled with date & AM/PM", rule: "Every open pitcher, backup sauce, whip, and food item must carry an accurate day-dot sticker. Zero tolerance on audit.", critical: true },
    { title: "Steam Wand Hygiene", target: "Blow & wipe after EVERY pitcher", rule: "Use dedicated blue/brown sanitizer towel. Never use dry towel. Soak wand in cold water at night; run Cafiza cycle.", critical: true },
    { title: "Ice Machine Cleanliness", target: "Zero slime / mold on white baffle", rule: "Never leave ice scoop in ice bin! Always hang in sanitary holder. Inspect weekly during Clean Play.", critical: true }
  ],

  // 7. Leadership, Coaching & Incident Scenarios
  scenarios: [
    {
      id: "sc-1",
      category: "Customer Experience",
      title: "Upset Customer Waiting 15 Minutes for Mobile Order",
      situation: "A mobile customer walks in during morning peak, frustrated that their drink isn't at the hand-off plane. The bar queue is 12 drinks deep.",
      correctAction: "Use the LATTE Method. Listen calmly, apologize sincerely ('I am so sorry about that wait, let's get that done for you right now'), look up ticket, prioritize drink on Bar 1, and hand off with a genuine thank you and a $5 recovery card.",
      explanation: "De-escalates frustration immediately, acknowledges their time value, and protects the Third Place experience without debating queue length.",
      ssvTakeaway: "Empower baristas to remake or jump high-friction tickets. Check MOP machine printer status."
    },
    {
      id: "sc-2",
      category: "Attendance & People",
      title: "Partner Calls Out Sick 30 Minutes Before Peak Shift",
      situation: "Your Bar 1 barista texts they are sick with nausea/fever right before 7:00 AM rush begins.",
      correctAction: "1. Remind partner to rest and verify food safety symptom policy (24 hr fever/vomit-free rule). 2. Check store partner phone tree and group chat for coverage. 3. Adjust deployment: flex to a 4-partner play, place your strongest flex partner on Bar 1, and assume Support/Playcaller role to protect them.",
      explanation: "Sick partners cannot work near food. Calmly adjusting deployment and communicating expectations keeps the remaining team unified.",
      ssvTakeaway: "Never guilt an ill partner. Flex the play immediately and communicate with your Store Manager (SM)."
    },
    {
      id: "sc-3",
      category: "Food Safety / Steritech",
      title: "Health Inspector or Steritech Auditor Walks In",
      situation: "An inspector shows their badge at the register unannounced at 11:00 AM.",
      correctAction: "1. Ask for their ID and sign them into the visitor log. 2. Notify your Store Manager (SM) or District Manager (DM) right away. 3. Accompany the auditor on the walk with a notepad. 4. Have team verify sanitizer buckets are fresh and rags are in buckets, not on counters.",
      explanation: "Being professional, transparent, taking notes, and walking alongside the auditor ensures you can address any minor observation immediately.",
      ssvTakeaway: "Audit readiness is every day, not just inspection day. Check temp logs and sanitizer strips immediately."
    },
    {
      id: "sc-4",
      category: "Equipment & Facilities",
      title: "Mastrena II Espresso Machine Shuts Down with Error Code",
      situation: "Primary Bar 1 Mastrena displays error 'Water Flow Reduced' and refuses to pull shots right as lines form.",
      correctAction: "1. Route all hot and iced espresso tickets immediately to Bar 2. 2. Check water shut-off valve behind machine, verify grounds drawer is fully seated, run automatic rinse. 3. If unresolved, call Facilities Contact Center (FCC / 1-888-SBUX-411) with machine asset ID tag for emergency dispatch. 4. Notify SM.",
      explanation: "Quick triage and re-routing prevents bottleneck panic. Facilities needs the exact asset tag and error text.",
      ssvTakeaway: "Always know where the machine serial numbers and FCC phone numbers are posted in the backroom."
    },
    {
      id: "sc-5",
      category: "Cash & Security",
      title: "Register Till is Short $25 at Midday Audit",
      situation: "You conduct a midday till swap and drawer count. The system shows drawer is short by $25.50.",
      correctAction: "1. Recount cash calmly away from customer view. 2. Check for bills trapped under the till drawer tray. 3. Check safe drop box to see if an unlogged drop was made. 4. If confirmed, log the variance in the Cash Management system and notify the Store Manager privately.",
      explanation: "Bills frequently slip beneath drawer dividers. Never accuse partners. Document objectively and let store leadership review audit logs.",
      ssvTakeaway: "Treat cash discrepancies systematically and maintain strict drawer assignment integrity."
    },
    {
      id: "sc-6",
      category: "Third Place & Safety",
      title: "Disruptive Guest Violating Third Place Policy",
      situation: "An individual in the café is playing loud explicit music on a speaker and arguing loudly with other customers.",
      correctAction: "1. Approach with partner support (never corner someone alone). 2. Use calm, polite, neutral tone: 'Hello, welcome to Starbucks. We ask all guests to use headphones and respect others so everyone can enjoy the café. Can you turn the music down for us, please?' 3. If they refuse or threaten violence, disengage immediately and dial non-emergency or 911.",
      explanation: "Safety first. Third Place policy balances welcoming spaces with partner and guest physical safety.",
      ssvTakeaway: "Never escalate or put hands on anyone. De-escalate, set clear boundary, and contact emergency services if safety is compromised."
    }
  ],

  // 8. SSV Practice Certification & Interview Quiz
  quiz: [
    {
      q: "What is the standard holding shelf-life for Vanilla Sweet Cream (VSC) prepared in a pitcher or cube?",
      options: ["24 Hours refrigerated", "48 Hours refrigerated", "72 Hours refrigerated", "7 Days refrigerated"],
      answer: 1,
      explanation: "Vanilla Sweet Cream has a 48-hour refrigerated shelf-life from the time it is mixed."
    },
    {
      q: "When calibrating a Mastrena II espresso machine, what is the ideal shot time window for standard espresso?",
      options: ["12 - 16 seconds", "18 - 24 seconds", "25 - 32 seconds", "10 - 15 seconds"],
      answer: 1,
      explanation: "Standard espresso pull times should fall between 18 and 24 seconds. Shot quality and crema depend on this."
    },
    {
      q: "What is the quaternary sanitizer concentration required for all sanitizer buckets and sanitizing sinks?",
      options: ["50 - 100 PPM", "100 - 150 PPM", "200 - 400 PPM", "500 - 800 PPM"],
      answer: 2,
      explanation: "Starbucks standard for quaternary ammonium sanitizer is 200 - 400 PPM. Always verify with test strips."
    },
    {
      q: "How many espresso shots go into a Venti Iced Latte versus a Venti Hot Latte?",
      options: ["Hot: 2 shots, Iced: 3 shots", "Hot: 2 shots, Iced: 2 shots", "Hot: 3 shots, Iced: 3 shots", "Hot: 1 shot, Iced: 2 shots"],
      answer: 0,
      explanation: "A Venti Hot Latte receives 2 shots of espresso, whereas a Venti Iced Latte receives 3 shots due to the larger 24 oz cup volume."
    },
    {
      q: "What is the core role and responsibility of the Customer Support (CS) partner during peak?",
      options: [
        "Take drive-thru orders when line gets long",
        "Maintain the brewing cycle, restock ice, milk, cups, and keep line partners planted",
        "Wash all dishes in the back room uninterrupted",
        "Handle customer complaints at the front register"
      ],
      answer: 1,
      explanation: "The CS partner is the engine that keeps baristas planted at their stations by keeping ice bins filled, milks stocked, and fresh coffee brewed."
    },
    {
      q: "Under Starbucks Cash Management guidelines, what is the standard par amount for each cash register till?",
      options: ["$100", "$150", "$200", "$300"],
      answer: 2,
      explanation: "The standard par value for a Starbucks till is $200. Any excess should be dropped into safe drop boxes."
    },
    {
      q: "What shelf life is assigned to a freshly prepared batch of Mocha sauce stored on the bar?",
      options: ["12 Hours ambient", "24 Hours ambient", "48 Hours ambient", "7 Days refrigerated"],
      answer: 1,
      explanation: "Mocha sauce has a 24-hour ambient shelf-life. It should never be refrigerated as it thickens and congeals."
    },
    {
      q: "What does the 'LATTE' method stand for when handling customer recovery?",
      options: [
        "Listen, Acknowledge, Take action, Thank, Encourage to return",
        "Look, Apologize, Tell manager, Test drink, Exit",
        "Listen, Agree, Take notes, Total refund, Escalate",
        "Learn, Ask questions, Treat customer, Test recipe, End shift"
      ],
      answer: 0,
      explanation: "LATTE stands for Listen, Acknowledge, Take action, Thank, and Encourage return. It is Starbucks' foundational recovery framework."
    },
    {
      q: "What is the maximum internal temperature allowed for milk storage refrigerators before action must be taken?",
      options: ["32°F", "40°F (4.4°C)", "45°F", "50°F"],
      answer: 1,
      explanation: "Refrigeration must maintain milk at or below 40°F (4.4°C) to prevent bacterial growth and comply with food code."
    },
    {
      q: "In an 18-Hour Pull & Thaw, what is the standard thawed shelf life for Breakfast Sandwiches and Paninis?",
      options: ["24 Hours", "2 Days (48 Hours)", "3 Days", "7 Days"],
      answer: 1,
      explanation: "Breakfast sandwiches and paninis have a standard refrigerated thawed shelf life of 2 days (48 hours)."
    },
    {
      q: "What are the standard pumps of syrup for a Grande Hot Latte and a Grande Iced Latte?",
      options: ["Hot: 3 pumps, Iced: 4 pumps", "Hot: 4 pumps, Iced: 4 pumps", "Hot: 4 pumps, Iced: 5 pumps", "Hot: 2 pumps, Iced: 3 pumps"],
      answer: 1,
      explanation: "Grande hot and iced lattes both receive 4 standard syrup pumps (Hot standard: 2/3/4/5; Iced standard: 3/4/6)."
    },
    {
      q: "During a Clean Play, what is critical when cleaning the Mastrena II bean hoppers?",
      options: [
        "Run them through the high-temperature Hobart dishwasher",
        "Wash with mild warm soapy water and ensure they are 100% bone dry before putting back coffee beans",
        "Soak them in bleach solution",
        "Never wash them with water, only wipe with a dry cloth"
      ],
      answer: 1,
      explanation: "Hoppers must be hand-washed with mild soapy water and allowed to dry completely. Moisture in hoppers ruins whole bean coffee and clogs grinders."
    }
  ],

  // 9. Emergency & Support Contact Directory Templates
  contacts: [
    { title: "Facilities Contact Center (FCC)", phone: "1-888-SBUX-411 (1-888-728-9411)", desc: "For espresso machine breakdown, plumbing issues, refrigeration down, POS failure." },
    { title: "Partner Resources (PRSC)", phone: "1-888-SBUX-4PR (1-888-728-9477)", desc: "Paycheck queries, benefits, LOA, partner relations support." },
    { title: "Business Conduct & Ethics", phone: "1-800-611-7792", desc: "Confidential reporting of ethics violations, harassment, or severe safety concerns." },
    { title: "Safety & Security / Incident Reporting", phone: "Store Ops Safety Hotline", desc: "Log incident reports for customer injuries, theft, property damage, or threats." },
    { title: "Non-Emergency Police", phone: "Check local dispatch sticker", desc: "For non-violent trespassing, loitering, after-hours suspicious activity." }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.SSV_DATA = SSV_DATA;
}
