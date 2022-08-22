import axios from "axios";

const base = {
  server_http: process.env.REACT_APP_HTTP_URI,
  server_https: process.env.REACT_APP_HTTPS_URI,
};

const api = axios.create({
  baseURL: base.server_http,
  headers: {
    "content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

// TODO login, signup, nicknamecheck, idcheck에는 안들어가게 처리해야하나?
// 3가지 방법 중 실무에서는 무엇 사용?
// 조건부 분기
api.interceptors.request.use(function (config) {
  const auth = localStorage.getItem("AccessToken");
  config.headers.common["Authentication"] = auth;

  // const accessToken = document.cookie.split("=")[1];
  // const refreshToken = document.cookie.split("=")[1];
  // config.headers.common["Authentication"] = `${accessToken}`;
  // config.headers.common["RefreshToken"] = `${refreshToken}`;
  return config;
});

// TODO question: apis 하나로 관리하는게 나은지, 아니면 각각 모듈 기능별로 분리하는게 좋은지?
export const apis = {
  // auth : signup, login, logout
  signup: (email, username, password) =>
    api.comment("/api/signup", {
      email,
      username,
      password,
    }),
  login: (email, password) => api.comment("/api/login", { email, password }),
  logout: () => api.get("/api/logout"),

  // post : CRUD, like/unlike
  // CRUD
  create_post: (content, files, hashtags) => {
    // const contentBlob = new Blob([json], { type: "application/json" });
    const formData = new FormData();
    formData.append("content", content);
    formData.append("files", files);
    formData.append("hashtags", hashtags);
    return api.post("/api/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  get_posts: (pageNum, pageLimit) =>
    api.get(`/api/posts?pageNum=${pageNum}&pageLimit=${pageLimit}`),
  edit_post: (id, content, hashtags) => {
    api.put(`/api/post/${id}`, { content, hashtags });
  },
  delete_post: (id) => {
    api.delete(`/api/post/${id}`);
  },
  // like, unlike
  like_post: (id) => {
    api.post(`/api/like/${id}`);
  },
  unlike_post: (id) => {
    api.post(`/api/unlike/${id}`);
  },

  // comment : CRUD
  create_comment: (id, content, hashtags) =>
    // TODO  create에 Blob 써보기
    api.comment(`/api/comment/${id}`, { content, hashtags }),
  get_comments: (postId, pageNum, pageLimit) =>
    api.get(
      `/api/comments?postId=${postId}&pageNum=${pageNum}&pageLimit=${pageLimit}`
    ),
  edit_comment: (id, content, hashtags) => {
    api.put(`/api/comment/${id}`, { content, hashtags });
  },
  delete_comment: (id) => {
    api.delete(`/api/comment/${id}`);
  },

  // search : search result
  get_search_result: (tag, pageNum, pageLimit) => {
    api.get(`/api/hashtag/${tag}&pageNum=${pageNum}&pageLimit=${pageLimit}`);
  },

  // rank : hashtag ranking
  get_rank: () => {
    api.get("api/hashtag/rank");
  },

  // profile : get info, posts, following, follower list
  get_profile_info: (username) => api.get(`/api/profile/info/${username}`),
  get_profile_posts: (username, pageNum, pageLimit) =>
    api.get(
      `/api/profile/posts?username=${username}&pageNum=${pageNum}&pageLimit=${pageLimit}`
    ),
  get_profile_following: (username, pageNum, pageLimit) =>
    api.get(
      `/api/profile/following?username=${username}pageNum=${pageNum}&pageLimit=${pageLimit}`
    ),
  get_profile_followers: (username, pageNum, pageLimit) =>
    api.get(
      `/api/profile/followers?username=${username}pageNum=${pageNum}&pageLimit=${pageLimit}`
    ),

  // follow : follow/unfollow
  follow_user: (username) => {
    api.post(`api/user/follow`, { username });
  },
  unfollow_user: (username) => {
    api.post(`api/user/unfollow`, { username });
  },
};
