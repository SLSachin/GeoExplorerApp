import React from 'react';
import { Popup } from 'react-leaflet';
import {TextField, Button, Typography, Box } from '@mui/material';

const PopupInput = ({ newMarkerData, setNewMarkerData, handleSaveMarker, handleCancelMarker }) => {

  return (
    <Popup closeButton={false}>
      <Box p={2} minWidth={200}>
        <Typography variant="h6">Add Marker</Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={newMarkerData.title}
          onChange={(e) => setNewMarkerData((prevData) => ({ ...prevData, title: e.target.value }))}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          value={newMarkerData.address}
          onChange={(e) => setNewMarkerData((prevData) => ({ ...prevData, address: e.target.value }))}
        />
        <Button variant="contained" color="primary" onClick={handleSaveMarker}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancelMarker}>
          Cancel
        </Button>
      </Box>
    </Popup>
  );
};

export default PopupInput;
