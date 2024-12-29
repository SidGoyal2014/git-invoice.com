"use client";

import { AlertCircle } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="w-full bg-yellow-100 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0">
            <AlertCircle
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              This is a demo mode with popular GitHub repos. After login, you
              will see your own repos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
