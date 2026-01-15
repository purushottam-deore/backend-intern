import { useEffect, useState } from "react";
import { getMyTasks, createTask } from "../api";
import { useNavigate } from "react-router-dom";


const UserDashboard = ({ setLoggedIn }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };


  // Fetch user's tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await getMyTasks();
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Create task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await createTask({ title });
      setTasks((prev) => [...prev, res.data]); 
      setTitle("");
    } catch (err) {
      console.error(err);
      alert("Task creation failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Dashboard</h2>

      {/* Create Task */}
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>{task.title}</li>
          ))}
        </ul>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
