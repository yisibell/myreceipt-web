"use client";

import { useReimbursementStore } from "@/stores/reimbursement-store";
import { FileUploadZone } from "./file-upload-zone";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

const IMAGE_ACCEPT = {
  "image/*": [".png", ".jpg", ".jpeg", ".webp", ".bmp"],
};

const EXCEL_ACCEPT = {
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
};

const ZIP_ACCEPT = {
  "application/zip": [".zip"],
};

const TABS = [
  { key: "manual" as const, label: "分步上传" },
  { key: "zip" as const, label: "ZIP 打包上传" },
];

export function StepUpload() {
  const {
    mode,
    setMode,
    images,
    setImages,
    template,
    setTemplate,
    zipfile,
    setZipfile,
    analyze,
    error,
  } = useReimbursementStore();

  const canSubmit =
    (mode === "manual" && template && images.length > 0) ||
    (mode === "zip" && zipfile);

  return (
    <div className="space-y-6">
      {/* Tab switcher — simple buttons, no library dependency */}
      <div className="inline-flex w-full rounded-lg bg-muted p-1" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={mode === tab.key}
            onClick={() => setMode(tab.key)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              mode === tab.key
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel: 分步上传 */}
      {mode === "manual" && (
        <div className="space-y-4">
          <FileUploadZone
            accept={EXCEL_ACCEPT}
            maxFiles={1}
            files={template ? [template] : []}
            onChange={(fs) => setTemplate(fs[0] || null)}
            label="上传 Excel 模板"
            hint="拖拽或点击上传 .xlsx 模板文件"
          />
          <FileUploadZone
            accept={IMAGE_ACCEPT}
            maxFiles={50}
            files={images}
            onChange={setImages}
            label="上传发票图片"
            hint="支持 jpg / png / webp / bmp，最多 50 张"
          />
        </div>
      )}

      {/* Panel: ZIP 上传 */}
      {mode === "zip" && (
        <div className="space-y-4">
          <FileUploadZone
            accept={ZIP_ACCEPT}
            maxFiles={1}
            files={zipfile ? [zipfile] : []}
            onChange={(fs) => setZipfile(fs[0] || null)}
            label="上传 ZIP 压缩包"
            hint="包含模板 .xlsx + 发票图片的 ZIP 文件"
          />
        </div>
      )}

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={() => analyze()} disabled={!canSubmit} size="lg">
          开始分析
        </Button>
      </div>
    </div>
  );
}
