# Traveller AI Engine

This package is responsible for generating structured trip itineraries using LLMs.

## Governance & Compliance

**Status:** RESTRICTED
**Current Mode:** MOCK

### Governance Directives
1.  **Live LLM Usage:** Currently **BLOCKED**. Do not enable live API calls to OpenAI/Gemini until Phase 2 Audit approval.
2.  **Retry Logic:** A skeleton for retry logic (`_generate_with_retry`) has been implemented in `generator.py` to handle JSON malformations. This logic is strictly gated and will only activate when `AI_MODE != "MOCK"`.
3.  **Schema Enforcement:** All outputs must strictly validate against `models.TripResponse`.

## Development

- Run server: `python main.py`
- Default Port: 8000
