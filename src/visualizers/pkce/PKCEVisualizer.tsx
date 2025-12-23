import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Key, Shield, Lock, CheckCircle, ArrowRight, XCircle } from "lucide-react"
import { useState } from "react"

export function PKCEVisualizer() {
  const [step, setStep] = useState(0)
  const [isAttack, setIsAttack] = useState(false)

  const normalSteps = [
    { label: "Generate", description: "Create code_verifier and code_challenge" },
    { label: "Auth", description: "Send code_challenge with auth request" },
    { label: "Verify", description: "Server stores code_challenge" },
    { label: "Exchange", description: "Exchange code for token with verifier" },
    { label: "Success", description: "Server verifies and issues token" },
  ]

  const attackSteps = [
    { label: "Intercept", description: "Attacker intercepts authorization code" },
    { label: "Fail", description: "Attacker cannot exchange code (no verifier)" },
    { label: "Protected", description: "Legitimate user completes flow successfully" },
  ]

  const currentSteps: { label: string; description: string }[] = isAttack ? attackSteps : normalSteps

  const nextStep = () => {
    if (step < currentSteps.length - 1) {
      setStep(step + 1)
    }
  }

  const reset = () => {
    setStep(0)
    setIsAttack(false)
  }

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => { setIsAttack(false); reset() }}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            !isAttack
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Normal Flow
        </button>
        <button
          onClick={() => { setIsAttack(true); reset() }}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isAttack
              ? "bg-destructive text-destructive-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Attack Scenario
        </button>
      </div>

      {/* Progress */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {currentSteps.map((_, i) => (
            <div key={i} className="flex items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  i < step
                    ? "bg-success text-success-foreground"
                    : i === step
                    ? isAttack
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
                animate={i === step ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                {i < step ? <CheckCircle className="h-5 w-5" /> : i + 1}
              </motion.div>
              {i < currentSteps.length - 1 && (
                <div className={`w-8 h-1 mx-1 ${i < step ? "bg-success" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="min-h-[320px] flex items-center justify-center">
            {!isAttack && step === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center w-full max-w-lg"
              >
                <Key className="h-16 w-16 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">PKCE: Proof Key for Code Exchange</h3>
                <p className="text-muted-foreground mb-6">
                  PKCE adds cryptographic verification to the OAuth flow, preventing authorization
                  code interception attacks.
                </p>
                <div className="bg-muted rounded-lg p-4 text-left">
                  <p className="text-xs text-muted-foreground mb-2">Step 1: Generate cryptographic values</p>
                  <code className="text-sm block">
                    code_verifier = random_string(43-128 chars)
                    <br />
                    code_challenge = base64url(sha256(code_verifier))
                  </code>
                </div>
                <button
                  onClick={nextStep}
                  className="mt-6 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium mx-auto"
                >
                  Generate Keys
                </button>
              </motion.div>
            )}

            {!isAttack && step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center w-full max-w-lg"
              >
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 border-2 border-primary flex items-center justify-center mb-2">
                      <Key className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-medium text-sm">Client</p>
                  </div>
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-warning/10 border-2 border-warning flex items-center justify-center mb-2">
                      <Shield className="h-8 w-8 text-warning" />
                    </div>
                    <p className="font-medium text-sm">Auth Server</p>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-left">
                  <p className="text-xs text-muted-foreground mb-2">Authorization Request:</p>
                  <code className="text-sm block">
                    GET /authorize?
                    <br />
                    client_id=...
                    <br />
                    code_challenge=M_eY9...
                    <br />
                    code_challenge_method=S256
                  </code>
                </div>
                <button onClick={nextStep} className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg">
                  Send Request
                </button>
              </motion.div>
            )}

            {!isAttack && step === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center w-full max-w-lg"
              >
                <Shield className="h-16 w-16 mx-auto text-warning mb-4" />
                <h3 className="font-semibold mb-2">Server Stores Code Challenge</h3>
                <div className="bg-muted rounded-lg p-4 text-left">
                  <code className="text-sm block">
                    Auth Server stores:
                    <br />
                    • code_challenge = "M_eY9..."
                    <br />
                    • code_challenge_method = "S256"
                    <br />
                    <br />
                    Returns: authorization_code
                  </code>
                </div>
                <button onClick={nextStep} className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg">
                  Continue
                </button>
              </motion.div>
            )}

            {!isAttack && step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center w-full max-w-lg"
              >
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 border-2 border-primary flex items-center justify-center mb-2">
                      <Key className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-medium text-sm">Client</p>
                  </div>
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-warning/10 border-2 border-warning flex items-center justify-center mb-2">
                      <Shield className="h-8 w-8 text-warning" />
                    </div>
                    <p className="font-medium text-sm">Auth Server</p>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-left">
                  <p className="text-xs text-muted-foreground mb-2">Token Request (includes verifier):</p>
                  <code className="text-sm block">
                    POST /token
                    <br />
                    code = authorization_code
                    <br />
                    code_verifier = random_string_43_chars
                  </code>
                </div>
                <button onClick={nextStep} className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg">
                  Exchange Code
                </button>
              </motion.div>
            )}

            {!isAttack && step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <CheckCircle className="h-16 w-16 mx-auto text-success mb-4" />
                <h3 className="font-semibold text-success mb-2">PKCE Verification Successful!</h3>
                <div className="bg-muted rounded-lg p-4 text-left max-w-md mx-auto">
                  <p className="text-xs text-muted-foreground mb-2">Server verification:</p>
                  <code className="text-sm block">
                    sha256(code_verifier) == stored_code_challenge?
                    <br />
                    ✓ YES - Issue access token
                  </code>
                </div>
                <button onClick={reset} className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg">
                  Reset Demo
                </button>
              </motion.div>
            )}

            {isAttack && step === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center w-full max-w-lg"
              >
                <Lock className="h-16 w-16 mx-auto text-destructive mb-4" />
                <h3 className="font-semibold text-destructive mb-2">Attack Scenario</h3>
                <p className="text-muted-foreground mb-6">
                  An attacker intercepts the authorization code from the URL. Without PKCE,
                  they could exchange this code for a token!
                </p>
                <div className="bg-destructive/10 border border-destructive rounded-lg p-4 text-left">
                  <p className="text-sm text-destructive font-medium mb-2">Attacker has:</p>
                  <code className="text-sm block text-destructive">
                    authorization_code = "xyz123"
                    <br />
                    client_id = "myapp"
                  </code>
                </div>
                <button onClick={nextStep} className="mt-4 px-6 py-2 bg-destructive text-destructive-foreground rounded-lg">
                  Try to Exchange Code
                </button>
              </motion.div>
            )}

            {isAttack && step === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center w-full max-w-lg"
              >
                <XCircle className="h-16 w-16 mx-auto text-destructive mb-4" />
                <h3 className="font-semibold text-destructive mb-2">Attack Failed!</h3>
                <div className="bg-destructive/10 border border-destructive rounded-lg p-4 text-left">
                  <code className="text-sm block">
                    POST /token
                    <br />
                    code = "xyz123" (intercepted)
                    <br />
                    code_verifier = ?
                    <br />
                    <br />
                    ❌ ERROR: code_verifier required!
                    <br />
                    ❌ SHA256(code_verifier) != code_challenge
                  </code>
                </div>
                <button onClick={nextStep} className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg">
                  See What Happens Next
                </button>
              </motion.div>
            )}

            {isAttack && step === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <CheckCircle className="h-16 w-16 mx-auto text-success mb-4" />
                <h3 className="font-semibold text-success mb-2">Legitimate User Completes Flow</h3>
                <p className="text-muted-foreground mb-4">
                  Only the client with the original code_verifier can complete the exchange.
                  The intercepted code is useless to the attacker!
                </p>
                <button onClick={reset} className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg">
                  Reset Demo
                </button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* PKCE Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Why Use PKCE?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
              <h4 className="font-medium text-success mb-2">PKCE Protects Against</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Authorization code interception</li>
                <li>• Malicious apps stealing codes</li>
                <li>• Public client attacks</li>
                <li>• Code replay attacks</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">When to Use PKCE</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Mobile apps (required by OAuth 2.1)</li>
                <li>• Single-page applications</li>
                <li>• Any public client</li>
                <li>• Best practice for all clients</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
