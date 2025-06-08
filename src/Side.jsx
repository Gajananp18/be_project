import * as React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';



const theme = createTheme({
  palette: {
    mode: 'light',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter() {
  const [pathname, setPathname] = React.useState(initialPath);

  return React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    // navigate: (path: string | URL) => setPathname(String(path)),
  }), [pathname]);
}

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  width: '100%',
}));

export default function Side() {
  const router = useDemoRouter('/dashboard');

  return (
    <ThemeProvider theme={theme}>
      <AppProvider navigation={NAVIGATION} router={router}>
        <DashboardLayout>
          <PageContainer>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Skeleton height={14} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton height={14} />
              </Grid>
              <Grid item xs={4}>
                <Skeleton height={100} />
              </Grid>
              <Grid item xs={8}>
                <Skeleton height={100} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton height={150} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton height={14} />
              </Grid>
              <Grid item xs={3}>
                <Skeleton height={100} />
              </Grid>
              <Grid item xs={3}>
                <Skeleton height={100} />
              </Grid>
              <Grid item xs={3}>
                <Skeleton height={100} />
              </Grid>
              <Grid item xs={3}>
                <Skeleton height={100} />
              </Grid>
            </Grid>
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}
