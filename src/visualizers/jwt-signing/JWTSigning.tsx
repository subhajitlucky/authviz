import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Lock, FileKey, Eye, Shield, ArrowRight, Check, X } from "lucide-react"
import { useState } from "react"

export function JWTSigningVisualizer() {
  const [mode, setMode] = useState<"signing" | "encryption">("signing")
  const [tampered, setTampered] = useState(false)

  return (
    <div className="space-y-6">
      {/* Toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => { setMode("signing"); setTampered(false); }}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            mode === "signing"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Signing (Integrity)
        </button>
        <button
          onClick={() => { setMode("encryption"); setTampered(false); }}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            mode === "encryption"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Encryption (Confidentiality)
        </button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-8">
            {/* Signing Flow */}
            {mode === "signing" && (
              <div className="w-full max-w-2xl">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {/* Original Data */}
                  <motion.div
                    className="p-4 bg-primary/10 border border-primary rounded-lg"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <FileKey className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-sm font-medium">Header + Payload</p>
                  </motion.div>

                  <ArrowRight className="h-6 w-6 text-muted-foreground" />

                  {/* Signing Process */}
                  <motion.div
                    className="p-4 bg-muted border border-muted-foreground rounded-lg"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Lock className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Sign with Secret</p>
                  </motion.div>

                  <ArrowRight className="h-6 w-6 text-muted-foreground" />

                  {/* Signed Token */}
                  <motion.div
                    className="p-4 bg-success/10 border border-success rounded-lg"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  >
                    <Shield className="h-8 w-8 mx-auto text-success mb-2" />
                    <p className="text-sm font-medium text-success">Signed JWT</p>
                  </motion.div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">What Signing Proves:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      Token was created by someone with the secret
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      Token has not been modified
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="h-4 w-4 text-destructive" />
                      Does NOT hide the contents (anyone can read)
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Encryption Flow */}
            {mode === "encryption" && (
              <div className="w-full max-w-2xl">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {/* Original Data */}
                  <motion.div
                    className="p-4 bg-primary/10 border border-primary rounded-lg"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <FileKey className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-sm font-medium">Original Data</p>
                  </motion.div>

                  <ArrowRight className="h-6 w-6 text-muted-foreground" />

                  {/* Encryption Process */}
                  <motion.div
                    className="p-4 bg-muted border border-muted-foreground rounded-lg"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Lock className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Encrypt with Key</p>
                  </motion.div>

                  <ArrowRight className="h-6 w-6 text-muted-foreground" />

                  {/* Encrypted Data */}
                  <motion.div
                    className="p-4 bg-warning/10 border border-warning rounded-lg"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  >
                    <Eye className="h-8 w-8 mx-auto text-warning mb-2" />
                    <p className="text-sm font-medium text-warning">Encrypted (JWE)</p>
                  </motion.div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">What Encryption Proves:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      Contents are hidden (only key holder can read)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      Provides confidentiality
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="h-4 w-4 text-destructive" />
                      Does NOT prove authenticity (anyone can encrypt)
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tampering Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Signature Verification Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`flex-1 p-4 rounded-lg border ${tampered ? "bg-destructive/10 border-destructive" : "bg-success/10 border-success"}`}>
                <p className="text-sm font-medium mb-2">Token Payload:</p>
                <code className="text-xs">{"{ \"role\": \"user\" }"}</code>
              </div>

              <ArrowRight className="h-6 w-6 text-muted-foreground" />

              <button
                onClick={() => setTampered(!tampered)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  tampered ? "bg-destructive text-destructive-foreground" : "bg-warning text-warning-foreground"
                }`}
              >
                {tampered ? "Tamper with Payload" : "Original Payload"}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <motion.div
                className={`flex-1 p-4 rounded-lg border ${tampered ? "bg-destructive/20 border-destructive" : "bg-success/20 border-success"}`}
                animate={{ scale: tampered ? [1, 1.02, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <p className="text-sm font-medium mb-2">Signature Verification:</p>
                {tampered ? (
                  <div className="flex items-center gap-2 text-destructive">
                    <X className="h-5 w-5" />
                    <span>FAILED - Signature doesn't match!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-5 w-5" />
                    <span>VALID - Signature verified!</span>
                  </div>
                )}
              </motion.div>
            </div>

            <p className="text-sm text-muted-foreground">
              This is why you should always verify the signature: if someone modifies the payload,
              the signature will no longer match.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Algorithms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Signing Algorithms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">HS256 (HMAC)</h4>
              <p className="text-sm text-muted-foreground">
                Symmetric - same secret for signing and verifying. Fast and simple.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">RS256 (RSA)</h4>
              <p className="text-sm text-muted-foreground">
                Asymmetric - private key signs, public key verifies. Best for distributed systems.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">ES256 (ECDSA)</h4>
              <p className="text-sm text-muted-foreground">
                Elliptic curve - smaller signatures, faster verification than RSA.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
