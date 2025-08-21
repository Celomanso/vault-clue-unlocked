import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EvidenceModal } from './EvidenceModal';
import { ArrowLeft, FileText, Map, Camera, Scissors, Package, Mail, Sparkles, Clipboard, Receipt } from 'lucide-react';

interface VaultContentsProps {
  onClose: () => void;
}

export interface Evidence {
  id: string;
  name: string;
  description: string;
  details: string;
  icon: React.ReactNode;
}

const EVIDENCE_ITEMS: Evidence[] = [
  {
    id: 'map',
    name: 'Mapa Antigo',
    description: 'Mapa antigo com marcações recentes',
    details: 'Papel pergaminho do século XVIII, marcação recente no beco lateral do Centro de Pesquisa.',
    icon: <Map className="w-8 h-8" />
  },
  {
    id: 'notebook',
    name: 'Caderno de Eduardo',
    description: 'Anotações de Eduardo sobre investigação',
    details: 'Anotações sobre encontros com suspeitos. Última frase: "Confirmar testemunha da noite 18".',
    icon: <FileText className="w-8 h-8" />
  },
  {
    id: 'fabric',
    name: 'Fragmento de Tecido',
    description: 'Fragmento de tecido marrom com resíduos',
    details: 'Fragmento de lã marrom com resquícios de fita adesiva, compatível com a encontrada na janela.',
    icon: <Scissors className="w-8 h-8" />
  },
  {
    id: 'photo',
    name: 'Foto do Beco',
    description: 'Foto impressa do beco lateral às 21:05',
    details: 'Imagem noturna do beco lateral. Sombra de homem alto com casaco e capuz. 21:05 – 18/08/2024.',
    icon: <Camera className="w-8 h-8" />
  },
  {
    id: 'papers',
    name: 'Papéis Rasgados',
    description: 'Papéis com horários e palavras-chave',
    details: 'Anotações rasgadas: "21h – acesso lateral / 21h05 – entrada / 21h15 – janela fechada" e "fita – janela – beco".',
    icon: <Package className="w-8 h-8" />
  },
  {
    id: 'envelope',
    name: 'Envelope com Autorização',
    description: 'Documento oficial assinado por Helena',
    details: 'Envelope pardo contendo documento oficial assinado por Helena, autorizando Eduardo a acessar áreas restritas. Data de três meses antes do crime.',
    icon: <Mail className="w-8 h-8" />
  },
  {
    id: 'gold-pouch',
    name: 'Saquinho de Pó de Ouro',
    description: 'Pequeno saco com pó dourado e nome "Vicente"',
    details: 'Pequeno saco de tecido com resquícios de pó dourado. Etiqueta com a palavra "Vicente" escrita à mão.',
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    id: 'carlos-notes',
    name: 'Anotações',
    description: 'Folha pautada com cálculos e anotações',
    details: 'Folha de bloco pautado com cabeçalho do Centro de Pesquisa. Quatro colunas verticais, três preenchidas com números específicos, a quarta deixada em branco. Comentários na margem: "repartir pelo marcador" e "equilibrar antes do último". Cálculo resolvido com o número final da senha. Datada dois dias antes do crime.',
    icon: <Clipboard className="w-8 h-8" />
  },
  {
    id: 'receipt',
    name: 'Recibo de Fita Adesiva',
    description: 'Recibo de compra no nome de Paulo',
    details: 'Recibo de loja de ferragens com nome de Paulo e compra de fita adesiva industrial. Tipo e data não coincidem com a fita do crime.',
    icon: <Receipt className="w-8 h-8" />
  }
];

export const VaultContents = ({ onClose }: VaultContentsProps) => {
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Vault Interior Background */}
      <div className="absolute inset-0 bg-gradient-interior" />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto p-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="mx-auto w-16 h-16 rounded-full bg-vault-metal shadow-vault flex items-center justify-center">
            <Package className="w-8 h-8 text-lantern-light animate-glow-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-wider">
            CONTEÚDO DO COFRE
          </h1>
          <p className="text-muted-foreground text-lg">
            Clique nos itens para examinar as evidências
          </p>
        </div>

        {/* Evidence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {EVIDENCE_ITEMS.map((evidence, index) => (
            <div
              key={evidence.id}
              className="group cursor-pointer"
              onClick={() => setSelectedEvidence(evidence)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card border border-border rounded-lg p-6 shadow-vault hover:shadow-digital transition-all duration-300 hover:border-digital-glow/50 group-hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-vault-interior shadow-vault flex items-center justify-center text-lantern-light group-hover:text-digital-glow transition-colors duration-300">
                    {evidence.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-digital-glow transition-colors duration-300">
                    {evidence.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {evidence.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="text-center">
          <Button
            onClick={onClose}
            size="lg"
            className="bg-destructive/20 hover:bg-destructive/30 border border-destructive/50 text-destructive hover:text-destructive-foreground px-8 py-4 text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Fechar Cofre
          </Button>
        </div>
      </div>

      {/* Evidence Modal */}
      {selectedEvidence && (
        <EvidenceModal
          evidence={selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
        />
      )}
    </div>
  );
};