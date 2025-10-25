import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getShopifyCollections } from '../data/shopifyCollections';
import { ChevronDown, Grid3x3, Sparkles, Gift, TreePine, Star } from 'lucide-react';

const CategoryFilter = ({ selectedCategory, onCategoryChange, onCollectionSelect }) => {
  const { t } = useTranslation();
  const { category } = useParams();
  const [collections, setCollections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadCollections = async () => {
      const cols = await getShopifyCollections();
      
      // Filter collections based on current category
      const filtered = cols.filter(col => {
        const title = col.title.toLowerCase();
        const handle = col.handle.toLowerCase();
        
        if (category === 'julepynt') {
          // Show ALL collections for julepynt (everything is Christmas related)
          return true;
        } else {
          // For gaver, show only specific gift-related collections
          // Only show if explicitly tagged as "gave" or "gift"
          return title.includes('gave') || 
                 title.includes('gift') ||
                 handle.includes('gave') ||
                 handle.includes('gift');
        }
      });
      
      setCollections(filtered);
    };
    loadCollections();
  }, [category]);

  const defaultCategories = [
    { handle: 'all', title: t('category.all'), icon: Grid3x3 },
  ];

  const allCategories = [...defaultCategories, ...collections.map(col => ({
    ...col,
    icon: getCollectionIcon(col.title)
  }))];

  const handleSelect = (cat) => {
    if (cat.handle === 'all') {
      onCategoryChange('all');
    } else {
      // Pass both handle and full collection object
      onCollectionSelect && onCollectionSelect(cat);
      onCategoryChange(cat.handle);
    }
    setIsOpen(false);
  };

  // Helper function to get appropriate icon based on collection name
  function getCollectionIcon(title) {
    const lower = title.toLowerCase();
    if (lower.includes('træ') || lower.includes('tree')) return TreePine;
    if (lower.includes('gave') || lower.includes('gift')) return Gift;
    if (lower.includes('stjerne') || lower.includes('star')) return Star;
    return Sparkles;
  }

  const currentCategory = allCategories.find(c => c.handle === selectedCategory) || allCategories[0];
  const CurrentIcon = currentCategory.icon || Grid3x3;

  return (
    <div className="mb-0">
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-5 py-3 bg-white border-2 border-zinc-200 rounded-xl hover:border-zinc-900 hover:shadow-md transition-all duration-200 min-w-[200px]"
        >
          <CurrentIcon className="w-5 h-5 text-zinc-700" />
          <span className="font-semibold text-zinc-900 flex-1 text-left">
            {currentCategory.title}
          </span>
          <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 bg-white border-2 border-zinc-200 rounded-xl shadow-2xl py-2 min-w-[280px] max-h-[450px] overflow-y-auto z-20">
              <div className="px-3 py-2 border-b border-zinc-100">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                  {t('category.filter')}
                </p>
              </div>
              
              {allCategories.map(cat => {
                const Icon = cat.icon || Grid3x3;
                const isSelected = selectedCategory === cat.handle;
                
                return (
                  <button
                    key={cat.handle}
                    onClick={() => handleSelect(cat)}
                    className={`w-full px-4 py-3 text-left hover:bg-zinc-50 transition-all duration-150 flex items-center gap-3 group ${
                      isSelected ? 'bg-zinc-100' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors ${
                      isSelected 
                        ? 'bg-zinc-900 text-white' 
                        : 'bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-sm flex-1 ${
                      isSelected ? 'font-semibold text-zinc-900' : 'text-zinc-700'
                    }`}>
                      {cat.title}
                    </span>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-zinc-900" />
                    )}
                  </button>
                );
              })}
              
              <div className="px-4 py-3 mt-2 border-t border-zinc-100 bg-zinc-50">
                <p className="text-xs text-zinc-500">
                  {collections.length} {collections.length === 1 ? 'kollektion' : 'kollektioner'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
