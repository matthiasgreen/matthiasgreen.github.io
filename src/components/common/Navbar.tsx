import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { IconButton, Stack, styled } from '@mui/material';
import { Language, Menu as MenuIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { drawerWidth } from '../page/NavigationDrawer';
import { GithubLink, LinkedInLink } from './LogoLinks';



export interface Page {
  name: string;
  link: string;
  subpages?: Page[];
}

export interface NavBarProps {
  pages: Page[];
  languages: {
    name: string;
    code: string;
  }[];
  handleDrawerToggle: () => void;
  drawer: boolean;
}

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export function NavBar({ drawer, pages, languages, handleDrawerToggle }: NavBarProps) {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseLanguageMenu = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <AppBar
        position='fixed'
        sx={
          drawer ? (
            { width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }
          ) : (
            { width: { xs: '100%', sm: '80%', md: '60%' }, left: { xs: 0, sm: "10%", md: '20%' } }
          )
        }
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: drawer ? { sm: 'none' } : 'none' }}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                color="inherit"
                size='large'
                onClick={handleOpenLanguageMenu}
              >
                <Language />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseLanguageMenu}
              >
                {languages.map((language, index) => (
                  <MenuItem key={index} onClick={() => {
                    i18n.changeLanguage(language.code);
                    handleCloseLanguageMenu();
                  }}>
                    <Typography sx={{ textAlign: 'center' }}>{language.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>

              {pages.map((page, index) => (
                <Button key={index} href={page.link} color='inherit'>
                  {page.name}
                </Button>
              ))}
            </Box>
            <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
              <GithubLink page="matthiasgreen" color="inherit" />
              <LinkedInLink page="matthias-green" />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Offset />
    </>
  );
}
