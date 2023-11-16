import React from "react";
import { IconButton, Box } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const MarkerController = ({
  handleAddMarker,
  handleDeleteMarker,
  handleEditMarker,
}) => {
  return (
    <div>
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <IconButton
          color="primary"
          onClick={handleAddMarker}
          style={{ backgroundColor: "white" }}
        >
          <Add />
        </IconButton>
        <IconButton
          color="primary"
          onClick={handleEditMarker}
          style={{ backgroundColor: "white" }}
        >
          <Edit />
        </IconButton>
        <IconButton
          color="primary"
          onClick={handleDeleteMarker}
          style={{ backgroundColor: "white" }}
        >
          <Delete />
        </IconButton>
      </Box>
    </div>
  );
};
export default MarkerController;
