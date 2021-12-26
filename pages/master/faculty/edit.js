
import { useState, useRef } from "react";
import Button from "@mui/material/Button";

import FormContainer from "../../../components/utils/FormContainer";
import FormLayout from "../../../components/utils/FormLayout";
import Stack from "@mui/material/Stack";

export default function () {

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
  return (
    <FormLayout title="Faculty Edit | SIA UIII" titlePage="Faculty Edit">
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
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormLayout>
  );
}
