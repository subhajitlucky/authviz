import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Users, Shield, Clock, Globe, Lock, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

interface Attribute {
  name: string
  value: string
}

export function ABACVisualizer() {
  const [attributes, setAttributes] = useState<Attribute[]>([
    { name: "department", value: "engineering" },
    { name: "time", value: "09:00-17:00" },
    { name: "location", value: "office" },
    { name: "clearance", value: "secret" },
  ])

  const policies = [
    {
      name: "Department Access",
      check: (attrs: Attribute[]) => {
        const dept = attrs.find(a => a.name === "department")?.value
        return dept === "engineering"
      },
    },
    {
      name: "Business Hours",
      check: (attrs: Attribute[]) => {
        const time = attrs.find(a => a.name === "time")?.value
        return time === "09:00-17:00"
      },
    },
    {
      name: "On-Site Required",
      check: (attrs: Attribute[]) => {
        const loc = attrs.find(a => a.name === "location")?.value
        return loc === "office"
      },
    },
    {
      name: "Clearance Level",
      check: (attrs: Attribute[]) => {
        const clear = attrs.find(a => a.name === "clearance")?.value
        return clear === "top-secret" || clear === "secret"
      },
    },
  ]

  const allPoliciesPass = policies.every(p => p.check(attributes))

  const toggleAttribute = (name: string, values: string[]) => {
    setAttributes(prev => {
      const existing = prev.find(a => a.name === name)
      if (existing) {
        const currentIndex = values.indexOf(existing.value)
        const nextIndex = (currentIndex + 1) % values.length
        return prev.map(a => a.name === name ? { ...a, value: values[nextIndex] } : a)
      }
      return prev
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Dynamic Access Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            ABAC evaluates multiple attributes in real-time to make access decisions.
            Try changing the attributes to see how access changes.
          </p>

          {/* Attribute Toggles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Department</span>
              </div>
              <button
                onClick={() => toggleAttribute("department", ["engineering", "sales", "hr", "finance"])}
                className="w-full px-3 py-2 bg-background rounded border text-sm text-left"
              >
                {attributes.find(a => a.name === "department")?.value}
              </button>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Time</span>
              </div>
              <button
                onClick={() => toggleAttribute("time", ["09:00-17:00", "17:00-09:00", "weekend"])}
                className="w-full px-3 py-2 bg-background rounded border text-sm text-left"
              >
                {attributes.find(a => a.name === "time")?.value}
              </button>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">Location</span>
              </div>
              <button
                onClick={() => toggleAttribute("location", ["office", "home", "remote"])}
                className="w-full px-3 py-2 bg-background rounded border text-sm text-left"
              >
                {attributes.find(a => a.name === "location")?.value}
              </button>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-4 w-4" />
                <span className="text-sm font-medium">Clearance</span>
              </div>
              <button
                onClick={() => toggleAttribute("clearance", ["top-secret", "secret", "public"])}
                className="w-full px-3 py-2 bg-background rounded border text-sm text-left"
              >
                {attributes.find(a => a.name === "clearance")?.value}
              </button>
            </div>
          </div>

          {/* Policy Evaluation */}
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-3">Policy Evaluation:</p>
            <div className="space-y-2">
              {policies.map((policy, i) => {
                const passes = policy.check(attributes)
                return (
                  <div key={i} className="flex items-center justify-between p-2 bg-background rounded">
                    <span className="text-sm">{policy.name}</span>
                    {passes ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Final Decision */}
            <div className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
              allPoliciesPass ? "bg-success/10 border border-success" : "bg-destructive/10 border border-destructive"
            }`}>
              {allPoliciesPass ? (
                <>
                  <CheckCircle className="h-6 w-6 text-success" />
                  <div>
                    <p className="font-medium text-success">ACCESS GRANTED</p>
                    <p className="text-xs text-muted-foreground">All policies satisfied</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">ACCESS DENIED</p>
                    <p className="text-xs text-muted-foreground">One or more policies failed</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ABAC vs RBAC */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ABAC vs RBAC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/10 border border-primary rounded-lg">
              <h4 className="font-medium text-primary mb-2">ABAC (Attribute-Based)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Evaluates multiple attributes</li>
                <li>• Context-aware decisions</li>
                <li>• Dynamic policies</li>
                <li>• Fine-grained control</li>
                <li>• More complex to manage</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">RBAC (Role-Based)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Based on user roles</li>
                <li>• Static permissions</li>
                <li>• Simple to understand</li>
                <li>• Coarse-grained control</li>
                <li>• Easier to audit</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Attributes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common ABAC Attributes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm mb-1">User Attributes</h4>
              <p className="text-xs text-muted-foreground">department, role, clearance, team</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm mb-1">Resource Attributes</h4>
              <p className="text-xs text-muted-foreground">owner, type, sensitivity, department</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm mb-1">Environment Attributes</h4>
              <p className="text-xs text-muted-foreground">time, location, device, network</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
