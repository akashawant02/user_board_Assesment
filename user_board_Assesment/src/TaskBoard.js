// TaskBoard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskList from './TaskList';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const TaskBoard = ({ userId }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Fetch user's tasks from JSONPlaceholder
    axios.get(`${BASE_URL}/todos?userId=${userId}`).then((response) => {
      const tasks = response.data;

      // Group tasks by userId for simplicity, creating a single list
      const groupedTasks = {
        id: 1,
        title: 'Todo List 1',
        tasks,
      };

      setLists([groupedTasks]);
    });
  }, [userId]);

  const updateTaskOrder = (source, destination) => {
    const updatedLists = [...lists];

    const sourceList = updatedLists.find((list) => list.id === source.droppableId);
    const destinationList = updatedLists.find((list) => list.id === destination.droppableId);

    // Check if source or destination list is undefined
    if (!sourceList || !destinationList) {
      console.error('Source or destination list not found');
      return;
    }

    const movedTask = sourceList.tasks[source.index];

    // Remove the task from the source list
    sourceList.tasks.splice(source.index, 1);

    // Add the task to the destination list at the specified index
    destinationList.tasks.splice(destination.index, 0, movedTask);

    setLists(updatedLists);
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    updateTaskOrder(source, destination);
  };

  const handleAddList = () => {
    // Placeholder function for adding a new list
    const newList = {
      id: Date.now(),
      title: `Todo List ${lists.length + 1}`,
      tasks: [],
    };

    setLists([...lists, newList]);
  };

  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      <button onClick={handleAddList}>Add List</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-board" direction="horizontal" type="LIST">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'flex' }}>
              {lists.map((list, index) => (
                <Draggable key={list.id} draggableId={`list-${list.id}`} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <TaskList key={list.id} list={list} index={index} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
