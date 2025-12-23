import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Globe, Cookie, Lock, Eye, EyeOff, Shield, AlertTriangle } from "lucide-react"
import { useState } from "react"

export function CookiesVisualizer() {
  const [showHttpOnly, setShowHttpOnly] = useState(false)
  const [showSecure, setShowSecure] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="relative min-h-[300px]">
            {/* Browser */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <motion.div
                  className="w-48 h-32 rounded-xl border-2 border-muted-foreground bg-background flex flex-col items-center justify-center"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Globe className="h-12 w-12 text-primary mb-2" />
                  <p className="text-sm font-medium">Browser</p>
                </motion.div>
              </div>
            </div>

            {/* Cookie Storage */}
            <div className="flex justify-center mb-8">
              <div className={`p-4 rounded-lg border-2 transition-all ${
                showHttpOnly
                  ? "bg-success/10 border-success"
                  : "bg-muted border-muted-foreground"
              }`}>
                <div className="flex items-center gap-3">
                  <Cookie className={`h-8 w-8 ${showHttpOnly ? "text-success" : "text-warning"}`} />
                  <div>
                    <p className="font-medium text-sm">
                      {showHttpOnly ? "HTTP-Only Cookie" : "Regular Cookie"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      session_id=abc123; path=/; {showHttpOnly ? "HttpOnly; Secure" : ""}
                    </p>
                  </div>
                  {showHttpOnly && <Lock className="h-5 w-5 text-success" />}
                </div>
              </div>
            </div>

            {/* Attacker Threat */}
            <motion.div
              className="absolute right-4 top-0"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-destructive/10 border border-destructive rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="text-sm text-destructive">XSS Attack</span>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex justify-center gap-6 mt-4">
              <button
                onClick={() => setShowHttpOnly(!showHttpOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  showHttpOnly
                    ? "bg-success/20 border-success text-success"
                    : "bg-muted border-muted-foreground"
                }`}
              >
                {showHttpOnly ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                HTTP-Only
              </button>
              <button
                onClick={() => setShowSecure(!showSecure)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  showSecure
                    ? "bg-success/20 border-success text-success"
                    : "bg-muted border-muted-foreground"
                }`}
              >
                <Lock className="h-4 w-4" />
                Secure
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cookie Types Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Cookie className="h-5 w-5 text-warning" />
              Regular Cookie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <Eye className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-sm">Can be read by JavaScript</p>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
              <p className="text-sm text-destructive">Vulnerable to XSS theft</p>
            </div>
            <div className="p-3 bg-muted rounded-lg mt-2">
              <code className="text-xs">document.cookie = "token=abc"</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="h-5 w-5 text-success" />
              HTTP-Only Cookie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <EyeOff className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-sm">Cannot be read by JavaScript</p>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-success mt-0.5" />
              <p className="text-sm text-success">Protected from XSS theft</p>
            </div>
            <div className="p-3 bg-success/10 border border-success rounded-lg mt-2">
              <code className="text-xs">Set-Cookie: token=abc; HttpOnly; Secure</code>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cookie Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cookie Security Flags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">HttpOnly</h4>
              <p className="text-sm text-muted-foreground">
                Prevents JavaScript access. Protects against XSS token theft.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Secure</h4>
              <p className="text-sm text-muted-foreground">
                Only sent over HTTPS. Protects against interception.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">SameSite</h4>
              <p className="text-sm text-muted-foreground">
                Controls cross-site sending. Helps prevent CSRF attacks.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
