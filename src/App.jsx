import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header            from './components/Header';
import Footer            from './components/Footer';
import QuickAssistChatbot from './components/QuickAssistChatbot';
import Home              from './pages/Home';
import Exam              from './pages/Exam';
import Results           from './pages/Results';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-ktu-light">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/"        element={<Home />}    />
            <Route path="/exam"    element={<Exam />}    />
            <Route path="/results" element={<Results />} />
            {/* Catch-all redirect to home */}
            <Route path="*"        element={<Home />}    />
          </Routes>
        </main>
        <Footer />
        <QuickAssistChatbot />
      </div>
    </HashRouter>
  );
}
