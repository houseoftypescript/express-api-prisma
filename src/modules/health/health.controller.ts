import { Controller, Get, Route } from 'tsoa';
import { healthService } from './health.service';
import { HealthResponse } from './health.types';

@Route('/health')
export class HealthController extends Controller {
  @Get()
  getHealth(): HealthResponse {
    return healthService.getHealth();
  }
}
