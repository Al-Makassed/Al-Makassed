import * as Yup from "yup";
import { UpdateMonitoringToolRequest } from "./API/types";
import { AddFieldsToMTFormPayload } from "./types";

export const updateMTInfoValidationSchema =
  Yup.object<UpdateMonitoringToolRequest>().shape({
    name: Yup.string().nullable().required("Monitoring tool name is required"),
  });

export const addFieldToMTValidationSchema =
  Yup.object<AddFieldsToMTFormPayload>().shape({
    fieldsIdes: Yup.array()
      .of(Yup.string())
      .min(1, "Fields are required, add one field at least")
      .required("Fields are required, add one field at least"),
  });
