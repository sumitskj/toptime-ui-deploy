import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LogoWithName } from '../../components/logo/Logo';

const ForbiddenPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position='relative' sx={{ backgroundColor: '#FFECEC' }}>
        <Toolbar disableGutters>
          <div
            style={{ marginLeft: '1rem', cursor: 'pointer' }}
            onClick={() => navigate('/', { replace: 'true' })}>
            <LogoWithName />
          </div>
        </Toolbar>
      </AppBar>
      <Grid
        container
        sx={{ height: '100vh' }}
        direction='row'
        justifyContent='center'
        alignItems='center'>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant='h3' gutterBottom>
            Oops! 403 Forbidden
          </Typography>
          <Typography variant='body1'>
            The page you accessed is forbidden. Please login first and then come back here.
          </Typography>
          <Button
            sx={{ m: '1rem', backgroundColor: 'black', padding: '10px', color: 'white' }}
            onClick={() => navigate('/', { replace: 'true' })}>
            Go Home
          </Button>
          <Button
            sx={{ m: '1rem', backgroundColor: 'black', padding: '10px', color: 'white' }}
            onClick={() => navigate('/login', { replace: 'true' })}>
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ForbiddenPage;
