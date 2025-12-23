import { Concept } from "./types"

// Import all concept arrays from individual files
import { basicsConcepts } from "./basics"
import { tokensJwtConcepts } from "./tokens-jwt"
import { oauth2Concepts } from "./oauth2"
import { oauth2FlowsConcepts } from "./oauth2-flows"
import { accessControlConcepts } from "./access-control"
import { securityConcepts } from "./security"
import { passwordSecurityConcepts } from "./password-security"
import { mfaConcepts } from "./mfa"
import { protocolsConcepts } from "./protocols"

// Combine all concepts into a single array
export const concepts: Concept[] = [
  ...basicsConcepts,
  ...tokensJwtConcepts,
  ...oauth2Concepts,
  ...oauth2FlowsConcepts,
  ...accessControlConcepts,
  ...securityConcepts,
  ...passwordSecurityConcepts,
  ...mfaConcepts,
  ...protocolsConcepts,
]

// Re-export types and utilities
export type { Concept } from "./types"
export { getConceptsByCategory, getConceptById, getAllCategories } from "./types"

// Helper functions
export const getConceptsByCategoryName = (category: string): Concept[] =>
  concepts.filter(c => c.category === category)

export const getConceptByIdSafe = (id: string): Concept | undefined =>
  concepts.find(c => c.id === id)

export const getAllCategoriesList = (): string[] => {
  const categories = new Set(concepts.map(c => c.category))
  return Array.from(categories)
}

// Export individual concept arrays for testing
export { basicsConcepts } from "./basics"
export { tokensJwtConcepts } from "./tokens-jwt"
export { oauth2Concepts } from "./oauth2"
export { oauth2FlowsConcepts } from "./oauth2-flows"
export { accessControlConcepts } from "./access-control"
export { securityConcepts } from "./security"
export { passwordSecurityConcepts } from "./password-security"
export { mfaConcepts } from "./mfa"
export { protocolsConcepts } from "./protocols"
