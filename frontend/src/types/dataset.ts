export interface DatasetColumnStats {
  column_name: string;
  data_type: string;
  null_count: number;
  unique_count: number;
  mean?: number;
  min?: number;
  max?: number;
  top_categories?: Record<string, number>;
}

export interface Dataset {
  id: string;
  name: string;
  file_type: 'csv' | 'json' | 'txt';
  record_count: number;
  file_size_bytes: number;
  processed: boolean;
  columns: string[];
  column_stats?: DatasetColumnStats[];
  created_at: string;
}
