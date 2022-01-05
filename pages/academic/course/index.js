import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Courses">
      <List
        title="Courses"
        name="Courses"
        getUrl="/api/course"
        addLink="/academic/course/create"
        tableHead={[
          { id: "name", label: "Name", alignRight: false },
          { id: "course_type_id", label: "Course Type", alignRight: false },
          { id: "departement_id", label: "Program Study", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/academic/course/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/course/",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
