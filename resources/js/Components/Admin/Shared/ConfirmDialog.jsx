import Modal from '@/Components/ui/Modal';
import Button from '@/Components/ui/Button';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Confirmar', variant = 'danger' }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant={variant} onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}