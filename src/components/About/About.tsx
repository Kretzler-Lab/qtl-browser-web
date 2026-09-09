import { useCallback, useRef, useState } from "react";
import { Col, Container, Row } from "reactstrap"
import type { ColDef } from 'ag-grid-community';
import {AllCommunityModule, type GridApi, type GridReadyEvent, ModuleRegistry, TextFilterModule, TooltipModule, CustomFilterModule} from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
ModuleRegistry.registerModules([AllCommunityModule, TextFilterModule, TooltipModule, CustomFilterModule]);
import {handleGoogleAnayticsEvent} from "../../helpers/googleAnalyticsHelpers.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
type RowData = {
  characteristic: string;
  fsgs: string;
  mcd: string;
  mn: string;
  igan: string;
  igav: string;
}


export function About() {
  const highlightedCharacteristics = ['WGS', 'WGS + RNA-seq'];
  handleGoogleAnayticsEvent('About Page', 'Navigation', 'About Page Viewed');

  const [columns] = useState<ColDef<RowData>[]>([
  { 
    field: 'characteristic', 
    headerName: '', 
    sortable: false,
    width: 250,
    headerClass: 'purple-header',
    cellClass: (params) => highlightedCharacteristics.includes(params.data?.characteristic!) ? 'purple-bold-cell' : ''
  },
  { 
    field: 'fsgs', 
    headerName: 'FSGS', 
    sortable: false,
    width: 200,
    headerClass: 'purple-header',
    cellClass: (params) => highlightedCharacteristics.includes(params.data?.characteristic!) ? 'purple-bold-cell' : ''
  },
  { 
    field: 'mcd', 
    headerName: 'MCD', 
    sortable: false,
    width: 200,
    headerClass: 'purple-header',
    cellClass: (params) => highlightedCharacteristics.includes(params.data?.characteristic!) ? 'purple-bold-cell' : ''
  },
  { 
    field: 'mn', 
    headerName: 'MN',
    sortable: false,
    width: 150,
    headerClass: 'purple-header',
    cellClass: (params) => highlightedCharacteristics.includes(params.data?.characteristic!) ? 'purple-bold-cell' : ''
  },
  { 
    field: 'igan', 
    headerName: 'IgAN', 
    sortable: false,
    width: 150,
    headerClass: 'purple-header',
    cellClass: (params) => highlightedCharacteristics.includes(params.data?.characteristic!) ? 'purple-bold-cell' : ''
  },
  { 
    field: 'igav', 
    headerName: 'IgAV', 
    sortable: false,
    width: 150,
    headerClass: 'purple-header',
    cellClass: (params) => highlightedCharacteristics.includes(params.data?.characteristic!) ? 'purple-bold-cell' : ''
  },
]);
const gridApiRef = useRef<GridApi | null>(null);
const onGridReady = useCallback((params:GridReadyEvent) => {
        gridApiRef.current = params.api;
    }, []);

const [rowData] = useState<RowData[]>([
  { characteristic: "WGS", fsgs: '', mcd: '', mn: '', igan: '', igav: ''},
  { characteristic: "No. of patients*", fsgs: '508', mcd: '606', mn: '962', igan: '1,496', igav: '377'},
  { characteristic: "Age, median (Q1-Q3)", fsgs: '32 (15-49)', mcd: '20 (7-44)', mn: '52 (37-64)', igan: '30 (18-43)', igav: '10 (7-16)'},
  { characteristic: "Male (%)", fsgs: '266 (53%)', mcd: '323 (53%)', mn: '600 (63%)', igan: '893 (60%)', igav: '205 (55%)'},
  { characteristic: "eGFR, median (Q1-Q3) [mL/min/1.73m2]", fsgs: '71 (43-103)', mcd: '102 (73-123)', mn: '90 (62-109)', igan: '72 (43-99)', igav: '101 (73-121)'},
  { characteristic: "UPCR, median (Q1-Q3) [g/g]", fsgs: '4.0 (1.9-8.0)', mcd: '5.2 (1.1-9.6)', mn: '5.6 (3.1-8.5)', igan: '1.5 (0.8-3.0)', igav: '1.3 (0.5-4.0)'},
  { characteristic: "WGS + RNA-seq", fsgs: '', mcd: '', mn: '', igan: '', igav: ''},
  { characteristic: "No. of patients", fsgs: '447', mcd: '408', mn: '441', igan: '403', igav: '123'},
  { characteristic: "Age, median (Q1-Q3)", fsgs: '32 (15-49)', mcd: '14 (5-37)', mn: '51 (37-62)', igan: '31 (16-44)', igav: '14 (8-26)'},
  { characteristic: "Male (%)", fsgs: '242 (54%)', mcd: '218', mn: '272 (61%)', igan: '244 (60%)', igav: '73 (59%)'},
  { characteristic: "eGFR, median (Q1-Q3) [mL/min/1.73m2]", fsgs: '71 (42-102)', mcd: '105 (78-124)', mn: '89 (64-110)', igan: '69 (43-98)', igav: '92 (65-113)'},
  { characteristic: "UPCR, median (Q1-Q3) [g/g]", fsgs: '4.0 (2.1-8.0)', mcd: '4.6 (0.7-9.2)', mn: '5.6 (2.9-8.5)', igan: '1.4 (0.7-3.0)', igav: '1.8 (0.7-5.0)'},
]);

  return (

    <Container className='mt-3 mb-5 rounded border p-3 shadow-sm'>
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
      <p>Lili Liu, Chen Wang, Oleksandr Kravets, Damian Fermin, Felix Eichinger, Francesca Zanoni, Atlas Khan, Jun Y. Zhang, Yan Ouyang, Qin Li, Patrick Hamilton, Philip A Kalra, 
        Rajkumar Chinnadurai, Kimberly Reidy, Jeffrey Kopp, Krzysztof Mucha, Cathy Smith, Abigail Smith, Michelle Mcnulty, Sean Eddy, Viji Nair, Margaret Helmuth, Bethany Klunder, 
        Tetyana Vasylyeva, William Smoyer, Celine Berthier, Rulan Parekh, Scott Wenderfer, Tess Martin, Ksenia Solkolva, Rachel Sealfon, Chandra Theesfeld, Afshin Parsa, Rasheed Gbadegesin, 
        Matthew Sampson, Simone Sanna-Cherchi, Olga Troyanskaya, Dirk S. Paul, Slave Petrovski, David Goldstein, Laura Heyns Mariani, Ali Gharavi, Columbia Genomics Consortium, 
        NEPTUNE Consortium, CureGN Consortium, Matthias Kretzler, Krzysztof Kiryluk. <b>Atlas of glomerular disease-specific genetic effects on blood transcriptome.</b> <i>medRxiv. </i> 
        2026 Jun 24:2026.06.22.26356281. doi: <a target="_blank" href="https://www.medrxiv.org/content/10.64898/2026.06.22.26356281">10.64898/2026.06.22.26356281</a>.</p>

      <h3>Demographic and clinical characteristics of patients in the study cohort.</h3>
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

      <br />
      <h3>How to use the CureGN QTL Browser</h3>
      <h5>Search by Gene Workflow</h5>
      <p>Start typing in your gene of interest in the <b>Search by gene</b> box and select the suggestion that matches your gene:</p>
      <Row className="flex-column align-items-center">
        <Col xs={10}>
          <img className="img-fluid" src='/img/gene_search.png' />
        </Col>
      </Row>
        <br />
      <p>Review the results table of the available variants and the available data by each <b>Variant ID</b>. Each column may be sorted, 
        and <b>Diagnosis cohort</b> may be filtered to a specific Diagnosis Cohort (FSGS, MCD, MN, IgAN, IgAV, or All samples combined)</p>
      <ul>
        <li><b>TSS Distance</b> - The distance of the variant from the gene’s transcriptional site</li>
        <li><b>MAF</b> - Minor allele frequency for the variant in the diagnosis indicated</li>
        <li><b>Slope</b> - Slope of the linear regression of the single SNP and gene expression model</li>
        <li><b>Slope SE</b> - The standard error of the slope</li>
        <li><b>P-Value</b> - This is the p-value indicating the significance of the single SNP association with the gene expression</li>
      </ul>
      <p>The entire table is available for download by clicking the <FontAwesomeIcon icon={faDownload} size="lg" aria-label="Download button"/>.</p>

      <Row className="flex-column align-items-center">
        <Col xs={10}>
          <img className="img-fluid" src='/img/gene_search_results.png' />
        </Col>
      </Row>
      <br />

      <p>Select the <b>Variant ID</b> of interest. This will open the results page for that specific <b>Gene</b> and <b>Variant ID</b> across diseases and includes the analysis for all samples. </p>
      <Row className="flex-column align-items-center">
        <Col xs={10}>
          <img className="img-fluid" src='/img/variant_page.png' />
        </Col>
      </Row>
      <br />

      <p>Each plot is available for download as a PNG image by selecting the nearest <svg viewBox="0 0 1000 1000" className="icon" height="1em" width="1em">
          <path 
            d="m500 450c-83 0-150-67-150-150 0-83 67-150 150-150 83 0 150 67 150 150 0 83-67 150-150 150z m400 150h-120c-16 0-34 13-39 29l-31 93c-6 15-23 28-40 28h-340c-16 0-34-13-39-28l-31-94c-6-15-23-28-40-28h-120c-55 0-100-45-100-100v-450c0-55 45-100 100-100h800c55 0 100 45 100 100v450c0 55-45 100-100 100z m-400-550c-138 0-250 112-250 250 0 138 112 250 250 250 138 0 250-112 250-250 0-138-112-250-250-250z m365 380c-19 0-35 16-35 35 0 19 16 35 35 35 19 0 35-16 35-35 0-19-16-35-35-35z" 
            transform="matrix(1 0 0 -1 0 850)" 
            style={{fill: "rgba(68, 68, 68, 0.3)"}}>
          </path>
        </svg> icon.</p>

      <h5>Search by SNP Workflow</h5>
      <p>Start typing in your SNP of interest in the <b>Search by SNP box</b>, you must have the first 8 chromosome number and the first 8 digits at a minimum. The input format to follow for a SNP search is: chr22-36260977-T-C.</p>
      <Row className="flex-column align-items-center">
        <Col xs={10}>
          <img className="img-fluid" src='/img/snp_search.png' />
        </Col>
      </Row>
        <br />
      <p>The remaining workflows are the same as the <b>Search by Gene</b> workflow.</p>

        <h5>Need assistance with the CureGN QTL Browser?</h5>
        <p><a target="_blank" href="mailto:CureGN-QTL.Support@umich.edu">Contact us</a> or attend our Office Hours Wednesdays at 12:00pm Eastern. <a target="_blank" href="https://www.miktmc.org/research#:~:text=DATA%20MINING%20TOOLS%20FOR%20THE%20KIDNEY%20RESEARCH%20COMMUNITY">View our Research page</a> for Zoom link and updates. </p>

        <h5>CureGN Consortium</h5>
        <p>Find out more about the CureGN Consortium at: <a target="_blank" href="https://www.curegn.org/">https://www.curegn.org</a>.</p>
        <h5>About Us</h5>
        <p>Members of Michigan Kidney Translational Medicine Center (MiKTMC)  are responsible for the underlying analysis of the data and the development of the CureGN QTL Browser. Find out more information at: <a target="_blank" href="https://www.miktmc.org">https://www.miktmc.org</a>. Special thanks to Lili Liu, Damian Fermin, Zach Wright, Nathan Creger, Haneen Tout, and Michael Rose.</p>

      </div>
      
    </Container>
      
  )
}