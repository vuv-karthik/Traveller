import { Injectable, Inject, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Destination, DestinationDocument, DestinationSource } from './destination.schema';
import type { ExternalPlacesProvider } from './external-places.provider';

@Injectable()
export class DestinationService {
    private readonly logger = new Logger(DestinationService.name);

    constructor(
        @InjectModel(Destination.name)
        private destinationModel: Model<DestinationDocument>,
        @Inject('ExternalPlacesProvider')
        private externalPlacesProvider: ExternalPlacesProvider,
    ) { }

    async findOne(cityName: string): Promise<Destination> {
        this.logger.log(`Fetching destination info for: ${cityName}`);

        // 1. Check Cache (MongoDB)
        const cachedDestination = await this.destinationModel.findOne({
            cityName: { $regex: new RegExp(`^${cityName}$`, 'i') }
        }).exec();
        if (cachedDestination) {
            this.logger.log(`Cache Hit for ${cityName}`);
            return cachedDestination;
        }

        this.logger.log(`Cache Miss for ${cityName}. Fetching from external provider...`);

        // 2. Fetch from External Provider
        const normalizedCity = cityName.toLowerCase(); // Simple normalization for now
        // TODO: In a real scenario, we might want more robust normalization
        // Here we pass the original input, or the simple normalized one, depending on provider expectation.
        // For our mock, we can pass normalized or original. Let's pass normalized for consistency with mock implementation.
        // Actually, the mock expects 'paris' or 'london'. Let's ensure we pass something reasonable.
        // Best practice: Provider handles normalization logic. We pass raw.
        // However, we want to store it with a consistent name (e.g., Title Case).
        // Let's rely on the provider returning a normalized object.

        const externalData = await this.externalPlacesProvider.fetchDestination(cityName);

        if (!externalData) {
            this.logger.warn(`Destination ${cityName} not found in external provider.`);
            throw new NotFoundException(`Destination ${cityName} not found`);
        }

        // 3. Persist to MongoDB (Caching)
        // Ensure we're not inserting duplicates (although findOne should have caught it, race conditions exist)
        // For this module, simple create is fine.
        const createdDestination = new this.destinationModel(externalData);
        await createdDestination.save();

        this.logger.log(`Cached result for ${cityName}`);
        return createdDestination;
    }
}
