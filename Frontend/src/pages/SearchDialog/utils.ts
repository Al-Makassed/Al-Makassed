import { SearchEntityType } from "./API/types";

/**
 * Converts a SearchEntityType to its string representation.
 *
 * @param {SearchEntityType} entityType - The SearchEntityType to convert.
 * @returns {string} - The string representation of the SearchEntityType.
 * @throws Will throw an error if the SearchEntityType is not handled.
 */
export function typeToString(entityType: SearchEntityType): string {
  switch (entityType) {
    case SearchEntityType.Chapter:
      return "Chapter";
    case SearchEntityType.Policy:
      return "Policy";
    case SearchEntityType.Dependency:
      return "Dependency";
    case SearchEntityType.MonitoringTool:
      return "Monitoring Tool";
    case SearchEntityType.FocalPointTask:
      return "Focal-Point Task";
    default:
      throw new Error(`Unhandled SearchEntityType: ${entityType}`);
  }
}
