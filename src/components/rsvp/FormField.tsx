import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

export default function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-label text-slate-500 uppercase">
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="text-body-sm text-red-400 pl-1"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
