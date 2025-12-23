import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Shield, Smartphone, Key, Clock, CheckCircle, RefreshCw } from "lucide-react"

const TOTPVisualizer = () => {
  const [step, setStep] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [userCode, setUserCode] = useState("")
  const [verified, setVerified] = useState<boolean | null>(null)
  const [secret] = useState("JBSWY3DPEHPK3PXP")

  const steps = [
    {
      title: "Secret Setup",
      description: "Server generates a random secret shared with the authenticator app",
      icon: Key,
    },
    {
      title: "QR Code Scan",
      description: "User scans the QR code containing the secret URI",
      icon: Smartphone,
    },
    {
      title: "Time Synchronization",
      description: "Both device and server use the same 30-second time window",
      icon: Clock,
    },
    {
      title: "Code Generation",
      description: "Authenticator generates a 6-digit code using HMAC-SHA1",
      icon: Shield,
    },
    {
      title: "Verification",
      description: "Server verifies the code against its own calculation",
      icon: CheckCircle,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 30))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const calculateTOTP = useCallback((secret: string, counter: number) => {
    // Simplified TOTP simulation
    const hash = secret.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const code = (hash + counter * 12345) % 1000000
    return code.toString().padStart(6, "0")
  }, [])

  const counter = Math.floor(Date.now() / 1000 / 30)
  const currentCode = calculateTOTP(secret, counter)

  const verifyCode = () => {
    setVerified(userCode === currentCode)
    if (userCode === currentCode) {
      setTimeout(() => {
        setVerified(null)
        setUserCode("")
      }, 2000)
    }
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
        <h2 className="text-3xl font-bold gradient-text">TOTP Time-Based One-Time Password</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          TOTP generates temporary single-use codes synchronized with time. Every 30 seconds, a new code is generated using a shared secret.
        </p>
      </div>

      {/* Interactive Demo */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Panel - Animation */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              Interactive Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Steps */}
            <div className="flex justify-between items-center">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  className={`flex flex-col items-center ${i <= step ? "opacity-100" : "opacity-40"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: i <= step ? 1 : 0.4, y: 0 }}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      i < step ? "bg-green-500" : i === step ? "bg-primary" : "bg-muted"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <s.icon className="h-5 w-5 text-white" />
                  </motion.div>
                  <span className="text-xs mt-1 hidden sm:block">{s.title}</span>
                </motion.div>
              ))}
            </div>

            {/* Timer Circle */}
            <div className="flex justify-center py-4">
              <motion.div
                className="relative w-32 h-32"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-muted"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${(timeLeft / 30) * 283} 283`}
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--secondary))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{timeLeft}</span>
                </div>
              </motion.div>
            </div>

            {/* Current Code Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCode}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
              >
                <div className="text-sm text-muted-foreground mb-2">Current Code</div>
                <div className="text-5xl font-mono font-bold tracking-widest gradient-text">
                  {currentCode.slice(0, 3)} {currentCode.slice(3)}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Verification Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Enter code to verify:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-center text-xl font-mono tracking-widest"
                />
                <Button onClick={verifyCode} disabled={userCode.length !== 6}>
                  Verify
                </Button>
              </div>
              <AnimatePresence>
                {verified !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-2 p-3 rounded-xl ${
                      verified ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {verified ? <CheckCircle className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                    <span>{verified ? "Code verified successfully!" : "Invalid code, try again"}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                Previous
              </Button>
              <Button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}>
                Next
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Details */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>How TOTP Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    {React.createElement(steps[step].icon, { className: "h-6 w-6 text-primary" })}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{steps[step].title}</h3>
                    <p className="text-muted-foreground">{steps[step].description}</p>
                  </div>
                </div>

                {step === 0 && (
                  <div className="mt-6 p-4 rounded-xl bg-muted/50 space-y-2">
                    <div className="text-sm font-mono break-all bg-background p-2 rounded-lg">
                      Secret: {secret}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      The secret is a 160-bit random string encoded in Base32
                    </p>
                  </div>
                )}

                {step === 1 && (
                  <div className="mt-6 p-4 rounded-xl bg-muted/50">
                    <div className="w-32 h-32 mx-auto bg-white rounded-xl flex items-center justify-center">
                      <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Smartphone className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <p className="text-sm text-center mt-2 text-muted-foreground">otpauth://totp/Example:user?secret={secret}</p>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-6 p-4 rounded-xl bg-muted/50 font-mono text-sm">
                    <div className="flex justify-between mb-2">
                      <span>Current Time:</span>
                      <span>{Math.floor(Date.now() / 1000)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Time Step (30s):</span>
                      <span>{counter}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Code Window:</span>
                      <span>{timeLeft}s remaining</span>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="mt-6 p-4 rounded-xl bg-muted/50 font-mono text-sm space-y-2">
                    <div className="text-muted-foreground">Algorithm: HMAC-SHA1(secret, counter)</div>
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 bg-primary/20 rounded text-primary">HMAC</div>
                      <span className="text-muted-foreground">→</span>
                      <div className="px-2 py-1 bg-secondary/20 rounded text-secondary">SHA-1</div>
                      <span className="text-muted-foreground">→</span>
                      <div className="px-2 py-1 bg-accent/20 rounded text-accent">6 digits</div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="mt-6 p-4 rounded-xl bg-muted/50">
                    <h4 className="font-semibold mb-3">Server Verification Process:</h4>
                    <ol className="space-y-2 text-sm list-decimal list-inside">
                      <li>Server calculates TOTP using same secret and current time</li>
                      <li>Server compares calculated code with user input</li>
                      <li>Server allows ±1 time step for clock drift</li>
                      <li>Code is single-use and expires after 30 seconds</li>
                    </ol>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* Code Example */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Implementation Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="p-4 rounded-xl bg-muted/50 overflow-x-auto text-sm">
            <code>{`// Server-side TOTP verification (Node.js)
import * as OTPAuth from 'otpauth'

const totp = new OTPAuth.TOTP({
  issuer: 'ExampleApp',
  label: 'user@example.com',
  algorithm: 'SHA1',
  digits: 6,
  period: 30,
  secret: OTPAuth.Secret.fromBase32('${secret}')
})

// Generate current code (for testing)
const currentCode = totp.generate()
console.log('Current TOTP:', currentCode)

// Verify user input
const userEntered = '123456' // User's input
const delta = totp.validate({ token: userEntered })

if (delta !== null) {
  console.log('Valid TOTP! Delta:', delta)
} else {
  console.log('Invalid TOTP')
}

// Using speakeasy library
import speakeasy from 'speakeasy'

const secret = speakeasy.generateSecret({
  name: 'ExampleApp (user@example.com)',
  length: 20
})

const token = speakeasy.totp({
  secret: secret.base32,
  encoding: 'base32',
  step: 30,
  window: 1 // Allow ±1 time step
})`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}

export default TOTPVisualizer
