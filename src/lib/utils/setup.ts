
import { prisma } from '../db';
import { checkImplementationProgress } from './progress';

export async function setupDatabase() {
  try {
    // Test connection
    await prisma.$connect();
    console.log('Database connection successful');

    // Run migrations
    const { execSync } = require('child_process');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log('Migrations applied successfully');

    // Check progress
    const progress = await checkImplementationProgress();
    console.log('\nImplementation Progress:');
    progress.forEach(item => {
      console.log(`\n${item.feature}:`);
      console.log(`Status: ${item.status}`);
      console.log(`Details: ${item.details}`);
    });

    return true;
  } catch (error) {
    console.error('Setup failed:', error);
    return false;
  }
}
