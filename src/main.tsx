import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home'
import { HashRouter, Routes, Route, LinkProps as RouterLinkProps } from 'react-router'
import { HashLink as RouterLink } from 'react-router-hash-link'
import './i18n'
import About from './pages/About'
import ChessProject from './pages/chess/ChessProject'
import FourierProject from './pages/fourier/FourierProject'
import { createTheme, CssBaseline, LinkProps, responsiveFontSizes, ThemeProvider } from '@mui/material'
import React from 'react'
import Projects from './pages/Projects'

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink smooth ref={ref} to={href} {...other} />;
});


let theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiListItemButton: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  colorSchemes: {
    light: true,
    dark: true
  },
  // typography: {
    // h1: {
    //   fontSize: '4rem',
    //   fontWeight: 'bold',
    //   lineHeight: 2
    // },
    // h2: {
    //   fontSize: '2rem',
    //   fontWeight: 'bold',
    //   lineHeight: 2
    // }
  // }
});

theme = responsiveFontSizes(theme, {
  factor: 2.5
})

export const pages = [
  { name: 'Home', link: '/', element: <Home /> },
  { name: 'About', link: '/about', element: <About /> },
  {
    name: 'Projects', link: '/projects', element: <Projects />, subpages: [
      { name: 'Chess Engine', link: 'chess-engine', element: <ChessProject /> },
      { name: 'Fourier Doodle', link: 'fourier-doodle', element: <FourierProject /> }
    ]
  }
]

export const languages = [
  { name: 'English', code: 'en' },
  // { name: 'French', code: 'fr' }
]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme  />
      <HashRouter>
        <Routes>
          {pages.map((page, index) => (
            <Route key={index} path={page.link}>
              <Route index element={<>{page.element}</>} />
              {page.subpages && page.subpages.map((subpage, index) => (
                <Route key={index} path={subpage.link} element={<>{subpage.element}</>} />
              ))}
            </Route>
          ))}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
)
