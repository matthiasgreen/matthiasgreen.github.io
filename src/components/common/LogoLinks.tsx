import { Button, Link } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

export function GithubLink({text, page, ...props }: { text?: string, page: string; [key: string]: any }) {
  if (text) {
    return (
      <Button variant='outlined' startIcon={<GitHub/>} href={"https://github.com/" + page} {...props}>
        {text}
      </Button>
    );
  }
  return (
    <Link href={"https://github.com/" + page} color='inherit'>
      <GitHub sx={{ width: 32, height: 32 }} {...props}/>
    </Link>
  );
}

export function LinkedInLink({ page }: { page: string }) {
  return (
    <Link href={"https://www.linkedin.com/in/" + page} color='inherit'>
      <LinkedIn sx={{ width: 32, height: 32 }}/>
    </Link>
  );
}