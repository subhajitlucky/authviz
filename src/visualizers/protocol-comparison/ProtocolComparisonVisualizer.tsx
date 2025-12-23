import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import {
  Shield,
  ArrowRight,
  FileText,
  Code,
  Globe,
  CheckCircle,
  XCircle,
  Zap,
  Key,
} from "lucide-react"

const ProtocolComparisonVisualizer = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<"oidc" | "saml">("oidc")
  const [step, setStep] = useState(0)

  const protocols = {
    oidc: {
      name: "OpenID Connect",
      version: "OIDC 1.0",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      description: "Modern identity layer built on OAuth 2.0",
      strengths: [
        "JSON-based (developer friendly)",
        "Native browser support",
        "Excellent mobile support",
        "Built on OAuth 2.0",
        "Lightweight and flexible",
      ],
      weaknesses: [
        "Less enterprise adoption",
        "Some enterprise features require extensions",
      ],
      flow: [
        { title: "User Initiates Login", desc: "Client requests with scope=openid" },
        { title: "Redirect to IdP", desc: "User authenticates with identity provider" },
        { title: "ID Token Returned", desc: "JWT containing user identity" },
        { title: "UserInfo Request", desc: "Optional additional claims via /userinfo" },
      ],
    },
    saml: {
      name: "SAML 2.0",
      version: "SAML v2.0",
      icon: FileText,
      color: "from-orange-500 to-amber-500",
      description: "Enterprise XML-based federation standard",
      strengths: [
        "Enterprise standard",
        "Complex federation support",
        "Mature ecosystem",
        "Strong attribute sharing",
      ],
      weaknesses: [
        "XML complexity",
        "Browser form POST required",
        "Poor mobile support",
        "Verbose messages",
      ],
      flow: [
        { title: "SP Initiates", desc: "Service provider redirects to IdP" },
        { title: "User Authenticates", desc: "User logs in at identity provider" },
        { title: "SAML Response", desc: "XML assertion posted back to SP" },
        { title: "Assertion Processed", desc: "SP validates and creates session" },
      ],
    },
  }

  const comparisonTable = [
    { feature: "Data Format", oidc: "JSON", saml: "XML" },
    { feature: "Message Size", oidc: "Compact", saml: "Verbose" },
    { feature: "Browser Flow", oidc: "Redirect", saml: "Form POST" },
    { feature: "Mobile Support", oidc: "Native", saml: "Requires workarounds" },
    { feature: "Token Type", oidc: "JWT", saml: "XML Assertion" },
    { feature: "API Friendliness", oidc: "Excellent", saml: "Poor" },
    { feature: "Enterprise Use", oidc: "Growing", saml: "Established" },
    { feature: "Setup Complexity", oidc: "Low", saml: "High" },
    { feature: "SSO Experience", oidc: "Seamless", saml: "Requires redirect" },
  ]

  const currentProtocol = protocols[selectedProtocol]

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
        <h2 className="text-3xl font-bold gradient-text">Protocol Comparison</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare OpenID Connect and SAML 2.0 - two major protocols for implementing Single Sign-On (SSO) and identity federation.
        </p>
      </div>

      {/* Protocol Selection */}
      <div className="flex justify-center gap-6">
        {(["oidc", "saml"] as const).map((p) => (
          <motion.button
            key={p}
            onClick={() => {
              setSelectedProtocol(p)
              setStep(0)
            }}
            className={`p-6 rounded-2xl border-2 transition-all ${
              selectedProtocol === p
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${protocols[p].color} flex items-center justify-center`}>
              {React.createElement(protocols[p].icon, { className: "h-8 w-8 text-white" })}
            </div>
            <h3 className="text-xl font-bold">{protocols[p].name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{protocols[p].version}</p>
          </motion.button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Panel - Protocol Details */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {currentProtocol.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{currentProtocol.description}</p>

            {/* Flow Visualization */}
            <div className="relative py-4">
              {/* Connection Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

              <div className="space-y-6">
                {currentProtocol.flow.map((s, i) => (
                  <motion.div
                    key={i}
                    className="relative flex items-start gap-4 pl-16"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: step === i ? 1.02 : 1,
                    }}
                    onClick={() => setStep(i)}
                  >
                    <div
                      className={`absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center z-10 ${
                        step === i
                          ? "bg-primary animate-pulse"
                          : i < step
                          ? "bg-green-500"
                          : "bg-muted"
                      }`}
                    >
                      {i < step ? (
                        <CheckCircle className="h-6 w-6 text-white" />
                      ) : (
                        <span className="text-lg font-bold">{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-muted/30 border border-border/50 cursor-pointer hover:border-primary/30 transition-colors">
                      <h4 className="font-semibold">{s.title}</h4>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <h4 className="font-semibold text-green-500 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {currentProtocol.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h4 className="font-semibold text-red-500 mb-3 flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Weaknesses
                </h4>
                <ul className="space-y-2">
                  {currentProtocol.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Comparison Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-secondary" />
              Feature Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 font-medium">Feature</th>
                    <th className="text-center py-3 px-4 font-medium text-primary">OIDC</th>
                    <th className="text-center py-3 px-4 font-medium text-orange-500">SAML</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, i) => (
                    <motion.tr
                      key={i}
                      className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <td className="py-3 px-4 text-muted-foreground">{row.feature}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {row.oidc}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm font-medium">
                          {row.saml}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* When to Use */}
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold">When to Use Each</h4>
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-medium">Choose OIDC when:</h5>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>Building new applications</li>
                      <li>Need excellent mobile support</li>
                      <li>Prefer JSON over XML</li>
                      <li>Working with modern web frameworks</li>
                      <li>Building consumer-facing apps</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h5 className="font-medium">Choose SAML when:</h5>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>Enterprise integration with existing IdP</li>
                      <li>Need complex federation</li>
                      <li>Legacy system requirements</li>
                      <li>Working with enterprise IdPs (Okta, Azure AD)</li>
                      <li>Integrating with government systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Token Structure Comparison */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-accent" />
            Token Structure Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* OIDC Token */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold">OIDC ID Token (JWT)</h4>
              </div>
              <pre className="p-4 rounded-xl bg-muted/50 text-sm overflow-x-auto">
                <code>{`{
  "iss": "https://auth.example.com",
  "sub": "user123",
  "aud": "my-app-client-id",
  "exp": 1704067200,
  "iat": 1704063600,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "email_verified": true
}`}</code>
              </pre>
            </div>

            {/* SAML Assertion */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-orange-500" />
                </div>
                <h4 className="font-semibold">SAML Assertion (XML)</h4>
              </div>
              <pre className="p-4 rounded-xl bg-muted/50 text-sm overflow-x-auto">
                <code>{`<saml:Assertion>
  <saml:Issuer>https://idp.example.com</saml:Issuer>
  <saml:Subject>
    <saml:NameID>alice@example.com</saml:NameID>
  </saml:Subject>
  <saml:Conditions
    NotBefore="..."
    NotOnOrAfter="...">
  </saml:Conditions>
  <saml:AttributeStatement>
    <saml:Attribute Name="email">
      <saml:AttributeValue>
        alice@example.com
      </saml:AttributeValue>
    </saml:Attribute>
  </saml:AttributeStatement>
</saml:Assertion>`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProtocolComparisonVisualizer
