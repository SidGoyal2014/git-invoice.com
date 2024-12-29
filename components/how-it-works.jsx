import { GitBranch, GitPullRequest, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 pl-4">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Streamlined Process
          </motion.h2>
          <motion.p
            className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Generate professional invoices from your GitHub contributions in
            three simple steps
          </motion.p>
        </div>

        <div className="mx-auto max-w-3xl md:max-w-5xl relative">
          {/* Vertical line for mobile only */}
          <div className="absolute left-[34px] top-0 h-full w-0.5 bg-orange-200 md:hidden"></div>

          <div className="space-y-12 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
            {[
              {
                icon: GitBranch,
                title: "GitHub Authentication",
                description:
                  "Securely connect your GitHub account with one click. No complex setup required.",
              },
              {
                icon: GitPullRequest,
                title: "Select Contributions",
                description:
                  "Choose repositories, pull requests, and commits to include in your professional invoice.",
              },
              {
                icon: FileText,
                title: "Generate Invoice",
                description:
                  "Instantly create detailed, professional invoices ready for submission to clients.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative flex md:flex-col items-start md:items-center text-left md:text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              >
                {/* Number Badge */}
                <div className="absolute -left-3 top-0 rounded-full bg-orange-600 text-white w-6 h-6 flex items-center justify-center font-bold text-sm md:relative md:top-auto md:left-auto md:-mt-10 md:mb-2 md:w-8 md:h-8 animate-pulse">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 md:mb-4 md:w-20 md:h-20 shrink-0">
                  <step.icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>

                {/* Text */}
                <div className="ml-4 md:ml-0">
                  <h3 className="text-xl font-bold mb-2 tracking-tight ">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
