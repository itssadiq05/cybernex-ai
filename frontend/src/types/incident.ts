import { ThreatSeverity } from './log';

export type IncidentStatus = 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'FALSE_POSITIVE';

export interface SecurityIncident {
  id: string;
  incident_number: string;
  title: string;
  severity: ThreatSeverity;
  status: IncidentStatus;
  category: string;
  affected_endpoint: string;
  source_ip: string;
  confidence_score: number;
  summary: string;
  ai_remediation_steps: string[];
  created_at: string;
}
