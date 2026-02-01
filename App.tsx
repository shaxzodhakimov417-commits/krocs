
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroOverlay from './components/IntroOverlay';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import { useStore } from './store/useStore';

const App: React.FC = () => {
  const store = useStore();
  const { introFinished, setIntroFinished, currentPage } = store;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home store={store} />;
      case 'collections':
        return <Collections store={store} />;
      case 'product':
        return <ProductDetail store={store} />;
      case 'about':
        return <About />;
      default:
        return <Home store={store} />;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!introFinished && (
          <IntroOverlay key="intro" onFinish={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {introFinished && (
          <Layout key="main" store={store}>
            {renderPage()}
          </Layout>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
