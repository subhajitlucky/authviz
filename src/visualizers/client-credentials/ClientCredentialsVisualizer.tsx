import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Key, Server, Shield, CheckCircle, ArrowRight, Lock, Globe } from "lucide-react"
import { useState } from "react"

export function ClientCredentialsVisualizer() {
  const [step, setStep] = useState(0)

  const _steps = [
    { label: "Start", description: "Service sends credentials" },
    { label: "Auth", description: "Server validates client_id/secret" },
    { label: "Token", description: "Access token issued" },
    { label: "API", description: "Service accesses resource" },
  ]

  const startFlow = () => {
    setStep(1)
    setTimeout(() => {
      setStep(2)
    }, 1500)
    setTimeout(() => {
      setStep(3)
    }, 3000)
  }

  const reset = () => {
    setStep(0)
  }

  return (
    <div className="space-y-6">
      {/* Flow Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Client Credentials Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {_steps.map((_, i) => (
                <div key={i} className="flex items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      i < step
                        ? "bg-success text-success-foreground"
                        : i === step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                    animate={i === step ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    {i < step ? <CheckCircle className="h-5 w-5" /> : i + 1}
                  </motion.div>
                  {i < _steps.length - 1 && (
                    <div className={`w-12 h-1 mx-1 ${i < step ? "bg-success" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Animated Flow Diagram */}
          <div className="min-h-[300px] flex items-center justify-center">
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <Globe className="h-16 w-16 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Service-to-Service Authentication</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  The Client Credentials flow is used when a service needs to authenticate
                  with another service without user interaction.
                </p>
                <button
                  onClick={startFlow}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium mx-auto"
                >
                  <Key className="h-5 w-5" />
                  Start Flow
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-xl bg-primary/10 border-2 border-primary flex items-center justify-center mb-2">
                      <Globe className="h-10 w-10 text-primary" />
                    </div>
                    <p className="font-medium">Service</p>
                  </div>
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-xl bg-warning/10 border-2 border-warning flex items-center justify-center mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                      <Lock className="h-10 w-10 text-warning" />
                    </motion.div>
                    <p className="font-medium">Auth Server</p>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">
                  POST /oauth/token with client_id and client_secret
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center w-full max-w-md"
              >
                <CheckCircle className="h-16 w-16 mx-auto text-success mb-4" />
                <h3 className="font-semibold mb-2">Access Token Issued!</h3>
                <div className="bg-muted rounded-lg p-4 text-left">
                  <p className="text-xs text-muted-foreground mb-2">Response:</p>
                  <code className="text-sm block">
                    {"{"}
                    <br />
                    {'  "access_token": "eyJhbGciOiJIUzI1Ni..."'}
                    <br />
                    {'  "token_type": "Bearer",'}
                    <br />
                    {'  "expires_in": 3600'
                    }
                    <br />
                    {"}"}
                  </code>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-xl bg-primary/10 border-2 border-primary flex items-center justify-center mb-2">
                      <Globe className="h-10 w-10 text-primary" />
                    </div>
                    <p className="font-medium">Service</p>
                  </div>
                  <ArrowRight className="h-8 w-8 text-success" />
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-xl bg-muted border-2 flex items-center justify-center mb-2">
                      <Server className="h-10 w-10" />
                    </div>
                    <p className="font-medium">Resource</p>
                  </div>
                </div>
                <div className="mt-6 bg-muted rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-xs text-muted-foreground mb-2">API Request:</p>
                  <code className="text-sm block">
                    GET /api/data HTTP/1.1
                    <br />
                    Authorization: Bearer eyJhbGciOiJIUzI1Ni...
                  </code>
                </div>
                <button
                  onClick={reset}
                  className="mt-6 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium mx-auto"
                >
                  <ArrowRight className="h-5 w-5" />
                  Reset Demo
                </button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* When to Use */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">When to Use Client Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
              <h4 className="font-medium text-success mb-2">Use When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Machine-to-machine communication</li>
                <li>• Background jobs accessing APIs</li>
                <li>• Services calling other services</li>
                <li>• No user context required</li>
                <li>• Trusted clients only</li>
              </ul>
            </div>
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <h4 className="font-medium text-destructive mb-2">Don't Use When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• User login is needed</li>
                <li>• Third-party applications</li>
                <li>• Less trusted clients</li>
                <li>• User consent required</li>
                <li>• Offline access needed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <h4 className="font-medium mb-1">Store Secrets Securely</h4>
              <p className="text-sm text-muted-foreground">
                Never hardcode secrets. Use environment variables or secret management services.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Lock className="h-8 w-8 text-primary mb-2" />
              <h4 className="font-medium mb-1">Short Token Lifetimes</h4>
              <p className="text-sm text-muted-foreground">
                Set short expiry times (1 hour) and use refresh tokens if needed.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Key className="h-8 w-8 text-primary mb-2" />
              <h4 className="font-medium mb-1">Rotate Secrets</h4>
              <p className="text-sm text-muted-foreground">
                Regularly rotate client secrets and revoke old ones immediately if compromised.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
