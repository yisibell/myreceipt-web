"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FileAnalysisResult } from "@/api/modules/reimbursement";

const TYPE_VARIANTS: Record<string, "default" | "secondary" | "outline"> = {
  支付凭证: "default",
  打车支付凭证: "secondary",
  发票: "outline",
  打车发票: "secondary",
  打车行程单: "outline",
};

interface Props {
  file: FileAnalysisResult;
  onChange: (file: FileAnalysisResult) => void;
}

export function FileAnalysisCard({ file, onChange }: Props) {
  function update<K extends keyof FileAnalysisResult>(
    key: K,
    value: FileAnalysisResult[K]
  ) {
    onChange({ ...file, [key]: value });
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">#{file.fileIndex + 1}</CardTitle>
          <Badge variant={TYPE_VARIANTS[file.type] || "default"}>
            {file.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">月份</Label>
          <Input
            value={file.month}
            onChange={(e) => update("month", e.target.value)}
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">日期（日）</Label>
          <Input
            value={file.day}
            onChange={(e) => update("day", e.target.value)}
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">金额</Label>
          <Input
            type="number"
            value={file.amount}
            onChange={(e) => update("amount", Number(e.target.value))}
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">类别</Label>
          <Input
            value={file.category}
            onChange={(e) => update("category", e.target.value)}
            className="h-8 text-sm"
          />
        </div>
        <div className="col-span-2 space-y-1">
          <Label className="text-xs">商户</Label>
          <Input
            value={file.merchant}
            onChange={(e) => update("merchant", e.target.value)}
            className="h-8 text-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
}
