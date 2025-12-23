import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { User, Globe, Lock, ArrowRight, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { useState } from "react"

export function CSRFVisualizer() {
  const [step, setStep] = useState(0)

  const steps = [
    { label: "Logged In", description: "User is logged into banking site" },
    { label: "Malicious Site", description: "User visits attacker's website" },
    { label: "Forged Request", description: "Attacker's site sends request" },
    { label: "Cookie Sent", description: "Browser automatically includes cookies" },
    { label: "Attack Complete", description: "Request processed - money transferred!" },
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
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  i === step
                    ? "bg-primary text-primary-foreground"
                    : i < step
                    ? "bg-success text-success-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <CheckCircle className="h-5 w-5" /> : i + 1}
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
          <div className="min-h-[280px] flex items-center justify-center">
            {/* Step 0: User logged in */}
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <motion.div
                      className="w-24 h-24 rounded-full bg-success/20 border-2 border-success flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <User className="h-12 w-12 text-success" />
                    </motion.div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">User Logged In</h3>
                <p className="text-muted-foreground max-w-md">
                  User has an active session with their banking website.
                  The session cookie is stored in the browser.
                </p>
              </motion.div>
            )}

            {/* Step 1: Malicious site */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-8 flex-wrap justify-center"
              >
                <div className="text-center">
                  <Globe className="h-16 w-16 mx-auto mb-2 text-success" />
                  <p className="font-medium">Banking Site</p>
                  <p className="text-xs text-muted-foreground">https://mybank.com</p>
                </div>
                <ArrowRight className="h-8 w-8 text-muted-foreground" />
                <div className="text-center">
                  <Globe className="h-16 w-16 mx-auto mb-2 text-destructive" />
                  <p className="font-medium">Malicious Site</p>
                  <p className="text-xs text-muted-foreground">https://attacker.com</p>
                </div>
                <p className="w-full text-center text-sm text-muted-foreground mt-4">
                  User clicks a link to the attacker's website...
                </p>
              </motion.div>
            )}

            {/* Step 2: Forged Request */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <AlertTriangle className="h-16 w-16 mx-auto text-warning mb-4" />
                <h3 className="text-xl font-semibold mb-2">Hidden Form Submission</h3>
                <p className="text-muted-foreground max-w-md mb-4">
                  The malicious page contains a hidden form that submits to the banking site:
                </p>
                <div className="bg-muted rounded-lg p-4 text-left max-w-md mx-auto">
                  <code className="text-xs block">
                    {"<form action='https://mybank.com/transfer'>"}
                    <br />
                    {"  <input name='to' value='attacker-account' />"}
                    <br />
                    {"  <input name='amount' value='10000' />"}
                    <br />
                    {"</form>"}
                  </code>
                </div>
              </motion.div>
            )}

            {/* Step 3: Cookies sent */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-8 flex-wrap justify-center"
              >
                <div className="text-center">
                  <Globe className="h-16 w-16 mx-auto mb-2 text-destructive" />
                  <p className="font-medium">Attacker Site</p>
                </div>
                <div className="flex flex-col items-center">
                  <motion.div
                    className="px-3 py-1 bg-warning/20 text-warning text-xs rounded-full font-mono"
                    animate={{ x: [0, 30, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    Cookie: session_id=abc123
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-2">Browser auto-includes cookies!</p>
                </div>
                <div className="text-center">
                  <Lock className="h-16 w-16 mx-auto mb-2 text-success" />
                  <p className="font-medium">Banking Site</p>
                </div>
              </motion.div>
            )}

            {/* Step 4: Attack complete */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <AlertTriangle className="h-20 w-20 mx-auto text-destructive mb-4" />
                <h3 className="text-xl font-bold text-destructive mb-2">Attack Successful!</h3>
                <p className="text-muted-foreground max-w-md">
                  The server processes the request because it includes the valid session cookie.
                  The attacker has transferred $10,000 to their account!
                </p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Prevention Methods */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Shield className="h-10 w-10 mx-auto text-success mb-2" />
            <h4 className="font-medium mb-1">CSRF Tokens</h4>
            <p className="text-xs text-muted-foreground">
              Include unique token in forms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Shield className="h-10 w-10 mx-auto text-success mb-2" />
            <h4 className="font-medium mb-1">SameSite Cookies</h4>
            <p className="text-xs text-muted-foreground">
              Cookie only sent on same-site requests
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Shield className="h-10 w-10 mx-auto text-success mb-2" />
            <h4 className="font-medium mb-1">Origin Header</h4>
            <p className="text-xs text-muted-foreground">
              Verify request origin server-side
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Shield className="h-10 w-10 mx-auto text-success mb-2" />
            <h4 className="font-medium mb-1">Custom Headers</h4>
            <p className="text-xs text-muted-foreground">
              CORS blocks cross-origin custom headers
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
