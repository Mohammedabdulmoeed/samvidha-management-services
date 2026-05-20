import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Share2, Globe, Link2, AtSign } from 'lucide-react';
import { company } from '../../data/company';
import { servicesOverview } from '../../data/services';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="container-custom section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Building2 className="h-6 w-6" />
              </div>
              <span className="font-display font-bold text-white text-lg">Samvidha</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Premium facility management and maintenance services delivering reliable solutions
              for residential, commercial, and industrial clients across India.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Share2, href: company.social.facebook, label: 'Facebook' },
                { Icon: Link2, href: company.social.linkedin, label: 'LinkedIn' },
                { Icon: Globe, href: company.social.instagram, label: 'Instagram' },
                { Icon: AtSign, href: company.social.twitter, label: 'Twitter' },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-brand-600 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              {servicesOverview.map((s) => (
                <li key={s.id}>
                  <Link to="/services" className="text-sm hover:text-brand-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-brand-400" />
                <span>{company.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-brand-400" />
                <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0 text-brand-400" />
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </li>
            </ul>
            <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
              <p className="text-sm font-medium text-white mb-2">Newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>Reliable Facility & Maintenance Solutions</p>
        </div>
      </div>
    </footer>
  );
}
