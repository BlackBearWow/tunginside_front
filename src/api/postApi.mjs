import client from "./client.mjs";

const postApi = {
  getList: (params) => client.get("/api/post", { params }),
  write: (data) => client.post("/api/post", data),
  getDetail: (post_id) => client.get(`/api/post/${post_id}`),
  edit: (post_id, data) => client.put(`/api/post/${post_id}`, data),
  delete: (post_id, data) => client.delete(`/api/post/${post_id}`, { data }),
  like: (post_id) => client.post(`/api/post/${post_id}/like`),
  dislike: (post_id) => client.post(`/api/post/${post_id}/dislike`),
};

export default postApi;
