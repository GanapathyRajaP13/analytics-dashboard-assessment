import { Autocomplete, Paper, TextField, Box, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEVData, fetchVehicleData } from "../store/evSlice";
import { useEffect, useState } from "react";

function SelectComponent() {
  const dispatch = useDispatch();
  const vehicleYear = useSelector((state) => state?.evData?.vehicleYear);
  const vehicleMake = useSelector((state) => state?.evData?.vehicleMake);
  const [vehicleData, setvehicleData] = useState({
    year: new Date().getFullYear().toString(),
    make: vehicleMake?.find((item) => item.id === 1)?.make,
  });

  useEffect(() => {
    dispatch(fetchVehicleData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVehicleData());
    dispatch(fetchEVData(vehicleData));
  }, [dispatch, vehicleData]);

  const getvehicleData = (key, value) => {
    setvehicleData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Box mt={2}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        flexWrap="wrap"
        gap={0}
      >
        <Typography variant="subtitle1" sx={{ minWidth: "100px" }}>
          Model Year
        </Typography>

        <Box minWidth="100px" maxWidth="400px">
          <Autocomplete
            options={vehicleYear}
            getOptionLabel={(option) => option.year}
            defaultValue={vehicleYear.find(
              (item) => item.year === new Date().getFullYear().toString()
            )}
            onChange={(event, newValue) => {
              getvehicleData("year", newValue.year);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Year"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    padding: "0px 8px",
                    fontSize: "0.875rem",
                    height: "10px",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "0px",
                    fontSize: "0.875rem",
                    height: "30px",
                    width: "150px",
                    backgroundColor: "white",
                  },
                }}
              />
            )}
            PaperComponent={({ children }) => (
              <Paper
                sx={{
                  maxHeight: 300,
                  overflow: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                {children}
              </Paper>
            )}
            ListboxProps={{
              sx: {
                padding: 0,
                "& .MuiAutocomplete-option": {
                  padding: "8px 12px",
                  fontSize: "0.875rem",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                },
              },
            }}
          />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ minWidth: "100px", marginLeft: 1 }}
        >
          Model Make
        </Typography>
        <Box minWidth="100px" maxWidth="400px">
          <Autocomplete
            options={vehicleMake}
            getOptionLabel={(option) => option.make}
            defaultValue={vehicleMake.find((item) => item.id === 1)}
            onChange={(event, newValue) => {
              getvehicleData("make", newValue.make);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                defaultValue={vehicleMake.find((item) => item.id === 1)}
                placeholder="Select Year"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    padding: "0px 8px",
                    fontSize: "0.875rem",
                    height: "10px",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "0px",
                    fontSize: "0.875rem",
                    height: "30px",
                    width: "150px",
                    backgroundColor: "white",
                  },
                }}
              />
            )}
            PaperComponent={({ children }) => (
              <Paper
                sx={{
                  maxHeight: 300,
                  overflow: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                {children}
              </Paper>
            )}
            ListboxProps={{
              sx: {
                padding: 0,
                "& .MuiAutocomplete-option": {
                  padding: "8px 12px",
                  fontSize: "0.875rem",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default SelectComponent;
