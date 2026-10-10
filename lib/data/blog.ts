export type BlogBlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "callout"
  | "list"
  | "quote"
  | "table"
  | "embed";

export interface BlogParagraphBlock {
  id: string;
  type: "paragraph";
  text: string;
}

export interface BlogHeadingBlock {
  id: string;
  type: "heading";
  level: 2 | 3;
  text: string;
}

export interface BlogImageBlock {
  id: string;
  type: "image";
  url: string;
  caption?: string;
  alt?: string;
  layout?: "contained" | "full" | "wide";
}

export interface BlogCalloutBlock {
  id: string;
  type: "callout";
  variant: "tip" | "warning" | "info" | "tech" | "calculation";
  title?: string;
  text: string;
}

export interface BlogListBlock {
  id: string;
  type: "list";
  style: "bullet" | "numbered";
  items: string[];
}

export interface BlogQuoteBlock {
  id: string;
  type: "quote";
  text: string;
  author?: string;
}

export interface BlogTableBlock {
  id: string;
  type: "table";
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface BlogEmbedBlock {
  id: string;
  type: "embed";
  targetType: "product" | "calculator";
  title: string;
  description: string;
  slug?: string;
}

export type BlogBlock =
  | BlogParagraphBlock
  | BlogHeadingBlock
  | BlogImageBlock
  | BlogCalloutBlock
  | BlogListBlock
  | BlogQuoteBlock
  | BlogTableBlock
  | BlogEmbedBlock;

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: "Engineering & Sizing" | "Policies & Subsidies" | "Energy Storage (BESS)" | "Power Electronics";
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  summary: string;
  coverImage: string;
  featured: boolean;
  content: {
    intro?: string;
    sections?: {
      heading: string;
      body: string[];
      highlightBox?: string;
    }[];
    conclusion?: string;
    blocks?: BlogBlock[];
  };
  relatedProductSlug?: string;
  relatedProductName?: string;
}


