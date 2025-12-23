import { Concept } from "./types"

export const passwordSecurity: Concept = {
  id: "password-security",
  title: "Password Security & Hashing",
  category: "security",
  difficulty: "intermediate",
  shortDescription: "Secure password storage using cryptographic hashing with salt and pepper",
  analogy: "Password hashing is like a one-way shredder - you can turn a document into confetti (hash), but you can't turn confetti back into a document. Salting adds unique confetti colors to each document.",
  details: `**Why Hash Passwords?**
  ❌ NEVER store passwords in plain text
  ❌ NEVER encrypt passwords (reversible)
  ✅ ALWAYS hash passwords (one-way)

  **The Password Storage Problem:**
  \`\`\`
  // Plain text - WORST
  password: "hunter2"
  storage: "hunter2"
  \`\`\`

  **Basic Hashing (Still Bad):**
  \`\`\`
  // Simple hash
  password: "hunter2"
  hash: SHA256("hunter2") = "f52fbd32b2..."

  // Problem: Rainbow tables
  // Pre-computed hashes for common passwords
  \`\`\`

  **Proper Hashing with Salt:**
  \`\`\`
  // Generate random salt
  salt = randomBytes(16).toString('hex')

  // Hash with salt
  hash = bcrypt.hash(password + salt, 12)

  // Store
  DB: { username, hash: "...", salt: "..." }

  // Verify
  hash = bcrypt.hash(inputPassword + storedSalt, storedHash)
  \`\`\`

  **Recommended Algorithms:**

  **bcrypt:**
  - Adaptive work factor
  - Built-in salt
  - Recommended cost: 10-12
  \`\`\`
  const hash = await bcrypt.hash(password, 12)
  const valid = await bcrypt.compare(password, hash)
  \`\`\`

  **Argon2 (Winner of Password Hashing Competition):**
  \`\`\`
  const hash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2**16,
    timeCost: 3,
    parallelism: 2
  })
  \`\`\`

  **PBKDF2:**
  \`\`\`
  const hash = await crypto.pbkdf2(password, salt, 100000, 64, 'sha512')
  \`\`\`

  **Password Policy Best Practices:**
  - Minimum 8 characters (12+ recommended)
  - No arbitrary complexity rules
  - Check against breach databases
  - No password hints
  - Don't reuse passwords`,
  visualType: "diagram",
  relatedConcepts: ["token-theft", "mfa-overview"]
}

export const credentialStuffing: Concept = {
  id: "credential-stuffing",
  title: "Credential Stuffing Attacks",
  category: "security",
  difficulty: "intermediate",
  shortDescription: "Automated attacks using leaked username/password pairs across multiple sites",
  analogy: "Credential stuffing is like a thief trying the same key on every door in the neighborhood - they got one key (from a data breach) and try it everywhere, hoping you'll use the same lock.",
  details: `**What is Credential Stuffing?**
  Automated login attempts using stolen credentials from one breach to access accounts on other services.

  **The Attack:**
  \`\`\`
  // Stolen from breach: user@example.com / password123

  // Attacker tries on thousands of sites:
  POST /login user@example.com / password123
  POST /login user@example.com / password123
  POST /login user@example.com / password123
  ...
  \`\`\`

  **Why It Works:**
  - 65% of users reuse passwords (Google)
  - Billions of credentials leaked
  - Credential lists available on dark web

  **Impact:**
  - Account takeover (ATO)
  - Financial fraud
  - Data theft
  - Reputation damage
  - Compliance violations

  **Defense Strategies:**

  **1. Multi-Factor Authentication**
  - Stops attackers even with correct password
  - Required for sensitive accounts

  **2. Password Breach Checking**
  \`\`\`
  // Check against Have I Been Pwned
  // k-anonymity model
  const hash = SHA1(password)
  const prefix = hash.substring(0, 5)
  const response = await fetch(\`https://api.pwnedpasswords.com/range/\${prefix}\`)
  // Check if suffix is in response
  \`\`\`

  **3. Rate Limiting**
  \`\`\`
  // Limit login attempts per IP
  rateLimiter: {
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 5  // 5 attempts per window
  }
  \`\`\`

  **4. Device Fingerprinting**
  \`\`\`
  // Track device characteristics
  const fingerprint = {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    screen: window.screen,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }
  \`\`\`

  **5. Behavioral Analysis**
  - Detect impossible travel
  - Unusual login times
  - Abnormal navigation patterns`,
  visualType: "flow",
  relatedConcepts: ["password-security", "mfa-overview"]
}

export const passwordSecurityConcepts = [
  passwordSecurity,
  credentialStuffing,
]
