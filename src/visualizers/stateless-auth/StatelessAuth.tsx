import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Server, Key, ArrowRight, CheckCircle, Users } from "lucide-react"
import { useState } from "react"

export function StatelessAuthVisualizer() {
  const [requestCount, setRequestCount] = useState(0)

  const simulateRequest = () => {
    setRequestCount((c) => c + 1)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-8">
            {/* Architecture Diagram */}
            <div className="flex items-center gap-8 flex-wrap justify-center">
              {/* Client */}
              <motion.div
                className="flex flex-col items-center"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="w-20 h-20 rounded-xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <p className="font-medium text-sm mt-2">Client</p>
              </motion.div>

              {/* Arrow with Token */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-mono"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  eyJhbG...
                </motion.div>
                <p className="text-xs text-muted-foreground mt-1">JWT Token</p>
              </div>

              {/* Server */}
              <motion.div
                className="flex flex-col items-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <div className="w-20 h-20 rounded-xl bg-muted border-2 border-muted-foreground flex items-center justify-center">
                  <Key className="h-10 w-10" />
                </div>
                <p className="font-medium text-sm mt-2">Server</p>
              </motion.div>

              {/* Arrow */}
              <ArrowRight className="h-6 w-6 text-muted-foreground" />

              {/* Resource */}
              <motion.div
                className="flex flex-col items-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="w-20 h-20 rounded-xl bg-success/10 border-2 border-success flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-success" />
                </div>
                <p className="font-medium text-sm mt-2">Resource</p>
              </motion.div>
            </div>

            {/* Explanation */}
            <div className="text-center max-w-lg p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>No database lookup needed!</strong> The token contains all the information
                the server needs to verify the request. The signature proves the token is authentic.
              </p>
            </div>

            {/* Interactive Request Counter */}
            <button
              onClick={simulateRequest}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Simulate Request ({requestCount} total)
            </button>
          </div>
        </CardContent>
      </Card>

      {/* How Verification Works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How Token Verification Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                1
              </div>
              <div>
                <p className="font-medium">Receive Token</p>
                <p className="text-sm text-muted-foreground">
                  Extract JWT from Authorization header
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                2
              </div>
              <div>
                <p className="font-medium">Split and Decode</p>
                <p className="text-sm text-muted-foreground">
                  Split into header, payload, signature. Decode header and payload (base64).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                3
              </div>
              <div>
                <p className="font-medium">Verify Signature</p>
                <p className="text-sm text-muted-foreground">
                  Recompute signature using header + payload + secret. Compare with received signature.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                4
              </div>
              <div>
                <p className="font-medium">Check Claims</p>
                <p className="text-sm text-muted-foreground">
                  Verify expiration (exp), issuer (iss), audience (aud), and custom claims.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center font-medium text-sm">
                5
              </div>
              <div>
                <p className="font-medium">Grant Access</p>
                <p className="text-sm text-muted-foreground">
                  All checks passed! Process the request using claims from the payload.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Server className="h-10 w-10 mx-auto text-primary mb-2" />
            <h4 className="font-medium">No Database</h4>
            <p className="text-sm text-muted-foreground">
              Every request is self-contained
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-10 w-10 mx-auto text-primary mb-2" />
            <h4 className="font-medium">Scalable</h4>
            <p className="text-sm text-muted-foreground">
              Any server can verify tokens
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Key className="h-10 w-10 mx-auto text-primary mb-2" />
            <h4 className="font-medium">Secure</h4>
            <p className="text-sm text-muted-foreground">
              Cryptographic verification
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
