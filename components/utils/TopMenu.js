import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'
import MenuPopover from "./MenuPopover";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import UserSide from "./UserSide";

const topMenuList = [
	{
    name: "Administrations",
    child: [
      {
        name: "Profile",
        link: "academic/profile",
				disable : true,
      },
      {
        name: "Card",
        link: "academic/card",
				disable : true,
      },
		],
	},
  {
    name: "Academics",
    child: [
      {
        name: "Curriculums",
        link: "academic/curriculum",
      },
      {
        name: "Courses",
        link: "academic/course",
      },
      {
        name: "Courses Selection",
        link: "academic/course-selection",
				disable : true,
      },
    ],
  },
  {
    name: "Master",
    child: [
      {
        name: "College Identity",
        link: "master/college",
      },
      {
        name: "Faculty",
        link: "master/faculty",
      },
      {
        name: "Departement",
        link: "master/departement",
      },
      {
        name: "Teacher",
        link: "master/teacher",
      },
      {
        name: "Student",
        link: "master/student",
      },
    ],
  },
  {
    name: "Portfolio Academics",
		link: "portfolio",
	},
  {
    name: "Admin",
    child: [
      {
        name: "Identity type",
        link: "master-admin/identity-type",
      },
      {
        name: "Study type",
        link: "master-admin/study-type",
      },
      {
        name: "Class type",
        link: "master-admin/class-type",
      },
      {
        name: "Course type",
        link: "master-admin/course-type",
      },
      {
        name: "Course Group",
        link: "master-admin/course-group",
      },
      {
        name: "Teacher Status",
        link: "master-admin/teacher-status",
      },
      {
        name: "Student Status",
        link: "master-admin/student-status",
      },
    ],
  },
];

function ChildMenu({ child }) {
	const router = useRouter()
  const renderChild = child.map((item, index) => {
    return (
      <>
        <Typography
          variant="subtitle1"
          noWrap
          sx={{
            my: 1,
            cursor: "pointer",
						opacity: !item.disable ? 1 : 0.3,
          }}
          onClick={() => {
						if(!item.disable)
            	router.push("/" + item.link);
          }}
        >
          {item.name}
        </Typography>
        {index != child.length - 1 && <Divider />}
      </>
    );
  });
  return <Box sx={{ my: 1.5, px: 2.5 }}>{renderChild}</Box>;
}

function ItemMenu({ menu }) {
	const router = useRouter()
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
					if(menu.child)
						setOpen(true)
					else
           	router.push("/" + menu.link);
				}}
        ref={anchorRef}
      >
        {menu.name}
      </Button>
      {menu.child && (
        <MenuPopover
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorRef.current}
          sx={{ width: 220 }}
        >
          <ChildMenu child={menu.child} />
        </MenuPopover>
      )}
    </>
  );
}

function ParentMenu({ menu }) {
  const renderMenu = menu.map((item, index) => (
    <ItemMenu key={index} menu={item} />
  ));
  return <>{renderMenu}</>;
}

export default function (props) {
	const router = useRouter()
	const { data: session, status } = useSession()
  return (
		<>
    <Grid
      xs={12}
      p={1}
      spacing={0}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      alignContent="center"
      // wrap="wrap"
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Image
          src="/static/blue-uiii.png"
          alt="Picture of the author"
          width={300}
          height={150}
					onClick={() => router.push('/')}
        />
        {session && (
          <>
            <Grid
              container
              spacing={0}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              alignContent="stretch"
              wrap="wrap"
              sx={{
                py: 3,
              }}
            >
              <ButtonGroup
                variant="text"
                // color="primary"
                aria-label=""
                sx={{
                  mx: "auto",
                }}
              >
                <ParentMenu menu={topMenuList} />
              </ButtonGroup>
            </Grid>
            <Button
              variant="contained"
              onClick={() => signOut({callbackUrl : '/auth/signin'})}
              sx={{
                width: 200,
              }}
            >
              Sign out
            </Button>
          </>
        )}
        {!session && (
          <Button
            variant="contained"
            onClick={() => router.push("/auth/signin")}
            sx={{
              width: 200,
            }}
          >
            Sign in
          </Button>
        )}
      </Stack>
    </Grid>
		<UserSide />
		</>
  );
}
