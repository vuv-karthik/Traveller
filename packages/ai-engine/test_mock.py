import asyncio
import unittest
from generator import ItineraryGenerator
from models import TripResponse

class TestMock(unittest.TestCase):
    def test_mock_generation(self):
        generator = ItineraryGenerator()
        generator.mode = "MOCK"
        
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        
        try:
            response = loop.run_until_complete(
                generator.generate_itinerary("Paris", 3, 1000.0, "prompt")
            )
            
            self.assertIsInstance(response, TripResponse)
            self.assertEqual(response.city, "Paris")
            self.assertEqual(response.days, 3)
            self.assertEqual(response.estimatedBudget, 1000.0)
            print("SUCCESS: Mock generation works with budget.")
            
        finally:
            loop.close()

if __name__ == "__main__":
    unittest.main()
