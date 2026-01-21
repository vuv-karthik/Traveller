from fastapi import FastAPI, HTTPException
from models import TripRequest, TripResponse
from generator import ItineraryGenerator
import uvicorn
import os

app = FastAPI(title="Traveller AI Engine")
generator = ItineraryGenerator()

@app.post("/generate", response_model=TripResponse)
async def generate_trip(request: TripRequest):
    try:
        response = await generator.generate_itinerary(
            city=request.city,
            days=request.days,
            budget=request.budget,
            user_prompt=request.user_prompt
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
