import { Concept } from "./types"

export const jwtStructure: Concept = {
  id: "jwt-structure",
  title: "JWT Structure",
  category: "tokens",
  difficulty: "intermediate",
  shortDescription: "Understanding the three-part structure of JSON Web Tokens: Header, Payload, Signature",
  analogy: "A JWT is like a sealed cargo container - the header is the shipping label with instructions, the payload is what's inside the container, and the signature is the tamper-proof customs seal that proves authenticity.",
  details: `**JWT = Header.Payload.Signature**

  **PART 1: HEADER**
  \`\`\`json
  {
    "alg": "RS256",        // Algorithm used for signing
    "typ": "JWT",          // Token type
    "kid": "key-123"       // Key ID (for key rotation)
  }
  \`\`\`
  - Base64URL encoded
  - Describes how to process the token

  **PART 2: PAYLOAD (Claims)**
  \`\`\`json
  {
    "sub": "user123",              // Subject (user ID)
    "name": "Alice Johnson",       // Registered claim
    "role": "admin",               // Custom claim
    "permissions": ["read", "write"],
    "iss": "https://auth.example.com",  // Issuer
    "aud": "my-api",                    // Audience
    "exp": 1704067200,                  // Expiration time
    "nbf": 1704063600,                  // Not before
    "iat": 1704060000,                  // Issued at
    "jti": "unique-token-id"            // JWT ID
  }
  \`\`\`
  - Contains the claims about the entity
  - Standard claims: sub, iss, exp, iat, aud

  **PART 3: SIGNATURE**
  \`\`\`
  HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret
  )
  \`\`\`
  - Verifies token hasn't been tampered with
  - Proves token was issued by trusted party`,
  codeExample: `// Full JWT Example
const jwt = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwiZW1haWwiOiJhbGljZUBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNDA2MDAwMCwiZXhwIjoxNzA0MTQ2NDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

// Decoded parts:
const [headerB64, payloadB64, signatureB64] = jwt.split('.')

console.log(JSON.parse(atob(headerB64)))
// { alg: "RS256", typ: "JWT" }

console.log(JSON.parse(atob(payloadB64)))
// { sub: "user123", role: "admin", exp: 1704146400, ... }`,
  visualType: "token",
  relatedConcepts: ["jwt-signing", "access-refresh-tokens", "bearer-tokens"]
}

export const jwtSigning: Concept = {
  id: "jwt-signing",
  title: "JWT Signing vs Encryption",
  category: "tokens",
  difficulty: "advanced",
  shortDescription: "Understanding the difference between signing tokens for authenticity and encrypting for confidentiality",
  analogy: "Signing is like a wax seal on an envelope - it proves the letter came from the right person. Encryption is like putting the letter in a safe - only someone with the key can read its contents.",
  details: `**JWT SIGNING (JWS)**

  **Purpose:** Verify authenticity and integrity
  - Proves token was issued by trusted party
  - Detects any tampering
  - Anyone can read the contents (just base64 decode)
  - Used for: Access tokens, API credentials

  **Signing Algorithms:**

  **HMAC (Symmetric)**
  \`\`\`
  HS256: HMAC using SHA-256 (shared secret)
  HS384: HMAC using SHA-384
  HS512: HMAC using SHA-512
  \`\`\`
  - Same key for sign and verify
  - Fast, simple
  - Key must be kept secret

  **RSA/ECDSA (Asymmetric)**
  \`\`\`
  RS256: RSA with SHA-256
  ES256: ECDSA with SHA-256
  \`\`\`
  - Private key signs, public key verifies
  - Better for distributed systems
  - No shared secret exposure

  **JWT ENCRYPTION (JWE)**

  **Purpose:** Hide contents from prying eyes
  - Only intended recipient can read
  - Nested structure: Signed then Encrypted
  - Used for: Sensitive data in tokens

  **Best Practice: Sign AND Encrypt**
  - Outer layer: Encryption (confidentiality)
  - Inner layer: Signature (authenticity)
  - Format: JWE containing JWS`,
  codeExample: `// Signing with RSA (Node.js)
const privateKey = fs.readFileSync('private.key')
const token = jwt.sign(
  { sub: 'user123', role: 'admin' },
  privateKey,
  { algorithm: 'RS256', expiresIn: '1h' }
)

// Verifying with public key
const publicKey = fs.readFileSync('public.key')
const decoded = jwt.verify(token, publicKey, {
  algorithms: ['RS256']
})

// Encrypting for confidentiality (JWE)
const jwe = jose.EncryptJWT({ secret: 'data' })
  .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
  .encrypt(publicKey)`,
  visualType: "diagram",
  relatedConcepts: ["jwt-structure", "token-expiry"]
}

