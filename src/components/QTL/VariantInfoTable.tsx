import {type FC, useCallback, useRef} from 'react';
import {AllCommunityModule, type GridApi, type GridReadyEvent, ModuleRegistry} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from "react";
import type { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
ModuleRegistry.registerModules([AllCommunityModule]);

type RowData = {
  gene?: string;
  disease?: string;
  tssDistance?: number;
  maf?: number;
  pval?: number;
  slope?: number;
  ggPatients?: number;
  gaPatients?: number;
  aaPatients?: number;
};

export const VariantInfoTable: FC<{
    plotData?: RowData[];
    gene: string;
    variant: string;}> = ({ plotData = [], gene, variant }) => {
  const [rowData, setRowData] = useState<RowData[]>(plotData || []);

  useEffect(() => {
    setRowData(plotData || []);
  }, [plotData]);

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
    }, []);

  const [columns] = useState<ColDef<RowData>[]>([
    {
      headerName: "Disease",
      field: "disease",
      sortable: true
    },
    {
      headerName: "MAF",
      field: "maf",
      sortable: true
    },
    {
      headerName: "pVal",
      field: "pval",
      sortable: true
    },
    {
      headerName: "Slope",
      field: "slope",
      sortable: true
    },
    {
      headerName: "GG Patients",
      field: "ggPatients",
      sortable: true
    },
    {
      headerName: "GA Patients",
      field: "gaPatients",
      sortable: true
    },
    {
      headerName: "AA Patients",
      field: "aaPatients",
      sortable: true
    }
  ]);

  return (
    <div className="ag-theme-material img-fluid" style={{ height: '200px', width: '100%' }}>
        <div style={{ display: "flex" }}>
        <button onClick={onBtExport} style={{marginLeft: 'auto'}}>
            Download as CSV
        </button>
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