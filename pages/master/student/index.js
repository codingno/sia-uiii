import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Students">
      <List
        title="Students"
        name="Student"
				getUrl="/api/student"
        addLink="/master/student/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "entry_year", label: "Entry Year", alignRight: false },
          { id: "status", label: "Status", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master/student/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/student",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