export const accessRefreshTokens: Concept = {
  id: "access-refresh-tokens",
  title: "Access Token vs Refresh Token",
  category: "tokens",
  difficulty: "intermediate",
  shortDescription: "Dual-token strategy with short-lived access tokens and long-lived refresh tokens for optimal security",
  analogy: "Access token is like your employee badge visible on your lanyard (worn openly, replaced often). Refresh token is like your master keycard kept in a safe (used to get new badges, stored securely).",
  details: `**ACCESS TOKEN**
  - Short-lived (5 minutes to 1 hour typically)
  - Sent with every API request
  - If stolen, limited exposure window
  - Usually a JWT with minimal claims
  - No persistent storage needed on server

  **Why Short-Lived?**
  - Limits damage if token is intercepted
  - Forces frequent authentication checks
  - Reduces need for global token revocation
  - Users re-authenticate regularly

  **REFRESH TOKEN**
  - Long-lived (7 days to 30 days typically)
  - Stored securely (HTTP-only cookie preferred)
  - Used ONLY to obtain new access tokens
  - Can be revoked server-side
  - Enables "Remember Me" functionality

  **The Refresh Flow:**
  1. User authenticates → receives access + refresh token
  2. Client uses access token for API calls
  3. Access expires → client sends refresh token
  4. Server validates refresh, issues new pair
  5. Both tokens replaced (token rotation)

  **Token Rotation Security**
  - Each refresh produces a new refresh token
  - Old refresh token is invalidated
  - Detects token reuse (potential attack)
  - Limits token lifetime exposure`,
  codeExample: `// Initial login - receive both tokens
POST /login
{ email, password }
Response:
{
  "accessToken": "eyJhbGciOiJIUzI1Ni...",
  "refreshToken": "def5020...",
  "expiresIn": 300  // 5 minutes
}

// API request with access token
GET /api/data
Authorization: Bearer eyJhbGciOiJIUzI1Ni...

// Access denied - token expires
{ "error": "token_expired" }

// Refresh token flow
POST /refresh
{ refreshToken: "def5020..." }
Response:
{
  "accessToken": "eyJhbGciOiJIUzI1Ni...",
  "refreshToken": "new-refresh-token...",
  "expiresIn": 300
}`,
  visualType: "flow",
  stepByStep: [
    "User authenticates with credentials",
    "Server issues access token (5 min) + refresh token (7 days)",
    "Client makes API requests with access token",
    "Access token expires on next request",
    "Client sends refresh token to /refresh endpoint",
    "Server validates refresh token, issues new pair",
    "Client continues with new access token"
  ],
  relatedConcepts: ["jwt-structure", "token-expiry", "client-credentials"]
}

