export interface ReimbursementAnalysis {
  headerRowIndex: number;
  columnMapping: Record<string, string>;
  rowsData: Record<string, unknown>[];
  dataStartRow: number;
  dataEndRow: number;
  summaryRowIndex: number;
  summaryColumns: string[];
  dateFormat: string;
}

export interface FileAnalysisResult {
  fileIndex: number;
  type: string;
  month: string;
  day: string;
  amount: number;
  merchant: string;
  category: string;
}

export interface AmountValidation {
  voucherIndex: number;
  invoiceIndex: number;
  voucherAmount: number;
  invoiceAmount: number;
  match: boolean;
  note: string;
}

export interface ZipAnalysisOutput extends ReimbursementAnalysis {
  fileAnalysis: FileAnalysisResult[];
  amountValidations: AmountValidation[];
}
