import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { EstimateBudgetDto } from './dto/estimate-budget.dto';

@Controller('budget')
export class BudgetController {
    constructor(private readonly budgetService: BudgetService) { }

    @Post('estimate')
    @HttpCode(HttpStatus.OK)
    estimate(@Body() estimateBudgetDto: EstimateBudgetDto) {
        return this.budgetService.estimate(estimateBudgetDto);
    }
}
