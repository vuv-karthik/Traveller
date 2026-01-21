# Module 2 Validation: Trip API Testing

## Prerequisites
- Backend running: http://localhost:3000
- PostgreSQL container: traveller_postgres (running)

## Test 1: Create Trip

```powershell
curl -X POST http://localhost:3000/trips `
  -H "Content-Type: application/json" `
  -d '{
    "userId": "test-user-123",
    "destination": "Paris",
    "startDate": "2026-03-01",
    "endDate": "2026-03-07",
    "budget": 100000,
    "preferences": {"interests": ["culture", "food"]},
    "itinerary": [
      {
        "day": 1,
        "date": "2026-03-01",
        "items": [
          {
            "placeId": "place1",
            "name": "Eiffel Tower",
            "type": "attraction",
            "startTime": "10:00",
            "endTime": "12:00",
            "cost": 2000
          }
        ]
      }
    ]
  }'
```

**Expected**: Returns Trip object with UUID `id`, status="DRAFT"

## Test 2: Get All Trips for User

```powershell
curl -X GET http://localhost:3000/trips `
  -H "Content-Type: application/json" `
  -d '{"userId": "test-user-123"}'
```

**Expected**: Array with Paris trip

## Test 3: Get Trip by ID

```powershell
# Replace {trip-id} with ID from Test 1
curl http://localhost:3000/trips/{trip-id}
```

**Expected**: Returns same trip with all details

## Test 4: Update Trip

```powershell
curl -X PUT http://localhost:3000/trips/{trip-id} `
  -H "Content-Type: application/json" `
  -d '{"budget": 150000, "status": "CONFIRMED"}'
```

**Expected**: Returns trip with updated budget and status

## Test 5: Database Persistence Check

1. Restart backend: `Ctrl+C` in backend terminal, then `npm run start:dev`
2. Run Test 2 again
3. **Expected**: Trip still exists after restart (proves database persistence)

## Validation Gate Criteria

- [x] Trip entity created with TypeORM
- [x] PostgreSQL container running
- [ ] POST /trips creates trip in database
- [ ] GET /trips/:id retrieves trip
- [ ] GET /trips filters by userId
- [ ] PUT /trips/:id updates trip
- [ ] Trip persists after server restart
- [ ] JSONB itinerary field works correctly

**Gate Status**: PENDING - Awaiting test execution
