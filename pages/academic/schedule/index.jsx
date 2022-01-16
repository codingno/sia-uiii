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
          { id: "name", label: "Course", center : 'center' },
          { id: "course_code", label: "Course Code", center : 'center' },
          { id: "departement_name", label: "Program Study", center : 'center' },
          { id: "academic_year_id", label: "Year", center : 'center' },
          { id: "day_name", label: "Day", center : 'center' },
          { id: "start_time", label: "Start At", center : 'center' },
          { id: "end_time", label: "End At", center : 'center' },
          { id: "room_name", label: "Room", center : 'center' },
          { id: "teacher_name", label: "Teacher", center : 'center' },
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
