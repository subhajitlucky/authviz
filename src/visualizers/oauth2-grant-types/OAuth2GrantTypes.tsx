import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Shield, Smartphone, Server, Globe, ArrowRight, AlertTriangle } from "lucide-react"
import { useState } from "react"

export function OAuth2GrantTypesVisualizer() {
  const [activeGrant, setActiveGrant] = useState<string | null>(null)

  const grants = [
    {
      id: "auth_code",
      name: "Authorization Code",
      icon: Shield,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary",
      description: "Most secure. Two-step flow for server-side apps.",
      bestFor: "Web applications with backend",
      security: "high",
      steps: ["User clicks login", "Redirect to auth server", "User approves", "Auth code returned", "Exchange code for token"],
    },
    {
      id: "pkce",
      name: "PKCE (Proof Key)",
      icon: Smartphone,
      iconColor: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success",
      description: "Auth Code with extra security for public clients.",
      bestFor: "Mobile apps, SPAs",
      security: "very-high",
      steps: ["Generate code verifier", "Send code challenge", "User approves", "Exchange with verifier"],
    },
    {
      id: "client_credentials",
      name: "Client Credentials",
      icon: Server,
      iconColor: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning",
      description: "No user involved. Machine-to-machine auth.",
      bestFor: "Microservices, background jobs",
      security: "medium",
      steps: ["Client authenticates", "Server issues token", "Client accesses resources"],
    },
    {
      id: "implicit",
      name: "Implicit (Legacy)",
      icon: Globe,
      iconColor: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive",
      description: "Deprecated. Token returned directly. Not recommended.",
      bestFor: "Nothing (deprecated)",
      security: "low",
      deprecated: true,
      steps: ["Redirect to auth", "Token returned in URL", "Use token directly"],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Grant Type Selector */}
      <div className="flex flex-wrap gap-3 justify-center">
        {grants.map((grant) => (
          <button
            key={grant.id}
            onClick={() => setActiveGrant(grant.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
              activeGrant === grant.id
                ? `${grant.borderColor} ${grant.bgColor}`
                : "bg-muted border-muted-foreground hover:border-primary/50"
            }`}
          >
            <grant.icon className={`h-5 w-5 ${grant.iconColor}`} />
            <span className="font-medium">{grant.name}</span>
            {grant.deprecated && (
              <span className="text-xs px-2 py-0.5 bg-destructive/20 text-destructive rounded">
                Deprecated
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grant Details */}
      {activeGrant && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const grant = grants.find((g) => g.id === activeGrant)
                  if (!grant) return null
                  const Icon = grant.icon
                  return <Icon className={`h-5 w-5 ${grant.iconColor}`} />
                })()}
                {grants.find((g) => g.id === activeGrant)?.name} Grant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {grants.find((g) => g.id === activeGrant)?.description}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Best For:</p>
                  <p className="text-sm text-muted-foreground">
                    {grants.find((g) => g.id === activeGrant)?.bestFor}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Security Level:</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded ${
                          (grants.find((g) => g.id === activeGrant)?.security === "very-high" && i <= 4) ||
                          (grants.find((g) => g.id === activeGrant)?.security === "high" && i <= 3) ||
                          (grants.find((g) => g.id === activeGrant)?.security === "medium" && i <= 2) ||
                          (grants.find((g) => g.id === activeGrant)?.security === "low" && i <= 1)
                            ? "bg-success"
                            : "bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {grants.find((g) => g.id === activeGrant)?.deprecated && (
                <div className="p-4 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                  <div>
                    <p className="font-medium text-destructive">Deprecated</p>
                    <p className="text-sm text-muted-foreground">
                      The implicit flow is deprecated due to security vulnerabilities.
                      Use Authorization Code with PKCE instead.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-medium mb-2">Flow Steps:</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {grants
                    .find((g) => g.id === activeGrant)
                    ?.steps.map((step, i, arr) => (
                      <div key={i} className="flex items-center">
                        <span className="px-3 py-1 bg-muted rounded-full text-sm">
                          {step}
                        </span>
                        {i < arr.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground mx-1" />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Grant Type Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Grant Type</th>
                  <th className="text-left py-3 px-4 font-medium">User Involved</th>
                  <th className="text-left py-3 px-4 font-medium">Client Secret</th>
                  <th className="text-left py-3 px-4 font-medium">Best For</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {grants.map((grant) => (
                  <tr key={grant.id} className="border-b">
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-2">
                        <grant.icon className={`h-4 w-4 ${grant.iconColor}`} />
                        {grant.name}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {grant.id === "client_credentials" ? "No" : "Yes"}
                    </td>
                    <td className="py-3 px-4">
                      {grant.id === "pkce" || grant.id === "implicit" ? "No" : "Yes"}
                    </td>
                    <td className="py-3 px-4">{grant.bestFor.split(",")[0]}</td>
                    <td className="py-3 px-4">
                      {grant.deprecated ? (
                        <span className="text-destructive text-xs">Deprecated</span>
                      ) : (
                        <span className="text-success text-xs">Recommended</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
