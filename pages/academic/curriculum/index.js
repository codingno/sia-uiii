import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Curriculums">
      <List
        title="Curriculums"
        name="Curriculum"
        getUrl="/api/curriculum"
        addLink="/academic/curriculum/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "year", label: "Year", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/academic/curriculum/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/curriculum/",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
