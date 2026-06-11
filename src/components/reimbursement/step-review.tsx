"use client";

import { useReimbursementStore } from "@/stores/reimbursement-store";
import { AnalysisTable } from "./analysis-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, ArrowLeft } from "lucide-react";
import type { ReimbursementAnalysis, ZipAnalysisOutput } from "@/api/modules/reimbursement";

export function StepReview() {
  const {
    mode,
    analysisResult,
    setStep,
    downloadResult,
    error,
  } = useReimbursementStore();

  if (!analysisResult) return null;

  const isZip = mode === "zip";
  const amountValidations = isZip
    ? (analysisResult as ZipAnalysisOutput).amountValidations
    : [];

  function handleTableChange(data: ReimbursementAnalysis) {
    if (!analysisResult) return;
    if (isZip) {
      useReimbursementStore.setState({
        analysisResult: { ...(analysisResult as ZipAnalysisOutput), ...data },
      });
    } else {
      useReimbursementStore.setState({ analysisResult: data });
    }
  }

  return (
    <div className="space-y-8">
      {/* ZIP: amount validation */}
      {isZip && amountValidations.length > 0 && (
        <section className="space-y-4">
          <h3 className="font-semibold">金额校验</h3>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">状态</TableHead>
                  <TableHead>凭证</TableHead>
                  <TableHead>发票</TableHead>
                  <TableHead>备注</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {amountValidations.map((v, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Badge variant={v.match ? "default" : "destructive"}>
                        {v.match ? "✓ 匹配" : "✗ 不匹配"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      #{v.voucherIndex + 1} (¥{v.voucherAmount})
                    </TableCell>
                    <TableCell>
                      {v.invoiceIndex >= 0
                        ? `#${v.invoiceIndex + 1} (¥${v.invoiceAmount})`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {v.note || "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      )}

      {/* Excel data table */}
      <section className="space-y-4">
        <h3 className="font-semibold">Excel 数据预览</h3>
        <AnalysisTable
          data={analysisResult as ReimbursementAnalysis}
          onChange={handleTableChange}
        />
      </section>

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(1)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> 返回上传
        </Button>
        <Button onClick={downloadResult} size="lg">
          <Download className="h-4 w-4 mr-1" /> 导出
        </Button>
      </div>
    </div>
  );
}
