import client from "./client.mjs";

const commentApi = {
  get: (post_id) => client.get(`/api/comment/${post_id}`),
  write: (post_id, data) => client.post(`/api/comment/${post_id}`, data),
  edit: (data) => client.put(`/api/comment`, data),
  delete: (data) => client.delete(`/api/comment`, { data }),
};

export default commentApi;
