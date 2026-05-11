import {useCallback, useEffect, useRef, useState} from "react";
import {Col, Container, Row} from "reactstrap"
import ConceptSelect from "./components/ConceptSelect/ConceptSelect"
import {AllCommunityModule, type GridApi, type GridReadyEvent, ModuleRegistry, TextFilterModule, TooltipModule} from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import {AgGridReact, type CustomCellRendererProps} from 'ag-grid-react';
import { fetchFindByIdEnsgId } from "./helpers/ApolloClient";
import { useAppSelector } from "./app/hooks";
import { Spinner} from "reactstrap";
import {setVariant} from "./features/variant/variantSlice.ts";
import {searchTypes, type AutocompleteResult, type Qtl, type searchTerm} from "./helpers/schema.tsx";
ModuleRegistry.registerModules([AllCommunityModule, TextFilterModule, TooltipModule]);
import { useAppDispatch } from "./app/hooks";
import {useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import SNPSelect from "./components/SNPSelect/SNPSelect.tsx";
import { setGene } from "./features/gene/geneSlice.ts";
import InfoHeader from "./components/Header/InfoHeader.tsx";
import {formatNumber} from "./helpers/Utils.tsx";


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
  diagnosis: string
};

export function App() {

  const [rowData, setRowData] = useState<RowData[]>([]);
  const autocompleteResult: AutocompleteResult | null = useAppSelector((state) => state.autocompleteReducer.autocompleteResult);
  const qtlResults: Qtl[] | null = useAppSelector((state) => state.qtlReducer?.qtlResults);
  const searchTerm: searchTerm | null = useAppSelector((state) => state.qtlReducer?.searchTerm);
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
            fileName: (searchTerm?.term ?? "curegn") + '_qtls' + '.csv',
        };
        gridApiRef.current?.exportDataAsCsv(params);
    }, [searchTerm]);


  const LinkRenderer = (params: CustomCellRendererProps<RowData>) => {
      const handleClick = () => {
          if (!params.data) {
            return;
          }
          else{
            dispatch(setGene(params.data.gene));
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
    if (!searchTerm) {
		return;
    }

    setRowData([]);
    setNoEnsgId(false);

    const getRowData = async () => {
		if (!autocompleteResult?.ensg_id || autocompleteResult?.ensg_id === null) {
			setNoEnsgId(true);
			return;
	  	}
		try {
			setIsLoading(true);
			setRowData([]);

			const data = await fetchFindByIdEnsgId(
				autocompleteResult.ensg_id
			) as unknown as Qtl[];

			fillTable(data, autocompleteResult.value);
		} catch (error) {
			console.error("Error fetching gene data:", error);
			setRowData([]);
		} finally {
			setIsLoading(false);
		}
    };

    const fillTable = (data: Qtl[] | null, geneSymbol: string) => {
		if (!data) {
			return;
		}
		const result: RowData[] = (data ?? []).map(((row) => ({
			id: row.id,
			gene: row?.geneSymbol ?? geneSymbol,
			maf: row?.maf.toFixed(3),
			pval: typeof(row?.pval) === "number" ? formatNumber(row?.pval) : row?.pval,
			slope: row?.slope.toFixed(3),
			slopeSe: row?.slopeSe.toFixed(3),
			tssDistance: row?.tssDistance.toString(),
            diagnosis: row?.id.dx == "all_co" ? "All": row?.id.dx
		})));
		setRowData(result);
    }

	switch (searchTerm?.type) {
		case searchTypes.autoComplete: {
			getRowData();
			break;
		}
		case searchTypes.snp: {
			setIsLoading(true);
			setRowData([]);          
			fillTable(qtlResults, "");
			setIsLoading(false);
			break;
		}
	}

  }, [autocompleteResult, qtlResults, searchTerm]);


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
      headerComponent: InfoHeader,
      headerComponentParams: {infoIcon: true},
      headerTooltip: "Minor allele frequency for this variant in the Diagnosis Cohort indicated."
    },
    {
      headerName: "pVal",
      field: "pval",
      sortable: true,
      headerComponent: InfoHeader,
      headerComponentParams: {infoIcon: true},
      headerTooltip: "This is the p-value indicating the significance of the single SNP association with the gene expression."
    },
    {
      headerName: "Slope",
      field: "slope",
      sortable: true,
      headerComponent: InfoHeader,
      headerComponentParams: {infoIcon: true},      
      headerTooltip: "This is the slope of the linear regression for this single SNP and gene expression model."
    },
    {
      headerName: "Slope SE",
      field: "slopeSe",
      sortable: true,
      headerComponent: InfoHeader,
      headerComponentParams: {infoIcon: true},
      headerTooltip: "The standard error for the slope."
    },
    {
      headerName: "Diagnosis Cohort",
      field: "diagnosis",
      sortable: true,
      headerComponent: InfoHeader,
      headerComponentParams: {infoIcon: true},
      headerTooltip: `This is the diagnosis sub-cohort represented in the given row.

      FSGS: Focal Segmental Glomerulosclerosis
      MCD: Minimal Change Disease
      MN: Membranous Nephropathy 
      IgAN: IgA Nephropathy
      IgAV: IgA Vasculitis 
      All: All samples combined and analyzed together.`,
      filter: "agTextColumnFilter",
      initialWidth: 250
    }
  ]);

  return (
    <div>
      <div className="container mt-3">
        <h1>CureGN QTL Browser</h1>
      </div>
      <Container className='mt-3 rounded border p-3 shadow-sm'>
        <Row>
          <Col>
            <ConceptSelect searchType={"gene"} />
          </Col>
          <Col xs="auto" className="searchOrCol">
            <h5>or</h5>
          </Col>
          <Col>
            <SNPSelect />
          </Col>
        </Row>
      </Container>

      
       
        {isLoading && (
          <div className="text-center my-4">
            <Spinner color="primary" />
          </div>
        )}

        {!isLoading && rowData.length > 0 && (
            <Container className='mt-3 rounded border p-3 shadow-sm'>
          <Row className="mt-4">
            <h5>Results for {searchTerm?.term} </h5>
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
                tooltipShowDelay={500}
              />
            </Col>
            <small><span>* chrom-pos-ref-alternate</span></small>
          </Row>
                </Container>
        )}

        {!isLoading && rowData.length === 0 && autocompleteResult?.ensg_id && (
            <Container className='mt-3 rounded border p-3 shadow-sm'>

            <div className="text-muted mt-3">
            No results found for {searchTerm?.term}.{searchTerm?.type == searchTypes.autoComplete && (" The gene you selected may have been filtered out due to low expression or other criteria.")} 
          </div>
                </Container>
        )}
        
        {searchTerm?.type == searchTypes.autoComplete && autocompleteResult && !isLoading && noEnsgId && (
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