import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";

export const instance = axios.create({
  baseURL: "http://localhost:4000",
});

instance.interceptors.request.use(
  (config) => {
    console.log("does it works?");
    // HTTP Authorization 요청 헤더에 jwt-token을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
    const accessToken = getCookie("access_token");
    if (accessToken) {
      console.log(accessToken);
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // 요청 에러 직전 호출
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    console.log("res: ", res);
    return res;
  },
  (error) => {
    console.log(error.response);
    // res에서 error가 발생했을 경우 catch로 넘어가기 전에 처리
    let errResponseStatus = null;
    const originalRequest = error.config;

    try {
      errResponseStatus = error.response.status;
    } catch (e) {}

    // access token이 만료되어 발생하는 에러인 경우
    if (
      (error.message === "Network Error" || errResponseStatus === 401) &&
      !originalRequest.retry
    ) {
      originalRequest.retry = true;
      const preRefreshToken = getCookie("refresh_token");
      if (preRefreshToken) {
        // refresh token을 이용하여 access token 재발행 받기
        return axios
          .post("api/user/token", {
            refresh_token: preRefreshToken,
          })
          .then((res) => {
            const { access_token, refresh_token } = res.data;
            // 새로 받은 token들 저장
            setCookie("access_token", access_token, {
              path: "/" /*httpOnly: true */,
            });
            setCookie("refresh_token", refresh_token, {
              path: "/" /*httpOnly: true */,
            });

            originalRequest.headers.authorization = `Bearer ${access_token}`;
            return axios(originalRequest);
          })
          .catch((e) => {
            console.log("here....", e);
            // token 재발행 실패 시 logout
            removeCookie("access_token");
            removeCookie("refresh_token");
            window.location.href = "/";

            return false;
          });
      }
      // 오류 발생 시 오류 내용 출력 후 요청 거절
      return Promise.reject(error);
    }
    // 오류 발생 시 오류 내용 출력 후 요청 거절
    return Promise.reject(error);
  }
);
