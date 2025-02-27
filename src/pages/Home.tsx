import ProjectCards from "../components/page/ProjectCards";
import { useTranslation } from "react-i18next";
import { Alert, AlertTitle, Box, Button, Card, CardContent, CardMedia, Container, Link, Stack, Typography, useTheme } from "@mui/material";
import Page from "../components/page/Page";
import photo from "/IMG_2430.webp";
import cv from "/CV Matthias Green.pdf";
import { Article, Description, DocumentScanner } from "@mui/icons-material";


function PresentationCard() {
  const theme = useTheme();

  return (
    <Card sx={{
      width: "100%",
      aspectRatio: "4/3",
      ml: "auto",
      mr: "auto",
      mb: 4,
      mt: 4,
      position: "relative",
      borderRadius: 2,
      // For the gradient overlay:
      "&:after": {
        content: '""',
        display: "block",
        position: "absolute",
        width: "100%",
        height: "64%",
        bottom: 0,
        zIndex: 1,
        background: "linear-gradient(to top, #000, rgba(0,0,0,0))",
      },
    }}>
      <CardMedia
        image={photo}
        sx={{
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundPosition: "0% 70%",
          position: "absolute",
          filter: "brightness(80%)",
          zIndex: 0,
        }}
      />
      <CardContent sx={{
        zIndex: 2,
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 4,
        color: theme.palette.common.white,
      }}>
        <Typography variant="h2" sx={{ zIndex: 2 }}>Matthias Green</Typography>
        <Typography variant="subtitle1" sx={{ zIndex: 2 }}>Software engineering student from Toulouse, France</Typography>
      </CardContent>
    </Card>
  );
}

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
    <Page>
      <Alert severity="info" variant="filled">
        <AlertTitle>{t("wip")}</AlertTitle>
        {t("wipDetails")}
      </Alert>
      <PresentationCard/>
      <DownloadCVButton/>
      <Box sx={{ marginTop: 4}}>
        <Typography variant="h2" textAlign="center" id="projects">
          <Link color="inherit" underline="none" href="#projects">{t("projectsHeading")}</Link>
        </Typography>
        <ProjectCards/>
      </Box>
      <Box sx={{ marginTop: '8rem'}}>
        <Typography variant="h2" textAlign="center" id="about">
          <Link color="inherit" underline="none" href="#about">{t("aboutMeHeading")}</Link>
        </Typography>
        <Typography variant="body1">
          {t("aboutMe")}
        </Typography>
        <Link href="/about">Learn more, download my CV, or get in contact.</Link>
      </Box>
    </Page>
  )
}