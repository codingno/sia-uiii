import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router'
import Image from "next/image";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from '@mui/material/Typography'

import ImageWithLoader from "../../utils/ImageWithLoader";

export default function () {
	const router = useRouter()
  const { data: session, status } = useSession();

  return (
    <>
      {!session || router.pathname == '/master/college' ? (
        ""
      ) : (
        <Grid item xs={2} p={1}>
          <Card
            sx={{
              height: 400,
							bgcolor : 'primary.main',
							py : 5,
            }}
          >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
						<Avatar aria-label=""
							sx={{
									width:100,
									height:100,
									mb : 5,
							}}
						>
							{session.user.image && (
								<ImageWithLoader
									src={session.user.image}
									alt={session.user.name}
									width={150}
									// height={75}
									height={150}
								/>
							)}
						</Avatar>
						<Typography variant="h6" color="background.default">
						{session.user.name}
						</Typography>
						<Typography variant="body1" color="primary.dark">
							{session.user.email}
						</Typography>
						{
							session.user.student_number &&
							<>
							<Typography variant="body1" color="background.default" mt={3}>
								{session.user.student_number}
							</Typography>
							<Typography variant="body1" color="background.default">
								{session.user.studentData.entry_year}
							</Typography>
							<Typography variant="body1" color="background.default">
								Semester {session.user.semester_active}
							</Typography>
							</>
						}
					</Stack>
          </Card>
        </Grid>
      )}
    </>
  );
}
