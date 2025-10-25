import { Typography } from "@mui/material";

export function H1({ children, ...props }: { children: React.ReactNode;[key: string]: any }) {
  return <Typography variant="h1" sx={{ mt: 2 }} {...props}>{children}</Typography>
}

export function H2({ children, ...props }: { children: React.ReactNode;[key: string]: any }) {
  return <Typography variant="h2" sx={{ mt: 2 }} {...props}>{children}</Typography>
}

export function H3({ children, ...props }: { children: React.ReactNode;[key: string]: any }) {
  return <Typography variant="h3" sx={{ mt: 2 }} {...props}>{children}</Typography>
}

export function H4({ children, ...props }: { children: React.ReactNode;[key: string]: any }) {
  return <Typography variant="h4" sx={{ mt: 2 }} {...props}>{children}</Typography>
}
