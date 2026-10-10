import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f8fafd] px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto text-[#ea580c]">
          <Sun className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#ea580c] bg-orange-100/70 px-2.5 py-1 rounded border border-orange-200">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-[#091e3a] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            The page or product model you are looking for does not exist or may have been relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/">
            <Button variant="deye-primary" size="md" className="font-bold w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              <span>Return to Homepage</span>
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              <span>Explore Products</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
