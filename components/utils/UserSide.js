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

export default function () {
	const router = useRouter()
  const { data: session, status } = useSession();

  return (
    <>
      {!session || router.pathname == '/master/college' ? (
        ""
      ) : (
        <Grid item xs={3} p={1}>
          <Card
            sx={{
              height: 400,
							bgcolor : 'primary.main',
            }}
          >
            <CardHeader
              avatar={
                <Avatar aria-label="">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name}
                      width={40}
                      height={20}
                    />
                  )}
                </Avatar>
              }
              action={<IconButton aria-label=""></IconButton>}
              title={
								<Typography variant="h6" color="background.default">
								{session.user.name}
								</Typography>
							}
							// title={session.user.name}
              subheader={
								<Typography variant="body1" color="primary.dark">
									{session.user.email}
								</Typography>
							}
							sx={{
								pb : 17.3,
							}}
            />
						<Divider />
          </Card>
        </Grid>
      )}
    </>
  );
}