export const BLOG_POSTS: BlogPost[] = [
  {
    id: "hybrid-vs-ongrid-inverters-factories-guide",
    slug: "hybrid-vs-ongrid-inverters-factories-guide",
    title: "Hybrid Inverters vs On-Grid with DG: Which is Best for Indian C&I Factories?",
    category: "Engineering & Sizing",
    author: "Er. Sachin Patil",
    authorRole: "Principal Systems Engineer, Electra Solar (Pune)",
    publishedAt: "April 2026",
    readTime: "6 min read",
    summary:
      "A technical comparison of standard on-grid solar with diesel generator reverse-power protection vs. bi-directional solar hybrid PCUs with 0ms transfer for continuous industrial manufacturing.",
    coverImage: "/images/showcase/industrial-solar.jpg",
    featured: true,
    content: {
      intro:
        "Industrial manufacturing plants in Maharashtra and across India frequently battle two simultaneous challenges: rising DISCOM grid tariffs and unreliable power quality accompanied by frequent grid trips. While conventional on-grid solar systems are widely marketed, deploying them alongside industrial diesel generator (DG) sets often creates severe operational friction.",
      sections: [
        {
          heading: "The Fatal Flaw of On-Grid Solar with Diesel Generators",
          body: [
            "Conventional on-grid string inverters rely entirely on a stable voltage and frequency reference from the utility grid. When the grid trips and the facility switches to DG power, standard grid-tie inverters must either be shut off or throttled down via a reverse power relay.",
            "If solar generation exceeds factory consumption even momentarily, reverse current can back-feed into the alternator of the diesel generator, causing engine overheating, speed hunting, and catastrophic alternator trip.",
            "As a result, factory managers often find their expensive 100kW+ solar arrays completely idling precisely when power outages occur, forcing them to burn expensive diesel at ₹28 to ₹34 per kWh.",
          ],
          highlightBox:
            "Standard on-grid inverters require DG controllers that throttle solar output down to 30%, wasting up to 70% of potential solar energy during daytime outages.",
        },
        {
          heading: "How Bi-Directional Hybrid PCUs Solve the DG Synchronization Problem",
          body: [
            "EnerTech SunMagic 3-Phase Hybrid Inverters take an entirely different engineering approach. Instead of merely exporting power to the AC bus, they operate as an active microgrid hub.",
            "When the grid trips, the internal static transfer switch disconnects the utility grid in under 5 milliseconds (sub-cycle transfer), maintaining continuous power to critical manufacturing loads without computer reboot or CNC machine tripping.",
            "Simultaneously, the hybrid PCU synchronizes seamlessly with the factory's DG set. It commands the diesel generator to run only at its minimum efficient base load (e.g. 30%), while solar and the LiFePO4 battery bank dynamically supply all remaining load spikes and surging machinery.",
          ],
        },
        {
          heading: "Financial Analysis: 100kVA Factory Case Study",
          body: [
            "Consider a precision machining workshop in Chakan MIDC with an average running load of 65kVA and 2 hours of daily grid interruption.",
            "Running a 100kVA diesel generator for 2 hours daily consumes approximately 36 liters of diesel, costing over ₹3,240 per day (over ₹95,000 per month).",
            "By deploying a 100kVA SunMagic Hybrid PCU paired with a 100kWh EnerCube BESS, daytime outages are entirely absorbed by solar and battery storage. The diesel generator is only commanded to crank if the battery state of charge (SoC) drops below 20%, reducing monthly diesel bills by more than 75%.",
          ],
        },
      ],
      conclusion:
        "For Indian industrial facilities with sensitive machinery, heavy surges, or frequent power interruptions, bi-directional solar hybrid PCUs offer far superior ROI, equipment protection, and energy security compared to basic on-grid string systems.",
      blocks: [
        {
          id: "b_intro",
          type: "paragraph",
          text: "Industrial manufacturing plants in Maharashtra and across India frequently battle two simultaneous challenges: rising DISCOM grid tariffs and unreliable power quality accompanied by frequent grid trips. While conventional on-grid solar systems are widely marketed, deploying them alongside industrial diesel generator (DG) sets often creates severe operational friction.",
        },
        {
          id: "b_h1",
          type: "heading",
          level: 2,
          text: "The Fatal Flaw of On-Grid Solar with Diesel Generators",
        },
        {
          id: "b_p1",
          type: "paragraph",
          text: "Conventional on-grid string inverters rely entirely on a stable voltage and frequency reference from the utility grid. When the grid trips and the facility switches to DG power, standard grid-tie inverters must either be shut off or throttled down via a reverse power relay.\n\nIf solar generation exceeds factory consumption even momentarily, reverse current can back-feed into the alternator of the diesel generator, causing engine overheating, speed hunting, and catastrophic alternator trip.",
        },
        {
          id: "b_callout1",
          type: "callout",
          variant: "warning",
          title: "Diesel Generator Trip Hazard",
          text: "Standard on-grid inverters require DG controllers that throttle solar output down to 30%, wasting up to 70% of potential solar energy during daytime outages and putting generator alternators at risk of reverse power flow.",
        },
        {
          id: "b_img1",
          type: "image",
          url: "/images/showcase/commercial-solar.jpg",
          caption: "Figure 1: Verified C&I hybrid solar rooftop commissioning with bi-directional synchronization panel at Chakan MIDC.",
          alt: "Industrial Solar Hybrid Inverter Installation",
          layout: "contained",
        },
        {
          id: "b_h2",
          type: "heading",
          level: 2,
          text: "How Bi-Directional Hybrid PCUs Solve the DG Synchronization Problem",
        },
        {
          id: "b_p2",
          type: "paragraph",
          text: "EnerTech SunMagic 3-Phase Hybrid Inverters take an entirely different engineering approach. Instead of merely exporting power to the AC bus, they operate as an active microgrid hub.\n\nWhen the grid trips, the internal static transfer switch disconnects the utility grid in under 5 milliseconds (sub-cycle transfer), maintaining continuous power to critical manufacturing loads without computer reboot or CNC machine tripping.",
        },
        {
          id: "b_list1",
          type: "list",
          style: "bullet",
          items: [
            "Sub-5ms static transfer switch maintains critical CNC, VFD, and robotics uptime.",
            "Active DG governor integration throttles solar safely without reverse power trip.",
            "100% phase-unbalanced load regulation across all three phases (R, Y, B).",
            "Peak shaving discharges battery storage during expensive DISCOM peak tariff hours.",
          ],
        },
        {
          id: "b_table1",
          type: "table",
          headers: ["Operational Parameter", "Standard On-Grid Inverter", "EnerTech SunMagic Hybrid PCU"],
          rows: [
            ["Grid Failure Reaction", "Shuts down completely (Anti-Islanding)", "Continues unbroken supply (<5ms transfer)"],
            ["DG Set Synchronization", "Requires expensive external throttling relays", "Built-in DG governor reverse-power prevention"],
            ["Phase Unbalance Tolerance", "Trips when load imbalance exceeds 15%", "100% independent per-phase regulation"],
            ["Battery Storage Support", "Not supported (AC retrofit required)", "Direct high-voltage DC lithium battery bus"],
          ],
          caption: "Table 1: Architectural comparison between standard on-grid solar and bi-directional hybrid PCUs.",
        },
        {
          id: "b_h3",
          type: "heading",
          level: 2,
          text: "Financial Analysis: 100kVA Factory Case Study",
        },
        {
          id: "b_p3",
          type: "paragraph",
          text: "Consider a precision machining workshop in Chakan MIDC with an average running load of 65kVA and 2 hours of daily grid interruption. Running a 100kVA diesel generator for 2 hours daily consumes approximately 36 liters of diesel, costing over ₹3,240 per day (over ₹95,000 per month).\n\nBy deploying a 100kVA SunMagic Hybrid PCU paired with a 100kWh EnerCube BESS, daytime outages are entirely absorbed by solar and battery storage. The diesel generator is only commanded to crank if battery state of charge (SoC) drops below 20%, reducing monthly diesel bills by more than 75%.",
        },
        {
          id: "b_quote1",
          type: "quote",
          text: "In industrial manufacturing, clean power is not just about reducing DISCOM electricity bills—it is about protecting multi-crore CNC machines from dirty grid spikes and zero-break continuity during power failures.",
          author: "Er. Sachin Patil, Principal Systems Engineer",
        },
        {
          id: "b_embed1",
          type: "embed",
          targetType: "calculator",
          title: "Solar & Battery Sizing Calculator",
          description: "Estimate your industrial plant's optimal kW capacity, battery storage size, and annual diesel cost savings.",
        },
      ],
    },
    relatedProductSlug: "sunmagic-three-phase-solar-hybrid-inverter",
    relatedProductName: "SunMagic 3-Phase Hybrid Inverter (10kVA - 300kVA)",
  },
  {
    id: "pm-surya-ghar-yojana-subsidy-net-metering",
    slug: "pm-surya-ghar-yojana-subsidy-net-metering",
    title: "PM Surya Ghar Muft Bijli Yojana (2026): Subsidy Slabs & Net-Metering Guide",
    category: "Policies & Subsidies",
    author: "Aditi Kulkarni",
    authorRole: "Regulatory & Compliance Desk, Electra Solar",
    publishedAt: "March 2026",
    readTime: "5 min read",
    summary:
      "Everything residential property owners, eco-villas, and apartment societies need to know about claiming up to ₹78,000 in Central Government subsidies under the PM Surya Ghar scheme.",
    coverImage: "/images/showcase/solar-home-villa.jpg",
    featured: false,
    content: {
      intro:
        "The PM Surya Ghar: Muft Bijli Yojana launched by the Government of India has revolutionized residential rooftop solar adoption. Offering direct benefit transfers (DBT) of up to ₹78,000 directly into consumer bank accounts, the scheme aims to provide up to 300 units of free clean electricity per month to 1 crore households nationwide.",
      sections: [
        {
          heading: "Current Subsidy Slabs Breakdown (2026)",
          body: [
            "For systems up to 1 kWp capacity: ₹30,000 central subsidy.",
            "For systems between 1 kWp and 2 kWp: ₹60,000 central subsidy.",
            "For systems of 3 kWp or higher capacity: ₹78,000 fixed maximum central subsidy.",
            "For Group Housing Societies (GHS) and Residential Welfare Associations (RWA), subsidies of up to ₹18,000 per kW are applicable for common lighting, EV charging, and water pumping installations up to 500 kW.",
          ],
          highlightBox:
            "Subsidy is credited via Direct Benefit Transfer (DBT) directly into the consumer's Aadhaar-linked bank account within 30 days of net-meter commissioning.",
        },
        {
          heading: "MSEDCL Net-Metering & Hybrid Inverter Compatibility",
          body: [
            "In Maharashtra, MSEDCL mandates that rooftop systems must be connected through an approved bi-directional net meter.",
            "With an MNRE-approved solar hybrid inverter, homeowners enjoy the best of both worlds: excess solar units generated during the afternoon are exported to the grid for monetary credit on the monthly electricity bill, while the battery backup ensures uninterrupted power during evening load-shedding.",
          ],
        },
      ],
      conclusion:
        "With typical rooftop systems paying for themselves in under 3.5 years, pairing PM Surya Ghar subsidies with high-reliability hybrid storage guarantees 25+ years of virtually zero electricity bills.",
    },
    relatedProductSlug: "sunmagic-single-phase-solar-hybrid-inverter",
    relatedProductName: "SunMagic 1-Phase Hybrid Inverter (1kVA - 15kVA)",
  },
  {
    id: "commercial-bess-peak-demand-charges-msedcl",
    slug: "commercial-bess-peak-demand-charges-msedcl",
    title: "Commercial BESS: How to Slash Peak Demand Penalties (MSEDCL/DISCOMs)",
    category: "Energy Storage (BESS)",
    author: "Er. Sachin Patil",
    authorRole: "Principal Systems Engineer, Electra Solar",
    publishedAt: "February 2026",
    readTime: "7 min read",
    summary:
      "How commercial complexes, IT parks, and cold storage facilities use containerized Battery Energy Storage Systems (BESS) for peak shaving, TOD tariff arbitrage, and contract demand optimization.",
    coverImage: "/images/showcase/commercial-solar.jpg",
    featured: false,
    content: {
      intro:
        "For commercial and industrial consumers in Maharashtra, Time-of-Day (TOD) tariffs and Contract Demand penalties represent up to 35% of their total monthly electricity expenditure. MSEDCL imposes heavy surcharges during evening peak windows (06:00 PM to 10:00 PM), while levying severe penal charges if recorded maximum demand exceeds sanctioned contract kVA.",
      sections: [
        {
          heading: "The Mechanics of Peak Shaving with LiFePO4 BESS",
          body: [
            "Contract demand penalties occur when heavy inductive loads (chillers, compressors, induction furnaces) start up simultaneously, drawing instantaneous current surges that breach the sanctioned kVA threshold.",
            "An intelligent BESS system like the EnerCube continuously monitors bus power at the main incomer panel. The instant client demand approaches 85% of contract demand, the BESS discharges stored power within milliseconds, injecting power from the battery into the internal bus.",
            "To the utility meter, peak demand appears perfectly flat and controlled, entirely eliminating penalty surcharges.",
          ],
        },
        {
          heading: "TOD Tariff Arbitrage: Charging Cheap, Discharging Peak",
          body: [
            "Under MSEDCL TOD tariff structures, electricity is cheapest during night off-peak hours (10:00 PM to 06:00 AM) and most expensive during peak evening slots (06:00 PM to 10:00 PM), with a rate differential often exceeding ₹3.50 per unit.",
            "By charging the LiFePO4 battery during midday via rooftop solar or overnight from off-peak grid power, and discharging during peak evening hours, commercial facilities generate continuous tariff arbitrage savings every single day of the year.",
          ],
          highlightBox:
            "A 200kWh commercial BESS deployed at an IT park in Hinjawadi generates over ₹2.4 Lakhs in monthly savings purely through peak shaving and TOD arbitrage.",
        },
      ],
      conclusion:
        "Modular battery storage is no longer just a luxury backup system; it is an active financial asset that shields commercial enterprises against volatile grid tariffs and punitive demand charges.",
    },
    relatedProductSlug: "enercube-commercial-battery-energy-storage-system",
    relatedProductName: "EnerCube Commercial BESS (50kWh - 500kWh)",
  },
  {
    id: "why-100-percent-phase-unbalanced-load-matters",
    slug: "why-100-percent-phase-unbalanced-load-matters",
    title: "Why 100% Phase Unbalanced Load Tolerance Matters in Three-Phase Solar PCUs",
    category: "Power Electronics",
    author: "P. R. Deshmukh",
    authorRole: "Technical Advisor, EnerTech Power Systems",
    publishedAt: "January 2026",
    readTime: "5 min read",
    summary:
      "Understanding neutral current overheating, voltage sag, and why standard imported inverters trip when 1-phase loads are connected unevenly across 3-phase circuits.",
    coverImage: "/images/showcase/utility-solar.jpg",
    featured: false,
    content: {
      intro:
        "In a theoretical three-phase electrical system, current draw is balanced identically across all three phases (R, Y, and B). However, in actual Indian commercial buildings, hospitals, and luxury residences, true phase balance is virtually impossible.",
      sections: [
        {
          heading: "The Reality of Phase Imbalance in Indian Buildings",
          body: [
            "Consider a commercial complex where multiple single-phase loads (air conditioners, lighting circuits, computers, refrigeration units) are distributed across phases. It is routine for Phase R to carry 80 Amperes, Phase Y to carry 30 Amperes, and Phase B to carry only 10 Amperes.",
            "Standard imported solar inverters designed for balanced European grids cannot handle significant phase differential. When imbalance exceeds 20% to 30%, the inverter's microcontroller senses neutral voltage displacement and triggers an automatic fault shutdown.",
          ],
        },
        {
          heading: "EnerTech's Heavy-Duty Isolation Transformer Architecture",
          body: [
            "EnerTech SunMagic Three-Phase Hybrid Inverters incorporate an oversized, heavy copper toroidal isolation transformer with independent PWM bridge regulation for each individual phase.",
            "This architecture allows 100% unbalanced load tolerance. For example, on a 30kVA three-phase inverter, you can load 10kVA entirely on Phase R while Phases Y and B carry zero load. The inverter delivers perfect 230V phase-to-neutral regulation on each phase without tripping, humming, or overheating.",
          ],
          highlightBox:
            "100% phase unbalance tolerance ensures that heavy single-phase air conditioners or CNC tooling cannot shut down the entire three-phase plant.",
        },
      ],
      conclusion:
        "When investing in three-phase solar power electronics, verifying authentic 100% phase unbalance tolerance is the single most critical specification to prevent nuisance tripping and neutral conductor damage.",
    },
    relatedProductSlug: "sunmagic-three-phase-solar-hybrid-inverter",
    relatedProductName: "SunMagic 3-Phase REeFI Hybrid Inverter",
  },
];
