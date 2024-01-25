import { useFormik } from "formik";
import { MonitoringTool } from "src/pages/MonitoringTools/API/types";
import { UpdateMonitoringToolRequest } from "../API/types";
import { updateMTInfoValidationSchema } from "../schema";
import useUpdateMonitoringToolAPI from "./useUpdateMonitoringToolAPI";

const useUpdateMonitoringToolForm = (monitoringTool: MonitoringTool) => {
  const { editMonitoringTool, isPending } = useUpdateMonitoringToolAPI(
    monitoringTool.id,
  );

  const submitForm = (values: UpdateMonitoringToolRequest) => {
    editMonitoringTool({
      monitoringToolId: values.monitoringToolId,
      name: values.name,
      description: values.description,
    });
  };

  const formikProps = useFormik({
    initialValues: {
      monitoringToolId: monitoringTool.id,
      name: monitoringTool.name,
      description: monitoringTool.description,
    },
    validationSchema: updateMTInfoValidationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isPending };
};

export default useUpdateMonitoringToolForm;
