import { Link, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <header>
        <nav className="bg-white shadow-sm border-b border-gray-200" role="navigation" aria-label={t('Main navigation')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/catalog" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
                <img src="/icons/package.svg" alt="E-Catalog" className="w-6 h-6" />
                <span>{t('E-Catalog')}</span>
              </Link>

              <div className="hidden md:flex space-x-4">
                <Link
                  to="/catalog"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/catalog'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  {t('Catalog')}
                </Link>
                <Link
                  to="/add-product"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/add-product'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  {t('Add Product')}
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  i18n.language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage('uk')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  i18n.language === 'uk'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                UA
              </button>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  i18n.language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage('uk')}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  i18n.language === 'uk'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                UA
              </button>
              <Link
                to="/add-product"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      </header>

      <main role="main" className="flex-1">{children}</main>

      <footer className="bg-white border-t border-gray-200" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2025 {t('E-Catalog')}. {t("Dmytro Shmahin's test task")}.
          </p>
        </div>
      </footer>
    </div>
  );
}
