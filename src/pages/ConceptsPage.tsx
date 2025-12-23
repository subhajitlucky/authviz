import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { concepts } from "@/data/concepts"
import { Search, ChevronRight } from "lucide-react"

const categories = [
  { id: "all", label: "All" },
  { id: "basics", label: "Basics" },
  { id: "tokens", label: "Tokens" },
  { id: "oauth", label: "OAuth2" },
  { id: "access-control", label: "Access Control" },
  { id: "security", label: "Security" },
]

const difficultyColors = {
  beginner: "text-green-500 bg-green-500/10",
  intermediate: "text-yellow-500 bg-yellow-500/10",
  advanced: "text-red-500 bg-red-500/10",
}

export function ConceptsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConcepts = concepts.filter((concept) => {
    const matchesCategory = selectedCategory === "all" || concept.category === selectedCategory
    const matchesSearch =
      concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Authentication Concepts</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore all authentication and authorization concepts through interactive visualizations.
          Click on any concept to dive deeper.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md border bg-background w-64"
          />
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Concepts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcepts.map((concept) => (
          <Link key={concept.id} to={`/concepts/${concept.id}`}>
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[concept.difficulty]}`}>
                    {concept.difficulty}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">{concept.title}</CardTitle>
                <CardDescription>{concept.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">"{concept.analogy}"</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredConcepts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No concepts found matching your search.</p>
        </div>
      )}
    </div>
  )
}
