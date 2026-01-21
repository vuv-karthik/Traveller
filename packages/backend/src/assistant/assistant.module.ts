import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from '../trip/trip.schema';
import { AssistantController } from './assistant.controller';
import { AIAssistantService } from './assistant.service';
import { AIEngineClient } from './ai-client.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    ],
    controllers: [AssistantController],
    providers: [AIAssistantService, AIEngineClient],
})
export class AssistantModule { }
