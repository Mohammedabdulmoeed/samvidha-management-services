// import {
//   motion,
//   useScroll,
//   useTransform,
//   AnimatePresence,
//   useReducedMotion,
// } from 'framer-motion';

// import {
//   ArrowRight,
//   ChevronDown,
//   Droplets,
//   Factory,
//   Sparkles,
//   Zap,
// } from 'lucide-react';

// import { useEffect, useRef, useState } from 'react';
// import { useOutletContext } from 'react-router-dom';

// import electrician from '../../assets/hero/electrician.jpg';
// import plumbing from '../../assets/hero/plumbing.jpg';
// import housekeeping from '../../assets/hero/housekeeping.jpg';
// import stp from '../../assets/hero/stp.jpg';
// import construction from '../../assets/hero/stp12.jpg';

// import Button from '../ui/Button';
// import FloatingOrbs from '../common/FloatingOrbs';
// import { fadeInUp, staggerContainer } from '../../animations/variants';
// import HeroVisual from './HeroVisual';

// const SLIDE_MS = 6000;
// const SERVICE_MS = 4000;

// const EASE = [0.4, 0, 0.2, 1];

// const rotatingServices = [
//   {
//     word: 'Electrical',
//     icon: Zap,
//     color: 'text-amber-300',
//   },
//   {
//     word: 'Plumbing',
//     icon: Droplets,
//     color: 'text-cyan-300',
//   },
//   {
//     word: 'Housekeeping',
//     icon: Sparkles,
//     color: 'text-emerald-300',
//   },
//   {
//     word: 'STP Plants',
//     icon: Factory,
//     color: 'text-slate-300',
//   },
// ];

// const bgSlides = [
//   {
//     image: construction,
//     label: 'Facility Management',
//   },
//   {
//     image: electrician,
//     label: 'Electrical Works',
//   },
//   {
//     image: plumbing,
//     label: 'Plumbing Systems',
//   },
//   {
//     image: housekeeping,
//     label: 'Housekeeping Services',
//   },
//   {
//     image: stp,
//     label: 'STP Operations',
//   },
// ];

// const servicePills = [
//   {
//     icon: Zap,
//     label: 'Electrician',
//     color:
//       'bg-amber-500/20 text-amber-200 border-amber-400/30',
//   },
//   {
//     icon: Droplets,
//     label: 'Plumbing',
//     color:
//       'bg-cyan-500/20 text-cyan-200 border-cyan-400/30',
//   },
//   {
//     icon: Sparkles,
//     label: 'Housekeeping',
//     color:
//       'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
//   },
//   {
//     icon: Factory,
//     label: 'STP Plants',
//     color:
//       'bg-slate-500/20 text-slate-200 border-slate-400/30',
//   },
// ];

// export default function Hero() {
//   const outletContext = useOutletContext();

//   const openQuote = outletContext?.openQuote;

//   const ref = useRef(null);

//   const prefersReducedMotion = useReducedMotion();

//   const [slideIndex, setSlideIndex] = useState(0);

//   const [serviceIndex, setServiceIndex] = useState(0);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ['start start', 'end start'],
//   });

//   const parallaxY = useTransform(
//     scrollYProgress,
//     [0, 1],
//     ['0%', prefersReducedMotion ? '0%' : '20%']
//   );

//   const contentOpacity = useTransform(
//     scrollYProgress,
//     [0, 0.8],
//     [1, 0]
//   );

//   useEffect(() => {
//     if (prefersReducedMotion) return undefined;

//     const id = setInterval(() => {
//       setSlideIndex((i) => (i + 1) % bgSlides.length);
//     }, SLIDE_MS);

//     return () => clearInterval(id);
//   }, [prefersReducedMotion]);

//   useEffect(() => {
//     if (prefersReducedMotion) return undefined;

//     const id = setInterval(() => {
//       setServiceIndex(
//         (i) => (i + 1) % rotatingServices.length
//       );
//     }, SERVICE_MS);

//     return () => clearInterval(id);
//   }, [prefersReducedMotion]);

//   const currentService = rotatingServices[serviceIndex];

//   const ServiceIcon = currentService.icon;

//   return (
//     <section
//       ref={ref}
//       className="relative min-h-screen flex items-center overflow-hidden overflow-x-clip"
//     >
//       {/* Background Slider */}
//       <div
//         className="absolute inset-0 will-change-transform"
//         style={{ transform: 'translateZ(0)' }}
//       >
//         <motion.div
//           className="absolute inset-0"
//           style={{ y: parallaxY }}
//         >
//           {bgSlides.map((slide, i) => (
//             <motion.div
//               key={slide.label}
//               className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//               style={{
//                 backgroundImage: `url(${slide.image})`,
//               }}
//               animate={{
//                 opacity: slideIndex === i ? 1 : 0,
//               }}
//               transition={{
//                 duration: prefersReducedMotion
//                   ? 0
//                   : 1.2,
//                 ease: EASE,
//               }}
//               aria-hidden={slideIndex !== i}
//             />
//           ))}
//         </motion.div>
//       </div>

