import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip, TripDocument, TripStatus } from '../trip/trip.schema';
import { AIEngineClient } from './ai-client.service';
import { GenerateTripDto } from './dto/generate-trip.dto';

@Injectable()
export class AIAssistantService {
    private readonly logger = new Logger(AIAssistantService.name);

    constructor(
        @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
        private aiEngineClient: AIEngineClient,
    ) { }

    async generateAndSaveTrip(dto: GenerateTripDto): Promise<TripDocument> {
        this.logger.log(`Orchestrating trip generation for ${dto.city}`);

        // 1. Call AI Engine
        const aiResponse = await this.aiEngineClient.generateTrip(
            dto.city,
            dto.days,
            dto.budget,
            dto.userPrompt,
        );

        // 2. Validate Response Shape (Basic check, Pydantic on Python side does heavy lifting)
        if (!aiResponse || !aiResponse.itinerary || !Array.isArray(aiResponse.itinerary)) {
            this.logger.error('Invalid response from AI Engine');
            throw new Error('Invalid response from AI Engine');
        }

        // 3. Persist to MongoDB
        const newTrip = new this.tripModel({
            userId: 'temp-user-id', // Placeholder - Auth not yet fully integrated for this flow
            destination: aiResponse.city,
            startDate: new Date(), // Placeholder
            endDate: new Date(new Date().setDate(new Date().getDate() + aiResponse.days)), // Placeholder
            budget: dto.budget || 0,
            aiEstimatedBudget: aiResponse.estimatedBudget,
            status: TripStatus.DRAFT,
            itinerary: aiResponse.itinerary,
        });

        const savedTrip = await newTrip.save();
        this.logger.log(`Trip saved with ID: ${savedTrip._id}`);

        return savedTrip;
    }
}
