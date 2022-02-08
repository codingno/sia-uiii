import React, { useRef } from "react";
import { useRouter } from "next/router";
import { PDFExport } from "@progress/kendo-react-pdf";
import BasicLayout from "../../../../components/utils/BasicLayout";
import TranscriptCard from './TranscriptCard'
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

export default function pdf() {
	const router = useRouter()
	const { id } = router.query
  let ref = useRef(null);
  const exportPDF = () => {
    // console.log(ref)
    ref.save();
  };

	if(!id)
		return ""

  return (
    <>
      <BasicLayout>
        <Grid item xs={10} p={1}>
          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              p={5}
            >
              {/* <button onClick={exportPDF}>download</button> */}
							<Button
								variant="contained"
								onClick={exportPDF}
							>
								Download PDF
							</Button>
						</Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              p={5}
            >
              <PDFExport
                paperSize={"Letter"}
                fileName="_____.pdf"
                title=""
                subject=""
                keywords=""
                ref={(r) => (ref = r)}
              >
                <div
                  style={{
                    height: 792,
                    width: 612,
                    padding: "none",
                    backgroundColor: "white",
                    boxShadow: "5px 5px 5px black",
                    margin: "30px auto",
                    overflowX: "hidden",
                    overflowY: "hidden",
                  }}
                >
                  <TranscriptCard id={id} />
                </div>
              </PDFExport>
            </Stack>
          </Card>
        </Grid>
      </BasicLayout>
    </>
  );
}
