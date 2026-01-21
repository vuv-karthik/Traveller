import { Model } from 'mongoose';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip, TripDocument } from './trip.schema';
export declare class TripService {
    private tripModel;
    constructor(tripModel: Model<TripDocument>);
    create(createTripDto: CreateTripDto): Promise<Trip>;
    findAll(userId: string): Promise<Trip[]>;
    findOne(id: string): Promise<Trip>;
    update(id: string, updateTripDto: UpdateTripDto): Promise<Trip>;
    remove(id: string): Promise<void>;
}
