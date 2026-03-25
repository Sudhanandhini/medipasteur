import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

/* ─── Product Data ─── */
const PRODUCTS = {
  gyne: {
    key: 'gyne',
    label: 'Gynaecology',
    color: '#4e897d',
    lightColor: '#eef6f4',
    tagColor: 'bg-teal-50 text-teal-700',
    description: 'Comprehensive women\'s health portfolio addressing the full lifecycle — from reproductive health and prenatal nutrition to menopausal management.',
    products: [
      { id: 1, name: 'OvaCycle Tablets', sku: 'MP-GY-001', category: 'PCOS Management', desc: 'Scientifically formulated with Myo-Inositol, D-Chiro-Inositol and phytoestrogens to restore hormonal balance, regulate menstrual cycles and improve insulin sensitivity in PCOS patients.', composition: 'Myo-Inositol 2g + D-Chiro-Inositol 50mg + Folic Acid 400mcg', pack: '30 Tablets/Strip', indication: 'PCOS, Irregular Periods, Hormonal Imbalance' },
      { id: 2, name: 'FemGuard Capsules', sku: 'MP-GY-002', category: 'Vaginal Health', desc: 'Probiotic-rich formula with Lactobacillus strains, cranberry extract and zinc for maintaining healthy vaginal flora, preventing recurrent UTIs and reducing discharge.', composition: 'Lactobacillus acidophilus 5B CFU + Cranberry Extract 200mg + Zinc 10mg', pack: '10 Capsules/Strip', indication: 'Vaginal Infections, Recurrent UTI, Dysbiosis' },
      { id: 3, name: 'GestaCare Syrup', sku: 'MP-GY-003', category: 'Prenatal Nutrition', desc: 'Iron-folic acid combination with DHA, B-complex and trace minerals developed for complete maternal and foetal nutrition from conception through lactation.', composition: 'Iron Polymaltose 100mg + Folic Acid 5mg + DHA 200mg + Vitamins B6/B12/C', pack: '200 mL Bottle', indication: 'Anaemia in Pregnancy, Prenatal Supplementation' },
      { id: 4, name: 'MenoPro Tablets', sku: 'MP-GY-004', category: 'Menopause Management', desc: 'Non-hormonal relief for perimenopausal symptoms using standardised red clover isoflavones, black cohosh and evening primrose oil for hot flashes, mood swings and sleep disturbances.', composition: 'Red Clover Isoflavones 40mg + Black Cohosh 20mg + Evening Primrose Oil 500mg', pack: '30 Tablets/Strip', indication: 'Menopause, Perimenopause, Hot Flashes' },
      { id: 5, name: 'FertiCare Soft Gels', sku: 'MP-GY-005', category: 'Fertility Support', desc: 'CoQ10-enriched antioxidant formula combining L-Carnitine, Vitamin E and selenium to improve oocyte quality, protect against oxidative stress and support implantation success.', composition: 'CoQ10 200mg + L-Carnitine 500mg + Vitamin E 400IU + Selenium 75mcg', pack: '30 Soft Gels/Strip', indication: 'Infertility, Poor Ovarian Reserve, IVF Support' },
    ]
  },
  ortho: {
    key: 'ortho',
    label: 'Orthopaedics',
    color: '#384a72',
    lightColor: '#eef1f8',
    tagColor: 'bg-blue-50 text-blue-700',
    description: 'Evidence-based orthopaedic formulations supporting bone density, joint mobility and muscle recovery for comprehensive musculoskeletal health.',
    products: [
      { id: 1, name: 'OsteoMax Tablets', sku: 'MP-OR-001', category: 'Bone Density', desc: 'High-bioavailability calcium carbonate paired with Vitamin D3 and K2-MK7 to enhance calcium absorption, direct it to bones and reduce fracture risk in osteoporosis patients.', composition: 'Calcium Carbonate 1250mg + Vitamin D3 1000IU + K2-MK7 90mcg', pack: '30 Tablets/Strip', indication: 'Osteoporosis, Osteopenia, Post-menopausal Calcium Deficiency' },
      { id: 2, name: 'FlexiJoint Gel', sku: 'MP-OR-002', category: 'Joint Pain Relief', desc: 'Diclofenac-based topical NSAID gel with methyl salicylate and linseed oil for fast-acting, targeted relief from arthritis, sports injuries and myalgia.', composition: 'Diclofenac Diethylamine 1.16% + Methyl Salicylate 10% + Linseed Oil 3%', pack: '50g Tube', indication: 'Osteoarthritis, Sports Injuries, Myalgia, Sprains' },
      { id: 3, name: 'CalciPlus Syrup', sku: 'MP-OR-003', category: 'Calcium Supplement', desc: 'Palatable syrup combining Calcium Gluconate with Vitamin D3 and zinc, ideal for paediatric patients, elderly and individuals with dysphagia requiring bone nourishment.', composition: 'Calcium Gluconate 115mg/5mL + Vitamin D3 400IU + Zinc Sulphate 10mg', pack: '200mL Bottle', indication: 'Calcium Deficiency, Rickets, Growth Supplementation' },
      { id: 4, name: 'ArthroEase Capsules', sku: 'MP-OR-004', category: 'Arthritis Management', desc: 'Disease-modifying nutraceutical combining Glucosamine, Chondroitin and Boswellia extract to rebuild cartilage matrix and reduce pro-inflammatory cytokines in OA patients.', composition: 'Glucosamine Sulphate 500mg + Chondroitin Sulphate 400mg + Boswellia 200mg', pack: '30 Capsules/Strip', indication: 'Osteoarthritis, Cartilage Degeneration, Joint Space Narrowing' },
    ]
  },
  gp: {
    key: 'gp',
    label: 'General Practice',
    color: '#d97706',
    lightColor: '#fef9f0',
    tagColor: 'bg-amber-50 text-amber-700',
    description: 'First-line therapeutic solutions for the most common outpatient conditions — robust, affordable and consistently prescribed by GPs across India.',
    products: [
      { id: 1, name: 'ImmunoShield Syrup', sku: 'MP-GP-001', category: 'Immunity', desc: 'Potent immunity-boosting syrup with Zinc, Vitamin C, Elderberry extract and Echinacea standardised extracts. Clinically shown to reduce frequency and severity of respiratory infections.', composition: 'Zinc Sulphate 20mg + Vitamin C 500mg + Elderberry Extract 150mg + Echinacea 100mg', pack: '200mL Bottle', indication: 'Recurrent Infections, Post-viral Recovery, Immunity Maintenance' },
      { id: 2, name: 'VitaMax Tablets', sku: 'MP-GP-002', category: 'Multivitamin', desc: 'Comprehensive A–Z multivitamin and mineral formula covering all essential micronutrients including B-complex, fat-soluble vitamins, iron, zinc and trace elements for daily nutritional insurance.', composition: 'Vitamin A–E, B-Complex, C + Iron 14mg + Zinc 8mg + Selenium + Chromium', pack: '30 Tablets/Strip', indication: 'Nutritional Deficiencies, General Debility, Convalescence' },
      { id: 3, name: 'CoughXpel Syrup', sku: 'MP-GP-003', category: 'Respiratory', desc: 'Triple-action cough formulation combining Ambroxol (mucolytic), Guaifenesin (expectorant) and Terbutaline (bronchodilator) for productive cough, bronchitis and URTI management.', composition: 'Ambroxol 15mg + Guaifenesin 100mg + Terbutaline 1.25mg per 5mL', pack: '100mL Bottle', indication: 'Productive Cough, Bronchitis, URTI, Asthma Adjuvant' },
      { id: 4, name: 'AcidGone Suspension', sku: 'MP-GP-004', category: 'GI Care', desc: 'Fast-acting antacid suspension combining Aluminium Hydroxide, Magnesium Hydroxide and Simethicone for rapid neutralisation of excess gastric acid and elimination of flatulence.', composition: 'Aluminium Hydroxide 250mg + Magnesium Hydroxide 250mg + Simethicone 50mg per 5mL', pack: '170mL Bottle', indication: 'Hyperacidity, GERD, Peptic Ulcer, Flatulence' },
    ]
  },
  dvd: {
    key: 'dvd',
    label: 'Dermatology (DVD)',
    color: '#be185d',
    lightColor: '#fdf2f8',
    tagColor: 'bg-pink-50 text-pink-700',
    description: 'Targeted dermatological therapeutics for the most prevalent skin conditions, formulated with dermatologist-approved actives.',
    subCategories: {
      'anti-acne': {
        label: 'Anti-Acne',
        products: [
          { id: 1, name: 'AcneClear Gel', sku: 'MP-DV-001', category: 'Anti-Acne', desc: 'Lightweight, non-comedogenic gel combining Salicylic Acid and Niacinamide to exfoliate pores, reduce sebum production and calm post-acne erythema.', composition: 'Salicylic Acid 2% + Niacinamide 4% + Allantoin 0.5%', pack: '30g Tube', indication: 'Acne Vulgaris, Comedones, Oily Skin' },
          { id: 2, name: 'PoreReset Face Wash', sku: 'MP-DV-002', category: 'Anti-Acne', desc: 'SLS-free foaming cleanser with Tea Tree Oil and Zinc PCA for deep cleansing of acne-prone skin without disrupting the skin barrier.', composition: 'Tea Tree Oil 0.5% + Zinc PCA 1% + Glycerin 5%', pack: '100mL Pump', indication: 'Oily/Acne-prone Skin, Enlarged Pores' },
        ]
      },
      'moisturizers': {
        label: 'Moisturizers',
        products: [
          { id: 3, name: 'HydraLock Cream', sku: 'MP-DV-003', category: 'Moisturizer', desc: 'Ceramide-enriched rich moisturiser with Hyaluronic Acid and Shea Butter for intensive hydration, barrier repair and relief of dry, sensitive or eczema-prone skin.', composition: 'Ceramides NP/AP/EOP 0.5% + Hyaluronic Acid 1% + Shea Butter 10%', pack: '50g Jar', indication: 'Dry Skin, Atopic Dermatitis, Barrier Dysfunction' },
          { id: 4, name: 'SoftSkin Body Lotion', sku: 'MP-DV-004', category: 'Moisturizer', desc: 'Urea-based body lotion with Lactic Acid and Glycerin for deep moisturisation of very dry, rough and flaky skin on the body, elbows and heels.', composition: 'Urea 10% + Lactic Acid 5% + Glycerin 10%', pack: '200mL Bottle', indication: 'Xerosis, Ichthyosis, Keratosis Pilaris' },
        ]
      },
      'anti-fungal': {
        label: 'Anti-Fungal',
        products: [
          { id: 5, name: 'FungiStop Cream', sku: 'MP-DV-005', category: 'Anti-Fungal', desc: 'Broad-spectrum antifungal cream combining Clotrimazole and Beclomethasone for rapid resolution of dermatophyte and candidal infections with anti-inflammatory relief.', composition: 'Clotrimazole 1% + Beclomethasone Dipropionate 0.025%', pack: '30g Tube', indication: 'Tinea Corporis, Tinea Cruris, Candidiasis' },
          { id: 6, name: 'TineaCure Solution', sku: 'MP-DV-006', category: 'Anti-Fungal', desc: 'Topical solution for scalp tinea and onychomycosis with Fluconazole and DMSO vehicle for enhanced nail and scalp penetration.', composition: 'Fluconazole 1% + DMSO 10% in Isopropyl Alcohol', pack: '30mL Bottle', indication: 'Tinea Capitis, Onychomycosis, Scalp Ringworm' },
        ]
      },
      'sun-protection': {
        label: 'Sun Protection',
        products: [
          { id: 7, name: 'SunGuard SPF50 Cream', sku: 'MP-DV-007', category: 'Sunscreen', desc: 'Broad-spectrum UVA/UVB protection with PA+++ rating. Combines physical (Zinc Oxide) and chemical (Octinoxate) filters in a lightweight, non-greasy, water-resistant base.', composition: 'Zinc Oxide 10% + Octinoxate 7.5% + Titanium Dioxide 5%', pack: '60g Tube', indication: 'Photoprotection, Hyperpigmentation, Post-procedure Care' },
          { id: 8, name: 'UVShield Gel SPF30', sku: 'MP-DV-008', category: 'Sunscreen', desc: 'Oil-free, matte-finish sunscreen gel for acne-prone and oily skin types with Oxybenzone, Octocrylene and niacinamide for daily UV defence without pore-clogging.', composition: 'Oxybenzone 4% + Octocrylene 7% + Niacinamide 2%', pack: '50g Tube', indication: 'Daily Sun Protection, Oily/Acne-prone Skin' },
        ]
      }
    }
  }
}

