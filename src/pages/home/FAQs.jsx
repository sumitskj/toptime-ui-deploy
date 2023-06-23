import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionBox, AccordionStyled, CustomisedAccordianLabels } from './components';

import { getStaticData } from './api/home';
import { setStaticData } from './slice/home';

const FAQs = () => {
  const dispatch = useDispatch();

  const homeData = useSelector((state) => state.home);

  const fetchStaticData = async () => {
    try {
      const res = await dispatch(getStaticData()).unwrap();
      if (res.ok) {
        let resJson = await res.json();
        dispatch(setStaticData(resJson));
      }
    } catch (error) {
      console.log('Error:: Static data:: ', error);
    }
  };

  useEffect(() => {
    fetchStaticData();
  }, []);

  if (homeData.staticData.faqData?.length > 0) {
    return (
      <Box
        sx={{
          pl: { xs: '2rem', md: '4rem' },
          pr: { xs: '2rem', md: '4rem' },
          pt: '2rem',
          backgroundColor: '#FFF9F9',
          pb: '4rem',
        }}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.4rem', md: '1.5rem', lg: '1.8rem' },
              m: { xs: '12px', md: '16px' },
              fontWeight: '600',
            }}>
            Frequently Asked Questions
          </Typography>
          {homeData.staticData.faqData.map((q) => (
            <AccordionBox key={q.key}>
              <AccordionStyled>
                <AccordionSummary
                  sx={{ backgroundColor: '#FFF9F9' }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'>
                  <CustomisedAccordianLabels variant='h5'>{q.key}</CustomisedAccordianLabels>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: '#FFF9F9' }}>
                  {JSON.stringify(q.val)
                    .slice(1, -1)
                    .split('\\n')
                    .map((str, index) => (
                      <Typography key={index} sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>
                        {str.toString()}
                      </Typography>
                    ))}
                </AccordionDetails>
              </AccordionStyled>
            </AccordionBox>
          ))}
        </Grid>
      </Box>
    );
  }

  return null;
};

export default FAQs;
