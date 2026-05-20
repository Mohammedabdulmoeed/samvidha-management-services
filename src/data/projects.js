import { images } from './images';

import electrician from '../assets/hero/electrician.jpg';
import plumbing from '../assets/hero/plumbing.jpg';
import housekeeping from '../assets/hero/housekeeping.jpg';
import stp from '../assets/hero/stp.jpg';
import STP_Monitoring from '../assets/hero/STP-Monitoring-System.jpg';
import Facility_Staff_Deployment from '../assets/hero/Facility-Staff-Deployment.jpg';
import Water_Tank_Maintenance from '../assets/hero/Water-Tank-Maintenance.jpg';
import LED_Lighting_Retrofit from '../assets/hero/LED-Lighting-Retrofit.jpg';
export const projectCategories = ['All', 'Electrical', 'Plumbing', 'Housekeeping', 'STP Plants'];

export const projects = [
  {
    id: 1,
    title: 'Commercial Wiring Upgrade',
    category: 'Electrical',
    image: electrician,
    before: images.wiring,
    after: images.electrician,
    description: 'Complete electrical panel upgrade and rewiring for a 50,000 sq ft office complex.',
  },
  {
    id: 2,
    title: 'Pipeline Installation',
    category: 'Plumbing',
    image: images.plumbing, 
    before: images.pipes,
    after: images.plumbing,
    description: 'Industrial pipeline installation and drainage system overhaul for manufacturing unit.',
  },
  {
    id: 3,
    title: 'Office Deep Cleaning',
    category: 'Housekeeping',
    image: images.housekeeping,
    before: images.cleaning,
    after: images.housekeeping,
    description: 'Post-renovation deep cleaning and sanitization for corporate headquarters.',
  },
  {
    id: 4,
    title: 'STP Plant Overhaul',
    category: 'STP Plants',
    image: images.stp,
    before: images.plant,
    after: images.stp,
    description: 'Complete STP plant rehabilitation and compliance upgrade for residential society.',
  },
  {
    id: 5,
    title: 'LED Lighting Retrofit',
    category: 'Electrical',
    image: images.LED_Lighting_Retrofit,
    description: 'Energy-efficient LED lighting installation across multi-floor commercial building.',
  },
  {
    id: 6,
    title: 'Water Tank Maintenance',
    category: 'Plumbing',
    image: images.Water_Tank_Maintenance,
    description: 'Annual water tank cleaning, sealing, and pipeline inspection for housing society.',
  },
  {
    id: 7,
    title: 'Facility Staff Deployment',
    category: 'Housekeeping',
    image: images.Facility_Staff_Deployment,
    description: 'Dedicated housekeeping team deployment for 200+ unit residential complex.',
  },
  {
    id: 8,
    title: 'STP Monitoring System',
    category: 'STP Plants',
    image: images.STP_Monitoring,
    description: 'Real-time water quality monitoring and automated reporting system installation.',
  },
];
