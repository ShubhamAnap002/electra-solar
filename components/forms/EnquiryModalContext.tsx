"use client";

import React, { createContext, useContext, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { QuoteForm } from "@/components/forms/QuoteForm";

export interface EnquiryModalOptions {
  productSlug?: string;
  productName?: string;
  source?: string;
}

interface EnquiryModalContextType {
  openEnquiryModal: (options?: string | EnquiryModalOptions) => void;
  closeEnquiryModal: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(undefined);

export function EnquiryModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);

  const openEnquiryModal = (options?: string | EnquiryModalOptions) => {
    if (typeof options === "string") {
      setSelectedProduct(options);
    } else if (options) {
      setSelectedProduct(options.productSlug || options.productName);
    } else {
      setSelectedProduct(undefined);
    }
    setIsOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsOpen(false);
    setSelectedProduct(undefined);
  };

  return (
    <EnquiryModalContext.Provider value={{ openEnquiryModal, closeEnquiryModal }}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={closeEnquiryModal}
        title="Request Official Quote & System Sizing"
        maxWidth="xl"
      >
        <p className="text-xs text-gray-500 mb-4 -mt-2">
          Official Distributor of EnerTech UPS Pvt. Ltd. Get verified factory pricing and sizing support.
        </p>
        <QuoteForm
          initialProductSlug={selectedProduct}
          onSuccess={() => {
            setTimeout(closeEnquiryModal, 4000);
          }}
        />
      </Modal>
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error("useEnquiryModal must be used within an EnquiryModalProvider");
  }
  return context;
}
