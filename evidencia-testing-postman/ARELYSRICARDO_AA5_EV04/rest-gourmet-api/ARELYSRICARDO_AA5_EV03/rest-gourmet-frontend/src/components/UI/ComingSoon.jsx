import { motion } from 'framer-motion';
import { Hammer } from 'lucide-react';

const ComingSoon = ({ title }) => {
  return (
    <div className="bg-white rounded-2xl p-16 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
      <motion.div 
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-24 h-24 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mb-8"
      >
        <Hammer size={48} />
      </motion.div>
      <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">{title}</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        Estamos trabajando para brindarle la mejor experiencia en la gestión de este módulo. 
        Próximamente estará disponible con todas las funcionalidades gourmet.
      </p>
    </div>
  );
};

export default ComingSoon;
