import { Concept } from "./types"

export const mfaOverview: Concept = {
  id: "mfa-overview",
  title: "Multi-Factor Authentication (MFA)",
  category: "mfa",
  difficulty: "intermediate",
  shortDescription: "Adding multiple verification methods for stronger identity assurance",
  analogy: "MFA is like a bank vault with two locks - you need both a key (something you have) and a combination (something you know) to open it. Stealing just one isn't enough.",
  details: `**What Makes It "Multi-Factor"?**

  **Factor 1: Something You Know**
  - Password, PIN, passcode
  - Security questions

  **Factor 2: Something You Have**
  - Phone (SMS, authenticator app)
  - Hardware key (YubiKey)
  - Smart card

  **Factor 3: Something You Are**
  - Fingerprint
  - Face recognition
  - Voice recognition
  - Iris scan

  **MFA Methods Comparison:**

  | Method        | Security | Usability | Phishing Resistant |
  |---------------|----------|-----------|-------------------|
  | SMS OTP       | Low      | High      | No                |
  | TOTP (App)    | Medium   | High      | No                |
  | Push          | Medium   | Very High | No                |
  | Hardware Key  | Very High| Medium    | YES               |
  | Biometrics    | High     | Very High | Partial           |

  **Why MFA Matters:**
  - 99.9% reduction in account compromise (Microsoft)
  - Protects against password leaks
  - Required for compliance (PCI-DSS, SOC2)
  - Industry standard for sensitive applications

  **MFA Implementation Best Practices:**
  1. Offer multiple MFA methods
  2. Use TOTP over SMS when possible
  3. Provide backup codes securely
  4. Allow trusted device remember
  5. Have recovery flow for lost MFA device`,
  visualType: "comparison",
  relatedConcepts: ["totp", "webauthn", "passwordless"]
}

export const totp: Concept = {
  id: "totp",
  title: "TOTP (Time-Based One-Time Password)",
  category: "mfa",
  difficulty: "intermediate",
  shortDescription: "Time-synchronized one-time passwords using shared secrets",
  analogy: "TOTP is like a synchronized dance move - both you and the door (server) count the same beat, and at each beat you show a different move (code) that only works for that moment.",
  details: `**How TOTP Works:**

  **Step 1: Secret Setup (Registration)**
  \`\`\`
  // Server generates random secret
  const secret = generateRandomBase32String()

  // Display as QR code for scanning
  otpauth://totp/ExampleApp:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=ExampleApp

  // User scans with authenticator app
  // Both store the same secret
  \`\`\`

  **Step 2: Code Generation**
  \`\`\`
  // Algorithm: HMAC-SHA1(secret, counter)

  // Counter = Unix time / 30 seconds
  counter = Math.floor(Date.now() / 1000 / 30)

  // Generate 6-digit code
  code = truncate(HMAC-SHA1(secret, counter))
  // Example: 123 456
  \`\`\`

  **Step 3: Code Verification**
  \`\`\`
  // Server calculates same code
  const expectedCode = calculateTOTP(secret)

  // Allow some clock drift (±1 time step)
  if (Math.abs(timeStepDelta) <= 1 && userCode === expectedCode) {
    // Valid!
  }
  \`\`\`

  **Why 30 Seconds?**
  - Short enough to prevent replay
  - Long enough for user to type
  - Allows clock skew tolerance

  **Security Considerations:**
  ✅ Better than SMS (no SIM hijacking)
  ⚠️ Vulnerable to real-time phishing
  ⚠️ Device loss = account recovery needed

  **Backup Codes:**
  - Generate 10 single-use backup codes
  - Store hash, not plain text
  - One-time use, delete after use`,
  visualType: "flow",
  relatedConcepts: ["mfa-overview", "webauthn"]
}

export const webauthn: Concept = {
  id: "webauthn",
  title: "WebAuthn & Passkeys",
  category: "mfa",
  difficulty: "advanced",
  shortDescription: "Passwordless authentication using public-key cryptography and security keys",
  analogy: "WebAuthn is like a biometric passport - you prove your identity using cryptographic proof stored on your device, not by remembering a secret password. The key never leaves your device.",
  details: `**What is WebAuthn?**
  Web Authentication API - a browser standard for passwordless and second-factor authentication using public-key cryptography.

  **Key Concepts:**

  **Credential Types:**
  - **Platform Authenticator:** Built into device (Touch ID, Windows Hello)
  - **Cross-Platform (Roaming):** Physical keys (YubiKey, Titan)

  **The Registration Flow:**
  \`\`\`
  1. User initiates registration
  2. Server sends challenge
  3. Browser generates key pair
  4. Private key stored in authenticator
  5. Public key sent to server
  \`\`\`

  **The Authentication Flow:**
  1. User initiates login
  2. Server sends challenge
  3. User verifies with authenticator
  4. Private key signs challenge
  5. Server verifies with stored public key

  **Passkeys:**
  - Apple's implementation of WebAuthn
  - Syncs across Apple devices via iCloud
  - Works on iPhone, iPad, Mac
  - Shareable with family

  **Security Properties:**
  ✅ Phishing-resistant (bound to origin)
  ✅ Private key never leaves authenticator
  ✅ No shared secrets to leak
  ✅ Supports biometrics`,
  visualType: "flow",
  relatedConcepts: ["mfa-overview", "passwordless"]
}

export const passwordless: Concept = {
  id: "passwordless",
  title: "Passwordless Authentication",
  category: "mfa",
  difficulty: "intermediate",
  shortDescription: "Authentication methods that eliminate passwords entirely for better security and UX",
  analogy: "Passwordless is like hotel check-in - you receive a code or link via email/SMS that grants temporary access. No password to remember, and the link expires after use.",
  details: `**Why Move Beyond Passwords?**

  **Password Problems:**
  - Users reuse passwords across sites
  - Weak passwords are common
  - Phishing captures passwords
  - Data breaches expose passwords
  - Hard to remember strong passwords

  **Passwordless Methods:**

  **1. Magic Links**
  - User enters email
  - Receives link with embedded token
  - Clicks link to authenticate
  - Token expires (15-30 minutes)

  **2. OTP (Email/SMS)**
  - User enters email/phone
  - Receives 6-digit code
  - Enters code to authenticate
  - Single-use, short expiration

  **3. Passkeys (WebAuthn)**
  - Biometric or PIN on device
  - No password to remember
  - Phishing-resistant
  - Syncs across devices

  **4. Social Login (OAuth)**
  - "Login with Google/Facebook"
  - Delegates auth to identity provider
  - User doesn't create password

  **Implementation Example - Magic Link:**
  \`\`\`
  // Request magic link
  POST /auth/magic-link
  { email: 'user@example.com' }

  // Server generates token, sends email
  // Email contains:
  https://app.com/auth/verify?token=abc123

  // User clicks link
  POST /auth/verify
  { token: 'abc123' }

  // Server validates, creates session
  \`\`\`

  **Security Considerations:**
  - Email access = account access (secure email!)
  - Implement rate limiting
  - Short token expiration
  - Device fingerprinting`,
  visualType: "comparison",
  relatedConcepts: ["mfa-overview", "webauthn", "access-refresh-tokens"]
}

export const mfaConcepts = [
  mfaOverview,
  totp,
  webauthn,
  passwordless,
]
