import { KeyboardArrowDown, KeyboardArrowLeft } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import rust from "react-syntax-highlighter/dist/cjs/languages/hljs/rust";
import typescript from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
import java from "react-syntax-highlighter/dist/cjs/languages/hljs/java";
import a11yDark from "react-syntax-highlighter/dist/cjs/styles/hljs/a11y-dark";
import a11yLight from "react-syntax-highlighter/dist/cjs/styles/hljs/a11y-light";

SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("java", java);

function CustomCodeTag({ children }: { children: string }) {
  return (
    <Typography component='code' fontFamily='monospace'>{children}</Typography>
  );
}


export default function MyCodeBlock({ children, language }: { children: string, language: string }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  let bgColor = theme.palette.background.paper;
  if (bgColor.length === 4) {
    bgColor = `#${bgColor[1]}${bgColor[1]}${bgColor[2]}${bgColor[2]}${bgColor[3]}${bgColor[3]}`;
  }
  const gradient = `linear-gradient(${bgColor}00, 50%, ${bgColor}FF)`;

  return (
    <Box
      borderRadius={2}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: open ? 'auto' : '8rem',
        width: '100%',
        mb: 2,
        mt: 2,
      }}
    >
      {/* Gradient overlay */}
      {open ? <></> : <Box sx={{ width: '100%', height: '100%', position: 'absolute', background: gradient, zIndex: 2}}/>}

      <IconButton size='large' sx={{position: 'absolute', zIndex: 3, top: 5, right: 5}} onClick={() => setOpen(!open)}>
        {open ? <KeyboardArrowDown /> : <KeyboardArrowLeft />}
      </IconButton>

      <SyntaxHighlighter
        language={language}
        showLineNumbers
        style={window.matchMedia("(prefers-color-scheme: dark)").matches ? a11yDark : a11yLight}
        customStyle={{
          paddingTop: '1rem',
          paddingBottom: '1rem',
          margin: 0,
          height: '100%',
          overflow: 'auto hidden',
        }}
        CodeTag={CustomCodeTag}
        lineNumberStyle={{ minWidth: '3.25em' }}
      >
        {/* {children} */}
        {open ? children : children.split("\n").slice(0, 4).join("\n")}
      </SyntaxHighlighter>
    </Box>
  );
}