import Head from 'next/head';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
// import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { UserCard } from '../components/dashboard/user-card';
import { TrafficByDevice } from '../components/dashboard/grade-card';
import { DashboardLayout } from '../components/dashboard-layout';

const Dashboard = () => {
	
	const { data: session, status } = useSession()
	 const router = useRouter()

	if(status === 'loading')
		return ''
	
	// if(status === 'unauthenticated')
	// 	router.push('/auth/signin')

	return (

  <>
    <Head>
      <title>
        Dashboard | SIA UIII
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
            <UserCard sx={{ height: '100%' }} />
          </Grid>
          {/* <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
						<TrafficByDevice />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  </>
)
		};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
