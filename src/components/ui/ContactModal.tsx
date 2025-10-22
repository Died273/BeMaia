import { useState, useEffect } from "react";
import { useContactModal } from '@/contexts/ContactModalContext';
import { Button } from "@/components/ui/button";
import { X, Mail, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactModal() {
  const { show, email, closeModal } = useContactModal();
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  const handleCopy = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        closeModal();
      }, 1800);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.39, 1.69, 0.36, 1] }}
          onClick={closeModal}
        >
          <motion.div 
            className="bg-card p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border-2 border-primary/20 relative"
            initial={{ opacity: 0, y: -38, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 38, scale: 0.94 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.39, 1.69, 0.36, 1]
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Contact Options</h3>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X className="w-5 h-5 text-current" />
              </Button>
            </div>
            <p className="text-muted-foreground mb-6">
              How would you like to send an email to <strong>{email}</strong>?
            </p>
            <div className="space-y-3">
              <a
                href={`mailto:${email}`}
                onClick={closeModal}
                className="block"
              >
                <Button variant="outline" size="lg" className="w-full">
                  <Mail className="mr-2 w-5 h-5" />
                  Use Mail Client
                </Button>
              </a>
              <Button
                variant="secondary"
                size="lg"
                className="w-full text-white relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
                onClick={handleCopy}
                disabled={copied}
              >
                <Copy className="text-white mr-2 w-5 h-5" />
                {copied ? "Copied!" : "Copy Email Address"}
              </Button>
            </div>
            <AnimatePresence>
              {copied && (
                <motion.div 
                  className="absolute left-[0%] -translate-x-1/2 mt-5 bottom-[-85px] min-w-[450px] bg-gradient-to-r from-primary to-secondary text-white py-3 px-8 rounded-xl shadow-xl font-semibold text-lg flex items-center gap-3"
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.39, 1.69, 0.36, 1]
                  }}
                >
                  <Mail className="w-5 h-5" />
                  Email address copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
