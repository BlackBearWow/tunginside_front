import client from "./client.mjs";

const categoryApi = {
  get: () => client.get("/api/category"),
  make: (data) => client.post("/api/category", data),
  delete: (data) => client.delete("/api/category", { data }),
};

export default categoryApi;
