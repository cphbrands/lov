import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Breadcrumbs = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbNameMap = {
    'kategori': t('breadcrumb.categories'),
    'julepynt': t('category.julepynt.title'),
    'gaver': t('category.gaver.title'),
    'produkt': t('breadcrumb.product'),
    'kurv': t('breadcrumb.cart'),
    'onskeliste': t('breadcrumb.wishlist'),
    'nyheder': t('nav.nyheder')
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="bg-zinc-50 border-b border-zinc-200">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link to="/" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              {t('breadcrumb.home')}
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = breadcrumbNameMap[name] || decodeURIComponent(name);

            return (
              <li key={name} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-zinc-400" />
                {isLast ? (
                  <span className="text-zinc-900 font-medium">{displayName}</span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
