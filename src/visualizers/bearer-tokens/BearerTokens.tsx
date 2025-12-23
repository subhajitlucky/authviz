import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Key, ArrowRight, Shield, AlertTriangle, Server, Lock } from "lucide-react"
import { useState } from "react"

export function BearerTokensVisualizer() {
  const [showBearer, setShowBearer] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-8">
            {/* Flow Diagram */}
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {/* Client */}
              <motion.div
                className="flex flex-col items-center"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                  <Key className="h-8 w-8 text-primary" />
                </div>
                <p className="font-medium text-sm mt-2">Client</p>
              </motion.div>

              <ArrowRight className="h-6 w-6 text-muted-foreground" />

              {/* Authorization Header */}
              <motion.div
                className={`p-4 rounded-lg border-2 transition-all ${
                  showBearer ? "bg-primary/10 border-primary" : "bg-muted border-muted-foreground"
                }`}
                animate={{ scale: showBearer ? [1, 1.05, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Authorization Header</p>
                </div>
              </motion.div>

              <ArrowRight className="h-6 w-6 text-muted-foreground" />

              {/* Server */}
              <motion.div
                className="flex flex-col items-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <div className="w-16 h-16 rounded-xl bg-muted border-2 border-muted-foreground flex items-center justify-center">
                  <Server className="h-8 w-8" />
                </div>
                <p className="font-medium text-sm mt-2">Server</p>
              </motion.div>
            </div>

            {/* Header Format */}
            <div className="w-full max-w-lg">
              <button
                onClick={() => setShowBearer(!showBearer)}
                className="w-full p-4 bg-muted rounded-lg text-left"
              >
                <p className="text-sm font-medium mb-2">Authorization Header Format:</p>
                <code className="text-xs bg-background p-3 rounded block font-mono">
                  {showBearer ? (
                    <span>
                      <span className="text-primary">Authorization</span>:{" "}
                      <span className="text-success">Bearer</span>{" "}
                      <span className="text-muted-foreground">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</span>
                    </span>
                  ) : (
                    "Click to reveal header format"
                  )}
                </code>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How Bearer Tokens Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                1
              </div>
              <div>
                <p className="font-medium">Client receives token</p>
                <p className="text-sm text-muted-foreground">
                  After authentication, the client receives a JWT access token.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                2
              </div>
              <div>
                <p className="font-medium">Add to Authorization header</p>
                <p className="text-sm text-muted-foreground">
                  Client adds header: <code className="text-xs bg-muted p-1 rounded">Bearer &lt;token&gt;</code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                3
              </div>
              <div>
                <p className="font-medium">Server validates token</p>
                <p className="text-sm text-muted-foreground">
                  Server extracts token, verifies signature, checks claims, and processes request.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center font-medium text-sm">
                4
              </div>
              <div>
                <p className="font-medium">Response sent back</p>
                <p className="text-sm text-muted-foreground">
                  If valid, server returns requested data. If invalid, returns 401 Unauthorized.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notes */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Security Warning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Bearer tokens are like cash - whoever has them can use them</li>
              <li>• Never expose tokens in URLs (they get logged)</li>
              <li>• Store securely (HTTP-only cookies recommended)</li>
              <li>• Always use HTTPS</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Use short-lived access tokens</li>
              <li>• Implement token rotation</li>
              <li>• Validate token on every request</li>
              <li>• Log authentication events</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
