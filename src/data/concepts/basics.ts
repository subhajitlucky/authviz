import { Concept } from "./types"

export const authVsAuthz: Concept = {
  id: "auth-vs-authz",
  title: "Authentication vs Authorization",
  category: "basics",
  difficulty: "beginner",
  shortDescription: "Verifying identity vs verifying permissions - the foundation of access control",
  analogy: "Authentication is proving who you are at the door (like a passport), authorization is what you're allowed to do once inside (like a ticket to a specific seat in a theater).",
  details: `**Authentication** answers: "Who are you?"
  - Verifies user identity before granting access
  - The first gate in the security pipeline
  - Methods include: passwords, biometrics, magic links, hardware tokens
  - Often represented as \`AuthN\` in technical documentation

  **Authorization** answers: "What can you do?"
  - Determines access rights and permissions
  - Happens AFTER successful authentication
  - Determines what resources a user can access
  - Often represented as \`AuthZ\` in technical documentation

  **The Flow:**
  1. User proves identity (Authentication)
  2. System checks what they're allowed to do (Authorization)
  3. Access granted or denied based on both checks

  **Real-World Example:**
  - Airport: ID check (authentication) → Boarding pass scan (authorization)
  - Bank: ATM card PIN (authentication) → Account balance access (authorization)`,
  codeExample: `// Authentication: Verifying identity
async function authenticateUser(email: string, password: string) {
  const user = await db.users.find({ email })
  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (isValid) return generateSession(user.id)
  throw new Error('Invalid credentials')
}

// Authorization: Checking permissions
async function authorizeUser(userId: string, resource: string, action: string) {
  const permissions = await db.permissions.find({ userId })
  return permissions.some(p =>
    p.resource === resource && p.actions.includes(action)
  )
}`,
  visualType: "comparison",
  relatedConcepts: ["sessions-vs-tokens", "rbac", "abac"]
}

export const sessionsVsTokens: Concept = {
  id: "sessions-vs-tokens",
  title: "Sessions vs Tokens",
  category: "basics",
  difficulty: "beginner",
  shortDescription: "Stateful server-side sessions vs stateless JWT tokens - two paradigms for maintaining user state",
  analogy: "Sessions are like a hotel key card tied to your specific room (the front desk knows about you). Tokens are like a universal master key you carry that doesn't require the hotel to verify you every time.",
  details: `**Sessions (Stateful)**
  - Server maintains user state in memory/database
  - Client receives a session ID (usually in cookie)
  - Server looks up session on each request
  - Session contains: user ID, login time, permissions, metadata
  - Can invalidate immediately (logout, security breach)

  **Advantages:**
  - Can revoke anytime
  - Session data hidden from client
  - No token size limit
  - Easy to extend session

  **Disadvantages:**
  - Requires shared session storage for scaling
  - Server memory/database overhead
  - Session persistence challenges

  **Tokens (Stateless - JWT)**
  - All user data encoded in the token itself
  - No server storage needed
  - Token verified with cryptographic signature
  - Contains: user claims, expiration, issuer

  **Advantages:**
  - Scales effortlessly (no server state)
  - Works across multiple services
  - Reduced server load
  - Better for microservices

  **Disadvantages:**
  - Cannot revoke until expiration
  - Token size larger than session ID
  - Payload visible (encode carefully)
  - Key rotation requires care`,
  codeExample: `// Session-based (Express.js)
app.post('/login', (req, res) => {
  const sessionId = generateSecureId()
  sessions[sessionId] = {
    userId: user.id,
    created: Date.now(),
    permissions: ['read', 'write']
  }
  res.cookie('sessionId', sessionId, { httpOnly: true })
})

// Token-based (JWT)
const token = jwt.sign(
  { sub: user.id, permissions: ['read', 'write'] },
  SECRET_KEY,
  { expiresIn: '1h' }
)
res.json({ token })`,
  visualType: "comparison",
  relatedConcepts: ["jwt-structure", "stateless-auth", "token-expiry"]
}

export const cookiesHttpOnly: Concept = {
  id: "cookies-http-only",
  title: "Cookies & HTTP-only Cookies",
  category: "basics",
  difficulty: "beginner",
  shortDescription: "Understanding browser cookies, their security attributes, and best practices for authentication",
  analogy: "Regular cookies are like writing your name on a sticky note anyone can read. HTTP-only cookies are like a sealed envelope only the server can open.",
  details: `**What are Cookies?**
  - Small pieces of data sent from server to browser
  - Browser stores and automatically sends with each request
  - Originally designed for session management, personalization, tracking

  **Cookie Structure:**
  \`\`\`
  Set-Cookie: session=abc123; Path=/; HttpOnly; Secure; SameSite=Lax
  \`\`\`

  **Key Cookie Attributes:**

  **HttpOnly**
  - Prevents JavaScript access to the cookie
  - Protects against XSS attacks stealing session tokens
  - Cannot be read by: document.cookie, console access
  - Recommended: ALWAYS for authentication cookies

  **Secure**
  - Cookie only sent over HTTPS connections
  - Prevents man-in-the-middle attacks
  - Recommended: ALWAYS in production

  **SameSite**
  - Controls when cookies are sent with cross-site requests
  - \`Strict\`: Only same-site requests
  - \`Lax\`: Safe cross-site GET requests (navigation)
  - \`None\`: All cross-site requests (requires Secure)

  **Domain/Path**
  - Restricts which domains/paths receive the cookie
  - Defaults to current domain

  **Max-Age/Expires**
  - Sets cookie lifetime
  - Session cookies: deleted when browser closes`,
  codeExample: `// Server setting secure cookie (Express.js)
res.cookie('authToken', token, {
  httpOnly: true,      // Cannot be accessed by JavaScript
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',  // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  domain: '.example.com'
})

// Client-side CANNOT read httpOnly cookies
console.log(document.cookie)  // Won't show authToken!
fetch('/api/data', {
  credentials: 'include'  // Cookies sent automatically
})`,
  visualType: "diagram",
  relatedConcepts: ["csrf", "xss", "bearer-tokens"]
}

