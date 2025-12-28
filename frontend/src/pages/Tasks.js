import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasksPaginated, createTask, updateTask, deleteTask } from '../services/api';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const pageSize = 5;

    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        loadTasks(currentPage);
    }, [currentPage]);

    const loadTasks = async (page) => {
        try {
            setLoading(true);
            const response = await getTasksPaginated(page, pageSize);
            setTasks(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        } catch (err) {
            if (err.response?.status === 403 || err.response?.status === 401) {
                localStorage.clear();
                navigate('/login');
            } else {
                setError('Failed to load tasks');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await createTask({ title, description, status: 'PENDING' });
            setTitle('');
            setDescription('');
            setCurrentPage(0); // Go to first page to see the new task
            loadTasks(0);
        } catch (err) {
            setError('Failed to create task');
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await updateTask(taskId, { status: newStatus });
            loadTasks(currentPage);
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const handleDelete = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(taskId);
                // If we deleted the last item on this page, go to previous page
                if (tasks.length === 1 && currentPage > 0) {
                    setCurrentPage(currentPage - 1);
                } else {
                    loadTasks(currentPage);
                }
            } catch (err) {
                setError('Failed to delete task');
            }
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading && tasks.length === 0) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <div className="header">
                <h1>Task Manager</h1>
                <div className="user-info">
                    <span>Welcome, {userName}!</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </div>

            {error && <div className="error">{error}</div>}

            {/* Add Task Form */}
            <div className="add-task-form">
                <h3>Add New Task</h3>
                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Task description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button type="submit">Add Task</button>
                </form>
            </div>

            {/* Tasks List */}
            <div className="tasks-list">
                <h3>My Tasks ({totalElements})</h3>

                {tasks.length === 0 ? (
                    <p className="no-tasks">No tasks yet. Create your first task!</p>
                ) : (
                    <>
                        {tasks.map((task) => (
                            <div key={task.id} className={`task-item status-${task.status.toLowerCase()}`}>
                                <div className="task-content">
                                    <h4>{task.title}</h4>
                                    {task.description && <p>{task.description}</p>}
                                    <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
                                </div>

                                <div className="task-actions">
                                    <select
                                        value={task.status}
                                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                        className="status-select"
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="DONE">Done</option>
                                    </select>

                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 0}
                                    className="pagination-btn"
                                >
                                    ← Previous
                                </button>
                                <span className="pagination-info">
                                    Page {currentPage + 1} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage >= totalPages - 1}
                                    className="pagination-btn"
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Tasks;
