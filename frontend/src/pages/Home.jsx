import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ban1 from "../assets/ban1.jpg"
import ban2 from "../assets/ban2.jpg"
import ban3 from "../assets/ban3.jpg"

/* ─── Animated Counter ─── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const observed = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !observed.current) {
        observed.current = true
        let start = 0
        const step = target / 60
        const timer = setInterval(() => {
          start = Math.min(start + step, target)
          setCount(Math.floor(start))
          if (start >= target) clearInterval(timer)
        }, 20)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Stats ─── */
const stats = [
  { icon: '🏆', value: 35, suffix: '+', label: 'Years of Expertise' },
  { icon: '💊', value: 500, suffix: '+', label: 'Products in Catalogue' },
  { icon: '🏥', value: 2000, suffix: '+', label: 'Trusted Institutions' },
  { icon: '✅', value: null, label: 'ISO 9001 Certified', badge: 'ISO 9001' },
]

/* ─── Categories ─── */
const categories = [
  {
    to: '/products/gyne',
    color: '#f0f7f6',
    border: '#4e897d',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#4e897d" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 2.97 1.7 5.53 4.17 6.8L8 21h2l.5-2h3l.5 2h2l-1.17-5.2C17.3 14.53 19 11.97 19 9c0-3.87-3.13-7-7-7z"/>
      </svg>
    ),
    title: 'Gynaecology',
    desc: 'Comprehensive women\'s health solutions — from PCOS management and prenatal care to menopause relief and fertility support.',
    count: '5 Products',
  },
  {
    to: '/products/ortho',
    color: '#f0f3f9',
    border: '#384a72',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#384a72" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v11m0 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3h3zm6-2v8m0 0c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3h-3z"/>
      </svg>
    ),
    title: 'Orthopaedics',
    desc: 'Advanced bone, joint and muscle health formulations including calcium supplements, anti-inflammatory gels and mobility enhancers.',
    count: '4 Products',
  },
  {
    to: '/products/gp',
    color: '#fef9f0',
    border: '#d97706',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
      </svg>
    ),
    title: 'General Practice',
    desc: 'Trusted first-line therapies for everyday ailments — immunity boosters, antacids, cough & cold, and broad-spectrum vitamins.',
    count: '4 Products',
  },
  {
    to: '/products/dvd',
    color: '#fdf2f8',
    border: '#be185d',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#be185d" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 3a4 4 0 014-4 4 4 0 014 4M3 12a9 9 0 0118 0c0 4.97-4.03 9-9 9S3 16.97 3 12z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01"/>
      </svg>
    ),
    title: 'Dermatology (DVD)',
    desc: 'Targeted skin-care therapeutics covering anti-acne, deep moisturisation, anti-fungal treatments and broad-spectrum sun protection.',
    count: '4 Categories',
  },
]

/* ─── Featured Products ─── */
const featured = [
  { cat: 'Gynaecology', tag: 'gyne', name: 'OvaCycle Tablets', sku: 'MP-GY-001', desc: 'Hormonal balance & PCOS management with natural phytoestrogens and inositol complex.', color: '#4e897d' },
  { cat: 'Orthopaedics', tag: 'ortho', name: 'OsteoMax Tablets', sku: 'MP-OR-001', desc: 'High-absorption calcium carbonate with Vitamin D3 & K2 for optimal bone mineralisation.', color: '#384a72' },
  { cat: 'General Practice', tag: 'gp', name: 'ImmunoShield Syrup', sku: 'MP-GP-001', desc: 'Zinc, Vitamin C and elderberry extract for robust immune system support.', color: '#d97706' },
  { cat: 'Dermatology', tag: 'dvd', name: 'AcneClear Gel', sku: 'MP-DV-001', desc: 'Salicylic acid & niacinamide formulation for effective acne reduction and pore refinement.', color: '#be185d' },
]

/* ─── Services ─── */
const services = [
  { icon: '🔬', title: 'Clinical Research Support', desc: 'Data sheets, clinical evidence and PMS support for every product.' },
  { icon: '🚚', title: 'Pan-India Delivery', desc: 'Temperature-controlled logistics to 500+ cities within 48–72 hours.' },
  { icon: '📞', title: 'MR Field Support', desc: 'Dedicated medical representatives for on-ground doctor relationship building.' },
  { icon: '📋', title: 'Regulatory Compliance', desc: 'All products licensed under CDSCO with GMP-certified manufacturing.' },
]