export const statelessAuth: Concept = {
  id: "stateless-auth",
  title: "Stateless Authentication",
  category: "basics",
  difficulty: "intermediate",
  shortDescription: "Self-contained authentication tokens that carry all necessary information without server-side state",
  analogy: "Stateless auth is like a passport with a security chip - all your information is embedded in the document itself, and authorities can verify your identity without calling headquarters.",
  details: `**What Makes It Stateless?**
  - No server session storage required
  - All authentication data encoded in the token
  - Token verified by cryptographic signature
  - Each request is self-contained and independent

  **How Verification Works:**
  1. Client sends token with request
  2. Server decodes token header to find signing key
  3. Server verifies signature against token payload
  4. Server checks expiration and issuer
  5. If valid, extract user identity from claims

  **Common Use Cases:**
  - RESTful APIs
  - Microservices architecture
  - Single Page Applications (SPAs)
  - Mobile apps
  - Multi-service ecosystems

  **Benefits:**
  - Horizontal scaling: any server can verify
  - No session sync between servers
  - Works across geographic regions
  - Reduced database load
  - Sim infrastructure

  **Trade-offs:**
  - Cannot instantly revoke tokens
  - Larger request size (token with every request)
  - Sensitive data visible in payload
  - Key rotation requires token refresh`,
  codeExample: `// JWT Token Structure (Decoded)
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user123",
    "name": "John Doe",
    "roles": ["admin", "editor"],
    "permissions": ["read", "write"],
    "iss": "https://auth.example.com",
    "exp": 1704067200,  // Unix timestamp
    "iat": 1704063600
  }
}

// Server verification (Node.js)
const decoded = jwt.verify(token, publicKey, {
  issuer: 'https://auth.example.com',
  audience: 'my-api'
})
// decoded now contains user info from token`,
  visualType: "diagram",
  relatedConcepts: ["jwt-structure", "jwt-signing", "token-expiry"]
}

export const sessionManagement: Concept = {
  id: "session-management",
  title: "Session Management Best Practices",
  category: "basics",
  difficulty: "intermediate",
  shortDescription: "Creating, maintaining, and securely terminating user sessions",
  analogy: "Session management is like a hotel's guest management - tracking who has a room key (active sessions), when it expires (session timeout), and what they can access (permissions).",
  details: `**What is a Session?**
  A session is a server-side record of a user's authenticated state, typically referenced by a session ID stored in a cookie.

  **Session Creation:**
  \`\`\`
  POST /login
  { email, password }

  // Server validates credentials
  // Creates session record
  const session = {
    id: 'sess_abc123',
    userId: 'user456',
    createdAt: Date.now(),
    lastActivity: Date.now(),
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0...',
    permissions: ['read', 'write']
  }

  // Store session (Redis, database)
  await sessions.save(session.id, session)

  // Send session cookie
  Set-Cookie: sessionId=sess_abc123; HttpOnly; Secure; SameSite=Lax
  \`\`\`

  **Session Validation:**
  \`\`\`
  GET /api/data
  Cookie: sessionId=sess_abc123

  // On each request:
  const session = await sessions.get(sessionId)
  if (!session) return 401 Unauthorized

  // Check session validity
  if (session.isExpired()) return 401
  if (session.isRevoked()) return 401
  if (session.isCompromised()) {
    session.revoke()
    return 401
  }

  // Update activity timestamp
  session.updateActivity()
  \`\`\`

  **Session Security Best Practices:**

  1. **Secure Session ID Generation**
  \`\`\`
  const sessionId = crypto.randomBytes(32).toString('hex')
  // 256 bits of entropy - unguessable
  \`\`\`

  2. **HTTPS Only Cookies**
  \`\`\`
  Set-Cookie: session=abc; Secure; HttpOnly; SameSite=Lax
  \`\`\`

  3. **Session Timeout**
  - Absolute timeout: 24 hours (force re-login)
  - Inactivity timeout: 15-30 minutes
  - Sliding expiration on activity

  4. **Session Fixation Prevention**
  - Regenerate session ID after login
  - Never accept session ID from URL

  5. **Concurrent Session Control**
  - Limit simultaneous sessions per user
  - Invalidate oldest session when limit reached`,
  visualType: "flow",
  relatedConcepts: ["cookies-http-only", "logout-revocation", "sessions-vs-tokens"]
}

export const basicsConcepts = [
  authVsAuthz,
  sessionsVsTokens,
  cookiesHttpOnly,
  statelessAuth,
  sessionManagement,
]
