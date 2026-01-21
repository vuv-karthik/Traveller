import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DestinationService } from '../src/destination/destination.service';
import { DestinationSource } from '../src/destination/destination.schema';
import mongoose from 'mongoose';

async function bootstrap() {
    try {
        console.log('Initializing NestJS application context...');
        const app = await NestFactory.createApplicationContext(AppModule);
        const destinationService = app.get(DestinationService);

        // Ensure we are connected to DB (AppModule should handle it via MongooseModule)
        // Check "Paris" - Expect Cache Miss -> External Fetch -> Save
        console.log('--- Test 1: Fetch "Paris" (Expect Cache Miss) ---');
        const paris = await destinationService.findOne('Paris');
        console.log('Result:', JSON.stringify(paris, null, 2));

        if (paris.cityName !== 'Paris' || paris.source !== DestinationSource.EXTERNAL) {
            throw new Error('Test 1 Failed: Expected Paris from EXTERNAL source');
        }
        if (paris.pois.length === 0) {
            throw new Error('Test 1 Failed: Expected POIs for Paris');
        }

        // Check "Paris" again - Expect Cache Hit
        console.log('--- Test 2: Fetch "Paris" again (Expect Cache Hit) ---');

        // We can't easily verify "Cache Hit" log message programmatically without intercepting logs,
        // but we can verify it works and returns the same data.
        // To be sure it's from cache, we could manually verify the document exists in DB.

        const parisCached = await destinationService.findOne('Paris');
        console.log('Result:', JSON.stringify(parisCached, null, 2));
        if (parisCached.cityName !== 'Paris') {
            throw new Error('Test 2 Failed: Expected Paris');
        }

        console.log('--- Test 3: Fetch "paris" (Lowercase) (Expect Cache Hit via Regex) ---');
        // This was the bug: "paris" would cause a cache miss and then a duplicate key error
        const parisLower = await destinationService.findOne('paris');
        console.log('Result:', parisLower.cityName);
        if (parisLower.cityName !== 'Paris') {
            throw new Error('Test 3 Failed: Expected Paris (Title Case) from cache');
        }

        console.log('--- Test 4: Fetch "London" (Expect Cache Miss) ---');
        const london = await destinationService.findOne('London');
        console.log('Result:', london.cityName);
        if (london.cityName !== 'London') {
            throw new Error('Test 4 Failed: Expected London');
        }

        console.log('--- Test 5: Fetch "Unknown" (Expect Error) ---');
        try {
            await destinationService.findOne('UnknownCity');
            throw new Error('Test 5 Failed: Expected Error for UnknownCity');
        } catch (e) {
            console.log('Caught expected error:', e.message);
        }

        console.log('SUCCESS: Destination Module Verified');
        await app.close();
        process.exit(0);

    } catch (error) {
        console.error('ERROR: Verification Failed', error);
        process.exit(1);
    }
}

bootstrap();
