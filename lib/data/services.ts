export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  badge: string;
  processSteps: { step: string; title: string; description: string }[];
  deliverables: string[];
  idealFor: string;
}

export const SERVICES: Service[] = [
  {
    id: 'site-survey-engineering',
    slug: 'site-survey-and-engineering-design',
    title: 'Site Survey & Engineering Design',
    shortDesc: 'Comprehensive onsite load profiling, harmonic analysis, roof structural auditing, and custom single-line diagram (SLD) engineering.',
    description: 'A successful solar and power electronics installation begins with precise engineering calculations. Our certified power engineers conduct in-depth electrical audits, measuring peak surge currents, phase unbalances, shadow profiles, and roof structural integrity to design the optimal system architecture.',
    badge: 'Phase 1: Auditing & Design',
    processSteps: [
      { step: '01', title: 'Onsite Electrical & Load Profiling', description: 'Log actual 3-phase current draws, power factor, voltage spikes, and inductive motor startup surges using digital power analyzers.' },
      { step: '02', title: 'Solar Insolation & Shadow Modeling', description: 'Evaluate rooftop shadow casting throughout the 12 calendar months to maximize annual generation yields.' },
      { step: '03', title: 'Single-Line Diagram (SLD) & Protections', description: 'Draft detailed electrical schematics, DC cable sizing, earthing layout, and breaker coordination conforming to CEA standards.' },
      { step: '04', title: 'Financial & Payback Modeling', description: 'Calculate accurate generation yields, Time-of-Day tariff savings, and estimated ROI timelines with transparent assumptions.' },
    ],
    deliverables: [
      'Comprehensive Site Feasibility & Load Audit Report',
      'Engineered Single-Line Diagram (SLD) and BOM specifications',
      'Structural integrity and wind-load certification recommendations',
      'Projected annual kWh generation & financial payback breakdown',
    ],
    idealFor: 'Factories, commercial buildings, institutions, and villas requiring accurate sizing before purchasing equipment.',
  },
  {
    id: 'turnkey-installation',
    slug: 'turnkey-installation-and-commissioning',
    title: 'Turnkey Installation & Commissioning',
    shortDesc: 'End-to-end mechanical mounting, DC/AC cabling, galvanic isolation integration, DG synchronisation setup, and grid liaisoning.',
    description: 'Electra Solar executes turnkey installation adhering to rigorous industrial safety codes. Our trained technicians handle everything from high-grade aluminum mounting structures, solar PV cabling with UV protection, isolation transformer placement, to full commissioning testing.',
    badge: 'Phase 2: Execution & Commissioning',
    processSteps: [
      { step: '01', title: 'Mounting & Cable Infrastructure', description: 'Install wind-rated mounting structures and run UV-resistant, fire-retardant DC/AC solar cables through industrial conduits.' },
      { step: '02', title: 'Inverter & Battery Integration', description: 'Position and interconnect hybrid inverters, isolation transformers, and modular LiFePO4 battery banks with safety pre-charge circuits.' },
      { step: '03', title: 'Chemical Earthing & Lightning Protection', description: 'Install low-impedance dedicated chemical earthing pits for DC, AC, and lightning arrestors (<1 Ohm resistance).' },
      { step: '04', title: 'Testing & DG Synchronization Commissioning', description: 'Perform full load step testing, unbalanced phase testing, and configure reverse-power prevention logic for diesel generators.' },
    ],
    deliverables: [
      'Turnkey physical and electrical installation',
      'Earthing resistance test certification (< 1 Ohm)',
      'Pre-commissioning checklist & insulation resistance tests',
      'Grid net-metering liaisoning and Discom approval coordination',
    ],
    idealFor: 'Enterprises and residential clients wanting headache-free professional execution with verified safety standards.',
  },
  {
    id: 'amc-preventive-maintenance',
    slug: 'amc-and-preventive-maintenance',
    title: 'Annual Maintenance Contracts (AMC) & Support',
    shortDesc: 'Routine thermal imaging inspections, firmware updates, battery impedance testing, and fast-response breakdown service.',
    description: 'Ensure maximum uptime and system longevity through Electra Solar’s structured Annual Maintenance Contracts. We monitor systems remotely, conduct periodic physical inspections with FLIR thermal cameras to detect loose connections, and provide prompt breakdown support.',
    badge: 'Phase 3: Lifecycle Assurance',
    processSteps: [
      { step: '01', title: 'Quarterly Physical & Thermal Inspections', description: 'Inspect all MC4 connectors, busbar terminations, and breaker contacts using infrared thermal imaging to identify hotspots.' },
      { step: '02', title: 'Battery State-of-Health & Cell Balancing', description: 'Test individual battery module internal impedance, BMS cell balance status, and terminal torque settings.' },
      { step: '03', title: 'DSP Firmware Updates & Recalibration', description: 'Update inverter operating firmware to optimize tracking algorithms and review grid synchronisation thresholds.' },
      { step: '04', title: 'Priority Emergency Breakdown Response', description: 'Committed technical response SLA with stocked spare modules and factory repair coordination with EnerTech.' },
    ],
    deliverables: [
      'Comprehensive quarterly maintenance logbook',
      'Infrared thermography scan reports of all electrical joints',
      'Dedicated helpline for rapid breakdown assistance',
      'Free software and firmware updates during the contract period',
    ],
    idealFor: 'Existing solar and UPS installations seeking guaranteed uptime, warranty compliance, and peak operating efficiency.',
  },
];
