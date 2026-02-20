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
  id?: {
  variantId?: string;
  dx?: string;
  ensgId?: string;
  };
  tssDistance?: number;
  maf?: number;
  pval?: number;
  slope?: number;
  numPatients?: number;
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
      sortable: true,
      filter: true,
      minWidth: 120,
    },
    {
      headerName: "MAF",
      field: "maf",
      sortable: true,
      filter: 'agNumberColumnFilter',
      minWidth: 100,
    },
    {
      headerName: "pVal",
      field: "pval",
      sortable: true,
      filter: 'agNumberColumnFilter',
      minWidth: 120,
    },
    {
      headerName: "Slope",
      field: "slope",
      sortable: true,
      filter: 'agNumberColumnFilter',
      minWidth: 100,
    },
    {
      headerName: "NumPatients",
      field: "numPatients",
      sortable: true,
      filter: 'agNumberColumnFilter',
      minWidth: 120,
    }
  ]);

  const defaultColDef = {
    resizable: true,
    sortable: true,
    flex: 1,
    minWidth: 80,
  } as ColDef;

  console.log(rowData)
  return (
    <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
      <AgGridReact<RowData>
        rowData={rowData}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default VariantInfoTable;