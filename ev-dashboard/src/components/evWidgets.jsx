import { Box, Stack } from "@mui/material";
import PropTypes from "prop-types";
import RangeWidget from "./widgets/RangeWidget.jsx";
import SalesWidget from "./widgets/SalesWidget.jsx";

const EVDataWidgets = ({ data }) => {

  const averageRange = (
    data.reduce((sum, item) => sum + item.ElectricRange, 0) / data.length
  ).toFixed(2);

  return (
    <Box>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1}>
          <SalesWidget title="Vehicle Production by Model" data={data} />
          <SalesWidget title="Total Electric Vehicles" data={data} />
          <RangeWidget
            title="Average Electric Range"
            averageRange={averageRange}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

EVDataWidgets.propTypes = {
  data: PropTypes.array.isRequired,
};

export default EVDataWidgets;
