import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TripService } from './trip.service';
import { Trip } from './trip.schema';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

// Placeholder for AuthGuard until we verify the AuthModule is fully enforcing it
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('trips')
export class TripController {
    constructor(private readonly tripService: TripService) { }

    @Post()
    async create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
        return this.tripService.create(createTripDto);
    }

    @Get()
    async findAll(@Query('userId') userId: string): Promise<Trip[]> {
        return this.tripService.findAll(userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Trip> {
        return this.tripService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto): Promise<Trip> {
        return this.tripService.update(id, updateTripDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.tripService.remove(id);
    }
}
