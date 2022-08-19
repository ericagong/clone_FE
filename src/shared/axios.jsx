import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

// TODO login, signup, nicknamecheck, idcheck에는 안들어가게 처리해야하나?
// 3가지 방법 중 실무에서는 무엇 사용?
// 조건부 분기
api.interceptors.request.use(function (config) {
  // TODO parsing 로직 다시 짜기
  // const auth = localStorage.getItem('AccessToken');
  // const refresh = localStorage.getItem('RefreshToken');
  // const accessToken = document.cookie.split("=")[1];
  // const refreshToken = document.cookie.split("=")[1];
  // config.headers.common["Authentication"] = `${accessToken}`;
  // config.headers.common["RefreshToken"] = `${refreshToken}`;
  return config;
});

// TODO question: apis 하나로 관리하는게 나은지, 아니면 각각 모듈 기능별로 분리하는게 좋은지?
export const apis = {
  // user
  login: (username, password) =>
    api.post("/user/login", { username, password }),
  signup: (username, nickname, password, passwordCheck) =>
    api.post("/user/signup", {
      username,
      nickname,
      password,
      passwordCheck,
    }),
  // TODO logout이 서버측에서 필요한 이유? 뭔가 처리 해주는지? 프론트에서도 만료 가능. 이중이 될 듯..
  logout: () => api.get("/user/logout"),
  idCheck: (username) => api.post("/user/username", { username }),
  nicknameCheck: (nickname) => api.post("/user/nickname", { nickname }),

  // post
  // add: (contents) => api.post("/api/articles", contents),
  // edit: (id, contents) => api.put(`api/articles/${id}`, contents),
  // del: (id) => api.delete(`api/articles/${id}`),
  // articles: () => api.get("/api/articles"),
  // article: (id) => api.get(`/api/articles/${id}`),
  // search: (value) => api.get(`/api/articles/search?query=${value}`),

  // comment
  // addComment: (id, content) =>
  //   api.post(`/api/articles/${id}/comments`, { content }),
  // comments: (id) => api.get(`/api/articles/${id}/comments`),
  // delComment: (id, coId) => api.delete(`/api/articles/${id}/comments/${coId}`),
  // editComment: (id, coId, content) =>
  //   api.put(`/api/articles/${id}/comments/${coId}`, { content }),
};
