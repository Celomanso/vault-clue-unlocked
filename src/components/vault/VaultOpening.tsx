import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Lock } from 'lucide-react';

interface VaultOpeningProps {
  onUnlocked: () => void;
}

const CORRECT_PASSWORD = '4754';

export const VaultOpening = ({ onUnlocked }: VaultOpeningProps) => {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleNumberClick = (num: string) => {
    if (password.length < 4) {
      setPassword(prev => prev + num);
      setShowError(false);
    }
  };

  const handleClear = () => {
    setPassword('');
    setShowError(false);
  };

  const handleSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      setIsUnlocking(true);
      // Play unlock sound effect
      playUnlockSound();
      setTimeout(onUnlocked, 1500);
    } else {
      setShowError(true);
      setPassword('');
      // Trigger error animation
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const playUnlockSound = () => {
    // Create audio context for mechanical clicking sound
    if (typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined') {
      const AudioCtx = AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioCtx();
      
      // Create mechanical click sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  };

  useEffect(() => {
    if (password.length === 4) {
      handleSubmit();
    }
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Vault Door Background */}
      <div className="absolute inset-0 bg-gradient-vault" />
      
      {/* Main Vault Interface */}
      <div className="relative z-10 text-center space-y-8 animate-fade-in-up">
        {/* Vault Header */}
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-vault-metal shadow-vault flex items-center justify-center">
            <Lock className="w-10 h-10 text-lantern-light animate-glow-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-wider">
            COFRE DE EVIDÊNCIAS
          </h1>
          <p className="text-muted-foreground text-lg">
            Digite a senha de 4 dígitos para acessar
          </p>
        </div>

        {/* Digital Display */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-vault max-w-md mx-auto">
          <div className="space-y-6">
            {/* Password Display */}
            <div className="bg-input rounded-lg p-4 border-2 border-digital-glow shadow-digital">
              <div className="flex justify-center space-x-4">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded border-2 flex items-center justify-center text-2xl font-mono font-bold
                      ${password.length > index 
                        ? 'border-digital-glow bg-digital-glow/10 text-digital-glow animate-glow-pulse' 
                        : 'border-muted bg-muted/50 text-muted-foreground'
                      }
                      ${showError ? 'animate-error-flash' : ''}
                    `}
                  >
                    {password.length > index ? '●' : ''}
                  </div>
                ))}
              </div>
            </div>

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  size="lg"
                  onClick={() => handleNumberClick(num.toString())}
                  className="h-14 text-xl font-mono bg-secondary hover:bg-secondary/80 border-border hover:border-digital-glow/50 transition-all duration-200"
                  disabled={isUnlocking}
                >
                  {num}
                </Button>
              ))}
              <Button
                variant="outline"
                size="lg"
                onClick={handleClear}
                className="h-14 text-lg bg-destructive/20 hover:bg-destructive/30 border-destructive/50 text-destructive"
                disabled={isUnlocking}
              >
                CLR
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNumberClick('0')}
                className="h-14 text-xl font-mono bg-secondary hover:bg-secondary/80 border-border hover:border-digital-glow/50 transition-all duration-200"
                disabled={isUnlocking}
              >
                0
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSubmit}
                className="h-14 text-lg bg-primary/20 hover:bg-primary/30 border-primary/50 text-primary"
                disabled={password.length !== 4 || isUnlocking}
              >
                OK
              </Button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {showError && (
          <Alert className="max-w-lg mx-auto border-error-glow bg-error-glow/10 animate-fade-in-up">
            <AlertTriangle className="h-4 w-4 text-error-glow" />
            <AlertDescription className="text-foreground">
              O cofre permanece fechado. Talvez nem todo número encontrado entre na conta… 
              a ordem e a regra importam mais que a quantidade.
            </AlertDescription>
          </Alert>
        )}

        {/* Unlocking Animation */}
        {isUnlocking && (
          <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 animate-fade-in-up">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-digital-glow border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xl font-semibold text-digital-glow">
                Acessando cofre...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};