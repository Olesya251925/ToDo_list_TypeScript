import React, { useEffect, useState } from 'react';
import './edit.scss';
import { useSelector, useDispatch } from 'react-redux';
import { editTask } from "../../features/taskSlice";
import { Task } from '../types/task';

interface RootState {
    tasks: {
        errorMessage: string | null;
    };
}

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
    onSave: (task: Task) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, task, onSave }) => {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state: RootState) => state.tasks.errorMessage);
    const [title, setTitle] = useState<string>(task.title);
    const [about, setAbout] = useState<string>(task.about);

    useEffect(() => {
        setTitle(task.title);
        setAbout(task.about);
    }, [task]);

    const handleSave = () => {
        if (!title || !about) {
            dispatch({ type: 'tasks/setErrorMessage', payload: 'Please fill in all fields!' });
            return;
        }

        const updatedTask: Task = { ...task, title, about };
        onSave(updatedTask);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (errorMessage) dispatch({ type: 'tasks/setErrorMessage', payload: '' });
                    }}
                    placeholder="Mini Input"
                    className="modal-input"
                />
                <textarea
                    value={about}
                    onChange={(e) => {
                        setAbout(e.target.value);
                        if (errorMessage) dispatch({ type: 'tasks/setErrorMessage', payload: '' });
                    }}
                    placeholder="
Max Input"
                    className="modal-textarea"
                />
                <div className="modal-buttons">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
                {errorMessage && (
                    <div id="error-message" className="error-container">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditModal;

