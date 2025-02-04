'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import LoadingDots from '@/components/ui/animations/LoadingDots';

interface SlidingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pythonCode?: string;
  output?: string;
  isExecuting: boolean;
}

// Type for managing output state
type OutputState = {
  isLoading: boolean;
  content: string;
};

const ClientOnlyModal = dynamic(() => Promise.resolve(({ children }: { children: React.ReactNode }) => <>{children}</>), {
  ssr: false
});

const SlidingModal: React.FC<SlidingModalProps> = ({ isOpen, onClose, pythonCode = '', output = '', isExecuting  }) => {
  const [mounted, setMounted] = useState(false);
  const [outputState, setOutputState] = useState<OutputState>({
    isLoading: isExecuting,
    content: output
  });

  // Effect for handling mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect for handling output changes
    useEffect(() => {
    setOutputState({
      isLoading: isExecuting,
      content: output
    });
  }, [output, isExecuting]);

  // Function to mask sensitive information
  const maskSensitiveInfo = (code: string): string => {
    return code
      .replace(/sk-proj-[a-zA-Z0-9-]+/g, 'YOUR_OPENAI_API_KEY')
      .replace(/asst_[a-zA-Z0-9]+/g, 'YOUR_ASSISTANT_ID');
  };

  // Function to determine output message
  const getOutputMessage = (): JSX.Element | string => {
    if (!outputState.content && !outputState.isLoading) {
      return '> No output available';
    }
    if (outputState.isLoading) {
      return (
      <span className="flex items-center">
        {'> Executing'}
        <LoadingDots />
      </span>
      );
    }
    return outputState.content;
  };

  // Don't render anything if not mounted
  if (!mounted) {
    return null;
  }

  return (
    <ClientOnlyModal>
      <style jsx global>{`
        /* Custom scrollbar styles - same as before */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1E1E1E;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #424242;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4F4F4F;
        }

        .custom-scrollbar::-webkit-scrollbar-corner {
          background: #1E1E1E;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #424242 #1E1E1E;
        }
      `}</style>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="fixed right-0 top-0 h-screen w-3/4 max-w-4xl bg-[#1A1A1A] border-l border-white/10 shadow-2xl z-50 rounded-l-2xl"
            >
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <h2 className="text-white text-lg font-medium font-offbit">Code Output</h2>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
                  <div className="mb-6">
                    <h3 className="text-white text-sm font-medium mb-2 font-offbit">Generated Python Code:</h3>
                    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden border border-white/5">
                      <div className="flex items-center justify-between px-4 py-2 bg-[#252525] border-b border-white/5">
                        <span className="text-xs text-gray-400">script.py</span>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                        </div>
                      </div>
                      <div className="p-4 font-mono text-sm leading-relaxed overflow-auto custom-scrollbar">
                        <pre className="text-[#D4D4D4]">
                          {maskSensitiveInfo(pythonCode).split('\n').map((line, i) => (
                            <div key={i} className="flex">
                              <span className="w-8 inline-block text-gray-500 select-none">{i + 1}</span>
                              <span className="flex-1">{line || ' '}</span>
                            </div>
                          ))}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-white text-sm font-medium mb-2 font-offbit">Output:</h3>
                    <div className="bg-black rounded-lg overflow-hidden border border-white/5">
                      <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b border-white/5">
                        <span className="text-xs text-gray-400">Terminal</span>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                        </div>
                      </div>
                      <div className="p-4 custom-scrollbar overflow-auto max-h-[400px]">
                        <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap font-medium">
                          {getOutputMessage()}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="text-blue-400 mt-0.5" size={20} />
                      <div className="text-sm text-blue-200">
                        <p className="font-medium mb-1">Continue your chat locally</p>
                        <p className="text-blue-300/80">
                          To continue interacting with the AI assistant, please run this code in your local Python IDE where you can provide real-time responses and engage in a full conversation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ClientOnlyModal>
  );
};

export default SlidingModal;
