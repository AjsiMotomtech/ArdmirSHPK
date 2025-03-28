import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BackToTopProps {
  visible: boolean;
}

const BackToTop = ({ visible }: BackToTopProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#e67e22] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#d35400] z-50"
          aria-label="Back to top"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
