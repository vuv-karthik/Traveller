# System Architecture

## High-Level Architecture Diagram

```mermaid
graph TD
    %% Clients
    subgraph Clients
        Mobile[Flutter Mobile App]
        Web[Next.js Web App]
    end

    %% API Gateway / Entry Point
    Gateway[API Gateway / Load Balancer]

    %% Main Backend Orchestrator
    subgraph "Backend Orchestrator (NestJS)"
        Orchestrator[API Gateway Service]
        Auth[Auth Module]
        Trip[Trip Management Module]
        Places[Places Aggregator Module]
    end

    %% AI Service
    subgraph "AI Agent (FastAPI)"
        Agent[AI Agent Service]
        LangGraph[LangGraph/LangChain Logic]
    end

    %% Data Layer
    subgraph Data Stores
        PG[(PostgreSQL\nUsers, Auth, Trips)]
        Mongo[(MongoDB\nPlaces Data, Cache)]
        Vector[(Qdrant\nEmbeddings)]
    end

    %% External
    External[External APIs\n(Maps, Weather, OTAs)]

    %% Connections
    Mobile --> Gateway
    Web --> Gateway
    Gateway --> Orchestrator

    Orchestrator --> Auth
    Orchestrator --> Trip
    Orchestrator --> Places
    
    %% AI Integration
    Orchestrator -- "gRPC / HTTP" --> Agent
    Agent --> LangGraph
    
    %% Data Access - Backend
    Auth --> PG
    Trip --> PG
    Places --> Mongo

    %% Data Access - AI
    Agent -.-> Vector
    Agent -.-> Mongo

    %% External
    Places --> External
```

## Component Description

### 1. Client Applications
- **Flutter Mobile App**: The primary user interface for travelers. Focuses on on-trip guidance and quick planning.
- **Next.js Web App**: Secondary interface for deep-dive planning and content browsing.

### 2. Backend Orchestrator (NestJS)
Acts as the central nervous system.
- **Auth Service**: Handles User Signup, Login, OAuth (Google), and Session Management.
- **Trip Service**: Manages CRUD operations for Itineraries. Stores structured trip data in PostgreSQL.
- **Places Service**: Aggregates data from external APIs (Google Places, TripAdvisor, etc.), caches it in MongoDB, and serves it to the Client or AI Agent.

### 3. AI Agent (FastAPI)
- Dedicated service for "Intelligence".
- Receives natural language prompts from the Orchestrator.
- **RAG Engine**: Retrieves context from Qdrant (User Preferences) and MongoDB (Places).
- **Tools**: Capabilities to call the Places Service or Trip Service to fetch data or modify state.

### 4. Data Stores
- **PostgreSQL**: Source of truth for Users and finalized Trip entities.
- **MongoDB**: Flexible storage for scraped/API-fetched Place details and raw/draft itineraries.
- **Qdrant**: Vector database for storing embeddings of Places and User Profiles to enable semantic search and personalized recommendations.
