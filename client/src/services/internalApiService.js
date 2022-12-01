import axios from "axios";
//FRONT END

// in route lets you call asynchronus functs
// Normally the url would be saved in a .env or config file that is git ignored
// so it's easy to have a different url for production.
const http = axios.create({
  baseURL: "http://localhost:5000/api",
});
//exporting these lets you expot a single function from this file
//calling this function bring to route and returns data
export const getAllTasks = async () => {
  const res = await http.get("/tasks");
  return res.data;
};

export const getTaskById = async (id) => {
  const res = await http.get(`/tasks/${id}`);
  console.log(id);
  return res.data;
};

export const createTask = async (data) => {
  const res = await http.post(`/tasks`, data);
  return res.data;
};

export const updateTaskById = async (id, data) => {
  const res = await http.put(`/tasks/${id}`, data);
  return res.data;
};

export const updateTaskStatusById = async (id, data) => {
  const res = await http.put(`/tasks/status/${id}`, data);
  return res.data;
};

export const deleteTaskById = async (id) => {
  const res = await http.delete(`/tasks/${id}`);
  return res.data;
};
