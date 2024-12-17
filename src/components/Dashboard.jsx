import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Charts from "./Charts.jsx";
import EVTable from "./EVTable.jsx";
import CountyDistributionChart from "./countryChart.jsx";
import EVDataWidgets from "./evWidgets.jsx";

const Dashboard = () => {
  const evData = useSelector((state) => state?.evData?.evData);
  const totalRows = useSelector((state) => state?.evData?.totalCount);
  const loading = useSelector((state) => state?.evData?.loading);
  const message = useSelector((state) => state?.evData?.message);
  console.log(evData);
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  return (
    <Box sx={{ padding: 2 }}>
      {loading && <LinearProgress />}

      {!loading && !message && evData?.length === 0 && (
        <Typography variant="h6">
          No electric vehicle data available.
        </Typography>
      )}

      {!loading && evData?.length > 0 && (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="stretch"
          justifyContent="flex-start"
          flexWrap="wrap"
          gap={1}
        >
          <EVDataWidgets data={evData} />
          <Charts data={evData} />
          <CountyDistributionChart data={evData} />
          <EVTable data={evData} totalRows={totalRows} />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
