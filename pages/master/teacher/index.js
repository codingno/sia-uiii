import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Teachers">
      <List
        title="Teachers"
        name="Teacher"
				getUrl="/api/teacher"
        addLink="/master/teacher/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "departement_id", label: "Departement", alignRight: false },
          { id: "status", label: "Status", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master/teacher/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/teacher",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
