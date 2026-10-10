"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductEditorForm } from "@/components/admin/ProductEditorForm";
import { Product } from "@/lib/data/products";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { authFetch } from "@/lib/auth/client";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await authFetch(`/api/admin/products/${id}`);
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
        } else {
          setError(data.message || "Product not found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <Loader2 className="w-9 h-9 animate-spin text-[#ea580c] mb-3" />
        <p className="text-xs font-semibold">Loading product specifications...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-[#091e3a]">Unable to Load Product</h2>
        <p className="text-xs text-gray-600">{error || "Product not found"}</p>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#091e3a] hover:bg-[#07172c] text-white font-bold text-xs transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
        </Link>
      </div>
    );
  }

  return <ProductEditorForm initialProduct={product} isNew={false} />;
}
