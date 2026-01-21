import { Controller, Get, Param } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { Destination } from './destination.schema';

@Controller('destinations')
export class DestinationController {
    constructor(private readonly destinationService: DestinationService) { }

    @Get(':cityName')
    async findOne(@Param('cityName') cityName: string): Promise<Destination> {
        return this.destinationService.findOne(cityName);
    }
}
