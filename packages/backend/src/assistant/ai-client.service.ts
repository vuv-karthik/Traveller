import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AIEngineClient {
    private readonly logger = new Logger(AIEngineClient.name);
    private readonly axiosInstance: AxiosInstance;

    constructor(private configService: ConfigService) {
        const baseURL = this.configService.get<string>('AI_ENGINE_URL') || 'http://localhost:8000';
        this.logger.log(`Initializing AI Engine Client with URL: ${baseURL}`);

        this.axiosInstance = axios.create({
            baseURL,
            timeout: 60000, // 60 seconds timeout as advised
        });
    }

    async generateTrip(city: string, days: number, budget?: number, user_prompt?: string): Promise<any> {
        this.logger.log(`Calling AI Engine for city: ${city}, days: ${days}`);
        try {
            const response = await this.axiosInstance.post('/generate', {
                city,
                days,
                budget,
                user_prompt,
            });
            return response.data;
        } catch (error) {
            this.logger.error(`AI Engine call failed: ${error.message}`);
            if (error.response) {
                this.logger.error(`AI Engine response: ${JSON.stringify(error.response.data)}`);
            }
            throw new InternalServerErrorException('Failed to generate trip via AI Engine');
        }
    }
}
