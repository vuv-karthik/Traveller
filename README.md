# Traveller - Intelligent Travel Agent Platform

[![Phase](https://img.shields.io/badge/Phase-1%20COMPLETE-success)](./docs/phase-1/PHASE_1_FROZEN.md)
[![Status](https://img.shields.io/badge/Status-FROZEN-critical)](./docs/phase-1/PHASE_1_FROZEN.md)

---

## ⚠️ PHASE 1 CLOSED – Changes Require Phase 2 Approval

**Phase 1 has been officially frozen.** All backend modules (Auth, Trip Planning, Destination, Budget, AI Assistant) and frontend flows (Maps, UI/UX) are **READ-ONLY**.

**To propose changes**: Submit a Phase 2 Implementation Plan. See [`docs/phase-1/PHASE_1_FROZEN.md`](./docs/phase-1/PHASE_1_FROZEN.md) for details.

---

## Overview

Traveller is an AI-powered travel planning platform that helps users create personalized trip itineraries with budget estimates and map visualization.

### Phase 1 Deliverables (MVP)

- ✅ **Authentication & User Management** (Module 1)
- ✅ **Core Trip Planning** with Mongoose (Module 2)
- ✅ **Destination Information** with caching (Module 3)
- ✅ **Budget Estimation** (deterministic, tier-based) (Module 4)
- ✅ **AI Assistant** (Mock mode, governance-compliant) (Module 5)
- ✅ **Maps & Navigation** (visualization-only) (Module 6)
- ✅ **End-to-End UI/UX Flow** (Flutter mobile) (Module 7)

---

## Repository Structure

```
traveller/
├── packages/
│   ├── backend/          # NestJS API (Modules 1-5)
│   ├── ai-engine/        # Python FastAPI (Module 5)
│   └── frontend/mobile/  # Flutter app (Modules 6-7)
├── docs/
│   ├── phase-1/          # Phase 1 documentation archive
│   ├── architecture.md
│   └── tech_stack.md
└── infrastructure/       # Docker configs
```

---

## Tech Stack

**Backend**: NestJS, MongoDB (Mongoose), FastAPI (Python)  
**Frontend**: Flutter, Riverpod, Google Maps  
**AI**: Mock mode (Phase 2: OpenAI/Gemini integration)

Full details: [`docs/tech_stack.md`](./docs/tech_stack.md)

---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB
- Flutter SDK (for mobile)

### Quick Start

1. **Backend**:
   ```bash
   cd packages/backend
   npm install
   npm run start:dev
   ```

2. **AI Engine**:
   ```bash
   cd packages/ai-engine
   pip install -r requirements.txt
   python main.py
   ```

3. **Mobile App**:
   ```bash
   cd packages/frontend/mobile
   flutter pub get
   flutter run
   ```

---

## Phase 1 Archive

All Phase 1 documentation, verification scripts, and governance reports are archived in [`docs/phase-1/`](./docs/phase-1/).

---

## Contributing

**Phase 1 is FROZEN.** Contributions require Phase 2 approval.

For new features, submit a proposal via Phase 2 Technical Review.

---

## License

MIT License (Placeholder)

---

**📌 Important**: This project is in MVP state. Phase 1 is locked for stability. All future work goes through Phase 2 governance.