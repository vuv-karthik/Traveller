import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip, TripDocument } from './trip.schema';

@Injectable()
export class TripService {
    constructor(
        @InjectModel(Trip.name)
        private tripModel: Model<TripDocument>,
    ) { }

    async create(createTripDto: CreateTripDto): Promise<Trip> {
        const trip = new this.tripModel(createTripDto);
        return trip.save();
    }

    async findAll(userId: string): Promise<Trip[]> {
        return this.tripModel.find({ userId }).exec();
    }

    async findOne(id: string): Promise<Trip> {
        const trip = await this.tripModel.findById(id).exec();
        if (!trip) {
            throw new NotFoundException(`Trip with ID ${id} not found`);
        }
        return trip;
    }

    async update(id: string, updateTripDto: UpdateTripDto): Promise<Trip> {
        const trip = await this.tripModel.findByIdAndUpdate(id, updateTripDto, { new: true }).exec();
        if (!trip) {
            throw new NotFoundException(`Trip with ID ${id} not found`);
        }
        return trip;
    }

    async remove(id: string): Promise<void> {
        const result = await this.tripModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Trip with ID ${id} not found`);
        }
    }
}
