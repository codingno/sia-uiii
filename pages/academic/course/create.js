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
import { useSession } from "next-auth/react"

export default function () {
  const router = useRouter();
	const { data: session, status } = useSession()

  const availableOptions = [
    {
      id: 1,
      name: "AVAILABLE",
    },
    {
      id: 2,
      name: "NOT AVAILABLE",
    },
  ];

  const [departementOptions, setDepartementOptions] = useState([]);
  const [curriculumOptions, setCurriculumOptions] = useState([]);
  const [courseTypeOptions, setCourseTypeOptions] = useState([]);
  const [courseGroupOptions, setCourseGroupOptions] = useState([]);

  const [departement_id, setDepartement] = useState("");
  const [curriculum_id, setCurriculum] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");
  const [theory_credits, setTheoryCredits] = useState("");
  const [practice_credits, setPracticeCredits] = useState("");
  const [practice_field_credits, setPracticeFieldCredits] = useState("");
  const [semester, setSemester] = useState("");
  const [course_type_id, setCourseType] = useState("");
  const [course_group_id, setCourseGroup] = useState("");
  const [syllabus, setSyllabus] = useState(availableOptions[1].id);
  const [event_unit, setEventUnit] = useState(availableOptions[1].id);
  const [materials, setMaterials] = useState(availableOptions[1].id);
  const [books, setBooks] = useState(availableOptions[1].id);

  useEffect(() => {
    if (courseGroupOptions.length == 0) getCourseGroup();
  }, [courseGroupOptions]);

  async function getCourseGroup() {
    try {
      const { data } = await axios.get("/api/course-group");
      setCourseGroupOptions(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  useEffect(() => {
    if (courseTypeOptions.length == 0) getCourseType();
  }, [courseTypeOptions]);

  async function getCourseType() {
    try {
      const { data } = await axios.get("/api/course-type");
      setCourseTypeOptions(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  useEffect(() => {
    if (departementOptions.length == 0) getDepartement();
  }, [departementOptions]);

  async function getDepartement() {
    try {
      const { data } = await axios.get("/api/departement");
      setDepartementOptions(data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 404) return;
        alert(error.response.data);
      }
      alert(error);
    }
  }

  useEffect(() => {
    if (curriculumOptions.length == 0) getCurriculum();
  }, [curriculumOptions, departement_id]);

  async function getCurriculum() {
    if (departement_id != "") {
      try {
        const { data } = await axios.get("/api/curriculum");
        const curriculumsData = data.data.filter(
          (item) => item.departement_id == departement_id
        );
        setCurriculumOptions(curriculumsData);
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) return;
          alert(error.response.data);
        }
        alert(error);
      }
    }
  }

  async function submitCourse() {
    try {
      const sendData = {
				departement_id,
				curriculum_id,
				name,
				code,
				credits,
				theory_credits,
				practice_credits,
				practice_field_credits,
				semester,
				course_type_id,
				course_group_id,
				syllabus,
				event_unit,
				materials,
				books,
      };
      const { data } = await axios.post("/api/course", sendData);
      alert("Curriculum successfully created.");
      router.back();
    } catch (error) {
      if (error.response) {
        console.log(`🚀 ~ file: create.js ~ line 148 ~ submitCourse ~ error.response`, error.response)
        alert(error.response.error);
      }
      alert(error);
    }
  }

	useEffect(() => {
		if(!session && status == `unauthenticated`)
			router.push('/auth/signin')
	},[session, status])	
	if(status === 'loading' || status === 'unauthenticated')
		return <div style={{ width : '100vw', heght : '100vh', backgroundColor : '#C7C9C7' }}></div>

  return (
    <FormLayout
      title="Course Create | AIS UIII"
      titlePage="Course Create"
    >
      <Stack
        mb={4}
        sx={{
          width: 640,
        }}
      >
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
            {departementOptions.length > 0 &&
              departementOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Curriculum">
          <Select
            displayEmpty
            value={curriculum_id}
            onChange={(e) => setCurriculum(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {curriculumOptions.length > 0 &&
              curriculumOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
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
          label="Credits"
          name="credits"
          value={credits}
          setValue={setCredits}
        />
        <FormContainer
          label="Theory Credits"
          name="theory_credits"
          value={theory_credits}
          setValue={setTheoryCredits}
        />
        <FormContainer
          label="Practice Credits"
          name="practice_credits"
          value={practice_credits}
          setValue={setPracticeCredits}
        />
        <FormContainer
          label="Practice Field Credits"
          name="practice_field_credits"
          value={practice_field_credits}
          setValue={setPracticeFieldCredits}
        />
        <FormContainer
          label="Semester"
          name="semester"
          value={semester}
          setValue={setSemester}
        />
        <FormParent label="Course Type">
          <Select
            displayEmpty
            value={course_type_id}
            onChange={(e) => setCourseType(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {courseTypeOptions.length > 0 &&
              courseTypeOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Course Group">
          <Select
            displayEmpty
            value={course_group_id}
            onChange={(e) => setCourseGroup(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {courseGroupOptions.length > 0 &&
              courseGroupOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Syllabus">
          <Select
            displayEmpty
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            {availableOptions.length > 0 &&
              availableOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Event Unit">
          <Select
            displayEmpty
            value={event_unit}
            onChange={(e) => setEventUnit(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            {availableOptions.length > 0 &&
              availableOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Materials">
          <Select
            displayEmpty
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            {availableOptions.length > 0 &&
              availableOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormParent>
        <FormParent label="Books">
          <Select
            displayEmpty
            value={books}
            onChange={(e) => setBooks(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
          >
            {availableOptions.length > 0 &&
              availableOptions.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
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
            onClick={submitCourse}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormLayout>
  );
}