const CATEGORY_LIST = [
  { key: 'gyne', label: 'Gynaecology', icon: '♀' },
  { key: 'ortho', label: 'Orthopaedics', icon: '🦴' },
  { key: 'gp', label: 'General Practice', icon: '💊' },
  { key: 'dvd', label: 'Dermatology (DVD)', icon: '✦' },
]

/* ─── Product Card ─── */
function ProductCard({ product, color }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Top color bar */}
      <div className="h-1.5" style={{backgroundColor: color}}></div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{backgroundColor: color + '15', color}}>
            {product.category}
          </span>
          <span className="text-xs text-gray-400 font-mono">{product.sku}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{product.desc}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-xs font-semibold text-gray-500 w-24 flex-shrink-0">Composition</span>
            <span className="text-xs text-gray-700 leading-relaxed">{product.composition}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 w-24 flex-shrink-0">Pack Size</span>
            <span className="text-xs text-gray-700">{product.pack}</span>
          </div>
        </div>

        {open && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <span className="text-xs font-semibold text-gray-500">Indications: </span>
            <span className="text-xs text-gray-700">{product.indication}</span>
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={() => setOpen(!open)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all"
            style={{borderColor: color, color}}>
            {open ? 'Less Info' : 'More Info'}
          </button>
          <Link to="/contact"
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white text-center transition-all hover:opacity-90"
            style={{backgroundColor: color}}>
            Enquire
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const { category } = useParams()
  const [activeKey, setActiveKey] = useState(category || 'gyne')
  const [activeDvdSub, setActiveDvdSub] = useState('anti-acne')

  useEffect(() => {
    if (category && PRODUCTS[category]) setActiveKey(category)
  }, [category])

  const current = PRODUCTS[activeKey]

  return (
    <div className="pt-[72px]">
      {/* ─── Hero Banner ─── */}
      <section className="py-16" style={{background:'linear-gradient(135deg,#384a72,#253557)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Products</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">Product Catalogue</h1>
          <p className="text-white/65 text-lg max-w-2xl">Premium pharmaceutical formulations across four specialty divisions — each product backed by clinical evidence and manufactured to the highest GMP standards.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:flex lg:gap-8">

          {/* ─── Sidebar ─── */}
          <aside className="lg:w-64 flex-shrink-0 mb-8 lg:mb-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Categories</h3>
              </div>
              <div className="p-3">
                {CATEGORY_LIST.map(cat => (
                  <button key={cat.key}
                    onClick={() => { setActiveKey(cat.key); window.scrollTo({top:0,behavior:'smooth'}) }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left mb-1 ${activeKey===cat.key ? 'text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
                    style={activeKey===cat.key ? {backgroundColor: PRODUCTS[cat.key].color} : {}}>
                    <span className="text-base">{cat.icon}</span>
                    {cat.label}
                    {activeKey===cat.key && (
                      <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
                    )}
                  </button>
                ))}
              </div>

              {/* CTA in sidebar */}
              <div className="m-3 p-4 rounded-xl" style={{backgroundColor:'#384a72'}}>
                <p className="text-white/80 text-xs leading-relaxed mb-3">Need help choosing the right product?</p>
                <Link to="/contact" className="block text-center bg-white text-primary py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors">Talk to Our Expert</Link>
              </div>
            </div>
          </aside>

          {/* ─── Content Area ─── */}
          <div className="flex-1">
            {/* Category header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{backgroundColor: current.color + '15'}}>
                  {CATEGORY_LIST.find(c=>c.key===activeKey)?.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">{current.label}</h2>
                  <p className="text-sm text-gray-500">{current.products ? current.products.length : 'Multiple'} products available</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{current.description}</p>
              <div className="h-1 w-16 rounded-full mt-4" style={{backgroundColor: current.color}}></div>
            </div>

            {/* DVD Sub-category tabs */}
            {activeKey === 'dvd' && (
              <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-gray-100 rounded-2xl">
                {Object.entries(current.subCategories).map(([key, sub]) => (
                  <button key={key} onClick={() => setActiveDvdSub(key)}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${activeDvdSub===key ? 'bg-white text-pink-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                    {sub.label}
                  </button>
                ))}
              </div>
            )}

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {activeKey === 'dvd'
                ? current.subCategories[activeDvdSub].products.map(p => (
                    <ProductCard key={p.id} product={p} color={current.color}/>
                  ))
                : current.products.map(p => (
                    <ProductCard key={p.id} product={p} color={current.color}/>
                  ))
              }
            </div>

            {/* CTA below products */}
            <div className="mt-10 p-8 rounded-2xl border-2" style={{borderColor: current.color + '30', backgroundColor: current.lightColor}}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Looking for bulk orders or custom formulations?</h4>
                  <p className="text-sm text-gray-600">Our business development team is ready to assist with pricing, samples and distribution agreements.</p>
                </div>
                <Link to="/contact" className="flex-shrink-0 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-all"
                  style={{backgroundColor: current.color}}>
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
