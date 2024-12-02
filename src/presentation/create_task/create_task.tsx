import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addTask,
  loadTasks,
  deleteTask,
  editTask,
} from "../../features/taskSlice";
import TaskInputForm from "./task_input_form";
import TaskList from "./task_list";
import DeleteModal from "../delete_button/delete";
import EditModal from "../edit/edit";
import ShareModal from "../share/share_task";
import { Task } from "../types/task";

const CreateTask: React.FC = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToShare, setTaskToShare] = useState<Task | null>(null);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    dispatch(loadTasks(savedTasks));
  }, [dispatch]);

  const handleAddClick = (title: string, about: string) => {
    if (title.trim() === "" || about.trim() === "") {
      setErrorMessage("Please fill in all fields!");
      return;
    }

    const taskId = (Date.now() + Math.random()).toString();
    const newTask: Task = {
      id: taskId,
      title,
      about,
      description: "",
      completed: false,
      isPinned: false,
    };

    dispatch(addTask(newTask));
    setErrorMessage("");
  };

  const handleDeleteClick = (taskId: string) => {
    const taskToDelete: Task = {
      id: taskId,
      title: "",
      about: "",
      description: "",
      completed: false,
      isPinned: false,
    };
    setTaskToDelete(taskToDelete);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete.id));
      removeTaskFromLocalStorage(taskToDelete.id);
      setTaskToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedTask: Task) => {
    dispatch(editTask(updatedTask));
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        tasks.map((task: Task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      )
    );
    setIsEditModalOpen(false);
  };

  const handleShareClick = (task: Task) => {
    setTaskToShare(task);
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
    setTaskToShare(null);
  };

  const handleToggleExpand = (taskId: string) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const removeTaskFromLocalStorage = (taskId: string) => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.filter((task: Task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="container">
      <TaskInputForm onAddClick={handleAddClick} />
      {errorMessage && (
        <div className="error-message">
          <span>{errorMessage}</span>
          <button className="close-button" onClick={() => setErrorMessage("")}>
            ×
          </button>
        </div>
      )}
      <TaskList
        onDeleteTask={handleDeleteClick}
        onEditTask={handleEditTask}
        onShareTask={handleShareClick}
        onToggleExpand={handleToggleExpand}
      />
      {isDeleteModalOpen && taskToDelete && (
        <DeleteModal
          taskToDelete={taskToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {isEditModalOpen && taskToEdit && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={taskToEdit}
          onSave={handleSaveEdit}
        />
      )}

      {isShareModalOpen && taskToShare && (
        <ShareModal task={taskToShare} onClose={handleCloseShareModal} />
      )}
    </div>
  );
};

export default CreateTask;
