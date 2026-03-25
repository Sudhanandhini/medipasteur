import { useState } from 'react'
import { Link } from 'react-router-dom'

const openings = [
  { id: 1, title: 'Medical Representative – Gynaecology', location: 'Bengaluru / Mysuru', type: 'Full-time', dept: 'Sales', exp: '1–3 years', desc: 'Promote MediPasteur\'s gynaecology portfolio to OBGYNs, gynaecologists and fertility clinics. Strong communication and relationship-building skills required.' },
  { id: 2, title: 'Area Sales Manager – Orthopaedics', location: 'Mumbai', type: 'Full-time', dept: 'Sales', exp: '4–6 years', desc: 'Lead a team of 8–10 MRs covering the Mumbai metropolitan area. Drive sales targets, manage key account relationships and conduct CME programmes.' },
  { id: 3, title: 'Regulatory Affairs Executive', location: 'Bengaluru (HQ)', type: 'Full-time', dept: 'Regulatory', exp: '2–4 years', desc: 'Handle CDSCO filing, product licence renewals, Schedule M compliance documentation and coordination with state drug authorities.' },
  { id: 4, title: 'Medical Science Liaison – Dermatology', location: 'Delhi / NCR', type: 'Full-time', dept: 'Medical Affairs', exp: '3–5 years', desc: 'Engage dermatologists and KOLs with scientific data, support phase IV studies and represent MediPasteur at dermatology conferences and CMEs.' },
  { id: 5, title: 'Quality Control Analyst', location: 'Bengaluru (Manufacturing)', type: 'Full-time', dept: 'Quality', exp: '2–3 years', desc: 'Conduct in-process and finished goods quality testing per pharmacopoeial methods. Experience with HPLC, dissolution testing and SOP writing preferred.' },
  { id: 6, title: 'Digital Marketing Executive', location: 'Remote / Bengaluru', type: 'Full-time', dept: 'Marketing', exp: '1–2 years', desc: 'Manage social media channels, HCP digital outreach, email campaigns and website content for MediPasteur\'s online presence.' },
]

const perks = [
  { icon: '💰', title: 'Competitive CTC', desc: 'Market-benchmarked salary with performance incentives and annual increments.' },
  { icon: '🎓', title: 'Training & Development', desc: 'Structured onboarding, product training and leadership development programmes.' },
  { icon: '🏥', title: 'Health Insurance', desc: 'Comprehensive mediclaim for self, spouse and two children.' },
  { icon: '🚗', title: 'Travel & Conveyance', desc: 'Reimbursement of field travel expenses and company vehicle for senior roles.' },
  { icon: '🏆', title: 'Recognition Awards', desc: 'Monthly and annual awards for top performers, including international incentive trips.' },
  { icon: '📈', title: 'Career Growth', desc: 'Structured promotion ladder with internal mobility across divisions and geographies.' },
]

export default function Career() {
  const [activeJob, setActiveJob] = useState(null)
  const [form, setForm] = useState({ name:'', email:'', phone:'', role:'', exp:'', message:'' })
  const [applied, setApplied] = useState(false)
  const [resumeName, setResumeName] = useState('')

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})
  const handleFile = e => { if(e.target.files[0]) setResumeName(e.target.files[0].name) }
  const handleSubmit = e => { e.preventDefault(); setApplied(true) }

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-20" style={{background:'linear-gradient(135deg,#384a72,#253557)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Career</span>
          </div>
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            {openings.length} Open Positions
          </span>
          <h1 className="text-5xl font-extrabold text-white mb-3 leading-tight">
            Build Your Career<br/>
            <span style={{color:'#4e897d'}}>with MediPasteur</span>
          </h1>
          <p className="text-white/65 text-lg max-w-2xl">Join a team of 1,200+ passionate healthcare professionals dedicated to improving lives through quality pharmaceuticals.</p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-badge">Why Join Us</span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">What We Offer</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map(p => (
              <div key={p.title} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-2xl">{p.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">{p.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-badge">Current Openings</span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Open Positions</h2>
          </div>
          <div className="space-y-4">
            {openings.map(job => (
              <div key={job.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-50 text-primary">{job.dept}</span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary-50 text-secondary">{job.type}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                          {job.exp}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setActiveJob(activeJob===job.id ? null : job.id)}
                        className="px-5 py-2.5 text-sm font-semibold border-2 border-primary text-primary rounded-xl hover:bg-primary-50 transition-colors">
                        {activeJob===job.id ? 'Hide Details' : 'View Details'}
                      </button>
                      <button onClick={() => { setActiveJob(null); setForm({...form, role: job.title}); document.getElementById('apply-form').scrollIntoView({behavior:'smooth'}) }}
                        className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-all"
                        style={{backgroundColor:'#4e897d'}}>
                        Apply Now
                      </button>
                    </div>
                  </div>

                  {activeJob===job.id && (
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed">{job.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-badge">Apply</span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Submit Your Application</h2>
            <p className="mt-3 text-gray-500">Don't see the right role? Submit a general application — we'll reach out when a matching opening arises.</p>
          </div>

          {applied ? (
            <div className="text-center bg-secondary-50 border-2 border-secondary-100 rounded-2xl p-14">
              <div className="text-5xl mb-5">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h3>
              <p className="text-gray-600 mb-6">Our HR team will review your profile and contact you within 5–7 working days.</p>
              <button onClick={()=>setApplied(false)} className="btn-secondary">Submit Another Application</button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your Name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"/>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Phone *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 98765 43210"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Experience</label>
                    <select name="exp" value={form.exp} onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white">
                      <option value="">Years of Experience</option>
                      <option>Fresher (0 years)</option>
                      <option>1–2 years</option>
                      <option>3–5 years</option>
                      <option>6–10 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Position Applying For *</label>
                  <select name="role" value={form.role} onChange={handleChange} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white">
                    <option value="">Select Position</option>
                    {openings.map(j=><option key={j.id}>{j.title}</option>)}
                    <option>General Application</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Cover Note</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us why you want to join MediPasteur..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all resize-none"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Resume / CV *</label>
                  <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:border-secondary hover:bg-secondary-50 transition-all group">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                    <span className="text-sm text-gray-500">{resumeName || 'Upload PDF or DOC (max 5MB)'}</span>
                    <input type="file" className="sr-only" accept=".pdf,.doc,.docx" onChange={handleFile}/>
                  </label>
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 shadow-lg" style={{backgroundColor:'#384a72'}}>
                  Submit Application →
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
