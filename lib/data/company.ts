export interface RegionalOffice {
  id: string;
  city: string;
  state: string;
  title: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  badge: string;
  description: string;
  mapUrl: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  legalEntityNotice: string;
  distributorRelationship: {
    principalCompany: string;
    relationshipTitle: string;
    experienceYears: string;
    verifiedScope: string;
    plantLocation: string;
    installationsCount: string;
  };
  contact: {
    salesPhone1: string;
    salesPhone2: string;
    supportPhone: string;
    salesEmail: string;
    supportEmail: string;
    headquartersAddress: string;
    serviceHubs: string[];
    workingHours: string;
  };
  regionalOffices: RegionalOffice[];
  faqs: { question: string; answer: string; category: string }[];
}

export const COMPANY: CompanyInfo = {
  name: 'Electra Solar',
  tagline: 'Engineering Tomorrow’s Solar & Energy Storage Solutions',
  legalEntityNotice: 'Electra Solar operates as the official distributor and turnkey engineering partner for EnerTech UPS Pvt. Ltd., specializing in solar hybrid inverters, BESS, lithium storage, and industrial power electronics.',
  distributorRelationship: {
    principalCompany: 'EnerTech UPS Pvt. Ltd.',
    relationshipTitle: 'Official Distributor & Turnkey Solutions Partner',
    experienceYears: '35+ Years of Parent Engineering Pedigree',
    verifiedScope: 'Distribution, Custom Sizing, Turnkey Installation, Commissioning & Authorized After-Sales Service',
    plantLocation: 'SR. No. 399/1-2, Plot No. 5, Bhare P.O. Ghotawade Near Hinjawadi IT Park, Pune-412115, Maharashtra, India',
    installationsCount: 'Over 35,000+ Verified Systems Worldwide',
  },
  contact: {
    salesPhone1: '+91 9822407189',
    salesPhone2: '+91 9373336340',
    supportPhone: '+91 9373679255',
    salesEmail: 'sales@electrasolar.in',
    supportEmail: 'support@electrasolar.in',
    headquartersAddress: 'Electra Solar Solutions, Hinjawadi Commercial Corridor, Near IT Park Phase 2, Pune-412115, Maharashtra, India',
    serviceHubs: ['Pune & PCMC', 'Mumbai & MMR', 'Jaipur & North-West', 'Nashik & Ahmednagar', 'Aurangabad (Chhatrapati Sambhajinagar)', 'Kolhapur & Western Maharashtra'],
    workingHours: 'Monday – Saturday: 9:00 AM to 6:30 PM IST',
  },
  regionalOffices: [
    {
      id: 'pune',
      city: 'Pune',
      state: 'Maharashtra',
      title: 'Corporate Headquarters & Experience Center',
      address: 'SR. No. 399/1-2, Plot No. 5, Bhare P.O. Ghotawade, Near Hinjawadi IT Park Phase 2, Pune-412115, Maharashtra, India',
      coordinates: { lat: 18.5913, lng: 73.7389 },
      phone: '+91 9822407189',
      email: 'sales@electrasolar.in',
      badge: 'HQ & Systems Plant',
      description: 'Factory engineering linkage, master testing center, 1kVA–300kVA hybrid inverter inventory, and turnkey proposal desk.',
      mapUrl: 'https://maps.google.com/?q=18.5913,73.7389',
    },
    {
      id: 'mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      title: 'Mumbai Regional Commercial Hub (MMR)',
      address: 'Level 5, Solitaire Corporate Park, Andheri-Ghatkopar Link Road, Chakala, Andheri East, Mumbai-400069, Maharashtra, India',
      coordinates: { lat: 19.1136, lng: 72.8697 },
      phone: '+91 9373336340',
      email: 'mumbai@electrasolar.in',
      badge: 'Commercial & EPC Desk',
      description: 'Serving C&I clients, hospitals, luxury residential villas, and port logistics across Mumbai, Thane, Navi Mumbai, and JNPT.',
      mapUrl: 'https://maps.google.com/?q=19.1136,72.8697',
    },
    {
      id: 'jaipur',
      city: 'Jaipur',
      state: 'Rajasthan',
      title: 'North-West Regional Solar & Project Center',
      address: 'Plot No. G-12, Sitapura Industrial Area, Phase III, Near RIICO Commercial Complex, Tonk Road, Jaipur-302022, Rajasthan, India',
      coordinates: { lat: 26.7825, lng: 75.8272 },
      phone: '+91 9373679255',
      email: 'jaipur@electrasolar.in',
      badge: 'North-West Regional Hub',
      description: 'Dedicated regional engineering office serving Rajasthan’s high-irradiance solar belt, C&I manufacturing, and agro cold storage.',
      mapUrl: 'https://maps.google.com/?q=26.7825,75.8272',
    },
  ],
  faqs: [
    {
      category: 'Solar Hybrid Technology',
      question: 'What is a Solar Hybrid Inverter and how is it different from a regular on-grid or off-grid inverter?',
      answer: 'A solar hybrid inverter intelligently manages electricity from three sources simultaneously: solar panels, battery storage, and the utility grid. Unlike simple on-grid inverters that shut down during power cuts (anti-islanding), our SunMagic hybrid inverters continue powering your facility during grid failures without dropping your critical loads. Unlike simple off-grid inverters, they can synchronize with the grid and diesel generators to maximize savings and avoid battery over-cycling.',
    },
    {
      category: 'Solar Hybrid Technology',
      question: 'Can the SunMagic Hybrid Inverter run loads without any batteries connected?',
      answer: 'Yes! EnerTech’s SunMagic REeFI hybrid inverter features true batteryless operation. During sunny daylight hours, it can convert solar generation directly into AC electricity to run your household or commercial appliances, drawing from the grid only if cloud cover reduces solar yield. Batteries can be added at any later time.',
    },
    {
      category: 'Industrial & 3-Phase',
      question: 'What does "100% phase unbalance capacity" mean for 3-phase industrial inverters?',
      answer: 'Standard 3-phase solar inverters require balanced electrical loads across all three phases (R, Y, B); if one phase has heavy single-phase air conditioning while another is idle, standard inverters often trip on voltage unbalance. EnerTech’s 3-Phase SunMagic inverters feature independent phase regulation that safely supplies up to 100% unbalanced load on any single phase without voltage fluctuation or shutdowns.',
    },
    {
      category: 'Commercial & Storage',
      question: 'How do solar hybrid systems synchronize with existing Diesel Generators (DG sets)?',
      answer: 'EnerTech hybrid inverters feature active DG governor integration with reverse-power prevention. When the diesel generator runs, the inverter dynamically throttles solar output so that solar power never pushes reverse electricity back into the generator (which would cause the DG alternator to trip or overheat), cutting fuel consumption by up to 70% during daytime outages.',
    },
    {
      category: 'Batteries & Life Cycle',
      question: 'Why should I choose Lithium Iron Phosphate (LiFePO4) over conventional Lead Acid batteries?',
      answer: 'LiFePO4 batteries deliver more than 4,500 to 6,000 cycles (10 to 15 years of daily cycling) compared to just 1,000 to 1,200 cycles for lead-acid. They charge up to 3x faster, require zero maintenance or water topping, do not release acid fumes, take up 70% less floor space, and maintain constant voltage output throughout the entire discharge cycle.',
    },
    {
      category: 'Support & Warranty',
      question: 'What is the warranty and after-sales service policy provided by Electra Solar?',
      answer: 'Our flagship SunMagic solar hybrid inverters come with a 5-year manufacturer warranty backed directly by EnerTech’s Pune manufacturing facility. Electra Solar provides local field service, onsite troubleshooting, genuine spare parts, and Annual Maintenance Contracts (AMC) across Maharashtra and neighboring industrial corridors.',
    },
  ],
};
