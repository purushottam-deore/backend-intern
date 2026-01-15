import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AdminDashboard({ setLoggedIn }) {
  const [tasks, setTasks] = useState([]);

  const loadAllTasks = async () => {
    const res = await api.get("/tasks/admin/all");
    setTasks(res.data);
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  useEffect(() => {
    loadAllTasks();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.title} — <b>{t.user?.email}</b>
            <button onClick={() => handleDeleteTask(t._id)}>Delete</button>
          </li>
        ))}
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </div>
  );
}

export default AdminDashboard;
