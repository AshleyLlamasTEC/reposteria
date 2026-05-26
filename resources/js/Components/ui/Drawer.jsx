import { Dialog } from '@ark-ui/react';
import { X } from 'lucide-react';

export default function Drawer({ isOpen, onClose, children, title }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(details) => !details.open && onClose()}>
      <Dialog.Backdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
      <Dialog.Positioner className="fixed inset-y-0 left-0 w-72 max-w-[80vw] z-50">
        <Dialog.Content className="h-full bg-white shadow-xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <Dialog.Title className="text-lg font-semibold text-gray-800">{title || 'Menú'}</Dialog.Title>
            <Dialog.CloseTrigger className="p-1 rounded-lg hover:bg-gray-100" onClick={onClose}>
              <X className="w-5 h-5" />
            </Dialog.CloseTrigger>
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
