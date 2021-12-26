import Head from 'next/head';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { useState, useRef } from "react";
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

import TopMenu from "../../../components/utils/TopMenu";
import StackContainer from '../../../components/utils/StackContainer';
import Stack from "@mui/material/Stack";

import editFill from '@iconify/icons-eva/edit-fill';
import { Icon } from '@iconify/react';
import CardMedia from '@mui/material/CardMedia'

import { useRouter } from 'next/router'

import List from '../../../components/utils/List'

export default function () {
	const router = useRouter()

	const [name, setName] = useState("Universitas Islam Internasioal Indonesia")
	const [email, setEmail] = useState("info@uiii.ac.id")
	const [code, setCode] = useState("uiiicode")
	const [ptCode, setPtCode] = useState("uiiiptcode")
	const [address1, setAddress1] = useState("Depok")
	const [address2, setAddress2] = useState("Depok")
	const [city, setCity] = useState("Depok")
	const [postCode, setPostCode] = useState("12345")
	const [phone, setPhone] = useState("12345678")
	const [fax, setFax] = useState("12345678")
	const [decisionLetter, setDecisionLetter] = useState("12345678")
	const [since, setSince] = useState("2019")
	const [site, setSite] = useState("uiii.ac.id")
	const [ptStartDate, setPtStartDate] = useState("2020-02-02")
  return (
    <>
      <Head>
        <title>
					Departement | SIA UIII
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
				<TopMenu />
				<List 
					title="Departements"
					name="Departement"
					addLink="/master/departement/edit/"
					tableHead={[
						{ id: 'name', label: 'Name', alignRight: false },
						{ id: 'status', label: 'Status', alignRight: false },
						{ id: '' }
					]}
					moremenu={[
						{
							name : 'Edit',
							link : '/master/departement/edit/',
						}
					]}
					deleteOptions={{
						link : '/master/departement/',
						note: 'Are you sure to delete this item?'
					}}
				/>
      </Container>
    </>
  );
}
