import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { BudgetService } from '../src/budget/budget.service';
import { TransportMode, CityTier } from '../src/budget/budget.constants';

async function bootstrap() {
    try {
        console.log('Initializing NestJS application context...');
        const app = await NestFactory.createApplicationContext(AppModule);
        const budgetService = app.get(BudgetService);

        // Test 1: Tier 1 City - Paris, 5 days, Flight
        console.log('--- Test 1: Paris (Tier 1), 5 days, Flight ---');
        const estimate1 = budgetService.estimate({
            cityName: 'Paris',
            numberOfDays: 5,
            transportMode: TransportMode.FLIGHT,
        });
        console.log('Result:', JSON.stringify(estimate1, null, 2));

        if (estimate1.tier !== CityTier.TIER_1) {
            throw new Error('Test 1 Failed: Expected TIER_1');
        }
        if (estimate1.totalEstimate !== (200 * 5) + 300) { // 200/day * 5 + 300 flight
            throw new Error(`Test 1 Failed: Expected ${(200 * 5) + 300}, got ${estimate1.totalEstimate}`);
        }

        // Test 2: Tier 2 City (Unknown) - "Random City", 3 days, Bus
        console.log('--- Test 2: Random City (Default to Tier 2), 3 days, Bus ---');
        const estimate2 = budgetService.estimate({
            cityName: 'Random City',
            numberOfDays: 3,
            transportMode: TransportMode.BUS,
        });
        console.log('Result:', JSON.stringify(estimate2, null, 2));

        if (estimate2.tier !== CityTier.TIER_2) {
            throw new Error('Test 2 Failed: Expected default TIER_2');
        }
        if (estimate2.totalEstimate !== (120 * 3) + 50) { // 120/day * 3 + 50 bus
            throw new Error(`Test 2 Failed: Expected ${(120 * 3) + 50}, got ${estimate2.totalEstimate}`);
        }

        // Test 3: Tier 3 City - Bali, 7 days, Train (Hypothetical)
        console.log('--- Test 3: Bali (Tier 3), 7 days, Train ---');
        const estimate3 = budgetService.estimate({
            cityName: 'Bali',
            numberOfDays: 7,
            transportMode: TransportMode.TRAIN,
        });
        console.log('Result:', JSON.stringify(estimate3, null, 2));
        if (estimate3.tier !== CityTier.TIER_3) {
            throw new Error('Test 3 Failed: Expected TIER_3');
        }
        if (estimate3.totalEstimate !== (80 * 7) + 100) { // 80/day * 7 + 100 train
            throw new Error(`Test 3 Failed: Expected ${(80 * 7) + 100}, got ${estimate3.totalEstimate}`);
        }

        console.log('SUCCESS: Budget Estimation Module Verified');
        await app.close();
        process.exit(0);

    } catch (error) {
        console.error('ERROR: Verification Failed', error);
        process.exit(1);
    }
}

bootstrap();
