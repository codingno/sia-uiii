import FormMaster from "../../../../components/utils/FormMasterWithUpload";
export default function () {
  return (
    <FormMaster
      title="Edit Student Exchange"
      titlePage="Edit Student Exchange"
      submitUrl="/api/student-exchange"
			listForm={[
				{
					label : 'Name',
					name : 'name',
					value : 'name',
				},
				{
					label : 'Student Number',
					name : 'student_number',
					value : 'student_number',
				},
				{
					label : 'Faculty',
					name : 'faculty_id',
					value : 'faculty_id',
				},
				{
					label : 'Reason',
					name : 'reason',
					value : 'reason',
				},
			]}
			disableMasterForm={true}
      method="edit"
    />
  );
}
