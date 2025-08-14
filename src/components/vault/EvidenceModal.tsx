import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Evidence } from './VaultContents';
import { X } from 'lucide-react';

interface EvidenceModalProps {
  evidence: Evidence;
  onClose: () => void;
}

export const EvidenceModal = ({ evidence, onClose }: EvidenceModalProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border shadow-vault">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-vault-interior shadow-vault flex items-center justify-center text-digital-glow">
                {evidence.icon}
              </div>
              {evidence.name}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Evidence Image Placeholder */}
          <div className="w-full h-64 bg-vault-interior border border-border rounded-lg flex items-center justify-center shadow-vault">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-vault-metal shadow-vault flex items-center justify-center text-lantern-light">
                {evidence.icon}
              </div>
              <p className="text-muted-foreground text-sm">
                Imagem da evidência
              </p>
            </div>
          </div>
          
          {/* Evidence Details */}
          <div className="bg-vault-interior border border-border rounded-lg p-6 shadow-vault">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-digital-glow animate-glow-pulse"></div>
              Análise Detalhada
            </h3>
            <p className="text-foreground leading-relaxed">
              {evidence.details}
            </p>
          </div>
          
          {/* Investigation Notes */}
          <div className="bg-secondary border border-border rounded-lg p-4 shadow-vault">
            <h4 className="text-sm font-semibold text-accent mb-2 uppercase tracking-wider">
              Nota da Investigação
            </h4>
            <p className="text-muted-foreground text-sm italic">
              Evidência catalogada e preservada para análise forense adicional.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button
            onClick={onClose}
            className="bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary"
          >
            Continuar Investigação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};