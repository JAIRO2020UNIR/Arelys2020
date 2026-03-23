import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
          >
            <header className="bg-[#1A1A1A] text-[#D4AF37] p-6 flex justify-between items-center border-b-2 border-[#D4AF37]">
              <h2 className="text-xl font-bold uppercase tracking-wider">{title}</h2>
              <button onClick={onClose} className="text-white hover:text-[#D4AF37] transition-colors">
                <X size={24} />
              </button>
            </header>
            <div className="p-8">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
