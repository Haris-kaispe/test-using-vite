import { ITEM, FORM, FILES } from "./types";
import { createAction } from "../../utils";

export const item = {
  request: () => createAction(ITEM.GET, { success: false, error: null }),
  success: (data) =>
    createAction(ITEM.SUCCESS, {
      ...data,
      fetching: false,
      success: true,
      error: null,
    }),
  failure: (error) => createAction(ITEM.FAILURE, { ...error, fetching: false, success: false }),
};

export const formData = {
  request: () => createAction(FORM.GET, { fetching: true, success: false, error: null }),
  add: (formTable) =>
    createAction(FORM.ADD, {
      formTable,
    }),
  updateCell: (cell) =>
    createAction(FORM.UPDATE, {
      cell,
    }),
  success: (formTable) =>
    createAction(FORM.SUCCESS, {
      ...formTable,
      success: true,
      error: null,
    }),
  failure: (error) => createAction(FORM.FAILURE, { ...error, success: false }),
};

export const files = {
  save: (data) =>
    createAction(FILES.POST, {
      data,
    }),
  success: (data) =>
    createAction(FILES.SUCCESS, {
      ...data,
      error: null,
    }),
  failure: (error) => createAction(FILES.FAILURE, { ...error, success: false }),
};
