import { Language } from '../types';

export const translations: Record<Language, any> = {
  EN: {
    nav: {
      solutions: 'Solar Solutions',
      calculator: 'Calculator',
      howItWorks: 'How It Works',
      whyMetfone: 'Why Metfone',
      faq: 'FAQ',
      calculateSavings: 'Calculate My Savings',
      hotline: 'Hotline',
      adminCrm: 'Sales CRM & Config'
    },
    hero: {
      badge: 'Cambodia’s Smart Energy Platform',
      headline: 'Turn Sunshine Into Savings.',
      subheadline: 'Smart Solar solutions for homes and businesses in Cambodia — custom engineered around your electricity consumption, roof space, and energy goals.',
      primaryCta: 'Calculate My Savings',
      secondaryCta: 'Request Free Site Survey',
      exampleCardTitle: 'ESTIMATED MONTHLY BILL',
      exampleSavingsTitle: 'Potential Solar Savings',
      exampleNote: '*Preliminary estimate based on commercial daytime load',
      trustPillars: [
        'Professional Engineering',
        'Tier-1 Quality Equipment',
        'Nationwide Installation & O&M',
        'Custom Engineered for Cambodia'
      ]
    },
    calculator: {
      badge: 'Sales Qualification Engine',
      title: 'How much can Solar save you?',
      subtitle: 'Give us just a few numbers. We’ll estimate the exact Solar system that fits your energy profile in 60 seconds.',
      step1Title: 'What type of property is this?',
      step2Title: 'What is your average monthly electricity bill?',
      step3Title: 'When do you use the most electricity?',
      step4Title: 'Do you need battery backup power?',
      steps: ['Property', 'Monthly Bill', 'Usage Schedule', 'Battery'],
      properties: {
        home: { title: 'Home / Villa', desc: 'Residential households & villas' },
        shop: { title: 'Shop / Mart', desc: 'Retail outlets, minimarts & pharmacies' },
        restaurant: { title: 'Restaurant / Cafe', desc: 'Food & beverage with daytime cooling' },
        office: { title: 'Office / Clinic', desc: 'Commercial workspaces & medical clinics' },
        factory: { title: 'Factory / Plant', desc: 'Industrial production & heavy machinery' },
        hotel: { title: 'Hotel / Resort', desc: 'Hospitality & continuous guest power' },
        other: { title: 'Other Commercial', desc: 'Warehouses, farms, telecom towers' }
      },
      daytimeUsage: {
        mostly_day: {
          title: 'Mostly Daytime (8 AM – 5 PM)',
          desc: 'Air conditioning, machinery, lighting running while the sun shines.'
        },
        day_night: {
          title: 'Day + Night Continuous',
          desc: '24/7 operations, restaurants, hotels, refrigeration & servers.'
        },
        mostly_night: {
          title: 'Mostly Nighttime (6 PM – 6 AM)',
          desc: 'Night clubs, evening retail, residential nighttime cooling.'
        },
        not_sure: {
          title: 'Not Sure / Balanced',
          desc: 'Our engineers will review your 24-hour meter load curve.'
        }
      },
      daytimeExplain: 'Solar produces peak energy during daylight hours. Matching daytime consumption maximizes immediate return on investment.',
      batteryPreferences: {
        no_battery: {
          title: 'No Battery (Grid-Tied)',
          desc: 'Maximum ROI & lowest initial cost. Directly offsets daytime grid power.'
        },
        battery_backup: {
          title: 'Include Battery Storage',
          desc: 'Stores surplus solar for night use & provides backup during grid outages.'
        },
        not_sure: {
          title: 'Help Me Decide',
          desc: 'We can recommend the ideal battery capacity after analyzing your load.'
        }
      },
      back: 'Back',
      next: 'Continue',
      calculateAction: 'Calculate My Solar Plan',
      results: {
        title: 'YOUR ESTIMATED SOLAR PLAN',
        badge: 'Custom Sizing Estimate',
        systemSize: 'Estimated System Size',
        monthlySavings: 'Estimated Monthly Savings',
        annualSavings: 'Estimated Annual Savings',
        billReduction: 'Estimated Bill Reduction',
        annualGeneration: 'Estimated Solar Generation',
        payback: 'Estimated Payback Period',
        roofRequired: 'Est. Roof Area Required',
        panelsCount: 'Tier-1 High-Efficiency Panels',
        co2Saved: 'CO₂ Emissions Avoided',
        treesEq: 'Trees Equivalent / Year',
        basedOnInputs: 'Based on your profile:',
        billLabel: 'Monthly Bill',
        propertyLabel: 'Property Type',
        usageLabel: 'Peak Schedule',
        batteryLabel: 'Battery Preference',
        disclaimer: 'Preliminary estimate for information purposes only. Final system capacity, generation, savings, and payback depend on actual site survey, 24-hour EDC consumption load curve, roof azimuth & tilt, shading, electrical infrastructure, and equipment selection.',
        actionsTitle: 'Want a more accurate proposal?',
        actionsSubtitle: 'Connect with a Metfone Solar energy consultant or upload your bill for precise engineering validation.',
        ctaProposal: 'Get My Free Solar Proposal',
        ctaSurvey: 'Request Free Site Survey',
        ctaUploadBill: 'Upload Electricity Bill for Tier-2 Audit',
        ctaTalkExpert: 'Chat with Solar Specialist'
      }
    },
    billUpload: {
      badge: 'Tier-2 Engineering Validation',
      title: 'Upload Your Electricity Bill for Instant Precision',
      subtitle: 'Skip manual calculations. Upload your Electricité du Cambodge (EDC) bill or utility receipt to get a tailored engineering report.',
      dragDropTitle: 'Drop your EDC bill here or click to browse',
      supportedFormats: 'Supports PDF, JPG, PNG up to 15MB',
      analyzingBill: 'Analyzing electricity bill with intelligent parser...',
      sampleBillsTitle: 'Or test with an EDC sample bill:',
      sampleFactory: 'EDC Factory Bill ($3,722/mo)',
      sampleHotel: 'EDC Hotel / Resort Bill ($1,929/mo)',
      sampleHome: 'EDC Residential Bill ($324/mo)',
      extractedDataTitle: 'Extracted Bill Insights',
      monthlyKWh: 'Monthly Consumption',
      tariffRate: 'Average Tariff Rate',
      peakDemand: 'Recommended Solar Size (kWp)',
      billingCycle: 'Billing Period',
      meterNumber: 'EDC Meter ID',
      generateProposalFromBill: 'Apply Extracted Data to Proposal'
    },
    whySolar: {
      title: 'Solar Is an Asset, Not an Expense',
      subtitle: 'Electricity tariffs in Cambodia represent one of the highest ongoing operational costs for businesses and homes. Solar locks in predictable, lower power costs for 25+ years.',
      cards: [
        {
          num: 'LOWER',
          label: 'Electricity Costs',
          desc: 'Significantly reduce monthly EDC electricity bills by generating free power directly from your roof space.'
        },
        {
          num: 'SMARTER',
          label: 'Energy Usage',
          desc: 'Monitor real-time energy flow, battery storage levels, and power consumption through smart digital metering.'
        },
        {
          num: 'MORE',
          label: 'Energy Independence',
          desc: 'Protect operations against grid fluctuations, daytime tariff spikes, and power interruptions with hybrid storage.'
        }
      ]
    },
    solutions: {
      badge: 'Engineered Systems',
      title: 'One Solar System. Built Around Your Needs.',
      subtitle: 'Tailored solutions designed for Cambodian environmental conditions, high ambient temperatures, and reliable grid synchronization.',
      transparencyNote: 'Important Engineering Guideline: A battery is not always necessary. If 70%+ of your electricity is consumed during the daytime (like shops, offices, and factories), On-Grid solar delivers the fastest return on investment. Hybrid & Battery solutions provide critical resilience for night loads and blackout backup.',
      cards: [
        {
          id: 'on_grid',
          tag: 'Fastest Payback',
          title: 'On-Grid Solar',
          target: 'Shops, Offices, Factories, Hotels, Daytime Businesses',
          benefit: 'Reduce your electricity bill with clean Solar power generated during peak daytime sun hours.',
          points: [
            'Lowest initial investment cost',
            'Synchronizes directly with EDC grid supply',
            'Zero battery maintenance required',
            'Estimated payback: 3 to 4.5 years'
          ],
          cta: 'Explore On-Grid'
        },
        {
          id: 'hybrid',
          tag: 'Popular for Villas & Clinics',
          title: 'Hybrid Solar',
          target: 'Homes, Villas, Private Clinics, Critical Workspaces',
          benefit: 'Solar generation + intelligent battery storage for uninterrupted comfort day and night.',
          points: [
            'Powers loads during the day & stores surplus',
            'Automated 10ms blackout switchover',
            'Reduces night electricity consumption',
            'Flexible modular battery expansion'
          ],
          cta: 'Explore Hybrid'
        },
        {
          id: 'battery',
          tag: 'Continuous Power',
          title: 'Solar + Commercial Battery',
          target: 'Warehouses, Cold Storage, Factories, Remote Facilities',
          benefit: 'High-capacity energy storage for mission-critical facilities requiring uninterrupted business continuity.',
          points: [
            'Safe Grade-A LiFePO4 chemistry with 6000+ cycles',
            'Peak shaving to lower maximum demand charges',
            'Full off-grid islanding capability when grid fails',
            'Smart cloud telemetry & battery management (BMS)'
          ],
          cta: 'Explore Storage'
        }
      ]
    },
    energyFlow: {
      badge: 'Visual Energy Flow',
      title: 'How Solar Energy Flows Through Your Building',
      subtitle: 'Interactive live simulation of power generation, conversion, consumption, and storage.',
      modeDay: 'Daytime Solar Generation',
      modeNight: 'Nighttime Battery / Grid Mode',
      sun: 'Sun',
      solarPanels: 'Solar Panels',
      inverter: 'Smart Inverter',
      building: 'Home / Business Load',
      battery: 'LiFePO4 Battery',
      grid: 'EDC Grid',
      flowExplain: 'Solar modules convert sunlight into DC electricity. The smart inverter converts DC into AC power for your appliances. Surplus energy charges the battery or coordinates seamlessly with the utility grid.'
    },
    examples: {
      badge: 'Reference Capacities',
      title: 'System Examples & Expected Outputs',
      subtitle: 'Indicative configurations based on real Cambodian commercial and residential load benchmarks.',
      items: [
        {
          tier: 'Small Business / Residence',
          capacity: '10 kWp',
          suitableFor: 'Shops, Minimarts, Cafes, Large Villas',
          monthlyGen: '≈ 1,200 kWh/mo',
          monthlySavings: '≈ $200 – $240/mo',
          annualSavings: '≈ $2,500 – $2,900/yr',
          roofSpace: '≈ 45 – 55 m²',
          tag: 'Quick Deployment'
        },
        {
          tier: 'Medium Commercial',
          capacity: '30 kWp',
          suitableFor: 'Commercial Buildings, Clinics, Restaurants, Hotels',
          monthlyGen: '≈ 3,600 kWh/mo',
          monthlySavings: '≈ $620 – $740/mo',
          annualSavings: '≈ $7,500 – $8,900/yr',
          roofSpace: '≈ 130 – 160 m²',
          tag: 'Most Popular'
        },
        {
          tier: 'Large Enterprise / Industrial',
          capacity: '100 kWp+',
          suitableFor: 'Factories, Warehouses, Cold Storage, Processing Plants',
          monthlyGen: '≈ 12,000+ kWh/mo',
          monthlySavings: '≈ $2,100 – $2,600+/mo',
          annualSavings: '≈ $25,000 – $31,000+/yr',
          roofSpace: '≈ 450 – 600+ m²',
          tag: 'High Energy Impact'
        }
      ]
    },
    roi: {
      badge: 'Financial Lifecycle',
      title: 'Solar Is Not Just an Energy Upgrade. It’s a High-Yield Business Investment.',
      subtitle: 'Unlike utility bills which vanish forever, solar capital investment pays for itself rapidly and generates cumulative profit for decades.',
      years: [
        { year: 'Year 0', title: 'System Installation', desc: 'Turnkey engineering, equipment delivery, professional mounting, and EDC grid sync.' },
        { year: 'Year 1 – 3', title: 'Accelerated Payback', desc: 'High monthly bill savings offset the upfront investment cost month by month.' },
        { year: 'Year 4', title: 'Breakeven Milestone', desc: 'System fully amortized. Capital cost recovered in full.' },
        { year: 'Year 5 – 25+', title: 'Pure Energy Profit', desc: '20+ years of virtually free solar power, boosting business operating margins.' }
      ]
    },
    batteryDeep: {
      badge: 'Resilience & Energy Storage',
      title: 'Keep Your Power When You Need It Most',
      subtitle: 'Tier-1 Lithium Iron Phosphate (LiFePO4) battery technology engineered for extreme ambient temperatures.',
      modes: [
        {
          title: 'DAYTIME',
          tag: 'Peak Generation',
          desc: 'Solar directly powers your air conditioners, machinery, and equipment while simultaneously charging the battery storage bank.'
        },
        {
          title: 'NIGHTTIME',
          tag: 'Self-Consumption',
          desc: 'Stored clean solar energy seamlessly powers evening lighting, cooling, and refrigeration without drawing high-rate grid power.'
        },
        {
          title: 'GRID OUTAGE',
          tag: 'Emergency Islanding',
          desc: 'Automatic <10ms transfer keeps critical servers, medical chillers, and security systems online during utility blackouts.'
        }
      ]
    },
    whyMetfone: {
      badge: 'The Metfone Advantage',
      title: 'Solar Backed by a Technology Leader You Already Trust',
      subtitle: 'From telecommunications to smart energy infrastructure, Metfone brings nationwide engineering standards, digital monitoring, and long-term service commitment.',
      pillars: [
        {
          title: 'Nationwide Service in 25 Provinces',
          desc: 'Engineering branches and technical teams across all provinces in Cambodia for prompt site inspections and rapid on-site maintenance.'
        },
        {
          title: 'Telecom-Grade Reliability',
          desc: 'We operate thousands of mission-critical telecom stations 24/7. We apply the same rigorous engineering standards to your solar system.'
        },
        {
          title: 'Smart Digital Monitoring',
          desc: 'Track your solar yield, energy savings, and battery status in real-time from your smartphone or enterprise desktop portal.'
        },
        {
          title: 'Comprehensive Turnkey Execution',
          desc: 'From initial roof structural assessment and EDC regulatory clearance to installation, commissioning, and scheduled warranty O&M.'
        }
      ]
    },
    useCases: {
      badge: 'Tailored Applications',
      title: 'Engineered for Every Sector in Cambodia',
      subtitle: 'See how different property owners benefit from custom solar sizing.',
      tabs: {
        home: 'Home & Villa',
        shop: 'Shop & Retail',
        factory: 'Factory & Plant',
        hotel: 'Hotel & Office'
      },
      cases: {
        home: {
          problem: 'High monthly electricity bills driven by multi-room inverter air conditioners, water heaters, and pool pumps in private residences.',
          solution: 'Aesthetic 5kWp – 15kWp rooftop hybrid solar with compact LiFePO4 battery storage.',
          outcome: 'Reduce monthly residential electric bills by 50–70% while safeguarding comfort against localized grid blackouts.',
          cta: 'Design Villa Solar'
        },
        shop: {
          problem: 'Heavy daytime cooling, bright display lighting, and glass-door beverage chillers running 12–16 hours every day.',
          solution: '10kWp – 30kWp high-efficiency On-Grid solar engineered directly for peak daytime operating hours.',
          outcome: 'Turn high daytime retail expenses into direct operating profits with 3–4 year payback.',
          cta: 'Design Shop Solar'
        },
        factory: {
          problem: 'Enormous monthly utility bills with high kVA transformer demand charges, production equipment loads, and rising regional tariffs.',
          solution: '50kWp – 500kWp+ commercial rooftop solar with smart peak-shaving control and robust metal roof clamp systems.',
          outcome: 'Save tens of thousands of dollars annually, stabilize operational budget, and comply with international supply-chain green criteria.',
          cta: 'Request Factory Energy Audit'
        },
        hotel: {
          problem: 'Unforgiving guest comfort standards requiring non-stop air conditioning, elevators, kitchen refrigeration, and laundry services.',
          solution: 'Custom 30kWp – 150kWp hybrid setup with smart energy management and seamless generator integration.',
          outcome: 'Substantially reduce operating overhead while marketing your hotel as a modern, eco-responsible hospitality brand.',
          cta: 'Design Hotel Solar'
        }
      }
    },
    faq: {
      badge: 'Frequently Asked Questions',
      title: 'Clear Answers for Smart Energy Decisions',
      subtitle: 'No confusing engineering jargon. Everything you need to know before starting your solar journey.',
      items: [
        {
          q: 'How much solar capacity do I actually need?',
          a: 'Your solar system size is determined by your average monthly electricity bill (in USD or KHR), your daytime operating schedule, and your available unshaded roof space. Use our 60-second calculator to get a preliminary kWp recommendation.'
        },
        {
          q: 'How much money can Solar really save me every month?',
          a: 'Most Cambodian homes and businesses save between 40% and 75% on their monthly electricity bills depending on how much of their power is consumed during sunny daytime hours and whether battery storage is installed.'
        },
        {
          q: 'Do I definitely need a battery storage system?',
          a: 'No, a battery is not always necessary. If your business operates primarily during the daytime (like a shop, office, or factory), an On-Grid system without batteries gives the highest return on investment. If you need power during grid blackouts or want to store solar for nighttime use, a battery is recommended.'
        },
        {
          q: 'What happens during cloudy or rainy weather in Cambodia?',
          a: 'Solar panels continue generating electricity even during overcast and cloudy days by capturing diffused daylight, generating approximately 20–40% of their peak capacity. When solar production dips, the system automatically draws seamless supplemental power from the EDC grid.'
        },
        {
          q: 'What happens at night?',
          a: 'At night, solar panels do not produce power. If you have an On-Grid system, your building automatically draws power from the utility grid as usual. If you have a Hybrid/Battery system, your building consumes the clean energy stored during the daytime.'
        },
        {
          q: 'How long does a typical installation take?',
          a: 'Residential and small commercial installations (under 20 kWp) usually take 2 to 4 working days on-site after engineering approval. Larger industrial projects (100 kWp+) typically take 2 to 4 weeks.'
        },
        {
          q: 'Can Solar work with my existing building electrical wiring?',
          a: 'Yes. Our engineers connect the solar inverter directly into your existing main distribution board (MDB) or sub-panel. There is no need to rewire your entire building.'
        },
        {
          q: 'How long do Solar panels last?',
          a: 'Metfone Solar utilizes Tier-1 N-type monocrystalline solar modules engineered for a 25 to 30-year operational lifetime, backed by standard 12-year product and 25-year 80%+ linear power performance warranties.'
        },
        {
          q: 'How long do modern LiFePO4 batteries last?',
          a: 'Grade-A Lithium Iron Phosphate (LiFePO4) solar batteries last 6,000+ charge cycles, representing 10 to 15 years of daily use under proper environmental maintenance.'
        },
        {
          q: 'Can Metfone engineers survey my location anywhere in Cambodia?',
          a: 'Yes! Metfone has technical teams and logistics branches operating across all 25 provinces in Cambodia. We provide comprehensive on-site roof and electrical surveys.'
        },
        {
          q: 'Is the calculator estimate accurate?',
          a: 'Our calculator uses realistic Cambodian solar radiation benchmarks (1,450 kWh/kWp/year) and prevailing EDC tariff structures. The estimate gives a solid baseline; our technical team will finalize exact figures during a site survey.'
        },
        {
          q: 'Can I start with a smaller Solar system and expand later?',
          a: 'Yes. We can design modular systems with expandable inverters and battery bays, allowing you to scale up capacity as your energy needs or budget grow.'
        }
      ]
    },
    finalCta: {
      badge: 'Start Saving Today',
      title: 'Ready to See What Solar Can Do for Your Electricity Bill?',
      subtitle: 'Tell us your monthly bill or upload your latest statement. Our solar engineering team will prepare a customized technical and financial proposal.',
      primaryBtn: 'Calculate My Savings Now',
      secondaryBtn: 'Request Free Site Survey',
      expertBtn: 'Call Metfone Solar Hotline: 1204 / 097 9 097 097'
    },
    footer: {
      tagline: 'Smart energy infrastructure and solar solutions engineered for Cambodia by Metfone.',
      officialHotlines: 'Official Metfone Customer Contacts:',
      hotline1: 'Shortcode: 1204 (Free for Metfone subscribers)',
      hotline2: 'Hotline: +855 97 9 097 097',
      headquarters: 'Metfone Building, No. 199, Mao Tse Toung Blvd, Sangkat Toul Svay Prey II, Khan Boeng Keng Kang, Phnom Penh, Cambodia.',
      website: 'Official Website: metfone.com.kh',
      disclaimer: 'Disclaimer: Solar generation, bill reductions, and payback periods are engineering estimates for informational purposes only. Final configurations depend on professional site survey, roof structure, utility interconnection, and detailed consumption logs.',
      copyright: '© 2026 Metfone (Viettel Cambodia). All rights reserved.'
    },
    proposalModal: {
      title: 'Get Your Official Metfone Solar Proposal',
      subtitle: 'We will prepare a customized 3D roof layout, equipment schedule, and financial ROI breakdown based on your calculation.',
      summaryBoxTitle: 'Your Calculated Solar Sizing:',
      fullName: 'Full Name / Contact Person *',
      fullNamePlaceholder: 'e.g. Sokha Meng / Tan Vandy',
      phone: 'Phone Number (Telegram / WhatsApp) *',
      phonePlaceholder: 'e.g. 097 123 4567',
      preferredChannel: 'Preferred Contact Method',
      email: 'Email Address (Optional)',
      emailPlaceholder: 'name@company.com.kh',
      province: 'Province / Location in Cambodia *',
      notes: 'Additional Notes or Roof Details (Optional)',
      notesPlaceholder: 'e.g. Metal sheet roof, need installation before next month...',
      submitBtn: 'Submit & Request Proposal',
      submitting: 'Securing Your Priority Request...',
      successTitle: 'Thank You! Your Request Has Been Received',
      successMessage: 'A Metfone Solar Energy Specialist will contact you within 2 hours with your preliminary proposal and schedule a free roof inspection if requested.',
      refId: 'Lead Reference ID:',
      close: 'Close Window',
      directChat: 'Or Chat Instantly on Telegram'
    }
  },
  KH: {
    nav: {
      solutions: 'ដំណោះស្រាយសូឡា',
      calculator: 'គណនាការសន្សំ',
      howItWorks: 'ដំណើរការយ៉ាងដូចម្តេច',
      whyMetfone: 'ហេតុអ្វីជ្រើសរើសមិត្តហ្វូន',
      faq: 'សំណួរញឹកញាប់',
      calculateSavings: 'គណនាការសន្សំភ្លើង',
      hotline: 'ទូរស័ព្ទទាន់ហេតុការណ៍',
      adminCrm: 'ប្រព័ន្ធគ្រប់គ្រង CRM'
    },
    hero: {
      badge: 'វេទិកាថាមពលវៃឆ្លាតនៅកម្ពុជា',
      headline: 'បំប្លែងពន្លឺព្រះអាទិត្យ ទៅជាការសន្សំប្រាក់។',
      subheadline: 'ដំណោះស្រាយសូឡាទំនើបសម្រាប់គេហដ្ឋាន និងអាជីវកម្មនៅកម្ពុជា — រចនាឡើងយ៉ាងពិសេសស្របតាមកម្រិតនៃការប្រើប្រាស់អគ្គិសនី ទំហំដំបូល និងគោលដៅថាមពលរបស់អ្នក។',
      primaryCta: 'គណនាការសន្សំភ្លើងរបស់ខ្ញុំ',
      secondaryCta: 'ស្នើសុំចុះពិនិត្យទីតាំងដោយឥតគិតថ្លៃ',
      exampleCardTitle: 'វិក្កយបត្រភ្លើងប្រចាំខែ',
      exampleSavingsTitle: 'លទ្ធភាពសន្សំប្រាក់ជាមួយសូឡា',
      exampleNote: '*ការប៉ាន់ប្រមាណបឋមផ្អែកលើការប្រើប្រាស់ពេលថ្ងៃ',
      trustPillars: [
        'វិស្វកម្មជំនាញបច្ចេកទេស',
        'ឧបករណ៍គុណភាពស្តង់ដារ Tier-1',
        'ដំឡើង និងថែទាំទូទាំងប្រទេស',
        'រចនាឡើងពិសេសសម្រាប់កម្ពុជា'
      ]
    },
    calculator: {
      badge: 'ប្រព័ន្ធគណនាការសន្សំ',
      title: 'តើសូឡាអាចជួយសន្សំប្រាក់អ្នកបានប៉ុន្មាន?',
      subtitle: 'គ្រាន់តែផ្តល់ព័ត៌មានសាមញ្ញមួយចំនួន យើងនឹងប៉ាន់ស្មានទំហំប្រព័ន្ធសូឡាដែលស័ក្តិសមបំផុតក្នុងរយៈពេល ៦០ វិនាទី។',
      step1Title: 'តើនេះជាប្រភេទអចលនទ្រព្យអ្វី?',
      step2Title: 'តើវិក្កយបត្រអគ្គិសនីប្រចាំខែរបស់អ្នកជាមធ្យមប៉ុន្មាន?',
      step3Title: 'តើអ្នកប្រើប្រាស់អគ្គិសនីច្រើនបំផុតនៅពេលណា?',
      step4Title: 'តើអ្នកត្រូវការអាគុយស្តុកទុកថាមពលបម្រុងដែរឬទេ?',
      steps: ['អចលនទ្រព្យ', 'វិក្កយបត្រ', 'កាលវិភាគប្រើប្រាស់', 'អាគុយ'],
      properties: {
        home: { title: 'ផ្ទះ / វីឡា', desc: 'គេហដ្ឋាន និងលំនៅឋានទូទៅ' },
        shop: { title: 'ហាង / ម៉ាត', desc: 'ហាងលក់ទំនិញ ឱសថស្ថាន ម៉ាត' },
        restaurant: { title: 'ភោជនីយដ្ឋាន / កាហ្វេ', desc: 'អាជីវកម្មម្ហូបអាហារប្រើម៉ាស៊ីនត្រជាក់ពេលថ្ងៃ' },
        office: { title: 'ការិយាល័យ / គ្លីនិក', desc: 'កន្លែងធ្វើការ និងមន្ទីរសម្រាកព្យាបាល' },
        factory: { title: 'រោងចក្រ / សិប្បកម្ម', desc: 'ខ្សែច្រវាក់ផលិតកម្ម ម៉ាស៊ីនឧស្សាហកម្ម' },
        hotel: { title: 'សណ្ឋាគារ / រីសត', desc: 'សេវាកម្មបដិសណ្ឋារកិច្ច និងភ្លើងជាប់ជានិច្ច' },
        other: { title: 'អាជីវកម្មផ្សេងទៀត', desc: 'ឃ្លាំងស្តុកទំនិញ កសិដ្ឋាន អង់តែនទូរគមនាគមន៍' }
      },
      daytimeUsage: {
        mostly_day: {
          title: 'ភាគច្រើនពេលថ្ងៃ (៨:០០ ព្រឹក – ៥:០០ ល្ងាច)',
          desc: 'ម៉ាស៊ីនត្រជាក់ គ្រឿងម៉ាស៊ីន ភ្លើងបំភ្លឺដំណើរការពេលថ្ងៃមានពន្លឺព្រះអាទិត្យ។'
        },
        day_night: {
          title: 'ទាំងថ្ងៃ និងយប់ ២៤ ម៉ោង',
          desc: 'ប្រតិបត្តិការបន្តបន្ទាប់ ភោជនីយដ្ឋាន សណ្ឋាគារ ទូក្លាស្សេ និងម៉ាស៊ីនមេ។'
        },
        mostly_night: {
          title: 'ភាគច្រើនពេលយប់ (៦:០០ ល្ងាច – ៦:០០ ព្រឹក)',
          desc: 'ក្លឹបរាត្រី អាជីវកម្មពេលល្ងាច ម៉ាស៊ីនត្រជាក់បន្ទប់គេងពេលយប់។'
        },
        not_sure: {
          title: 'មិនប្រាកដច្បាស់ / ប្រើស្មើគ្នា',
          desc: 'វិស្វកររបស់យើងនឹងពិនិត្យមើលខ្សែបន្ទាត់ប្រើប្រាស់ជាក់ស្តែងរបស់អ្នក។'
        }
      },
      daytimeExplain: 'សូឡាផលិតថាមពលបានច្រើនបំផុតនៅពេលថ្ងៃ។ ការប្រើប្រាស់ភ្លើងស្របពេលថ្ងៃជួយឱ្យទទួលបានផលចំណេញត្រឡប់មកវិញលឿនបំផុត។',
      batteryPreferences: {
        no_battery: {
          title: 'មិនប្រើអាគុយ (On-Grid)',
          desc: 'ចំណាយដើមទុនតិចបំផុត & ចំណេញលឿនបំផុត ដោយកាត់បន្ថយភ្លើងរដ្ឋពេលថ្ងៃផ្ទាល់។'
        },
        battery_backup: {
          title: 'ភ្ជាប់អាគុយស្តុកទុក (Battery Backup)',
          desc: 'ស្តុកថាមពលសូឡាសម្រាប់ប្រើពេលយប់ និងធានាមានភ្លើងប្រើពេលដាច់ភ្លើងរដ្ឋ។'
        },
        not_sure: {
          title: 'សុំការណែនាំបន្ថែម',
          desc: 'យើងនឹងណែនាំទំហំអាគុយសមស្របបន្ទាប់ពីវាយតម្លៃបន្ទុកប្រើប្រាស់ជាក់ស្តែង។'
        }
      },
      back: 'ថយក្រោយ',
      next: 'បន្តទៅមុខ',
      calculateAction: 'គណនាគម្រោងសូឡារបស់ខ្ញុំ',
      results: {
        title: 'លទ្ធផលប៉ាន់ប្រមាណប្រព័ន្ធសូឡារបស់អ្នក',
        badge: 'ការប៉ាន់ស្មានទំហំប្រព័ន្ធ',
        systemSize: 'ទំហំប្រព័ន្ធសូឡាប៉ាន់ស្មាន',
        monthlySavings: 'ប្រាក់សន្សំប្រចាំខែប៉ាន់ស្មាន',
        annualSavings: 'ប្រាក់សន្សំប្រចាំឆ្នាំប៉ាន់ស្មាន',
        billReduction: 'កម្រិតកាត់បន្ថយវិក្កយបត្រ',
        annualGeneration: 'ថាមពលផលិតបានប្រចាំឆ្នាំ',
        payback: 'រយៈពេលរួចថ្លៃដើម (Payback)',
        roofRequired: 'ផ្ទៃក្រឡាដំបូលត្រូវការ',
        panelsCount: 'ចំនួនផ្ទាំងសូឡា Tier-1',
        co2Saved: 'កាត់បន្ថយការបំភាយឧស្ម័ន CO₂',
        treesEq: 'ស្មើនឹងការដាំដើមឈើ / ឆ្នាំ',
        basedOnInputs: 'ផ្អែកលើព័ត៌មានរបស់អ្នក៖',
        billLabel: 'វិក្កយបត្រប្រចាំខែ',
        propertyLabel: 'ប្រភេទអចលនទ្រព្យ',
        usageLabel: 'កាលវិភាគប្រើប្រាស់',
        batteryLabel: 'តម្រូវការអាគុយ',
        disclaimer: 'នេះជាការប៉ាន់ប្រមាណបឋមសម្រាប់ផ្តល់ព័ត៌មានប៉ុណ្ណោះ។ ទំហំប្រព័ន្ធពិតប្រាកដ ប្រាក់សន្សំ និងរយៈពេលរួចថ្លៃដើម អាស្រ័យលើការចុះពិនិត្យទីតាំងជាក់ស្តែង ទិសដៅដំបូល ម្លប់ និងការជ្រើសរើសបរិក្ខារ។',
        actionsTitle: 'ចង់ទទួលបានសំណើគម្រោងជាក់លាក់ និងត្រឹមត្រូវជាងនេះ?',
        actionsSubtitle: 'ទាក់ទងមកអ្នកជំនាញសូឡាមិត្តហ្វូន ឬផ្ញើវិក្កយបត្រភ្លើងដើម្បីទទួលបានការវិភាគបច្ចេកទេសលម្អិត។',
        ctaProposal: 'ស្នើសុំសំណើគម្រោងសូឡាឥតគិតថ្លៃ',
        ctaSurvey: 'ស្នើសុំចុះពិនិត្យទីតាំងឥតគិតថ្លៃ',
        ctaUploadBill: 'បញ្ចូលវិក្កយបត្រភ្លើងដើម្បីវិភាគ Tier-2',
        ctaTalkExpert: 'ជជែកជាមួយអ្នកឯកទេសសូឡា'
      }
    },
    billUpload: {
      badge: 'ការវិភាគបច្ចេកទេសកម្រិត Tier-2',
      title: 'បញ្ចូលវិក្កយបត្រអគ្គិសនីរបស់អ្នកដើម្បីភាពសុក្រឹតខ្ពស់',
      subtitle: 'មិនបាច់ចំណាយពេលបញ្ចូលលេខដោយដៃ។ គ្រាន់តែបញ្ចូលរូបថត ឬឯកសារវិក្កយបត្រអគ្គិសនីកម្ពុជា (EDC) ដើម្បីទទួលបានរបាយការណ៍វិស្វកម្មជាក់លាក់។',
      dragDropTitle: 'ទម្លាក់វិក្កយបត្រ EDC នៅទីនេះ ឬចុចដើម្បីជ្រើសរើសរូបភាព',
      supportedFormats: 'គាំទ្រទម្រង់ PDF, JPG, PNG រហូតដល់ 15MB',
      analyzingBill: 'កំពុងវិភាគទិន្នន័យវិក្កយបត្រដោយស្វ័យប្រវត្តិ...',
      sampleBillsTitle: 'ឬសាកល្បងជាមួយគំរូវិក្កយបត្រ EDC៖',
      sampleFactory: 'វិក្កយបត្ររោងចក្រ ($3,722/ខែ)',
      sampleHotel: 'វិក្កយបត្រសណ្ឋាគារ ($1,929/ខែ)',
      sampleHome: 'វិក្កយបត្រគេហដ្ឋាន ($324/ខែ)',
      extractedDataTitle: 'ទិន្នន័យដែលទាញចេញពីវិក្កយបត្រ',
      monthlyKWh: 'ការប្រើប្រាស់ប្រចាំខែ (kWh)',
      tariffRate: 'តម្លៃថ្លៃភ្លើងគិតជាមធ្យម',
      peakDemand: 'ទំហំប្រព័ន្ធសូឡាណែនាំ (kWp)',
      billingCycle: 'កាលបរិច្ឆេទវិក្កយបត្រ',
      meterNumber: 'លេខកុងទ័រ EDC',
      generateProposalFromBill: 'អនុវត្តទិន្នន័យនេះទៅក្នុងសំណើគម្រោង'
    },
    whySolar: {
      title: 'សូឡាជាទ្រព្យសកម្ម មិនមែនជាការចំណាយឥតប្រយោជន៍ទេ',
      subtitle: 'ថ្លៃអគ្គិសនីនៅកម្ពុជាគឺជាបន្ទុកចំណាយប្រតិបត្តិការដ៏ធំមួយ។ ប្រព័ន្ធសូឡាជួយកាត់បន្ថយ និងរក្សាតម្លៃថាមពលរបស់អ្នកឱ្យនៅថេរក្នុងរយៈពេលជាង ២៥ ឆ្នាំ។',
      cards: [
        {
          num: 'កាត់បន្ថយ',
          label: 'ថ្លៃចំណាយអគ្គិសនី',
          desc: 'កាត់បន្ថយវិក្កយបត្រភ្លើងប្រចាំខែបានយ៉ាងច្រើន ដោយទាញយកថាមពលឥតគិតថ្លៃពីពន្លឺព្រះអាទិត្យលើដំបូលរបស់អ្នក។'
        },
        {
          num: 'វៃឆ្លាត',
          label: 'ក្នុងការគ្រប់គ្រងថាមពល',
          desc: 'តាមដានការផលិត ការប្រើប្រាស់ និងកម្រិតអាគុយផ្ទាល់តាមរយៈទូរស័ព្ទដៃស្មាតហ្វូនបានគ្រប់ពេលវេលា។'
        },
        {
          num: 'ម្ចាស់ការ',
          label: 'លើការផ្គត់ផ្គង់ថាមពល',
          desc: 'ការពារអាជីវកម្មរបស់អ្នកពីការរអាក់រអួល ឬដាច់ភ្លើងរដ្ឋ ជាមួយនឹងប្រព័ន្ធអាគុយស្តុកទុកថាមពលទំនើប។'
        }
      ]
    },
    solutions: {
      badge: 'ប្រព័ន្ធវិស្វកម្មស្តង់ដារ',
      title: 'ប្រព័ន្ធសូឡា រចនាឡើងស្របតាមតម្រូវការជាក់ស្តែង',
      subtitle: 'ដំណោះស្រាយត្រូវបានកែច្នៃស្របតាមអាកាសធាតុ និងសីតុណ្ហភាពក្តៅនៅកម្ពុជា ជាមួយការតភ្ជាប់បណ្តាញជាតិប្រកបដោយសុវត្ថិភាព។',
      transparencyNote: 'គោលការណ៍វិស្វកម្មតម្លាភាព៖ អាគុយមិនមែនសុទ្ធតែចាំបាច់សម្រាប់គ្រប់គ្នាទេ។ ប្រសិនបើអ្នកប្រើប្រាស់ភ្លើងច្រើនជាង ៧០% នៅពេលថ្ងៃ (ដូចជាហាង ការិយាល័យ និងរោងចក្រ) ប្រព័ន្ធ On-Grid ផ្តល់ផលចំណេញត្រឡប់មកវិញលឿនបំផុត។ ប្រព័ន្ធ Hybrid ផ្តល់សារៈសំខាន់បំផុតសម្រាប់ពេលយប់ និងការពារការដាច់ភ្លើង។',
      cards: [
        {
          id: 'on_grid',
          tag: 'រួចថ្លៃដើមលឿនបំផុត',
          title: 'សូឡា On-Grid',
          target: 'ហាងទំនិញ ការិយាល័យ រោងចក្រ សណ្ឋាគារ',
          benefit: 'កាត់បន្ថយថ្លៃភ្លើងយ៉ាងច្រើន ដោយប្រើថាមពលសូឡាដែលផលិតបាននៅពេលថ្ងៃ។',
          points: [
            'ចំណាយដើមទុនទាបបំផុត',
            'ដំណើរការស្របគ្នាជាមួយបណ្តាញអគ្គិសនីរដ្ឋ (EDC)',
            'មិនចាំបាច់មានការថែទាំអាគុយ',
            'រយៈពេលរួចថ្លៃដើម៖ ៣ ទៅ ៤.៥ ឆ្នាំ'
          ],
          cta: 'ស្វែងយល់ពី On-Grid'
        },
        {
          id: 'hybrid',
          tag: 'ពេញនិយមសម្រាប់វីឡា និងគ្លីនិក',
          title: 'សូឡា Hybrid',
          target: 'ផ្ទះវីឡា គ្លីនិក អាជីវកម្មដែលត្រូវការភ្លើងជាប់',
          benefit: 'ផលិតថាមពលពេលថ្ងៃ និងស្តុកទុកក្នុងអាគុយសម្រាប់ប្រើប្រាស់បន្តពេលយប់។',
          points: [
            'ផ្គត់ផ្គង់ពេលថ្ងៃ និងសាកអាគុយដោយស្វ័យប្រវត្តិ',
            'ប្តូរប្រភពភ្លើងលឿនបំផុតក្រោម 10ms ពេលដាច់ភ្លើងរដ្ឋ',
            'កាត់បន្ថយការប្រើភ្លើងរដ្ឋនៅពេលយប់',
            'អាចបន្ថែមទំហំអាគុយបានយ៉ាងងាយស្រួល'
          ],
          cta: 'ស្វែងយល់ពី Hybrid'
        },
        {
          id: 'battery',
          tag: 'ថាមពលបម្រុងជាប់ជានិច្ច',
          title: 'សូឡា + អាគុយពាណិជ្ជកម្ម',
          target: 'ឃ្លាំងត្រជាក់ រោងចក្រ មណ្ឌលទិន្នន័យ ទីតាំងដាច់ស្រយាល',
          benefit: 'ប្រព័ន្ធស្តុកថាមពលសមត្ថភាពខ្ពស់ សម្រាប់អាជីវកម្មដែលមិនអាចខ្វះភ្លើងបាន។',
          points: [
            'អាគុយ LiFePO4 សុវត្ថិភាពខ្ពស់ ប្រើបានលើស ៦,០០០ ដង',
            'ជួយបន្ថយកម្រិត Peak Demand លើកុងទ័រធំៗ',
            'ដំណើរការឯករាជ្យដាច់ដោយឡែកពេលបណ្តាញជាតិដាច់',
            'ប្រព័ន្ធត្រួតពិនិត្យ និងគ្រប់គ្រងអាគុយឆ្លាតវៃ (BMS)'
          ],
          cta: 'ស្វែងយល់ពី Storage'
        }
      ]
    },
    energyFlow: {
      badge: 'ខ្សែចរន្តថាមពល',
      title: 'ដំណើរការនៃការផ្គត់ផ្គង់ថាមពលសូឡា',
      subtitle: 'ការក្លែងធ្វើអន្តរកម្មនៃការផលិត ការបំប្លែង ការប្រើប្រាស់ និងការស្តុកទុកថាមពល។',
      modeDay: 'របៀបពេលថ្ងៃ (ផលិតសូឡា)',
      modeNight: 'របៀបពេលយប់ (ប្រើអាគុយ / ភ្លើងរដ្ឋ)',
      sun: 'ព្រះអាទិត្យ',
      solarPanels: 'ផ្ទាំងសូឡា',
      inverter: 'ឧបករណ៍បំប្លែង Inverter',
      building: 'អគារ / អាជីវកម្ម',
      battery: 'អាគុយ LiFePO4',
      grid: 'បណ្តាញភ្លើងរដ្ឋ EDC',
      flowExplain: 'ផ្ទាំងសូឡាបំប្លែងពន្លឺព្រះអាទិត្យទៅជាចរន្ត DC។ Inverter បំប្លែងទៅជាចរន្ត AC ផ្គត់ផ្គង់ឧបករណ៍អគ្គិសនីរបស់អ្នក។ ថាមពលលើសនឹងត្រូវបញ្ចូលទៅក្នុងអាគុយ ឬសហការជាមួយបណ្តាញរដ្ឋ។'
    },
    examples: {
      badge: 'គំរូទំហំប្រព័ន្ធជាក់ស្តែង',
      title: 'កញ្ចប់គំរូ និងលទ្ធផលសន្សំដែលរំពឹងទុក',
      subtitle: 'ការកំណត់រចនាសម្ព័ន្ធគំរូផ្អែកលើការប្រើប្រាស់ជាក់ស្តែងនៅកម្ពុជា។',
      items: [
        {
          tier: 'អាជីវកម្មខ្នាតតូច / វីឡា',
          capacity: '10 kWp',
          suitableFor: 'ហាងទំនិញ ម៉ាត ហាងកាហ្វេ វីឡាធំៗ',
          monthlyGen: '≈ 1,200 kWh/ខែ',
          monthlySavings: '≈ $200 – $240/ខែ',
          annualSavings: '≈ $2,500 – $2,900/ឆ្នាំ',
          roofSpace: '≈ 45 – 55 m²',
          tag: 'ដំឡើងរហ័ស'
        },
        {
          tier: 'អាជីវកម្មខ្នាតមធ្យម',
          capacity: '30 kWp',
          suitableFor: 'អគារពាណិជ្ជកម្ម គ្លីនិក ភោជនីយដ្ឋាន សណ្ឋាគារ',
          monthlyGen: '≈ 3,600 kWh/ខែ',
          monthlySavings: '≈ $620 – $740/ខែ',
          annualSavings: '≈ $7,500 – $8,900/ឆ្នាំ',
          roofSpace: '≈ 130 – 160 m²',
          tag: 'ពេញនិយមបំផុត'
        },
        {
          tier: 'សហគ្រាសខ្នាតធំ / រោងចក្រ',
          capacity: '100 kWp+',
          suitableFor: 'រោងចក្រ ឃ្លាំងស្តុកទំនិញ ឃ្លាំងត្រជាក់ រោងម៉ាស៊ីនកិនស្រូវ',
          monthlyGen: '≈ 12,000+ kWh/ខែ',
          monthlySavings: '≈ $2,100 – $2,600+/ខែ',
          annualSavings: '≈ $25,000 – $31,000+/ឆ្នាំ',
          roofSpace: '≈ 450 – 600+ m²',
          tag: 'ផលចំណេញខ្ពស់បំផុត'
        }
      ]
    },
    roi: {
      badge: 'វដ្តវិនិយោគហិរញ្ញវត្ថុ',
      title: 'សូឡាមិនមែនត្រឹមតែជាការដំឡើងភ្លើងទេ តែជាការវិនិយោគចំណេញយូរអង្វែង',
      subtitle: 'ខុសពីវិក្កយបត្រភ្លើងរដ្ឋដែលត្រូវបង់ចោលរៀងរាល់ខែ ការវិនិយោគលើសូឡាផ្តល់ផលចំណេញត្រឡប់មកវិញលឿន និងបន្តផ្តល់ផលចំណេញរាប់សិបឆ្នាំ។',
      years: [
        { year: 'ឆ្នាំទី ០', title: 'ដំណាក់កាលដំឡើង', desc: 'សិក្សាគម្រោង ផ្គត់ផ្គង់បរិក្ខារគុណភាពខ្ពស់ ដំឡើងយ៉ាងរឹងមាំ និងតភ្ជាប់បណ្តាញ EDC។' },
        { year: 'ឆ្នាំទី ១ – ៣', title: 'រួចថ្លៃដើមយ៉ាងលឿន', desc: 'ប្រាក់សន្សំពីវិក្កយបត្រភ្លើងប្រចាំខែជួយទូទាត់ថ្លៃដើមដែលបានចំណាយ។' },
        { year: 'ឆ្នាំទី ៤', title: 'ចំណុចរួចថ្លៃដើម (Breakeven)', desc: 'ទូទាត់ថ្លៃដើមរួចរាល់ ១០០%។' },
        { year: 'ឆ្នាំទី ៥ – ២៥+', title: 'ទទួលបានថាមពលចំណេញសុទ្ធ', desc: 'ប្រើប្រាស់ភ្លើងសូឡាឥតគិតថ្លៃជាង ២០ ឆ្នាំបន្ថែម ជួយបង្កើនប្រាក់ចំណេញអាជីវកម្ម។' }
      ]
    },
    batteryDeep: {
      badge: 'ប្រព័ន្ធស្តុកថាមពលបម្រុង',
      title: 'រក្សាការផ្គត់ផ្គង់ថាមពលនៅពេលដែលអ្នកត្រូវការបំផុត',
      subtitle: 'បច្ចេកវិទ្យាអាគុយ Lithium Iron Phosphate (LiFePO4) ស្តង់ដារ Tier-1 រចនាឡើងសម្រាប់អាកាសធាតុក្តៅ។',
      modes: [
        {
          title: 'ពេលថ្ងៃ',
          tag: 'ផលិតបានខ្ពស់បំផុត',
          desc: 'សូឡាផ្គត់ផ្គង់ម៉ាស៊ីនត្រជាក់ និងឧបករណ៍ប្រើប្រាស់ផ្ទាល់ ព្រមទាំងបញ្ចូលថាមពលពេញទៅក្នុងអាគុយ។'
        },
        {
          title: 'ពេលយប់',
          tag: 'ទាញយកថាមពលដែលបានស្តុក',
          desc: 'ថាមពលស្អាតដែលបានស្តុកទុកផ្គត់ផ្គង់ភ្លើងបំភ្លឺ និងម៉ាស៊ីនត្រជាក់ពេលល្ងាចដោយមិនបាច់ទិញភ្លើងរដ្ឋថ្លៃ។'
        },
        {
          title: 'ពេលដាច់ភ្លើងរដ្ឋ',
          tag: 'ប្តូរប្រភពភ្លើងស្វ័យប្រវត្តិ',
          desc: 'ប្តូរប្រភពភ្លើងដោយស្វ័យប្រវត្តិតិចជាង 10ms រក្សាប្រព័ន្ធកុំព្យូទ័រ ទូត្រជាក់ និងប្រព័ន្ធសុវត្ថិភាពឱ្យដំណើរការមិនរអាក់រអួល។'
        }
      ]
    },
    whyMetfone: {
      badge: 'ឧត្តមភាពរបស់មិត្តហ្វូន',
      title: 'សូឡាដែលគាំទ្រដោយក្រុមហ៊ុនបច្ចេកវិទ្យាឈានមុខគេដែលអ្នកទុកចិត្ត',
      subtitle: 'ពីទូរគមនាគមន៍រហូតដល់ថាមពលវៃឆ្លាត មិត្តហ្វូននាំមកនូវស្តង់ដារវិស្វកម្មទូទាំងប្រទេស ប្រព័ន្ធត្រួតពិនិត្យទំនើប និងសេវាកម្មយូរអង្វែង។',
      pillars: [
        {
          title: 'បណ្តាញសេវាកម្មគ្រប់ ២៥ រាជធានី-ខេត្ត',
          desc: 'មានការិយាល័យ និងក្រុមវិស្វករជំនាញប្រចាំការគ្រប់ខេត្តទូទាំងប្រទេសកម្ពុជា ដើម្បីចុះពិនិត្យ និងថែទាំបានឆាប់រហ័ស។'
        },
        {
          title: 'ស្តង់ដារគុណភាពកម្រិតទូរគមនាគមន៍',
          desc: 'យើងគ្រប់គ្រងស្ថានីយអង់តែនរាប់ពាន់កន្លែងដំណើរការ ២៤/៧ ដូច្នេះយើងអនុវត្តស្តង់ដារបច្ចេកទេសដ៏តឹងរ៉ឹងបំផុតលើប្រព័ន្ធសូឡារបស់អ្នក។'
        },
        {
          title: 'ការតាមដានតាមប្រព័ន្ធឌីជីថល',
          desc: 'តាមដានការផលិតថាមពល ប្រាក់សន្សំ និងកម្រិតអាគុយផ្ទាល់តាមរយៈទូរស័ព្ទដៃស្មាតហ្វូនរបស់អ្នក។'
        },
        {
          title: 'សេវាកម្មពេញលេញគ្រប់ជ្រុងជ្រោយ',
          desc: 'ចាប់ពីការវាយតម្លៃរចនាសម្ព័ន្ធដំបូល ការរៀបចំឯកសារ ការដំឡើង រហូតដល់ការធានា និងការថែទាំជាប្រចាំ។'
        }
      ]
    },
    useCases: {
      badge: 'ដំណោះស្រាយតាមវិស័យ',
      title: 'រចនាឡើងយ៉ាងពិសេសសម្រាប់គ្រប់វិស័យនៅកម្ពុជា',
      subtitle: 'ស្វែងយល់ពីរបៀបដែលអចលនទ្រព្យនីមួយៗទាញយកអត្ថប្រយោជន៍ពីសូឡា។',
      tabs: {
        home: 'ផ្ទះ & វីឡា',
        shop: 'ហាងទំនិញ',
        factory: 'រោងចក្រ',
        hotel: 'សណ្ឋាគារ'
      },
      cases: {
        home: {
          problem: 'វិក្កយបត្រភ្លើងខ្ពស់ដោយសារការប្រើម៉ាស៊ីនត្រជាក់ច្រើនបន្ទប់ ម៉ាស៊ីនទឹកក្តៅ និងម៉ាស៊ីនបូមទឹកអាងហែលទឹក។',
          solution: 'ប្រព័ន្ធ Hybrid 5kWp – 15kWp ជាមួយអាគុយ LiFePO4 គុណភាពខ្ពស់។',
          outcome: 'កាត់បន្ថយវិក្កយបត្រភ្លើងពី ៥០% ទៅ ៧០% និងមានភ្លើងប្រើជានិច្ចពេលដាច់ភ្លើងរដ្ឋ។',
          cta: 'រៀបចំគម្រោងសូឡាសម្រាប់វីឡា'
        },
        shop: {
          problem: 'ការប្រើម៉ាស៊ីនត្រជាក់ ភ្លើងបំភ្លឺ និងទូក្លាស្សេភេសជ្ជៈពេញមួយថ្ងៃពី ១២ ទៅ ១៦ ម៉ោង។',
          solution: 'ប្រព័ន្ធ On-Grid 10kWp – 30kWp រចនាឡើងស្របតាមម៉ោងលក់ដូរពេលថ្ងៃ។',
          outcome: 'បំប្លែងការចំណាយពេលថ្ងៃទៅជាប្រាក់ចំណេញអាជីវកម្ម ជាមួយនឹងរយៈពេលរួចថ្លៃដើមត្រឹម ៣–៤ ឆ្នាំ។',
          cta: 'រៀបចំគម្រោងសូឡាសម្រាប់ហាង'
        },
        factory: {
          problem: 'វិក្កយបត្រអគ្គិសនីរាប់ពាន់ដុល្លារក្នុងមួយខែ រួមទាំងថ្លៃបន្ទុកត្រង់ស្វូកុងទ័រធំៗ និងម៉ាស៊ីនផលិតកម្ម។',
          solution: 'ប្រព័ន្ធសូឡាដំបូលរោងចក្រ 50kWp – 500kWp+ ជាមួយប្រព័ន្ធគ្រប់គ្រងបន្ទុកវៃឆ្លាត។',
          outcome: 'សន្សំប្រាក់បានរាប់ម៉ឺនដុល្លារក្នុងមួយឆ្នាំ បង្កើនភាពប្រកួតប្រជែង និងឆ្លើយតបតាមស្តង់ដារបៃតងអន្តរជាតិ។',
          cta: 'ស្នើសុំការវាយតម្លៃថាមពលរោងចក្រ'
        },
        hotel: {
          problem: 'តម្រូវការរក្សាផាសុកភាពភ្ញៀវ ២៤ ម៉ោង ម៉ាស៊ីនត្រជាក់ ជណ្តើរយន្ត ផ្ទះបាយ និងបន្ទប់បោកអ៊ុត។',
          solution: 'ប្រព័ន្ធ Hybrid 30kWp – 150kWp ដំណើរការស្របគ្នាជាមួយម៉ាស៊ីនភ្លើង និងបណ្តាញរដ្ឋ។',
          outcome: 'កាត់បន្ថយថ្លៃដើមប្រតិបត្តិការយ៉ាងច្រើន និងលើកកម្ពស់មុខមាត់សណ្ឋាគារជាអាជីវកម្មបៃតង។',
          cta: 'រៀបចំគម្រោងសូឡាសម្រាប់សណ្ឋាគារ'
        }
      }
    },
    faq: {
      badge: 'សំណួរដែលសួរញឹកញាប់',
      title: 'ចម្លើយច្បាស់លាស់សម្រាប់ធ្វើការសម្រេចចិត្ត',
      subtitle: 'មិនមានពាក្យបច្ចេកទេសស្មុគស្មាញឡើយ។ អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវដឹងមុនពេលចាប់ផ្តើមប្រើប្រាស់សូឡា។',
      items: [
        {
          q: 'តើខ្ញុំត្រូវការទំហំសូឡាប៉ុន្មាន kWp ជាក់ស្តែង?',
          a: 'ទំហំប្រព័ន្ធសូឡាអាស្រ័យលើវិក្កយបត្រភ្លើងប្រចាំខែរបស់អ្នក ម៉ោងដែលអ្នកប្រើប្រាស់ភ្លើងច្រើន និងទំហំផ្ទៃដំបូលដែលគ្មានម្លប់បាំង។ ប្រើប្រាស់ប្រព័ន្ធគណនារយៈពេល ៦០ វិនាទីរបស់យើងដើម្បីដឹងពីទំហំដែលត្រូវប្រើ។'
        },
        {
          q: 'តើសូឡាអាចជួយសន្សំប្រាក់បានប៉ុន្មានពិតប្រាកដក្នុងមួយខែ?',
          a: 'គេហដ្ឋាន និងអាជីវកម្មភាគច្រើននៅកម្ពុជាអាចសន្សំបានពី ៤០% ទៅ ៧៥% នៃវិក្កយបត្រភ្លើងប្រចាំខែ អាស្រ័យលើការប្រើប្រាស់ភ្លើងពេលថ្ងៃ និងការជ្រើសរើសភ្ជាប់អាគុយ។'
        },
        {
          q: 'តើខ្ញុំចាំបាច់ត្រូវដំឡើងអាគុយដែរឬទេ?',
          a: 'មិនចាំបាច់ទាំងអស់នោះទេ។ ប្រសិនបើអាជីវកម្មរបស់អ្នកដំណើរការពេលថ្ងៃ (ដូចជាហាង ការិយាល័យ ឬរោងចក្រ) ប្រព័ន្ធ On-Grid គ្មានអាគុយផ្តល់ផលចំណេញត្រឡប់មកវិញលឿនបំផុត។ ប្រសិនបើអ្នកចង់ការពារពេលដាច់ភ្លើង ឬចង់ប្រើសូឡាពេលយប់ នោះការប្រើអាគុយគឺស័ក្តិសមបំផុត។'
        },
        {
          q: 'ចុះពេលមេឃស្រទុំ ឬមានភ្លៀងធ្លាក់ តើសូឡានៅដំណើរការដែរឬទេ?',
          a: 'ផ្ទាំងសូឡានៅតែបន្តផលិតថាមពលបានពី ២០% ទៅ ៤០% តាមរយៈពន្លឺដែលចាំងឆ្លងកាត់ពពក។ ប្រសិនបើថាមពលសូឡាមិនគ្រប់គ្រាន់ ប្រព័ន្ធនឹងទាញយកភ្លើងបន្ថែមពីបណ្តាញរដ្ឋ EDC ដោយស្វ័យប្រវត្តិ។'
        },
        {
          q: 'តើមានអ្វីកើតឡើងនៅពេលយប់?',
          a: 'នៅពេលយប់ ផ្ទាំងសូឡាមិនផលិតថាមពលទេ។ ប្រសិនបើអ្នកប្រើ On-Grid អគាររបស់អ្នកនឹងប្រើភ្លើងរដ្ឋធម្មតា។ ប្រសិនបើអ្នកប្រើ Hybrid ជាមួយអាគុយ អគាររបស់អ្នកនឹងប្រើថាមពលដែលបានស្តុកទុកពីពេលថ្ងៃ។'
        },
        {
          q: 'តើការដំឡើងត្រូវចំណាយពេលប៉ុន្មានថ្ងៃ?',
          a: 'សម្រាប់គេហដ្ឋាន និងអាជីវកម្មខ្នាតតូច (ក្រោម 20 kWp) ការដំឡើងចំណាយពេលត្រឹមតែ ២ ទៅ ៤ ថ្ងៃប៉ុណ្ណោះ។ សម្រាប់គម្រោងរោងចក្រធំៗ (100 kWp+) ចំណាយពេលប្រហែល ២ ទៅ ៤ សប្តាហ៍។'
        },
        {
          q: 'តើសូឡាអាចដំណើរការជាមួយប្រព័ន្ធខ្សែភ្លើងចាស់របស់ខ្ញុំបានទេ?',
          a: 'បានយ៉ាងងាយស្រួល។ វិស្វកររបស់យើងនឹងតភ្ជាប់ Inverter ចូលទៅក្នុងទូបំបែកភ្លើងមេ (MDB) របស់អ្នកដោយផ្ទាល់ ដោយមិនបាច់រុះរើខ្សែភ្លើងក្នុងផ្ទះឡើយ។'
        },
        {
          q: 'តើផ្ទាំងសូឡាមានអាយុកាលប្រើប្រាស់បានប៉ុន្មានឆ្នាំ?',
          a: 'មិត្តហ្វូនប្រើប្រាស់ផ្ទាំងសូឡា Tier-1 N-type ដែលមានអាយុកាលប្រើប្រាស់ ២៥ ទៅ ៣០ ឆ្នាំ ជាមួយការធានាលើផលិតផល ១២ ឆ្នាំ និងការធានាលើប្រសិទ្ធភាពផលិតថាមពល ២៥ ឆ្នាំ។'
        },
        {
          q: 'តើអាគុយទំនើប LiFePO4 ប្រើប្រាស់បានយូរប៉ុណ្ណា?',
          a: 'អាគុយ LiFePO4 កម្រិត Grade-A អាចសាក និងប្រើប្រាស់បានលើសពី ៦,០០០ ដង ស្មើនឹងរយៈពេលពី ១០ ទៅ ១៥ ឆ្នាំនៃការប្រើប្រាស់ប្រចាំថ្ងៃ។'
        },
        {
          q: 'តើវិស្វករមិត្តហ្វូនអាចចុះពិនិត្យទីតាំងនៅតាមបណ្តាខេត្តបានទេ?',
          a: 'បានគ្រប់ទីកន្លែង! មិត្តហ្វូនមានសាខា និងក្រុមបច្ចេកទេសប្រចាំការគ្រប់ ២៥ រាជធានី-ខេត្តទូទាំងប្រទេសកម្ពុជា។'
        },
        {
          q: 'តើការគណនានេះមានភាពសុក្រឹតកម្រិតណា?',
          a: 'ប្រព័ន្ធគណនារបស់យើងប្រើប្រាស់ទិន្នន័យកម្រិតពន្លឺព្រះអាទិត្យពិតប្រាកដនៅកម្ពុជា (1,450 kWh/kWp/ឆ្នាំ) និងតម្លៃអគ្គិសនី EDC។ លទ្ធផលនេះជាមូលដ្ឋានគ្រឹះដ៏ល្អ ហើយក្រុមការងារនឹងផ្តល់តួលេខលម្អិតពេលចុះពិនិត្យទីតាំង។'
        },
        {
          q: 'តើខ្ញុំអាចចាប់ផ្តើមពីទំហំតូចសិន ហើយពង្រីកបន្ថែមពេលក្រោយបានទេ?',
          a: 'ពិតជាបាន។ យើងរចនាប្រព័ន្ធម៉ូឌុលដែលអាចបន្ថែមផ្ទាំងសូឡា ឬអាគុយនៅពេលក្រោយបានយ៉ាងងាយស្រួល។'
        }
      ]
    },
    finalCta: {
      badge: 'ចាប់ផ្តើមសន្សំប្រាក់ថ្ងៃនេះ',
      title: 'ត្រៀមខ្លួនស្វែងយល់ពីលទ្ធភាពសន្សំថ្លៃភ្លើងជាមួយសូឡាហើយឬនៅ?',
      subtitle: 'ប្រាប់យើងពីវិក្កយបត្រប្រចាំខែរបស់អ្នក ឬផ្ញើវិក្កយបត្រចុងក្រោយ។ ក្រុមវិស្វករសូឡាមិត្តហ្វូននឹងរៀបចំសំណើគម្រោងបច្ចេកទេស និងហិរញ្ញវត្ថុជូនអ្នក។',
      primaryBtn: 'គណនាការសន្សំរបស់ខ្ញុំឥឡូវនេះ',
      secondaryBtn: 'ស្នើសុំចុះពិនិត្យទីតាំងឥតគិតថ្លៃ',
      expertBtn: 'ទូរស័ព្ទទាន់ហេតុការណ៍សូឡាមិត្តហ្វូន៖ 1204 / 097 9 097 097'
    },
    footer: {
      tagline: 'ហេដ្ឋារចនាសម្ព័ន្ធថាមពលវៃឆ្លាត និងដំណោះស្រាយសូឡាគុណភាពខ្ពស់នៅកម្ពុជា ដោយមិត្តហ្វូន។',
      officialHotlines: 'ទំនាក់ទំនងផ្លូវការរបស់មិត្តហ្វូន៖',
      hotline1: 'លេខកូដខ្លី៖ 1204 (ឥតគិតថ្លៃសម្រាប់អ្នកប្រើប្រាស់មិត្តហ្វូន)',
      hotline2: 'ទូរស័ព្ទ៖ +855 97 9 097 097',
      headquarters: 'អគារមិត្តហ្វូន លេខ ១៩៩ មហាវិថីម៉ៅសេទុង សង្កាត់ទួលស្វាយព្រៃទី២ ខណ្ឌបឹងកេងកង រាជធានីភ្នំពេញ កម្ពុជា។',
      website: 'គេហទំព័រផ្លូវការ៖ metfone.com.kh',
      disclaimer: 'ការបញ្ជាក់៖ ការផលិតថាមពល ប្រាក់សន្សំ និងរយៈពេលរួចថ្លៃដើម គឺជាការប៉ាន់ស្មានផ្នែកវិស្វកម្មសម្រាប់ជាព័ត៌មានប៉ុណ្ណោះ។ ការកំណត់ចុងក្រោយអាស្រ័យលើការចុះពិនិត្យជាក់ស្តែង រចនាសម្ព័ន្ធដំបូល និងទិន្នន័យប្រើប្រាស់ពិតប្រាកដ។',
      copyright: '© ២០២៦ មិត្តហ្វូន (Viettel Cambodia)។ រក្សាសិទ្ធិគ្រប់យ៉ាង។'
    },
    proposalModal: {
      title: 'ស្នើសុំសំណើគម្រោងសូឡាផ្លូវការពីមិត្តហ្វូន',
      subtitle: 'យើងនឹងរៀបចំប្លង់ដំបូល 3D បញ្ជីឧបករណ៍ និងការវិភាគផលចំណេញហិរញ្ញវត្ថុជាក់លាក់សម្រាប់អ្នក។',
      summaryBoxTitle: 'ទំហំប្រព័ន្ធសូឡាដែលបានគណនា៖',
      fullName: 'ឈ្មោះពេញ / អ្នកទំនាក់ទំនង *',
      fullNamePlaceholder: 'ឧទាហរណ៍៖ សុខា ម៉េង / វ៉ាន់ឌី',
      phone: 'លេខទូរស័ព្ទ (Telegram / WhatsApp) *',
      phonePlaceholder: 'ឧទាហរណ៍៖ 097 123 4567',
      preferredChannel: 'មធ្យោបាយទំនាក់ទំនងដែលអ្នកពេញចិត្ត',
      email: 'អ៊ីមែល (មិនបង្ខំ)',
      emailPlaceholder: 'name@company.com.kh',
      province: 'ខេត្ត / រាជធានី *',
      notes: 'ព័ត៌មានបន្ថែម ឬព័ត៌មានលម្អិតដំបូល (មិនបង្ខំ)',
      notesPlaceholder: 'ឧទាហរណ៍៖ ដំបូលស័ង្កសី ចង់ដំឡើងមុនដំណាច់ខែក្រោយ...',
      submitBtn: 'បញ្ជូនសំណើសុំគម្រោង',
      submitting: 'កំពុងបញ្ជូនសំណើរបស់អ្នក...',
      successTitle: 'សូមអរគុណ! យើងបានទទួលសំណើរបស់អ្នកហើយ',
      successMessage: 'អ្នកឯកទេសសូឡាមិត្តហ្វូននឹងទាក់ទងមកអ្នកក្នុងរយៈពេល ២ ម៉ោង ជាមួយនឹងសំណើបឋម និងកំណត់កាលវិភាគចុះពិនិត្យទីតាំងឥតគិតថ្លៃ។',
      refId: 'លេខកូដសំណើ៖',
      close: 'បិទផ្ទាំង',
      directChat: 'ឬជជែកផ្ទាល់តាម Telegram'
    }
  },
  VI: {
    nav: {
      solutions: 'Giải pháp Solar',
      calculator: 'Tính Tiết Kiệm',
      howItWorks: 'Quy trình',
      whyMetfone: 'Vì sao chọn Metfone',
      faq: 'Hỏi Đáp',
      calculateSavings: 'Tính Tiết Kiệm Điện',
      hotline: 'Hotline',
      adminCrm: 'Quản lý Lead & Cấu hình'
    },
    hero: {
      badge: 'Nền tảng Năng lượng Thông minh Campuchia',
      headline: 'Biến Ánh Nắng Thành Lợi Nhuận.',
      subheadline: 'Giải pháp Điện Mặt Trời thông minh cho hộ gia đình và doanh nghiệp tại Campuchia — thiết kế chuyên sâu theo biểu đồ phụ tải, diện tích mái và bài toán tài chính của bạn.',
      primaryCta: 'Tính Tiết Kiệm Điện',
      secondaryCta: 'Yêu Cầu Khảo Sát Miễn Phí',
      exampleCardTitle: 'TIỀN ĐIỆN HÀNG THÁNG',
      exampleSavingsTitle: 'Mức Tiết Kiệm Dự Kiến',
      exampleNote: '*Ước tính sơ bộ dựa trên phụ tải ban ngày thương mại',
      trustPillars: [
        'Kỹ thuật Chuẩn Viễn thông',
        'Thiết bị Tier-1 Quốc tế',
        'Thi công & O&M Toàn quốc',
        'Tối ưu cho Khí hậu Campuchia'
      ]
    },
    calculator: {
      badge: 'Công cụ Định cỡ & Tiết kiệm',
      title: 'Điện Mặt Trời Giúp Bạn Tiết Kiệm Bao Nhiêu?',
      subtitle: 'Chỉ cần một vài thông số cơ bản. Chúng tôi sẽ tính toán hệ thống Solar phù hợp nhất với bạn trong 60 giây.',
      step1Title: 'Loại hình công trình của bạn là gì?',
      step2Title: 'Tiền điện trung bình mỗi tháng của bạn khoảng bao nhiêu?',
      step3Title: 'Bạn sử dụng điện nhiều nhất vào khung giờ nào?',
      step4Title: 'Bạn có nhu cầu lưu trữ pin dự phòng không?',
      steps: ['Công trình', 'Tiền điện', 'Lịch dùng điện', 'Lưu trữ'],
      properties: {
        home: { title: 'Nhà phố / Biệt thự', desc: 'Hộ gia đình và biệt thự tư nhân' },
        shop: { title: 'Cửa hàng / Siêu thị mini', desc: 'Bán lẻ, quầy thuốc, tạp hóa tiện lợi' },
        restaurant: { title: 'Nhà hàng / Quán Cafe', desc: 'Ẩm thực tiêu thụ điều hòa nhiều ban ngày' },
        office: { title: 'Văn phòng / Phòng khám', desc: 'Không gian làm việc thương mại và y tế' },
        factory: { title: 'Nhà máy / Xưởng sản xuất', desc: 'Dây chuyền sản xuất và máy móc công nghiệp' },
        hotel: { title: 'Khách sạn / Resort', desc: 'Dịch vụ lưu trú, phụ tải điện liên tục' },
        other: { title: 'Khác / Trang trại / Trạm BTS', desc: 'Kho bãi, trang trại, hạ tầng viễn thông' }
      },
      daytimeUsage: {
        mostly_day: {
          title: 'Chủ yếu Ban ngày (8h00 – 17h00)',
          desc: 'Điều hòa không khí, máy móc, đèn chiếu sáng chạy khi trời nắng.'
        },
        day_night: {
          title: 'Cả ngày lẫn đêm liên tục 24/7',
          desc: 'Vận hành liên tục, nhà hàng, khách sạn, tủ đông & phòng máy chủ.'
        },
        mostly_night: {
          title: 'Chủ yếu Ban đêm (18h00 – 6h00)',
          desc: 'Dịch vụ giải trí về đêm, điều hòa phòng ngủ gia đình.'
        },
        not_sure: {
          title: 'Chưa rõ / Dùng đều',
          desc: 'Kỹ sư của chúng tôi sẽ đo đạc biểu đồ phụ tải thực tế của bạn.'
        }
      },
      daytimeExplain: 'Điện mặt trời sản sinh năng lượng cao nhất vào ban ngày. Tiêu thụ điện trực tiếp lúc nắng to mang lại hiệu quả hoàn vốn nhanh nhất.',
      batteryPreferences: {
        no_battery: {
          title: 'Không dùng pin lưu trữ (Hòa lưới On-Grid)',
          desc: 'Chi phí đầu tư thấp nhất, hoàn vốn nhanh nhất. Giảm trực tiếp tiền điện giờ cao điểm ban ngày.'
        },
        battery_backup: {
          title: 'Có Pin Lưu trữ (Hybrid / Backup)',
          desc: 'Lưu trữ điện mặt trời dư thừa để dùng ban đêm và duy trì nguồn điện khi lưới EDC gặp sự cố.'
        },
        not_sure: {
          title: 'Cần tư vấn thêm',
          desc: 'Chúng tôi sẽ đề xuất dung lượng pin phù hợp sau khi khảo sát phụ tải.'
        }
      },
      back: 'Quay lại',
      next: 'Tiếp tục',
      calculateAction: 'Tính Toán Phương Án Solar',
      results: {
        title: 'KẾT QUẢ TÍNH TOÁN SOLAR CỦA BẠN',
        badge: 'Ước tính thiết kế sơ bộ',
        systemSize: 'Công suất Hệ thống Ước tính',
        monthlySavings: 'Tiết kiệm Trung bình / Tháng',
        annualSavings: 'Tiết kiệm Dự kiến / Năm',
        billReduction: 'Tỷ lệ Giảm Tiền Điện',
        annualGeneration: 'Sản lượng Điện Tạo ra / Năm',
        payback: 'Thời gian Hoàn vốn Dự kiến',
        roofRequired: 'Diện tích Mái Cần thiết',
        panelsCount: 'Số lượng Tấm Pin Tier-1',
        co2Saved: 'Giảm Phát thải CO₂',
        treesEq: 'Tương đương Trồng Cây / Năm',
        basedOnInputs: 'Dựa trên thông tin bạn cung cấp:',
        billLabel: 'Tiền điện tháng',
        propertyLabel: 'Loại công trình',
        usageLabel: 'Khung giờ dùng điện',
        batteryLabel: 'Nhu cầu lưu trữ',
        disclaimer: 'Đây là ước tính sơ bộ nhằm mục đích tham khảo. Công suất chính xác, sản lượng điện, số tiền tiết kiệm và thời gian hoàn vốn phụ thuộc vào khảo sát thực tế, biểu đồ phụ tải EDC 24h, hướng mái, góc nghiêng, bóng râm và lựa chọn chủng loại thiết bị.',
        actionsTitle: 'Bạn muốn nhận bảng đề xuất kỹ thuật chính xác hơn?',
        actionsSubtitle: 'Kết nối ngay với chuyên gia Solar Metfone hoặc tải lên hóa đơn điện để được phân tích chuyên sâu.',
        ctaProposal: 'Nhận Đề Xuất Giải Pháp Miễn Phí',
        ctaSurvey: 'Yêu Cầu Khảo Sát Mái Miễn Phí',
        ctaUploadBill: 'Tải Lên Hóa Đơn Điện (Kiểm toán Tier-2)',
        ctaTalkExpert: 'Chat Trực Tiếp Với Chuyên Gia'
      }
    },
    billUpload: {
      badge: 'Kiểm toán Kỹ thuật Tier-2',
      title: 'Tải Lên Hóa Đơn Điện Để Phân Tích Chuẩn Xác',
      subtitle: 'Không cần tự nhập số liệu. Tải lên ảnh chụp hoặc file hóa đơn điện lực Campuchia (EDC) để hệ thống trích xuất thông số và lập báo cáo kỹ thuật tức thì.',
      dragDropTitle: 'Kéo thả hóa đơn EDC vào đây hoặc bấm để chọn tệp',
      supportedFormats: 'Hỗ trợ định dạng PDF, JPG, PNG tối đa 15MB',
      analyzingBill: 'Đang trích xuất dữ liệu hóa đơn thông minh...',
      sampleBillsTitle: 'Hoặc thử nghiệm nhanh với mẫu hóa đơn EDC:',
      sampleFactory: 'Hóa đơn Nhà máy EDC ($3,722/tháng)',
      sampleHotel: 'Hóa đơn Khách sạn EDC ($1,929/tháng)',
      sampleHome: 'Hóa đơn Hộ gia đình ($324/tháng)',
      extractedDataTitle: 'Thông Tin Trích Xuất Từ Hóa Đơn',
      monthlyKWh: 'Sản lượng tiêu thụ tháng',
      tariffRate: 'Đơn giá điện trung bình',
      peakDemand: 'Công suất Solar đề xuất (kWp)',
      billingCycle: 'Kỳ thanh toán',
      meterNumber: 'Mã công tơ EDC',
      generateProposalFromBill: 'Áp Dụng Số Liệu Này Vào Đề Xuất'
    },
    whySolar: {
      title: 'Solar Là Khoản Đầu Tư Sinh Lời, Không Phải Chi Phí',
      subtitle: 'Biểu giá điện tại Campuchia thuộc nhóm chi phí vận hành lớn nhất. Hệ thống Điện Mặt Trời giúp khóa cố định chi phí năng lượng ở mức thấp trong suốt hơn 25 năm.',
      cards: [
        {
          num: 'GIẢM',
          label: 'Chi phí tiền điện',
          desc: 'Cắt giảm đáng kể hóa đơn điện lực hàng tháng bằng cách tự sản xuất nguồn năng lượng sạch ngay trên mái nhà.'
        },
        {
          num: 'THÔNG MINH',
          label: 'Quản trị năng lượng',
          desc: 'Giám sát sản lượng điện, dòng năng lượng và tình trạng pin lưu trữ theo thời gian thực qua ứng dụng điện thoại.'
        },
        {
          num: 'CHỦ ĐỘNG',
          label: 'Độc lập nguồn điện',
          desc: 'Bảo vệ hoạt động sản xuất kinh doanh khỏi sự cố mất điện lưới và biến động giá điện giờ cao điểm.'
        }
      ]
    },
    solutions: {
      badge: 'Hệ thống Tiêu chuẩn',
      title: 'Một Hệ Thống Solar. May Đo Theo Đúng Nhu Cầu.',
      subtitle: 'Giải pháp được thiết kế tối ưu cho điều kiện thời tiết nhiệt đới nhiệt độ cao tại Campuchia, hòa đồng bộ an toàn với lưới EDC.',
      transparencyNote: 'Lưu ý Kỹ thuật Minh bạch: Pin lưu trữ không phải lúc nào cũng bắt buộc. Nếu doanh nghiệp của bạn sử dụng hơn 70% điện vào ban ngày (như cửa hàng, văn phòng, nhà xưởng), hệ thống Hòa Lưới (On-Grid) sẽ mang lại thời gian hoàn vốn nhanh nhất. Hệ thống Hybrid & Battery chỉ cần thiết khi cần dự phòng mất điện hoặc dùng điện đêm.',
      cards: [
        {
          id: 'on_grid',
          tag: 'Hoàn vốn nhanh nhất',
          title: 'Hòa Lưới (On-Grid)',
          target: 'Cửa hàng, Văn phòng, Nhà xưởng, Khách sạn',
          benefit: 'Giảm mạnh tiền điện bằng nguồn năng lượng mặt trời dồi dào sinh ra vào ban ngày.',
          points: [
            'Chi phí đầu tư ban đầu thấp nhất',
            'Đồng bộ trực tiếp với lưới điện lực EDC',
            'Không tốn chi phí bảo trì ắc quy/pin',
            'Thời gian hoàn vốn: 3 đến 4.5 năm'
          ],
          cta: 'Xem On-Grid'
        },
        {
          id: 'hybrid',
          tag: 'Phổ biến cho Biệt thự & Phòng khám',
          title: 'Hòa Lưới Có Lưu Trữ (Hybrid)',
          target: 'Biệt thự, Phòng khám, Cơ sở yêu cầu điện liên tục',
          benefit: 'Phát điện ban ngày và lưu trữ lượng dư vào pin để sử dụng ban đêm, không lo mất điện.',
          points: [
            'Cấp điện tải ngày & tự động sạc đầy pin',
            'Chuyển mạch mất điện siêu tốc < 10ms',
            'Giảm phụ thuộc vào điện lưới ban đêm',
            'Dễ dàng mở rộng dung lượng pin khi cần'
          ],
          cta: 'Xem Hybrid'
        },
        {
          id: 'battery',
          tag: 'Cấp điện liên tục 24/7',
          title: 'Solar + Pin Lưu Trữ Công Nghiệp',
          target: 'Kho lạnh, Nhà máy, Trung tâm dữ liệu, Vùng xa',
          benefit: 'Hệ thống lưu trữ dung lượng lớn đảm bảo duy trì liên tục cho các dây chuyền sống còn.',
          points: [
            'Pin LiFePO4 Grade-A an toàn tuyệt đối với 6000+ chu kỳ',
            'Cắt giảm công suất đỉnh (Peak Shaving) giảm tiền phạt kVA',
            'Khả năng vận hành độc lập hoàn toàn khi lưới gặp sự cố',
            'Hệ thống quản lý pin thông minh (BMS) kết nối đám mây'
          ],
          cta: 'Xem Storage'
        }
      ]
    },
    energyFlow: {
      badge: 'Dòng Năng Lượng Trực Quan',
      title: 'Điện Mặt Trời Vận Hành Như Thế Nào Trong Tòa Nhà?',
      subtitle: 'Mô phỏng tương tác quá trình sinh điện, chuyển đổi, tiêu thụ và tích trữ năng lượng.',
      modeDay: 'Chế độ Ban ngày (Phát điện Solar)',
      modeNight: 'Chế độ Ban đêm (Xả pin / Lưới)',
      sun: 'Mặt trời',
      solarPanels: 'Tấm Pin Solar',
      inverter: 'Biến tần Inverter',
      building: 'Phụ tải Tòa nhà',
      battery: 'Pin LiFePO4',
      grid: 'Lưới điện EDC',
      flowExplain: 'Tấm pin hấp thụ ánh nắng tạo ra dòng điện một chiều (DC). Biến tần thông minh biến đổi thành điện xoay chiều (AC) cho các thiết bị điện. Lượng điện dư sẽ nạp vào pin lưu trữ hoặc phối hợp nhịp nhàng với lưới điện.'
    },
    examples: {
      badge: 'Cấu hình Tham khảo',
      title: 'Các Gói Hệ Thống Mẫu & Hiệu Quả Kinh Tế',
      subtitle: 'Các cấu hình tiêu chuẩn dựa trên dữ liệu phụ tải thực tế tại Campuchia.',
      items: [
        {
          tier: 'Kinh doanh Nhỏ / Biệt thự',
          capacity: '10 kWp',
          suitableFor: 'Cửa hàng, Siêu thị mini, Cafe, Biệt thự lớn',
          monthlyGen: '≈ 1,200 kWh/tháng',
          monthlySavings: '≈ $200 – $240/tháng',
          annualSavings: '≈ $2,500 – $2,900/năm',
          roofSpace: '≈ 45 – 55 m²',
          tag: 'Triển khai nhanh'
        },
        {
          tier: 'Doanh nghiệp Vừa / Tòa nhà',
          capacity: '30 kWp',
          suitableFor: 'Tòa nhà văn phòng, Phòng khám, Nhà hàng, Khách sạn',
          monthlyGen: '≈ 3,600 kWh/tháng',
          monthlySavings: '≈ $620 – $740/tháng',
          annualSavings: '≈ $7,500 – $8,900/năm',
          roofSpace: '≈ 130 – 160 m²',
          tag: 'Lựa chọn nhiều nhất'
        },
        {
          tier: 'Doanh nghiệp Lớn / Nhà máy',
          capacity: '100 kWp+',
          suitableFor: 'Nhà máy, Kho bãi, Kho lạnh, Cơ sở chế biến',
          monthlyGen: '≈ 12,000+ kWh/tháng',
          monthlySavings: '≈ $2,100 – $2,600+/tháng',
          annualSavings: '≈ $25,000 – $31,000+/năm',
          roofSpace: '≈ 450 – 600+ m²',
          tag: 'Hiệu quả quy mô lớn'
        }
      ]
    },
    roi: {
      badge: 'Bài Toán Tài Chính',
      title: 'Solar Không Đơn Thuần Là Thiết Bị Điện. Đó Là Kênh Đầu Tư Sinh Lời Cao.',
      subtitle: 'Khác với hóa đơn điện lực mất đi vĩnh viễn mỗi tháng, chi phí đầu tư Solar tự hoàn vốn nhanh chóng và tạo ra lợi nhuận ròng trong hàng chục năm tiếp theo.',
      years: [
        { year: 'Năm 0', title: 'Đầu tư & Lắp đặt', desc: 'Khảo sát kỹ thuật, cung cấp thiết bị chuẩn quốc tế, thi công chắc chắn và đấu nối lưới EDC.' },
        { year: 'Năm 1 – 3', title: 'Thu hồi vốn nhanh', desc: 'Số tiền điện tiết kiệm hàng tháng bù đắp trực tiếp vào chi phí đầu tư ban đầu.' },
        { year: 'Năm 4', title: 'Cột mốc Hòa Vốn', desc: 'Hệ thống hoàn tất khấu hao 100% vốn đầu tư.' },
        { year: 'Năm 5 – 25+', title: 'Lợi Nhuận Thuần Túy', desc: 'Hơn 20 năm sử dụng điện mặt trời gần như miễn phí, gia tăng biên lợi nhuận cho doanh nghiệp.' }
      ]
    },
    batteryDeep: {
      badge: 'An ninh Năng lượng',
      title: 'Duy Trì Nguồn Điện Đúng Lúc Bạn Cần Nhất',
      subtitle: 'Công nghệ pin Lithium Iron Phosphate (LiFePO4) chuẩn Tier-1 thiết kế bền bỉ trong môi trường nhiệt độ cao.',
      modes: [
        {
          title: 'BAN NGÀY',
          tag: 'Phát điện cực đại',
          desc: 'Điện mặt trời cấp trực tiếp cho máy lạnh, dây chuyền sản xuất đồng thời sạc đầy dàn pin lưu trữ.'
        },
        {
          title: 'BAN ĐÊM',
          tag: 'Tự tiêu thụ thông minh',
          desc: 'Điện sạch tích lũy từ ban ngày xả ra cấp cho đèn chiếu sáng và làm mát ban đêm, không cần mua điện lưới giá cao.'
        },
        {
          title: 'MẤT ĐIỆN LƯỚI',
          tag: 'Chuyển mạch khẩn cấp',
          desc: 'Tự động kích hoạt nguồn dự phòng trong <10ms, giữ cho hệ thống máy chủ, kho lạnh và camera luôn hoạt động liên tục.'
        }
      ]
    },
    whyMetfone: {
      badge: 'Thế Mạnh Của Metfone',
      title: 'Điện Mặt Trời Được Bảo Chứng Bởi Tập Đoàn Công Nghệ Uy Tín Hàng Đầu',
      subtitle: 'Từ hạ tầng viễn thông đến năng lượng thông minh, Metfone mang đến tiêu chuẩn kỹ thuật chuẩn mực toàn quốc, giải pháp số hóa và cam kết đồng hành dài hạn.',
      pillars: [
        {
          title: 'Mạng lưới Kỹ thuật khắp 25 Tỉnh/Thành',
          desc: 'Chi nhánh và đội ngũ kỹ sư thường trực tại tất cả các tỉnh thành tại Campuchia sẵn sàng khảo sát và hỗ trợ kỹ thuật nhanh chóng.'
        },
        {
          title: 'Độ Tin Cậy Chuẩn Viễn Thông',
          desc: 'Chúng tôi vận hành hàng ngàn trạm phát sóng 24/7. Chúng tôi áp dụng quy chuẩn kỹ thuật khắt khe đó vào chính hệ thống Solar của bạn.'
        },
        {
          title: 'Giám Sát Số Hóa Thông Minh',
          desc: 'Theo dõi sản lượng điện, số tiền tiết kiệm và tình trạng pin trực quan ngay trên điện thoại hoặc cổng thông tin doanh nghiệp.'
        },
        {
          title: 'Dịch Vụ Trọn Gói Từ A-Z',
          desc: 'Từ khảo sát kết cấu mái, thủ tục pháp lý, thi công an toàn đến bảo hành và bảo trì định kỳ dài hạn.'
        }
      ]
    },
    useCases: {
      badge: 'Ứng Dụng Thực Tế',
      title: 'Giải Pháp Tối Ưu Cho Từng Ngành Nghề Tại Campuchia',
      subtitle: 'Xem cách các chủ công trình tận dụng tối đa lợi ích từ Điện Mặt Trời.',
      tabs: {
        home: 'Nhà & Biệt thự',
        shop: 'Cửa hàng & Bán lẻ',
        factory: 'Nhà máy & Xưởng',
        hotel: 'Khách sạn & Văn phòng'
      },
      cases: {
        home: {
          problem: 'Hóa đơn tiền điện cao do chạy nhiều máy lạnh inverter, bình nóng lạnh và máy bơm hồ bơi trong biệt thự.',
          solution: 'Hệ thống Hybrid 5kWp – 15kWp thẩm mỹ cao đi kèm pin lưu trữ LiFePO4 nhỏ gọn.',
          outcome: 'Giảm 50–70% hóa đơn tiền điện hàng tháng và an tâm sinh hoạt không lo sự cố mất điện.',
          cta: 'Thiết Kế Solar Biệt Thự'
        },
        shop: {
          problem: 'Tiêu thụ điện lớn vào ban ngày cho điều hòa, đèn rọi trưng bày và tủ mát bảo quản đồ uống suốt 12–16 tiếng.',
          solution: 'Hệ thống On-Grid 10kWp – 30kWp công suất cao hòa lưới trực tiếp vào giờ bán hàng.',
          outcome: 'Biến chi phí điện ban ngày thành lợi nhuận ròng với thời gian hoàn vốn chỉ 3–4 năm.',
          cta: 'Thiết Kế Solar Cửa Hàng'
        },
        factory: {
          problem: 'Hóa đơn điện lực hàng ngàn USD mỗi tháng kèm phụ phí công suất biến áp kVA lớn và giá điện ngày càng tăng.',
          solution: 'Hệ thống Solar áp mái nhà xưởng 50kWp – 500kWp+ tích hợp giải pháp kẹp ngàm chuyên dụng cho mái tôn.',
          outcome: 'Tiết kiệm hàng chục ngàn USD mỗi năm, ổn định chi phí vận hành và đạt chứng chỉ xanh xuất khẩu.',
          cta: 'Yêu Cầu Kiểm Toán Năng Lượng Nhà Máy'
        },
        hotel: {
          problem: 'Phải duy trì tiêu chuẩn làm mát, thang máy, bếp và giặt là liên tục phục vụ khách 24/7.',
          solution: 'Hệ thống Hybrid 30kWp – 150kWp phối hợp nhịp nhàng giữa Solar, máy phát điện và lưới EDC.',
          outcome: 'Cắt giảm đáng kể chi phí vận hành đồng thời nâng tầm thương hiệu khách sạn xanh bền vững.',
          cta: 'Thiết Kế Solar Khách Sạn'
        }
      }
    },
    faq: {
      badge: 'Câu Hỏi Thường Gặp',
      title: 'Giải Đáp Rõ Ràng Cho Quyết Định Đầu Tư Thông Minh',
      subtitle: 'Không thuật ngữ kỹ thuật rườm rà. Tất cả những gì bạn cần biết trước khi bắt đầu với Điện Mặt Trời.',
      items: [
        {
          q: 'Tôi thực sự cần lắp đặt hệ thống công suất bao nhiêu kWp?',
          a: 'Công suất hệ thống được tính toán dựa trên số tiền điện hàng tháng của bạn (USD hoặc KHR), thói quen sử dụng điện ban ngày và diện tích mái nhà không bị che bóng. Sử dụng công cụ tính 60 giây của chúng tôi để nhận khuyến nghị sơ bộ.'
        },
        {
          q: 'Điện Mặt Trời thực tế giúp tôi tiết kiệm được bao nhiêu tiền mỗi tháng?',
          a: 'Hầu hết các hộ gia đình và doanh nghiệp tại Campuchia tiết kiệm từ 40% đến 75% hóa đơn tiền điện hàng tháng tùy thuộc vào tỷ lệ dùng điện ban ngày và việc có lắp đặt pin lưu trữ hay không.'
        },
        {
          q: 'Tôi có nhất thiết phải mua pin lưu trữ không?',
          a: 'Không, pin lưu trữ không phải lúc nào cũng cần thiết. Nếu công trình của bạn hoạt động chủ yếu vào ban ngày (như cửa hàng, văn phòng, nhà xưởng), hệ thống Hòa Lưới (On-Grid) không dùng pin sẽ mang lại tỷ suất hoàn vốn cao nhất. Bạn chỉ nên lắp pin nếu cần nguồn dự phòng khi mất điện hoặc muốn dùng điện mặt trời ban đêm.'
        },
        {
          q: 'Khi trời nhiều mây hoặc mùa mưa tại Campuchia thì hệ thống hoạt động thế nào?',
          a: 'Tấm pin vẫn tiếp tục sản xuất điện kể cả trong những ngày nhiều mây nhờ hấp thụ bức xạ ánh sáng khuếch tán, đạt khoảng 20–40% công suất danh định. Khi lượng điện mặt trời thiếu hụt, hệ thống sẽ tự động bù đắp từ lưới điện lực EDC.'
        },
        {
          q: 'Hệ thống hoạt động thế nào vào ban đêm?',
          a: 'Ban đêm tấm pin không tạo ra điện. Nếu dùng hệ thống On-Grid, tòa nhà sẽ tự động dùng điện lưới như bình thường. Nếu dùng hệ thống Hybrid có pin, tòa nhà sẽ xả lượng điện sạch đã tích lũy từ ban ngày để sử dụng.'
        },
        {
          q: 'Thời gian thi công lắp đặt mất bao lâu?',
          a: 'Với hộ gia đình và doanh nghiệp nhỏ (dưới 20 kWp), thời gian thi công tại chỗ chỉ mất 2 đến 4 ngày làm việc. Với các dự án công nghiệp lớn (100 kWp+), thời gian khoảng 2 đến 4 tuần.'
        },
        {
          q: 'Điện Mặt Trời có thể đấu nối vào hệ thống dây điện hiện tại của tôi không?',
          a: 'Hoàn toàn được. Kỹ sư của chúng tôi sẽ đấu nối biến tần trực tiếp vào tủ phân phối điện chính (MDB) của công trình mà không cần phải đục phá hay thay lại toàn bộ hệ thống dây điện hiện hữu.'
        },
        {
          q: 'Tấm pin mặt trời có tuổi thọ bao lâu?',
          a: 'Metfone Solar sử dụng tấm pin đơn tinh thể N-type Tier-1 có tuổi thọ vận hành từ 25 đến 30 năm, bảo hành sản phẩm 12 năm và bảo hành hiệu suất tuyến tính trên 80% trong 25 năm.'
        },
        {
          q: 'Pin lưu trữ LiFePO4 hiện đại dùng được bao lâu?',
          a: 'Pin LiFePO4 Grade-A đạt trên 6.000 chu kỳ nạp xả, tương đương với 10 đến 15 năm sử dụng hàng ngày trong điều kiện bảo quản tiêu chuẩn.'
        },
        {
          q: 'Kỹ sư Metfone có thể đến khảo sát tận nơi ở các tỉnh tại Campuchia không?',
          a: 'Có! Metfone có mạng lưới chi nhánh và đội ngũ kỹ thuật thường trực tại toàn bộ 25 tỉnh thành tại Campuchia. Chúng tôi hỗ trợ khảo sát kết cấu mái và phụ tải điện tận nơi.'
        },
        {
          q: 'Kết quả từ công cụ tính toán có chuẩn xác không?',
          a: 'Công cụ tính toán của chúng tôi sử dụng dữ liệu bức xạ mặt trời thực tế tại Campuchia (1.450 kWh/kWp/năm) và biểu giá điện lực EDC hiện hành. Kết quả mang tính định hướng rất tốt; đội ngũ kỹ thuật sẽ chốt số liệu chuẩn xác sau khi khảo sát thực địa.'
        },
        {
          q: 'Tôi có thể lắp đặt công suất nhỏ trước rồi mở rộng sau được không?',
          a: 'Hoàn toàn được. Chúng tôi thiết kế hệ thống theo dạng mô-đun với biến tần và tủ pin sẵn sàng cho việc mở rộng nâng cấp trong tương lai.'
        }
      ]
    },
    finalCta: {
      badge: 'Bắt Đầu Tiết Kiệm Ngay Hôm Nay',
      title: 'Sẵn Sàng Khám Phá Mức Tiết Kiệm Tiền Điện Cho Công Trình Của Bạn?',
      subtitle: 'Hãy cho chúng tôi biết mức tiền điện hàng tháng hoặc tải lên hóa đơn gần nhất. Đội ngũ kỹ sư Metfone Solar sẽ chuẩn bị đề xuất kỹ thuật và tài chính chi tiết nhất.',
      primaryBtn: 'Tính Toán Tiết Kiệm Ngay',
      secondaryBtn: 'Yêu Cầu Khảo Sát Mái Miễn Phí',
      expertBtn: 'Hotline Tư Vấn Metfone Solar: 1204 / 097 9 097 097'
    },
    footer: {
      tagline: 'Hạ tầng năng lượng thông minh và giải pháp Điện Mặt Trời chuẩn quốc tế tại Campuchia bởi Metfone.',
      officialHotlines: 'Kênh liên hệ chính thức Metfone:',
      hotline1: 'Đầu số ngắn: 1204 (Miễn phí cho thuê bao Metfone)',
      hotline2: 'Hotline: +855 97 9 097 097',
      headquarters: 'Tòa nhà Metfone, Số 199, Đại lộ Mao Tse Toung, Phường Toul Svay Prey II, Quận Boeng Keng Kang, Phnom Penh, Campuchia.',
      website: 'Website chính thức: metfone.com.kh',
      disclaimer: 'Lưu ý pháp lý: Số liệu sản lượng điện, tiền tiết kiệm và thời gian hoàn vốn là các ước tính kỹ thuật nhằm mục đích thông tin. Cấu hình thực tế phụ thuộc vào khảo sát chuyên sâu, kết cấu mái và dữ liệu phụ tải thực tế.',
      copyright: '© 2026 Metfone (Viettel Cambodia). Bản quyền được bảo lưu.'
    },
    proposalModal: {
      title: 'Nhận Bảng Đề Xuất Giải Pháp Solar Chính Thức',
      subtitle: 'Chúng tôi sẽ lập bản vẽ 3D bố trí tấm pin trên mái, danh mục thiết bị và bảng phân tích hoàn vốn ROI chi tiết dựa trên thông số của bạn.',
      summaryBoxTitle: 'Thông Số Hệ Thống Đã Tính Toán:',
      fullName: 'Họ và tên / Người liên hệ *',
      fullNamePlaceholder: 'VD: Nguyễn Văn A / Sokha Meng',
      phone: 'Số điện thoại (Telegram / WhatsApp) *',
      phonePlaceholder: 'VD: 097 123 4567',
      preferredChannel: 'Kênh liên hệ ưu tiên',
      email: 'Địa chỉ Email (Không bắt buộc)',
      emailPlaceholder: 'name@company.com.kh',
      province: 'Tỉnh / Thành phố tại Campuchia *',
      notes: 'Ghi chú thêm hoặc đặc điểm mái (Không bắt buộc)',
      notesPlaceholder: 'VD: Mái tôn xưởng 500m2, cần lắp trước tháng sau...',
      submitBtn: 'Gửi Yêu Cầu & Nhận Báo Giá',
      submitting: 'Đang tiếp nhận yêu cầu ưu tiên...',
      successTitle: 'Cảm Ơn Bạn! Yêu Cầu Đã Được Tiếp Nhận',
      successMessage: 'Chuyên viên Năng lượng Metfone Solar sẽ liên hệ với bạn trong vòng 2 giờ kèm theo đề xuất giải pháp sơ bộ và lịch hẹn khảo sát miễn phí.',
      refId: 'Mã số hồ sơ:',
      close: 'Đóng cửa sổ',
      directChat: 'Hoặc Chat Ngay Qua Telegram'
    }
  }
};
