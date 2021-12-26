
import { useState, useRef } from "react";
import Button from "@mui/material/Button";

import FormContainer from "../../../components/utils/FormContainer";
import FormLayout from "../../../components/utils/FormLayout";
import Stack from "@mui/material/Stack";

import axios from "axios";
import { useRouter } from "next/router";

export default function () {
	const router = useRouter()

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

	async function submitFaculty() {
		try {
			const sendData = {
				college_id : 1,
				name,
				code,
			}	
			const { data } = await axios.post('/api/faculty', sendData)
			alert("Faculty successfully created.")
			router.back()
		} catch (error) {
			if(error.response) {
				alert(error.response.data)
			}	
			alert(error)
		}	
	}

  return (
    <FormLayout title="Faculty Create | SIA UIII" titlePage="Faculty Create">
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
						onClick={submitFaculty}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormLayout>
  );
}