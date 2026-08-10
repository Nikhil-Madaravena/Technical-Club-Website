import { motion } from "framer-motion";
import { ElasticGallery } from "@/components/ui/elastic-gallery";

const DomainsSection = () => {
  return (
    <section id="domains" className="relative py-32">
      <div className="section-line" />
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-display text-[10px] tracking-[0.5em] text-accent">
            OUR EXPERTISE
          </span>
          <h2 className="font-display text-3xl font-bold tracking-wide sm:text-4xl">
            TECHNICAL <span className="text-gradient-brand">DOMAINS</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ElasticGallery />
        </motion.div>
      </div>
    </section>
  );
};

export default DomainsSection;
