import { useRouter } from "next/router";

import List from "../../../components/utils/List";
import BasicLayout from "../../../components/utils/BasicLayout";

export default function () {
  const router = useRouter();

  return (
    <BasicLayout title="Academic Schedule">
      <List
        title="Academic Schedule"
        name="Schedule"
        getUrl="/api/academic-schedule"
        addLink="/academic/schedule/create"
        tableHead={[
          { id: "name", label: "Course", alignRight: false },
          { id: "teacher_name", label: "Teacher", alignRight: false },
          { id: "day_name", label: "Day", alignRight: false },
          { id: "" },
        ]}
        moremenu={[
          {
            name: "Edit",
            link: "/academic/schedule/edit/",
          },
        ]}
        deleteOptions={{
          link: "/api/academic-schedule/",
          note: "Are you sure to delete this item?",
        }}
      />
    </BasicLayout>
  );
}
