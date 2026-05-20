import { motion, useReducedMotion } from 'framer-motion';
import { Droplets, Factory, Sparkles, Zap } from 'lucide-react';
import { images } from '../../data/images';

const services = [
  {
    id: 'electric',
    label: 'Electrical',
    icon: Zap,
    image: images.electrician,
    color: 'from-amber-400 to-orange-500',
    glow: 'shadow-amber-500/40',
    x: '8%',
    y: '12%',
    floatDelay: '0s',
  },
  {
    id: 'plumbing',
    label: 'Plumbing',
    icon: Droplets,
    image: images.plumbing,
    color: 'from-cyan-400 to-blue-500',
    glow: 'shadow-cyan-500/40',
    x: '62%',
    y: '8%',
    floatDelay: '0.6s',
  },
  {
    id: 'housekeeping',
    label: 'Housekeeping',
    icon: Sparkles,
    image: images.housekeeping,
    color: 'from-emerald-400 to-teal-500',
    glow: 'shadow-emerald-500/40',
    x: '4%',
    y: '58%',
    floatDelay: '1.2s',
  },
  {
    id: 'stp',
    label: 'STP Plants',
    icon: Factory,
    image: images.stp,
    color: 'from-slate-400 to-slate-600',
    glow: 'shadow-slate-400/30',
    x: '58%',
    y: '54%',
    floatDelay: '1.8s',
  },
];

export default function HeroVisual({ reducedMotion: reducedMotionProp }) {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = reducedMotionProp ?? prefersReducedMotion;

  return (
    <motion.div
      className="relative h-[min(620px,72vh)] w-full"
      aria-hidden="true"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className={`absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 ${
          reducedMotion ? '' : 'hero-ring-slow'
        }`}
      />
      <div
        className={`absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-400/20 ${
          reducedMotion ? '' : 'hero-ring-reverse'
        }`}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M250 250 L120 90 M250 250 L380 80 M250 250 L100 340 M250 250 L370 330"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M250 250 Q180 180 120 90"
          stroke="rgba(251,191,36,0.2)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className={reducedMotion ? '' : 'hero-wire-a'}
        />
        <path
          d="M250 250 Q320 160 380 80"
          stroke="rgba(251,191,36,0.2)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className={reducedMotion ? '' : 'hero-wire-b'}
        />
        <path
          d="M250 250 Q160 300 100 340"
          stroke="rgba(34,211,238,0.2)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className={reducedMotion ? '' : 'hero-pipe-a'}
        />
        <path
          d="M250 250 Q340 290 370 330"
          stroke="rgba(34,211,238,0.2)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className={reducedMotion ? '' : 'hero-pipe-b'}
        />
        <circle
          cx="250"
          cy="250"
          r="36"
          fill="rgba(37,99,235,0.25)"
          stroke="rgba(96,165,250,0.5)"
          strokeWidth="2"
        />
        <circle
          cx="250"
          cy="250"
          r="48"
          fill="none"
          stroke="rgba(96,165,250,0.25)"
          strokeWidth="1"
          className={reducedMotion ? '' : 'hero-hub-pulse'}
        />
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 z-20 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass-dark border border-white/20 shadow-2xl shadow-brand-500/30"
        animate={reducedMotion ? undefined : { scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-200 text-center leading-tight px-1">
          All
          <br />
          Services
        </span>
      </motion.div>

      {services.map((service) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.id}
            className={`absolute z-10 w-[148px] ${reducedMotion ? '' : 'hero-card-float'}`}
            style={{ left: service.x, top: service.y, animationDelay: service.floatDelay }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className={`relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/70 backdrop-blur-xl shadow-xl ${service.glow}`}
            >
              <motion.div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="relative p-3">
                <div
                  className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-semibold text-white">{service.label}</p>
                <div className="mt-2 h-0.5 rounded-full bg-white/20 overflow-hidden">
                  <motion.div
                    className={`h-full w-[40%] rounded-full bg-gradient-to-r ${service.color} ${
                      reducedMotion ? '' : 'hero-progress-bar'
                    }`}
                    style={reducedMotion ? undefined : { animationDelay: service.floatDelay }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
