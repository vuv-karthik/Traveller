from pydantic import BaseModel, Field
from typing import List, Optional

class ItineraryItem(BaseModel):
    name: str = Field(..., description="Name of the place or activity")
    type: str = Field(..., description="Type of place (e.g., landmark, restaurant)")
    coordinates: Optional[dict] = Field(None, description="{lat, lng} if available")
    notes: Optional[str] = Field(None, description="Why this place was chosen")

class ItineraryDay(BaseModel):
    day: int = Field(..., description="Day number (1-based)")
    theme: Optional[str] = Field(None, description="Theme of the day")
    places: List[ItineraryItem] = Field(default_factory=list)

class TripResponse(BaseModel):
    city: str = Field(..., description="Destination city name")
    days: int = Field(..., description="Number of days")
    itinerary: List[ItineraryDay] = Field(..., description="Daily itinerary")
    estimatedBudget: Optional[float] = Field(None, description="Total estimated budget")

class TripRequest(BaseModel):
    city: str
    days: int
    budget: Optional[float] = None
    user_prompt: Optional[str] = None
