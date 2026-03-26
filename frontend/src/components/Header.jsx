import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from "../assets/logo.png"

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 group">
   
    <div className="leading-none">
      <img src={logo} alt="logo" width="200px" />
    </div>
  </Link>
)

const productCategories = [
  { label: 'Gynaecology', to: '/products/gyne', icon: '♀', desc: 'Women\'s health range' },
  { label: 'Orthopaedics', to: '/products/ortho', icon: '🦴', desc: 'Bone & joint care' },
  { label: 'General Practice', to: '/products/gp', icon: '💊', desc: 'Broad-spectrum range' },
  { label: 'Dermatology (DVD)', to: '/products/dvd', icon: '✦', desc: '4 skin care categories' },
  { label: 'ENT', to: '/products/ent', icon: '👂', desc: 'Ear, nose & throat care' },
  { label: 'Surgeon', to: '/products/surgeon', icon: '🔬', desc: 'Surgical support range' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const timerRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  const openDropdown = () => { clearTimeout(timerRef.current); setDropdownOpen(true) }
  const closeDropdown = () => { timerRef.current = setTimeout(() => setDropdownOpen(false), 150) }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white backdrop-blur-sm py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <NavLink to="/" className={({isActive})=>`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive?'text-primary bg-primary-50':'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>Home</NavLink>
            <NavLink to="/about" className={({isActive})=>`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive?'text-primary bg-primary-50':'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>About</NavLink>

            {/* Products dropdown */}
            <div className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              <NavLink to="/products" className={({isActive})=>`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive?'text-primary bg-primary-50':'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>
                Products
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen?'rotate-180':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </NavLink>
              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[540px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50">
                  <div className="grid grid-cols-2 gap-1">
                    {productCategories.map(c => (
                      <Link key={c.to} to={c.to} className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary-50 group transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-secondary-50 flex items-center justify-center text-base flex-shrink-0 group-hover:bg-secondary transition-colors">
                          {c.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-800 group-hover:text-primary">{c.label}</div>
                          <div className="text-xs text-gray-500">{c.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/career" className={({isActive})=>`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive?'text-primary bg-primary-50':'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>Career</NavLink>
            <NavLink to="/contact" className={({isActive})=>`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive?'text-primary bg-primary-50':'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>Contact</NavLink>
          </nav>

          <div className="hidden lg:flex">
            <Link to="/contact" className="bg-secondary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary-600 transition-colors shadow-sm">
              Get a Quote
            </Link>
          </div>

          {/* Hamburger */}
          <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 pb-4 border-t border-gray-100">
            <div className="pt-3 space-y-1">
              {[{to:'/',l:'Home'},{to:'/about',l:'About'}].map(x=>(
                <NavLink key={x.to} to={x.to} className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors">{x.l}</NavLink>
              ))}
              <button onClick={()=>setMobileProductsOpen(!mobileProductsOpen)} className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors">
                Products
                <svg className={`w-4 h-4 transition-transform ${mobileProductsOpen?'rotate-180':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {mobileProductsOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-secondary-100 pl-3">
                  {productCategories.map(c=>(
                    <Link key={c.to} to={c.to} className="block px-3 py-2 text-sm text-gray-600 hover:text-primary font-medium">{c.icon} {c.label}</Link>
                  ))}
                </div>
              )}
              {[{to:'/career',l:'Career'},{to:'/contact',l:'Contact'}].map(x=>(
                <NavLink key={x.to} to={x.to} className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors">{x.l}</NavLink>
              ))}
              <div className="pt-2 px-4">
                <Link to="/contact" className="block text-center bg-secondary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary-600 transition-colors">Get a Quote</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
