import { useFormik } from "formik";
//import { initialValues } from "../constants";
import { UpdateMonitoringToolRequest } from "../API/types";
import validationSchema from "../schema";
import useUpdateMonitoringToolAPI from "./useUpdateMonitoringToolAPI";
import { MonitoringTool } from "src/pages/MonitoringTools/API/types";

const useUpdateMonitoringToolForm = (monitoringTool: MonitoringTool) => {
  const { editMonitoringTool, isPending, status } = useUpdateMonitoringToolAPI(
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
    validationSchema,
    onSubmit: submitForm,
  });

  return { formikProps, isPending, status };
};

export default useUpdateMonitoringToolForm;
