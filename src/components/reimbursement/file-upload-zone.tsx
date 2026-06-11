"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/utils/cn";

interface FileUploadZoneProps {
  accept: Record<string, string[]>;
  maxFiles?: number;
  files: File[];
  onChange: (files: File[]) => void;
  label: string;
  hint?: string;
  className?: string;
}

export function FileUploadZone({
  accept,
  maxFiles = 1,
  files,
  onChange,
  label,
  hint,
  className,
}: FileUploadZoneProps) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (maxFiles === 1) {
        onChange(accepted.slice(0, 1));
      } else {
        onChange([...files, ...accepted].slice(0, maxFiles));
      }
    },
    [files, maxFiles, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="text-2xl">📎</div>
      <p className="text-sm font-medium">{label}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {files.length > 0 && (
        <ul className="text-xs text-muted-foreground w-full text-center">
          {files.map((f, i) => (
            <li key={i} className="truncate">
              {f.name} ({(f.size / 1024).toFixed(0)} KB)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
