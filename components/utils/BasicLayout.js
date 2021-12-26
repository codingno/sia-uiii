import Head from 'next/head';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import TopMenu from './TopMenu';

export default function ({ title, children }) {
	return (
		<>
      <Head>
        <title>
					{title || 'Home' } | SIA UIII
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <Container maxWidth="lg"
				sx={{
					bgcolor : '#C7C9C7'
				}}
			>
				<Grid
					container
					spacing={1}
					direction="row"
					justifyContent="center"
					alignItems="flex-start"
					alignContent="center"
					wrap="wrap"
					
				>
				<TopMenu />
					{children}
				</Grid>
      </Container>
		</>
	)
}