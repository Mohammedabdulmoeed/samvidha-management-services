import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import SectionHeading from '../ui/SectionHeading';

export default function Testimonials() {
  return (
    <section className="section-padding bg-slate-50 overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          subtitle="Trusted by facility managers, society admins, and business owners across India."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              980: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="pb-14"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="h-full rounded-2xl bg-white p-8 shadow-md border border-slate-100 hover:shadow-xl hover:border-brand-200 relative transition-shadow duration-300"
                >
                  <Quote className="absolute top-6 right-6 h-10 w-10 text-brand-100" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">&ldquo;{t.review}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={t.image}
                      alt={`${t.name}, ${t.role}`}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-100"
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{t.name}</p>
                      <p className="text-sm text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
