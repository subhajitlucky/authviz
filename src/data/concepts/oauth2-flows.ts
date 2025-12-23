import { Concept } from "./types"

export const authCodeFlow: Concept = {
  id: "auth-code-flow",
  title: "Authorization Code Flow",
  category: "oauth",
  difficulty: "advanced",
  shortDescription: "The most secure OAuth 2.0 flow for server-side applications with detailed step-by-step process",
  stepByStep: [
    "User clicks 'Login with [Provider]' button",
    "Application redirects user to authorization server",
    "User authenticates with provider (Google, Auth0, etc.)",
    "User reviews and grants requested permissions",
    "Authorization server redirects back with authorization code",
    "Application exchanges code for access + refresh tokens",
    "Application uses access token to fetch user data",
    "Access token expires, refresh token used for new token"
  ],
  analogy: "It's like getting a temporary guest pass at a secure building - you show your ID at reception, receive a pass, exchange it at the desk for a permanent badge that lets you access specific floors.",
  details: `**STEP 1: Initiate Authorization**
  \`\`\`
  GET /authorize?
    response_type=code&
    client_id=\${CLIENT_ID}&
    redirect_uri=\${CALLBACK_URL}&
    scope=openid profile email&
    state=\${RANDOM_STATE}
  \`\`\`
  - \`response_type=code\`: Requesting authorization code
  - \`client_id\`: Identifies your application
  - \`redirect_uri\`: Where to send the user after auth
  - \`scope\`: Permissions being requested
  - \`state\`: Anti-CSRF token (random value)

  **STEP 2: User Authenticates**
  - User sees provider's login page
  - Provider may offer "Remember you"
  - User enters credentials securely

  **STEP 3: User Grants Permission**
  - Consent screen shows requested permissions
  - User approves or denies
  - If denied, redirect with error

  **STEP 4: Authorization Code Returned**
  \`\`\`
  \${CALLBACK_URL}?
    code=\${AUTH_CODE}&
    state=\${RANDOM_STATE}
  \`\`\`
  - Short-lived code (typically 10 minutes)
  - One-time use only
  - Bound to client_id and redirect_uri

  **STEP 5: Exchange Code for Tokens**
  \`\`\`
  POST /token
  Content-Type: application/x-www-form-urlencoded

  grant_type=authorization_code&
  code=\${AUTH_CODE}&
  client_id=\${CLIENT_ID}&
  client_secret=\${CLIENT_SECRET}&
  redirect_uri=\${CALLBACK_URL}
  \`\`\`

  **STEP 6: Token Response**
  \`\`\`
  {
    "access_token": "eyJ...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": "def...",
    "scope": "openid profile email"
  }
  \`\`\``,
  visualType: "flow",
  relatedConcepts: ["pkce", "scopes", "access-refresh-tokens"]
}

export const pkce: Concept = {
  id: "pkce",
  title: "PKCE (Proof Key for Code Exchange)",
  category: "oauth",
  difficulty: "advanced",
  shortDescription: "Security extension for OAuth 2.0 that prevents authorization code interception attacks",
  analogy: "PKCE is like a secret handshake known only to you and the bartender - even if someone overhears your drink order (the authorization code), they can't use it without knowing your unique handshake (the code verifier).",
  details: `**Why PKCE Was Created**
  - Mobile/SPA apps can't securely store client_secret
  - Authorization codes can be intercepted (man-in-middle)
  - PKCE adds cryptographic proof without client secrets

  **The PKCE Process:**

  **Step 1: Generate Code Verifier**
  - Random string 43-128 characters
  - Uses base64url encoding
  - High entropy (cryptographically random)
  \`\`\`
  const codeVerifier = randomString(43)
  // Example: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
  \`\`\`

  **Step 2: Create Code Challenge**
  - Hash the verifier with SHA-256
  - Base64url encode the hash
  \`\`\`
  const codeChallenge =
    base64url(sha256(codeVerifier))
  // Method: S256 (required for security)
  \`\`\`

  **Step 3: Authorization Request**
  \`\`\`
  GET /authorize?
    response_type=code&
    client_id=app&
    redirect_uri=https://app/callback&
    scope=openid profile&
    code_challenge=\${CODE_CHALLENGE}&
    code_challenge_method=S256
  \`\`\`

  **Step 4: Token Exchange**
  \`\`\`
  POST /token
  grant_type=authorization_code&
  code=\${AUTH_CODE}&
  client_id=app&
  code_verifier=\${CODE_VERIFIER}  // Original value!
  \`\`\`

  **Step 5: Server Verification**
  - Server hashes code_verifier
  - Compares with original code_challenge
  - If match: issue tokens
  - If no match: reject request

  **Attack Prevention:**
  Without PKCE:
  ❌ Attacker steals auth code → exchanges for token

  With PKCE:
  ✅ Attacker has auth code but not code_verifier
  ✅ Cannot complete token exchange`,
  visualType: "flow",
  relatedConcepts: ["auth-code-flow", "oauth2-grant-types"]
}

