import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import axios from 'axios';

async function bootstrap() {
    try {
        console.log('Testing AI Engine Connectivity...');

        // Ensure AI Engine is running at localhost:8000
        const aiEngineUrl = 'http://localhost:8000/generate';
        const payload = {
            city: 'Paris',
            days: 3,
            budget: 1500,
            user_prompt: 'Looking for a romantic trip'
        };

        console.log(`Making POST request to ${aiEngineUrl} with payload:`, JSON.stringify(payload, null, 2));

        const response = await axios.post(aiEngineUrl, payload);

        console.log('AI Engine Response Status:', response.status);
        console.log('AI Engine Response Data:', JSON.stringify(response.data, null, 2));

        if (response.status !== 200) {
            throw new Error(`Expected status 200, got ${response.status}`);
        }

        if (response.data.city !== 'Paris') {
            throw new Error(`Expected city "Paris", got "${response.data.city}"`);
        }

        if (response.data.days !== 3) {
            throw new Error(`Expected 3 days, got ${response.data.days}`);
        }

        if (!response.data.itinerary || !Array.isArray(response.data.itinerary)) {
            throw new Error('Expected "itinerary" as an array');
        }

        console.log('SUCCESS: AI Engine Connectivity Verified');
        process.exit(0);

    } catch (error) {
        console.error('ERROR: Verification Failed', error.message);
        if (error.response) {
            console.error('Response Data:', error.response.data);
        }
        process.exit(1);
    }
}

bootstrap();
