import { ReactNode, useState } from "react";
import { Box } from "@mui/material";
import NavigationDrawer, { drawerWidth, HeadingLink } from "./NavigationDrawer";
import { pages, languages } from "../../main"
import { NavBar } from "../common/Navbar";
import './Page.css';


export default function Page({ headings, children }: { headings?: HeadingLink[], children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  if (headings === undefined) {
    return (
      <Box sx={{ width: { xs: '100%', sm: '80%', md: '60%'}, margin: 'auto' }}>
        <NavBar drawer={false} pages={pages} languages={languages} handleDrawerToggle={() => {}} />
        <Box display='flex'>
          <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
            <Box padding={2}>
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <NavBar drawer={true} pages={pages} languages={languages} handleDrawerToggle={handleDrawerToggle} />
      <Box display='flex'>
        <NavigationDrawer headings={headings} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isClosing={isClosing} setIsClosing={setIsClosing}/>
        <Box 
          component="main"
          sx={{ flexGrow: 1, width: { xs: '100vw', sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Box paddingTop={2} paddingLeft={8} paddingRight={8}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}