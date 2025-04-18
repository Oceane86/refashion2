import React, { useState } from 'react';
import { Menu, Search, X, Eye } from 'lucide-react';

// Button component
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  fullWidth?: boolean;
  href?: string;
  onClick?: () => void;
  icon?: boolean;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  fullWidth = false,
  href,
  onClick,
  icon = false,
  active = false
}) => {
  const baseClasses = 'transition-colors duration-200 flex items-center justify-center';
  const variantClasses = active 
    ? 'bg-white text-black'
    : variant === 'outline' 
      ? 'border border-white text-white hover:bg-white hover:text-black' 
      : 'bg-black text-white hover:bg-black/90';
  const sizeClasses = icon ? 'w-10 h-10 p-0' : 'px-6 py-2.5';
  const widthClasses = fullWidth ? 'flex-1' : '';
  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} rounded-full`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

// ActionCard component
interface ActionCardProps {
  bgColor: string;
  textColor: string;
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  small?: boolean;
}

const ActionCard: React.FC<ActionCardProps> = ({
  bgColor,
  textColor,
  title,
  description,
  buttonText,
  buttonHref,
  small = false
}) => {
  return (
    <div 
      className={`w-full rounded-lg ${small ? 'p-4' : 'p-6'}`} 
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <h2 className={`${small ? 'font-medium mb-2' : 'text-2xl font-bold mb-2'}`}>
        {title}
      </h2>
      {description && <p className="mb-4 text-sm">{description}</p>}
      <Button 
        variant="default" 
        fullWidth 
        href={buttonHref}
      >
        {buttonText}
      </Button>
    </div>
  );
};

// MenuItem component
interface MenuItemProps {
  href: string;
  title: string;
  large?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, title, large = false }) => {
  return (
    <a 
      href={href} 
      className={`block ${large ? 'text-3xl font-bold' : 'text-lg'} hover:text-[#FF6B4E] transition-colors duration-200`}
    >
      {title}
    </a>
  );
};

// MenuSection component
interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, children }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm uppercase text-gray-400">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

// MobileMenu component
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'particulier' | 'pro';
  onSelectTab: (tab: 'particulier' | 'pro') => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, activeTab, onSelectTab }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black text-white z-50 overflow-y-auto transition-opacity duration-300 ease-in-out">
      <div className="px-6 py-4 flex justify-between items-center">
        <a href="/" className="font-bold text-xl text-white">
          Re_fashion
        </a>
        <button
          onClick={onClose}
          className="text-white transition-transform hover:rotate-90 duration-300"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 py-8 space-y-8">
        <div className="space-y-4">
          <MenuItem href="https://refashion.fr/reduire" title="Réduire" large />
          <MenuItem href="https://refashion.fr/reparer" title="Réparer" large />
          <MenuItem href="https://refashion.fr/reutiliser-mes-textiles-et-chaussures" title="Réutiliser" large />
          <MenuItem href="https://refashion.fr/recycler-mes-vetements-chaussures" title="Recycler" large />
        </div>

        <MenuSection title="À la une">
          <MenuItem href="https://refashion.fr/medias-et-actualites" title="Médias et actualités" />
        </MenuSection>

        <MenuSection title="Nos outils">
          <MenuItem href="https://refashion.fr/tutorials" title="Nos tutoriels" />
          <MenuItem href="https://refashion.fr/kit-jeunesse" title="Kit jeunesse" />
          <MenuItem href="https://faq.refashion.fr/hc/fr" title="Foire aux questions" />
          <MenuItem href="https://refashion.fr/trouver-un-point-de-collecte" title="Trouver un point de collecte" />
          <MenuItem href="https://refashion.fr/trouver-un-reparateur" title="Trouver un réparateur" />
        </MenuSection>

        {/* Affichage spécifique aux particuliers */}
        {activeTab === 'particulier' && (
          <div className="pt-6 space-y-4">
            <ActionCard 
              bgColor="#D2EDFF" 
              textColor="black"
              title="Rien ne se jette, tout se transforme"
              description="Triez, déposez : vos vêtements méritent une seconde chance !"
              buttonText="Je démarre mon tri"
              buttonHref="https://refashion.fr/trier-mes-vetements"
            />

            <ActionCard 
              bgColor="#E8F3F9" 
              textColor="black"
              title="Trouvez un point de collecte à côté de chez vous"
              buttonText="J'explore"
              buttonHref="https://refashion.fr/trouver-un-point-de-collecte"
              small
            />
            
            <ActionCard 
              bgColor="#FFE8E8" 
              textColor="black"
              title="On refait la mode"
              buttonText="Découvrir"
              buttonHref="https://refashion.fr/on-refait-la-mode"
              small
            />
          </div>
        )}

        <div className="flex gap-4 mb-6 pb-8">
          <Button 
            variant="outline" 
            fullWidth 
            active={activeTab === 'particulier'}
            onClick={() => onSelectTab('particulier')}
          >
            Particulier
          </Button>
          <Button 
            variant="outline" 
            fullWidth 
            active={activeTab === 'pro'}
            onClick={() => onSelectTab('pro')}
          >
            Pro
          </Button>
          <Button variant="outline" icon>
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface NavbarProps {
  onSelectTab?: (tab: 'particulier' | 'pro') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSelectTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'particulier' | 'pro'>('particulier');

  const handleTabClick = (tab: 'particulier' | 'pro') => {
    setActiveTab(tab);
    onSelectTab?.(tab);
  };

  return (
    <>
      <header className="sticky top-0 z-10 bg-[#FAF4F2] px-4 py-4 flex justify-between items-center shadow-sm">
        <a href="/" className="font-bold text-xl">
          <span className="font-sans">Re_fashion</span>
        </a>

        <div className="flex items-center space-x-2">
          <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center transition-transform hover:scale-105">
            <Search className="w-5 h-5 text-white" />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center transition-transform hover:scale-105"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        activeTab={activeTab}
        onSelectTab={handleTabClick}
      />
    </>
  );
};

export default Navbar;
