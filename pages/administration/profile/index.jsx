import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, signOut } from "next-auth/react";
import axios from 'axios';
import editFill from '@iconify/icons-eva/edit-fill';
import { Icon } from '@iconify/react';

import BasicLayout from '../../../components/utils/BasicLayout'
import StackContainer from '../../../components/utils/StackContainer'

// mui
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function profile() {
	const router = useRouter()
  const { data: session, status } = useSession();
	const [userData, setuserData] = useState({})

	const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(`🚀 ~ file: index.jsx ~ line 22 ~ profile ~ userData`, userData)

	useEffect(() => {
		if(status == `authenticated`)
			getStudentData()
	},[status])

	async function getStudentData() {
		try {
      const { data } = await axios.get(`/api/student?user_id=${session.user.userID}`);
      setuserData(data.data)

		} catch (error) {
			
		}	
	}

	useEffect(() => {
		if(!session && status == `unauthenticated`)
			router.push('/auth/signin')
	},[session, status])	

	if(status === 'loading' || status === 'unauthenticated')
		return <div style={{ width : '100vw', heght : '100vh', backgroundColor : '#C7C9C7' }}></div>

	return (
    <BasicLayout title="Profile | UIII">
      <Grid xs={12} p={1}>
          <Card
					sx={{
						// width : '100%',
						mx : 'auto',
					}}
					>
					<Grid
						container
						spacing={1}
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						alignContent="stretch"
						wrap="wrap"
						px={5}	
					>
					{
						userData.user_info &&
            <CardHeader
              avatar={
                <Avatar aria-label=""
									sx={{
										width : 80,
										height : 80,
									}}
								>
                  {userData.user.image && (
                    <Image
                      src={userData.user.image}
                      alt={userData.user.name}
                      width={80}
                      height={80}
                    />
                  )}
                </Avatar>
              }
              action={<IconButton aria-label=""></IconButton>}
              title={
								<Typography variant="h5" color="primary">
								{session.user.name}
								</Typography>
							}
							// title={session.user.name}
              subheader={
								<Typography variant="body1" color="primary.dark">
									{userData.student_number}
								</Typography>
							}
            />
					}
					{
						value !== '1' &&
					<Button
						variant="contained"
						color="primary"
						startIcon={
							<Icon icon={editFill} width={24} height={24} />
						}
						// sx={{
						// 	mr : 3
						// }}
						onClick={() => {
							router.push('/administration/profile/edit/'+ ( value == 2 ? 'personal/' : 'contact/' ) + userData.id)
						}}
					>
						Edit	
					</Button>
					}
					</Grid>
					<Divider />
					<Box sx={{ width: '100%', typography: 'body1' }}>
						<TabContext value={value}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								<TabList onChange={handleChange} aria-label="lab API tabs example">
									<Tab label="Academic" value="1" />
									<Tab label="Personal" value="2" />
									<Tab label="Contact" value="3" />
								</TabList>
							</Box>
							<TabPanel value="1">
								{
									userData.user &&
									<>
										<StackContainer label="Entry Year" value={`${userData.entry_year}`} />
										<StackContainer label="Study Type" value={`${userData.departement.study_type.description} (${userData.departement.study_type.name})`} />
										<StackContainer label="Faculty" value={`${userData.departement.faculty.name} (${userData.departement.faculty.code})`} />
										<StackContainer label="Program Study" value={`${userData.departement.name} (${userData.departement.code})`} />
										<StackContainer label="Status" value={`${userData.student_status.name} (${userData.student_status.description})`} />
										<StackContainer label="Entry Status And Semester" value={`${userData.entry_status} in Semester ${userData.entry_semester}`} />
									</>
								}
							</TabPanel>
							<TabPanel value="2">
								{
									userData.user_info &&
									<>
										<StackContainer label="Identity ID" value={`${userData.user_info.identity_id} (${userData.user_info.identity_type.name})`} />
										<StackContainer label="Place Of Birth" value={`${userData.user_info.place_of_birth}`} />
										<StackContainer label="Date Of Birth" value={`${userData.user_info.date_of_birth}`} />
										<StackContainer label="Gender" value={`${userData.user_info.gender}`} />
									</>
								}
							</TabPanel>
							<TabPanel value="3">
								{
									userData.user_info &&
									<>
										<StackContainer label="Email" value={`${userData.user.email} `} />
									</>
								}
							</TabPanel>
						</TabContext>
					</Box>
				</Card>	
			</Grid>
		</BasicLayout>
	)
}
