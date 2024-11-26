import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './addition_task.scss';
import shareIcon from '../../icons/sharee.png';
import editIcon from '../../icons/edit.png';
import infoIcon from '../../icons/info.png';
import deleteIcon from '../../icons/cross.png';
import { openShareModal, openDeleteModal } from "../../features/taskSlice";
import { Task } from '../types/task';

interface AdditionTaskProps {
    task: Task;
    onToggleExpand: () => void;
    onEdit: (task: Task) => void;
    onDelete: () => void;
    onShare: (task: Task) => void;
}

const AdditionTask: React.FC<AdditionTaskProps> = ({ task, onToggleExpand, onEdit, onDelete, onShare }) => {
    const [showIcons, setShowIcons] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();

    const handleToggleExpand = () => {
        setExpanded(!expanded);
        onToggleExpand();
    };

    const handleShareClick = () => {
        onShare(task);
    };

    const handleEditClick = () => {
        onEdit(task);
    };

    const handleInfoClick = () => {
        // For handling the "Info" button
    };

    const handleDeleteClick = () => {
        onDelete();
    };

    return (
        <div
            className="custom-task-container"
            onMouseEnter={() => setShowIcons(true)}
            onMouseLeave={() => setShowIcons(false)}
        >
            <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                <p onClick={handleToggleExpand} className="task-about">
                    {expanded
                        ? task.about
                        : task.about.length > 50
                            ? task.about.slice(0, 50) + '...'
                            : task.about
                    }
                </p>
            </div>

            {showIcons && (
                <div className="icons-container">
                    <button className="action-button" onClick={handleShareClick}>
                        <img src={shareIcon} alt="Share" className="action-icon" />
                    </button>
                    <button className="action-button" onClick={handleEditClick}>
                        <img src={editIcon} alt="Edit" className="action-icon" />
                    </button>
                    <button className="action-button" onClick={handleInfoClick}>
                        <img src={infoIcon} alt="Info" className="action-icon" />
                    </button>
                </div>
            )}

            <button className="action-button delete-button" onClick={handleDeleteClick}>
                <img src={deleteIcon} alt="Delete" className="action-icon" />
            </button>
        </div>
    );
};

export default AdditionTask;

