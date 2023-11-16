import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ApiService from '../services/ApiService';

const Dropdown = ({ selectedStateId, setSelectedStateId }) => {
  const [statesList, setStatesList] = useState([{ id: 1, name: 'New York' }]);

  const onStateChange = (state) => {
    const newSelectedState = statesList.find((s) => s.name === state);
    setSelectedStateId(newSelectedState.id);
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const states = await ApiService.getAllStates();
        setStatesList(states);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
  }, []);

  return (
    <FormControl style={{ maxWidth: '200px', position: 'relative', backgroundColor: 'rgb(255 255 255)', marginTop: '5px'}}>
      <InputLabel id="stateDropdownLabel">Select a State:</InputLabel>
      <Select
        labelId="stateDropdownLabel"
        id="stateDropdown"
        value={statesList.find((s) => s.id === selectedStateId).name}
        label="Select a State"
        onChange={(e) => onStateChange(e.target.value)}
        sx={{ height: '30px' , width: '150px'}}
      >
        {statesList.map((state) => (
          <MenuItem key={state.id} value={state.name}>
            {state.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
