import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import SelectComponent from "../components/selectComponent";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 999 }}>
      <AppBar
        position="static"
        sx={{
          height: "64px",
          backgroundColor: "#354e4f",
          borderBottom: "1px solid white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.04)",
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            EV Vehicle Dashboard
          </Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <SelectComponent />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
