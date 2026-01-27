# Traveller - Intelligent Travel Agent Platform

[![Phase 1](https://img.shields.io/badge/Phase%201-CLOSED-critical)](./docs/phase-1/PHASE_1_FROZEN.md)
[![Phase 2](https://img.shields.io/badge/Phase%202-ACTIVE-success)](./docs/PHASE_2_KICKOFF_AUTHORIZATION.md)
[![Governance](https://img.shields.io/badge/Governance-ENFORCED-blue)](./docs/PHASE_2_GOVERNANCE.md)

---

## 🔒 Phase 1: CLOSED (Frozen) | 🚀 Phase 2: ACTIVE

**Phase 1 has been officially frozen** as of 2026-01-27. All backend modules (Auth, Trip Planning, Destination, Budget, AI Assistant) and frontend flows (Maps, UI/UX) are **READ-ONLY**.

**Phase 2 (Intelligence & Personalization) is now ACTIVE** under strict governance controls.

⚠️ **CRITICAL**: Live LLM usage is governed and gated by [`PHASE_2_GOVERNANCE.md`](./docs/PHASE_2_GOVERNANCE.md). All external API integrations require explicit approval.

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

All Phase 1 documentation, verification scripts, and governance reports are archived in [`docs/phase-1/`](./docs/phase-1/).

---

## Phase Boundaries & Governance

### 🔒 Phase 1 Modules: LOCKED (Read-Only)

The following modules are **FROZEN** and cannot be modified without formal change request approval:

- **Module 1**: Authentication & User Management
- **Module 2**: Core Trip Planning (Mongoose persistence)
- **Module 3**: Destination Information (with caching)
- **Module 4**: Budget Estimation (deterministic, tier-based)
- **Module 5**: AI Assistant (Mock mode baseline)
- **Module 6**: Maps & Navigation (visualization-only)
- **Module 7**: End-to-End UI/UX Flow (Flutter mobile)

**Baseline Tag**: `phase-1-final` (commit: `9e4ee8e`)

### 🚀 Phase 2 Modules: ACTIVE (Under Development)

Phase 2 work is authorized and MUST occur in feature branches only:

- **Primary Branch**: `feat/phase2-ai-assistant`
- **Module 2.1**: Advanced AI Assistant (State-aware, Tool-calling)
- **Module 2.2**: Recommendation Engine (Vector embeddings, Hidden Gems)
- **Module 2.3**: Budget Optimization (Dynamic constraints)

**Branch Rules**:
- No direct commits to `main`
- All Phase 2 work in `feat/*` branches
- PR reviews required for merges
- `main` remains stable until Phase 2 approval

**Governance**: All Phase 2 features are subject to [`PHASE_2_GOVERNANCE.md`](./docs/PHASE_2_GOVERNANCE.md)


---

## Contributing

**Phase 1 is FROZEN.** Contributions require Phase 2 approval.

For new features, submit a proposal via Phase 2 Technical Review.

---

## License

MIT License (Placeholder)

---

**📌 Important**: This project is in MVP state. Phase 1 is locked for stability. All future work goes through Phase 2 governance.