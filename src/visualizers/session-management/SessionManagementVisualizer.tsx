import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import {
  Shield,
  Clock,
  Cookie,
  Key,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Server,
  Globe,
  Smartphone,
  Laptop,
  Trash2,
  RefreshCw,
} from "lucide-react"

const SessionManagementVisualizer = () => {
  const [activeTab, setActiveTab] = useState<"lifecycle" | "security" | "concurrent">("lifecycle")
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [sessions, setSessions] = useState([
    { id: "sess_1", device: "Chrome on Mac", location: "New York, US", lastActive: "Now", active: true },
    { id: "sess_2", device: "Safari on iPhone", location: "New York, US", lastActive: "5 min ago", active: true },
    { id: "sess_3", device: "Firefox on Windows", location: "London, UK", lastActive: "2 hours ago", active: false },
  ])

  const lifecycleSteps = [
    { title: "User Login", icon: Key, desc: "Credentials validated, session created" },
    { title: "Session Stored", icon: Server, desc: "Session ID and data saved server-side" },
    { title: "Cookie Set", icon: Cookie, desc: "HTTP-only session cookie sent to browser" },
    { title: "Requests Authenticated", icon: Globe, desc: "Cookie sent with each request" },
    { title: "Activity Tracked", icon: Clock, desc: "Last activity timestamp updated" },
    { title: "Logout", icon: LogOut, desc: "Session invalidated, cookie cleared" },
  ]

  const securityMeasures = [
    {
      title: "Secure Session ID",
      desc: "Cryptographically random, unguessable",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "HTTP-only Cookie",
      desc: "Cannot be accessed by JavaScript",
      icon: Cookie,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Session Timeout",
      desc: "Absolute & inactivity limits",
      icon: Clock,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "HTTPS Only",
      desc: "Encrypted transmission",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
    },
  ]

  // Simulate session activity
  useEffect(() => {
    const interval = setInterval(() => {
      setSessions((prev) =>
        prev.map((s) =>
          s.active ? { ...s, lastActive: "Now" } : s
        )
      )
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const simulateLogin = () => {
    setIsLoggedIn(false)
    let step = 0
    const interval = setInterval(() => {
      if (step < lifecycleSteps.length - 1) {
        setCurrentStep(step)
        step++
      } else {
        clearInterval(interval)
        setIsLoggedIn(true)
        setCurrentStep(lifecycleSteps.length - 1)
      }
    }, 1200)
  }

  const terminateSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30"
        >
          <Shield className="h-10 w-10 text-primary" />
        </motion.div>
        <h2 className="text-3xl font-bold gradient-text">Session Management</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn how sessions are created, maintained, and securely terminated to protect user authentication state.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-2">
        {[
          { id: "lifecycle", label: "Lifecycle", icon: RefreshCw },
          { id: "security", label: "Security", icon: Shield },
          { id: "concurrent", label: "Concurrent Sessions", icon: Globe },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className="gap-2"
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "lifecycle" && (
          <motion.div
            key="lifecycle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Animation Panel */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Session Lifecycle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Browser & Server Visualization */}
                  <div className="relative h-48 rounded-xl bg-muted/30 border border-border/50 p-4">
                    {/* Browser */}
                    <motion.div
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      animate={{ y: isLoggedIn ? "-50%" : "-50%" }}
                    >
                      <div className="w-24 h-20 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex flex-col items-center justify-center">
                        <Laptop className="h-8 w-8 text-blue-500" />
                        <span className="text-xs mt-1">Browser</span>
                      </div>
                    </motion.div>

                    {/* Connection Line */}
                    <motion.div
                      className="absolute left-32 right-32 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 via-primary to-secondary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />

                    {/* Server */}
                    <motion.div
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      animate={{ y: isLoggedIn ? "-50%" : "-50%" }}
                    >
                      <div className="w-24 h-20 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex flex-col items-center justify-center">
                        <Server className="h-8 w-8 text-purple-500" />
                        <span className="text-xs mt-1">Server</span>
                      </div>
                    </motion.div>

                    {/* Animated Packet */}
                    <AnimatePresence>
                      {!isLoggedIn && currentStep < lifecycleSteps.length - 1 && (
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-medium bg-primary text-white shadow-lg"
                          initial={{ left: "25%", opacity: 0 }}
                          animate={{ left: "55%", opacity: [0, 1, 1, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 2,
                            times: [0, 0.2, 0.8, 1],
                            repeat: Infinity,
                            repeatDelay: 0.5,
                          }}
                        >
                          {lifecycleSteps[currentStep]?.title}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Steps */}
                  <div className="space-y-2">
                    {lifecycleSteps.map((step, i) => (
                      <motion.div
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                          i === currentStep
                            ? "bg-primary/10 border border-primary/30"
                            : i < currentStep || isLoggedIn
                            ? "bg-green-500/10 border border-green-500/30"
                            : "bg-muted/30"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            i < currentStep || isLoggedIn
                              ? "bg-green-500"
                              : i === currentStep
                              ? "bg-primary animate-pulse"
                              : "bg-muted"
                          }`}
                        >
                          {i < currentStep || isLoggedIn ? (
                            <CheckCircle className="h-5 w-5 text-white" />
                          ) : (
                            <step.icon className={`h-5 w-5 ${i === currentStep ? "text-white" : "text-muted-foreground"}`} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{step.title}</div>
                          <div className="text-xs text-muted-foreground">{step.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Button onClick={simulateLogin} className="w-full btn-shine" disabled={isLoggedIn}>
                    {isLoggedIn ? "Session Active" : "Simulate Login"}
                  </Button>
                </CardContent>
              </Card>

              {/* Details Panel */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Session Data Structure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <pre className="p-4 rounded-xl bg-muted/50 text-sm overflow-x-auto">
                    <code>{`// Session object stored server-side
{
  id: "sess_a1b2c3d4e5",
  userId: "user_12345",
  createdAt: 1704067200000,
  lastActivity: 1704153600000,

  // Security metadata
  ip: "192.168.1.100",
  userAgent: "Mozilla/5.0...",
  fingerprint: "abc123...",

  // Session configuration
  absoluteTimeout: 86400000,    // 24 hours
  inactivityTimeout: 1800000,   // 30 minutes

  // Permissions
  permissions: ["read", "write"],
  roles: ["user"],

  // State
  isValid: true,
  isRevoked: false
}`}</code>
                  </pre>

                  <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-2 text-yellow-500 mb-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-medium">Session Fixation Warning</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Always regenerate session ID after successful login to prevent session fixation attacks.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === "security" && (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityMeasures.map((measure, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="glass-card h-full card-hover">
                    <CardContent className="p-6 space-y-4">
                      <motion.div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${measure.color} flex items-center justify-center`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <measure.icon className="h-7 w-7 text-white" />
                      </motion.div>
                      <h3 className="font-semibold">{measure.title}</h3>
                      <p className="text-sm text-muted-foreground">{measure.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle>Cookie Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-4 rounded-xl bg-muted/50 text-sm">
                  <code>{`// Recommended session cookie settings
Set-Cookie: sessionId=\${SESSION_ID};
  HttpOnly;      // Cannot be read by JavaScript
  Secure;        // Only sent over HTTPS
  SameSite=Strict;  // CSRF protection
  Path=/;        // Available on all paths
  Max-Age=1800;  // 30 minutes (inactivity timeout)
  Domain=.example.com;  // Subdomain sharing`}</code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "concurrent" && (
          <motion.div
            key="concurrent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">
                    Your account is active on {sessions.length} device{sessions.length !== 1 ? "s" : ""}
                  </p>
                  <Button variant="outline" className="gap-2 text-red-500 hover:text-red-500">
                    <LogOut className="h-4 w-4" />
                    Sign out all
                  </Button>
                </div>

                <div className="space-y-3">
                  {sessions.map((session) => (
                    <motion.div
                      key={session.id}
                      layout
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Smartphone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{session.device}</div>
                          <div className="text-sm text-muted-foreground">
                            {session.location} • Last active {session.lastActive}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.active && (
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                            Active
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => terminateSession(session.id)}
                          className="text-muted-foreground hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-muted/50">
                  <h4 className="font-medium mb-2">Security Recommendations</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    <li>Review sessions regularly and remove unfamiliar devices</li>
                    <li>Enable notifications for new login locations</li>
                    <li>Use session timeout for inactive devices</li>
                    <li>Immediately terminate sessions if you lose a device</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SessionManagementVisualizer
