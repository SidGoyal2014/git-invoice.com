import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ['Developers', 'Freelancers', 'Engineers', 'Consultants', 'PMs'];

export default function BenefitsSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-t from-white to-orange-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Benefits for{' '}
            <span className="inline-block relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 text-orange-600"
                >
                  {words[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="invisible">{words[0]}</span>
            </span>
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
  Git Invoice simplifies your billing process, ensuring <span className="font-semibold text-orange-600">accurate tracking</span> of your GitHub contributions. With <span className="font-semibold text-orange-600">professional-quality invoices</span>, you'll leave a lasting impression on clients. The platform is also <span className="font-semibold text-orange-600">easy to use</span>, taking the hassle out of invoicing.
</p>

        </div>
      </div>
    </section>
  );
}

