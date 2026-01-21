import os
import logging
from models import TripResponse, ItineraryDay, ItineraryItem
from errors import AIOutputValidationError

# Configure logger
logger = logging.getLogger(__name__)

class ItineraryGenerator:
    def __init__(self):
        self.mode = os.getenv("AI_MODE", "MOCK")

    async def generate_itinerary(self, city: str, days: int, budget: float = None, user_prompt: str = None) -> TripResponse:
        if self.mode == "MOCK":
            return self._generate_mock(city, days, budget)
        
        # Governance Guard: Execute retry logic ONLY if NOT in MOCK mode
        return await self._generate_with_retry(city, days, budget, user_prompt)

    async def _generate_with_retry(self, city: str, days: int, budget: float, user_prompt: str) -> TripResponse:
        """
        Governance-Critical: Skeleton for retry logic.
        Attempt to generate and parse. If parse fails, retry once with corrective prompt.
        """
        try:
            # 1. First Attempt
            raw_output = await self._call_llm(self._construct_prompt(city, days, budget, user_prompt))
            return self._parse_to_model(raw_output)
        except AIOutputValidationError as e:
            logger.warning(f"Initial JSON parse failed: {e}. Retrying once...")
            
            # 2. Retry Attempt
            # In a real implementation, we would append the error to the chat history and ask to fix.
            try:
                raw_output_retry = await self._call_llm(self._construct_retry_prompt(e.original_output, str(e)))
                return self._parse_to_model(raw_output_retry)
            except AIOutputValidationError as retry_error:
                logger.error("Retry attempt failed.")
                raise retry_error

    async def _call_llm(self, prompt: str) -> str:
        """
        Placeholder for actual LLM call.
        Accessing live LLMs is currently BLOCKED by governance until robust testing is in place.
        """
        # In the future, this will call Gemini/OpenAI
        raise NotImplementedError("Live LLM integration is currently BLOCKED via governance compliance.")

    def _construct_prompt(self, city: str, days: int, budget: float, user_prompt: str) -> str:
        return f"Generate trip for {city}, {days} days..."

    def _construct_retry_prompt(self, wrong_json: str, error_msg: str) -> str:
        return f"The previous JSON was invalid. Error: {error_msg}. Fix it."

    def _parse_to_model(self, raw_json: str) -> TripResponse:
        """
        Parses raw JSON string to TripResponse model.
        Raises AIOutputValidationError if parsing fails.
        """
        # Placeholder logic
        # try:
        #     return TripResponse.model_validate_json(raw_json)
        # except Exception as e:
        #     raise AIOutputValidationError(f"Schema Validation Failed: {e}", original_output=raw_json)
        raise NotImplementedError("Parsing logic pending LLM integration")

    
    def _generate_mock(self, city: str, days: int, budget: float = None) -> TripResponse:
        # Static mock response for verification - UPDATED with coordinates for Module 6
        # Sample coordinates for popular cities (will be city-specific in real implementation)
        city_coords = {
            "paris": {"lat": 48.8566, "lng": 2.3522},
            "london": {"lat": 51.5074, "lng": -0.1278},
            "new york": {"lat": 40.7128, "lng": -74.0060},
        }
        
        base_coords = city_coords.get(city.lower(), {"lat": 0.0, "lng": 0.0})
        
        itinerary = []
        for i in range(1, days + 1):
            # Generate slightly offset coordinates for each POI
            day_plan = ItineraryDay(
                day=i,
                theme=f"Exploring {city} - Day {i}",
                places=[
                    ItineraryItem(
                        name=f"Popular Spot {i}-A",
                        type="landmark",
                        coordinates={"lat": base_coords["lat"] + (i * 0.01), "lng": base_coords["lng"] + (i * 0.01)},
                        notes=f"Must visit spot in {city}"
                    ),
                    ItineraryItem(
                        name=f"Local Cafe {i}-B",
                        type="food",
                        coordinates={"lat": base_coords["lat"] + (i * 0.01) + 0.005, "lng": base_coords["lng"] + (i * 0.01) - 0.005},
                        notes="Great local coffee"
                    )
                ]
            )
            itinerary.append(day_plan)

        return TripResponse(
            city=city,
            days=days,
            itinerary=itinerary,
            estimatedBudget=budget or 1000.0
        )
