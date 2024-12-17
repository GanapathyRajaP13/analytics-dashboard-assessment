import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import PropTypes from "prop-types";

const CountyDistributionChart = ({ data }) => {
  const countyData = data.reduce((acc, vehicle) => {
    acc[vehicle.County] = (acc[vehicle.County] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(countyData).map(([county, count]) => ({
    name: county,
    count: count,
  }));

  return (
    <Box>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5">Electric Vehicles by County</Typography>
          }
          titleTypographyProps={{ align: "center" }}
          sx={{ backgroundColor: "#354e4f", color: "#fff" }}
        />
        <CardContent>
          <Box>
            <LineChart width={600} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                label={{
                  value: "County",
                  position: "insideBottomRight",
                  offset: -5,
                }}
              />
              <YAxis
                label={{ value: "Count", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

CountyDistributionChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CountyDistributionChart;
