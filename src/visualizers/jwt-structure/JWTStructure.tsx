import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { useState } from "react"

export function JWTStructureVisualizer() {
  const [activePart, setActivePart] = useState<"header" | "payload" | "signature" | null>(null)

  const sampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

  const header = {
    alg: "HS256",
    typ: "JWT"
  }

  const payload = {
    sub: "1234567890",
    name: "John Doe",
    admin: true,
    iat: 1516239022
  }

  return (
    <div className="space-y-6">
      {/* Interactive Token Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interactive JWT Token</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Token with clickable parts */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 p-4 bg-muted rounded-lg font-mono text-sm break-all">
              <button
                onClick={() => setActivePart("header")}
                className={`jwt-header hover:underline cursor-pointer ${
                  activePart === "header" ? "font-bold" : ""
                }`}
              >
                {sampleToken.split(".")[0]}
              </button>
              <span className="text-muted-foreground">.</span>
              <button
                onClick={() => setActivePart("payload")}
                className={`jwt-payload hover:underline cursor-pointer ${
                  activePart === "payload" ? "font-bold" : ""
                }`}
              >
                {sampleToken.split(".")[1]}
              </button>
              <span className="text-muted-foreground">.</span>
              <button
                onClick={() => setActivePart("signature")}
                className={`jwt-signature hover:underline cursor-pointer ${
                  activePart === "signature" ? "font-bold" : ""
                }`}
              >
                {sampleToken.split(".")[2]}
              </button>
            </div>

            {/* Click hint */}
            <p className="text-xs text-muted-foreground">
              Click on any part of the token to learn more
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Three Parts */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Header */}
        <Card
          className={`cursor-pointer transition-all ${
            activePart === "header" ? "border-primary ring-2 ring-primary/20" : ""
          }`}
          onClick={() => setActivePart("header")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="jwt-header">Header</span>
              <span className="text-xs font-normal text-muted-foreground">Part 1</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Contains metadata about the token type and signing algorithm.
              </p>
              <div className="bg-muted rounded-lg p-3 font-mono text-xs">
                {JSON.stringify(header, null, 2)}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-3 h-3 rounded-full bg-jwt-header" />
                Pink color in token
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payload */}
        <Card
          className={`cursor-pointer transition-all ${
            activePart === "payload" ? "border-primary ring-2 ring-primary/20" : ""
          }`}
          onClick={() => setActivePart("payload")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="jwt-payload">Payload</span>
              <span className="text-xs font-normal text-muted-foreground">Part 2</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Contains the claims - statements about the user and additional data.
              </p>
              <div className="bg-muted rounded-lg p-3 font-mono text-xs">
                {JSON.stringify(payload, null, 2)}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-3 h-3 rounded-full bg-jwt-payload" />
                Purple color in token
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signature */}
        <Card
          className={`cursor-pointer transition-all ${
            activePart === "signature" ? "border-primary ring-2 ring-primary/20" : ""
          }`}
          onClick={() => setActivePart("signature")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="jwt-signature">Signature</span>
              <span className="text-xs font-normal text-muted-foreground">Part 3</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Verifies the token has not been tampered with. Created with a secret.
              </p>
              <div className="bg-muted rounded-lg p-3 font-mono text-xs">
                HMACSHA256(
                <br />
                &nbsp;&nbsp;base64UrlEncode(header) + "." +
                <br />
                &nbsp;&nbsp;base64UrlEncode(payload),
                <br />
                &nbsp;&nbsp;your-256-bit-secret
                <br />
                )
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-3 h-3 rounded-full bg-jwt-signature" />
                Blue color in token
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Claims */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common JWT Claims (Registered)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { claim: "iss", name: "Issuer", desc: "Who issued the token" },
              { claim: "sub", name: "Subject", desc: "Who the token is about" },
              { claim: "aud", name: "Audience", desc: "Who the token is for" },
              { claim: "exp", name: "Expiration", desc: "When token expires" },
              { claim: "iat", name: "Issued At", desc: "When token was issued" },
              { claim: "nbf", name: "Not Before", desc: "Token not valid before" },
              { claim: "jti", name: "JWT ID", desc: "Unique identifier" },
            ].map((item) => (
              <div key={item.claim} className="p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <code className="text-xs font-mono text-primary">{item.claim}</code>
                </div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
