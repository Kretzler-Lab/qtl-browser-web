import { useState } from "react";
import { Col, Container, Row } from "reactstrap"
import ConceptSelect from "./components/ConceptSelect/ConceptSelect"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
ModuleRegistry.registerModules([AllCommunityModule]);

type RowData = {
  geneSymbol: string;
  variantLoci: string;
  tssDistance: number;
  maf: number;
  pVal: number;
  slope: number;
  slopeStdErr: number;
  diagnosisCohort: string;
};

export function App() {

  const [columns] = useState<ColDef<RowData>[]>([
    {
      headerName: "Gene Symbol",
      field: "geneSymbol",
      sortable: true,
    },
    {
      headerName: "Variant Loci*",
      field: "variantLoci",
      sortable: true,
    },
    {
      headerName: "TSS Distance",
      field: "tssDistance",
      sortable: true,
    },
    {
      headerName: "MAF",
      field: "maf",
      sortable: true,
    },
    {
      headerName: "PVAL",
      field: "pVal",
      sortable: true,
    },
    {
      headerName: "Slope",
      field: "slope",
      sortable: true,
    },
    {
      headerName: "Slope STD Err",
      field: "slopeStdErr",
      sortable: true,
    },
    {
      headerName: "Diagnosis Cohort",
      field: "diagnosisCohort",
      sortable: true,
    }
  ]);
  
  const rows: RowData[] = [
    {
    geneSymbol: "NPHS2",
    variantLoci: "1:207411681:A:G",
    tssDistance: -1500,
    maf: 0.12,
    pVal: 0.00034,
    slope: 0.45,
    slopeStdErr: 0.12,
    diagnosisCohort: "FSGS"
  },
  {
    geneSymbol: "WT1",
    variantLoci: "11:32456789:C:T",
    tssDistance: 500,
    maf: 0.08,
    pVal: 0.0021,
    slope: -0.32,
    slopeStdErr: 0.09,
    diagnosisCohort: "MCD"
  }
];

  return (
    <div>
      <div className="container mt-3">
        <h1>CureGN QTL Browser</h1>
        <p>Here is some placeholder text.</p>
      </div>
      <Container className='mt-3 rounded border p-3 shadow-sm'>
          <ConceptSelect selectedConcept="" searchType={"gene"}/>
      </Container>
      <Container className='mt-3 rounded border p-3 shadow-sm'>
        <h5>Results</h5>
        <Row className="mt-4">
          <Col xs='12'>
          <AgGridReact 
            rowData={rows}
            columnDefs={columns}
            domLayout='autoHeight'
            autoSizeStrategy={{type: 'fitGridWidth'}}
          />
          </Col>
          <small><span>* chrom-pos-ref-alternate</span></small>
        </Row>
      </Container>
    </div>
  )
}

export default App
