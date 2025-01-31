import ProjectCards from "../components/page/ProjectCards";
import { useTranslation } from "react-i18next";
import chessIcon from "../assets/chess-icon.svg";
import fourierIcon from "../assets/fourier-icon.svg";
import Infobox from "../components/page/Infobox";

export default function Home() {
  const { t } = useTranslation("homePage");
  const projects = [
    {
      title: "Chess engine",
      description: "A chess engine written from scratch in Rust.",
      image: chessIcon,
      link: "#/projects/chess-engine"
    },
    {
      title: "Fourier Doodle",
      description: "A Fourier series visualizer.",
      image: fourierIcon,
      link: "#/projects/fourier-doodle"
    }
  ]

  return (
    <>
      <h1>
        {t("Matthias Green")}
      </h1>
      <Infobox><span>This website is still work in progress.</span></Infobox>
      <ProjectCards projects={projects} />
    </>
  )
}