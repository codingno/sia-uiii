import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";
import { useSession } from "next-auth/react"

export default function () {
  const router = useRouter();
	const { data: session, status : statusSession } = useSession()
	let tableHead = [
          { id: "description", label: "Description", alignRight: false },
          { id: "url", label: "File", alignRight: false, link : true },
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
    <BasicLayout title="Thesis/Disertation">
      <List
        title="Thesis/Disertation"
        name="Thesis/Disertation"
        getUrl="/api/portfolio?portfolio_id=4"
        addLink="/portfolio/thesis_disertation/create"
        tableHead={tableHead}
        moremenu={[
          {
            name: "Edit",
            link: "/portfolio/thesis_disertation/edit/",
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
