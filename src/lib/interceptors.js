import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../localKey";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";

export const instance = axios.create({
  baseURL: "http://localhost:4000",
});

instance.interceptors.request.use(
  (config) => {
    console.log("does it works?");
    // HTTP Authorization 요청 헤더에 jwt-token을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
    const accessToken = getCookie(ACCESS_TOKEN);
    if (accessToken) {
      config.headers.common["Authorization"] = `Bearer ${accessToken}`;
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
    return res;
  },
  async (error) => {
    // res에서 error가 발생했을 경우 catch로 넘어가기 전에 처리
    let errResponseStatus = null,
      errResponseData = null;
    const originalRequest = error.config;

    try {
      errResponseStatus = error.response.status;
      errResponseData = error.response.data;

      // access token이 만료되어 발생하는 에러인 경우
      if (
        (errResponseData.error?.message === "jwt expired" ||
          errResponseStatus === 401) &&
        !originalRequest.retry
      ) {
        originalRequest.retry = true;
        const preRefreshToken = getCookie(REFRESH_TOKEN);
        const preAccessToken = getCookie(ACCESS_TOKEN);
        if (preRefreshToken) {
          // refresh token을 이용하여 access token 재발행 받기
          async function regenerateToken() {
            return await axios
              .post("api/user/token", {
                refresh_token: preRefreshToken,
              })
              .then(async (res) => {
                const { access_token, refresh_token } = res.data;
                // 새로 받은 token들 저장
                setCookie(ACCESS_TOKEN, access_token, {
                  path: "/" /*httpOnly: true */,
                });
                setCookie(REFRESH_TOKEN, refresh_token, {
                  path: "/" /*httpOnly: true */,
                });

                originalRequest.headers.Authorization = `Bearer ${access_token}`;

                return await axios(originalRequest);
              })
              .catch((e) => {
                // token 재발행 실패 시 logout
                removeCookie(ACCESS_TOKEN);
                removeCookie(REFRESH_TOKEN);
                window.location.href = "/";

                return new Error(e);
              });
          }
          return await regenerateToken();
        } else {
          throw new Error("There is no refresh token");
        }
      }
    } catch (e) {
      console.log("here...!!!", e);
      // 오류 내용 출력 후 요청 거절
      return Promise.reject(e);
    }
  }
);
