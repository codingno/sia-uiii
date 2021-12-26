import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Departements">
      <List
        title="Departements"
        name="Departement"
        getUrl="/api/departement"
        addLink="/master/departement/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "status", label: "Status", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/master/departement/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/departement/",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
