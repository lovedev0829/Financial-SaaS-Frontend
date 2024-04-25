import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

import ComponentBlock from '../../component-block';
import CustomizedStepper from './customized-steppers';

// ----------------------------------------------------------------------

export default function StepperView() {
  return (
    <>
      <Container sx={{ my: 10 }}>

          <ComponentBlock title="Customized Stepper">
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                width: 1,
              }}
            >
              <CustomizedStepper />
            </Paper>
          </ComponentBlock>
      </Container>
    </>
  );
}
