import { HealthController } from '../health.controller';

describe('HealthController', () => {
  const healthController: HealthController = new HealthController();

  describe('/health', () => {
    it('should return status OK', async () => {
      const response = healthController.getHealth();
      expect(response).toEqual({ status: 'OK' });
    });
  });
});
