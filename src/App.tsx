import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { HomePage } from "@/pages/HomePage"
import { ConceptsPage } from "@/pages/ConceptsPage"
import { ConceptDetailPage } from "@/pages/ConceptDetailPage"
import { LabPage } from "@/pages/LabPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="concepts" element={<ConceptsPage />} />
          <Route path="concepts/:id" element={<ConceptDetailPage />} />
          <Route path="lab" element={<LabPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
