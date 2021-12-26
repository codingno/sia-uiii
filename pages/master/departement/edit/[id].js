import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

import FormContainer from "../../../components/utils/FormContainer";
import FormLayout from "../../../components/utils/FormLayout";
import FormParent from "../../../components/utils/FormParent";

import axios from "axios";
import { useRouter } from "next/router";

export default function () {
	const router = useRouter()

  const { id } = router.query;

	const statusOptions = [
		{
			label : 'ACTIVE',
			value : 1,
		},
		{
			label : 'NON ACTIVE',
			value : 2,
		},
	]
	const [studyTypeOptions, setStudyTypeOptions] = useState([])
	const [facultyOptions, setFacultyOptions] = useState([])

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [label, setLabel] = useState("");
  const [studyType, setStudyType] = useState("");
  const [faculty, setFaculty] = useState("");
  const [status, setStatus] = useState(statusOptions[0].value);
  const [courseCredits, setCourseCredits] = useState("");

  useEffect(() => {
    getDepartementData();
  }, [id]);

  async function getDepartementData() {
    if (id) {
      try {
        const { data } = await axios.get(`/api/departement?id=${id}`);
        setName(data.data.name);
        setCode(data.data.code);
				setLabel(data.data.label)
				setStudyType(data.data.study_type_id)
				setFaculty(data.data.faculty_id)
				setStatus(data.data.status)
				setCourseCredits(data.data.course_credits)
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) return;
          alert(error.response.data);
        }
        alert(error);
      }
    }
  }

	useEffect(() => {
		if(facultyOptions.length == 0)
			getFaculties()
	},[facultyOptions])

	async function getFaculties() {
		try {
			const { data } = await axios.get('/api/faculty')
			setFacultyOptions(data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	useEffect(() => {
		if(studyTypeOptions.length == 0)
			getStudyType()
	},[studyTypeOptions])

	async function getStudyType() {
		try {
			const { data } = await axios.get('/api/study-type')
			setStudyTypeOptions(data.data)
		} catch (error) {
			if (error.response) {
				if (error.response.status == 404) return;
				alert(error.response.data);
			}
			alert(error);
		}	
	}

	async function submitDepartement() {
		try {
			const sendData = {
				id,
				name,
				code,
				label,
				study_type_id : studyType,
				faculty_id : faculty,
				status,
				course_credits : courseCredits,
			}	
			const { data } = await axios.patch('/api/departement', sendData)
			alert("Departement successfully created.")
			router.back()
		} catch (error) {
			if(error.response) {
        console.log(`🚀 ~ file: create.js ~ line 67 ~ submitDepartement ~ error.response`, error.response)
				alert(error.response.data)
			}	
			alert(error)
		}	
	}

  return (
    <FormLayout title="Departement Create | SIA UIII" titlePage="Departement Create">
      <Stack
        mb={4}
        sx={{
          width: 640,
        }}
      >
        <FormContainer
          label="Name"
          name="name"
          value={name}
          setValue={setName}
        />
        <FormContainer
          label="Code"
          name="code"
          value={code}
          setValue={setCode}
        />
        <FormContainer
          label="Label"
          name="label"
          value={label}
          setValue={setLabel}
        />
				<FormParent label="Study Type">
					<Select
						displayEmpty
						value={studyType}
						onChange={(e) => setStudyType(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{studyTypeOptions.length > 0 && studyTypeOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Faculty">
					<Select
						displayEmpty
						value={faculty}
						onChange={(e) => setFaculty(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						<MenuItem value={""}>
							<em>None</em>
						</MenuItem>
						{facultyOptions.length > 0 && facultyOptions.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
					</Select>
				</FormParent>
				<FormParent label="Status">
					<Select
						displayEmpty
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						inputProps={{ "aria-label": "Without label" }}
					>
						{statusOptions.length > 0 && statusOptions.map(item => <MenuItem value={item.value}>{item.label}</MenuItem>)}
					</Select>
				</FormParent>
        <FormContainer
          label="Course Credits"
          name="courseCredits"
          value={courseCredits}
          setValue={setCourseCredits}
        />
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
						onClick={submitDepartement}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormLayout>
  );
}
