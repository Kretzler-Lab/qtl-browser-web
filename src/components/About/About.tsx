import { useCallback, useRef, useState } from "react";
import { Col, Container, Row } from "reactstrap"
import type { ColDef } from 'ag-grid-community';
import {AllCommunityModule, type GridApi, type GridReadyEvent, ModuleRegistry, TextFilterModule, TooltipModule, CustomFilterModule} from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
ModuleRegistry.registerModules([AllCommunityModule, TextFilterModule, TooltipModule, CustomFilterModule]);

type RowData = {
  characteristic: string;
  numberOfParticipants: number | string;
  range: string;
  median: number | string; 
}



export function About() {
  const highlightedCharacteristics = ['Age', 'Sex', 'Ancestry', 'Disease', 'Baseline function values'];

  const [columns, setColumns] = useState<ColDef<RowData>[]>([
  { 
    field: 'characteristic', 
    headerName: 'Characteristic', 
    width: 200,
    headerClass: 'purple-header',
    cellClass: (params) => highlightedCharacteristics.includes(params.data?.characteristic!) ? 'purple-bold-cell' : ''
  },
  { 
    field: 'numberOfParticipants', 
    headerName: 'Number of Participants', 
    width: 200,
    headerClass: 'purple-header',
    cellClass: (params) => highlightedCharacteristics.includes(params.data?.characteristic!) ? 'purple-bold-cell' : ''
  },
  { 
    field: 'range', 
    headerName: 'Range',
    width: 150,
    headerClass: 'purple-header',
    cellClass: (params) => highlightedCharacteristics.includes(params.data?.characteristic!) ? 'purple-bold-cell' : ''
  },
  { 
    field: 'median', 
    headerName: 'Median', 
    width: 150,
    headerClass: 'purple-header',
    cellClass: (params) => highlightedCharacteristics.includes(params.data?.characteristic!) ? 'purple-bold-cell' : ''
  },
]);
const gridApiRef = useRef<GridApi | null>(null);
const onGridReady = useCallback((params:GridReadyEvent) => {
        gridApiRef.current = params.api;
    }, []);

const [rowData, setRowData] = useState<RowData[]>([
  { characteristic: "Age", numberOfParticipants: '', range: '', median: ''},
  { characteristic: "At enrollment (years)", numberOfParticipants: 1822, range: '2-90', median: 45 },
  { characteristic: "At onset of disease (years) ", numberOfParticipants: 1822, range: '2-90', median: 45 },
  { characteristic: "Sex", numberOfParticipants: '', range: '', median: '' },
  { characteristic: "Male", numberOfParticipants: 1822, range: '1-100', median: 45 },
  { characteristic: "Female", numberOfParticipants: 1822, range: '1-100', median: 45 },
  { characteristic: "Ancestry", numberOfParticipants: '', range: '', median: '' },
  { characteristic: "European", numberOfParticipants: 1822, range: '1-100', median: 45 },
  { characteristic: "African", numberOfParticipants: 1822, range: '1-100', median: 45 },
  { characteristic: "Asian", numberOfParticipants: 1822, range: '1-100', median: 45 },
  { characteristic: "Disease", numberOfParticipants: '', range: '', median: '' },
  { characteristic: "Focal segmental glomerulosclerosis (FSGS)", numberOfParticipants: 450, range: '1-100', median: 45 },
  { characteristic: "IgA nephropathy (IgAN)", numberOfParticipants: 403, range: '1-100', median: 45 },
  { characteristic: "IgA vasculitis (IgAV)", numberOfParticipants: 123, range: '1-100', median: 45 },
  { characteristic: "Minimal change disease (MCD)", numberOfParticipants: 408, range: '1-100', median: 45 },
  { characteristic: "Membranous nephropathy (MN)", numberOfParticipants: 442, range: '1-100', median: 45 },
  { characteristic: "All participants", numberOfParticipants: 1822, range: '1-100', median: 45 },
  { characteristic: "Baseline function values", numberOfParticipants: '', range: '', median: '' },
  { characteristic: "Albumin", numberOfParticipants: 1822, range: '1-100', median: 45 },
  { characteristic: "Creatinine", numberOfParticipants: 1822, range: '1-100', median: 45 },
  { characteristic: "eGFR", numberOfParticipants: 1822, range: '1-100', median: 45 },
  { characteristic: "UPCR", numberOfParticipants: 1822, range: '1-100', median: 45 },

]);

  return (

    <Container className='mt-3 rounded border p-3 shadow-sm'>
      <div className="container mt-3">
        <h1>Welcome to the CureGN QTL Browser</h1>
      </div>
      <div className="container mt-3">
        <h3>Introduction</h3>
        <p>
          The CureGN QTL Browser is a comprehensive public resource to study the genetic effects of blood gene regulation across five different glomerular disorders. 
          The project collected blood samples from 1,822 patients with primary glomerulonephropathies, including 450 FSGS, 403 IgAN, 123 IgAV, 408 MCD, and 442 MN cases. 
          All individuals were whole-genome sequenced at 30x depth, and blood transcriptome profiles were generated using RNA sequencing. 
          <br />
          <br />
          The quantitative trait loci (QTLs) were identified as genetic variants that were significantly correlated with changes in the expression of nearby genes (expression QTLs), local splicing events (splicing QTL), or double-stranded A-to-I RNA editing events (editing QTL), respectively. 
          The QTL mapping was first performed separately for each form of glomerulonephropathy, followed by an integrated cross-disease analysis combining all disease groups. 
          The resource systematically characterizes both disease-shared and disease-specific QTLs, offering a valuable framework for interpreting the functional and mechanistic roles of non-coding genetic variants associated with glomerulonephropathies.
        </p>

      <h3>Citation</h3>
      <p>Pending</p>
      <h3>Download</h3>
      <p>Click <a target="_blank" href="https://example.com">here</a> to download the gene-level QTL summary statistics and the complete SNP–phenotype association results.</p>

      <h3>Clinical Characteristics of the CureGN study participants</h3>
      <Row>
        <Col xs={12}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          domLayout='autoHeight'
          autoSizeStrategy={{ type: 'fitGridWidth' }}
          onGridReady={onGridReady}
        />
        </Col>
      </Row>
      <h3>Technical Details</h3>
      <Row className="flex-column align-items-center">
        <Col xs={10}>
          <img className="img-fluid" src="public/img/technical-details.png"></img>
        </Col>
      </Row>


      <h3>How to use the CureGN QTL Browser</h3>
      <p>You may start a search by typing the first few letters of your gene of interest and selecting the matching suggestion: </p>
      <Row className="flex-column align-items-center">
        <Col xs={10}>
          <img className="img-fluid" src='public/img/gene-search.png' />

        <br />

        <p>Or you can start with your SNP location of interest. Type in a SNP location and press ENTER for the resulting list of genes:</p>
            <img className="img-fluid" src='public/img/snp-search.png' />
            <img className="img-fluid" src='public/img/results.png' />
          </Col>
        </Row>

        <h3>FAQs</h3>
        <p><strong>CureGN Consortium</strong></p>
        <p>Find out more about the CureGN Consortium at <a target="_blank" href="https://curegn.org">https://curegn.org</a></p>

        <br />

        <p><strong>Need assistance with the CureGN QTL Browser?</strong></p>
        <p><a target="_blank" href="mailto:CureGN-QTL.Support@umich.edu">Contact Us</a></p>

        <h3>About Us</h3>
        <p>Find out more about Michigan Kidney Translational Medicine Center at <a target="_blank" href="https://miktmc.org">https://miktmc.org</a></p>
        <p>Members of our lab are responsible for the underlying analysis of the data and the development of the QTL application.</p>
        <p>Special thanks to Lilli Liu, Damian Fermin, Zach Wright, Nathan Creger, and Haneen Tout</p>
      </div>
      
    </Container>
      
  )
}