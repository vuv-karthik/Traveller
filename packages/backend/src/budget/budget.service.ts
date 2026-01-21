import { Injectable, Logger } from '@nestjs/common';
import { EstimateBudgetDto } from './dto/estimate-budget.dto';
import { CITY_TIER_MAPPING, TIER_COSTS, TRANSPORT_COSTS, CityTier } from './budget.constants';

@Injectable()
export class BudgetService {
    private readonly logger = new Logger(BudgetService.name);

    estimate(dto: EstimateBudgetDto) {
        this.logger.log(`Estimating budget for ${dto.cityName}, ${dto.numberOfDays} days, via ${dto.transportMode}`);

        const normalizedCity = dto.cityName.toLowerCase();
        let tier = CITY_TIER_MAPPING[normalizedCity];

        if (!tier) {
            this.logger.warn(`City ${dto.cityName} not found in tier mapping. Defaulting to TIER_2.`);
            tier = CityTier.TIER_2;
        }

        const dailyCost = TIER_COSTS[tier];
        const stayCost = dailyCost * dto.numberOfDays;
        const transportCost = TRANSPORT_COSTS[dto.transportMode];
        const totalEstimate = stayCost + transportCost;

        return {
            cityName: dto.cityName,
            days: dto.numberOfDays,
            tier,
            stayCost,
            transportCost,
            totalEstimate,
            currency: 'USD',
            disclaimer: 'This is an MVP estimate based on static tier data. Actual costs may vary.',
        };
    }
}
