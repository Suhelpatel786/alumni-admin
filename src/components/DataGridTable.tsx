import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataGridProps {
  pageSizeOption: any[];
  rows: any[];
  columns: any[];
  pageSize: number;
}

export default function DataGridComponent({
  pageSize,
  pageSizeOption,
  rows,
  columns,
}: DataGridProps) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: pageSize },
          },
        }}
        pageSizeOptions={pageSizeOption}
      />
    </div>
  );
}
