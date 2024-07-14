import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../redux/actions';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const [newTaskText, setNewTaskText] = useState('');

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTaskText(task.text);
  };

  const handleUpdate = () => {
    dispatch(editTask(currentTask.id, newTaskText));
    setIsEditing(false);
    setCurrentTask({});
    setNewTaskText('');
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <span>{task.text}</span>
          <button onClick={() => handleEdit(task)}>Edit</button>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
      ))}

      {isEditing && (
        <div>
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
