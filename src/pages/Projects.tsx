import { Typography } from "@mui/material";
import ProjectCards from "../components/page/ProjectCards";
import Page from "../components/page/Page";



export default function Projects() {
  return (
    <Page>
      <Typography variant="h2">
        Projects
      </Typography>
      <ProjectCards />
    </Page>
  )
}
