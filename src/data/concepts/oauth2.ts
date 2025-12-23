import { Concept } from "./types"

export const oauth2Overview: Concept = {
  id: "oauth2-overview",
  title: "OAuth 2.0 Overview",
  category: "oauth",
  difficulty: "intermediate",
  shortDescription: "The authorization framework that enables third-party applications to access user resources without sharing passwords",
  analogy: "OAuth2 is like valet parking - you give the attendant your key (limited permission), they park your car (access your resource), but they cannot open your trunk (cannot access everything). The key only works for specific purposes.",
  details: `**What is OAuth 2.0?**
  An authorization framework that allows applications to obtain limited access to user accounts on an HTTP service. Instead of passwords, it uses access tokens.

  **The Core Problem OAuth Solves:**
  ❌ OLD WAY: "Login with Google" → Google password shared with app
  ✅ OAUTH WAY: App gets limited, revocable access token

  **OAuth 2.0 Grants (Flows):**
  1. **Authorization Code** - Server-side apps (most secure)
  2. **Authorization Code + PKCE** - Mobile/SPA apps
  3. **Client Credentials** - Machine-to-machine
  4. **Device Code** - Input-constrained devices
  5. **Implicit** - DEPRECATED (do not use)

  **Key Terminology:**
  - **Resource Owner**: The user (you)
  - **Client**: The application requesting access
  - **Authorization Server**: Issues tokens (e.g., Auth0, Okta)
  - **Resource Server**: Hosts the protected data
  - **Scope**: Permission boundaries

  **Real-World Examples:**
  - "Sign in with Google/Facebook"
  - GitHub accessing your Slack workspace
  - Spotify connecting to your Facebook friends`,
  visualType: "flow",
  relatedConcepts: ["oauth2-roles", "oauth2-grant-types", "auth-code-flow"]
}

export const oauth2Roles: Concept = {
  id: "oauth2-roles",
  title: "OAuth 2.0 Roles",
  category: "oauth",
  difficulty: "intermediate",
  shortDescription: "Understanding the four key roles in OAuth 2.0 architecture",
  analogy: "OAuth2 roles are like a theater production - the Resource Owner is the director, Client is the actor requesting props, Authorization Server is the stage manager, Resource Server is the prop room.",
  details: `**ROLE 1: Resource Owner**
  - The entity that can grant access to resources
  - Usually the end user
  - Can approve or deny access requests
  - Has ultimate control over their data
  - Example: "You" when you authorize an app

  **ROLE 2: Client**
  - The application requesting access
  - Must be registered with authorization server
  - Has client_id and (optionally) client_secret
  - Types: Confidential vs Public
  - Examples: GitHub desktop app, mobile banking app

  **ROLE 3: Authorization Server**
  - Issues access tokens after authenticating user
  - Verifies user identity and grants permissions
  - Manages client registrations
  - Tracks tokens and their scopes
  - Examples: Auth0, Okta, Google Identity, Keycloak

  **ROLE 4: Resource Server**
  - Hosts the protected resources
  - Accepts and validates access tokens
  - Returns appropriate data based on token claims
  - Often same server as authorization, or separate
  - Examples: Gmail API, GitHub API, your backend API

  **Flow Summary:**
  User (Owner) → App (Client) → Auth Server (verifies) → API (Resource) → data`,
  visualType: "diagram",
  relatedConcepts: ["oauth2-overview", "auth-code-flow"]
}

export const oauth2GrantTypes: Concept = {
  id: "oauth2-grant-types",
  title: "OAuth 2.0 Grant Types",
  category: "oauth",
  difficulty: "advanced",
  shortDescription: "Different authorization flows for obtaining access tokens in various client scenarios",
  analogy: "Grant types are like different entrance gates to a venue - some are for VIPs with special passes, some for general public, some for service staff with equipment access.",
  details: `**1. AUTHORIZATION CODE GRANT**
  - Best for: Server-side web applications
  - Security: High (client_secret kept server-side)
  - Flow: User redirects → authenticates → code returned → exchange for token
  - Requires: Client secret

  **2. AUTHORIZATION CODE + PKCE**
  - Best for: Single Page Apps (SPA), Mobile Apps
  - Security: High (prevents code interception)
  - Flow: Same as authorization code + code_verifier
  - Required for: Public clients without secrets
  - PKCE prevents: Malicious app stealing auth code

  **3. CLIENT CREDENTIALS GRANT**
  - Best for: Machine-to-machine communication
  - Security: Depends on credential protection
  - Flow: Direct token request with client credentials
  - No user involvement
  - Example: Microservice accessing another service

  **4. DEVICE CODE GRANT**
  - Best for: Devices without browsers (smart TVs, CLI tools)
  - Flow: Device shows code → user enters on phone/computer
  - Alternative when browser not available

  **5. IMPLICIT GRANT (DEPRECATED)**
  - Previously for: SPA without backend
  - REMOVED from OAuth 2.1 - DO NOT USE
  - Replaced by: Authorization Code + PKCE

  **Choosing the Right Grant:**
  | Client Type       | Recommended Grant                |
  |-------------------|----------------------------------|
  | Web Server        | Authorization Code               |
  | SPA               | Authorization Code + PKCE        |
  | Mobile App        | Authorization Code + PKCE        |
  | CLI/Daemon        | Device Code / Client Credentials |`,
  visualType: "comparison",
  relatedConcepts: ["auth-code-flow", "pkce", "client-credentials"]
}

export const oauth2Concepts = [
  oauth2Overview,
  oauth2Roles,
  oauth2GrantTypes,
]
