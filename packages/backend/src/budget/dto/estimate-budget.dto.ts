import { IsString, IsNotEmpty, IsInt, Min, IsEnum } from 'class-validator';
import { TransportMode } from '../budget.constants';

export class EstimateBudgetDto {
    @IsString()
    @IsNotEmpty()
    cityName: string;

    @IsInt()
    @Min(1)
    numberOfDays: number;

    @IsEnum(TransportMode)
    @IsNotEmpty()
    transportMode: TransportMode;
}
