import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Evidence } from './VaultContents';
import { X, ZoomIn } from 'lucide-react';
import { useState } from 'react';

interface EvidenceModalProps {
  evidence: Evidence;
  onClose: () => void;
}

const getEvidenceImage = (evidenceId: string): string => {
  const imageMap: Record<string, string> = {
    'map': '/lovable-uploads/97713266-aca7-4020-a898-aedb5a980645.png',
    'notebook': '/lovable-uploads/521965aa-3169-4843-afc8-ed10137be88d.png',
    'fabric': '/lovable-uploads/45015808-3dce-4f7a-8b30-165f4d13b4e1.png',
    'photo': '/lovable-uploads/eec87c7c-d54f-4a99-bdd7-b21bda166f6f.png',
    'papers': '/lovable-uploads/d39bc32a-e76e-4aab-b48e-9a810fbe5426.png',
    'envelope': '/lovable-uploads/cef73dbb-6cbf-45e5-be61-4ee41cdacc8a.png',
    'gold-pouch': '/lovable-uploads/bda2b6c5-db58-4822-a6c7-5b8102e592ba.png',
    'carlos-notes': '/lovable-uploads/c13156a0-bc46-4b31-b677-bc60829b59ca.png',
    'receipt': '/lovable-uploads/4eb951e1-0894-4dab-82ef-fa8f989516fa.png'
  };
  
  return imageMap[evidenceId] || '/lovable-uploads/bda2b6c5-db58-4822-a6c7-5b8102e592ba.png';
};

export const EvidenceModal = ({ evidence, onClose }: EvidenceModalProps) => {
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const handleImageClick = () => {
    console.log('Image clicked, setting zoom to true');
    setIsImageZoomed(true);
  };

  const handleCloseZoom = () => {
    console.log('Closing zoom');
    setIsImageZoomed(false);
  };

  return (
    <>
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
          <DialogDescription className="sr-only">
            Detalhes da evidência {evidence.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Evidence Image */}
          <div className="w-full h-64 bg-vault-interior border border-border rounded-lg overflow-hidden shadow-vault relative group">
            <img 
              src={getEvidenceImage(evidence.id)} 
              alt={evidence.name}
              className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
              onClick={handleImageClick}
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="bg-black/50 rounded-lg px-3 py-1">
                <span className="text-white text-sm font-medium">Clique para ampliar</span>
              </div>
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
      
      {/* Zoomed Image Overlay */}
      {isImageZoomed && (
        <div 
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
          onClick={handleCloseZoom}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseZoom}
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white border-none"
            >
              <X className="w-5 h-5" />
            </Button>
            <img 
              src={getEvidenceImage(evidence.id)} 
              alt={evidence.name}
              className="max-w-full max-h-full object-contain rounded-lg cursor-default"
            />
          </div>
        </div>
      )}
    </>
  );
};