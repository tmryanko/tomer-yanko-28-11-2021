/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import fToC from '../../assets/FarToCel';

const Card = ({ day, degrees, degreeType }) => {
  const [currentDegree, setCurrentdegree] = useState();

  useEffect(() => {
    if (degreeType === 'Metric') {
      setCurrentdegree(() => fToC(degrees).toFixed(1));
    } else {
      setCurrentdegree(degrees);
    }
  }, [degreeType]);

  return (
    <MuiCard>
      <CardContent>
        <Typography>{day}</Typography>
        <Typography>{currentDegree}</Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
