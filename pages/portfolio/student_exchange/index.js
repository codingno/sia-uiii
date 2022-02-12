import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";
import { useSession } from "next-auth/react"

export default function () {
  const router = useRouter();
	const { data: session, status : statusSession } = useSession()
	let tableHead = [
          { id: "name", label: "Name", alignRight: false },
          { id: "student_number", label: "Student Number", alignRight: false },
          { id: "faculty_id", label: "Faculty", alignRight: false },
          { id: "exchange_with_university", label: "Exchange With University", alignRight: false },
          { id: "date", label: "Date", alignRight: false },
          // { id: "url", label: "File", alignRight: false, link : true },
          { id: "" },
        ]
	if(session)
		if(session.user.role_id === 1)
				tableHead.unshift(
          { id: "user_name", label: "User", alignRight: false }
				)

	if(statusSession !== 'authenticated')
					return ""
  return (
    <BasicLayout title="Student Exchange">
      <List
        title="Student Exchange"
        name="Student Exchange"
        getUrl="/api/portfolio?portfolio_id=4"
        addLink="/portfolio/student_exchange/create"
        tableHead={tableHead}
        moremenu={[
          {
            name: "Edit",
            link: "/portfolio/student_exchange/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/portfolio",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
