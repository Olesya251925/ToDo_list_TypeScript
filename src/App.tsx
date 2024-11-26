import React, { useState } from 'react';
import './style_title_about_add_button/stylesMain.scss';
import './presentation/addition_task/addition_task.scss';
import './presentation/create_task/create_tasks.scss';
import './App.css';

import CreateTask from './presentation/create_task/create_task.tsx';
import ShareModal from './presentation/share/share_task';
import DeleteModal from './presentation/delete_button/delete';

function App() {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

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
