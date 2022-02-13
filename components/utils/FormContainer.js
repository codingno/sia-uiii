import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function FormContainer(props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      ml={5}
      mt={1}
      sx={{ width: props.width || "80%", display: "flex", justifyContent: props.justifyContent || "flex-start" }}
    >
      <span style={{ width: "35%" }}>{props.label}</span>
      <FormControl sx={{ width: "65%" }} variant="outlined">
				{
					props.name === 'description' ?
					<TextareaAutosize
						aria-label="minimum height"
						minRows={5}
						// placeholder="Minimum 3 rows"
						value={props.value}
          	onChange={(e) => props.setValue(e.target.value)}
						style={{ width: '100%', padding : '0.5rem', borderRadius : '10px',  }}
					/>:
        <OutlinedInput
					name={props.name}
					type={props.type}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
					sx={{
						background: "#E0E0E0"
					}}
        />
}
				{ props.helper && <FormHelperText>{props.helper}</FormHelperText> }
      </FormControl>
    </Stack>
  );
}