import { Container } from "reactstrap"
import ConceptSelect from "./components/ConceptSelect/ConceptSelect"

export function App() {

  return (
    <div>
      <div className="container mt-3">
        <h1>CureGN QTL Browser</h1>
        <p>Here is some placeholder text.</p>
      </div>
      <Container className='mt-3 rounded border p-3 shadow-sm'>
          <ConceptSelect selectedConcept=""/>
      </Container>
      <Container className='mt-3 rounded border p-3 shadow-sm'>
        <h5>Results</h5>
        <p>Some more placeholder text. <br />And the Raven, never flitting, still is sitting- still is sitting <br/> on the pallid bust of Pallas just above my chamber door.</p>
      </Container>
    </div>
  )
}

export default App
