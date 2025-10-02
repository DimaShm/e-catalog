import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/shared/components/Toaster';
import Layout from '@/shared/components/Layout';
import CatalogPage from '@/pages/CatalogPage';
import AddProductPage from '@/pages/AddProductPage';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/catalog" replace />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
