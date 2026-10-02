export type ThreatSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export interface LogEvent {
  id: string;
  dataset_id: string;
  timestamp: string;
  source_ip: string;
  dest_ip: string;
  event_type: string;
  protocol: string;
  anomaly_score: number;
  is_anomaly: boolean;
  threat_category: string;
  threat_confidence: number;
  severity: ThreatSeverity;
  raw_payload: Record<string, any>;
}
