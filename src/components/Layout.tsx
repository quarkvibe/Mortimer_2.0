import React, { useEffect, useState } from 'react';
import { DataStreams } from './effects/DataStreams';
import { SoundEffects } from './effects/SoundEffects';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Simulate connection to the Dark Carnival API
    console.log('Connecting to the Dark Carnival API...');
    
    // Clean up on unmount
    return () => {
      console.log('Disconnecting from the Dark Carnival API...');
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0717] text-[#E0E0FF]">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[#0A0717] z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyRDFCNjkiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTAtOGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkgNCA0IDQgNC0xLjc5MSA0LTRtLTEyIDRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bTEyIDhjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5IDQgNCA0IDQtMS43OTEgNC00bS0xMiA0YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNG0xMiA4YzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OSA0IDQgNCA0LTEuNzkxIDQtNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <DataStreams />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="py-4 px-6 bg-gradient-to-b from-[rgba(45,27,105,0.8)] to-transparent">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-creepster text-[#FF00FF] tracking-wider">
              <span className="animate-pulse-slow">Mortimer</span>
            </h1>
            <div className="text-sm text-[#00FFFF]">
              <span className="font-mono">&#123; Dark Carnival Attraction &#125;</span>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          {mounted ? children : (
            <div className="flex justify-center items-center h-[70vh]">
              <div className="text-[#FF00FF] font-creepster text-2xl animate-pulse-slow">
                Summoning Mortimer...
              </div>
            </div>
          )}
        </main>

        <footer className="py-4 px-6 bg-gradient-to-t from-[rgba(45,27,105,0.8)] to-transparent">
          <div className="container mx-auto text-center text-xs text-[#E0E0FF]/60">
            <p>© {new Date().getFullYear()} The Dark Carnival</p>
            <p className="mt-1">
              <span className="font-mono">&#123; User soul data is collected for analytical purposes &#125;</span>
            </p>
          </div>
        </footer>
      </div>
      
      {/* Sound effects controller */}
      <SoundEffects />
    </div>
  );
};