import { HealthResponse } from './health.types';

class HealthService {
  getHealth(): HealthResponse {
    return { status: 'OK' };
  }
}

export const healthService = new HealthService();
