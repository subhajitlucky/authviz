import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Users, Globe, Shield, Key, ArrowRight, CheckCircle } from "lucide-react"
import { useState } from "react"

export function SSOVisualizer() {
  const [step, setStep] = useState(0)
  const [apps, setApps] = useState<string[]>([])
  const [loggedInApp, setLoggedInApp] = useState<string | null>(null)

  const loginWithSSO = () => {
    setApps(["Jira", "Slack", "GitHub", "Salesforce", "Notion"])
    setStep(1)
  }

  const accessApp = (app: string) => {
    setLoggedInApp(app)
    setTimeout(() => setLoggedInApp(null), 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="min-h-[300px] flex flex-col items-center">
            {/* SSO Provider */}
            <div className="mb-8 text-center">
              <motion.div
                className={`w-24 h-24 rounded-xl border-2 flex items-center justify-center mx-auto ${
                  step >= 1 ? "bg-success/10 border-success" : "bg-muted border-muted-foreground"
                }`}
                animate={{
                  scale: step === 0 ? [1, 1.05, 1] : 1,
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Shield className={`h-12 w-12 ${step >= 1 ? "text-success" : "text-muted-foreground"}`} />
              </motion.div>
              <p className="font-medium mt-2">SSO Provider</p>
              <p className="text-xs text-muted-foreground">Identity Central</p>
            </div>

            {/* Step 0: Login */}
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <p className="text-muted-foreground mb-4">Click login to authenticate once</p>
                <button
                  onClick={loginWithSSO}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
                >
                  <Key className="h-5 w-5" />
                  Login with SSO
                </button>
              </motion.div>
            )}

            {/* Steps 1-4: Accessing apps */}
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <p className="text-center text-sm text-muted-foreground mb-4">
                  SSO session active - accessing apps without re-login:
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {apps.map((app) => (
                    <motion.div
                      key={app}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() => accessApp(app)}
                        className={`w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                          loggedInApp === app
                            ? "bg-success/20 border-success"
                            : "bg-muted border-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        <Globe className="h-8 w-8 mb-1" />
                        <span className="text-xs font-medium">{app}</span>
                        {loggedInApp === app && (
                          <CheckCircle className="h-5 w-5 text-success absolute -top-2 -right-2" />
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
                {loggedInApp && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-4"
                  >
                    <p className="text-success font-medium">
                      ✓ Accessed {loggedInApp} (no login required!)
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SSO Benefits */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Benefits of SSO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                <span>Single password to remember</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                <span>One login for all applications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                <span>Centralized user management</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                <span>Reduced password fatigue</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                <span>Easier to enforce security policies</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              SSO Protocols
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">OpenID Connect (OIDC)</p>
                <p className="text-xs text-muted-foreground">Modern, REST-based protocol built on OAuth2</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">SAML 2.0</p>
                <p className="text-xs text-muted-foreground">XML-based protocol, enterprise standard</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">OAuth2</p>
                <p className="text-xs text-muted-foreground">Authorization framework that SSO can use</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SSO Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How SSO Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2 flex-wrap py-4">
            <div className="px-3 py-2 bg-muted rounded-lg text-sm">User</div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="px-3 py-2 bg-primary/10 border border-primary rounded-lg text-sm">SSO Login</div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="px-3 py-2 bg-success/10 border border-success rounded-lg text-sm">Session</div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="px-3 py-2 bg-muted rounded-lg text-sm">App 1</div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="px-3 py-2 bg-muted rounded-lg text-sm">App 2</div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="px-3 py-2 bg-muted rounded-lg text-sm">App 3</div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Once authenticated with the SSO provider, users can access all connected apps without logging in again.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
