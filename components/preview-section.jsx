import Image from "next/image"
import { ArrowDown, ArrowRight } from 'lucide-react'

export default function PreviewSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32  flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Generate professional invoices from your GitHub contributions in minutes
          </p>
        </div>
        <div className="flex items-center justify-center pt-4 animate-bounce">
              <ArrowDown className="h-6 w-6 text-orange-600" />
            </div>

        <div className="mx-auto max-w-5xl mt-12">
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 animate-pulse ">
                    1
                  </div>
                  Select Your Repository
                </div>
                <p className="text-muted-foreground ">
                  Choose the GitHub repository you want to generate an invoice for.
                </p>
              </div>
              <div className="flex-1">
                <div className="overflow-hidden rounded-lg border bg-background shadow-sm border-primary">
                  <Image
                    src="/sc1.PNG"
                    alt="Select repository interface showing a list of GitHub repositories"
                    width={1280}
                    height={720}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center justify-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 animate-pulse ">
                    2
                  </div>
                  Select Contributions
                </div>
                <p className="text-muted-foreground">
                  Choose which pull requests and commits to include. 
                </p>
              </div>
              <div className="flex-1">
                <div className="overflow-hidden rounded-lg border bg-background shadow-sm border-primary">
                  <Image
                    src="/sc2.PNG"
                    alt="Interface showing pull requests and commits selection"
                    width={1600}
                    height={900}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center border-primary">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 animate-pulse ">
                    3
                  </div>
                  Track Your Time
                </div>
                <p className="text-muted-foreground">
                  Easily add the hours spent on each contribution. 
                </p>
              </div>
              <div className="flex-1">
                <div className="overflow-hidden rounded-lg border bg-background shadow-sm border-primary">
                  <Image
                    src="/sc3.PNG"
                    alt="Time tracking interface for GitHub contributions"
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center justify-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 animate-pulse ">
                    4
                  </div>
                  Add Client Information & Generate
                </div>
                <p className="text-muted-foreground">
                  Fill in your client's details and hit generate. Your professional invoice will be ready instantly, including all your selected contributions and time tracking data.
                </p>
              </div>
              <div className="flex-1">
                <div className="overflow-hidden rounded-lg border bg-background shadow-sm border-primary">
                  <Image
                    src="/sc4.PNG"
                    alt="Client information form and invoice generation interface"
                    width={1400}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
