import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

const Charts = ({ data }) => {
  const evByModel = data?.reduce((acc, curr) => {
    const model = curr["Model"] || "Unknown";
    acc[model] = (acc[model] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(evByModel).map((key) => ({
    name: key,
    count: evByModel[key],
  }));

  return (
    <Box>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5">Electric Vehicles by Model</Typography>
          }
          titleTypographyProps={{ align: "center" }}
          sx={{ backgroundColor: "#354e4f", color: "#fff" }}
        />
        <CardContent>
          <Box>
            <BarChart width={600} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

Charts.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Charts;
