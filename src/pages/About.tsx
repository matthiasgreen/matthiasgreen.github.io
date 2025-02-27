import { Trans, useTranslation } from "react-i18next";
import { H1, H2 } from "../components/page/Headings";
import { Avatar, Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Page from "../components/page/Page";
import photo from "/IMG_2430.webp"
import cv from "/CV Matthias Green.pdf"
import { DocumentScanner } from "@mui/icons-material";

export default function About() {
  const { t } = useTranslation("aboutPage");
  return (
    <Page>
      TODO
    </Page>
  );
}