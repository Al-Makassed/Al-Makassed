import * as Yup from "yup";
import { UpdateMonitoringToolRequest } from "./API/types";
import { AssignDepartmentsPayload } from "./types";

export const updateMTInfoValidationSchema =
  Yup.object<UpdateMonitoringToolRequest>().shape({
    name: Yup.string().nullable().required("Monitoring tool name is required"),
  });

export const assignDepartmentsValidationSchema =
  Yup.object<AssignDepartmentsPayload>().shape({
    departmentsIdes: Yup.array()
      .of(Yup.string())
      .min(1, "Departments are required")
      .required("Departments are required"),
  });
