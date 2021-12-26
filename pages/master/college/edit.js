import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";

import FormContainer from "../../../components/utils/FormContainer";
import FormLayout from "../../../components/utils/FormLayout";
import Stack from "@mui/material/Stack";

import { useRouter } from 'next/router'

import axios from 'axios';

export default function () {
	const router = useRouter()

  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [ptCode, setPtCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [decisionLetter, setDecisionLetter] = useState("");
  const [since, setSince] = useState("");
  const [site, setSite] = useState("");
  const [ptStartDate, setPtStartDate] = useState("");

	useEffect(() => {
		getCollegeData()
	},[])

	async function getCollegeData() {
		try {
			const { data } = await axios.get('/api/college?id=1')
			const collegeData = data.data
			setID(collegeData.id)
			setName(collegeData.name)
			setEmail(collegeData.email)
			setCode(collegeData.code)
			setPtCode(collegeData.pt_code)
			setAddress1(collegeData.address_1)
			setAddress2(collegeData.address_2)
			setCity(collegeData.city)
			setPostCode(collegeData.post_code)
			setPhone(collegeData.phone)
			setFax(collegeData.fax)
			setDecisionLetter(collegeData.decision_letter)
			setSince(collegeData.since)
			setSite(collegeData.site)
			setPtStartDate(collegeData.pt_start_date)
		} catch (error) {
			if(error.response) {
				if(error.response.status = 404)
					return
				alert(error.response.data)
			}
			else	
				alert(error)
		}	
	}

	async function submitForm() {
		try {
			const prepareData = {
				id,
				name,
				email,
				code,
				pt_code : ptCode,
				address_1 : address1,
				address_2 : address2,
				city,
				post_code : postCode,
				phone,
				fax,
				decision_letter : decisionLetter,
				since : new Date(since),
				site,
				pt_start_date : new Date(ptStartDate),
			}	
			const { data } = await axios.patch('/api/college', prepareData)
			alert("Update data success.")
			router.back()
		} catch (error) {
			if(error.response) {
				if(error.response.data.data)
					alert(error.response.data.data.message)
				else
					alert(error.response.data)
			}
			alert(error)
		}
	}

  return (
    <FormLayout title="College Identity | SIA UIII" titlePage="College Identity">
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
          label="College Code"
          name="pt_code"
          value={ptCode}
          setValue={setPtCode}
        />
        <FormContainer
          label="Code"
          name="code"
          value={code}
          setValue={setCode}
        />
        <FormContainer
          label="Address 1"
          name="address_1"
          value={address1}
          setValue={setAddress1}
        />
        <FormContainer
          label="Address 2"
          name="address_2"
          value={address2}
          setValue={setAddress2}
        />
        <FormContainer
          label="City"
          name="city"
          value={city}
          setValue={setCity}
        />
        <FormContainer
          label="Post Code"
          name="postCode"
          value={postCode}
          setValue={setPostCode}
        />
        <FormContainer
          label="Phone"
          name="phone"
          value={phone}
          setValue={setPhone}
        />
        <FormContainer label="Fax" name="fax" value={fax} setValue={setFax} />
        <FormContainer
          label="Decision Letter"
          name="decision_letter"
          value={decisionLetter}
          setValue={setDecisionLetter}
        />
        <FormContainer
          label="Since"
          name="since"
          value={since}
          setValue={setSince}
        />
        <FormContainer
          label="Email"
          name="email"
          value={email}
          setValue={setEmail}
        />
        <FormContainer
          label="Site"
          name="site"
          value={site}
          setValue={setSite}
        />
        <FormContainer
          label="College Start Date"
          name="pt_start_date"
          value={ptStartDate}
          setValue={setPtStartDate}
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
						onClick={submitForm}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormLayout>
  );
}
