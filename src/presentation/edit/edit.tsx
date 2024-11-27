import React, { useEffect, useState } from 'react';
import './edit.scss';
import { Task } from '../types/task';



interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
    onSave: (task: Task) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, task, onSave }) => {
    const [title, setTitle] = useState<string>(task.title);
    const [about, setAbout] = useState<string>(task.about);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setTitle(task.title);
        setAbout(task.about);
    }, [task]);

    const handleSave = () => {
        if (!title || !about) {
            setErrorMessage('Please, fill in all fields');
            return;
        }

        const updatedTask: Task = { ...task, title, about };
        onSave(updatedTask);
        setErrorMessage(null);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Mini Input"
                    className="modal-input"
                />
                <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Max Input"
                    className="modal-textarea"
                />
                <div className="modal-buttons">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
