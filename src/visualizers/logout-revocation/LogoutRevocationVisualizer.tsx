import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { LogOut, Key, RotateCcw, Trash2, CheckCircle, XCircle, ArrowRight } from "lucide-react"
import { useState } from "react"

export function LogoutRevocationVisualizer() {
  const [step, setStep] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [tokensRevoked, setTokensRevoked] = useState(false)

  const handleLogout = () => {
    setStep(1)
    setIsLoggedIn(false)
  }

  const handleRevokeTokens = () => {
    setStep(2)
    setTokensRevoked(true)
  }

  const reset = () => {
    setStep(0)
    setIsLoggedIn(true)
    setTokensRevoked(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Logout & Token Revocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-8">
            {/* User State */}
            <div className="flex items-center gap-8">
              <motion.div
                className={`w-24 h-24 rounded-xl border-2 flex items-center justify-center ${
                  isLoggedIn
                    ? "bg-success/10 border-success"
                    : "bg-muted border-muted-foreground"
                }`}
                animate={{ scale: isLoggedIn ? [1, 1.05, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
                    isLoggedIn ? "bg-success/20" : "bg-muted"
                  }`}>
                    <span className="text-xl font-bold">{isLoggedIn ? "JD" : "??"}</span>
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">John Doe</p>
                </div>
              </motion.div>

              <ArrowRight className="h-8 w-8 text-muted-foreground" />

              <motion.div
                className={`w-24 h-24 rounded-xl border-2 flex items-center justify-center ${
                  isLoggedIn
                    ? "bg-primary/10 border-primary"
                    : tokensRevoked
                    ? "bg-destructive/10 border-destructive"
                    : "bg-muted border-muted-foreground"
                }`}
                animate={{ scale: !isLoggedIn && !tokensRevoked ? [1, 1.05, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Key className={`h-10 w-10 ${
                  isLoggedIn ? "text-primary" : tokensRevoked ? "text-destructive" : "text-muted-foreground"
                }`} />
              </motion.div>
            </div>

            {/* Status Message */}
            <div className={`p-4 rounded-lg border ${
              isLoggedIn
                ? "bg-success/10 border-success"
                : tokensRevoked
                ? "bg-destructive/10 border-destructive"
                : "bg-muted border-muted-foreground"
            }`}>
              <div className="flex items-center gap-2">
                {isLoggedIn ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="font-medium text-success">Session Active</span>
                  </>
                ) : tokensRevoked ? (
                  <>
                    <XCircle className="h-5 w-5 text-destructive" />
                    <span className="font-medium text-destructive">All Tokens Revoked</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">Logged Out</span>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {isLoggedIn
                  ? "User is authenticated with valid access and refresh tokens"
                  : tokensRevoked
                  ? "Access token invalidated, refresh token revoked, user fully logged out"
                  : "User logged out but refresh token may still be valid"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {!isLoggedIn ? (
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
                >
                  <RotateCcw className="h-5 w-5" />
                  Reset Demo
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-3 bg-warning text-warning-foreground rounded-lg font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              )}
            </div>

            {/* Tokens Status */}
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
              >
                <p className="text-sm font-medium mb-3">Token Status:</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      <span className="text-sm">Access Token</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      tokensRevoked ? "bg-destructive/20 text-destructive" : "bg-success/20 text-success"
                    }`}>
                      {tokensRevoked ? "Revoked" : "Valid (15 min)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="h-4 w-4" />
                      <span className="text-sm">Refresh Token</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      tokensRevoked ? "bg-destructive/20 text-destructive" : "bg-success/20 text-success"
                    }`}>
                      {tokensRevoked ? "Revoked" : "Valid (7 days)"}
                    </span>
                  </div>
                </div>

                {step === 1 && (
                  <button
                    onClick={handleRevokeTokens}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-medium"
                  >
                    <Trash2 className="h-5 w-5" />
                    Revoke All Tokens
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Why Revoke Matters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Why Token Revocation Matters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
              <h4 className="font-medium text-success mb-2">When to Revoke</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• User clicks "Logout" on all devices</li>
                <li>• Password change or account compromise</li>
                <li>• User removes app from account settings</li>
                <li>• Admin disables user account</li>
                <li>• Token suspicious activity detected</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Revocation Methods</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Token introspection endpoint</li>
                <li>• Token revocation endpoint (RFC 7009)</li>
                <li>• Blacklist in Redis/database</li>
                <li>• Short token lifetimes</li>
                <li>• Device-based logout</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Proper Logout Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4 flex-wrap py-4">
            <div className="px-3 py-2 bg-primary/10 border border-primary rounded-lg text-sm">Client</div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="px-3 py-2 bg-muted rounded-lg text-sm">/logout endpoint</div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="px-3 py-2 bg-success/10 border border-success rounded-lg text-sm">Revoke Tokens</div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="px-3 py-2 bg-muted rounded-lg text-sm">Clear Client</div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            A complete logout should revoke server-side tokens AND clear client-side storage.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
