import { Shield, Lock, Eye, Server } from "lucide-react";

export default function SecuritySection() {
  return (
    <section className="w-full py-12 md:py-24 bg-white flex justify-center bg-gradient-to-t from-white to-orange-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Security & Privacy
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Your data security is our top priority. We implement
            industry-standard measures to protect your information.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
          <div className="flex items-start gap-4">
            <Shield className="mt-1 h-6 w-6 text-[#FF6B2C]" />
            <div>
              <h3 className="font-bold">OAuth Security</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We use GitHub's secure OAuth flow for authentication, never
                storing your GitHub credentials.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Lock className="mt-1 h-6 w-6 text-[#FF6B2C]" />
            <div>
              <h3 className="font-bold">Data Encryption</h3>
              <p className="text-gray-500 dark:text-gray-400">
                All your data is encrypted in transit and at rest using
                industry-standard protocols.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Eye className="mt-1 h-6 w-6 text-[#FF6B2C]" />
            <div>
              <h3 className="font-bold">Limited Access</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We only access the GitHub data necessary for invoice generation,
                respecting your privacy.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Server className="mt-1 h-6 w-6 text-[#FF6B2C]" />
            <div>
              <h3 className="font-bold">No Input Data Stored</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We do not store any input data such as client information or
                hours worked, ensuring your privacy is respected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
