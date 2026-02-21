import axios from "axios";

const client = axios.create();

// 요청 인터셉터: 모든 요청에 토큰 부착
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("authorization");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// 응답 인터셉터: 401에러(만료) 발생 시 처리
client.interceptors.response.use(
  (response) => response, // 성공시 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    // 401에러이고, 재시도한 적이 없는 요청일 때
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 서버의 재발급 엔드포인트 호출 /api/reissue
        // 이때는 accessToken을 보내면 안된다.
        const res = await axios.post("/api/reissue");
        if (res.status === 200) {
          const newAccessToken = res.headers["authorization"];
          // 새 토큰 저장
          localStorage.setItem(
            "authorization",
            newAccessToken.replace("Bearer ", ""),
          );
          // 2. 실패했던 원래 요청의 헤더를 새 토큰으로 교체
          originalRequest.headers.Authorization = newAccessToken;
          // 3. 원래 요청 다시 보내기
          return client(originalRequest);
        }
      } catch (reissueError) {
        // 리프레시 토큰도 만료되었거나 오류가 난 경우 -> 로그아웃 처리
        localStorage.removeItem("authorization");
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  },
);

export default client;
