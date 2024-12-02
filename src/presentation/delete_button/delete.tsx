import React from "react";
import { useDispatch } from "react-redux";
import "./delete.scss";
import { deleteTask, closeDeleteModal } from "../../features/taskSlice";
import { Task } from "../types/task";

interface DeleteModalProps {
  taskToDelete: Task;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  taskToDelete,
  onConfirm,
  onCancel,
}) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(deleteTask(taskToDelete.id));
    dispatch(closeDeleteModal());
    onConfirm();
  };

  const handleCancel = () => {
    dispatch(closeDeleteModal());
    onCancel();
  };

  return (
    <div className="modal-button-delete">
      <div className="modal-content-button-delete">
        <div className="modal-border-top-button-delete"></div>
        <div className="modal-header-button-delete">
          <h3 style={{ color: "#FFFFFF", textAlign: "center" }}>
            Delete this task?
          </h3>
        </div>
        <div className="modal-buttons-button-delete">
          <button className="button-button-delete" onClick={handleConfirm}>
            Yes
          </button>
          <button className="button-button-delete" onClick={handleCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
