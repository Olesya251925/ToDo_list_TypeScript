import React from 'react';
import { useDispatch } from 'react-redux';
import './share_task.scss';
import { closeShareModal } from '../../features/taskSlice';
import { Task } from '../types/task';

interface ShareModalProps {
    task: Task;
    onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ task, onClose }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeShareModal());
        onClose();
    };

    const handleCopyClick = () => {
        if (task) {
            const textToCopy = `${task.title}\n${task.about}`;
            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log('Текст скопирован в буфер обмена');
                handleClose();
            }).catch(err => {
                console.error('Ошибка при копировании текста: ', err);
            });
        }
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-share" onClick={(e) => e.stopPropagation()}>
                <div className="modal-share-content">
                    <button className="share-button" onClick={handleCopyClick}>
                        <img src="/icons/copy.png" alt="Copy" />
                    </button>
                    <button className="share-button">
                        <img src="/icons/vk.png" alt="Share VK" />
                    </button>
                    <button className="share-button">
                        <img src="/icons/telegram.png" alt="Share Telegram" />
                    </button>
                    <button className="share-button">
                        <img src="/icons/whatsapp.png" alt="Share WhatsApp" />
                    </button>
                    <button className="share-button">
                        <img src="/icons/facebook.png" alt="Share Facebook" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;