export class CreateTripDto {
    userId: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    status: 'DRAFT' | 'PLANNED' | 'COMPLETED';
    activities: any[];
}
