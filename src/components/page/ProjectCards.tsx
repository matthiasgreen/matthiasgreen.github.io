import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import chessIcon from "../../assets/chess-icon.svg";
import fourierIcon from "../../assets/fourier-icon.svg";
import chatIcon from "../../assets/chat-icon.svg";
import { GithubLink } from "../common/LogoLinks";
import { Description } from "@mui/icons-material";

const projects: ProjectCard[] = [
  {
    title: "Chess engine",
    description: "A chess engine written from scratch in Rust.",
    image: chessIcon,
    link: "/projects/chess-engine",
    githubUrl: "matthiasgreen/chess-engine"
  },
  {
    title: "Fourier Doodle",
    description: "A Fourier series visualizer.",
    image: fourierIcon,
    link: "/projects/fourier-doodle",
    githubUrl: "matthiasgreen/fourier-animation"
  },
  {
    title: "Chat system",
    description: "A peer-to-peer messaging system.",
    image: chatIcon,
    link: "/projects/chat-system",
    githubUrl: "matthiasgreen/chatsystem"
  }
]


interface ProjectCard {
  title: string;
  description: string;
  image: string;
  link: string;
  githubUrl: string;
}

export default function ProjectCards() {
  return (
    <Box sx={{ marginTop: 5, flexDirection: 'row', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      {projects.map((project, index) => (
        <Card variant="outlined" key={index} sx={{maxWidth: '200px'}}>
          <CardActionArea
            href={project.link}
          >
            <CardMedia
              component="img"
              image={project.image}
              alt={project.title}
              sx={{padding: '1rem', aspectRatio: '1/1'}}
            />
            <CardContent>
              <Typography variant="h5">{project.title}</Typography>
              <Typography>{project.description}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Stack spacing={1}>
              <Button variant="outlined" startIcon={<Description/>} href={project.link}> 
                View blog post
              </Button>
              <GithubLink page={project.githubUrl} text="View on Github" />
            </Stack>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}