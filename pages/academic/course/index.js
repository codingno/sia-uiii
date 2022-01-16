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
          { id: "code", label: "Code", alignRight: false },
          { id: "departement_name", label: "Program Study", alignRight: false },
          { id: "credits", label: "Credits", alignRight: false },
          { id: "semester", label: "Semester", alignRight: false },
          { id: "course_type_name", label: "Course Type", alignRight: false },
          { id: "status", label: "Status", alignRight: false },
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
