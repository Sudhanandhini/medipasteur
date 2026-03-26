import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ban from '../assets/ban.jpg'

/* ─── Category Meta (colors, descriptions — not product data) ─── */
const CATEGORY_META = {
  gyne: {
    label: 'Gynaecology',
    icon: '♀',
    color: '#4e897d',
    lightColor: '#eef6f4',
    description: "Comprehensive women's health portfolio addressing the full lifecycle — from reproductive health and prenatal nutrition to menopausal management.",
  },
  ortho: {
    label: 'Orthopaedics',
    icon: '🦴',
    color: '#384a72',
    lightColor: '#eef1f8',
    description: 'Evidence-based orthopaedic formulations supporting bone density, joint mobility and muscle recovery for comprehensive musculoskeletal health.',
  },
  gp: {
    label: 'General Practice',
    icon: '💊',
    color: '#d97706',
    lightColor: '#fef9f0',
    description: 'First-line therapeutic solutions for the most common outpatient conditions — robust, affordable and consistently prescribed by GPs across India.',
  },
  dvd: {
    label: 'Dermatology (DVD)',
    icon: '✦',
    color: '#be185d',
    lightColor: '#fdf2f8',
    description: 'Targeted dermatological therapeutics for the most prevalent skin conditions, formulated with dermatologist-approved actives.',
  },
  ent: {
    label: 'ENT',
    icon: '👂',
    color: '#0e7490',
    lightColor: '#ecfeff',
    description: 'Ear, nose and throat therapeutic range — nasal decongestants, ear drops, throat antiseptics and antihistamines for ENT specialists.',
  },
  surgeon: {
    label: 'Surgeon',
    icon: '🔬',
    color: '#7c3aed',
    lightColor: '#f5f3ff',
    description: 'Surgical support formulations including wound care, anti-infectives, analgesics and post-operative nutritional supplements.',
  },
}

const CATEGORY_LIST = ['gyne', 'ortho', 'gp', 'dvd', 'ent', 'surgeon']

/* ─── Product Card ─── */
function ProductCard({ product, color }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="h-1.5" style={{ backgroundColor: color }}></div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: color + '15', color }}>
            {product.sub_category}
          </span>
          <span className="text-xs text-gray-400 font-mono">{product.sku}</span>
        </div>

        {product.image && (
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
        )}

        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{product.description}</p>

        <div className="space-y-2 mb-4">
          {product.composition && (
            <div className="flex items-start gap-2">
              <span className="text-xs font-semibold text-gray-500 w-24 flex-shrink-0">Composition</span>
              <span className="text-xs text-gray-700 leading-relaxed">{product.composition}</span>
            </div>
          )}
          {product.pack_size && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 w-24 flex-shrink-0">Pack Size</span>
              <span className="text-xs text-gray-700">{product.pack_size}</span>
            </div>
          )}
        </div>

        {open && (
          <div className="mb-4 space-y-2">
            {product.indication && (
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-xs font-semibold text-gray-500">Indications: </span>
                <span className="text-xs text-gray-700">{product.indication}</span>
              </div>
            )}
            {product.specification && (
              <div className="p-3 rounded-xl border" style={{ borderColor: color + '30', backgroundColor: color + '08' }}>
                <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Specification</p>
                <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">{product.specification}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setOpen(!open)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all"
            style={{ borderColor: color, color }}
          >
            {open ? 'Less Info' : 'More Info'}
          </button>
          <Link
            to="/contact"
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white text-center transition-all hover:opacity-90"
            style={{ backgroundColor: color }}
          >
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
  const [activeDvdSub, setActiveDvdSub] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (category && CATEGORY_META[category]) setActiveKey(category)
  }, [category])

  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.VITE_API_URL}/api/products/category/${activeKey}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : [])
        setLoading(false)
        // Set default dvd sub tab
        if (activeKey === 'dvd' && data.length > 0) {
          setActiveDvdSub(data[0].sub_category || '')
        }
      })
      .catch(() => { setProducts([]); setLoading(false) })
  }, [activeKey])

  const current = CATEGORY_META[activeKey]

  // For DVD: get unique sub-categories
  const dvdSubs = activeKey === 'dvd'
    ? [...new Set(products.map(p => p.sub_category).filter(Boolean))]
    : []

  const displayProducts = activeKey === 'dvd'
    ? products.filter(p => p.sub_category === activeDvdSub)
    : products

  return (
    <div className="pt-[72px]">
      {/* Hero Banner */}
      <section className="py-16" style={{backgroundImage: `
      linear-gradient(135deg, rgba(80, 80, 80, 0.85), rgba(80, 80, 80, 0.85)),
      url(${ban})
    `, backgroundPosition:'center', backgroundRepeat:'no-repeat', }}
>
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

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0 mb-8 lg:mb-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Categories</h3>
              </div>
              <div className="p-3">
                {CATEGORY_LIST.map(key => {
                  const cat = CATEGORY_META[key]
                  return (
                    <button key={key}
                      onClick={() => { setActiveKey(key); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left mb-1 ${activeKey === key ? 'text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
                      style={activeKey === key ? { backgroundColor: cat.color } : {}}>
                      <span className="text-base">{cat.icon}</span>
                      {cat.label}
                      {activeKey === key && (
                        <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="m-3 p-4 rounded-xl" style={{ backgroundColor: '#384a72' }}>
                <p className="text-white/80 text-xs leading-relaxed mb-3">Need help choosing the right product?</p>
                <Link to="/contact" className="block text-center bg-white text-primary py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors">Talk to Our Expert</Link>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: current.color + '15' }}>
                  {current.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">{current.label}</h2>
                  <p className="text-sm text-gray-500">{products.length} products available</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{current.description}</p>
              <div className="h-1 w-16 rounded-full mt-4" style={{ backgroundColor: current.color }}></div>
            </div>

            {/* DVD Sub-category tabs */}
            {activeKey === 'dvd' && dvdSubs.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-gray-100 rounded-2xl">
                {dvdSubs.map(sub => (
                  <button key={sub} onClick={() => setActiveDvdSub(sub)}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${activeDvdSub === sub ? 'bg-white text-pink-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                    {sub}
                  </button>
                ))}
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-20 text-gray-400">Loading...</div>
            ) : displayProducts.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No products found.</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {displayProducts.map(p => (
                  <ProductCard key={p.id} product={p} color={current.color} />
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 p-8 rounded-2xl border-2" style={{ borderColor: current.color + '30', backgroundColor: current.lightColor }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Looking for bulk orders or custom formulations?</h4>
                  <p className="text-sm text-gray-600">Our business development team is ready to assist with pricing, samples and distribution agreements.</p>
                </div>
                <Link to="/contact" className="flex-shrink-0 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-all"
                  style={{ backgroundColor: current.color }}>
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
