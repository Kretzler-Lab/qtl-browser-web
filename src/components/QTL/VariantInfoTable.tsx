import {type FC, useCallback, useRef} from 'react';
import {AllCommunityModule, type GridApi, type GridReadyEvent, ModuleRegistry} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from "react";
import type { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import InfoHeader from '../Header/InfoHeader';
import {generateGenotypeLabels} from '../../helpers/Utils.tsx';
ModuleRegistry.registerModules([AllCommunityModule]);

type RowData = {
  gene?: string;
  disease?: string;
  tssDistance?: number | string;
  maf?: number | number;
  pval?: number | string
  slope?: number;
  stderr?: number | undefined; 
  ggPatients?: number;
  gaPatients?: number;
  aaPatients?: number;
};

export const VariantInfoTable: FC<{
    plotData?: RowData[];
    gene: string;
    variant: string;}> = ({ plotData = [], gene, variant }) => {
  const [rowData, setRowData] = useState<RowData[]>(plotData || []);
  const [columns, setColumns] = useState<ColDef<RowData>[]>([]);

  useEffect(() => {
    setRowData(plotData || []);
  }, [plotData]);

  useEffect(() => {
    const genotypeLabels = generateGenotypeLabels(variant);
    
    const newColumns: ColDef<RowData>[] = [
      {
        headerName: "Diagnosis",
        field: "disease",
        sortable: true,
        headerComponent: InfoHeader,
        headerComponentParams: {infoIcon: true},
        headerTooltip: "This is the diagnosis sub-cohort represented in the given row. The value of 'All' refers to all samples combined and analyzed together."
      },
      {
        headerName: "Slope",
        field: "slope",
        sortable: true,
        headerComponent: InfoHeader,
        headerComponentParams: {infoIcon: true},
        headerTooltip: "This is the slope of the linear regression for this single SNP and gene expression model. The 'Slope SE' field is the standard error for the slope."
        
      },
      {
        headerName: "Slope SE",
        field: "stderr",
        sortable: true,
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
        headerName: "MAF",
        field: "maf",
        sortable: true,
        headerComponent: InfoHeader,
        headerComponentParams: {infoIcon: true},
        headerTooltip: "Minor allele frequency for this variant in the sub-cohort indicated. All subsequent columns are the number of samples having the stated genotype in each cohort"
      },
      {
        headerName: `Count ${genotypeLabels[0]}`,
        field: "ggPatients",
        sortable: true
      },
      {
        headerName: `Count ${genotypeLabels[1]}`,
        field: "gaPatients",
        sortable: true
      },
      {
        headerName: `Count ${genotypeLabels[2]}`,
        field: "aaPatients",
        sortable: true
      }
    ];
    
    setColumns(newColumns);
  }, [variant]);

  const gridApiRef = useRef<GridApi | null>(null);

  const onGridReady = useCallback((params: GridReadyEvent) => {
      gridApiRef.current = params.api;
  }, []);

  const onBtExport = useCallback(() => {
      const params = {
          skipHeader: false,
          skipFooters: true,
          skipGroups: true,
          fileName: variant + '_' + gene + '.csv',
      };
      gridApiRef.current?.exportDataAsCsv(params);
  }, [variant, gene]);

  return (
    <div className="ag-theme-material img-fluid" style={{ height: '200px', width: '100%' }}>
        <div className='mb-1' style={{ display: "flex" }}>
                <FontAwesomeIcon icon={faDownload} size="2x" onClick={onBtExport} style={{ marginLeft: 'auto' }} aria-label="Click to download table"/>
        </div>
        <AgGridReact<RowData>
        rowData={rowData}
        columnDefs={columns}
        domLayout='autoHeight'
        autoSizeStrategy={{ type: 'fitGridWidth' }}
        pagination={false}
        onGridReady={onGridReady}
        />
    </div>
  );
};

export default VariantInfoTable;
