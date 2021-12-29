import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

export default function FormContainer(props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      ml={5}
      mt={1}
      sx={{ width: "80%", display: "flex", justifyContent: "flex-start" }}
    >
      <span style={{ width: "35%" }}>{props.label}</span>
      <FormControl sx={{ width: "65%" }} variant="outlined">
        <OutlinedInput
					name={props.name}
					type={props.type}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
					sx={{
						// "& .MuiFilledInput-root": {
							background: "#E0E0E0"
						// }
					}}
        />
				{ props.helper && <FormHelperText>{props.helper}</FormHelperText> }
      </FormControl>
    </Stack>
  );
}