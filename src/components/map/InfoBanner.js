import React from "react";
import { Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const InfoBanner = ({ message, onClose }) => {
  return (
    <Paper
      sx={{
        position: "absolute",
        bottom: "20px",
        left: "10px",
        padding: "10px",
        backgroundColor: "#2196f3",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
      }}
    >
      <Typography variant="body1">{message}</Typography>
      <IconButton color="inherit" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Paper>
  );
};

export default InfoBanner;
