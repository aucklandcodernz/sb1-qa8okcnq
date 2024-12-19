
import { checkDatabaseHealth } from '../../lib/utils/dbHealth';

export default async function handler(req, res) {
  const isHealthy = await checkDatabaseHealth();
  
  res.json({
    status: isHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString()
  });
}