//       {/* Overlay */}
//       <div className="absolute inset-0 gradient-hero" />

//       <div className="absolute inset-0 grid-pattern opacity-60" />

//       {!prefersReducedMotion && (
//         <>
//           <motion.div className="absolute inset-0 hero-mesh pointer-events-none" />

//           <FloatingOrbs variant="dark" />
//         </>
//       )}

//       {/* Content */}
//       <motion.div
//         style={{ opacity: contentOpacity }}
//         className="container-custom relative z-10 pt-32 pb-28"
//       >
//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           animate="visible"
//           className="row-split lg:gap-8"
//         >
//           {/* LEFT */}
//           <motion.div className="max-w-2xl min-w-0 row-split-content">
//             <motion.span
//               variants={fadeInUp}
//               className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 text-sm font-medium text-brand-200 mb-6 border border-white/10"
//             >
//               <span className="relative flex h-2 w-2">
//                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

//                 <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
//               </span>

//               Trusted Facility Management Partner
//             </motion.span>

//             {/* Heading */}
//             <motion.h1
//               variants={fadeInUp}
//               className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.4rem] font-bold text-white leading-[1.08]"
//             >
//               <span className="text-shimmer block">
//                 Reliable Facility
//               </span>

//               <span className="block mt-1 min-h-[1.2em] sm:min-h-[1.15em]">
//                 &amp;{' '}

//                 <AnimatePresence
//                   mode="wait"
//                   initial={false}
//                 >
//                   <motion.span
//                     key={serviceIndex}
//                     className={`inline-flex items-center gap-2 ${currentService.color}`}
//                     initial={{
//                       opacity: 0,
//                       y: 10,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       y: 0,
//                     }}
//                     exit={{
//                       opacity: 0,
//                       y: -10,
//                     }}
//                     transition={{
//                       duration: 0.35,
//                       ease: EASE,
//                     }}
//                   >
//                     <ServiceIcon className="h-8 w-8 sm:h-10 sm:w-10 shrink-0" />

//                     {currentService.word}
//                   </motion.span>
//                 </AnimatePresence>

//                 {' '}Solutions
//               </span>
//             </motion.h1>

//             {/* Description */}
//             <motion.p
//               variants={fadeInUp}
//               className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed"
//             >
//               Comprehensive electrician,
//               plumbing, housekeeping, and
//               STP plant services for
//               residential, commercial, and
//               industrial properties across
//               India.
//             </motion.p>

//             {/* Service Pills */}
//             <motion.div
//               variants={fadeInUp}
//               className="mt-8 flex flex-wrap gap-2"
//             >
//               {servicePills.map((pill, i) => {
//                 const Icon = pill.icon;

//                 return (
//                   <motion.span
//                     key={pill.label}
//                     className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm ${pill.color}`}
//                     initial={{
//                       opacity: 0,
//                       x: -8,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       x: 0,
//                     }}
//                     transition={{
//                       delay:
//                         0.5 + i * 0.06,
//                       duration: 0.4,
//                       ease: EASE,
//                     }}
//                     whileHover={
//                       prefersReducedMotion
//                         ? undefined
//                         : { scale: 1.04 }
//                     }
//                   >
//                     <Icon className="h-3.5 w-3.5" />

//                     {pill.label}
//                   </motion.span>
//                 );
//               })}
//             </motion.div>

//             {/* Buttons */}
//             <motion.div
//               variants={fadeInUp}
//               className="mt-10 flex flex-wrap gap-4"
//             >
//               <Button
//                 onClick={() => {
//                   if (openQuote) {
//                     openQuote();
//                   }
//                 }}
//                 size="lg"
//               >
//                 Get Quote

//                 <ArrowRight className="h-5 w-5" />
//               </Button>

//               <Button
//                 to="/services"
//                 variant="outline"
//                 size="lg"
//               >
//                 Explore Services
//               </Button>
//             </motion.div>

//             {/* Slider Dots */}
//             <motion.div
//               variants={fadeInUp}
//               className="mt-10 flex items-center gap-3"
//             >
//               <motion.div className="flex gap-1.5">
//                 {bgSlides.map((_, i) => (
//                   <button
//                     key={i}
//                     type="button"
//                     aria-label={`Show slide ${i + 1}`}
//                     onClick={() =>
//                       setSlideIndex(i)
//                     }
//                     className={`h-1 rounded-full transition-all duration-300 ${
//                       i === slideIndex
//                         ? 'w-8 bg-brand-400'
//                         : 'w-3 bg-white/30 hover:bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </motion.div>

