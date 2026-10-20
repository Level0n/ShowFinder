import { BrowserRouter, Routes, Route } from 'react-router'

import { createRoot } from 'react-dom/client'

import { StartPage } from './TSX/StartPage';
import { RootLayout } from './TSX/RootLayout';
import { FoundFilm } from './TSX/FoundFilm';
import { ShowPage } from './TSX/ShowPage';
import { ErrorPage } from './TSX/ErrorPage';

import './style/index.css';
import './style/fonts.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter  basename="/ShowFinder">
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<StartPage />} />
        <Route path=':pageId' element={<StartPage />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='search/:searchParam' element={<FoundFilm />} />
        <Route path='show/:showId' element={<ShowPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)