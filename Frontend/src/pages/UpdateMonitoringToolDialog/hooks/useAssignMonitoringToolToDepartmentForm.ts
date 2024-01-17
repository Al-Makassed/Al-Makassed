import { useFormik } from "formik";
import { initialValues } from "../constants";
import { assignDepartmentsValidationSchema } from "../schema";
import { AssignDepartmentsPayload } from "../types";
import useAssignMonitoringToolToDepartment from "./useAssignMonitoringToolToDepartment";

const useAddFieldToMonitoringToolForm = (monitoringToolId: string) => {
  const { assignDepartments, isPending } =
    useAssignMonitoringToolToDepartment();

  const submitForm = (values: AssignDepartmentsPayload) => {
    assignDepartments({
      monitoringToolId,
      departmentsIdes: values.departmentsIdes,
    });
  };

  const formikProps = useFormik({
    initialValues: initialValues,
    validationSchema: assignDepartmentsValidationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isAdding: isPending };
};

export default useAddFieldToMonitoringToolForm;
