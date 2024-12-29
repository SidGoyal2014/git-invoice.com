import Link from "next/link";
import { DocumentIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-600 py-16  border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <DocumentIcon className="w-10 h-10  text-primary" />
              <span className="text-2xl font-bold text-black">Git Invoice</span>
            </div>
            <p className="text-sm text-gray-500 max-w-md">
              Simplify your GitHub contributions invoicing process. Generate
              professional invoices from your GitHub activity with ease.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Company</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/legal"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/blog/blog"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/legal"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
