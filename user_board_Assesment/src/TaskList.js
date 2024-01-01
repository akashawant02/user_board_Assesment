// TaskList.js
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const TaskList = ({ list, index }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [tasks, setTasks] = useState(list.tasks);

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== '') {
      const newTask = {
        id: Date.now(), // Use a unique identifier, for simplicity using timestamp here
        title: newTaskTitle,
      };

      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  return (
    <div>
      <h3>{list.title}</h3>
      <Droppable droppableId={`list-${list.id}`} type="TASK">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, taskIndex) => (
              <Task key={task.id} task={task} index={taskIndex} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <input
        type="text"
        placeholder="New task title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskList;
