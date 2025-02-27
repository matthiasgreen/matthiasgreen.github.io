import { KeyboardArrowDown, KeyboardArrowLeft } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { a11yDark, a11yLight, CodeBlock } from "react-code-blocks";

export default function MyCodeBlock({ children, language }: { children: string, language: string }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  let bgColor = theme.palette.background.paper;
  if (bgColor.length === 4) {
    bgColor = `#${bgColor[1]}${bgColor[1]}${bgColor[2]}${bgColor[2]}${bgColor[3]}${bgColor[3]}`;
  }
  const gradient = `linear-gradient(${bgColor}00, 50%, ${bgColor}FF)`;

  return (
    <Box sx={{
      position: 'relative',
      overflow: 'hidden',
      height: open ? 'auto' : '8rem',
      width: '100%',
      borderBottomLeftRadius: !open ? 20 : undefined,
      borderBottomRightRadius: !open ? 20 : undefined,
      mb: 2,
      mt: 2
    }}>
      {/* Gradient overlay */}
      {open || <Box sx={{ width: '100%', height: '100%', position: 'absolute', background: gradient, zIndex: 2}}/>}

      <IconButton size='large' sx={{position: 'absolute', zIndex: 3, top: 1, right: 1}} onClick={() => setOpen(!open)}>
        {open ? <KeyboardArrowDown /> : <KeyboardArrowLeft />}
      </IconButton>
      <Typography component="div" style={{ fontFamily: "monospace" }}>
        <CodeBlock
          text={open ? children : children.split("\n").slice(0, 4).join("\n")}
          language={language}
          theme={window.matchMedia("(prefers-color-scheme: dark)").matches ? a11yDark : a11yLight}
        />
      </Typography>
    </Box>
  );
}