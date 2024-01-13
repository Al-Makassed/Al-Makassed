import {
  DependencySearchResponse,
  PolicySearchResponse,
  SearchResponse,
} from "../API/types";
import { NavigateFunction } from "react-router-dom";

/**
 * Section 1: Functions for handling specific entity types
 */

/**
 * Handles click on a policy search result.
 * Navigates to the policy details page.
 *
 * @param result - The policy search result.
 * @param navigate - The function for navigating.
 */
export const handlePolicyClick = (
  result: PolicySearchResponse,
  navigate: NavigateFunction,
) => {
  navigate(
    `/me/policies-and-procedures/${result.chapterId}/policies/${result.id}`,
  );
};

/**
 * Handles click on a dependency search result.
 * Opens the dependency PDF in a new window.
 *
 * @param result - The dependency search result.
 * @param openWindow - The function for opening a new window.
 */
export const handleDependencyClick = (
  result: DependencySearchResponse,
  openWindow: (url: string, target: string) => void,
) => {
  openWindow(result.pdfUrl, "_blank");
};

/**
 * Handles click on monitoring tools search result.
 * Navigates to the monitoring tools page.
 *
 * @param navigate - The function for navigating.
 */
export const handleMonitoringToolsClick = (navigate: NavigateFunction) => {
  navigate(`/me/monitoring-tools`);
};

/**
 * Handles click on a task search result.
 * Navigates to the task details page.
 *
 * @param result - The task search result.
 * @param navigate - The function for navigating.
 */
export const handleTaskClick = (
  result: SearchResponse,
  navigate: NavigateFunction,
) => {
  navigate(`/me/monitoring-tools/task/${result.id}`);
};

/**
 * Section 2: Function for handling clicks based on entity type
 */

/**
 * Handles click on a search result based on its entity type.
 *
 * @param result - The search result.
 * @param navigate - The function for navigating.
 * @param openWindow - The function for opening a new window.
 */
export const handleEntityClick = (
  result: SearchResponse,
  navigate: NavigateFunction,
  openWindow: (url: string, target: string) => void,
) => {
  switch (result.searchEntityType) {
    case 1:
      handlePolicyClick(result as PolicySearchResponse, navigate);
      break;

    case 2:
      handleDependencyClick(result as DependencySearchResponse, openWindow);
      break;

    case 3:
      handleMonitoringToolsClick(navigate);
      break;

    case 4:
      handleTaskClick(result, navigate);
      break;

    default:
      break;
  }
};
