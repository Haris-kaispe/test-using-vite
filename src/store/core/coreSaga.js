import { all, fork } from "redux-saga/effects";

import ExampleSaga from "./../common/sagas";

export default function* coreSaga() {
  yield all([
    //public
    fork(ExampleSaga),
  ]);
}
