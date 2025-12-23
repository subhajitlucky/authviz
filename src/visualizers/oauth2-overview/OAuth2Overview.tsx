import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Users, Server, Shield, Key, ArrowRight, Globe, CheckCircle } from "lucide-react"
import { useState } from "react"

export function OAuth2OverviewVisualizer() {
  const [step, setStep] = useState(0)

  const steps = [
    { label: "User", description: "Wants to access a third-party app" },
    { label: "Redirect", description: "App redirects to authorization server" },
    { label: "Approve", description: "User grants permission" },
    { label: "Token", description: "App receives access token" },
    { label: "Access", description: "App accesses resources with token" },
  ]

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => setStep(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  i === step
                    ? "bg-primary text-primary-foreground"
                    : i < step
                    ? "bg-success text-success-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <CheckCircle className="h-4 w-4" /> : i + 1}
              </button>
              {i < steps.length - 1 && (
                <div className={`w-8 h-1 mx-1 ${i < step ? "bg-success" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="min-h-[300px] flex items-center justify-center">
            {/* Step 0: User */}
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Users className="h-20 w-20 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">User Wants Access</h3>
                <p className="text-muted-foreground max-w-md">
                  User wants to use a third-party application (e.g., a fitness app)
                  that needs access to their health data stored elsewhere.
                </p>
              </motion.div>
            )}

            {/* Step 1: Redirect */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full max-w-2xl"
              >
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  <div className="text-center">
                    <Globe className="h-16 w-16 mx-auto text-primary mb-2" />
                    <p className="font-medium">Third-Party App</p>
                  </div>
                  <ArrowRight className="h-8 w-8 text-muted-foreground animate-pulse" />
                  <div className="text-center">
                    <Shield className="h-16 w-16 mx-auto text-success mb-2" />
                    <p className="font-medium">Auth Server</p>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  App redirects user to login with their credentials at the auth server
                </p>
              </motion.div>
            )}

            {/* Step 2: Approve */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <Key className="h-20 w-20 mx-auto text-warning mb-4" />
                <h3 className="text-xl font-semibold mb-2">User Grants Permission</h3>
                <p className="text-muted-foreground max-w-md">
                  User sees a consent screen showing what permissions the app is requesting.
                  They approve the access.
                </p>
              </motion.div>
            )}

            {/* Step 3: Token */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full max-w-2xl"
              >
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  <div className="text-center">
                    <Shield className="h-16 w-16 mx-auto text-success mb-2" />
                    <p className="font-medium">Auth Server</p>
                  </div>
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <Globe className="h-16 w-16 mx-auto text-primary mb-2" />
                    <p className="font-medium">Third-Party App</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-success/10 border border-success rounded-lg text-center">
                  <p className="text-sm font-medium text-success">Access Token Received!</p>
                  <code className="text-xs block mt-2">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</code>
                </div>
              </motion.div>
            )}

            {/* Step 4: Access */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl"
              >
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  <div className="text-center">
                    <Globe className="h-16 w-16 mx-auto text-primary mb-2" />
                    <p className="font-medium">App</p>
                  </div>
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <Server className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                    <p className="font-medium">Resource Server</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-primary/10 border border-primary rounded-lg text-center">
                  <CheckCircle className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="font-medium">Access Granted!</p>
                  <p className="text-sm text-muted-foreground">
                    App uses the token to access user data from the resource server
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* What OAuth2 Solves */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What OAuth2 Solves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Without OAuth2</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• User gives password to third-party app</li>
                <li>• App has full access to account</li>
                <li>• Can't revoke access without changing password</li>
                <li>• Compromised app = compromised account</li>
              </ul>
            </div>
            <div className="p-4 bg-success/10 border border-success rounded-lg">
              <h4 className="font-medium mb-2 text-success">With OAuth2</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• User never shares password</li>
                <li>• Granular permissions (scopes)</li>
                <li>• Revoke access anytime</li>
                <li>• Limited access if app is compromised</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
