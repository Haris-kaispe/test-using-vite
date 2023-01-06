import { FILES, FORM } from "./types";
import { List, Map as ImmutableMap } from "immutable";

const initialState = {
  list: [],
  attachments: [],
  error: null,
  isLoading: false,
};
export default function exampleReducer(state = initialState, action) {
  let { list } = state;
  switch (action.type) {
    case FORM.ADD:
      list.push(action.payload.formTable);
      return {
        ...state,
        list: list,
      };

    case FORM.UPDATE:
      const { dataField, newValue, rowId } = action.payload.cell;
      return {
        ...state,
        list: list.map((item) => {
          if (item.id === rowId) {
            return {
              ...item,
              [dataField]: newValue,
            };
          }
          return item;
        }),
      };

    case FILES.SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        attachments: data,
        error: null,
        isLoading: false,
      };

    case FILES.FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        error,
        isLoading: false,
      };

    default:
      return state;
  }
}
