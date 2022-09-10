// @mui
import { Container, Grid } from '@mui/material';
// hooks

import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';

import { CarouselAnimation } from '../../sections/overview/extra/carousel';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Achievements"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Achievements' }]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CarouselAnimation />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
