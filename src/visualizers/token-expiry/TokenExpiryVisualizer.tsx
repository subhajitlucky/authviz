import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Clock, RefreshCw, Key, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export function TokenExpiryVisualizer() {
  const [accessExp, setAccessExp] = useState(100)
  const [state, setState] = useState<"valid" | "expired" | "refreshed">("valid")

  useEffect(() => {
    if (state === "valid") {
      const timer = setInterval(() => {
        setAccessExp((prev) => {
          if (prev <= 0) {
            setState("expired")
            return 0
          }
          return prev - 2
        })
      }, 200)
      return () => clearInterval(timer)
    }
  }, [state])

  const refreshToken = () => {
    setState("refreshed")
    setAccessExp(100)
    setTimeout(() => setState("valid"), 500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Token Lifecycle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-8">
            {/* Token Lifetimes */}
            <div className="grid grid-cols-2 gap-8 w-full max-w-md">
              <div className="text-center">
                <div className="relative mb-2">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto"
                    animate={{ scale: state === "expired" ? [1, 0.9, 1] : 1 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Key className="h-10 w-10 text-primary" />
                  </motion.div>
                  {state === "expired" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                  )}
                </div>
                <p className="font-medium">Access Token</p>
                <p className="text-xs text-muted-foreground">15 minutes</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-success/10 border-2 border-success flex items-center justify-center mx-auto">
                  <RefreshCw className="h-10 w-10 text-success" />
                </div>
                <p className="font-medium">Refresh Token</p>
                <p className="text-xs text-muted-foreground">7-30 days</p>
              </div>
            </div>

            {/* Access Token Expiry Bar */}
            <div className="w-full max-w-md">
              <div className="flex justify-between text-sm mb-2">
                <span>Access Token Valid</span>
                <span className={state === "expired" ? "text-destructive" : ""}>
                  {state === "expired" ? "Expired!" : `${Math.round(accessExp / 10)} min remaining`}
                </span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${state === "expired" ? "bg-destructive" : "bg-primary"}`}
                  animate={{ width: `${accessExp}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              {state === "expired" ? (
                <button
                  onClick={refreshToken}
                  className="flex items-center gap-2 px-6 py-3 bg-warning text-warning-foreground rounded-lg font-medium"
                >
                  <RefreshCw className="h-5 w-5" />
                  Refresh Token
                </button>
              ) : state === "refreshed" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-6 py-3 bg-success text-success-foreground rounded-lg font-medium"
                >
                  <CheckCircle className="h-5 w-5" />
                  Token Refreshed!
                </motion.div>
              ) : (
                <button
                  onClick={() => setAccessExp(100)}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
                >
                  <Clock className="h-5 w-5" />
                  Reset Timer
                </button>
              )}
            </div>

            {/* State Message */}
            {state === "expired" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-destructive/10 border border-destructive rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <p className="font-medium text-destructive">Access Token Expired!</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  API requests will fail. Use the refresh token to get a new access token.
                </p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Why Expiry Matters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Why Token Expiry is Important</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
              <h4 className="font-medium text-success mb-2">Benefits of Expiry</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Limits exposure if token is stolen</li>
                <li>• Forces periodic re-authentication</li>
                <li>• Allows server to invalidate sessions</li>
                <li>• Reduces risk of token replay attacks</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Access token: 5-15 minutes</li>
                <li>• Refresh token: 7-30 days</li>
                <li>• Implement refresh token rotation</li>
                <li>• Detect token reuse for security</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Token Rotation Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4 flex-wrap py-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-primary/10 border-2 border-primary flex items-center justify-center mb-2">
                <Key className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs font-medium">Get Tokens</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-muted border-2 flex items-center justify-center mb-2">
                <Clock className="h-8 w-8" />
              </div>
              <p className="text-xs font-medium">Use Access Token</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-warning/10 border-2 border-warning flex items-center justify-center mb-2">
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
              <p className="text-xs font-medium">Access Expires</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-success/10 border-2 border-success flex items-center justify-center mb-2">
                <RefreshCw className="h-8 w-8 text-success" />
              </div>
              <p className="text-xs font-medium">Refresh</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-primary/10 border-2 border-primary flex items-center justify-center mb-2">
                <Key className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs font-medium">New Tokens</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
