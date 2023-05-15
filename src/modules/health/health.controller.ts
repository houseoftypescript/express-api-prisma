import { Controller, Get, Route, Tags } from 'tsoa';
import { healthService } from './health.service';
import { HealthResponse } from './health.types';

@Route('/health')
@Tags('Health')
export class HealthController extends Controller {
  @Get()
  getHealth(): HealthResponse {
    return healthService.getHealth();
  }
}
