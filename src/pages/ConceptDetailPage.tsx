import { useEffect, Suspense } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { getConceptByIdSafe, concepts } from "@/data/concepts"
import { lazyVisualizers } from "@/visualizers"
import { ArrowLeft, Lightbulb, Code, Info, Play } from "lucide-react"

function LoadingVisualizer() {
  return (
    <div className="bg-muted rounded-lg p-8 min-h-[200px] flex items-center justify-center">
      <p className="text-muted-foreground">Loading visualization...</p>
    </div>
  )
}

export function ConceptDetailPage() {
  const { id = "" } = useParams()
  const concept = getConceptByIdSafe(id)

  useEffect(() => {
    if (concept) {
      document.title = `${concept.title} - AuthViz`
    }
  }, [concept])

  if (!concept) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Concept Not Found</h1>
        <Link to="/concepts">
          <Button>Back to Concepts</Button>
        </Link>
      </div>
    )
  }

  const conceptIndex = concepts.findIndex((c) => c.id === concept.id)
  const prevConcept = conceptIndex > 0 ? concepts[conceptIndex - 1] : null
  const nextConcept = conceptIndex < concepts.length - 1 ? concepts[conceptIndex + 1] : null

  const LazyVisualizer = lazyVisualizers[concept.id]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link to="/concepts" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Concepts
        </Link>
        <h1 className="text-4xl font-bold">{concept.title}</h1>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary capitalize">
            {concept.category}
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-muted capitalize">
            {concept.difficulty}
          </span>
        </div>
      </div>

      {/* Analogy */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-primary" />
            Analogy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg italic">"{concept.analogy}"</p>
        </CardContent>
      </Card>

      {/* Interactive Visualization */}
      {LazyVisualizer ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Play className="h-5 w-5 text-primary" />
              Interactive Visualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<LoadingVisualizer />}>
              <LazyVisualizer />
            </Suspense>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5" />
              Visual Diagram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-8 min-h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Interactive visualization for {concept.visualType} coming soon
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5" />
            Details
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: concept.details.replace(/\n/g, "<br/>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/`([^`]+)`/g, "<code class='bg-muted px-1 rounded'>$1</code>") }} />
        </CardContent>
      </Card>

      {/* Code Example */}
      {concept.codeExample && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Code className="h-5 w-5" />
              Code Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{concept.codeExample}</code>
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-8 border-t">
        {prevConcept ? (
          <Link to={`/concepts/${prevConcept.id}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: {prevConcept.title}
            </Button>
          </Link>
        ) : (
          <div />
        )}
        {nextConcept && (
          <Link to={`/concepts/${nextConcept.id}`}>
            <Button variant="outline">
              Next: {nextConcept.title}
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
