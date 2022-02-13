import FormMaster from "../../../components/utils/FormMaster";
export default function () {
  return (
    <FormMaster
      title="Add Student Exchange"
      titlePage="Add Student Exchange"
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
					label : 'Exchange With University',
					name : 'exchange_with_university',
					value : 'exchange_with_university',
				},
			]}
			disableMasterForm={true}
      method="create"
    />
  );
}
