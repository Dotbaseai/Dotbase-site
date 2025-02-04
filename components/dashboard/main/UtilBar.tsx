'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { LogOut, FileCode, FilePlus2, SquareTerminal, TvMinimalPlay } from 'lucide-react';
import Cookies from 'js-cookie';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/common/alert-dialog";
import useDnDStore from '@/stores/useDnDStore';
import Avatar, { genConfig } from 'react-nice-avatar';
import { generateDisplayCode, generateExecutionCode } from '@/utils/exportUtils';
import { NICKNAMES } from '@/utils/nicknames';
import SlidingModal from './SlidingModal';

interface UtilBarProps {
  onTutorialClick: () => void;
}

const UtilBar = ({ onTutorialClick }: UtilBarProps) => {
  // State management for UI elements
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNewFileDialog, setShowNewFileDialog] = useState(false);
  const [userName, setUserName] = useState('User');
  const [avatarConfig, setAvatarConfig] = useState(() => genConfig());

  // State management for code execution
  const [showEditor, setShowEditor] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  
  // Global state and authentication hooks
  const { logout: privyLogout } = usePrivy();
  const { wallets } = useWallets();
  const { nodes, edges, clearNodes } = useDnDStore();

  // Initialize random username and avatar on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * NICKNAMES.length);
    const selectedName = NICKNAMES[randomIndex];
    setUserName(selectedName);
    setAvatarConfig(genConfig(selectedName));
  }, []);

  // File operations handlers
  const handleNewFile = useCallback(() => {
    clearNodes();
    setShowNewFileDialog(false);
  }, [clearNodes]);

  const handleDownload = useCallback(() => {
    // Generate masked version of code for download
    const pythonCode = generateDisplayCode(nodes, edges);
    const blob = new Blob([pythonCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dotflow.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  // Python code execution handler
  const handleRunPython = useCallback(async () => {
    setIsExecuting(true);
    setError(null);
    setShowEditor(true);
    setOutput('Executing...'); // Set initial executing state
    
    try {
      // Generate code with real credentials for execution
      const executionCode = generateExecutionCode(nodes, edges);
      const response = await fetch('/api/python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: executionCode }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: { output: string } = await response.json();
      
      // Sanitize the output to remove sensitive information
      const sanitizedOutput = data.output
        .replace(/sk-proj-[a-zA-Z0-9-]+/g, '[API_KEY]')
        .replace(/asst_[a-zA-Z0-9]+/g, '[ASSISTANT_ID]');
      
      setOutput(sanitizedOutput);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      setOutput(errorMessage);
      console.error('Error running Python code:', err);
    } finally {
      setIsExecuting(false);
    }
  }, [nodes, edges]);

  // Authentication handlers
  const handleLogout = async () => {
    try {
      // Disconnect all connected wallets
      for (const wallet of wallets) {
        try {
          await wallet.disconnect();
        } catch (e) {
          console.error('Error disconnecting wallet:', e);
        }
      }
  
      // Clear all authentication related cookies and storage
      Cookies.remove('privy-authenticated', { path: '/' });
      localStorage.removeItem('useremail');
      localStorage.removeItem('privy:embedded-wallet:iframe-ready');
      localStorage.removeItem('privy:embedded-wallet:ready');
      await privyLogout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/';
    }
  };

  // Tooltip component for action buttons
  const IconWithTooltip: React.FC<{ children: React.ReactNode; tooltip: string }> = ({ children, tooltip }) => (
    <div className="group relative">
      {children}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-[#252525] text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-white/10">
        {tooltip}
      </div>
    </div>
  );

  // Action buttons configuration
  const actions = [
    { onClick: () => setShowNewFileDialog(true), tooltip: "New File", icon: <FilePlus2 size={19} /> },
    { onClick: handleDownload, tooltip: "Export as Python", icon: <FileCode size={19} /> },
    { onClick: handleRunPython, tooltip: "Run", icon: <SquareTerminal size={19} /> },
    { onClick: onTutorialClick, tooltip: "Tutorial", icon: <TvMinimalPlay size={19} /> },
  ];

  return (
    <div className="absolute top-3 right-3 left-0 z-50 p-2 flex justify-end items-center gap-2">
      {/* Action buttons */}
      <div className="flex items-center gap-3 bg-[#252525]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
        {actions.map((action, index) => (
          <React.Fragment key={index}>
            <button 
              onClick={action.onClick} 
              className="flex items-center gap-1 text-gray-300 hover:text-white text-sm transition-transform duration-200 hover:scale-105"
              disabled={action.tooltip === "Run" && isExecuting}
            >
              <IconWithTooltip tooltip={action.tooltip}>{action.icon}</IconWithTooltip>
            </button>
            {index < actions.length - 1 && <div className="w-px h-4 bg-gray-600/50" />}
          </React.Fragment>
        ))}
      </div>
      
      {/* Profile menu */}
      <div className="relative">
        <button 
          className="p-1.5 bg-[#252525]/80 backdrop-blur-md rounded-full transition-all duration-200 hover:scale-105 border border-white/5 flex items-center gap-1 pr-1.5 pl-3"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <div className='text-sm text-gray-300 mr-2 font-offbit'>
            {userName}
          </div>
          <Avatar style={{ width: '24px', height: '24px' }} {...avatarConfig} />
        </button>

        {showProfileMenu && (
          <div 
            className="absolute right-0 -mt-1 w-35 rounded-xl bg-[#252525]/90 backdrop-blur-md shadow-2xl py-2 border border-white/10 transform transition-all duration-200 ease-out hover:bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <button
              onClick={() => setShowLogoutDialog(true)}
              className="flex items-center w-full px-4 py-1 text-sm text-gray-300 hover:text-white transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Logout confirmation dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-[#252525]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
              Ready to leave?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 mt-2">
              Logging out will disconnect your wallets and end your current session. You can always log back in later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-[#333333]/50 text-white hover:bg-[#404040]/50 border border-white/5 px-5 rounded-xl transition-all duration-200 hover:scale-105">
              Stay
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 border-none px-5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* New file confirmation dialog */}
      <AlertDialog open={showNewFileDialog} onOpenChange={setShowNewFileDialog}>
        <AlertDialogContent className="bg-[#252525]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
              Create New File?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 mt-2">
              This will clear your current work. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-[#333333]/50 text-white hover:bg-[#404040]/50 border border-white/5 px-5 rounded-xl transition-all duration-200 hover:scale-105">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleNewFile}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 border-none px-5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Code editor modal */}
      <SlidingModal 
        isOpen={showEditor} 
        onClose={() => setShowEditor(false)}
        pythonCode={generateDisplayCode(nodes, edges)} 
        output={error || output}
        isExecuting={isExecuting} 
      />
    </div>
  );
};

export default UtilBar;
