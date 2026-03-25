import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', specialty:'', subject:'', message:'' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})
  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-20" style={{background:'linear-gradient(135deg,#384a72,#253557)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-3">Get in Touch</h1>
          <p className="text-white/65 text-lg max-w-xl">Connect with our medical team for product enquiries, quotations, samples or field support requests.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">

            {/* Contact Info */}
            <div className="mb-10 lg:mb-0 space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-6">Contact Details</h3>
              </div>
              {[
                { icon: '📍', title: 'Head Office', lines: ['123 Pharma Park, Sector 5,','Bengaluru, Karnataka – 560100'] },
                { icon: '📞', title: 'Sales & Support', lines: ['+91 (80) 4567 8900','+91 98765 43210'] },
                { icon: '📧', title: 'Email', lines: ['info@medipasteur.com','sales@medipasteur.com'] },
                { icon: '🕐', title: 'Working Hours', lines: ['Mon – Sat: 9:00 AM – 6:00 PM','Sunday: Closed'] },
              ].map(c => (
                <div key={c.title} className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{backgroundColor:'#eef6f4'}}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{c.title}</p>
                    {c.lines.map((l,i) => <p key={i} className="text-sm text-gray-600">{l}</p>)}
                  </div>
                </div>
              ))}

              {/* Regional offices */}
              <div className="bg-primary rounded-2xl p-5 text-white">
                <h4 className="font-bold mb-3 text-sm">Regional Offices</h4>
                {[['Mumbai','022-2345 6789'],['Delhi','011-4567 8901'],['Chennai','044-3456 7890'],['Hyderabad','040-5678 9012']].map(([city,ph]) => (
                  <div key={city} className="flex justify-between py-1.5 border-b border-white/10 last:border-0">
                    <span className="text-white/70 text-xs">{city}</span>
                    <span className="text-white text-xs font-medium">{ph}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl" style={{backgroundColor:'#eef6f4'}}>✅</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Received!</h3>
                    <p className="text-gray-600 mb-6">Our team will respond within 1 business day. For urgent queries, call +91 (80) 4567 8900.</p>
                    <button onClick={()=>setSubmitted(false)} className="btn-primary">Send Another Message</button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-gray-900 text-xl mb-2">Send Us a Message</h3>
                    <p className="text-gray-500 text-sm mb-7">Fill the form below and our medical team will respond promptly.</p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Full Name *</label>
                          <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Dr. John Smith"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"/>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Email Address *</label>
                          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="doctor@hospital.com"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"/>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Phone Number</label>
                          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"/>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Specialty</label>
                          <select name="specialty" value={form.specialty} onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white">
                            <option value="">Select Specialty</option>
                            <option>Gynaecology & Obstetrics</option>
                            <option>Orthopaedics</option>
                            <option>General Practice / Family Medicine</option>
                            <option>Dermatology</option>
                            <option>Pharmacy / Distribution</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Subject *</label>
                        <select name="subject" value={form.subject} onChange={handleChange} required
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white">
                          <option value="">Select Subject</option>
                          <option>Product Enquiry</option>
                          <option>Request Sample</option>
                          <option>Bulk Order / Quotation</option>
                          <option>Distribution Partnership</option>
                          <option>Medical Query</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Message *</label>
                        <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Please describe your requirement in detail..."
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all resize-none"/>
                      </div>
                      <button type="submit" className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg" style={{backgroundColor:'#384a72'}}>
                        Send Message →
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
