import { DataGrid } from "@mui/x-data-grid";
import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

const EVTable = ({ data }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "DOL Vehicle ID",
      headerName: "Vehicle ID",
      headerAlign: "center",
      align: "right",
      width: 100,
    },
    {
      field: "Make",
      headerName: "Make",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "Model",
      headerName: "Model",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "Model Year",
      headerName: "Year",
      headerAlign: "center",
      align: "right",
      width: 100,
    },
    {
      field: "Electric Range",
      headerName: "Electric Range",
      headerAlign: "center",
      align: "right",
      width: 100,
    },
  ];

  return (
    <Box className="mt-1">
      <Card>
        <CardHeader
          title={
            <Typography variant="h6">
              Electric Vehicle Population Data
            </Typography>
          }
          titleTypographyProps={{ align: "center" }}
          sx={{ backgroundColor: "#354e4f", color: "#fff" }}
        />
        <CardContent>
          <Box style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              disableColumnMenu
              rowHeight={40}
              sx={{
                "& .MuiDataGrid-footerContainer": {
                  minHeight: "40px",
                  maxHeight: "40px",
                },
                "& .MuiTablePagination-toolbar": {
                  minHeight: "40px",
                  maxHeight: "40px",
                },
                "& .MuiTablePagination-root .MuiTablePagination-selectLabel": {
                  marginBottom: "0px",
                },
                "& .MuiTablePagination-displayedRows": {
                  marginBottom: "0px",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

EVTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default EVTable;
