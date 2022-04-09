import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tooltip from "@mui/material/Tooltip";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from "@mui/material/TextField";

import FormContainer from "../../../components/utils/FormContainer";
import FormLayout from "../../../components/utils/FormLayout";
import FormParent from "../../../components/utils/FormParent";

import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"

export default function () {
	const router = useRouter()
	const { data: session, status : statusSession } = useSession()

	const entryStatusOptions = [
		{
			id : 1,
			name : 'NEW',
		},
		{
			id : 2,
			name : 'TRANSFER',
		},
	]
	const entrySemesterOptions = [
		{
			id : 1,
			name : 1,
		},
		{
			id : 2,
			name : 2,
		},
	]
	const genderOptions = [
		{
			id : 1,
			name : 'MAN',
		},
		{
			id : 2,
			name : 'WOMAN',
		},
	]
	const [identityTypeOptions, setIdentityTypeOptions] = useState([])
	const [departementOptions, setDepartementOptions] = useState([])
	const [teacherOptions, setTeacherOptions] = useState([])
	const [statusOptions, setStatusOptions] = useState([])
  const [religionOptions, setReligionOptions] = useState([]);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [place_of_birth, setPlaceOfBirth] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(genderOptions[0].id);
  const [identity_id, setIdentityID] = useState("");
  const [identity_type_id, setIdentityType] = useState("");
  const [religion, setReligion] = useState("");

  const [user_id, setUserID] = useState("");
  const [ein, setEIN] = useState("");
  const [nidn_code, setNIDNCode] = useState("");
  const [title, setTitle] = useState("");
  const [departement_id, setDepartement] = useState("");
  const [status, setStatus] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (religionOptions.length == 0) getReligion();
  }, [religionOptions]);

  async function getReligion() {
    try {
      const { data } = await axios.get("/api/religion");
      setReligionOptions(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

	useEffect(() => {
		if(departementOptions.length == 0)
			getDepartement()
	},[departementOptions])

	async function getDepartement() {
		try {
			const { data } = await axios.get('/api/departement')
			setDepartementOptions(data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	useEffect(() => {
		if(identityTypeOptions.length == 0)
			getIdentityType()
	},[identityTypeOptions])

	async function getIdentityType() {
		try {
			const { data } = await axios.get('/api/identity-type')
			setIdentityTypeOptions(data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	useEffect(() => {
		if(statusOptions.length == 0)
			getTeacherStatus()
	},[statusOptions])

	async function getTeacherStatus() {
		try {
			const { data } = await axios.get('/api/teacher-status')
			setStatusOptions(data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	async function submitTeacher() {
		try {
			const sendData = {
				first_name,
				last_name,
				middle_name,
				place_of_birth,
				date_of_birth,
				gender,
				identity_id,
				identity_type_id,
				user_id,
				ein,
				nidn_code,
				title,
				departement_id,
				status,
				role_id : 3,
				religion,
				username,
				password,
			}	
			const { data } = await axios.post('/api/teacher', sendData)
			alert("Teacher successfully created.")
			router.back()
		} catch (error) {
			if(error.response) {
				alert(error.response.data)
			}	
			alert(error)
		}	
	}

	useEffect(() => {
		if(!session && statusSession == `unauthenticated`)
			router.push('/auth/signin')
	},[session, statusSession])	
	if(statusSession === 'loading' || statusSession === 'unauthenticated')
		return <div style={{ width : '100vw', heght : '100vh', backgroundColor : '#C7C9C7' }}></div>

  return (
    <FormLayout title="Teacher Create | AIS UIII" titlePage="Teacher Create">
			<Grid
				container
				spacing={1}
				direction="row"
				justifyContent="flex-start"
				alignItems="flex-start"
				alignContent="stretch"
				wrap="wrap"
				
			>
				<Grid	item xs={6}	>
      <Stack
        mb={4}
        sx={{
          width: "100%",
        }}
      >
        <FormContainer
          label="Employer Identification Number"
          name="ein"
          value={ein}
          setValue={setEIN}
        />
        <FormContainer
          label="Teacher Number"
          name="nidn_code"
          value={nidn_code}
          setValue={setNIDNCode}
        />
        <FormContainer
          label="Title"
          name="title"
          value={title}
          setValue={setTitle}
        />
				<FormParent label="Program Study">
					<Select
						displayEmpty
						value={departement_id}
						onChange={(e) => setDepartement(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{departementOptions.length > 0 && departementOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Status">
					<Select
						displayEmpty
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{statusOptions.length > 0 && statusOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
        <FormContainer
          label="Username"
          name="username"
          value={username}
          setValue={setUsername}
        />
        <FormParent label="Password">
      <FormControl sx={{ width: "65%" }} variant="outlined">
					<OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={e => setShowPassword(!showPassword)}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
									<CopyToClipboard 
										text={password} >
										<IconButton
											aria-label="toggle password visibility"
											onClick={e => setCopied(!copied)}
											// onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											<Tooltip
												open={copied}
												title={"Copied to clipboard!"}
												leaveDelay={1500}
												onClose={() => setCopied(false)}
											>
											<ContentCopyIcon />
								</Tooltip>
										</IconButton>
									</CopyToClipboard>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={e => {
										setPassword(generatePassword())
										document.getElementById('renew-create-password').classList.add('spin-animation')	
										setTimeout(() => {
											document.getElementById('renew-create-password').classList.remove('spin-animation')	
										}, 1000)
									}}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
									<AutorenewIcon id="renew-create-password" />
                </IconButton>
              </InputAdornment>
            }
						inputProps={{
								autoComplete: 'new-password'
						}}
						autocomplete="new-password"
						sx={{
							background: "#E0E0E0"
						}}
          />
			</FormControl>
        </FormParent>
				</Stack>
				</Grid>
				<Grid	item xs={6}	>
      <Stack
        mb={4}
        sx={{
          width: "100%",
        }}
      >
        <FormContainer
          label="First Name"
          name="first_name"
          value={first_name}
          setValue={setFirstName}
        />
        <FormContainer
          label="Middle Name"
          name="middle_name"
          value={middle_name}
          setValue={setMiddleName}
        />
        <FormContainer
          label="Last Name"
          name="last_name"
          value={last_name}
          setValue={setLastName}
        />
        <FormContainer
          label="Place Of Birth"
          name="place_of_birth"
          value={place_of_birth}
          setValue={setPlaceOfBirth}
        />
				<FormParent label="Date Of Birth">
					<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								inputFormat="MM/dd/yyyy"
								// label="Date Of Birth"
								name="date_of_birth"
								value={date_of_birth}
								onChange={setDateOfBirth}
								renderInput={(params) => <TextField {...params} 
								sx={{
									width : '65%',
								}}
								/>}
							/>
					</LocalizationProvider>
				</FormParent>
				<FormParent label="Gender">
					<Select
						displayEmpty
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						{genderOptions.length > 0 && genderOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
        <FormParent label="Religion">
          <Select
            displayEmpty
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {religionOptions.length > 0 &&
              religionOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormContainer
          label="Identity ID"
          name="identity_id"
          value={identity_id}
          setValue={setIdentityID}
        />
				<FormParent label="Identity Type">
					<Select
						displayEmpty
						value={identity_type_id}
						onChange={(e) => setIdentityType(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{identityTypeOptions.length > 0 && identityTypeOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
        <Stack
          direction="row"
          alignItems="center"
          ml={5}
          mt={3}
          sx={{ width: "60%", display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: 150,
            }}
            startIcon={() => <></>}
						onClick={submitTeacher}
          >
            Submit
          </Button>
        </Stack>
				</Stack>
				</Grid>
				</Grid>
    </FormLayout>
  );
}
