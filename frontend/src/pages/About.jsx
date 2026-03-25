import { Link } from 'react-router-dom'

const timeline = [
  { year: '1989', title: 'Founded in Bengaluru', desc: 'MediPasteur established as a small pharmaceutical distribution firm serving Karnataka hospitals.' },
  { year: '1996', title: 'Manufacturing Licence', desc: 'Obtained CDSCO manufacturing licence and launched first in-house gynaecology range.' },
  { year: '2003', title: 'Pan-India Expansion', desc: 'Expanded distribution network to 18 states with a field force of 200+ medical representatives.' },
  { year: '2010', title: 'ISO 9001 Certification', desc: 'Achieved ISO 9001:2008 certification, establishing rigorous quality management systems.' },
  { year: '2018', title: 'Dermatology Division Launch', desc: 'Launched the DVD (Dermatology) division with 8 targeted skin-care therapeutic products.' },
  { year: '2024', title: 'Celebrating 35 Years', desc: 'Operating across 25 states with 500+ products and 2,000+ institutional clients nationwide.' },
]

const values = [
  { icon: '🔬', title: 'Science-First', desc: 'Every product is backed by peer-reviewed clinical evidence and formulated with proven active pharmaceutical ingredients.' },
  { icon: '🤝', title: 'Doctor-Centric', desc: 'We build long-term relationships with healthcare professionals through transparent communication and field support.' },
  { icon: '🛡️', title: 'Quality Assurance', desc: 'ISO 9001:2015 certified processes govern everything from raw material sourcing to final batch release.' },
  { icon: '🌱', title: 'Ethical Practices', desc: 'We adhere to the Indian Pharmaceutical Marketing Code and compete on clinical merit, never incentives.' },
  { icon: '🚀', title: 'Innovation', desc: 'Continuous R&D investment ensures our formulations stay at the forefront of pharmaceutical science.' },
  { icon: '🌍', title: 'Accessibility', desc: 'Our pricing strategy ensures quality pharmaceuticals remain accessible across Tier 1, 2 and 3 cities.' },
]

const team = [
  { name: 'Dr. Suresh Menon', role: 'Managing Director', bg: '#384a72' },
  { name: 'Dr. Kavitha Rao', role: 'Head – Medical Affairs', bg: '#4e897d' },
  { name: 'Rajesh Kumar', role: 'VP – Sales & Marketing', bg: '#253557' },
  { name: 'Priya Nair', role: 'Head – Quality Assurance', bg: '#3d6e63' },
]

export default function About() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-20" style={{background:'linear-gradient(135deg,#384a72,#253557)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </div>
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">Our Story</span>
            <h1 className="text-5xl font-extrabold text-white mb-5 leading-tight">
              35 Years of Advancing<br/><span style={{color:'#4e897d'}}>Healthcare in India</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">Founded in Bengaluru in 1989, MediPasteur has grown from a regional distributor into one of India's most trusted pharmaceutical manufacturers, serving over 2,000 institutions across 25 states.</p>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5" style={{backgroundColor:'#384a72'}}>🎯</div>
              <h3 className="text-xl font-bold text-primary mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">To develop, manufacture and market high-quality pharmaceutical products that address unmet clinical needs and improve patient outcomes — delivered with integrity and scientific rigour.</p>
            </div>
            <div className="rounded-2xl p-8 border border-secondary-100" style={{backgroundColor:'#eef6f4'}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5" style={{backgroundColor:'#4e897d'}}>🔭</div>
              <h3 className="text-xl font-bold text-secondary mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">To be India's most trusted speciality pharmaceutical company, recognised for innovation in women's health, musculoskeletal care and dermatology, while expanding our global footprint by 2030.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[['35+','Years of Expertise'],['500+','Products in Catalogue'],['2000+','Institutions Served'],['25','States Covered']].map(([v,l])=>(
              <div key={l} className="py-6">
                <div className="text-4xl font-extrabold text-primary mb-2">{v}</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-badge">Our Journey</span>
            <h2 className="mt-4 text-4xl font-extrabold text-gray-900">Milestones That Define Us</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <div key={i} className="relative flex gap-6 items-start">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 z-10 shadow-md"
                    style={{backgroundColor: i%2===0 ? '#384a72' : '#4e897d'}}>{t.year}</div>
                  <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-1">{t.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-badge">What We Stand For</span>
            <h2 className="mt-4 text-4xl font-extrabold text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm card-hover">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-badge">Leadership</span>
            <h2 className="mt-4 text-4xl font-extrabold text-gray-900">The Team Behind MediPasteur</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(m => (
              <div key={m.name} className="text-center bg-gray-50 rounded-2xl p-7 border border-gray-100 card-hover">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold shadow-lg"
                  style={{backgroundColor: m.bg}}>
                  {m.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{m.name}</h4>
                <p className="text-sm text-gray-500">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center font-bold text-gray-900 mb-8 text-lg">Certifications & Accreditations</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {['ISO 9001:2015','GMP Certified','CDSCO Licensed','WHO-GMP','Schedule M Compliant'].map(cert => (
              <div key={cert} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
                <span className="text-secondary font-bold">✓</span>
                <span className="text-sm font-semibold text-gray-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
