import React, { useState } from 'react';
import { Language } from '../types';
import { triggerHaptic } from '../utils/haptics';
import {
  Sparkles,
  Maximize2,
  X,
  MapPin,
  CheckCircle2,
  Zap,
  BatteryCharging,
  ShieldCheck,
  Building2,
  ArrowRight,
  PhoneCall,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import solarBatteryImg from '../assets/solar-battery-system.jpg';

interface CollectionsSectionProps {
  currentLang: Language;
  onRequestSurveyClick: () => void;
  onSelectSystem?: (systemTitle: string) => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1600&q=80';

export interface CollectionItem {
  id: string;
  category: 'villa' | 'hardware' | 'interior' | 'rooftop' | 'campaign';
  categoryLabelEn: string;
  categoryLabelKh: string;
  categoryLabelVi: string;
  titleEn: string;
  titleKh: string;
  titleVi: string;
  provinceEn: string;
  provinceKh: string;
  provinceVi: string;
  imageUrl: string;
  descriptionEn: string;
  descriptionKh: string;
  descriptionVi: string;
  specs: {
    labelEn: string;
    labelKh: string;
    labelVi: string;
    value: string;
  }[];
  isOfficialPoster?: boolean;
}

export const COLLECTIONS_DATA: CollectionItem[] = [
  {
    id: 'col-1-night-villa',
    category: 'villa',
    categoryLabelEn: 'Luxury Villa & Architecture',
    categoryLabelKh: 'វីឡាប្រណិត និងស្ថាបត្យកម្ម',
    categoryLabelVi: 'Biệt Thự Sang Trọng & Kiến Trúc',
    titleEn: 'Eco-Luxury Villa at Twilight — Sloped Rooftop Solar Array',
    titleKh: 'វីឡាប្រណិតអេកូឡូស៊ីពេលព្រលប់ • ដំបូលសូឡារួមបញ្ចូលគ្នា',
    titleVi: 'Biệt Thự Nghỉ Dưỡng Sinh Thái Hoàng Hôn — Điện Mặt Trời Áp Mái',
    provinceEn: 'Phnom Penh (Chroy Changvar)',
    provinceKh: 'រាជធានីភ្នំពេញ (ជ្រោយចង្វារ)',
    provinceVi: 'Phnôm Pênh (Chroy Changvar)',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    descriptionEn: 'Architectural integration of 15.5 kWp monocrystalline TOPCon solar panels into a contemporary luxury residence with illuminated infinity pool and warm interior living spaces.',
    descriptionKh: 'ការរចនារួមបញ្ចូលបន្ទះសូឡា TOPCon 15.5 kWp ជាមួយដំបូលវីឡាទំនើប ផ្តល់ថាមពលស្អាត ១០០% សម្រាប់ប្រព័ន្ធត្រជាក់ អាងហែលទឹក និងភ្លើងបំភ្លឺពេលយប់។',
    descriptionVi: 'Tích hợp 15.5 kWp tấm pin N-type TOPCon thẩm mỹ cao trên mái biệt thự cao cấp, cung cấp 100% điện năng cho điều hòa không khí, hồ bơi tràn bờ và hệ thống chiếu sáng.',
    specs: [
      { labelEn: 'Solar Capacity', labelKh: 'កម្លាំងដំឡើង', labelVi: 'Công suất', value: '15.5 kWp' },
      { labelEn: 'Storage Battery', labelKh: 'អាគុយស្ដុក', labelVi: 'Pin lưu trữ', value: '30 kWh LiFePO4' },
      { labelEn: 'Day & Night Offset', labelKh: 'ការសន្សំសំចៃ', labelVi: 'Mức bù tải', value: '100% Net-Zero' },
      { labelEn: 'Monthly Savings', labelKh: 'សន្សំក្នុង១ខែ', labelVi: 'Tiết kiệm/tháng', value: '~$820 / mo' }
    ]
  },
  {
    id: 'col-2-battery-inverter',
    category: 'hardware',
    categoryLabelEn: 'Inverters & Energy Storage',
    categoryLabelKh: 'អាំងវែរទ័រ និងប្រព័ន្ធអាគុយ',
    categoryLabelVi: 'Biến Tần & Pin Lưu Trữ Năng Lượng',
    titleEn: 'Metfone Smart Energy Hub — Hybrid Inverter & Modular Battery Tower',
    titleKh: 'ប្រព័ន្ធគ្រប់គ្រងថាមពលវៃឆ្លាត • អាំងវែរទ័រ Hybrid & ប៉មអាគុយ LiFePO4',
    titleVi: 'Trạm Năng Lượng Thông Minh Metfone — Biến Tần Hybrid & Pin Xếp Tầng',
    provinceEn: 'Kandal Province',
    provinceKh: 'ខេត្តកណ្ដាល',
    provinceVi: 'Tỉnh Kandal',
    imageUrl: solarBatteryImg,
    descriptionEn: 'Neat indoor technical wall featuring an intelligent hybrid solar inverter with digital telemetry LCD, paired with a multi-module LiFePO4 battery storage stack and certified circuit protection.',
    descriptionKh: 'ការដំឡើងប្រព័ន្ធអគ្គិសនីស្អាត និងមានសុវត្ថិភាពខ្ពស់ ជាមួយអាំងវែរទ័រ Hybrid អេក្រង់ឌីជីថល និងអាគុយម៉ូឌុល LiFePO4 ធានាភ្លើងប្រើប្រាស់មិនដាច់ ២៤/៧។',
    descriptionVi: 'Phòng kỹ thuật tiêu chuẩn cao gồm biến tần Hybrid màn hình LCD giám sát trực tiếp, kết nối tháp pin lưu trữ mô-đun LiFePO4 chống cháy nổ và cầu dao cách ly chuẩn quốc tế.',
    specs: [
      { labelEn: 'Inverter Rating', labelKh: 'កម្លាំងអាំងវែរទ័រ', labelVi: 'Công suất Inverter', value: '12 kW Hybrid' },
      { labelEn: 'Battery Module', labelKh: 'ម៉ូឌុលអាគុយ', labelVi: 'Dung lượng pin', value: '20 kWh Modular' },
      { labelEn: 'Switchover Time', labelKh: 'ល្បឿនប្តូរភ្លើង', labelVi: 'Thời gian chuyển mạch', value: '< 10 ms (UPS Grade)' },
      { labelEn: 'Cycle Life', labelKh: 'អាយុកាលសាក', labelVi: 'Chu kỳ nạp xả', value: '6,000+ Cycles (15 Yrs)' }
    ]
  },
  {
    id: 'col-3-sunlit-interior',
    category: 'interior',
    categoryLabelEn: 'Net-Zero Lifestyle',
    categoryLabelKh: 'ជីវិតរស់នៅបែបបៃតង',
    categoryLabelVi: 'Không Gian Sống Net-Zero',
    titleEn: 'Sun-Drenched Living Space — Powered 100% by Rooftop Photovoltaics',
    titleKh: 'ផ្ទៃខាងក្នុងវីឡាពន្លឺធម្មជាតិ • ប្រើប្រាស់ថាមពលសូឡា ១០០%',
    titleVi: 'Không Gian Sống Ngập Ánh Sáng — Vận Hành 100% Điện Mặt Trời',
    provinceEn: 'Siem Reap',
    provinceKh: 'ខេត្តសៀមរាប',
    provinceVi: 'Tỉnh Siem Reap',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    descriptionEn: 'Expansive living room with soaring floor-to-ceiling glass panoramic walls facing the pool terrace. High-power central air conditioning runs completely free on daytime solar yield.',
    descriptionKh: 'បន្ទប់ទទួលភ្ញៀវធំទូលាយជាមួយកញ្ចក់ទេសភាពបែប Panoramic ឆ្ពោះទៅអាងហែលទឹក។ ម៉ាស៊ីនត្រជាក់កម្លាំងខ្លាំងដំណើរការដោយឥតគិតថ្លៃពេញមួយថ្ងៃដោយថាមពលសូឡា។',
    descriptionVi: 'Phòng khách thông tầng với vách kính lớn hướng ra hồ bơi và rặng dừa. Toàn bộ hệ thống điều hòa công suất lớn hoạt động 100% từ nguồn điện mặt trời ban ngày mà không tốn tiền điện.',
    specs: [
      { labelEn: 'Daytime Solar Power', labelKh: 'ថាមពលថ្ងៃ', labelVi: 'Công suất ban ngày', value: '100% Self-Powered' },
      { labelEn: 'HVAC Load Offset', labelKh: 'កាត់បន្ថយម៉ាស៊ីនត្រជាក់', labelVi: 'Bù tải điều hòa', value: '100% Offset' },
      { labelEn: 'Peak Sun Region', labelKh: 'ម៉ោងថ្ងៃល្អបំផុត', labelVi: 'Giờ nắng đỉnh', value: '4.8 Hours/Day' },
      { labelEn: 'Comfort Level', labelKh: 'កម្រិតផាសុកភាព', labelVi: 'Mức tiện nghi', value: 'Zero Heat / Cost Worry' }
    ]
  },
  {
    id: 'col-4-rooftop-sunset',
    category: 'rooftop',
    categoryLabelEn: 'Commercial & Residential Roofing',
    categoryLabelKh: 'ដំបូលសូឡាជាក់ស្តែង',
    categoryLabelVi: 'Công Trình Áp Mái Thực Tế',
    titleEn: 'Rooftop Solar Array at Dusk — Field Engineering in Cambodia',
    titleKh: 'បន្ទះសូឡាលើដំបូលពេលថ្ងៃលិច • វិស្វកម្មដំឡើងជាក់ស្តែងនៅកម្ពុជា',
    titleVi: 'Dàn Pin Năng Lượng Hoàng Hôn — Công Trình Thực Tế Tại Campuchia',
    provinceEn: 'Kampong Speu',
    provinceKh: 'ខេត្តកំពង់ស្ពឺ',
    provinceVi: 'Tỉnh Kampong Speu',
    imageUrl: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1600&q=85',
    descriptionEn: 'A high-durability rooftop array mounted on metal framing over corrugated roofing at sunset. Designed for high tropical wind resistance and maximum sun exposure.',
    descriptionKh: 'ការដំឡើងបន្ទះសូឡាលើដំបូលដែក corrugated ធន់នឹងខ្យល់ព្យុះ និងកម្តៅត្រូពិច ផ្តល់ទិន្នផលអគ្គិសនីខ្ពស់បំផុតក្នុងគ្រប់រដូវកាល។',
    descriptionVi: 'Hệ thống tấm pin mặt trời lắp đặt trên khung giàn nhôm anodized chống ăn mòn trên mái tôn, chịu bão cấp cao và tối ưu hóa góc nghiêng hấp thụ quang năng tại Campuchia.',
    specs: [
      { labelEn: 'Array Capacity', labelKh: 'កម្លាំងបន្ទះសូឡា', labelVi: 'Công suất dàn pin', value: '30.0 kWp' },
      { labelEn: 'Mounting Structure', labelKh: 'គ្រោងឆ្អឹងដំឡើង', labelVi: 'Khung giàn', value: 'Anodized Aluminum' },
      { labelEn: 'Wind Resistance', labelKh: 'ភាពធន់នឹងខ្យល់', labelVi: 'Chịu gió bão', value: 'Up to 150 km/h' },
      { labelEn: 'Performance Warranty', labelKh: 'ការធានាទិន្នផល', labelVi: 'Bảo hành hiệu suất', value: '25 Years Linear' }
    ]
  },
  {
    id: 'col-5-official-poster',
    category: 'campaign',
    categoryLabelEn: 'Official Metfone Campaign',
    categoryLabelKh: 'យុទ្ធនាការផ្លូវការមិត្តហ្វូន',
    categoryLabelVi: 'Chiến Dịch Chính Thức Metfone',
    titleEn: 'Official Metfone Solar Campaign — "Power Your Home" (ផ្ដល់ថាមពលដល់ផ្ទះរបស់អ្នក)',
    titleKh: 'ផ្ដល់ថាមពលដល់ផ្ទះរបស់អ្នក • តម្លៃចាប់ពី $3,900 • ធានារយៈពេល ៥ ឆ្នាំ',
    titleVi: 'Chiến Dịch Metfone Solar — "Cung Cấp Năng Lượng Cho Ngôi Nhà Bạn" (Từ $3,900)',
    provinceEn: 'Nationwide (All 25 Provinces)',
    provinceKh: 'ទូទាំង ២៥ ខេត្ត-ក្រុង',
    provinceVi: 'Toàn quốc (25 Tỉnh thành)',
    imageUrl: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1600&q=85',
    descriptionEn: 'The nationwide Metfone Solar campaign: turnkey residential packages starting from $3,900 with 5-year full warranty, free professional site survey, top-tier inverters, and certified local technical teams.',
    descriptionKh: 'យុទ្ធនាការផ្លូវការរបស់ក្រុមហ៊ុនមិត្តហ្វូន សូឡា៖ កញ្ចប់ដំឡើងពេញលេញតម្លៃចាប់ពី $3,900 ជាមួយការធានារយៈពេល ៥ ឆ្នាំ ការពិគ្រោះយោបល់ឥតគិតថ្លៃ និងសេវាកម្មថែទាំទូទាំងប្រទេស។',
    descriptionVi: 'Poster chiến dịch chính thức của Metfone Solar: Gói trọn gói chỉ từ $3,900, bảo hành toàn diện 5 năm, miễn phí khảo sát mái tận nơi cùng đội ngũ kỹ thuật viên Viettel/Metfone trên khắp 25 tỉnh.',
    specs: [
      { labelEn: 'Starter Package', labelKh: 'តម្លៃកញ្ចប់ចាប់ផ្តើម', labelVi: 'Giá khởi điểm', value: '$3,900 Turnkey' },
      { labelEn: 'Warranty Period', labelKh: 'រយៈពេលធានា', labelVi: 'Thời gian bảo hành', value: '5 Years Comprehensive' },
      { labelEn: 'Site Survey', labelKh: 'ការចុះពិនិត្យទីតាំង', labelVi: 'Khảo sát tận nơi', value: '100% Free of Charge' },
      { labelEn: 'Coverage', labelKh: 'វិសាលភាពសេវាកម្ម', labelVi: 'Phạm vi phục vụ', value: 'All 25 Provinces' }
    ],
    isOfficialPoster: true
  }
];

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  currentLang,
  onRequestSurveyClick,
  onSelectSystem
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'villa' | 'hardware' | 'interior' | 'rooftop' | 'campaign'>('all');
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);

  const filteredItems = COLLECTIONS_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'villa':
        return currentLang === 'VI' ? 'Biệt Thự & Kiến Trúc' : currentLang === 'KH' ? 'វីឡាប្រណិត' : 'Villas & Architecture';
      case 'hardware':
        return currentLang === 'VI' ? 'Inverter & Pin Lưu Trữ' : currentLang === 'KH' ? 'អាំងវែរទ័រ & អាគុយ' : 'Inverters & Storage';
      case 'interior':
        return currentLang === 'VI' ? 'Không Gian Net-Zero' : currentLang === 'KH' ? 'ជីវិតបែបបៃតង' : 'Net-Zero Lifestyle';
      case 'rooftop':
        return currentLang === 'VI' ? 'Công Trình Áp Mái' : currentLang === 'KH' ? 'ដំបូលជាក់ស្តែង' : 'Field Installations';
      case 'campaign':
        return currentLang === 'VI' ? 'Chiến Dịch Metfone' : currentLang === 'KH' ? 'យុទ្ធនាការផ្លូវការ' : 'Official Campaigns';
      default:
        return cat;
    }
  };

  const getTitle = (item: CollectionItem) => {
    if (currentLang === 'VI') return item.titleVi;
    if (currentLang === 'KH') return item.titleKh;
    return item.titleEn;
  };

  const getDescription = (item: CollectionItem) => {
    if (currentLang === 'VI') return item.descriptionVi;
    if (currentLang === 'KH') return item.descriptionKh;
    return item.descriptionEn;
  };

  const getProvince = (item: CollectionItem) => {
    if (currentLang === 'VI') return item.provinceVi;
    if (currentLang === 'KH') return item.provinceKh;
    return item.provinceEn;
  };

  return (
    <section id="collections" className="py-20 sm:py-28 bg-[#F0EDE8] text-[#1A1A1A] relative overflow-hidden border-t border-[#1A1A1A]/10">
      {/* Editorial Decorative Ambient Accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#ED1C24]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C27803]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-[#1A1A1A]/10 pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1A1A1A]/10 text-[#ED1C24] text-xs font-bold uppercase tracking-widest font-mono shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#ED1C24]" />
              <span>METFONE SOLAR PORTFOLIO & VISUAL COLLECTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
              {currentLang === 'VI'
                ? 'Bộ Sưu Tập Công Trình & Chiến Dịch Thực Tế'
                : currentLang === 'KH'
                ? 'កម្រងរូបភាពគម្រោង និងយុទ្ធនាការផ្លូវការ'
                : currentLang === 'ZH'
                ? '实景工程案例与官方宣传系列'
                : 'Project Gallery & Official Campaign Collections'}
            </h2>
            <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
              {currentLang === 'VI'
                ? 'Chiêm ngưỡng các công trình biệt thự sinh thái cao cấp, hệ thống lưu trữ pin Lithium LiFePO4 và chiến dịch cung cấp năng lượng mặt trời chính thức từ $3,900 của Metfone tại Campuchia.'
                : currentLang === 'KH'
                ? 'ទស្សនាគម្រោងដំឡើងវីឡាប្រណិត ប្រព័ន្ធអាគុយស្ដុកថាមពលឆ្លាតវៃ និងផ្ទាំងផ្សព្វផ្សាយផ្លូវការកញ្ចប់សូឡាតម្លៃចាប់ពី $3,900 របស់មិត្តហ្វូន។'
                : 'Explore real-world luxury residential installations, high-voltage battery storage arrays, and official Metfone Solar campaign materials across Cambodia.'}
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#E7E3DC] p-1.5 rounded-2xl border border-[#1A1A1A]/10 text-xs font-semibold self-start md:self-auto">
            {[
              { id: 'all', label: currentLang === 'VI' ? 'Tất cả (5)' : currentLang === 'KH' ? 'ទាំងអស់ (៥)' : 'All Works (5)' },
              { id: 'villa', label: currentLang === 'VI' ? 'Biệt thự' : currentLang === 'KH' ? 'វីឡា' : 'Villas' },
              { id: 'hardware', label: currentLang === 'VI' ? 'Pin & Inverter' : currentLang === 'KH' ? 'អាគុយ & អាំងវែរទ័រ' : 'Hardware' },
              { id: 'campaign', label: currentLang === 'VI' ? 'Chiến dịch $3,900' : currentLang === 'KH' ? 'យុទ្ធនាការ $3,900' : 'Campaign $3,900' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  triggerHaptic('selection');
                  setActiveFilter(tab.id as any);
                }}
                className={`py-2 px-3.5 rounded-xl transition-all duration-150 ease-out cursor-pointer touch-manipulation active:scale-95 ${
                  activeFilter === tab.id
                    ? 'bg-white text-[#1A1A1A] shadow-xs font-bold'
                    : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Collections Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => {
            const isFeatured = item.isOfficialPoster || item.id === 'col-1-night-villa';
            return (
              <div
                key={item.id}
                onClick={() => {
                  triggerHaptic('selection');
                  setSelectedItem(item);
                }}
                className={`group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#1A1A1A]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Visual Image Container with Rich Overlays */}
                <div className="relative overflow-hidden bg-[#141413]">
                  {item.isOfficialPoster ? (
                    /* High-Fidelity Metfone Official Campaign Poster Card Representation */
                    <div className="relative w-full h-[360px] sm:h-[440px] bg-gradient-to-b from-[#ED1C24] via-[#0F172A] to-[#0A0F1D] text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                      {/* Background Solar House Visual */}
                      <img
                        src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80"
                        alt="Metfone Solar Cambodia Home"
                        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      {/* Header Branding */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#ED1C24] flex items-center justify-center font-black text-white text-base shadow-md border border-white/20">
                            M
                          </div>
                          <div>
                            <span className="font-extrabold text-lg sm:text-xl tracking-tight block">
                              metfone
                            </span>
                            <span className="text-[10px] text-white/80 uppercase font-mono tracking-widest block">
                              កាន់តែជិតស្និទ្ធ closer
                            </span>
                          </div>
                        </div>

                        <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-amber-300">
                          {getProvince(item)}
                        </span>
                      </div>

                      {/* Main Poster Headline in Khmer and Multilingual */}
                      <div className="relative z-10 max-w-xl my-4 space-y-2">
                        <div className="inline-block px-2.5 py-1 rounded-md bg-[#ED1C24] text-white font-mono text-[11px] font-extrabold tracking-wide uppercase">
                          យុទ្ធនាការពិសេស • CAMPAIGN
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow-md">
                          ផ្ដល់ថាមពលដល់ផ្ទះរបស់អ្នក
                        </h3>
                        <p className="text-xs sm:text-sm text-white/80 font-medium">
                          សន្សំសំចៃថ្លៃភ្លើង • ផ្ដល់ថាមពលកាន់តែប្រសើរ • រស់នៅកាន់តែវៃឆ្លាត
                        </p>
                      </div>

                      {/* Gold Starting Price Badge & Guarantee Strip */}
                      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/15 bg-black/40 backdrop-blur-md rounded-xl p-3 sm:p-4">
                        <div className="space-y-0.5">
                          <span className="text-[10px] sm:text-xs text-amber-300 font-bold uppercase font-mono block">
                            តម្លៃចាប់ពី • STARTING FROM
                          </span>
                          <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight drop-shadow-sm">
                            $3,900
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
                          <div className="flex items-center gap-1.5 text-white/90">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>ការធានា ៥ ឆ្នាំ</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-white/90">
                            <Zap className="w-4 h-4 text-amber-400" />
                            <span>ឥតគិតថ្លៃពិគ្រោះយោបល់</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Photography Showcase */
                    <div className="relative w-full h-[260px] sm:h-[320px]">
                      <img
                        src={item.imageUrl}
                        alt={getTitle(item)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/15">
                          {getCategoryLabel(item.category)}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[11px] font-bold shadow-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#ED1C24]" />
                          <span>{getProvince(item)}</span>
                        </span>
                      </div>

                      {/* Quick Hover Overlay Button */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="p-2.5 rounded-xl bg-white text-[#1A1A1A] shadow-md flex items-center gap-1.5 text-xs font-bold">
                          <Maximize2 className="w-3.5 h-3.5 text-[#ED1C24]" />
                          <span>View Detail</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Meta & Specs */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#1A1A1A] group-hover:text-[#ED1C24] transition-colors leading-snug">
                      {getTitle(item)}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1A1A1A]/70 line-clamp-2 leading-relaxed">
                      {getDescription(item)}
                    </p>
                  </div>

                  {/* Specs Quick Pills - 2 columns per card for clear, untruncated values */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#1A1A1A]/10 text-xs">
                    {item.specs.map((sp, sIdx) => (
                      <div key={sIdx} className="bg-[#F7F5F2] rounded-lg p-2 border border-[#1A1A1A]/5 flex flex-col justify-between">
                        <span className="text-[10px] text-[#1A1A1A]/60 block font-mono leading-tight">
                          {currentLang === 'VI' ? sp.labelVi : currentLang === 'KH' ? sp.labelKh : sp.labelEn}
                        </span>
                        <span className="font-extrabold text-[#1A1A1A] text-xs font-mono block mt-1 leading-snug">
                          {sp.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold pt-1 text-[#ED1C24]">
                    <span className="flex items-center gap-1 group-hover:underline">
                      <span>Explore Technical Profile & Survey</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[11px] font-mono text-[#1A1A1A]/50">
                      Metfone Verified ✓
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Lightbox / Detail Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1A1A1A]/10 bg-[#F7F5F2]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#ED1C24] text-white text-[11px] font-bold uppercase font-mono">
                  {getCategoryLabel(selectedItem.category)}
                </span>
                <span className="text-xs font-mono text-[#1A1A1A]/70 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ED1C24]" />
                  {getProvince(selectedItem)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#1A1A1A]/10 text-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6">
              {/* Full Image */}
              <div className="rounded-2xl overflow-hidden border border-[#1A1A1A]/10 relative bg-[#141413]">
                <img
                  src={selectedItem.imageUrl}
                  alt={getTitle(selectedItem)}
                  className="w-full max-h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                  {getTitle(selectedItem)}
                </h3>
                <p className="text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed">
                  {getDescription(selectedItem)}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="p-5 rounded-2xl bg-[#F7F5F2] border border-[#1A1A1A]/10 space-y-3">
                <div className="text-xs font-bold font-mono uppercase text-[#1A1A1A]/60 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#ED1C24]" />
                  <span>Engineering Specs & Performance Parameters</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedItem.specs.map((sp, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-[#1A1A1A]/10 shadow-2xs">
                      <span className="text-[11px] text-[#1A1A1A]/60 block font-mono">
                        {currentLang === 'VI' ? sp.labelVi : currentLang === 'KH' ? sp.labelKh : sp.labelEn}
                      </span>
                      <span className="text-base font-extrabold text-[#1A1A1A] font-mono block mt-1">
                        {sp.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedItem(null);
                    if (onSelectSystem) {
                      onSelectSystem(getTitle(selectedItem));
                    }
                    onRequestSurveyClick();
                  }}
                  className="flex-1 bg-[#ED1C24] hover:bg-[#D01820] text-white font-bold py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {currentLang === 'VI'
                      ? 'Yêu Cầu Khảo Sát & Báo Giá Tương Tự'
                      : currentLang === 'KH'
                      ? 'ស្នើសុំការពិនិត្យទីតាំង និងគម្រោងស្រដៀងគ្នានេះ'
                      : 'Request Similar Turnkey Solution & Site Survey'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="bg-[#EFECE6] hover:bg-[#E5E0D8] text-[#1A1A1A] font-bold py-3.5 px-6 rounded-xl border border-[#1A1A1A]/10 transition-colors cursor-pointer"
                >
                  {currentLang === 'VI' ? 'Đóng' : currentLang === 'KH' ? 'បិទ' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