//               <motion.span
//                 key={slideIndex}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{
//                   duration: 0.3,
//                 }}
//                 className="text-xs text-slate-400 font-medium"
//               >
//                 {bgSlides[slideIndex].label}
//               </motion.span>
//             </motion.div>
//           </motion.div>

//           {/* RIGHT */}
//           <motion.div
//             variants={fadeInUp}
//             className="relative row-split-media show-desktop-site"
//           >
//             <HeroVisual
//               reducedMotion={
//                 prefersReducedMotion
//               }
//             />
//           </motion.div>
//         </motion.div>

//         {/* Mobile Pills */}
//         {!prefersReducedMotion && (
//           <motion.div
//             variants={fadeInUp}
//             className="hide-desktop-site mt-10 overflow-hidden"
//           >
//             <motion.div
//               className="flex gap-3 w-max"
//               animate={{
//                 x: ['0%', '-50%'],
//               }}
//               transition={{
//                 duration: 22,
//                 repeat: Infinity,
//                 ease: 'linear',
//               }}
//             >
//               {[
//                 ...servicePills,
//                 ...servicePills,
//               ].map((pill, i) => {
//                 const Icon = pill.icon;

//                 return (
//                   <span
//                     key={`${pill.label}-${i}`}
//                     className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium backdrop-blur-sm ${pill.color}`}
//                   >
//                     <Icon className="h-4 w-4" />

//                     {pill.label}
//                   </span>
//                 );
//               })}
//             </motion.div>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Scroll */}
//       <motion.a
//         href="#services"
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
//         animate={
//           prefersReducedMotion
//             ? undefined
//             : { y: [0, 8, 0] }
//         }
//         transition={{
//           repeat: Infinity,
//           duration: 2.5,
//           ease: 'easeInOut',
//         }}
//       >
//         <span className="text-xs font-medium tracking-widest uppercase">
//           Scroll
//         </span>

//         <ChevronDown className="h-7 w-7" />
//       </motion.a>
//     </section>
//   );
// }
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';

import {
  ArrowRight,
  ChevronDown,
  Droplets,
  Factory,
  Sparkles,
  Zap,
} from 'lucide-react';

import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import electrician from '../../assets/hero/electrician.jpg';
import plumbing from '../../assets/hero/plumbing.jpg';
import housekeeping from '../../assets/hero/housekeeping.jpg';
import stp from '../../assets/hero/stp.jpg';
import construction from '../../assets/hero/stp12.jpg';

import Button from '../ui/Button';
import FloatingOrbs from '../common/FloatingOrbs';
import { fadeInUp, staggerContainer } from '../../animations/variants';
import HeroVisual from './HeroVisual';

const SLIDE_MS = 6000;
const SERVICE_MS = 4000;

const EASE = [0.4, 0, 0.2, 1];

const rotatingServices = [
  {
    word: 'Electrical',
    icon: Zap,
    color: 'text-amber-300',
  },
  {
    word: 'Plumbing',
    icon: Droplets,
    color: 'text-cyan-300',
  },
  {
    word: 'Housekeeping',
    icon: Sparkles,
    color: 'text-emerald-300',
  },
  {
    word: 'STP Plants',
    icon: Factory,
    color: 'text-slate-300',
  },
];

const bgSlides = [
  {
    image: construction,
    label: 'Facility Management',
  },
  {
    image: electrician,
    label: 'Electrical Works',
  },
  {
    image: plumbing,
    label: 'Plumbing Systems',
  },
  {
    image: housekeeping,
    label: 'Housekeeping Services',
  },
  {
    image: stp,
    label: 'STP Operations',
  },
];

const servicePills = [
  {
    icon: Zap,
    label: 'Electrician',
    color:
      'bg-amber-500/20 text-amber-200 border-amber-400/30',
  },
  {
    icon: Droplets,
    label: 'Plumbing',
    color:
      'bg-cyan-500/20 text-cyan-200 border-cyan-400/30',
  },
  {
    icon: Sparkles,
    label: 'Housekeeping',
    color:
      'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
  },
  {
    icon: Factory,
    label: 'STP Plants',
    color:
      'bg-slate-500/20 text-slate-200 border-slate-400/30',
  },
];

