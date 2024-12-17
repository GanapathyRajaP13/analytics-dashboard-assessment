import { Box, LinearProgress } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, lazy } from "react";
import Header from "./components/header.jsx";
const Dashboard = lazy(() => import("./components/Dashboard.jsx"));

function App() {
  return (
    <Box className="App">
      <Header />
      <Box>
        <Suspense fallback={<LinearProgress />}>
          <Dashboard />
        </Suspense>
      </Box>
    </Box>
  );
}

export default App;
