import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Users, Server, Shield, Globe, ArrowRight } from "lucide-react"
import { useState } from "react"

export function OAuth2RolesVisualizer() {
  const [activeRole, setActiveRole] = useState<string | null>(null)

  const roles = [
    {
      id: "resource_owner",
      name: "Resource Owner",
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary",
      description: "The user who owns the data",
      example: "You, wanting to share your Google Photos with a photo printing app",
    },
    {
      id: "client",
      name: "Client",
      icon: Globe,
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success",
      description: "The application requesting access",
      example: "A photo printing website that wants to access your Google Photos",
    },
    {
      id: "auth_server",
      name: "Authorization Server",
      icon: Shield,
      color: "text-warning",
      bg: "bg-warning/10",
      border: "border-warning",
      description: "Authenticates user and issues tokens",
      example: "Google's OAuth server that verifies your identity and issues tokens",
    },
    {
      id: "resource_server",
      name: "Resource Server",
      icon: Server,
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive",
      description: "Hosts the protected resources",
      example: "Google's servers that store and serve your photos",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Interactive Roles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all h-full ${
                activeRole === role.id
                  ? `border-2 ${role.border} ${role.bg}`
                  : "hover:border-primary/50"
              }`}
              onClick={() => setActiveRole(activeRole === role.id ? null : role.id)}
            >
              <CardContent className="pt-6 text-center">
                <div className={`w-16 h-16 mx-auto rounded-full ${role.bg} flex items-center justify-center mb-3`}>
                  <role.icon className={`h-8 w-8 ${role.color}`} />
                </div>
                <h3 className="font-semibold">{role.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Role Details */}
      {activeRole && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const role = roles.find((r) => r.id === activeRole)
                  if (!role) return null
                  const Icon = role.icon
                  return <Icon className={`h-5 w-5 ${role.color}`} />
                })()}
                {roles.find((r) => r.id === activeRole)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {roles.find((r) => r.id === activeRole)?.example}
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Responsibilities:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {activeRole === "resource_owner" && (
                    <>
                      <li>• Owns the protected resources</li>
                      <li>• Can grant access to third-party applications</li>
                      <li>• Can revoke access at any time</li>
                    </>
                  )}
                  {activeRole === "client" && (
                    <>
                      <li>• Initiates the OAuth flow</li>
                      <li>• Requests authorization from resource owner</li>
                      <li>• Uses tokens to access protected resources</li>
                      <li>• Stores tokens securely</li>
                    </>
                  )}
                  {activeRole === "auth_server" && (
                    <>
                      <li>• Authenticates the resource owner</li>
                      <li>• Obtains consent from resource owner</li>
                      <li>• Issues access tokens to clients</li>
                      <li>• Can revoke tokens</li>
                    </>
                  )}
                  {activeRole === "resource_server" && (
                    <>
                      <li>• Hosts the protected resources (API)</li>
                      <li>• Validates access tokens</li>
                      <li>• Enforces access policies</li>
                      <li>• Returns protected data on valid requests</li>
                    </>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Flow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How They Work Together</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4 flex-wrap py-4">
            {roles.map((role, i) => (
              <div key={role.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full ${role.bg} flex items-center justify-center`}>
                    <role.icon className={`h-7 w-7 ${role.color}`} />
                  </div>
                  <p className="text-xs font-medium mt-1">{role.name.split(" ")[0]}</p>
                </div>
                {i < roles.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-center">
              The <strong>Client</strong> requests access from the <strong>Resource Owner</strong> via the
              <strong> Authorization Server</strong>, which issues a token used to access resources
              from the <strong>Resource Server</strong>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
