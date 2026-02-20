import type {FC} from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
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

export const VariantInfoTable: FC<{plotData?: RowData[]}> = ({ plotData = [] }) => {
  const [rowData, setRowData] = useState<RowData[]>(plotData || []);

  useEffect(() => {
    setRowData(plotData || []);
  }, [plotData]);

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
      <AgGridReact<RowData>
        rowData={rowData}
        columnDefs={columns}
        domLayout='autoHeight'
        autoSizeStrategy={{ type: 'fitGridWidth' }}
        pagination={false}
      />
    </div>
  );
};

export default VariantInfoTable;