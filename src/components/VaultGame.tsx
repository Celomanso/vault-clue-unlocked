import { useState, useEffect } from 'react';
import { VaultOpening } from './vault/VaultOpening';
import { VaultContents } from './vault/VaultContents';

export type GameStage = 'vault-opening' | 'vault-contents';

export const VaultGame = () => {
  const [stage, setStage] = useState<GameStage>('vault-opening');
  
  const handleVaultUnlocked = () => {
    setStage('vault-contents');
  };

  const handleCloseVault = () => {
    setStage('vault-opening');
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Ambient lighting effect */}
      <div className="absolute inset-0 bg-gradient-lantern animate-flicker pointer-events-none" />
      
      {stage === 'vault-opening' && (
        <VaultOpening onUnlocked={handleVaultUnlocked} />
      )}
      
      {stage === 'vault-contents' && (
        <VaultContents onClose={handleCloseVault} />
      )}
    </div>
  );
};