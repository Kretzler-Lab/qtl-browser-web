import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap"
import ConceptSelect from "./components/ConceptSelect/ConceptSelect"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import {AgGridReact, type CustomCellRendererProps} from 'ag-grid-react';
import { fetchFindByIdEnsgId } from "./helpers/ApolloClient";
import { useAppSelector } from "./app/hooks";
import { Spinner} from "reactstrap";
import {setVariant} from "./features/variant/variantSlice.ts";
import type {AutocompleteResult} from "./helpers/schema.tsx";
ModuleRegistry.registerModules([AllCommunityModule]);
import { useAppDispatch } from "./app/hooks";
import {useNavigate} from "react-router";


type RowData = {
  gene: string;
  id: {
    variantId: string;
    dx:string;
    ensgId: string
  };
  tssDistance: number;
  maf: number;
  pval: number;
  slope: number;
  slopeSe: number;
};

export function App() {

  const [rowData, setRowData] = useState<RowData[]>([]);
  const autocompleteResult: AutocompleteResult | null = useAppSelector((state) => state.autocomplete.autocompleteResult);
  const [isLoading, setIsLoading] = useState(false);
  const [noEnsgId, setNoEnsgId] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();



  const LinkRenderer = (params: CustomCellRendererProps<RowData>) => {
      const handleClick = () => {
          dispatch(setVariant({
              ensgId: autocompleteResult && autocompleteResult.ensg_id,
              variantId: params.value,
              dx: ""
          }))
          navigate('/effects')
      };

      return (
          <span
              onClick={handleClick}
              style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {params.value}
        </span>
        );
    };


  useEffect(() => {
    if (!autocompleteResult) {
    return;
  }

  setRowData([]);
  setNoEnsgId(false);

  if (!autocompleteResult?.ensg_id || autocompleteResult?.ensg_id === null) {
    setNoEnsgId(true);
    return;
  }

  const getRowData = async () => {
    try {
      setIsLoading(true);
      setRowData([]);          

      const data = await fetchFindByIdEnsgId(
        autocompleteResult.ensg_id
      ) as unknown as RowData[];

      const result: RowData[] = (data ?? []).map((row => ({
        ...row,
        gene: autocompleteResult.value
      })));
      setRowData(result);
    } catch (error) {
      console.error("Error fetching gene data:", error);
      setRowData([]);
    } finally {
      setIsLoading(false);
    }
  };

  getRowData();
}, [autocompleteResult]);


  const [columns] = useState<ColDef<RowData>[]>([
    {
      headerName: "Gene Symbol",
      field: "gene",
      sortable: true,
    },
    {
      headerName: "Variant Loci*",
      field: "id.variantId",
      sortable: true,
      cellRenderer: LinkRenderer
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
      field: "pval",
      sortable: true,
    },
    {
      headerName: "Beta",
      field: "slope",
      sortable: true,
    },
    {
      headerName: "Beta STD Err",
      field: "slopeSe",
      sortable: true,
    },
    {
      headerName: "Diagnosis Cohort",
      field: "id.dx",
      sortable: true,
    }
  ]);

  return (
    <div>
      <div className="container mt-3">
        <h1>CureGN QTL Browser</h1>
      </div>
      <Container className='mt-3 rounded border p-3 shadow-sm'>
          <ConceptSelect selectedConcept="" searchType={"gene"}/>
      </Container>
      <Container className='mt-3 rounded border p-3 shadow-sm'>
      
       
        {isLoading && (
          <div className="text-center my-4">
            <Spinner color="primary" />
          </div>
        )}

        {!isLoading && rowData.length > 0 && (
          <Row className="mt-4">
            <h5>Results</h5>
            <Col xs='12'>
              <AgGridReact 
                rowData={rowData}
                columnDefs={columns}
                domLayout='autoHeight'
                autoSizeStrategy={{ type: 'fitGridWidth' }}
                pagination={true}
                paginationPageSize={20}
              />
            </Col>
            <small><span>* chrom-pos-ref-alternate</span></small>
          </Row>
        )}

        {!isLoading && rowData.length === 0 && autocompleteResult?.ensg_id && (
          <div className="text-muted mt-3">
            No results found.
          </div>
        )}
        
        {autocompleteResult && !isLoading && noEnsgId && (
        <div className="text-muted mt-3">
          This gene does not have an ENSG ID, so no data can be retrieved. Please select a different gene.
        </div>
      )}
      </Container>
    </div>
  )
}
export default App