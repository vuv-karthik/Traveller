import unittest
from unittest.mock import MagicMock, AsyncMock
from generator import ItineraryGenerator
from errors import AIOutputValidationError
import asyncio

class TestGovernance(unittest.TestCase):
    def test_retry_logic_failure(self):
        """
        Governance test for LLM retry logic (inactive in MOCK mode).
        Simulates malformed LLM response and asserts retry is attempted exactly once
        and failure result is structured error.
        """
        print("\n--- Starting Governance Test: Retry Logic ---")
        
        # Setup
        generator = ItineraryGenerator()
        generator.mode = "TEST_GOVERNANCE" # Force enable retry path by bypassing "MOCK" check
        
        # Mocks
        # 1. Mock _call_llm to return "BAD_JSON" twice (Original attempt + Retry attempt)
        generator._call_llm = AsyncMock(side_effect=["BAD_JSON", "Still_BAD_JSON"])
        
        # 2. Mock _parse_to_model to raise Validation Error when it sees "BAD_JSON"
        def mock_parser(json_input):
            if "BAD_JSON" in json_input:
                raise AIOutputValidationError("Invalid JSON", original_output=json_input)
            return "SUCCESS"
            
        generator._parse_to_model = MagicMock(side_effect=mock_parser)
        
        # Execution
        # Since generate_itinerary is async, we need to run it in event loop
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        
        try:
            # We expect the final result to be a raised AIOutputValidationError after the retry fails
            with self.assertRaises(AIOutputValidationError) as cm:
                loop.run_until_complete(
                    generator.generate_itinerary("Paris", 3, 1000, "Test Prompt")
                )
            
            # Assertions
            # 1. Verify _call_llm attempted exactly twice (Original + 1 Retry)
            self.assertEqual(generator._call_llm.call_count, 2, "Expected exactly 2 LLM calls (1 initial + 1 retry)")
            print("ASSERTION PASSED: Retry counter == 1 (Total calls == 2)")

            # 2. Verify final failure is graceful and typed
            self.assertIsInstance(cm.exception, AIOutputValidationError)
            print("ASSERTION PASSED: Final failure is graceful and typed (AIOutputValidationError)")
            
            print("\nSUCCESS: Governance Test Passed - Retry logic behaves correctly.")
            
        finally:
            loop.close()

if __name__ == '__main__':
    unittest.main()
