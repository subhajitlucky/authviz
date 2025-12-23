import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Server, Database, Key, User, ArrowRight } from "lucide-react"
import { useState } from "react"

export function SessionsVsTokensVisualizer() {
  const [mode, setMode] = useState<"session" | "token">("session")

  return (
    <div className="space-y-6">
      {/* Toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setMode("session")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            mode === "session"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Session-Based
        </button>
        <button
          onClick={() => setMode("token")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            mode === "token"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Token-Based
        </button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative min-h-[350px]">
            {/* Session-Based Flow */}
            {mode === "session" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="grid grid-cols-3 gap-8 w-full max-w-2xl">
                  {/* Client */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-20 h-20 rounded-xl bg-primary/10 border-2 border-primary flex items-center justify-center mb-2"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <User className="h-10 w-10 text-primary" />
                    </motion.div>
                    <p className="font-medium text-sm">Browser</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>

                  {/* Server */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-20 h-20 rounded-xl bg-muted border-2 border-muted-foreground flex items-center justify-center mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Server className="h-10 w-10" />
                    </motion.div>
                    <p className="font-medium text-sm">Server</p>
                  </div>
                </div>

                {/* Session Storage */}
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Database className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Session Store (Database/Redis)</p>
                    <p className="text-xs text-muted-foreground">
                      session_id → user_data
                    </p>
                  </div>
                </div>

                {/* Flow description */}
                <div className="text-center max-w-md">
                  <p className="text-sm text-muted-foreground">
                    1. User logs in, server creates session in database
                    <br />
                    2. Server sends session ID cookie to browser
                    <br />
                    3. Each request includes cookie, server looks up session
                  </p>
                </div>
              </motion.div>
            )}

            {/* Token-Based Flow */}
            {mode === "token" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="grid grid-cols-3 gap-8 w-full max-w-2xl">
                  {/* Client */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-20 h-20 rounded-xl bg-primary/10 border-2 border-primary flex items-center justify-center mb-2"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <User className="h-10 w-10 text-primary" />
                    </motion.div>
                    <p className="font-medium text-sm">Browser</p>
                  </div>

                  {/* Arrow with Token */}
                  <div className="flex items-center justify-center">
                    <motion.div
                      className="px-3 py-1 bg-success/20 text-success text-xs rounded-full font-mono"
                      animate={{ x: [-10, 10, -10] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      JWT token
                    </motion.div>
                  </div>

                  {/* Server */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-20 h-20 rounded-xl bg-muted border-2 border-muted-foreground flex items-center justify-center mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Server className="h-10 w-10" />
                    </motion.div>
                    <p className="font-medium text-sm">Server</p>
                  </div>
                </div>

                {/* Stateless Verification */}
                <div className="flex items-center gap-4 p-4 bg-success/10 border border-success/30 rounded-lg">
                  <Key className="h-8 w-8 text-success" />
                  <div>
                    <p className="font-medium text-sm">No Database Needed!</p>
                    <p className="text-xs text-muted-foreground">
                      Token contains all data + signature for verification
                    </p>
                  </div>
                </div>

                {/* Flow description */}
                <div className="text-center max-w-md">
                  <p className="text-sm text-muted-foreground">
                    1. User logs in, server signs a JWT token
                    <br />
                    2. Browser stores token, sends with every request
                    <br />
                    3. Server verifies token signature (stateless!)
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">State</span>
              <span className="font-medium">Stateful (server stores data)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scalability</span>
              <span className="font-medium text-warning">Requires session sync</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Token Size</span>
              <span className="font-medium">Small (session ID only)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Logout</span>
              <span className="font-medium text-success">Instant (delete session)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tokens (JWT)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">State</span>
              <span className="font-medium">Stateless (all in token)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scalability</span>
              <span className="font-medium text-success">Excellent</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Token Size</span>
              <span className="font-medium text-warning">Larger (includes claims)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Logout</span>
              <span className="font-medium text-warning">Delayed (wait for expiry)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
