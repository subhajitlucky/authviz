import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { encodeBase64 } from "@/lib/utils"
import {
  Key, Shield, User, Server, ArrowRight, RefreshCw, AlertTriangle,
  CheckCircle, XCircle, Eye, EyeOff, Play, Pause, RotateCcw, Copy
} from "lucide-react"

type LabState = "idle" | "logging_in" | "token_issued" | "api_request" | "verified" | "expired"

interface JWTPart {
  header: Record<string, unknown>
  payload: Record<string, unknown>
}

export function LabPage() {
  const [labState, setLabState] = useState<LabState>("idle")
  const [showPayload, setShowPayload] = useState(true)
  const [jwtParts, setJwtParts] = useState<JWTPart>({
    header: { alg: "HS256", typ: "JWT" },
    payload: { sub: "user123", role: "admin", iat: Date.now() },
  })
  const [token, setToken] = useState("")

  const generateToken = () => {
    const header = { alg: "HS256", typ: "JWT" }
    const payload = {
      sub: "user123",
      role: "admin",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    }
    setJwtParts({ header, payload })
    const encoded = `${encodeBase64(header)}.${encodeBase64(payload)}.fake_signature_for_demo`
    setToken(encoded)
    return encoded
  }

  const simulateLogin = () => {
    setLabState("logging_in")
    setTimeout(() => {
      const newToken = generateToken()
      setToken(newToken)
      setLabState("token_issued")
    }, 1500)
  }

  const simulateApiRequest = () => {
    if (labState !== "token_issued") return
    setLabState("api_request")
    setTimeout(() => {
      const now = Math.floor(Date.now() / 1000)
      const exp = jwtParts.payload.exp as number
      if (now > exp) {
        setLabState("expired")
      } else {
        setLabState("verified")
      }
    }, 2000)
  }

  const resetLab = () => {
    setLabState("idle")
    setToken("")
    setJwtParts({
      header: { alg: "HS256", typ: "JWT" },
      payload: { sub: "user123", role: "admin", iat: Date.now() },
    })
  }

  const refreshToken = () => {
    setLabState("token_issued")
    const newPayload = {
      ...jwtParts.payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    }
    setJwtParts({ ...jwtParts, payload: newPayload })
    const newToken = `${encodeBase64(jwtParts.header)}.${encodeBase64(newPayload)}.fake_signature_for_demo`
    setToken(newToken)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Auth Lab</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interactive playground to understand authentication flows. Click through each step to see
          how tokens work, verify requests, and explore security scenarios.
        </p>
      </div>

      <Tabs defaultValue="jwt" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="jwt">JWT Engine</TabsTrigger>
          <TabsTrigger value="oauth">OAuth2 Flow</TabsTrigger>
          <TabsTrigger value="security">Security Lab</TabsTrigger>
        </TabsList>

        {/* JWT Engine Tab */}
        <TabsContent value="jwt" className="space-y-6 mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Flow Visualization */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Authentication Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-8">
                  {[
                    { state: "idle", icon: User, label: "User", description: "Enter credentials" },
                    { state: "logging_in", icon: Key, label: "Login", description: "Verifying..." },
                    { state: "token_issued", icon: Shield, label: "Token", description: "JWT issued" },
                    { state: "api_request", icon: ArrowRight, label: "API", description: "Sending request" },
                    { state: "verified", icon: CheckCircle, label: "Success", description: "Access granted" },
                  ].map((step) => (
                    <motion.div
                      key={step.state}
                      className={`flex flex-col items-center ${labState === step.state ? "text-primary" : "text-muted-foreground"}`}
                      animate={{
                        scale: labState === step.state ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.5, repeat: labState === step.state ? Infinity : 0 }}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        labState === step.state ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        <step.icon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-medium">{step.label}</span>
                      <span className="text-xs text-muted-foreground">{step.description}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center gap-4 mt-4">
                  <Button onClick={simulateLogin} disabled={labState !== "idle"}>
                    <Play className="mr-2 h-4 w-4" />
                    Simulate Login
                  </Button>
                  <Button
                    onClick={simulateApiRequest}
                    disabled={labState !== "token_issued"}
                    variant="outline"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Make API Request
                  </Button>
                  <Button onClick={resetLab} variant="ghost">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>

                <AnimatePresence>
                  {labState === "verified" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-4 p-4 bg-success/10 border border-success rounded-lg flex items-center gap-2"
                    >
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-success font-medium">Token verified successfully! Access granted.</span>
                    </motion.div>
                  )}
                  {labState === "expired" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-lg flex items-center gap-2"
                    >
                      <XCircle className="h-5 w-5 text-destructive" />
                      <span className="text-destructive font-medium">Token expired! Please refresh.</span>
                      <Button size="sm" variant="outline" onClick={refreshToken} className="ml-auto">
                        Refresh Token
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* JWT Token Viewer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  JWT Token
                </CardTitle>
                <CardDescription>Your generated access token</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted rounded-lg p-4 font-mono text-sm break-all">
                  <span className="jwt-header">{token.split(".")[0]}</span>
                  <span className="text-muted-foreground">.</span>
                  <span className="jwt-payload">{token.split(".")[1]}</span>
                  <span className="text-muted-foreground">.</span>
                  <span className="jwt-signature">{token.split(".")[2]}</span>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(token)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Token
                </Button>
              </CardContent>
            </Card>

            {/* Token Inspector */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Token Inspector
                </CardTitle>
                <CardDescription>Decode and inspect token claims</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 jwt-header">Header</h4>
                    <pre className="bg-muted rounded p-3 text-sm">
                      {JSON.stringify(jwtParts.header, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium jwt-payload">Payload</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPayload(!showPayload)}
                      >
                        {showPayload ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <pre className="bg-muted rounded p-3 text-sm">
                      {showPayload ? JSON.stringify(jwtParts.payload, null, 2) : "********"}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* OAuth2 Flow Tab */}
        <TabsContent value="oauth" className="mt-6">
          <OAuth2FlowVisualizer />
        </TabsContent>

        {/* Security Lab Tab */}
        <TabsContent value="security" className="mt-6">
          <SecurityLab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OAuth2FlowVisualizer() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const steps = [
    {
      label: "User Initiates Login",
      description: "User clicks 'Login' button on the client application",
      from: "user",
      to: "client",
      packet: "click",
      color: "primary",
    },
    {
      label: "Redirect to Authorization Server",
      description: "Client redirects user to authorization endpoint with client_id, redirect_uri, scope, and state",
      from: "client",
      to: "auth_server",
      packet: "auth request",
      color: "warning",
    },
    {
      label: "User Authenticates",
      description: "User enters credentials on authorization server and grants permission",
      from: "user",
      to: "auth_server",
      packet: "credentials",
      color: "primary",
    },
    {
      label: "Authorization Code Issued",
      description: "Auth server redirects back with a temporary authorization code",
      from: "auth_server",
      to: "client",
      packet: "code=xyz123",
      color: "success",
    },
    {
      label: "Exchange Code for Token",
      description: "Client exchanges authorization code for access token (back-channel)",
      from: "client",
      to: "auth_server",
      packet: "code + client_secret",
      color: "warning",
    },
    {
      label: "Access Token Received",
      description: "Auth server returns access token. Client can now access protected resources",
      from: "auth_server",
      to: "client",
      packet: "token=eyJ...",
      color: "success",
    },
    {
      label: "Access Protected Resource",
      description: "Client uses access token to call the resource server API",
      from: "client",
      to: "resource_server",
      packet: "Bearer eyJ...",
      color: "primary",
    },
    {
      label: "Resource Returned",
      description: "Resource server validates token and returns requested data",
      from: "resource_server",
      to: "client",
      packet: "data",
      color: "success",
    },
  ]

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [isPlaying])

  const actors = [
    { id: "user", name: "User", icon: User, x: 80, y: 80 },
    { id: "client", name: "Client App", icon: Shield, x: 320, y: 80 },
    { id: "auth_server", name: "Auth Server", icon: Key, x: 560, y: 80 },
    { id: "resource_server", name: "Resource", icon: Server, x: 560, y: 260 },
  ]

  const getActorPosition = (actorId: string) => {
    const actor = actors.find((a) => a.id === actorId)
    return actor ? { x: actor.x, y: actor.y } : { x: 0, y: 0 }
  }

  const isActorActive = (actorId: string) => {
    const step = steps[currentStep]
    return step?.from === actorId || step?.to === actorId
  }

  const getPacketColor = (color: string) => {
    switch (color) {
      case "success": return "bg-success text-success-foreground"
      case "warning": return "bg-warning text-warning-foreground"
      default: return "bg-primary text-primary-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          OAuth2 Authorization Code Flow
        </CardTitle>
        <CardDescription>Click through each step to understand the complete authentication flow</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Controls */}
        <div className="flex justify-center gap-3 mb-6">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            size="sm"
          >
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Play
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsPlaying(false)
              setCurrentStep(0)
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Flow Visualization */}
        <div className="relative h-[360px] bg-muted/50 rounded-xl border overflow-hidden">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            {/* User to Client */}
            <line x1="160" y1="120" x2="290" y2="120" stroke="currentColor" strokeWidth="2" />
            {/* Client to Auth Server */}
            <line x1="410" y1="120" x2="540" y2="120" stroke="currentColor" strokeWidth="2" />
            {/* Auth Server to Resource Server */}
            <line x1="620" y1="150" x2="620" y2="240" stroke="currentColor" strokeWidth="2" />
          </svg>

          {/* Animated Packet */}
          {steps[currentStep] && (
            <motion.div
              className={`absolute px-3 py-1.5 rounded-full text-xs font-medium shadow-lg z-10 ${getPacketColor(steps[currentStep].color)}`}
              initial={false}
              animate={{
                x: [
                  getActorPosition(steps[currentStep].from).x + 50,
                  getActorPosition(steps[currentStep].to).x + 50,
                ],
                y: [
                  getActorPosition(steps[currentStep].from).y + 60,
                  getActorPosition(steps[currentStep].to).y + 60,
                ],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              {steps[currentStep].packet}
            </motion.div>
          )}

          {/* Actors */}
          {actors.map((actor) => (
            <motion.div
              key={actor.id}
              className={`absolute w-28 h-28 rounded-2xl flex flex-col items-center justify-center shadow-md ${
                isActorActive(actor.id)
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border-2"
              }`}
              style={{
                left: actor.x,
                top: actor.y,
              }}
              animate={{
                scale: isActorActive(actor.id) ? [1, 1.05, 1] : 1,
                boxShadow: isActorActive(actor.id)
                  ? "0 0 20px rgba(var(--primary-rgb), 0.5)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
              }}
              transition={{
                duration: 0.5,
                repeat: isActorActive(actor.id) ? Infinity : 0,
                repeatType: "reverse",
              }}
            >
              <actor.icon className="h-10 w-10 mb-1" />
              <span className="text-xs font-medium text-center leading-tight">{actor.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Step Info */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-card rounded-lg border"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
            <h4 className="font-medium">{steps[currentStep].label}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
        </motion.div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {steps.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setCurrentStep(idx)
                setIsPlaying(false)
              }}
              className={`h-2 w-8 rounded-full transition-all ${
                idx === currentStep
                  ? "bg-primary"
                  : idx < currentStep
                  ? "bg-primary/50"
                  : "bg-muted"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SecurityLab() {
  const [scenario, setScenario] = useState<"expired" | "tampered" | "missing_scope" | null>(null)
  const [result, setResult] = useState<"success" | "failure" | null>(null)

  const scenarios = [
    { id: "expired", label: "Expired Token", description: "Token has expired" },
    { id: "tampered", label: "Tampered Token", description: "Payload was modified" },
    { id: "missing_scope", label: "Missing Scope", description: "Token lacks required permission" },
  ]

  const testScenario = (type: typeof scenario) => {
    setScenario(type)
    setResult(null)

    setTimeout(() => {
      if (type === "expired") setResult("failure")
      else if (type === "tampered") setResult("failure")
      else if (type === "missing_scope") setResult("failure")
      else setResult("success")
    }, 1500)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Security Scenarios
          </CardTitle>
          <CardDescription>Test what happens with invalid tokens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {scenarios.map((s) => (
            <div
              key={s.id}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                scenario === s.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
              }`}
              onClick={() => testScenario(s.id as typeof scenario)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{s.label}</h4>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
                <Button size="sm" variant="outline">
                  Test
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Validation Result</CardTitle>
          <CardDescription>See what the server would do</CardDescription>
        </CardHeader>
        <CardContent>
          {!scenario && (
            <p className="text-muted-foreground text-center py-8">
              Select a scenario to test
            </p>
          )}
          {scenario && !result && (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="mt-4">Validating token...</p>
            </div>
          )}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg ${
                result === "success" ? "bg-success/10 border border-success" : "bg-destructive/10 border border-destructive"
              }`}
            >
              <div className="flex items-center gap-2">
                {result === "success" ? (
                  <CheckCircle className="h-6 w-6 text-success" />
                ) : (
                  <XCircle className="h-6 w-6 text-destructive" />
                )}
                <div>
                  <h4 className="font-medium">{result === "success" ? "Access Granted" : "Access Denied"}</h4>
                  <p className="text-sm text-muted-foreground">
                    {scenario === "expired" && "Token has expired. Please obtain a new token."}
                    {scenario === "tampered" && "Signature verification failed. Token may have been tampered with."}
                    {scenario === "missing_scope" && "Token does not have required scope: admin:write"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
