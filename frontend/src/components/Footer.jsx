import { Link } from 'react-router-dom'
import { useState } from 'react'
import logofooter from "../assets/footer-icon.png"


const FooterLogo = () => (
  <div className="flex items-center gap-2.5">
    <img src={logofooter} />
   
  </div>
)

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer style={{backgroundColor:'#384a72'}} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <FooterLogo />
            <p className="mt-5 text-sm text-white/65 leading-relaxed">
              Empowering healthcare professionals with premium pharmaceutical products across gynaecology, orthopaedics, GP, and dermatology since 1989.
            </p>
            <div className="flex gap-3 mt-6">
              {/* LinkedIn */}
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              {/* Twitter */}
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-base mb-4">Quick Links</h4>
            <div className="w-8 h-0.5 mb-5" style={{backgroundColor:'#4e897d'}}></div>
            <ul className="space-y-3">
              {[{to:'/',l:'Home'},{to:'/about',l:'About Us'},{to:'/products',l:'Product Catalogue'},{to:'/career',l:'Career'},{to:'/contact',l:'Contact Us'}].map(x=>(
                <li key={x.to}>
                  <Link to={x.to} className="text-sm text-white/65 hover:text-white transition-colors hover:pl-1 inline-block duration-200">{x.l}</Link>
                </li>
              ))}
            </ul>
          </div>

            {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-base mb-4">Categories</h4>
            <div className="w-8 h-0.5 mb-5" style={{backgroundColor:'#4e897d'}}></div>
            <ul className="space-y-3">
              {[{to:'/products/gyne',l:'Gynaecology'},{to:'/products/ortho',l:'Orthopaedics'},{to:'/products/gp',l:'General Practice'},{to:'/products/dvd',l:'Dermatology'}].map(x=>(
                <li key={x.to}>
                  <Link to={x.to} className="text-sm text-white/65 hover:text-white transition-colors hover:pl-1 inline-block duration-200">{x.l}</Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Col 3: Contact */}
          <div>
            <h4 className="font-semibold text-white text-base mb-4">Contact Details</h4>
            <div className="w-8 h-0.5 mb-5" style={{backgroundColor:'#4e897d'}}></div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{color:'#4e897d'}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span className="text-sm text-white/65 leading-relaxed">123 Pharma Park, Sector 5,<br/>Bengaluru, Karnataka 560100</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 flex-shrink-0" style={{color:'#4e897d'}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <a href="tel:+918045678900" className="text-sm text-white/65 hover:text-white transition-colors">+91 (80) 4567 8900</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 flex-shrink-0" style={{color:'#4e897d'}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <a href="mailto:info@medipasteur.com" className="text-sm text-white/65 hover:text-white transition-colors">info@medipasteur.com</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          {/* <div>
            <h4 className="font-semibold text-white text-base mb-4">Stay Updated</h4>
            <div className="w-8 h-0.5 mb-5" style={{backgroundColor:'#4e897d'}}></div>
            <p className="text-sm text-white/65 mb-5 leading-relaxed">Subscribe for latest product launches, healthcare insights, and company news.</p>
            {subscribed ? (
              <div className="bg-secondary/20 border border-secondary/30 rounded-xl px-4 py-3 text-sm text-secondary-100">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-secondary focus:bg-white/15 transition-all"
                  required
                />
                <button type="submit" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors" style={{backgroundColor:'#4e897d'}}>
                  Join
                </button>
              </form>
            )}
            <div className="mt-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <span className="text-xs text-white/50">ISO 9001:2015 Certified</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/45">© 2025 MediPasteur Private Limited. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-white/45 hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/45 hover:text-white/70 transition-colors">Terms of Service</a>
           
          </div>
            <p className="text-xs text-white/45">Developed by
             <a href="https://www.sunsys.in" target="_blank"> Sunsys Technologies</a></p>
         
        </div>
      </div>
    </footer>
  )
}
