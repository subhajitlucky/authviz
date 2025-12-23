import React from "react"

// Lazy load all visualizers to avoid import issues
export const lazyVisualizers: Record<string, React.LazyExoticComponent<React.ComponentType<unknown>>> = {
  // Basics - named exports
  "auth-vs-authz": React.lazy(() => import("./auth-vs-authz/AuthVsAuthz").then(m => ({ default: m.AuthVsAuthzVisualizer }))),
  "sessions-vs-tokens": React.lazy(() => import("./sessions-vs-tokens/SessionsVsTokens").then(m => ({ default: m.SessionsVsTokensVisualizer }))),
  "cookies-http-only": React.lazy(() => import("./cookies/CookiesVisualizer").then(m => ({ default: m.CookiesVisualizer }))),
  "stateless-auth": React.lazy(() => import("./stateless-auth/StatelessAuth").then(m => ({ default: m.StatelessAuthVisualizer }))),

  // Tokens - named exports
  "jwt-structure": React.lazy(() => import("./jwt-structure/JWTStructure").then(m => ({ default: m.JWTStructureVisualizer }))),
  "jwt-signing": React.lazy(() => import("./jwt-signing/JWTSigning").then(m => ({ default: m.JWTSigningVisualizer }))),
  "access-refresh-tokens": React.lazy(() => import("./access-refresh-tokens/AccessRefreshTokens").then(m => ({ default: m.AccessRefreshTokensVisualizer }))),
  "bearer-tokens": React.lazy(() => import("./bearer-tokens/BearerTokens").then(m => ({ default: m.BearerTokensVisualizer }))),
  "token-expiry": React.lazy(() => import("./token-expiry/TokenExpiryVisualizer").then(m => ({ default: m.TokenExpiryVisualizer }))),

  // OAuth 2.0 - named exports
  "oauth2-overview": React.lazy(() => import("./oauth2-overview/OAuth2Overview").then(m => ({ default: m.OAuth2OverviewVisualizer }))),
  "oauth2-roles": React.lazy(() => import("./oauth2-roles/OAuth2Roles").then(m => ({ default: m.OAuth2RolesVisualizer }))),
  "oauth2-grant-types": React.lazy(() => import("./oauth2-grant-types/OAuth2GrantTypes").then(m => ({ default: m.OAuth2GrantTypesVisualizer }))),
  "pkce": React.lazy(() => import("./pkce/PKCEVisualizer").then(m => ({ default: m.PKCEVisualizer }))),
  "scopes": React.lazy(() => import("./scopes/ScopesVisualizer").then(m => ({ default: m.ScopesVisualizer }))),
  "client-credentials": React.lazy(() => import("./client-credentials/ClientCredentialsVisualizer").then(m => ({ default: m.ClientCredentialsVisualizer }))),
  "sso": React.lazy(() => import("./sso/SSOVisualizer").then(m => ({ default: m.SSOVisualizer }))),

  // Access Control - named exports
  "rbac": React.lazy(() => import("./rbac/RBACVisualizer").then(m => ({ default: m.RBACVisualizer }))),
  "abac": React.lazy(() => import("./abac/ABACVisualizer").then(m => ({ default: m.ABACVisualizer }))),

  // Security - named exports
  "csrf": React.lazy(() => import("./csrf/CSRFVisualizer").then(m => ({ default: m.CSRFVisualizer }))),
  "xss": React.lazy(() => import("./xss/XSSVisualizer").then(m => ({ default: m.XSSVisualizer }))),
  "logout-revocation": React.lazy(() => import("./logout-revocation/LogoutRevocationVisualizer").then(m => ({ default: m.LogoutRevocationVisualizer }))),

  // MFA & Passwordless - default exports
  "totp": React.lazy(() => import("./totp/TOTPVisualizer").then(m => ({ default: m.default }))),
  "webauthn": React.lazy(() => import("./webauthn/WebAuthnVisualizer").then(m => ({ default: m.default }))),

  // Session Management - default exports
  "session-management": React.lazy(() => import("./session-management/SessionManagementVisualizer").then(m => ({ default: m.default }))),

  // Password Security - default exports
  "password-security": React.lazy(() => import("./password-security/PasswordSecurityVisualizer").then(m => ({ default: m.default }))),

  // Protocol Comparison - default exports
  "protocol-comparison": React.lazy(() => import("./protocol-comparison/ProtocolComparisonVisualizer").then(m => ({ default: m.default }))),
}

export default lazyVisualizers
