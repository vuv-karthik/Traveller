import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { Trip, TripSchema } from './trip.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }])],
    controllers: [TripController],
    providers: [TripService],
    exports: [TripService],
})
export class TripModule { }
