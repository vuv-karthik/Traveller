export enum CityTier {
    TIER_1 = 'TIER_1', // Metro / Expensive
    TIER_2 = 'TIER_2', // Tourist / Moderate
    TIER_3 = 'TIER_3', // Budget / Small
}

// Map common cities to tiers. Default fallback is TIER_2.
export const CITY_TIER_MAPPING: Record<string, CityTier> = {
    'paris': CityTier.TIER_1,
    'london': CityTier.TIER_1,
    'new york': CityTier.TIER_1,
    'tokyo': CityTier.TIER_1,
    'dubai': CityTier.TIER_1,
    'singapore': CityTier.TIER_1,

    'rome': CityTier.TIER_2,
    'barcelona': CityTier.TIER_2,
    'amsterdam': CityTier.TIER_2,
    'bangkok': CityTier.TIER_2,
    'berlin': CityTier.TIER_2,

    'bali': CityTier.TIER_3,
    'goa': CityTier.TIER_3,
    'phuket': CityTier.TIER_3,
    'hanoi': CityTier.TIER_3,
};

// Daily cost per person (stay + food + local travel)
// Tunable constants
export const TIER_COSTS: Record<CityTier, number> = {
    [CityTier.TIER_1]: 200, // $200/day
    [CityTier.TIER_2]: 120, // $120/day
    [CityTier.TIER_3]: 80,  // $80/day
};

export enum TransportMode {
    FLIGHT = 'flight',
    TRAIN = 'train',
    BUS = 'bus',
}

// Baseline one-way transport cost
export const TRANSPORT_COSTS: Record<TransportMode, number> = {
    [TransportMode.FLIGHT]: 300,
    [TransportMode.TRAIN]: 100,
    [TransportMode.BUS]: 50,
};
