import ProjectCards from "../components/page/ProjectCards";
import { useTranslation } from "react-i18next";
import { Alert, AlertTitle, Box, Button, Link, Typography } from "@mui/material";
import { SimplePage } from "../components/page/Page";
import photo from "/IMG_2430.webp";
import cv from "/CV Matthias Green.pdf";
import { Article } from "@mui/icons-material";
import ImageCard from "../components/page/ImageCard";

function DownloadCVButton() {
  return (
    <Box display='flex' justifyContent='center'>
      <Button
        size="large"
        variant="contained"
        startIcon={<Article />}
        onClick={() => window.open(cv)}
      >
        Download my CV
      </Button>
    </Box>
  )
}

export default function Home() {
  const { t } = useTranslation("homePage");

  return (
    <SimplePage>
      <Alert severity="info" variant="filled">
        <AlertTitle>{t("wip")}</AlertTitle>
        {t("wipDetails")}
      </Alert>
      <ImageCard image={photo} title={"Matthias Green"} subtitle={"Software engineering student from Toulouse, France"} />
      <DownloadCVButton />
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h2" textAlign="center" id="projects">
          <Link color="inherit" underline="none" href="#projects">{t("projectsHeading")}</Link>
        </Typography>
        <ProjectCards />
      </Box>
      <Box sx={{ marginTop: '8rem' }}>
        <Typography variant="h2" textAlign="center" id="about">
          <Link color="inherit" underline="none" href="#about">{t("aboutMeHeading")}</Link>
        </Typography>
        <Typography variant="body1">
          {t("aboutMe")}
        </Typography>
        <Link href="/about">Learn more, download my CV, or get in contact.</Link>
      </Box>
    </SimplePage>
  )
}
