
import React, { useState } from 'react';
import Login from './Login';
import TaskBoard from './TaskBoard';

const App = () => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const handleLogin = (userId) => {
    setLoggedInUserId(userId);
  };

  return (
    <div>
      {loggedInUserId ? (
        <TaskBoard userId={loggedInUserId} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
