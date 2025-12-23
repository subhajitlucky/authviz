import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import {
  Shield,
  Fingerprint,
  Key,
  Smartphone,
  Laptop,
  CheckCircle,
  Lock,
  Unlock,
  User,
} from "lucide-react"

const WebAuthnVisualizer = () => {
  const [step, setStep] = useState(0)
  const [isRegistering, setIsRegistering] = useState(true)
  const [credentialType, setCredentialType] = useState<"platform" | "cross-platform">("platform")
  const [showSuccess, setShowSuccess] = useState(false)

  const registrationSteps = [
    { title: "Challenge Generation", icon: Lock, desc: "Server generates random challenge" },
    { title: "Key Pair Creation", icon: Key, desc: "Browser creates public/private key pair" },
    { title: "Private Key Storage", icon: Fingerprint, desc: "Private key stored in authenticator" },
    { title: "Public Key Registration", icon: User, desc: "Public key sent to server" },
  ]

  const authenticationSteps = [
    { title: "Challenge Received", icon: Lock, desc: "Server sends authentication challenge" },
    { title: "User Verification", icon: Fingerprint, desc: "User authenticates with device" },
    { title: "Challenge Signing", icon: Key, desc: "Private key signs the challenge" },
    { title: "Signature Verification", icon: CheckCircle, desc: "Server verifies with public key" },
  ]

  const currentSteps = isRegistering ? registrationSteps : authenticationSteps

  const simulateProcess = () => {
    setShowSuccess(false)
    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < currentSteps.length) {
        setStep(currentStep)
        currentStep++
      } else {
        clearInterval(interval)
        setShowSuccess(true)
      }
    }, 1500)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30"
        >
          <Shield className="h-10 w-10 text-primary" />
        </motion.div>
        <h2 className="text-3xl font-bold gradient-text">WebAuthn & Passkeys</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Web Authentication (WebAuthn) enables passwordless authentication using public-key cryptography. Private keys never leave the authenticator device.
        </p>
      </div>

      {/* Mode Selection */}
      <div className="flex justify-center gap-4">
        <Button
          variant={isRegistering ? "default" : "outline"}
          onClick={() => {
            setIsRegistering(true)
            setStep(0)
            setShowSuccess(false)
          }}
          className="gap-2"
        >
          <Key className="h-4 w-4" />
          Registration
        </Button>
        <Button
          variant={!isRegistering ? "default" : "outline"}
          onClick={() => {
            setIsRegistering(false)
            setStep(0)
            setShowSuccess(false)
          }}
          className="gap-2"
        >
          <Unlock className="h-4 w-4" />
          Authentication
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Panel - Animation */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isRegistering ? (
                <>
                  <Key className="h-5 w-5 text-primary" />
                  Registration Flow
                </>
              ) : (
                <>
                  <Unlock className="h-5 w-5 text-primary" />
                  Authentication Flow
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Credential Type Selection (Registration only) */}
            {isRegistering && (
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  className={`p-4 rounded-xl border-2 transition-all ${
                    credentialType === "platform"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setCredentialType("platform")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Fingerprint className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Platform</div>
                  <div className="text-xs text-muted-foreground">Touch ID, Windows Hello</div>
                </motion.button>
                <motion.button
                  className={`p-4 rounded-xl border-2 transition-all ${
                    credentialType === "cross-platform"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setCredentialType("cross-platform")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Key className="h-8 w-8 mx-auto mb-2 text-secondary" />
                  <div className="font-medium">Cross-Platform</div>
                  <div className="text-xs text-muted-foreground">YubiKey, Security Key</div>
                </motion.button>
              </div>
            )}

            {/* Animated Flow */}
            <div className="relative py-8">
              {/* Connection Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

              {/* Steps */}
              <div className="space-y-6">
                {currentSteps.map((s, i) => (
                  <motion.div
                    key={i}
                    className="relative flex items-start gap-4 pl-16"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: i <= step ? 1 : 0.3,
                      x: i <= step ? 0 : -10,
                    }}
                  >
                    {/* Step Indicator */}
                    <div
                      className={`absolute left-0 w-16 h-16 rounded-2xl flex items-center justify-center z-10 ${
                        i < step
                          ? "bg-green-500"
                          : i === step
                          ? "bg-primary animate-pulse"
                          : "bg-muted"
                      }`}
                    >
                      {i < step ? (
                        <CheckCircle className="h-8 w-8 text-white" />
                      ) : (
                        <s.icon className={`h-8 w-8 ${i === step ? "text-white" : "text-muted-foreground"}`} />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 p-4 rounded-xl bg-muted/30 border border-border/50">
                      <h4 className="font-semibold">{s.title}</h4>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                      {i === step && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2 flex items-center gap-2 text-sm text-primary"
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          />
                          Processing...
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <Button onClick={simulateProcess} className="w-full btn-shine" disabled={showSuccess}>
              {isRegistering ? "Start Registration" : "Start Authentication"}
            </Button>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <CheckCircle className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-green-500 mb-2">
                    {isRegistering ? "Registration Successful!" : "Authentication Successful!"}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRegistering
                      ? `Created ${credentialType === "platform" ? "platform" : "cross-platform"} credential`
                      : "You're now securely authenticated"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Right Panel - Details & Diagram */}
        <div className="space-y-6">
          {/* How It Works Diagram */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Cryptographic Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Registration */}
                <div className="p-4 rounded-xl bg-muted/30">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Key className="h-4 w-4 text-primary" />
                    Registration
                  </h4>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-primary/20 flex items-center justify-center mb-2">
                        <Laptop className="h-8 w-8 text-primary" />
                      </div>
                      <div className="font-medium">Browser</div>
                    </div>
                    <div className="flex-1 px-4">
                      <div className="border-t-2 border-dashed border-primary/30 relative">
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 px-2 py-1 bg-primary text-white text-xs rounded-full"
                          animate={{ left: ["0%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        >
                          challenge
                        </motion.div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-secondary/20 flex items-center justify-center mb-2">
                        <Fingerprint className="h-8 w-8 text-secondary" />
                      </div>
                      <div className="font-medium">Authenticator</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <span className="text-primary">Browser</span> generates key pair
                    <br />
                    <span className="text-secondary">Authenticator</span> stores private key, returns public key
                  </div>
                </div>

                {/* Authentication */}
                <div className="p-4 rounded-xl bg-muted/30">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Unlock className="h-4 w-4 text-green-500" />
                    Authentication
                  </h4>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-green-500/20 flex items-center justify-center mb-2">
                        <Laptop className="h-8 w-8 text-green-500" />
                      </div>
                      <div className="font-medium">Browser</div>
                    </div>
                    <div className="flex-1 px-4">
                      <div className="border-t-2 border-dashed border-green-500/30 relative">
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 px-2 py-1 bg-green-500 text-white text-xs rounded-full"
                          animate={{ left: ["0%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.5 }}
                        >
                          challenge
                        </motion.div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-secondary/20 flex items-center justify-center mb-2">
                        <Fingerprint className="h-8 w-8 text-secondary" />
                      </div>
                      <div className="font-medium">Authenticator</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <span className="text-green-500">Browser</span> sends challenge
                    <br />
                    <span className="text-secondary">Authenticator</span> signs with private key
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passkeys Info */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Passkeys
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="font-medium mb-1">Sync</div>
                  <p className="text-sm text-muted-foreground">
                    Backed up and synced across devices via iCloud/Google
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="font-medium mb-1">Shareable</div>
                  <p className="text-sm text-muted-foreground">
                    Can be shared with family or trusted contacts
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="font-medium mb-1">Phishing Resistant</div>
                  <p className="text-sm text-muted-foreground">
                    Bound to specific website domain
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="font-medium mb-1">No Passwords</div>
                  <p className="text-sm text-muted-foreground">
                    Biometric or PIN unlock only
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Code Example */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>WebAuthn Registration & Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="p-4 rounded-xl bg-muted/50 overflow-x-auto text-sm">
            <code>{`// Registration
const registerCredential = async () => {
  // 1. Get challenge from server
  const challenge = await fetch('/auth/webauthn/register-challenge')
    .then(r => r.json())

  // 2. Create credential
  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: Uint8Array.from(challenge.challenge, c => c.charCodeAt(0)),
      rp: { id: 'example.com', name: 'Example App' },
      user: {
        id: Uint8Array.from(userId, c => c.charCodeAt(0)),
        name: user.email,
        displayName: user.name
      },
      pubKeyCredParams: [
        { type: 'public-key', alg: -7 }  // ES256
      ],
      authenticatorSelection: {
        userVerification: 'preferred',
        residentKey: 'required'
      }
    }
  })

  // 3. Send credential to server
  await fetch('/auth/webauthn/register', {
    method: 'POST',
    body: JSON.stringify(credential)
  })
}

// Authentication
const authenticate = async () => {
  const challenge = await fetch('/auth/webauthn/auth-challenge')
    .then(r => r.json())

  const credential = await navigator.credentials.get({
    publicKey: {
      challenge: Uint8Array.from(challenge.challenge, c => c.charCodeAt(0)),
      rpId: 'example.com',
      userVerification: 'preferred'
    }
  })

  await fetch('/auth/webauthn/authenticate', {
    method: 'POST',
    body: JSON.stringify(credential)
  })
}`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}

export default WebAuthnVisualizer
