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

export default function () {
	const router = useRouter()
  const { data: session, status } = useSession();

  return (
    <>
      {!session || router.pathname == '/master/college' ? (
        ""
      ) : (
        <Grid xs={3} p={1}>
          <Card
            sx={{
              height: 400,
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
              title={session.user.name}
              subheader={session.user.email}
            />
						<Divider />
          </Card>
        </Grid>
      )}
    </>
  );
}
