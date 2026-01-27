# Phase 1 UAT Plan

**Version**: 1.0  
**Date**: January 22, 2026  
**Lead**: UAT-Lead-Agent  

## 1. Objectives
Validate that the Traveller MVP (Phase 1) meets the core business requirements in a staging-like environment. Focus on the end-to-end user journey, data accuracy (mock), and system stability.

## 2. Environment
- **Backend Service**: NestJS running on localhost:3000
- **AI Engine**: Python FastAPI running on localhost:8000 (MOCK mode)
- **Database**: MongoDB (Local)
- **Frontend**: Flutter Mobile App (Android Emulator / iOS Simulator)

## 3. Test Scenarios

### Scenario 1: End-to-End Trip Planning (The "Happy Path")
**Goal**: User successfully plans a trip from start to finish.
- **Steps**:
  1. Open App -> Tap "Plan a Trip"
  2. Input: "Paris", 3 Days, Flight
  3. View Budget Estimate -> Verify calculation looks reasonable
  4. Tap "Generate Trip Plan" -> Wait for AI processing
  5. View Dashboard -> Check Day 1/2/3 itinerary
  6. Tap "View on Map" -> Verify markers exist in Paris

### Scenario 2: Error Handling & Validation
**Goal**: System handles invalid input gracefully.
- **Steps**:
  1. Try submitting empty form
  2. Try entering 0 days or negative days
  3. Simulate Network Error (Stop backend) -> Retry generation

### Scenario 3: Map Visualization
**Goal**: Map interaction is intuitive.
- **Steps**:
  1. Zoom in/out on Map
  2. Tap markers to see details
  3. Verify "Show all places" resets view

## 4. Testers
- **Internal User A (Dev)**: Verifies technical correctness.
- **Internal User B (Product)**: Verifies UX flow and mock data quality.
- **External User C (Simulated)**: Naive user testing for confusion points.

## 5. Success Criteria
- [ ] All Critical (P0) scenarios pass.
- [ ] No app crashes.
- [ ] AI mock data is consistent (Schema validation).
- [ ] Budget calculation matches defined tier logic.

## 6. Deliverables
- UAT Summary Report
- Recommendation (Go / No-Go)
