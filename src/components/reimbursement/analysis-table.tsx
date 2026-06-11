"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import type { ReimbursementAnalysis } from "@/api/modules/reimbursement";

interface Props {
  data: ReimbursementAnalysis;
  onChange: (data: ReimbursementAnalysis) => void;
}

// 列名包含这些关键词 → 日期列
const DATE_KEYWORDS = ["日期", "时间", "date", "time", "日", "创建", "更新"];

function isDateColumn(colName: string): boolean {
  const lower = colName.toLowerCase();
  return DATE_KEYWORDS.some((k) => lower.includes(k));
}

/** 将值转为 yyyy-MM-dd 供 <input type="date"> 使用 */
function toDateInputValue(v: unknown): string {
  if (!v) return "";
  const s = String(v).trim();
  // 尝试解析常见格式
  const d = new Date(s);
  if (isNaN(d.getTime())) {
    // 尝试 yyyy/MM/dd、MM/dd/yyyy 等
    const parts = s.split(/[-/]/);
    if (parts.length === 3) {
      const [a, b, c] = parts.map(Number);
      // 假设 yyyy-MM-dd 或 yyyy/MM/dd
      if (a > 1000) return `${a}-${String(b).padStart(2, "0")}-${String(c).padStart(2, "0")}`;
      // 假设 MM/dd/yyyy
      return `${c}-${String(a).padStart(2, "0")}-${String(b).padStart(2, "0")}`;
    }
    return s;
  }
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function AnalysisTable({ data, onChange }: Props) {
  const { columnMapping, rowsData } = data;

  const columns = Object.keys(columnMapping);
  const excelColumns = Object.values(columnMapping);

  function updateCell(rowIndex: number, col: string, value: unknown) {
    const newRows = rowsData.map((row, i) =>
      i === rowIndex ? { ...row, [col]: value } : row
    );
    onChange({ ...data, rowsData: newRows });
  }

  function deleteRow(rowIndex: number) {
    const newRows = rowsData.filter((_, i) => i !== rowIndex);
    onChange({ ...data, rowsData: newRows, dataEndRow: data.dataStartRow + newRows.length - 1 });
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            {columns.map((col) => (
              <TableHead key={col}>
                <div className="text-xs text-muted-foreground">
                  → {excelColumns[columns.indexOf(col)]}
                </div>
                {col}
              </TableHead>
            ))}
            <TableHead className="w-16">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowsData.map((row, ri) => (
            <TableRow key={ri}>
              <TableCell className="text-xs text-muted-foreground">
                {data.dataStartRow + ri}
              </TableCell>
              {columns.map((col) =>
                isDateColumn(col) ? (
                  <TableCell key={col}>
                    <input
                      type="date"
                      value={toDateInputValue(row[col])}
                      onChange={(e) => updateCell(ri, col, e.target.value)}
                      className="h-8 min-w-[130px] rounded-md border bg-background px-2 text-sm"
                    />
                  </TableCell>
                ) : (
                  <TableCell key={col}>
                    <Input
                      value={String(row[col] ?? "")}
                      onChange={(e) => updateCell(ri, col, e.target.value)}
                      className="h-8 min-w-[100px] text-sm"
                    />
                  </TableCell>
                )
              )}
              <TableCell>
                <button
                  onClick={() => deleteRow(ri)}
                  className="text-xs text-destructive hover:underline"
                >
                  删除
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rowsData.length === 0 && (
        <p className="p-4 text-center text-sm text-muted-foreground">暂无数据</p>
      )}
    </div>
  );
}
