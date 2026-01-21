import { Destination, DestinationSource } from './destination.schema';

export interface ExternalPlacesProvider {
    fetchDestination(cityName: string): Promise<Partial<Destination> | null>;
}

export class MockPlacesProvider implements ExternalPlacesProvider {
    async fetchDestination(cityName: string): Promise<Partial<Destination> | null> {
        const normalizedCity = cityName.toLowerCase();

        if (normalizedCity === 'paris') {
            return {
                cityName: 'Paris',
                description: 'The City of Light.',
                coordinates: { lat: 48.8566, lng: 2.3522 },
                pois: [
                    {
                        name: 'Eiffel Tower',
                        type: 'landmark',
                        coordinates: { lat: 48.8584, lng: 2.2945 },
                    },
                    {
                        name: 'Louvre Museum',
                        type: 'museum',
                        coordinates: { lat: 48.8606, lng: 2.3376 },
                    },
                ],
                source: DestinationSource.EXTERNAL,
                providerId: 'mock-paris-001',
            };
        }

        if (normalizedCity === 'london') {
            return {
                cityName: 'London',
                description: 'Capital of England.',
                coordinates: { lat: 51.5074, lng: -0.1278 },
                pois: [
                    {
                        name: 'Big Ben',
                        type: 'landmark',
                        coordinates: { lat: 51.5007, lng: -0.1246 },
                    },
                ],
                source: DestinationSource.EXTERNAL,
                providerId: 'mock-london-002',
            };
        }

        return null;
    }
}
