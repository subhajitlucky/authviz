import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Key, RefreshCw, Clock, Shield, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react"
import { useState } from "react"

export function AccessRefreshTokensVisualizer() {
  const [step, setStep] = useState(0)
  const [accessExpiry, setAccessExpiry] = useState(0)

  const steps = [
    { label: "Login", description: "User authenticates" },
    { label: "Tokens Issued", description: "Both tokens received" },
    { label: "Use Access Token", description: "Make API requests" },
    { label: "Access Expired", description: "Access token needs refresh" },
    { label: "Refresh", description: "Exchange refresh token" },
    { label: "New Tokens", description: "Get fresh access token" },
  ]

  const simulateExpiry = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setAccessExpiry(progress)
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 300)
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => { setStep(i); if (i === 2) simulateExpiry(); }}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              i === step
                ? "bg-primary text-primary-foreground"
                : i < step
                ? "bg-success/20 text-success"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-8">
            {/* Step 0-1: Login */}
            {(step === 0 || step === 1) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-6 flex-wrap justify-center"
              >
                <div className="text-center">
                  <Key className="h-12 w-12 mx-auto text-primary mb-2" />
                  <p className="font-medium">User Logs In</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div className="text-center">
                  <div className="w-24 h-16 rounded-lg bg-primary/10 border-2 border-primary flex items-center justify-center mb-2">
                    <span className="text-xs font-mono text-primary">ACCESS</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Short-lived (15 min)</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-16 rounded-lg bg-success/10 border-2 border-success flex items-center justify-center mb-2">
                    <span className="text-xs font-mono text-success">REFRESH</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Long-lived (7 days)</p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Using Access Token */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl"
              >
                <div className="text-center mb-4">
                  <Key className="h-12 w-12 mx-auto text-primary mb-2" />
                  <p className="font-medium">Making API Requests with Access Token</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">Authorization Header:</p>
                    <code className="text-xs bg-background p-2 rounded block">
                      Authorization: Bearer eyJhbGci...short_expiry
                    </code>
                  </div>

                  <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="absolute h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: `${accessExpiry}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium">
                        Token expires in {Math.round((100 - accessExpiry) * 0.9)} minutes
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={simulateExpiry}
                    className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium"
                  >
                    Simulate Time Passing
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Expired */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <AlertTriangle className="h-16 w-16 mx-auto text-destructive mb-4" />
                <h3 className="text-xl font-bold text-destructive mb-2">Access Token Expired!</h3>
                <p className="text-muted-foreground max-w-md">
                  The access token has reached its expiration time. The user needs to
                  get a new one using the refresh token.
                </p>
              </motion.div>
            )}

            {/* Step 4-5: Refresh */}
            {(step === 4 || step === 5) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl"
              >
                <div className="flex items-center gap-4 justify-center flex-wrap">
                  <div className="text-center">
                    <RefreshCw className="h-12 w-12 mx-auto text-warning mb-2 animate-spin" />
                    <p className="font-medium">Refresh Token</p>
                    <p className="text-xs text-muted-foreground">Used to get new tokens</p>
                  </div>

                  <ArrowRight className="h-6 w-6 text-muted-foreground" />

                  <div className="text-center">
                    <RefreshCw className="h-12 w-12 mx-auto text-success mb-2" />
                    <p className="font-medium">New Tokens</p>
                    <p className="text-xs text-muted-foreground">Fresh access + refresh</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-success/10 border border-success rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="font-medium">Token Rotation Complete!</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Both the access token and refresh token have been replaced with new ones.
                    This limits exposure if a refresh token was compromised.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              Access Token
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Lifetime: 5-15 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span>Sent with every API request</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span>If stolen, limited exposure time</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-success" />
              Refresh Token
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Lifetime: 7-30 days</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span>Stored securely, used rarely</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span>If stolen, attacker can get new access tokens</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
