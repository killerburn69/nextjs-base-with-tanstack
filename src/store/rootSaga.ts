import { authSaga } from "@/features/auth/store/authSaga";
import { postSaga } from "@/features/post/store/postSaga";
import { all, fork } from "redux-saga/effects";


export default function* rootSaga() {
  yield all([fork(authSaga), fork(postSaga)]);
}
