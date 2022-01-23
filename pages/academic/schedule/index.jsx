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
          { id: "course_code", label: "Course Code", alignRight: false },
          { id: "departement_name", label: "Program Study",alignRight: false },
          { id: "academic_year_id", label: "Year",alignRight: false },
          { id: "day_name", label: "Day",alignRight: false },
          { id: "start_time", label: "Start At",alignRight: false, type : "Time" },
          { id: "end_time", label: "End At",alignRight: false, type : "Time" },
          { id: "room_name", label: "Room",alignRight: false },
          { id: "teacher_name", label: "Teacher",alignRight: false },
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
