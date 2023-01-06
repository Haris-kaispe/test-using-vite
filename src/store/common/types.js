import { createActionTypes } from "./../../utils/index";
export const ITEM = createActionTypes("ITEM", ["GET", "SUCCESS", "FAILURE"]);
export const FORM = createActionTypes("FORM", [
  "GET",
  "ADD",
  "UPDATE",
  "DELETE",
  "SUCCESS",
  "FAILURE",
]);
export const FILES = createActionTypes("FILES", ["POST", "SUCCESS", "FAILURE"]);

export default { ITEM, FORM, FILES };
