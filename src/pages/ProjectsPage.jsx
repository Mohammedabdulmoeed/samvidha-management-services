import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import SEO from '../components/common/SEO';
import { pageSeo } from '../data/seo';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import SafeImage from '../components/ui/SafeImage';
import Reveal from '../components/ui/Reveal';
import { projects, projectCategories } from '../data/projects';
import { images } from '../data/images';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [showCompare, setShowCompare] = useState(false);

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <SEO {...pageSeo.projects} />
      <PageHero
        title="Projects & Gallery"
        subtitle="Showcasing our expertise across facility management projects."
        image={images.building}
        breadcrumb="Home / Projects"
      />

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            label="Portfolio"
            title="Our Recent Work"
            subtitle="Browse completed projects across electrical, plumbing, housekeeping, and STP categories."
          />

          <Reveal>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {projectCategories.map((cat) => (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    filter === cat
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                      : 'bg-slate-100 text-slate-700 hover:bg-brand-200 hover:shadow-md'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 min-[980px]:grid-cols-3 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.05}>
                <button
                  type="button"
                  onClick={() => {
                    setLightbox(project);
                    setShowCompare(!!project.before);
                  }}
                  className="group relative w-full rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-md text-left hover:shadow-2xl hover:shadow-brand-500/15 transition-shadow duration-300"
                >
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[4/3] max-h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-brand-300 text-xs font-semibold uppercase">{project.category}</span>
                    <h3 className="text-white font-bold text-lg mt-1">{project.title}</h3>
                    <p className="text-slate-300 text-sm mt-1 line-clamp-2">{project.description}</p>
                    <ZoomIn className="absolute top-4 right-4 h-6 w-6 text-white" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-slate-500 py-12">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white p-2 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {showCompare && lightbox.before ? (
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <p className="text-center text-xs font-bold py-2 bg-slate-100">Before</p>
                  <SafeImage src={lightbox.before} alt="Before" className="w-full h-64 object-cover" />
                </div>
                <div>
                  <p className="text-center text-xs font-bold py-2 bg-brand-50 text-brand-700">After</p>
                  <SafeImage src={lightbox.after} alt="After" className="w-full h-64 object-cover" />
                </div>
              </div>
            ) : (
              <SafeImage
                src={lightbox.image}
                alt={lightbox.title}
                className="w-full max-h-[70vh] object-cover"
              />
            )}
            <div className="p-6">
              <span className="text-brand-600 text-sm font-semibold">{lightbox.category}</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{lightbox.title}</h3>
              <p className="text-slate-600 mt-2">{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
