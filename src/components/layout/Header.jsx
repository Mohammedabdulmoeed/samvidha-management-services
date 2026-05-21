import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { company } from '../../data/company';
import Button from '../ui/Button';
import logo from '../../assets/hero/logo.jpg';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export default function Header({ onQuoteClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrollPosition(50);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navClass =
    scrolled || !isHome
      ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 py-3'
      : 'bg-transparent py-5';

  const textClass = scrolled || !isHome ? 'text-slate-700' : 'text-white';
  const logoTextClass = scrolled || !isHome ? 'text-slate-900' : 'text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navClass}`}>
      <div className="container-custom flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Samvidha Management home">
        <img
          src={logo}
          alt="Samvidha Management Services logo"
          className="h-20 w-auto object-contain"
          width={160}
          height={80}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
          {/* <div>
            <span className={`block font-display font-bold text-lg leading-tight ${logoTextClass}`}>
              Samvidha
            </span>
            <span className={`block text-xs ${scrolled || !isHome ? 'text-slate-500' : 'text-slate-300'}`}>
              Management Services
            </span>
          </div> */}
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  isActive
                    ? scrolled || !isHome
                      ? 'bg-brand-50 text-brand-700 shadow-sm'
                      : 'bg-white/20 text-white'
                    : `${textClass} hover:opacity-90`
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <motion.div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${company.phone.replace(/\s/g, '')}`}
            className={`flex items-center gap-2 text-sm font-semibold ${textClass} hover:opacity-80`}
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <Button size="sm" onClick={onQuoteClick}>
            Get Quote
          </Button>
        </motion.div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-lg ${textClass}`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-200 shadow-xl"
          >
            <nav id="mobile-navigation" className="container-custom py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-medium ${
                      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-2 py-3 text-brand-600 font-semibold"
                >
                  <Phone className="h-4 w-4" />
                  {company.phoneDisplay}
                </a>
                <Button onClick={() => { onQuoteClick(); setMobileOpen(false); }} className="w-full">
                  Get Quote
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
