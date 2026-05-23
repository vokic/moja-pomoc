import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LangProvider } from '@/lib/lang-context';
import { ThemeProvider } from '@/lib/theme-context';
import { PageShell } from '@/components/layout';
import { CatalogProvider } from '@/hooks/useCatalog';
import { ProfileProvider } from '@/hooks/useProfile';
import { HomePage } from '@/pages/HomePage';
import { WizardPage } from '@/pages/WizardPage';
import { SearchPage } from '@/pages/SearchPage';
import { ResultsPage } from '@/pages/ResultsPage';
import { AboutPage } from '@/pages/AboutPage';
import { SupportPage } from '@/pages/SupportPage';
import { PravoDetailPage } from '@/pages/PravoDetailPage';

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <CatalogProvider>
          <ProfileProvider>
            <BrowserRouter>
              <PageShell>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/wizard" element={<WizardPage />} />
                  <Route path="/pretraga" element={<SearchPage />} />
                  <Route path="/rezultati" element={<ResultsPage />} />
                  <Route path="/pravo/:id" element={<PravoDetailPage />} />
                  <Route path="/o-projektu" element={<AboutPage />} />
                  <Route path="/podrska" element={<SupportPage />} />
                  <Route path="/podrzite" element={<Navigate to="/podrska" replace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </PageShell>
            </BrowserRouter>
          </ProfileProvider>
        </CatalogProvider>
      </LangProvider>
    </ThemeProvider>
  );
}

export default App;
