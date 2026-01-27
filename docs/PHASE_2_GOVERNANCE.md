# Phase 2 Governance Policy: Intelligence & Personalization

**Effective Date:** 2026-01-27  
**Enforcement:** Sentinel-Manager (Antigravity AI)  
**Status:** ACTIVE

---

## 1. Live LLM Enablement Gates

Live Large Language Model (LLM) integration is **RESTRICTED** until the following gates are cleared for each specific feature:

### 1.1 Security & Keys
- **Requirement:** API Keys must NEVER be committed to version control.
- **Implementation:** securely injected via environment variables (`.env` in local, Secrets Manager in prod).
- **Verification:** Automated secret scanning in CI pipeline.

### 1.2 Reliability & Safety
- **Retry Logic:** Exponential backoff must be implemented for all 4xx/5xx errors.
- **Fallbacks:** Graceful degradation to "Mock Mode" or static fallback content on API failure.
- **Grounding:** All factual generation (places, prices) must be grounded in retrieved data (RAG) or explicitly marked as "AI Estimate".

### 1.3 Auditability
- **Logging:** All LLM prompts and completion metadata (tokens, latency, model version) must be logged for analysis (excluding PII).

---

## 2. External API Approval Framework

Third-party integrations are limited to the **Approved Allowlist**.

| Service | Category | Status | Scope Limit |
|---------|----------|--------|-------------|
| **Google Maps** | Visualization | ✅ Approved | Read-only SDK usage |
| **OpenAI / Gemini** | Intelligence | ✅ Approved | Generation & Reasoning ONLY |
| **Amadeus / Duffel** | Transport | ⚠️ Phase 2 Pending | Flight search (Read-only) |
| **Stripe** | Payments | ⛔ BLOCKED | Phase 3 Scope |

**Process for New APIs:**
1. Submit usage justification.
2. Security review of data sharing.
3. Cost impact analysis.
4. Sentinel-Manager approval.

---

## 3. Cost Control Measures

To prevent runaway cloud costs during development and beta:

### 3.1 LLM Budget Caps
- **Daily Limit:** $5.00 USD (Soft Cap)
- **Monthly Limit:** $50.00 USD (Hard Cap)
- **Token Limits:** Max 2000 output tokens per request.

### 3.2 Alerts
- **Thresholds:** Notify team at 50% and 90% of daily budget.
- **Action:** Auto-suspend "Pro" features if monthly hard cap reached.

### 3.3 Caching Strategy
- **Requirement:** Aggressive caching for non-personalized queries (e.g., "Things to do in Paris").
- **TTL:** Minimum 24 hours for destination content.

---

## 4. Implementation Directives

- **Code Reviews:** Must explicitly verify no hardcoded secrets.
- **Feature Flags:** All Phase 2 features must be wrapped in `ENABLE_PHASE_2_FEATURES` flags.
- **Monitoring:** Dashboard required for "AI Success Rate" and "Latency".
