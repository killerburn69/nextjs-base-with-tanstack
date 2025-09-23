import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "../services/authService";
import { loginFailure, loginSuccess, loginRequest, logout } from "./authSlice";
import { storage } from "@/lib/storage";

/**
 * Worker saga - login
 */
function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const { email, password } = action.payload;
    const data: { user: any; accessToken: string; refreshToken?: string } = yield call(
      authService.login,
      email,
      password
    );

    // persist tokens (for demo only; production prefer httpOnly cookie)
    if (data.accessToken) storage.set("accessToken", data.accessToken);
    if (data.refreshToken) storage.set("refreshToken", data.refreshToken);

    yield put(loginSuccess({ user: data.user, accessToken: data.accessToken }));
  } catch (err: any) {
    const msg = err?.response?.data?.message || err.message || "Login failed";
    yield put(loginFailure(msg));
  }
}

/**
 * Optional logout worker clearing storage
 */
function* handleLogout() {
  try {
    storage.remove("accessToken");
    storage.remove("refreshToken");
    // you might call API to revoke token
  } catch (e) {
    // ignore
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logout.type, handleLogout);
}
