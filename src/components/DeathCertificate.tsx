import React from 'react';
import { Skull } from 'lucide-react';

interface DeathCertificateProps {
  predictionData: any;
}

export const DeathCertificate: React.FC<DeathCertificateProps> = ({ predictionData }) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Certificate background */}
      <div className="relative bg-[#120B29] border-4 border-[#2D1B69] rounded-lg p-8 overflow-hidden">
        {/* Decorative border */}
        <div className="absolute inset-0 border-[8px] border-[#120B29] rounded-lg"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgdHJhbnNmb3JtPSJzY2FsZSgwLjMpIj48cGF0aCBkPSJNMCAwaDEwdjEwSDB6TTEwIDBoMTB2MTBIMTB6TTAgMTBoMTB2MTBIMHpNMTAgMTBoMTB2MTBIMTBNMjAgMGgxMHYxMEgyMHpNMzAgMGgxMHYxMEgzMHpNMjAgMTBoMTB2MTBIMjB6TTMwIDEwaDEwdjEwSDMwek00MCAwaDEwdjEwSDQwek01MCAwaDEwdjEwSDUwek00MCAxMGgxMHYxMEg0MHpNNTAgMTBoMTB2MTBINTAiIGZpbGw9IiNGRjAwRkYiLz48L2c+PC9zdmc+')] opacity-50"></div>
        </div>
        
        {/* Certificate content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-2">
              <Skull size={32} className="text-[#FF00FF]" />
            </div>
            <h2 className="text-3xl font-creepster text-[#FF00FF] tracking-widest uppercase mb-1">
              Certificate of Predicted Death
            </h2>
            <div className="text-sm font-mono text-[#00FFFF] mb-3">
              THE DARK CARNIVAL OFFICIAL DOCUMENT
            </div>
            <div className="mx-auto w-4/5 h-px bg-gradient-to-r from-transparent via-[#FF00FF] to-transparent"></div>
          </div>
          
          {/* Main content */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-mono text-[#00FFFF] mb-1">NAME OF DECEASED (TO BE)</h3>
                  <p className="text-xl text-[#E0E0FF]">{predictionData.name}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-mono text-[#00FFFF] mb-1">AGE AT DEATH</h3>
                  <p className="text-xl text-[#E0E0FF]">{predictionData.deathAge}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-mono text-[#00FFFF] mb-1">LOCATION OF DEMISE</h3>
                  <p className="text-xl text-[#E0E0FF]">{predictionData.deathLocation}</p>
                </div>
              </div>
              
              {/* Right column */}
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-mono text-[#00FFFF] mb-1">PREDICTED DATE OF DEATH</h3>
                  <p className="text-xl text-[#E0E0FF]">{predictionData.deathDate}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-mono text-[#00FFFF] mb-1">MANNER OF DEATH</h3>
                  <p className="text-xl text-[#E0E0FF]">{predictionData.deathType}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-mono text-[#00FFFF] mb-1">PROBABILITY</h3>
                  <p className="text-xl text-[#E0E0FF]">{predictionData.probability}%</p>
                </div>
              </div>
            </div>
            
            {/* Description of death */}
            <div className="mt-4">
              <h3 className="text-sm font-mono text-[#00FFFF] mb-1">DESCRIPTION OF DEMISE</h3>
              <p className="text-[#E0E0FF]/90 border border-[#2D1B69] bg-[#0A0717]/50 p-3 rounded">
                {predictionData.predictionText}
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center">
            <div className="mx-auto w-4/5 h-px bg-gradient-to-r from-transparent via-[#FF00FF] to-transparent mb-4"></div>
            
            <div className="flex justify-between items-center">
              <div className="text-left">
                <div className="text-sm font-mono text-[#00FFFF]">CERTIFICATE ID</div>
                <div className="text-xs text-[#E0E0FF]/70">MRT-{predictionData.id.toString().padStart(6, '0')}</div>
              </div>
              
              <div className="text-center">
                <div className="font-creepster text-[#FF00FF] text-xl">Mortimer</div>
                <div className="text-xs text-[#E0E0FF]/70 font-mono">DIGITAL NECROMANCER</div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-mono text-[#00FFFF]">ISSUED ON</div>
                <div className="text-xs text-[#E0E0FF]/70">{new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Certificate seal/shadow */}
      <div className="absolute -inset-1 rounded-lg bg-[#FF00FF]/10 filter blur-lg -z-10"></div>
    </div>
  );
};