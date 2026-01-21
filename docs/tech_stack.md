# Technology Stack

## Overview
This document defines the technology stack for the Intelligent Travel Agent Platform. The selection prioritizes a "Mobile-First" approach, scalability, and separation of concerns between the application logic and AI capabilities.

## 1. Frontend
### **Primary: Mobile Application**
- **Framework**: **Flutter**
- **Language**: Dart
- **Reasoning**:
  - fast time-to-market for both iOS and Android.
  - Consistent UI/UX across platforms.
  - "Mobile-first" user persona (travelers on the go).

### **Secondary: Web Portal**
- **Framework**: **Next.js** (React)
- **Language**: TypeScript
- **Reasoning**:
  - SEO capabilities for landing pages and shared itineraries.
  - Rich interactive capabilities for complex planning views (desktop).
  - Shared logic potential with backend (TypeScript).

## 2. Backend (Application Layer)
- **Framework**: **NestJS**
- **Language**: TypeScript
- **Role**: Orchestrator, Main API Gateway for application logic.
- **Key Modules**:
  - Auth Service
  - Trip Service
  - Places Service (Data Aggregation)
- **Reasoning**:
  - Strongly typed (TypeScript) for maintainability.
  - Modular architecture (Microservices ready).
  - Excellent support for OpenAPI/Swagger integration.

## 3. AI Service (Intelligence Layer)
- **Framework**: **FastAPI**
- **Language**: Python
- **Role**: Dedicated AI Agent handling LLM interactions, RAG, and Tool Calling.
- **Reasoning**:
  - Native support for Python AI ecosystem (LangChain, LlamaIndex, PyTorch).
  - High performance (Async).
  - Decoupled from core business logic to allow independent scaling of GPU/heavy compute resources.

## 4. Data Layer
### **Transactional Data (Relational)**
- **System**: **PostgreSQL**
- **Use Cases**: User profiles, Authentication, Payments, Structured Booking Records.

### **Content & Unstructured Data (NoSQL)**
- **System**: **MongoDB**
- **Use Cases**: Places/POIs (due to varying attributes), raw Itinerary drafts, Cached external API responses.

### **Vector Search (AI Memory)**
- **System**: **Qdrant** (or pgvector)
- **Use Cases**: Semantic search for "Places", RAG context storage (User preferences embeddings).
- **Recommendation**: Start with **Qdrant** (Docker-friendly) or **pgvector** (if keeping stack minimal). *Decision: **Qdrant** for dedicated performance.*

## 5. Infrastructure & DevOps
- **Containerization**: **Docker** & **Docker Compose** (for local dev).
- **Orchestration**: **Kubernetes** (Phase 2+).
- **CI/CD**: QuickBooks / GitHub Actions.
- **API Gateway**: Nginx (Dev) / Cloud LB (Prod).
