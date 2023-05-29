import React from 'react';
import { AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {
  CustomisedCardLabels,
  AccordionBox,
  AccordionStyled,
  CustomisedAccordianLabels,
} from './components';

const QUESTIONS = [
  {
    id: 1,
    question: 'What will happen after I book a call?',
    ans: '',
  },
  {
    id: 2,
    question: 'My call is cancelled. What will happen now?',
    ans: '',
  },
  {
    id: 3,
    question: 'Can I reschedule or cancel the call?',
    ans: '',
  },
  {
    id: 4,
    question: 'Can I withdraw the the funds added to my wallet?',
    ans: '',
  },
];

const FAQs = () => {
  return (
    <Grid item xs={12}>
      <CustomisedCardLabels variant='h4'>FAQs</CustomisedCardLabels>
      {QUESTIONS.map((q) => (
        <AccordionBox key={q.id}>
          <AccordionStyled>
            <AccordionSummary
              expandIcon={<ArrowCircleUpIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'>
              <CustomisedAccordianLabels variant='h5'>{q.question}</CustomisedAccordianLabels>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </AccordionStyled>
        </AccordionBox>
      ))}
    </Grid>
  );
};

export default FAQs;
