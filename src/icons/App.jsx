import React from 'react';
import { useSelector } from 'react-redux';
import './style_title_about_add_button/stylesMain.scss';
import './presentation/addition_task/addition_task.scss';
import "./presentation/create_task/create_tasks.scss";
import './App.css';

import CreateTask from './presentation/create_task/create_task.jsx';
import ShareModal from './presentation/share/share_task.jsx';
import DeleteModal from './presentation/delete_button/delete.jsx';

function App() {
  const { isShareModalOpen, isDeleteModalOpen } = useSelector(state => state.tasks);

  return (
    <div>
      <div className="container">
        <CreateTask />
        {isShareModalOpen && <ShareModal />}
        {isDeleteModalOpen && <DeleteModal />}
      </div>
    </div>
  );
}

export default App;