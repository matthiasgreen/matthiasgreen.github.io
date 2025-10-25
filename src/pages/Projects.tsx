import { Typography } from "@mui/material";
import ProjectCards from "../components/page/ProjectCards";
import { SimplePage } from "../components/page/Page";

export default function Projects() {
  return (
    <SimplePage>
      <Typography variant="h2">
        Projects
      </Typography>
      <ProjectCards />
    </SimplePage>
  )
}
