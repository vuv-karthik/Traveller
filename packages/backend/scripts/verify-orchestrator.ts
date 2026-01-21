import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { AIAssistantService } from '../src/assistant/assistant.service';

async function bootstrap() {
    try {
        console.log('Initializing NestJS application context...');
        const app = await NestFactory.createApplicationContext(AppModule);
        const assistantService = app.get(AIAssistantService);

        console.log('--- Test: Generate Trip via Orchestrator (Paris, 3 days) ---');
        // This will call the local AI Engine (mock) and save to MongoDB
        const trip = await assistantService.generateAndSaveTrip({
            city: 'Paris',
            days: 3,
            budget: 2000,
            userPrompt: 'Test Prompt'
        });

        console.log('Result Trip ID:', trip._id);
        console.log('Result Destination:', trip.destination);
        console.log('Result AI Estimated Budget:', trip.aiEstimatedBudget);
        console.log('Result Itinerary Length:', trip.itinerary.length);

        if (trip.destination !== 'Paris') {
            throw new Error('Test Failed: Expected Paris');
        }
        if (trip.itinerary.length !== 3) {
            throw new Error(`Test Failed: Expected 3 days, got ${trip.itinerary.length}`);
        }
        if (!trip.aiEstimatedBudget) {
            throw new Error('Test Failed: Expected AI Estimated Budget');
        }

        console.log('SUCCESS: Orchestrator Verified');
        await app.close();
        process.exit(0);

    } catch (error) {
        console.error('ERROR: Verification Failed', error);
        process.exit(1);
    }
}

bootstrap();
