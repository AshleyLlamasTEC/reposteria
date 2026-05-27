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

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Drawer({ children, isOpen, onClose, position = 'right' }) {
    const positions = {
        right: {
            initial: { x: '100%' },
            animate: { x: 0 },
            exit: { x: '100%' }
        },
        left: {
            initial: { x: '-100%' },
            animate: { x: 0 },
            exit: { x: '-100%' }
        },
        bottom: {
            initial: { y: '100%' },
            animate: { y: 0 },
            exit: { y: '100%' }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40"
                    />
                    
                    {/* Drawer */}
                    <motion.div
                        initial={positions[position].initial}
                        animate={positions[position].animate}
                        exit={positions[position].exit}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={`fixed z-50 bg-white shadow-xl ${
                            position === 'right' || position === 'left'
                                ? 'top-0 bottom-0 w-80'
                                : 'left-0 right-0 bottom-0 rounded-t-2xl'
                        } ${position === 'right' ? 'right-0' : ''} ${
                            position === 'left' ? 'left-0' : ''
                        }`}
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}