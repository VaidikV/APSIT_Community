// @mui
import { Container, Fab, Grid, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { AppWelcome } from '../../sections/@dashboard/general/app';
import BlogPosts from './blog/posts';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const { themeStretch } = useSettings();

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppWelcome displayName={user?.displayName} />
          </Grid>
          <Grid item xs={12}>
            <BlogPosts />
          </Grid>
        </Grid>
      </Container>
      <Fab
        sx={{ position: 'fixed', justifyContent: 'space-around', bottom: 24, right: 24, zIndex: 10 }}
        variant="extended"
        color="primary"
        aria-label="Chatbot"
      >
        <SvgIconStyle src={`/icons/ic_bot.svg`} />
        <Typography>May I help you?</Typography>
      </Fab>
    </Page>
  );
}
