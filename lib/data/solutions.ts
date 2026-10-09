export interface Solution {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  subtitle: string;
  badge: string;
  heroImage: string;
  overview: string;
  problemStatement: string;
  solutionArchitecture: string;
  keyBenefits: string[];
  recommendedProductIds: string[];
  caseStudyHighlight: {
    client: string;
    location: string;
    systemCapacity: string;
    result: string;
  };
}

export const SOLUTIONS: Solution[] = [
  {
    id: 'residential-solar',
    slug: 'residential-solar-hybrid',
    title: 'Residential Solar & Energy Independence',
    tagline: 'Clean solar electricity by day, silent reliable battery backup by night.',
    subtitle: 'High-efficiency solar hybrid solutions tailored for modern Indian bungalows, duplexes, and independent residences.',
    badge: 'Home & Villa Solar',
    heroImage: '/images/hero/hero-bg.jpg',
    overview: 'High utility tariffs and intermittent grid supply disrupt everyday living. Our residential solar hybrid systems combine smart solar generation with intelligent energy storage, allowing homeowners to run air conditioners, refrigeration, water pumps, and home automation without worrying about blackouts.',
    problemStatement: 'Frequent power cuts in peri-urban areas damage luxury home appliances, while conventional diesel generators produce unpleasant fumes, loud noise, and escalating fuel expenses.',
    solutionArchitecture: 'A rooftop solar array paired with the SunMagic 1-Phase DSP Hybrid Inverter and modular LiFePO4 51.2V lithium battery pack. The system prioritizes solar generation for active daytime consumption, charges the battery pack with surplus solar power, and seamlessly supplies backup power with under-4ms transfer time during grid outages.',
    keyBenefits: [
      'Zero blackout disruption: Seamless <4ms changeover keeps Wi-Fi, TVs, and computers running without rebooting',
      'Up to 80% reduction in monthly electricity bills with daytime self-consumption',
      'Batteryless operation: Run daytime loads straight from solar panels even if batteries are disconnected',
      'Completely silent, green alternative to noisy and polluting residential diesel generators',
      'Smartphone app tracking to view live rooftop generation, battery status, and financial savings',
    ],
    recommendedProductIds: ['sunmagic-1ph', 'wall-mounted-hf', 'lfp-battery-pack'],
    caseStudyHighlight: {
      client: 'Independent Luxury Villa',
      location: 'Lonavala, Maharashtra',
      systemCapacity: '10 kVA SunMagic Hybrid + 15 kWh LFP Battery',
      result: '100% blackout immunity during monsoon power failures and 78% average electricity bill reduction.',
    },
  },
  {
    id: 'commercial-industrial',
    slug: 'commercial-industrial-power-solutions',
    title: 'Commercial & Industrial (C&I) Solar Systems',
    tagline: 'Peak shaving, Time-of-Day (ToD) tariff optimization, and 100% unbalanced load tolerance.',
    subtitle: 'Rugged 3-phase solar and storage architectures engineered for factories, warehouses, IT parks, and processing units.',
    badge: 'Industrial Energy Optimization',
    heroImage: '/images/hero/hero-bg.jpg',
    overview: 'Industrial enterprises face heavy Maximum Demand (MD) penalties and steep Time-of-Day (ToD) peak tariffs. Electra Solar engineers high-capacity 3-phase hybrid solar and BESS systems designed to handle demanding inductive motor loads, phase imbalances, and diesel generator synchronisation without reverse feeding.',
    problemStatement: 'Modern industrial production lines with variable motor loads experience heavy single-phase unbalances that trip standard inverters, while peak utility tariffs severely inflate monthly operational overheads.',
    solutionArchitecture: 'SunMagic 3-Phase REeFI Hybrid Inverters (25 kVA to 300 kVA) combined with EnerCube high-density battery energy storage. The system features an integrated 32-bit DSP processor capable of supplying 100% unbalanced loads per phase, scheduling battery discharge during peak tariff hours to slash maximum demand charges.',
    keyBenefits: [
      'Eliminate maximum demand penalties with automated peak shaving algorithms',
      '100% phase load unbalance tolerance ensures no downtime from uneven machinery distribution',
      'Smooth DG Synchronization: Modulates solar production to safely operate alongside diesel generators without reverse power trips',
      'Contactor-less zero-break changeover protects sensitive CNC controllers and industrial robotics',
      'Substantial accelerated depreciation (AD) and carbon reduction compliance benefits',
    ],
    recommendedProductIds: ['sunmagic-3ph', 'enercube-bess', 'servo-voltage-stabilizer'],
    caseStudyHighlight: {
      client: 'Precision Automotive Component Facility',
      location: 'Chakan MIDC, Pune',
      systemCapacity: '100 kVA 3-Phase Hybrid PCU + 120 kWh BESS',
      result: 'Avoided ₹1.8 Lakhs monthly peak tariff penalties and reduced diesel generator runtime by 64%.',
    },
  },
  {
    id: 'critical-infrastructure',
    slug: 'critical-infrastructure-and-healthcare',
    title: 'Critical Infrastructure & Healthcare Power',
    tagline: 'True 0ms double-conversion protection with solar priority charging.',
    subtitle: 'Fail-safe electrical architectures for hospitals, MRI/CT diagnostic centers, data rooms, and banking hubs.',
    badge: '0ms Transfer Mission Critical',
    heroImage: '/images/hero/hero-bg.jpg',
    overview: 'In hospitals, diagnostic imaging suites, and data centers, even a 5-millisecond power blip can cause critical medical equipment resets, diagnostic scan corruptions, or server data loss. Our Solar Online UPS systems provide pure galvanic isolation, true 0ms transfer, and clean pure sine wave power powered primarily by solar.',
    problemStatement: 'Severe grid voltage sags, harmonics, and momentary power interruptions jeopardize life-support systems, surgical suites, and mission-critical IT infrastructure.',
    solutionArchitecture: 'Solar Online UPS with built-in galvanic isolation transformers and high-frequency PWM IGBT inverters. Power is continually synthesized from the DC bus, guaranteeing pristine voltage regulation and instantaneous solar priority sharing with the utility grid.',
    keyBenefits: [
      'Absolute 0ms transfer time: Critical diagnostic machines and servers experience zero voltage interruption',
      'Galvanic isolation transformer built-in to filter severe electrical noise, lightning surges, and neutral drift',
      'Solar priority controller cuts daytime grid electricity consumption while keeping critical battery banks fully primed',
      'N+1 redundant parallel clustering capability for mission-critical tier-rated datacenters',
      'Comprehensive SCADA and SNMP network card telemetry for real-time facility monitoring',
    ],
    recommendedProductIds: ['solar-online-ups', 'servo-voltage-stabilizer', 'lfp-battery-pack'],
    caseStudyHighlight: {
      client: 'Multispeciality Hospital & Diagnostic Lab',
      location: 'Hinjawadi, Pune',
      systemCapacity: '40 kVA Solar Online UPS with Isolation',
      result: 'Zero equipment downtime across MRI and ICU units, protecting sensitive diagnostic instrumentation.',
    },
  },
  {
    id: 'remote-microgrids',
    slug: 'remote-microgrids-and-agriculture',
    title: 'Remote Microgrids & Agricultural Cold Storage',
    tagline: 'Resilient off-grid power generation where grid infrastructure is weak or absent.',
    subtitle: 'Off-grid and mini-grid solar installations for rural estates, agro-processing, food cold storage, and eco-tourism resorts.',
    badge: 'Off-Grid & Microgrids',
    heroImage: '/images/hero/hero-bg.jpg',
    overview: 'Agriculture processing units, rural clinics, eco-resorts, and remote installations often operate where grid lines are either unreliable or entirely absent. Electra Solar designs autonomous hybrid microgrids that leverage solar generation, battery storage, and optional auxiliary generator inputs to ensure 24/7 continuous electricity.',
    problemStatement: 'Grid outages lasting 8 to 14 hours per day in rural agricultural belts lead to spoilage of perishable produce in cold storage and force heavy reliance on expensive diesel generators.',
    solutionArchitecture: 'High-capacity hybrid solar inverters paired with deep-cycle Lithium LFP battery banks and automatic generator start/stop controllers. The system dynamically prioritizes solar generation for running refrigeration compressors, storing excess solar into battery banks for night operation.',
    keyBenefits: [
      '24/7 uninterrupted power for cold chain refrigeration, fruit ripening, and milk chilling centers',
      'Dramatic reduction in diesel logistics and operating costs in remote, hard-to-access locations',
      'Automatic generator start/stop logic runs auxiliary DG sets only during prolonged cloudy monsoon weather',
      'Heavy-duty surge tolerance effortlessly starts high-inertia refrigeration compressor motors',
      'Local remote telemetry via 4G/GSM gateway enables continuous performance tracking from any mobile device',
    ],
    recommendedProductIds: ['sunmagic-3ph', 'enercube-bess', 'industrial-battery-charger'],
    caseStudyHighlight: {
      client: 'Agro Cold Storage & Food Processing Center',
      location: 'Baramati, Maharashtra',
      systemCapacity: '50 kVA Solar Hybrid PCU + 80 kWh LiFePO4 Bank',
      result: 'Eliminated produce spoilage from rural power cuts and cut monthly diesel expenditure by 72%.',
    },
  },
];
