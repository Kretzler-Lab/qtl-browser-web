import {useCallback, useEffect, useRef, useState} from "react";
import {Col, Container, Row} from "reactstrap"
import ConceptSelect from "./components/ConceptSelect/ConceptSelect"
import {AllCommunityModule, type GridApi, type GridReadyEvent, ModuleRegistry} from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import {AgGridReact, type CustomCellRendererProps} from 'ag-grid-react';
import { fetchFindByIdEnsgId } from "./helpers/ApolloClient";
import { useAppSelector } from "./app/hooks";
import { Spinner} from "reactstrap";
import {setVariant} from "./features/variant/variantSlice.ts";
import type {AutocompleteResult, Qtl} from "./helpers/schema.tsx";
ModuleRegistry.registerModules([AllCommunityModule]);
import { useAppDispatch } from "./app/hooks";
import {useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";


type RowData = {
  gene: string;
  id: {
    variantId: string;
    dx:string;
    ensgId: string
  };
  tssDistance: string;
  maf: string;
  pval: string;
  slope: string;
  slopeSe: string;
};

export function App() {

  const [rowData, setRowData] = useState<RowData[]>([]);
  const autocompleteResult: AutocompleteResult | null = useAppSelector((state) => state.autocompleteReducer.autocompleteResult);
  const [isLoading, setIsLoading] = useState(false);
  const [noEnsgId, setNoEnsgId] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    const gridApiRef = useRef<GridApi | null>(null);

    const onGridReady = useCallback((params:GridReadyEvent) => {
        gridApiRef.current = params.api;
    }, []);

    const onBtExport = useCallback(() => {
        const params = {
            skipHeader: false,
            skipFooters: true,
            skipGroups: true,
            fileName: (autocompleteResult?.value ?? "curegn") + '_qtls' + '.csv',
        };
        gridApiRef.current?.exportDataAsCsv(params);
    }, [autocompleteResult]);


  const LinkRenderer = (params: CustomCellRendererProps<RowData>) => {
      const handleClick = () => {
          if (!params.data) {
            return;
          }
          else{
            dispatch(setVariant({
                ensgId:  params.data.id.ensgId,
                variantId: params.value,
                dx: params.data.id.dx
            }))
            navigate('/effects')
          }
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
      ) as unknown as Qtl[];

      const result: RowData[] = (data ?? []).map(((row) => ({
        id: row.id,
        gene: autocompleteResult.value,
        maf: row?.maf.toExponential(3),
        pval: typeof(row?.pval) === "number" ? row?.pval.toExponential(3) : row?.pval, 
        slope: row?.slope.toExponential(3),
        slopeSe: row?.slopeSe.toExponential(3),
        tssDistance: row?.tssDistance.toExponential(3)
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

      
       
        {isLoading && (
          <div className="text-center my-4">
            <Spinner color="primary" />
          </div>
        )}

        {!isLoading && rowData.length > 0 && (
            <Container className='mt-3 rounded border p-3 shadow-sm'>
          <Row className="mt-4">
            <h5>Results for {autocompleteResult?.value}</h5>
            <Col xs='12' className="ag-theme-material img-fluid mt-2">
                <div className='mb-1' style={{ display: "flex" }}>
                    <div> Select a variant loci to view the variant effects by diagnosis</div>
                    <FontAwesomeIcon icon={faDownload} size="2x" onClick={onBtExport} style={{ marginLeft: 'auto' }} aria-label="Click to download table"/>
                </div>
              <AgGridReact 
                rowData={rowData}
                columnDefs={columns}
                domLayout='autoHeight'
                autoSizeStrategy={{ type: 'fitGridWidth' }}
                pagination={true}
                paginationPageSize={20}
                onGridReady={onGridReady}
              />
            </Col>
            <small><span>* chrom-pos-ref-alternate</span></small>
          </Row>
                </Container>
        )}

        {!isLoading && rowData.length === 0 && autocompleteResult?.ensg_id && (
            <Container className='mt-3 rounded border p-3 shadow-sm'>

            <div className="text-muted mt-3">
            No results found for {autocompleteResult.value}. The gene you selected may have been filtered out due to low expression or other criteria.
          </div>
                </Container>
        )}
        
        {autocompleteResult && !isLoading && noEnsgId && (
            <Container className='mt-3 rounded border p-3 shadow-sm'>

            <div className="text-muted mt-3">
          This gene does not have an ENSG ID, so no data can be retrieved. Please select a different gene.
        </div>
            </Container>
      )}
    </div>
  )
}
export default App