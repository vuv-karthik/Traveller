import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DestinationDocument = Destination & Document;

export enum DestinationSource {
    EXTERNAL = 'EXTERNAL',
    MANUAL = 'MANUAL',
}

@Schema({ timestamps: true })
export class Destination {
    @Prop({ required: true, unique: true, index: true })
    cityName: string;

    @Prop()
    description: string;

    @Prop({ type: Object })
    coordinates: {
        lat: number;
        lng: number;
    };

    @Prop({ type: [{ type: Object }], default: [] })
    pois: {
        name: string;
        type: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    }[];

    @Prop({ type: String, enum: Object.values(DestinationSource), required: true })
    source: DestinationSource;

    @Prop()
    providerId?: string;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
