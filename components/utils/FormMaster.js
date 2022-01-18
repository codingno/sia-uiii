
import { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";

import FormContainer from "./FormContainer";
import FormLayout from "./FormLayout";
import Stack from "@mui/material/Stack";

import axios from 'axios';

import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"

export default function (props) {
	const { title, titlePage, submitUrl, method, additionalForm } = props

	const router = useRouter()
  const { id } = router.query

	const { data: session, status } = useSession()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
	const [additional, setAdditional] = useState({});

	useEffect(() => {
		getData()
	},[id])

	async function getData() {
		if(method == 'edit' && id ) {
			try {
				const { data } = await axios.get(submitUrl + `?id=${id}`)
				setName(data.data.name)
				setDescription(data.data.description)
				let { data: result } = data
				delete result.name
				delete result.description
				setAdditional(result)
			} catch (error) {
				if(error.response) {
					alert(error.response.data)
				}	
				alert(error)
			}	
		}
	}

	async function submitForm() {
		try {
			if(method == 'edit') {
				const data = await axios.patch(submitUrl, {
					id,
					name, 
					description,
					...additional,
				})	
			} else {
				const data = await axios.post(submitUrl, {
					name, 
					description,
				})	
			}
		} catch (error) {
			alert(error)	
		}	
		alert(`Data ${name} already ${method == 'edit' ? 'updated' : 'created'}`)
		router.back()
	}

	useEffect(() => {
		if(!session && status == `unauthenticated`)
			router.push('/auth/signin')
	},[session, status])	
	if(status === 'loading' || status === 'unauthenticated')
		return ""

  return (
    <FormLayout title={title} titlePage={titlePage}>
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
          label="Description"
          name="description"
          value={description}
          setValue={setDescription}
        />
				{
					additionalForm &&
					additionalForm.map(item => {
						return (
							<FormContainer
								label={item.label}
								name={item.name}
								value={additional[item.value]}
								setValue={(value) => {
									let newAdditional = additional
									newAdditional[item.value] = value
									setAdditional(newAdditional)
								}}
							/>
						)
					})
				}
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
						onClick={submitForm}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormLayout>
  );
}
