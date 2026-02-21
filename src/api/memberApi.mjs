import client from "./client.mjs";

const memberApi = {
  get: () => client.get("/api/member"),
  login: (data) => client.post("/api/member/login", data),
  signup: (data) => client.post("/api/member/signup", data),
  logout: () => client.post("/api/member/logout"),
  delete: () => client.delete("/api/member"),
  edit: (data) => client.put("/api/member", data),
};

export default memberApi;
