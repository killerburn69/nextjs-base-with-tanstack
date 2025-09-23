import { call, put, takeLatest } from "redux-saga/effects";
import { postService } from "../services/postService";
import { fetchPostsFailure, fetchPostsSuccess, fetchPostsRequest } from "./postSlice";

/**
 * Worker: fetch posts
 */
function* handleFetchPosts() {
  try {
    const data: any[] = yield call(postService.getPosts);
    yield put(fetchPostsSuccess(data));
  } catch (err: any) {
    // if 401 you could dispatch refresh token flow here
    const message = err?.response?.data?.message || err.message || "Failed to load posts";
    yield put(fetchPostsFailure(message));
  }
}

/**
 * Watcher
 */
export function* postSaga() {
  yield takeLatest(fetchPostsRequest.type, handleFetchPosts);
}
