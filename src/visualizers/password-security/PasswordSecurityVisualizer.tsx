import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Hash,
  Zap,
  Database,
} from "lucide-react"

const PasswordSecurityVisualizer = () => {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(0)
  const [crackTime, setCrackTime] = useState("")
  const [hashed, setHashed] = useState<string | null>(null)

  const calculateStrength = (pwd: string) => {
    let score = 0
    if (pwd.length >= 8) score += 1
    if (pwd.length >= 12) score += 1
    if (/[a-z]/.test(pwd)) score += 1
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1
    return score
  }

  const getCrackTime = (pwd: string) => {
    const charsetSize = (/[a-z]/.test(pwd) ? 26 : 0) +
      (/[A-Z]/.test(pwd) ? 26 : 0) +
      (/[0-9]/.test(pwd) ? 10 : 0) +
      (/[^a-zA-Z0-9]/.test(pwd) ? 32 : 0)
    const combinations = Math.pow(charsetSize, pwd.length)
    const guessesPerSecond = 10e9 // Modern GPU can do billions
    const seconds = combinations / guessesPerSecond / 2

    if (seconds < 0.001) return "Instantly"
    if (seconds < 1) return "Less than a second"
    if (seconds < 60) return `${Math.round(seconds)} seconds`
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`
    if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`
    if (seconds < 31536000 * 1000000) return `${Math.round(seconds / 31536000 / 1000)} thousand years`
    return "Millions of years"
  }

  const hashSimulation = (pwd: string) => {
    // Simulate bcrypt hashing
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789./"
    let salt = "$2b$12$"
    for (let i = 0; i < 22; i++) {
      salt += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    // Simple hash simulation
    let hash = salt
    for (let i = 0; i < pwd.length * 10; i++) {
      hash = "$2b$12$" + btoa(pwd + i.toString()).replace(/=/g, "").slice(0, 31)
    }
    return hash
  }

  const requirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "At least 12 characters", met: password.length >= 12 },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains number", met: /[0-9]/.test(password) },
    { label: "Contains special character", met: /[^a-zA-Z0-9]/.test(password) },
  ]

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Excellent"]
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500", "bg-emerald-500"]

  useEffect(() => {
    setStrength(calculateStrength(password))
    setCrackTime(getCrackTime(password))
    if (password.length > 0) {
      setHashed(hashSimulation(password))
    } else {
      setHashed(null)
    }
  }, [password])

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
        <h2 className="text-3xl font-bold gradient-text">Password Security & Hashing</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn how passwords should be securely stored using cryptographic hashing with salt and pepper techniques.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Panel - Password Tester */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Password Strength Tester
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password to test..."
                className="w-full px-4 py-4 pr-12 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Strength Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Strength</span>
                <span className={`font-medium ${
                  strength >= 5 ? "text-green-500" : strength >= 3 ? "text-yellow-500" : "text-red-500"
                }`}>
                  {password.length > 0 ? strengthLabels[strength] : "Enter password"}
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full ${strengthColors[strength]}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(strength / 6) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Requirements</h4>
              <div className="grid grid-cols-2 gap-2">
                {requirements.map((req, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-center gap-2 text-sm ${
                      req.met ? "text-green-500" : "text-muted-foreground"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {req.met ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    {req.label}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Crack Time */}
            <div className="p-4 rounded-xl bg-muted/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Hash className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Estimated crack time</div>
                <div className="text-lg font-semibold">{crackTime}</div>
              </div>
            </div>

            {/* Hash Preview */}
            {hashed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20"
              >
                <div className="text-sm text-muted-foreground mb-2">bcrypt Hash (simulated)</div>
                <div className="font-mono text-xs break-all">{hashed}</div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Right Panel - Hashing Explained */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-secondary" />
              Password Hashing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Why Hashing */}
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 text-red-500 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">Never Store Plain Text!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Storing passwords in plain text is the biggest security mistake. If your database is breached,
                all accounts are compromised.
              </p>
            </div>

            {/* Hashing Process */}
            <div className="space-y-4">
              <h4 className="font-semibold">The Hashing Process</h4>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex-1 p-3 rounded-lg bg-muted/50 text-center">
                  <div className="font-mono">password123</div>
                  <div className="text-xs text-muted-foreground">Plain text</div>
                </div>
                <div className="text-primary">→</div>
                <div className="flex-1 p-3 rounded-lg bg-primary/10 text-center border border-primary/30">
                  <div className="font-mono text-xs break-all">$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4oQyHN4y6tJE9EPC</div>
                  <div className="text-xs text-muted-foreground">bcrypt hash</div>
                </div>
              </div>
            </div>

            {/* Hashing Algorithms */}
            <div className="space-y-3">
              <h4 className="font-semibold">Recommended Algorithms</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-muted/50">
                  <div className="font-medium text-primary">bcrypt</div>
                  <div className="text-xs text-muted-foreground">Most popular</div>
                  <div className="text-xs mt-1">Cost: 10-12</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <div className="font-medium text-secondary">Argon2</div>
                  <div className="text-xs text-muted-foreground">Password hashing winner</div>
                  <div className="text-xs mt-1">Memory-hard</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <div className="font-medium text-accent">scrypt</div>
                  <div className="text-xs text-muted-foreground">Memory-hard</div>
                  <div className="text-xs mt-1">Good for KDF</div>
                </div>
              </div>
            </div>

            {/* Salt & Pepper */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
              <h4 className="font-semibold mb-3">Salt & Pepper</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span><strong>Salt:</strong> Random data added to each password before hashing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span><strong>Pepper:</strong> Secret key added to all hashes (stored separately)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Prevents rainbow table attacks</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Migration Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Password Migration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold">Why Migrate?</h4>
              <p className="text-muted-foreground">
                As hashing algorithms age and computers become faster, previously secure passwords
                become vulnerable. Regular migration to stronger algorithms is essential.
              </p>
              <div className="p-4 rounded-xl bg-muted/50">
                <h5 className="font-medium mb-2">Migration Steps:</h5>
                <ol className="space-y-2 text-sm list-decimal list-inside text-muted-foreground">
                  <li>On login, verify against old hash</li>
                  <li>If verified, re-hash with new algorithm</li>
                  <li>Store the new hash</li>
                  <li>Repeat for all users over time</li>
                </ol>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Example Migration Code</h4>
              <pre className="p-4 rounded-xl bg-muted/50 text-sm overflow-x-auto">
                <code>{`async function migratePassword(user, plainPassword) {
  // 1. Verify with old hash
  const isValid = await bcrypt.compare(
    plainPassword,
    user.oldHash
  )

  if (isValid) {
    // 2. Re-hash with new algorithm
    const newHash = await bcrypt.hash(
      plainPassword,
      12  // Higher cost
    )

    // 3. Store new hash
    await db.users.update(user.id, {
      passwordHash: newHash,
      hashAlgorithm: 'bcrypt',
      lastMigrated: new Date()
    })
  }
}`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PasswordSecurityVisualizer
