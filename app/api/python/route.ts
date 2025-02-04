// app/api/python/route.ts

import { spawn } from 'child_process';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

type DebugData = {
  tempDir?: string;
  tempFile?: string;
  codeLength?: number;
} | string | Error | number | null | undefined;

function debugLog(message: string, data?: DebugData): void {
  console.log(`[Python Execute Debug] ${message}`, data || '');
}

async function executePython(code: string): Promise<string> {
  const tempDir = path.join(process.cwd(), 'temp');
  const tempFile = path.join(tempDir, `script_${Date.now()}.py`);
  
  debugLog('Execution started', {
    tempDir,
    tempFile,
    codeLength: code.length
  });

  try {
    // Create temp directory if it doesn't exist
    await fs.mkdir(tempDir, { recursive: true });
    debugLog('Temp directory created/verified');
    
    // Write Python code to temp file
    await fs.writeFile(tempFile, code, 'utf8');
    debugLog('Code written to temp file');

    // Create a .env file in the temp directory
    const envFile = path.join(tempDir, '.env');
    const envContent = `OPENAI_API_KEY=${process.env.OPENAI_API_KEY}\nOPENAI_ASSISTANT_ID=${process.env.OPENAI_ASSISTANT_ID}`;
    await fs.writeFile(envFile, envContent, 'utf8');
    debugLog('.env file created');

    return new Promise((resolve) => {
      // Spawn Python process
      const pythonProcess = spawn('python3', [tempFile], {
        env: {
          ...process.env,
          PYTHONPATH: tempDir // Add temp directory to Python path
        }
      });
      
      let output = '';
      let error = '';

      // Handle stdout
      pythonProcess.stdout.on('data', (data) => {
        const chunk = data.toString();
        output += chunk;
        debugLog('Received stdout chunk:', chunk);
      });

      // Handle stderr
      pythonProcess.stderr.on('data', (data) => {
        const chunk = data.toString();
        error += chunk;
        debugLog('Received stderr chunk:', chunk);
      });

      // Handle process errors
      pythonProcess.on('error', (err) => {
        debugLog('Process error:', err.message);
        resolve(output || err.message);
      });

      // Handle process completion
      pythonProcess.on('close', async (code) => {
        debugLog('Process closed with code:', code);
        
        try {
          // Clean up temporary files
          await fs.unlink(tempFile);
          await fs.unlink(envFile);
          debugLog('Temp files cleaned up');
        } catch (err) {
          debugLog('Failed to delete temp files:', err as Error);
        }
        
        resolve(output || error || 'No output received');
      });

      // Set execution timeout
      const timeoutDuration = 60000; // 1 minute timeout
      const timeout = setTimeout(() => {
        debugLog('Execution timed out, returning partial output');
        pythonProcess.kill();
        resolve(output || error || 'Execution timed out - Partial output');
      }, timeoutDuration);

      pythonProcess.on('close', () => {
        clearTimeout(timeout);
      });
    });
    
  } catch (err) {
    debugLog('File system error:', err as Error);
    throw err instanceof Error ? err : new Error('File system error');
  }
}

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    debugLog('Received code:', code);

    if (!code) {
      debugLog('Error: No code provided');
      return NextResponse.json(
        { error: 'No code provided' },
        { status: 400 }
      );
    }

    const output = await executePython(code);
    debugLog('Execution completed successfully:', output);
    return NextResponse.json({ output });
    
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = String(error.message);
    }
    
    debugLog('Route error:', errorMessage);
    return NextResponse.json(
      { output: errorMessage },
      { status: 200 }
    );
  }
}