export default function Hero() {
  const outletContext = useOutletContext();

  const openQuote = outletContext?.openQuote;

  const ref = useRef(null);

  const prefersReducedMotion = useReducedMotion();

  const [slideIndex, setSlideIndex] = useState(0);

  const [serviceIndex, setServiceIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', prefersReducedMotion ? '0%' : '20%']
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0]
  );

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % bgSlides.length);
    }, SLIDE_MS);

    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const id = setInterval(() => {
      setServiceIndex(
        (i) => (i + 1) % rotatingServices.length
      );
    }, SERVICE_MS);

    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const currentService = rotatingServices[serviceIndex];

  const ServiceIcon = currentService.icon;

  return (
    <section
      ref={ref}
      className="hero-balanced relative flex min-h-screen items-center overflow-hidden overflow-x-clip"
    >
      {/* Background Slider */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: parallaxY }}
        >
          {bgSlides.map((slide, i) => (
            <motion.div
              key={slide.label}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
              animate={{
                opacity: slideIndex === i ? 1 : 0,
              }}
              transition={{
                duration: prefersReducedMotion
                  ? 0
                  : 1.2,
                ease: EASE,
              }}
              aria-hidden={slideIndex !== i}
            />
          ))}
        </motion.div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 gradient-hero" />

      <div className="absolute inset-0 grid-pattern opacity-60" />

      {!prefersReducedMotion && (
        <>
          <motion.div className="absolute inset-0 hero-mesh pointer-events-none" />

          <FloatingOrbs variant="dark" />
        </>
      )}

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="container-custom container-balanced relative z-10 pt-32 pb-28"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="row-split items-center lg:gap-8"
        >
          {/* LEFT */}
          <motion.div className="row-split-content max-w-2xl min-w-0">
            <motion.span
              variants={fadeInUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass-dark border border-white/10 px-4 py-2 text-sm font-medium text-brand-200"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              Trusted Facility Management Partner
            </motion.span>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.4rem] xl:text-[4rem]"
            >
              <span className="text-shimmer block">
                Reliable Facility
              </span>

              <span className="mt-1 block min-h-[1.2em] sm:min-h-[1.15em]">
                &amp;{' '}

                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  <motion.span
                    key={serviceIndex}
                    className={`inline-flex items-center gap-2 ${currentService.color}`}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: EASE,
                    }}
                  >
                    <ServiceIcon className="h-8 w-8 shrink-0 sm:h-10 sm:w-10" />

                    {currentService.word}
                  </motion.span>
                </AnimatePresence>

                {' '}Solutions
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
            >
              Comprehensive electrician,
              plumbing, housekeeping, and
              STP plant services for
              residential, commercial, and
              industrial properties across
              India.
            </motion.p>

            {/* Service Pills */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap gap-2"
            >
              {servicePills.map((pill, i) => {
                const Icon = pill.icon;

                return (
                  <motion.span
                    key={pill.label}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm ${pill.color}`}
                    initial={{
                      opacity: 0,
                      x: -8,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay:
                        0.5 + i * 0.06,
                      duration: 0.4,
                      ease: EASE,
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { scale: 1.04 }
                    }
                  >
                    <Icon className="h-3.5 w-3.5" />

                    {pill.label}
                  </motion.span>
                );
              })}
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button
                onClick={() => {
                  if (openQuote) {
                    openQuote();
                  }
                }}
                size="lg"
              >
                Get Quote

                <ArrowRight className="h-5 w-5" />
              </Button>

              <Button
                to="/services"
                variant="outline"
                size="lg"
              >
                Explore Services
              </Button>
            </motion.div>

            {/* Slider Dots */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex items-center gap-3"
            >
              <motion.div className="flex gap-1.5">
                {bgSlides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show slide ${i + 1}`}
                    onClick={() =>
                      setSlideIndex(i)
                    }
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === slideIndex
                        ? 'w-8 bg-brand-400'
                        : 'w-3 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </motion.div>

              <motion.span
                key={slideIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                }}
                className="text-xs font-medium text-slate-400"
              >
                {bgSlides[slideIndex].label}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={fadeInUp}
            className="show-desktop-site row-split-media relative min-w-0"
          >
            <div className="relative mx-auto w-full max-w-[640px]">
              <HeroVisual
                reducedMotion={
                  prefersReducedMotion
                }
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile Pills */}
        {!prefersReducedMotion && (
          <motion.div
            variants={fadeInUp}
            className="hide-desktop-site mt-10 overflow-hidden"
          >
            <motion.div
              className="hero-marquee flex w-max gap-3"
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[
                ...servicePills,
                ...servicePills,
              ].map((pill, i) => {
                const Icon = pill.icon;

                return (
                  <span
                    key={`${pill.label}-${i}`}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium backdrop-blur-sm ${pill.color}`}
                  >
                    <Icon className="h-4 w-4" />

                    {pill.label}
                  </span>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll */}
      <motion.a
        href="#services"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/70 transition-colors hover:text-white"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, 8, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: 'easeInOut',
        }}
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          Scroll
        </span>

        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </section>
  );
}