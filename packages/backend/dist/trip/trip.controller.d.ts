import { TripService } from './trip.service';
import { Trip } from './trip.schema';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripController {
    private readonly tripService;
    constructor(tripService: TripService);
    create(createTripDto: CreateTripDto): Promise<Trip>;
    findAll(userId: string): Promise<Trip[]>;
    findOne(id: string): Promise<Trip>;
    update(id: string, updateTripDto: UpdateTripDto): Promise<Trip>;
    remove(id: string): Promise<void>;
}
