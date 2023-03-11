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
import { DataGrid } from '@mui/x-data-grid';
import InternshipDataGrid from '../../components/InternshipDataGrid';

// ----------------------------------------------------------------------

Internship.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Internship() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Internships"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Internships' }]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InternshipDataGrid />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
