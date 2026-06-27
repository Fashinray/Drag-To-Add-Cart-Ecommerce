"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.5)" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        style={{
          backgroundColor: "var(--color-surface-container-lowest)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-overlay)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        className={cn(
          "relative w-full max-w-lg",
          "flex flex-col",
          className
        )}
      >
        {/* Header */}
        {title && (
          <div
            className="flex items-center justify-between p-6"
            style={{ borderBottom: "1px solid var(--color-surface-variant)" }}
          >
            <h2
              style={{
                fontSize: "var(--text-headline-sm)",
                color: "var(--color-on-surface)",
                fontWeight: 600,
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full transition-colors duration-200 hover:opacity-80"
              style={{
                color: "var(--color-on-surface-variant)",
                backgroundColor: "var(--color-surface-container)",
              }}
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}