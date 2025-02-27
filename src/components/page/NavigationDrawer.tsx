import { Box, Drawer, List, ListItemButton, ListItemText, ListSubheader, } from "@mui/material";

export interface HeadingLink {
  headingNumber: number;
  headingText: string;
  link: string;
  subHeadings?: HeadingLink[];
}

interface NavigationDrawerProps {
  headings: HeadingLink[];
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  isClosing: boolean;
  setIsClosing: (closing: boolean) => void;
}

function RecursizeRenderHeadings({ heading, setMobileOpen }: { heading: HeadingLink, setMobileOpen: (open: boolean) => void }) {
  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: 3,
        }}
        href={heading.link}
        onClick={() => setMobileOpen(false)}
      >
        <ListItemText primary={heading.headingText} />
      </ListItemButton>
      {heading.subHeadings && (
        <List dense sx={{ pl: 2, pt: 0, pb: 0 }}>
          {heading.subHeadings.map((subHeading, index) => (
            <RecursizeRenderHeadings key={index} heading={subHeading} setMobileOpen={setMobileOpen} />
          ))}
        </List>
      )}
    </>
  );
}

function NavigationDrawerContents({ headings, setMobileOpen }: {headings: HeadingLink[], setMobileOpen: (open: boolean) => void}) {
  return (
    <List
      subheader={
        <ListSubheader component="div">
          Contents
        </ListSubheader>
      }
      sx={{
        padding: 2,
      }}
      dense
    >
      {headings.map((heading, index) => (
        <RecursizeRenderHeadings key={index} heading={heading} setMobileOpen={setMobileOpen} />
      ))}
    </List>
  );
}

export const drawerWidth = 240;

export default function NavigationDrawer({ headings, mobileOpen, setMobileOpen, isClosing, setIsClosing }: NavigationDrawerProps) {
  
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };  

  const drawer = <NavigationDrawerContents headings={headings} setMobileOpen={setMobileOpen} />;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="Page navigation drawer"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={window.document.body}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          height: '100%'
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          height: '100%'
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}