import { Concept } from "./types"

export const openidConnect: Concept = {
  id: "openid-connect",
  title: "OpenID Connect (OIDC)",
  category: "protocols",
  difficulty: "intermediate",
  shortDescription: "Identity layer on top of OAuth 2.0 for user authentication and profile information",
  analogy: "OpenID Connect is OAuth 2.0 with a magnifying glass - it adds a way to ask 'Who is this user?' on top of 'Can they access this resource?'",
  details: `**What OIDC Adds to OAuth 2.0:**
  - User authentication (not just authorization)
  - Standard user info endpoint (UserInfo API)
  - ID Token (JWT proving identity)
  - Standard scopes: openid, profile, email

  **OIDC Flow:**
  \`\`\`
  1. Client initiates with scope=openid
  2. User authenticates with IdP
  3. Client receives ID Token + Access Token
  4. Client uses Access Token to get user info
  \`\`\`

  **ID Token Structure:**
  \`\`\`
  {
    "iss": "https://auth.example.com",  // Issuer
    "sub": "user123",                   // Subject (user ID)
    "aud": "my-app-client-id",          // Audience
    "exp": 1704067200,                  // Expiration
    "iat": 1704063600,                  // Issued at
    "name": "Alice Johnson",            // Claims
    "email": "alice@example.com",
    "picture": "https://..."
  }
  \`\`\`

  **UserInfo Endpoint:**
  \`\`\`
  GET /userinfo
  Authorization: Bearer <access_token>

  Response:
  {
    "sub": "user123",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "email_verified": true
  }
  \`\`\`

  **OIDC vs SAML:**
  | Aspect          | OIDC        | SAML 2.0     |
  |-----------------|-------------|--------------|
  | Format          | JSON        | XML          |
  | Size            | Compact     | Verbose      |
  | Ease of Use     | Easy        | Complex      |
  | Browser Native  | Yes         | Requires Form|
  | Mobile Support  | Excellent   | Requires Work|
  | Enterprise      | Growing     | Established  |`,
  visualType: "comparison",
  relatedConcepts: ["oauth2-overview", "sso", "saml"]
}

export const saml: Concept = {
  id: "saml",
  title: "SAML 2.0",
  category: "protocols",
  difficulty: "advanced",
  shortDescription: "XML-based enterprise protocol for exchanging authentication and authorization data",
  analogy: "SAML is like a traditional paper visa - it's formal, verbose, and widely accepted in enterprise settings, but requires more infrastructure than modern digital alternatives.",
  details: `**What is SAML 2.0?**
  Security Assertion Markup Language - an XML-based open standard for exchanging authentication and authorization data between parties.

  **SAML Components:**

  **Assertions:**
  - **Authentication assertions** prove identity
  - **Authorization assertions** permit/deny access
  - **Attribute assertions** carry user data

  **SAML Flow:**
  \`\`\`
  1. User accesses Service Provider (SP)
  2. SP detects no session, redirects to IdP
  3. User authenticates with Identity Provider (IdP)
  4. IdP returns SAML Response (XML with assertion)
  5. SP validates assertion, creates local session
  \`\`\`

  **SAML Assertion Example:**
  \`\`\`
  <saml:Assertion>
    <saml:Issuer>https://idp.example.com</saml:Issuer>
    <saml:Subject>
      <saml:NameID>alice@example.com</saml:NameID>
    </saml:Subject>
    <saml:Conditions NotBefore="..." NotOnOrAfter="...">
    </saml:Conditions>
    <saml:AttributeStatement>
      <saml:Attribute Name="email">
        <saml:AttributeValue>alice@example.com</saml:AttributeValue>
      </saml:Attribute>
    </saml:AttributeStatement>
  </saml:Assertion>
  \`\`\`

  **SAML vs OIDC:**
  | Aspect          | SAML 2.0    | OIDC        |
  |-----------------|-------------|--------------|
  | Data Format     | XML         | JSON         |
  | Complexity      | High        | Low          |
  | Browser Flow    | Form Post   | Redirect     |
  | API Friendliness| Poor        | Excellent    |
  | Enterprise Use  | Dominant    | Growing      |
  | Mobile Apps     | Cumbersome  | Native       |

  **When to Use SAML:**
  - Enterprise integration with existing IdP
  - Legacy system requirements
  - Federation with other enterprises`,
  visualType: "diagram",
  relatedConcepts: ["openid-connect", "sso"]
}

export const protocolComparison: Concept = {
  id: "protocol-comparison",
  title: "Protocol Comparison: OIDC vs SAML",
  category: "protocols",
  difficulty: "intermediate",
  shortDescription: "Comparing OpenID Connect and SAML 2.0 for identity federation",
  analogy: "Choosing between OIDC and SAML is like choosing between a modern smartphone app and a traditional paper form - both get the job done, but one is more convenient and user-friendly.",
  details: `**Quick Comparison:**

  | Feature           | OIDC                    | SAML 2.0               |
  |-------------------|-------------------------|------------------------|
  | Data Format       | JSON                    | XML                    |
  | Message Size      | Compact                 | Verbose                |
  | Browser Flow      | HTTP Redirect           | Form POST              |
  | Mobile Support    | Native                  | Requires Workarounds   |
  | Token Type        | JWT                     | XML Assertion          |
  | API Friendly      | Excellent               | Poor                   |
  | Setup Complexity  | Low                     | High                   |
  | Enterprise Use    | Growing                 | Established            |

  **Choose OIDC When:**
  - Building new applications
  - Need excellent mobile support
  - Prefer JSON over XML
  - Working with modern web frameworks
  - Building consumer-facing apps
  - Starting fresh with no SAML requirement

  **Choose SAML When:**
  - Enterprise integration with existing IdP
  - Need complex federation
  - Legacy system requirements
  - Working with enterprise IdPs (Okta, Azure AD)
  - Integrating with government systems
  - Already have SAML infrastructure

  **Real-World Examples:**
  - **OIDC:** "Sign in with Google", Auth0, Firebase Auth
  - **SAML:** Enterprise SSO with Azure AD, Okta, OneLogin`,
  visualType: "comparison",
  relatedConcepts: ["openid-connect", "saml", "oauth2-overview"]
}

export const protocolsConcepts = [
  openidConnect,
  saml,
  protocolComparison,
]
