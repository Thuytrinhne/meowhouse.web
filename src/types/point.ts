interface ExpiringPoint {
  amount: number;
  expires_at: string;
}

interface PointsSummary {
  total_points: number;
  available_points: number;
  expiring_points: ExpiringPoint[];
}
