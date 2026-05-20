import { Zap, Droplets, Sparkles, Factory } from 'lucide-react';
import { images } from './images';


export const servicesOverview = [
  {
    id: 'electrician',
    title: 'Electrician Services',
    slug: 'electrician',
    icon: Zap,
    shortDesc:
      'Complete electrical maintenance for residential, commercial, and industrial properties with certified technicians.',
    image: images.electrician,
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'plumbing',
    title: 'Plumbing Services',
    slug: 'plumbing',
    icon: Droplets,
    shortDesc:
      'Expert plumbing solutions from leak repairs to full pipeline installations and emergency response.',
    image: images.plumbing,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'housekeeping',
    title: 'Housekeeping Services',
    slug: 'housekeeping',
    icon: Sparkles,
    shortDesc:
      'Professional cleaning, sanitization, and facility staff support for offices, homes, and commercial spaces.',
    image: images.housekeeping,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'stp',
    title: 'STP Plant Services',
    slug: 'stp',
    icon: Factory,
    shortDesc:
      'End-to-end sewage treatment plant operations, monitoring, compliance, and industrial maintenance support.',
    image: images.stp,
    color: 'from-slate-600 to-slate-800',
  },
];

export const servicesDetailed = {
  electrician: {
    title: 'Electrician Services',
    tagline: 'Safe, Compliant & Reliable Electrical Solutions',
    image: images.electrician,
    intro:
      'Our certified electricians deliver comprehensive electrical services for homes, offices, factories, and commercial complexes. From routine maintenance to emergency repairs, we ensure safety, compliance, and uninterrupted power.',
    features: [
      'Residential electrical works',
      'Commercial maintenance',
      'Wiring & rewiring',
      'Electrical panel maintenance',
      'Power backup systems',
      'Lighting installation',
      'Emergency electrical repairs',
    ],
    benefits: [
      'Licensed & trained electricians',
      'IS standards compliant work',
      'Rapid emergency response',
      'Transparent pricing',
      'Warranty on workmanship',
    ],
  },
  plumbing: {
    title: 'Plumbing Services',
    tagline: 'Expert Plumbing for Every Property Type',
    image: images.plumbing,
    intro:
      'From minor leak repairs to complete pipeline installations, our plumbing team handles all water and drainage challenges with precision, using quality materials and modern techniques.',
    features: [
      'Pipe leakage repair',
      'Bathroom fittings',
      'Drainage solutions',
      'Water tank maintenance',
      'Commercial plumbing',
      'Pipeline installation',
      'Emergency plumbing',
    ],
    benefits: [
      'Advanced leak detection',
      'Quality branded fittings',
      'Minimal disruption approach',
      'Preventive maintenance plans',
      '24/7 emergency availability',
    ],
  },
  housekeeping: {
    title: 'Housekeeping Services',
    tagline: 'Spotless Spaces, Professional Standards',
    image: images.housekeeping,
    intro:
      'We provide comprehensive housekeeping and facility cleaning services tailored to offices, residential complexes, hospitals, and industrial facilities — maintaining hygiene, aesthetics, and compliance.',
    features: [
      'Office cleaning',
      'Residential cleaning',
      'Deep cleaning',
      'Sanitization services',
      'Floor maintenance',
      'Waste management',
      'Facility staff support',
    ],
    benefits: [
      'Trained & verified staff',
      'Eco-friendly cleaning products',
      'Customizable service schedules',
      'Quality inspection protocols',
      'Dedicated account managers',
    ],
  },
  stp: {
    title: 'STP Plant Operations & Maintenance',
    tagline: 'Industrial-Grade Sewage Treatment Management',
    image: images.stp,
    intro:
      'Our STP specialists manage sewage treatment plants end-to-end — ensuring optimal performance, regulatory compliance, equipment longevity, and environmental responsibility for industrial and commercial clients.',
    features: [
      'STP plant operation',
      'Sewage treatment maintenance',
      'Water monitoring',
      'Equipment maintenance',
      'Plant inspection',
      'Compliance checks',
      'Industrial support',
    ],
    benefits: [
      'Certified plant operators',
      'Real-time monitoring systems',
      'Pollution control board compliance',
      'Reduced operational downtime',
      'Detailed maintenance reporting',
    ],
  },
};
