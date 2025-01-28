import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
import { HashRouter, Routes, Route } from 'react-router'
import './i18n'
import Page from './components/page/Page'
import About from './pages/About'
import ChessProject from './pages/chess/ChessProject'
import FourierProject from './pages/fourier/FourierProject'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/about" element={<Page><About /></Page>} />
        <Route path="/projects/chess-engine" element={<Page><ChessProject /></Page>} />
        <Route path="/projects/fourier-doodle" element={<Page><FourierProject /></Page>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
