export interface Concept {
  id: string
  title: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  shortDescription: string
  analogy: string
  details: string
  codeExample?: string
  visualType: "flow" | "diagram" | "token" | "comparison" | "interactive"
  stepByStep?: string[]
  relatedConcepts?: string[]
}

export const getConceptsByCategory = (category: string, concepts: Concept[]) =>
  concepts.filter(c => c.category === category)

export const getConceptById = (id: string, concepts: Concept[]) =>
  concepts.find(c => c.id === id)

export const getAllCategories = (concepts: Concept[]) => {
  const categories = new Set(concepts.map(c => c.category))
  return Array.from(categories)
}
