import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Shield, CheckCircle, XCircle, Lock, Globe, Mail, User } from "lucide-react"
import { useState } from "react"

interface Scope {
  name: string
  icon: React.ReactNode
  description: string
  granted: boolean
}

export function ScopesVisualizer() {
  const [scopes, setScopes] = useState<Scope[]>([
    { name: "openid", icon: <User className="h-4 w-4" />, description: "Authenticate user identity", granted: true },
    { name: "profile", icon: <User className="h-4 w-4" />, description: "Access basic profile info", granted: true },
    { name: "email", icon: <Mail className="h-4 w-4" />, description: "Access email address", granted: true },
    { name: "read:users", icon: <Shield className="h-4 w-4" />, description: "Read user data", granted: false },
    { name: "write:users", icon: <Shield className="h-4 w-4" />, description: "Modify user data", granted: false },
    { name: "admin", icon: <Lock className="h-4 w-4" />, description: "Administrative access", granted: false },
  ])

  const toggleScope = (index: number) => {
    const newScopes = [...scopes]
    newScopes[index].granted = !newScopes[index].granted
    setScopes(newScopes)
  }

  const requestedScopes = scopes.filter(s => s.granted)

  return (
    <div className="space-y-6">
      {/* Scope Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            OAuth 2.0 Scopes & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Scopes define what resources and actions an application can access. Toggle scopes
            to see how permissions are requested and granted.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {scopes.map((scope, i) => (
              <motion.div
                key={scope.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => toggleScope(i)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    scope.granted
                      ? "bg-primary/10 border-primary"
                      : "bg-muted border-transparent hover:border-muted-foreground/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={scope.granted ? "text-primary" : "text-muted-foreground"}>
                        {scope.icon}
                      </span>
                      <span className="font-mono text-sm font-medium">{scope.name}</span>
                    </div>
                    {scope.granted ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground/50" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{scope.description}</p>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Requested Scopes Display */}
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-3">Requested Scopes:</p>
            <div className="flex flex-wrap gap-2">
              {scopes.map((scope) => (
                <span
                  key={scope.name}
                  className={`px-3 py-1 rounded-full text-xs font-mono ${
                    scope.granted
                      ? "bg-primary/20 text-primary"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  }`}
                >
                  {scope.granted ? "✓" : "✗"} {scope.name}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authorization Request Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Authorization Request</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 mb-4">
            <p className="text-xs text-muted-foreground mb-2">OAuth 2.0 Authorization Request:</p>
            <code className="text-sm block">
              GET /authorize?
              <br />
              client_id=myapp
              <br />
              redirect_uri=https://myapp.com/callback
              <br />
              scope=openid profile email {requestedScopes.map(s => s.name).filter(n => n !== "openid" && n !== "profile" && n !== "email").join(" ") || ""}
              <br />
              response_type=code
            </code>
          </div>

          <div className="p-4 bg-primary/10 border border-primary rounded-lg">
            <p className="text-sm font-medium mb-2">User Consent Screen:</p>
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm mb-3">
                <strong>"MyApp"</strong> is requesting access to:
              </p>
              <div className="space-y-2">
                {scopes.filter(s => s.granted).map((scope) => (
                  <div key={scope.name} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>{scope.description} <span className="font-mono text-xs">({scope.name})</span></span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium">
                  Allow
                </button>
                <button className="px-4 py-2 bg-muted rounded text-sm">
                  Deny
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scope Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scope Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
              <h4 className="font-medium text-success mb-2">Do</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Request minimum scopes needed</li>
                <li>• Use OpenID Connect standard scopes</li>
                <li>• Handle scope rejection gracefully</li>
                <li>• Document required scopes</li>
                <li>• Explain scope purpose to users</li>
              </ul>
            </div>
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <h4 className="font-medium text-destructive mb-2">Don't</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Request admin scope unnecessarily</li>
                <li>• Assume all scopes will be granted</li>
                <li>• Hide scope purpose from users</li>
                <li>• Request scopes you don't use</li>
                <li>• Ignore partial consent</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common OAuth Scopes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common OAuth 2.0 Scopes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-primary" />
                <h4 className="font-medium">OpenID Connect</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><code className="text-xs">openid</code> - Authentication</li>
                <li><code className="text-xs">profile</code> - Basic profile</li>
                <li><code className="text-xs">email</code> - Email address</li>
                <li><code className="text-xs">phone</code> - Phone number</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Google APIs</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><code className="text-xs">.../auth/drive</code> - Drive access</li>
                <li><code className="text-xs">.../auth/gmail</code> - Gmail access</li>
                <li><code className="text-xs">.../auth/calendar</code> - Calendar</li>
                <li><code className="text-xs">.../auth/plus.me</code> - Google+</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <h4 className="font-medium">GitHub</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><code className="text-xs">repo</code> - Full repo control</li>
                <li><code className="text-xs">user</code> - User profile</li>
                <li><code className="text-xs">read:org</code> - Read org data</li>
                <li><code className="text-xs">delete_repo</code> - Delete repos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
