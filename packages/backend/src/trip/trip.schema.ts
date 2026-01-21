import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TripDocument = Trip & Document;

export enum TripStatus {
    DRAFT = 'DRAFT',
    PLANNED = 'PLANNED',
    COMPLETED = 'COMPLETED',
}

@Schema({ timestamps: true })
export class Trip {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    destination: string;

    @Prop({ required: true, type: Date })
    startDate: Date;

    @Prop({ required: true, type: Date })
    endDate: Date;

    @Prop({ required: true, default: 0 })
    budget: number;

    @Prop({ type: String, enum: Object.values(TripStatus), default: TripStatus.DRAFT })
    status: TripStatus;

    @Prop({
        type: [{
            day: { type: Number, required: true },
            theme: { type: String },
            places: [{
                name: { type: String, required: true },
                type: { type: String, required: true },
                coordinates: { type: Object },
                notes: { type: String }
            }]
        }],
        default: []
    })
    itinerary: {
        day: number;
        theme?: string;
        places: {
            name: string;
            type: string;
            coordinates?: any;
            notes?: string;
        }[];
    }[];

    @Prop()
    aiEstimatedBudget?: number;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
