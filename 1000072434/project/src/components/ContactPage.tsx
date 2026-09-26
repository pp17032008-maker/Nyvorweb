import { useState } from 'react';
import { Mail, Phone, Clock, MapPin, ArrowUpRight, Instagram, Twitter, Youtube } from 'lucide-react';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim() && form.email.trim() && form.message.trim()) {
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-8">
        {/* Header */}
        <div className="mb-16 space-y-4">
          <p className="text-xs tracking-wide-label text-brand uppercase">Get in Touch</p>
          <h1 className="font-display text-4xl lg:text-6xl tracking-ultra-tight text-accent leading-tight">
            CONTACT US
          </h1>
          <p className="text-accent-muted leading-relaxed max-w-xl">
            Questions about a drop, an order, or a collaboration? We're here.
            Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-px bg-line border-hairline rounded-sm overflow-hidden">
          {/* Contact info panel */}
          <div className="lg:col-span-5 bg-ink-base p-8 lg:p-12 space-y-8">
            <div className="space-y-1">
              <p className="text-xs tracking-wide-label text-accent-dim uppercase">Reach Us Directly</p>
              <h2 className="font-display text-2xl text-accent tracking-tight">Direct Channels</h2>
            </div>

            {/* Email */}
            <a
              href="mailto:nyvorcircle@gmail.com"
              className="group flex items-start gap-4 p-5 border-hairline rounded-sm hover:bg-ink-raised transition-colors duration-300"
            >
              <div className="h-11 w-11 border-hairline rounded-sm flex items-center justify-center flex-shrink-0 group-hover:border-brand/40 group-hover:bg-brand/5 transition-all duration-300">
                <Mail className="h-5 w-5 text-accent-muted group-hover:text-brand transition-colors duration-300" />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-xs tracking-wide-label text-accent-dim uppercase">Email</p>
                <p className="text-base text-accent font-medium truncate">nyvorcircle@gmail.com</p>
                <p className="text-xs text-accent-muted">Replies within 24 hours</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-accent-dim group-hover:text-brand transition-colors duration-300 flex-shrink-0 mt-1" />
            </a>

            {/* Phone */}
            <a
              href="tel:+917982903153"
              className="group flex items-start gap-4 p-5 border-hairline rounded-sm hover:bg-ink-raised transition-colors duration-300"
            >
              <div className="h-11 w-11 border-hairline rounded-sm flex items-center justify-center flex-shrink-0 group-hover:border-brand/40 group-hover:bg-brand/5 transition-all duration-300">
                <Phone className="h-5 w-5 text-accent-muted group-hover:text-brand transition-colors duration-300" />
              </div>
              <div className="space-y-1">
                <p className="text-xs tracking-wide-label text-accent-dim uppercase">Phone</p>
                <p className="text-base text-accent font-medium">+91 79829 03153</p>
                <p className="text-xs text-accent-muted">Mon–Sat · 10AM–7PM IST</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-accent-dim group-hover:text-brand transition-colors duration-300 flex-shrink-0 mt-1" />
            </a>

            {/* Hours */}
            <div className="flex items-start gap-4 p-5 border-hairline rounded-sm">
              <div className="h-11 w-11 border-hairline rounded-sm flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-accent-muted" />
              </div>
              <div className="space-y-1">
                <p className="text-xs tracking-wide-label text-accent-dim uppercase">Business Hours</p>
                <p className="text-sm text-accent">Monday – Saturday</p>
                <p className="text-sm text-accent-muted">10:00 AM – 7:00 PM IST</p>
                <p className="text-xs text-accent-dim pt-1">Closed on Sundays & public holidays</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 p-5 border-hairline rounded-sm">
              <div className="h-11 w-11 border-hairline rounded-sm flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-accent-muted" />
              </div>
              <div className="space-y-1">
                <p className="text-xs tracking-wide-label text-accent-dim uppercase">Based In</p>
                <p className="text-sm text-accent">Mumbai, India</p>
                <p className="text-xs text-accent-muted">Shipping nationwide</p>
              </div>
            </div>

            {/* Social */}
            <div className="pt-4 space-y-3">
              <p className="text-xs tracking-wide-label text-accent-dim uppercase">Follow NYVOR</p>
              <div className="flex items-center gap-3">
                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="h-10 w-10 border-hairline rounded-sm flex items-center justify-center text-accent-muted hover:text-accent hover:border-brand/40 hover:bg-ink-raised transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7 bg-ink-raised p-8 lg:p-12">
            <div className="space-y-1 mb-8">
              <p className="text-xs tracking-wide-label text-accent-dim uppercase">Send a Message</p>
              <h2 className="font-display text-2xl text-accent tracking-tight">Drop Us a Line</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs tracking-wide-label text-accent-dim uppercase block">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-ink-base border-hairline px-4 py-3.5 text-sm text-accent placeholder:text-accent-dim focus:outline-none focus:border-brand/50 transition-colors rounded-sm"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-wide-label text-accent-dim uppercase block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-ink-base border-hairline px-4 py-3.5 text-sm text-accent placeholder:text-accent-dim focus:outline-none focus:border-brand/50 transition-colors rounded-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-wide-label text-accent-dim uppercase block">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-ink-base border-hairline px-4 py-3.5 text-sm text-accent placeholder:text-accent-dim focus:outline-none focus:border-brand/50 transition-colors rounded-sm"
                  placeholder="What's this about?"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-wide-label text-accent-dim uppercase block">Message</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-ink-base border-hairline px-4 py-3.5 text-sm text-accent placeholder:text-accent-dim focus:outline-none focus:border-brand/50 transition-colors rounded-sm resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <button
                type="submit"
                className={`w-full py-4 text-sm font-semibold tracking-wide-label uppercase rounded-sm transition-all duration-300 ${
                  sent ? 'bg-success text-white' : 'bg-accent text-ink-base hover:bg-white'
                }`}
              >
                {sent ? 'Message Sent — We\'ll be in touch' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