export const scopes: Concept = {
  id: "scopes",
  title: "OAuth Scopes & Permissions",
  category: "oauth",
  difficulty: "intermediate",
  shortDescription: "Granular permission control through scopes that limit what access tokens can do",
  analogy: "OAuth scopes are like app permissions on your phone - a calendar app asks for access to your calendar (read-only) and notifications, but NOT your contacts or camera. You decide what to allow.",
  details: `**What are Scopes?**
  Scopes are strings that define the boundaries of access. They limit what the application can do with the token.

  **Common Scope Patterns:**

  **OpenID Connect Scopes:**
  \`\`\`
  openid        # Required for OIDC - basic identity
  profile       # Basic profile info (name, picture)
  email         # User's email address
  phone         # User's phone number
  address       # User's address
  \`\`\`

  **API Scopes:**
  \`\`\`
  read:user     # Read user data
  write:user    # Modify user data
  read:repo     # Read repositories
  admin:org     # Organization administration
  \`\`\`

  **Best Practices:**

  1. **Request Minimum Scopes**
  Don't ask for admin access if you only need to read data.
  ❌ \`scope: "admin:org repo user"\`
  ✅ \`scope: "repo:read"\`

  2. **Handle Scope Changes**
  If you need more access later, ask again.
  Users can review and add permissions.

  3. **Document Required Scopes**
  Tell users why you need each scope.
  Increases trust and consent rates.

  4. **Respect Scope Limits**
  Even if token has write scope, don't modify data unless necessary.

  **Scope in Token:**
  The token response includes granted scopes:
  \`\`\`
  {
    "access_token": "...",
    "token_type": "Bearer",
    "scope": "openid profile email read:repo"
  }
  \`\`\``,
  visualType: "diagram",
  relatedConcepts: ["auth-code-flow", "pkce"]
}

export const clientCredentials: Concept = {
  id: "client-credentials",
  title: "Client Credentials Flow",
  category: "oauth",
  difficulty: "intermediate",
  shortDescription: "Machine-to-machine authentication using client IDs and secrets without user involvement",
  analogy: "Client credentials is like a service account - a robot identity with its own username and password, used for automated systems talking to each other without human login.",
  details: `**When to Use Client Credentials**
  - Machine-to-machine (M2M) communication
  - Background jobs and cron tasks
  - Microservices authenticating to each other
  - CI/CD pipelines accessing APIs
  - No user context involved

  **The Flow (Simplified):**
  1. Client sends credentials to token endpoint
  2. Server validates client_id + client_secret
  3. Server issues access token
  4. Client uses token for API requests

  **Request:**
  \`\`\`
  POST /token HTTP/1.1
  Host: authorization-server.com
  Content-Type: application/x-www-form-urlencoded

  grant_type=client_credentials&
  client_id=\${CLIENT_ID}&
  client_secret=\${CLIENT_SECRET}&
  scope=read:data write:reports
  \`\`\`

  **Response:**
  \`\`\`
  {
    "access_token": "eyJhbG...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "read:data write:reports"
  }
  \`\`\`

  **Security Best Practices:**

  1. **Never Expose Secrets in Frontend**
  Client credentials flow is for server-side only!
  Frontend apps must use authorization code + PKCE.

  2. **Use Certificates for High Security**
  \`\`\`
  // Instead of client_secret
  assertion = jwt.sign({
    iss: client_id,
    sub: client_id,
    aud: token_endpoint,
    iat: now,
    exp: now + 300
  }, private_key, { algorithm: 'RS256' })

  grant_type=client_credentials&
  client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&
  client_assertion=\${ASSERTION}
  \`\`\`

  3. **Implement Proper Scopes**
  Give each service minimum required permissions.

  4. **Rotate Credentials Regularly**
  Automated rotation with secrets management (Vault, AWS Secrets).`,
  visualType: "flow",
  relatedConcepts: ["oauth2-grant-types", "access-refresh-tokens"]
}

export const sso: Concept = {
  id: "sso",
  title: "Single Sign-On (SSO)",
  category: "oauth",
  difficulty: "intermediate",
  shortDescription: "One login authentication that provides access to multiple connected applications",
  analogy: "SSO is like a master key card in a hotel - one card opens your room, accesses the gym, opens the pool, and charges to your room. You authenticate once, access everything.",
  details: `**What is SSO?**
  Authentication scheme allowing users to log in once and access multiple applications without re-authenticating.

  **How SSO Works:**
  1. User logs into Identity Provider (IdP) once
  2. User accesses connected application (SP)
  3. Application verifies with IdP
  4. User granted access without another login

  **SSO Benefits:**
  - Improved user experience (one password)
  - Reduced password fatigue
  - Centralized user management
  - Consistent security policies
  - Faster onboarding
  - Reduced IT support costs

  **Common SSO Protocols:**

  **SAML 2.0**
  - XML-based enterprise standard
  - Complex but feature-rich
  - Widely used in enterprise

  **OpenID Connect (OIDC)**
  - Modern, JSON-based
  - Built on OAuth 2.0
  - Recommended for new apps

  **Real-World Examples:**
  - Enterprise: Okta, Azure AD, OneLogin
  - Consumer: "Login with Google/Facebook"
  - Internal: Company portal access

  **SSO Challenges:**
  - Single point of failure (IdP down = all apps down)
  - Account linking complexity
  - Privacy concerns (IdP tracks all app usage)
  - Session management across services`,
  visualType: "flow",
  relatedConcepts: ["oauth2-overview", "openid-connect"]
}

export const oauth2FlowsConcepts = [
  authCodeFlow,
  pkce,
  scopes,
  clientCredentials,
  sso,
]
