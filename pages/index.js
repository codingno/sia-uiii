import Head from 'next/head';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { useState, useRef, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'

import TopMenu from "../components/utils/TopMenu";
import StackContainer from '../components/utils/StackContainer';
import Stack from "@mui/material/Stack";

import editFill from '@iconify/icons-eva/edit-fill';
import { Icon } from '@iconify/react';
import CardMedia from '@mui/material/CardMedia'

import { useRouter } from 'next/router'
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'

import List from '../components/utils/List'


export default function () {
	const router = useRouter()
	const { data: session, status } = useSession()

	useEffect(() => {
		if(!session && status == `unauthenticated`)
			router.push('/auth/signin')
	},[session, status])	

	if(!session)
		return <div style={{ width : '100vw', heght : '100vh', backgroundColor : '#C7C9C7' }}></div>

  return (
    <>
      <Head>
        <title>
					Home | AIS UIII
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <Container maxWidth="xl"
				sx={{
					bgcolor : '#C7C9C7',
				}}
			>
				<Grid
					container
					spacing={1}
					direction="row"
					justifyContent="center"
					alignItems="center"
					alignContent="center"
					wrap="wrap"
					// sx={{
					// 	pt: 3,
					// }}
				>
					<TopMenu />
					<Grid xs={10} item>
						<Card
							sx={{ bgcolor : '#003B5C', height : 400, m : 1}}
							>
								<Stack
									direction="row"
									justifyContent="space-around"
									alignItems="center"
									alignContent="center"
									mt={3}
								>
									<Card className="reflection-faculty" sx={{ borderRadius : '10px', width : '20%', pb : '13.4%', position : 'relative', backgroundImage : "url('/static/FIS.jpg')", backgroundRepeat : 'no-repeat', backgroundSize : 'contain', overflow : 'visible', backgroundColor : 'transparent' }}>
										{/* <Image layout="fill" src="/static/FIS.jpg" alt="FIS" /> */}
									</Card>
									<Card className="reflection-faculty" sx={{ borderRadius : '10px', width : '20%', pb : '13.4%', position : 'relative', backgroundImage : "url('/static/FSS.jpg')", backgroundRepeat : 'no-repeat', backgroundSize : 'contain', overflow : 'visible', backgroundColor : 'transparent' }}>
										{/* <Image layout="fill" src="/static/FSS.jpg" alt="FSS" /> */}
									</Card>
									<Card className="reflection-faculty" sx={{ borderRadius : '10px', width : '20%', pb : '13.4%', position : 'relative', backgroundImage : "url('/static/FEB.jpg')", backgroundRepeat : 'no-repeat', backgroundSize : 'contain', overflow : 'visible', backgroundColor : 'transparent' }}>
										{/* <Image layout="fill" src="/static/FEB.jpg" alt="FEB" /> */}
									</Card>
									<Card className="reflection-faculty" sx={{ borderRadius : '10px', width : '20%', pb : '13.4%', position : 'relative', backgroundImage : "url('/static/FEDu.jpg')", backgroundRepeat : 'no-repeat', backgroundSize : 'contain', overflow : 'visible', backgroundColor : 'transparent' }}>
										{/* <Image layout="fill" src="/static/FEDu.jpg" alt="FEDu" /> */}
									</Card>
								</Stack>
						</Card>
					</Grid>
					{
						!session &&
					<Grid xs={3} item>
						<Card
							sx={{ bgcolor : '#84754E', height : 400, m : 1}}
							>
						</Card>
					</Grid>
					}
					<Grid xs={5} item>
						<Card
							sx={{ bgcolor : '#E3A130', height : 400, m : 1}}
							>
						</Card>
					</Grid>
					<Grid xs={7} item>
						<Card
							sx={{ bgcolor : '#00778B', height : 400, m : 1}}
							>
						</Card>
					</Grid>
				</Grid>
      </Container>
    </>
  );
}
