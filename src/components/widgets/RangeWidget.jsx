import PropTypes from "prop-types";
import { Card, Typography } from "@mui/material";

const RangeWidget = ({ title, averageRange }) => (
  <Card sx={{ minWidth: 200, padding: 2 }}>
    <Typography variant="h6" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="h4" color="primary">
      {averageRange} miles
    </Typography>
  </Card>
);

RangeWidget.propTypes = {
  title: PropTypes.string.isRequired,
  averageRange: PropTypes.number.isRequired,
};

export default RangeWidget;
