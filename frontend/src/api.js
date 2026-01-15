import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1"
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("Token sent in request:", token);
  if (token) req.headers['Authorization'] = `Bearer ${token}`;
  return req;
});


/* ================= TASK APIs ================= */

// User / Admin: create task
export const createTask = (data) => api.post("/tasks", data);

// User: get own tasks
export const getMyTasks = () => api.get("/tasks/my");

// Admin: get all tasks
export const getAllTasks = () => api.get("/tasks");

// Admin: delete task
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
