import { Box, Card, LinearProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";

const SalesWidget = ({ title, data }) => {
  const model = [...new Set(data.map((item) => item.Model))];

  const dataSet = model.map((brand) => {
    const count = data.filter((item) => item.Model === brand).length;
    return { make: brand, count: count };
  });

  const totalCount = dataSet.reduce((acc, item) => acc + item.count, 0);

  const counts = dataSet.map((item) => item.count);
  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);

  const mediumThreshold = (maxCount + minCount) / 2;

  return (
    <Card sx={{ minWidth: 300, padding: 2, backgroundColor: "#354e4f" }}>
      <Typography
        color="text.secondary"
        gutterBottom
        sx={{ fontSize: "16px", textAlign: "center", color: "#fff" }}
      >
        {title}
      </Typography>
      {dataSet.map((item, index) => {
        let color;
        if (item.count === maxCount) {
          color = "green";
        } else if (item.count >= mediumThreshold) {
          color = "orange";
        } else {
          color = "red";
        }

        return (
          <Box
            sx={{ display: "flex", alignItems: "center", mt: 1 }}
            key={index}
          >
            <Typography
              sx={{ flex: 0.7, fontSize: "10px", fontWeight: "bold", color: "#fff" }}
            //   color="text.secondary"
            >
              {item.make}
            </Typography>
            <Box sx={{ flex: 2, mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={totalCount > 0 ? (item.count / totalCount) * 100 : 0}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor:
                    color === "red"
                      ? "#ffcccc"
                      : color === "orange"
                      ? "#ffcc80"
                      : "#ccffcc",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: color,
                  },
                }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: "10px", color: "#fff" }}>
                {item.count} {item.count === 1 ? "No" : "Nos"}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Card>
  );
};

SalesWidget.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Model: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SalesWidget;
