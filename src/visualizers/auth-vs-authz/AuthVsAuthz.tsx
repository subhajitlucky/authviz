import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { User, Lock, Key, Shield, Check } from "lucide-react"
import { useState } from "react"

export function AuthVsAuthzVisualizer() {
  const [step, setStep] = useState(0)

  const steps = [
    { label: "User Arrives", description: "User wants to access a resource" },
    { label: "Authentication", description: "Who are you? Verify identity" },
    { label: "Authorization", description: "What can you do? Check permissions" },
    { label: "Access Granted", description: "Both checks passed" },
  ]

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((_, i) => (
          <div key={i} className="flex items-center">
            <button
              onClick={() => setStep(i)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                i <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-5 w-5" /> : i + 1}
            </button>
            {i < steps.length - 1 && (
              <div className={`h-1 w-16 mx-2 ${i < step ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Main Visualization */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative min-h-[300px]">
            {/* Step 0: User Arrives */}
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-[280px]"
              >
                <User className="h-24 w-24 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">User Arrives</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  A user wants to access a protected resource, like an admin dashboard or API endpoint.
                </p>
              </motion.div>
            )}

            {/* Step 1: Authentication */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-center h-[280px] gap-8"
              >
                <div className="text-center">
                  <User className="h-16 w-16 mx-auto mb-2 text-primary" />
                  <p className="font-medium">User</p>
                </div>
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ x: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Key className="h-8 w-8 text-primary" />
                  </motion.div>
                  <p className="text-sm text-muted-foreground mt-2">"Who are you?"</p>
                </div>
                <div className="text-center">
                  <Lock className="h-16 w-16 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">Login System</p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Authorization */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-center h-[280px] gap-8"
              >
                <div className="text-center">
                  <User className="h-16 w-16 mx-auto mb-2 text-primary" />
                  <p className="font-medium">Authenticated User</p>
                </div>
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ x: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Shield className="h-8 w-8 text-warning" />
                  </motion.div>
                  <p className="text-sm text-muted-foreground mt-2">"What can you do?"</p>
                </div>
                <div className="text-center">
                  <Lock className="h-16 w-16 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">Permission System</p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Access Granted */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-[280px]"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Shield className="h-24 w-24 text-success mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-success">Access Granted!</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Authentication confirms identity. Authorization confirms permissions.
                  Both are required for access.
                </p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Explanation Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className={step >= 1 ? "border-primary" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Key className="h-5 w-5" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Verifies <strong>who the user is</strong>. Like showing a passport or fingerprint at security.
            </p>
          </CardContent>
        </Card>

        <Card className={step >= 2 ? "border-primary" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Authorization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Verifies <strong>what the user can do</strong>. Like checking if your ticket allows VIP access.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
