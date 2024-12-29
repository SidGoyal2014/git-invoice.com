"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import {
  ArrowRight,
  FileText,
  DollarSign,
  Code,
  GitPullRequest,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroComponent() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      icon: Code,
      title: "Streamlined Process",
      description:
        "Generate professional invoices from your GitHub contributions in three simple steps. No complex setup, just straightforward invoicing.",
      detail: "Integrates with GitHub for easy authentication and contribution tracking",
    },
    {
      icon: GitPullRequest,
      title: "Select Contributions",
      description:
        "Choose which repositories, pull requests, and commits to include. Customize your invoices with precision by selecting the relevant work.",
      detail: "Supports GitHub repository selection and time tracking",
    },
    {
      icon: DollarSign,
      title: "PDF Invoicing",
      description:
        "Transform your GitHub contributions into professional invoices. Simply log your time and client info, and generate a detailed invoice instantly.",
      detail: " ",
    },
  ];
  

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-background pt-16 md:pt-12 lg:pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="flex flex-col justify-center space-y-8 lg:pr-8 xl:pr-16">
            <motion.h1
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-primary">Simplify Your Work</span>
              <span className="block text-black">
                Invoicing from GitHub Contributions
              </span>
            </motion.h1>
            <motion.p
              className="max-w-3xl text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Save time and focus on your code while we turn your GitHub
              activity into detailed, accurate invoices with minimal effort.
            </motion.p>
            <motion.div
              className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Main Button: GitHub Login */}
              <Button
                size="lg"
                className="group px-8 py-4 text-lg text-white"
                onClick={() => {
                  const targetDiv = document.getElementById("waitlist");
                  if (targetDiv) {
                    targetDiv.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Join waitlist
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

            
            </motion.div>
              {/* Stats 
            <motion.div
              className="flex items-center space-x-2 text-primary font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <FileText className="h-5 w-5 text-black" />
            
              <span className="text-sm font-medium text-black">
                Created over 10,000 invoices worldwide
              </span>
             
            </motion.div>
             */}
          </div>

          {/* Cards section, hidden on small screens */}
          <div className="relative lg:mt-8 xl:mt-16 hidden md:block">
            <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {cards.map(
                    (card, index) =>
                      index === activeCard && (
                        <motion.div
                          key={index}
                          className="absolute w-96 rounded-lg bg-white p-10 shadow-xl"
                          initial={{ opacity: 0, y: 50, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -50, scale: 0.9 }}
                          transition={{ duration: 0.5 }}
                        >
                          <card.icon className="mb-6 h-16 w-16 text-primary" />
                          <h3 className="mb-3 text-2xl font-bold">
                            {card.title}
                          </h3>
                          <p className="mb-4 text-lg text-muted-foreground">
                            {card.description}
                          </p>
                          <p className="text-sm font-medium text-primary">
                            {card.detail}
                          </p>
                        </motion.div>
                      ),
                  )}
                </AnimatePresence>
              </div>
              <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 space-x-3">
                {[0, 1, 2].map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-3 w-3 rounded-full ${
                      index === activeCard ? "bg-primary" : "bg-primary/30"
                    }`}
                    initial={false}
                    animate={{ scale: index === activeCard ? 1.5 : 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setActiveCard(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
