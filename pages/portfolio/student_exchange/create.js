import FormMaster from "../../../components/utils/FormMasterWithUpload";
export default function () {
  return (
    <FormMaster
      title="Add Thesis/Disertation"
      titlePage="Add Thesis/Disertation"
      submitUrl="/api/portfolio"
			portfolio_id={4}
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
