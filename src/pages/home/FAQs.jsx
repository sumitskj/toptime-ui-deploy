import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {
  CustomisedCardLabels,
  AccordionBox,
  AccordionStyled,
  CustomisedAccordianLabels,
} from './components';

import { getStaticData } from './api/home';
import { setStaticData } from './slice/home';

const FAQs = () => {
  const dispatch = useDispatch();

  const homeData = useSelector((state) => state.home);

  const fetchStaticData = async () => {
    try {
      const res = await dispatch(getStaticData()).unwrap();
      if (res.ok) {
        const resJson = await res.json();
        dispatch(setStaticData(resJson));
      }
    } catch (error) {
      console.log('Error:: Static data:: ', error);
    }
  };

  useEffect(() => {
    fetchStaticData();
  }, []);

  if (homeData.staticData.faqData.length > 0) {
    return (
      <Grid item xs={12}>
        <CustomisedCardLabels variant='h4'>FAQs</CustomisedCardLabels>
        {homeData.staticData.faqData.map((q) => (
          <AccordionBox key={q.key}>
            <AccordionStyled>
              <AccordionSummary
                expandIcon={<ArrowCircleUpIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'>
                <CustomisedAccordianLabels variant='h5'>{q.key}</CustomisedAccordianLabels>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{q.val}</Typography>
              </AccordionDetails>
            </AccordionStyled>
          </AccordionBox>
        ))}
      </Grid>
    );
  }

  return null;
};

export default FAQs;
