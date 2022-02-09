import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();
	const { data : session, status : statusSession } = useSession()

	if(statusSession !== 'authenticated')
		return ""

  return (
    <BasicLayout title="Transcript">
      <List
        title="Transcript"
        name="Transcript"
        getUrl={`/api/transcript?student_number=${session.user.student_number}`}
        // addLink="/master-admin/grade/create"
        tableHead={[
          { id: "semester", label: "Semester", alignRight: false },
          { id: "ipk", label: "IPK", alignRight: false, type : 'float' },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "PDF",
            link: "/academic/transcript/pdf/",
          },
        ]}
        // deleteOptions={{
        //   link: "/api/grade",
        //   note: "Are you sure to delete this item?",
        // }}
				// readOnly={true}
				disableAdd={true}
      />
    </BasicLayout>
  );
}
