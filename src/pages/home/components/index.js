import { Accordion, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomisedHomeText = styled(Typography)`
  font-weight: 600;
  padding: 2rem 4rem 2rem 0rem;
`;

export const CustomisedCardLabels = styled(Typography)`
  font-weight: 600;
  padding: 2rem 0 2rem 0rem;
`;

export const StyledBoxHIW = styled(Box)`
  background: #fff5e4;
  padding: {xs : 1rem, md: 2rem};
  margin: 2rem;
  border-radius: 0.5rem;
`;

export const StyledBoxScrollable = styled(Box)`
  position: relative;
  overflow: auto;
  white-space: nowrap;
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  &::-webkit-scrollbar {
    height: 0;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #00adff;
    border-radius: 8px;
    outline: 1px solid #00adff;
  }
`;

export const AccordionBox = styled(Box)`
  padding: 6px 10px;
  ${(props) => props.theme.breakpoints.down('sm')} {
    padding: 4px 6px;
  }
  margin: 1rem 0;
  border: 1px solid #000;
  border-radius: 1rem;
`;

export const AccordionStyled = styled(Accordion)`
  box-shadow: none;
`;

export const CustomisedAccordianLabels = styled(Typography)`
  font-weight: 500;
  font-size: 1rem;
  ${(props) => props.theme.breakpoints.down('sm')} {
    font-size: 0.8rem;
  }
`;
