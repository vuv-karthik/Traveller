import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AIAssistantService } from './assistant.service';
import { GenerateTripDto } from './dto/generate-trip.dto';

@Controller('assistant')
export class AssistantController {
    constructor(private readonly assistantService: AIAssistantService) { }

    @Post('generate')
    @HttpCode(HttpStatus.CREATED)
    async generateTrip(@Body() generateTripDto: GenerateTripDto) {
        return this.assistantService.generateAndSaveTrip(generateTripDto);
    }
}
