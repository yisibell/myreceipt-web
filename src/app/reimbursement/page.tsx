"use client";

import { useReimbursementStore } from "@/stores/reimbursement-store";
import { StepUpload } from "@/components/reimbursement/step-upload";
import { StepAnalyzing } from "@/components/reimbursement/step-analyzing";
import { StepReview } from "@/components/reimbursement/step-review";
import { StepDownload } from "@/components/reimbursement/step-download";
import { Separator } from "@/components/ui/separator";

const STEPS = [
  { index: 1, label: "上传文件" },
  { index: 2, label: "AI 分析" },
  { index: 3, label: "预览编辑" },
  { index: 4, label: "导出下载" },
];

export default function ReimbursementPage() {
  const { step } = useReimbursementStore();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      {/* Step indicator */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">报销单处理</h2>
        <div className="flex items-center gap-2 overflow-x-auto">
          {STEPS.map((s, i) => (
            <div key={s.index} className="flex items-center gap-2 whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                    step >= s.index
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.index ? "✓" : s.index}
                </span>
                <span
                  className={`text-sm ${
                    step === s.index
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <Separator className="w-8" orientation="horizontal" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      {step === 1 && <StepUpload />}
      {step === 2 && <StepAnalyzing />}
      {step === 3 && <StepReview />}
      {step === 4 && <StepDownload />}
    </main>
  );
}