/* ─── Testimonials ─── */
const testimonials = [
  { name: 'Dr. Rekha Sharma', title: 'Senior Gynaecologist, Apollo Hospitals', text: 'MediPasteur\'s OvaCycle has become my first-choice prescription for PCOS patients. Consistent quality and excellent patient compliance.', stars: 5 },
  { name: 'Dr. Arun Kumar', title: 'Orthopaedic Surgeon, Manipal Hospital', text: 'The OsteoMax range delivers noticeable outcomes for my post-surgical patients. Reliable supply chain and prompt support from the MR team.', stars: 5 },
  { name: 'Dr. Priya Nair', title: 'Dermatologist, Fortis Healthcare', text: 'AcneClear Gel has transformed the way I manage acne patients. The niacinamide formulation is gentle yet highly effective — my patients love the results.', stars: 5 },
  { name: 'Dr. Sanjay Mehta', title: 'General Physician, Narayana Health', text: 'ImmunoShield Syrup is now a staple in my practice for post-viral recovery. The zinc and elderberry combination delivers reliable immune support every season.', stars: 5 },
]

const institutions = ['Apollo Hospitals', 'Fortis Healthcare', 'Manipal Hospital', 'Narayana Health', 'AIIMS']

const heroSlides = [ban1, ban2, ban3]

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const goTo = (idx) => {
    setCurrent(idx)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % heroSlides.length), 4000)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % heroSlides.length), 4000)
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <div className="relative w-full h-[520px] rounded-2xl shadow-2xl overflow-hidden">
      {/* Slides */}
      {heroSlides.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`MediPasteur slide ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Prev / Next arrows */}
      <button
        onClick={() => goTo((current - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#1e2d4a" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % heroSlides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#1e2d4a" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              backgroundColor: i === current ? '#4e897d' : 'rgba(255,255,255,0.6)',
            }}
          />
        ))}
      </div>

      {/* Floating badge */}
      <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-xl px-5 py-3.5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor:'#4e897d'}}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <div>
          <div className="text-sm font-bold" style={{color:'#1e2d4a'}}>ISO 9001:2015</div>
          <div className="text-xs text-gray-500">Certified Quality</div>
        </div>
      </div>

      {/* Floating stat */}
      <div className="absolute top-4 right-4 bg-white rounded-xl shadow-xl px-5 py-3.5 text-center">
        <div className="text-2xl font-bold" style={{color:'#384a72'}}>500+</div>
        <div className="text-xs text-gray-500 font-medium">Products</div>
      </div>
    </div>
  )
}

/* ─── Testimonial Slider ─── */
function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const total = testimonials.length

  const goTo = (idx) => {
    setCurrent(idx)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % total), 4000)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % total), 4000)
    return () => clearInterval(timerRef.current)
  }, [])

  const StarIcon = () => (
    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  )

  const t = testimonials[current]

  return (
    <div className="relative">
      {/* Card */}
      <div className="relative overflow-hidden">
        <div
          className="transition-all duration-500 ease-in-out"
          key={current}
        >
          <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-md max-w-3xl mx-auto text-center">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array(t.stars).fill(0).map((_, j) => <StarIcon key={j} />)}
            </div>

            {/* Quote */}
            <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-8">
              "{t.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{backgroundColor:'#384a72'}}>
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{t.name}</div>
                <div className="text-sm text-gray-500">{t.title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => goTo((current - 1 + total) % total)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#384a72" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % total)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#384a72" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              backgroundColor: i === current ? '#4e897d' : '#d1d5db',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="pt-[72px]">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{background:'linear-gradient(135deg,#e8edf8 0%,#f0f4fa 55%,#dce5f2 100%)'}}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#384a72" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
        {/* Glowing orbs */}
        <div className="absolute top-20 right-[10%] w-96 h-96 rounded-full opacity-20 blur-3xl" style={{background:'radial-gradient(circle,#4e897d,transparent)'}}></div>
        <div className="absolute bottom-10 left-[5%] w-72 h-72 rounded-full opacity-15 blur-3xl" style={{background:'radial-gradient(circle,#384a72,transparent)'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: Content ── */}
            <div>
              <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-8" style={{backgroundColor:'#384a72', borderColor:'#384a72'}}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{backgroundColor:'#4e897d'}}></span>
                <span className="text-xs font-semibold tracking-widest uppercase text-white/80">Established 1989 · Celebrating 35 Years</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6" style={{color:'#1e2d4a'}}>
                Advancing<br/>
                <span style={{color:'#4e897d'}}>Healthcare</span><br/>
                Across India
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed max-w-xl mb-10" style={{color:'#4a5568'}}>
                Premium pharmaceutical formulations in gynaecology, orthopaedics, general practice and dermatology — trusted by 2,000+ institutions nationwide.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:-translate-y-0.5" style={{backgroundColor:'#4e897d'}}>
                  Explore Products
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </Link>
                <Link to="/contact" className="flex items-center gap-2 border-2 font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:bg-primary/5" style={{borderColor:'#384a72', color:'#384a72'}}>
                  Contact Sales
                </Link>
              </div>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-8 mt-14 pt-10" style={{borderTop:'1px solid #c5d0e8'}}>
                {[['35+','Years'], ['500+','Products'], ['2000+','Doctors'], ['ISO 9001','Certified']].map(([v,l]) => (
                  <div key={l}>
                    <div className="text-2xl font-bold" style={{color:'#1e2d4a'}}>{v}</div>
                    <div className="text-xs font-medium uppercase tracking-wider mt-0.5" style={{color:'#6b7280'}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Image Slider ── */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full">
                <HeroSlider />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-x-0 lg:divide-x divide-gray-200">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-2xl mb-3">{s.icon}</div>
                <div className="text-3xl font-extrabold text-primary">
                  {s.badge ? s.badge : <Counter target={s.value} suffix={s.suffix}/>}
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCT CATEGORIES ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-badge">Our Product Range</span>
            <h2 className="mt-4 text-4xl font-extrabold text-gray-900">Comprehensive Healthcare Solutions</h2>
            <div className="mx-auto mt-4 w-16 h-1 rounded-full" style={{backgroundColor:'#4e897d'}}></div>
            <p className="mt-5 text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Browse our curated range of high-quality pharmaceutical products designed to meet the rigorous demands of modern clinical practice.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(c => (
              <Link to={c.to} key={c.to}
                className="group bg-white rounded-2xl border-2 p-7 card-hover flex flex-col"
                style={{borderColor: c.border + '30', backgroundColor: c.color + '80'}}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{backgroundColor: c.border + '15'}}>
                  {c.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{c.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{backgroundColor: c.border + '15', color: c.border}}>{c.count}</span>
                  <span className="text-sm font-semibold transition-colors group-hover:translate-x-1 inline-block duration-200" style={{color: c.border}}>
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="section-badge">Best Sellers</span>
              <h2 className="mt-4 text-4xl font-extrabold text-gray-900">Flagship Products</h2>
              <p className="mt-3 text-gray-500">Our most prescribed formulations across all specialties.</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-2 border-2 border-primary text-primary px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all">
              View All Products
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(p => (
              <div key={p.sku} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover group">
                {/* Image placeholder */}
                <div className="h-44 flex items-center justify-center" style={{background:`linear-gradient(135deg,${p.color}15,${p.color}30)`}}>
                  <div className="text-5xl opacity-60">💊</div>
                  <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{backgroundColor: p.color}}>{p.cat}</span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 font-mono mb-1">{p.sku}</p>
                  <h4 className="font-bold text-gray-900 mb-2 text-base">{p.name}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{p.desc}</p>
                  <Link to={`/products/${p.tag}`}
                    className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-white py-2.5 rounded-xl transition-all hover:opacity-90"
                    style={{backgroundColor: p.color}}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/products" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* ─── SERVICES / WHY US ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <span className="section-badge">Why MediPasteur</span>
              <h2 className="mt-4 text-4xl font-extrabold text-gray-900 leading-tight">
                Complete Support for<br/>
                <span style={{color:'#384a72'}}>Your Practice</span>
              </h2>
              <p className="mt-5 text-gray-500 leading-relaxed">
                Beyond our product catalogue, MediPasteur provides end-to-end support — from field representatives to regulatory documentation — ensuring seamless integration into your clinical workflow.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {services.map(s => (
                  <div key={s.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{backgroundColor:'#4e897d20'}}>
                      {s.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{s.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="mt-8 btn-primary inline-flex">
                Learn More About Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* Right: visual card */}
            <div className="mt-14 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl rotate-2 opacity-20" style={{background:'linear-gradient(135deg,#4e897d,#384a72)'}}></div>
                <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-white p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-secondary-50 border border-secondary-100 rounded-full px-4 py-1.5">
                      <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Quality Assurance</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'GMP Certified Manufacturing', icon: '🏭', done: true },
                      { label: 'CDSCO Licensed Products', icon: '📜', done: true },
                      { label: 'Cold-Chain Logistics', icon: '❄️', done: true },
                      { label: 'Batch-level QC Reports', icon: '🔬', done: true },
                      { label: 'Pharmacovigilance Support', icon: '🛡️', done: true },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <span className="text-xl">{item.icon}</span>
                        <span className="flex-1 text-sm font-medium text-gray-700">{item.label}</span>
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white" style={{backgroundColor:'#4e897d'}}>✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">Trusted by Leading Institutions</h2>
            <p className="mt-3 text-gray-500">Hear from the medical professionals who rely on MediPasteur every day.</p>
          </div>

          {/* Institution logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-14">
            {institutions.map(inst => (
              <span key={inst} className="text-sm font-bold text-gray-300 hover:text-gray-500 transition-colors cursor-default tracking-widest uppercase">{inst}</span>
            ))}
          </div>

          {/* Testimonial Slider */}
          <TestimonialSlider />
        </div>
      </section>

      {/* ─── CTA STRIP ─── */}
      <section className="py-20" style={{background:'linear-gradient(135deg,#384a72,#253557)'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">Ready to Partner with MediPasteur?</h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Connect with our sales team to discuss bulk orders, distribution partnerships or clinical queries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:opacity-90" style={{backgroundColor:'#4e897d'}}>
              Contact Sales Team
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/products" className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all">
              View Full Catalogue
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
