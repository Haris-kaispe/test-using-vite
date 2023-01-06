import { call, put, takeEvery, all, takeLatest } from "redux-saga/effects";
import * as NetworkCall from "../../network/apis";
import { ITEM, FILES } from "./types";
import { item, files } from "./actions";

//with no params
function* handleGet() {
  try {
    const data = yield call(NetworkCall.getData);
    yield put(item.success({ data }));
  } catch (e) {
    yield put(item.failure({ error: { ...e } }));
  }
}

function* uploadFiles(rec) {
  try {
    //const s = Object.values(rec);
    const xyz = Object.values(rec);
    console.log("rec", xyz);
    const datas = yield call(NetworkCall.uploadFiles, xyz);
    yield put(files.success({ datas }));
  } catch (e) {
    yield put(files.failure({ error: { ...e } }));
  }
}

function* watchExampleSaga() {
  yield all([takeEvery(FILES.POST, uploadFiles), takeEvery(ITEM.GET, handleGet)]);
}

export default watchExampleSaga;
