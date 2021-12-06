/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MuiCard from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import fToC from '../../assets/FarToCel';

const Card = ({
  cardHeaderTitle,
  cardHeaderSubTitle,
  degrees,
  degreeType,
  onClick,
  unit,
}) => {
  const [currentDegree, setCurrentdegree] = useState();

  useEffect(() => {
    if (degreeType === 'Metric') {
      setCurrentdegree(() => fToC(degrees).toFixed(1));
    }
    if (degreeType === 'Imperial') {
      setCurrentdegree(degrees);
    }
  }, [degreeType]);

  return (
    <MuiCard
      sx={{ minWidth: 200, cursor: onClick && 'pointer' }}
      onClick={onClick}
    >
      <CardContent>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //     R
          //   </Avatar>
          // }

          title={cardHeaderTitle}
          subheader={cardHeaderSubTitle}
        />
        <Stack direction='row' spacing={1} justifyContent='center'>
          <Typography>Temperature:</Typography>
          <Typography>{currentDegree}</Typography>
          {unit && <Typography>{unit}</Typography>}
        </Stack>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