export const bearerTokens: Concept = {
  id: "bearer-tokens",
  title: "Bearer Tokens",
  category: "tokens",
  difficulty: "beginner",
  shortDescription: "Understanding the Bearer token scheme for authenticated API requests",
  analogy: "Bearer tokens are like cash - whoever holds them can use them. That's why you must keep them as safe as you would your wallet!",
  details: `**What is a Bearer Token?**
  A Bearer token is a type of access token that grants access to the bearer of the token. If you have the token, you are authenticated.

  **The Bearer Scheme**
  \`\`\`
  Authorization: Bearer <token>
  \`\`\`
  - Part of HTTP specification (RFC 6750)
  - Used with OAuth 2.0 and OpenID Connect
  - Standard way to send tokens in API requests

  **Usage Example:**
  \`\`\`
  GET /api/users/me HTTP/1.1
  Host: api.example.com
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  \`\`\`

  **Security Critical:**
  - Treat Bearer tokens like passwords
  - Always use HTTPS to transmit
  - Store securely (HTTP-only cookies preferred)
  - Never log or expose in URLs
  - Use short-lived tokens when possible

  **Alternatives:**
  - Basic Auth (username:password base64)
  - API Keys (X-API-Key header)
  - AWS Signature (AWS-specific)

  **Best Practice:**
  Prefer Bearer tokens with short expiration and refresh token rotation for modern API authentication.`,
  codeExample: `// Making authenticated requests (JavaScript)
const response = await fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
    'Content-Type': 'application/json'
  }
})

const data = await response.json()

// Using fetch with credentials (cookies)
const response = await fetch('https://api.example.com/data', {
  credentials: 'include'  // Sends cookies automatically
})

// Axios example
axios.get('/api/data', {
  headers: { Authorization: \`Bearer \${token}\` }
})`,
  visualType: "diagram",
  relatedConcepts: ["access-refresh-tokens", "cookies-http-only"]
}

export const tokenExpiry: Concept = {
  id: "token-expiry",
  title: "Token Expiry & Rotation",
  category: "tokens",
  difficulty: "intermediate",
  shortDescription: "Managing token lifecycles, expiration times, and proper rotation strategies",
  analogy: "Token expiry is like a hotel key card that expires at checkout time - even if someone steals it, they can't use it after hours. Rotation means getting a new key before the old one expires.",
  details: `**Why Token Expiry Matters**
  - Limits exposure window if token is compromised
  - Forces periodic re-authentication
  - Allows server to enforce security policies
  - Reduces risk from token interception

  **Standard Expiration Times:**

  **Access Token:** 5-15 minutes (high security) to 1 hour (convenience)
  - Short window minimizes stolen token damage
  - User barely notices with seamless refresh

  **Refresh Token:** 7 days to 30 days
  - Long enough for convenience
  - Short enough to limit exposure
  - Revokable server-side

  **Refresh Token Rotation:**
  - Each use generates a new refresh token
  - Old token immediately invalidated
  - Prevents token replay attacks
  - Detects token theft (reuse of old token)

  **Security Best Practices:**
  - Implement sliding window expiration
  - Require re-authentication for sensitive actions
  - Use token binding (IP, device fingerprint)
  - Maintain token blacklist for immediate revocation
  - Alert users of suspicious token activity

  **Grace Period:**
  - Optional short window to use expired token
  - Prevents API failures during clock skew
  - Usually 30 seconds to 5 minutes`,
  codeExample: `// JWT with expiration
const token = jwt.sign({
  sub: 'user123',
  // Standard claims
  exp: Math.floor(Date.now() / 1000) + (15 * 60),  // 15 minutes
  iat: Math.floor(Date.now() / 1000),
}, secret)

// Check token expiration on server
jwt.verify(token, secret, (err, decoded) => {
  if (err?.name === 'TokenExpiredError') {
    // Return 401 with refresh guidance
    return res.status(401).json({
      error: 'TOKEN_EXPIRED',
      message: 'Please refresh your token'
    })
  }
})

// Token rotation on refresh
function refreshTokens(refreshToken) {
  const decoded = verifyRefresh(refreshToken)
  const newAccess = generateAccessToken(decoded.userId)
  const newRefresh = generateRefreshToken(decoded.userId)
  invalidateRefreshToken(decoded.tokenId)  // Invalidate old
  return { access: newAccess, refresh: newRefresh }
}`,
  visualType: "flow",
  stepByStep: [
    "User logs in, receives access token (15 min) and refresh token",
    "Access token sent with API requests",
    "Access token expires after 15 minutes",
    "Client detects 401, sends refresh token",
    "Server validates refresh, generates new token pair",
    "Old refresh token invalidated, new pair issued",
    "Client uses new access token seamlessly"
  ],
  relatedConcepts: ["access-refresh-tokens", "logout-revocation"]
}

export const tokensJwtConcepts = [
  jwtStructure,
  jwtSigning,
  accessRefreshTokens,
  bearerTokens,
  tokenExpiry,
]
