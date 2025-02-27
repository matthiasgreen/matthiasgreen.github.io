import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { FourierAnimation } from "fourier-animation";
import { Alert, Box, Slider, Stack, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import Page from "../../components/page/Page";
import { HeadingLink } from "../../components/page/NavigationDrawer";
import { Link } from "react-router";
import { H1, H2 } from "../../components/page/Headings";

function Presentation() {
  const { t } = useTranslation("projects", { keyPrefix: "fourier.presentation" });
  return (
    <>
      <H2 id="presentation">{t('heading')}</H2>
      <Typography variant="body1">
        <Trans t={t} i18nKey="part1" components={{Link: <Link to="https://www.youtube.com/watch?v=spUNpyF58BY"/>}}/>
        {t('part2')}
      </Typography>
    </>
  )
}

function Demonstration() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animation, setAnimation] = useState<FourierAnimation | null>(null);
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const anim = new FourierAnimation(canvasRef.current)
    setAnimation(anim);
    const resizeCanvas = () => {
      if (!containerRef.current || !canvasRef.current) throw new Error("Canvas or container not found");
      anim.resizeCanvas(containerRef.current.clientHeight, containerRef.current.clientWidth);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    function animate() {
      anim.renderFrame();
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  const changeSeriesSize = (_event: SyntheticEvent | Event, value: number | number[]) => {
    console.log("here");
    if (!animation) throw new Error("Animation not initialized");
    animation.updateParams({
      seriesSize: value as number
    })
  };

  const changeHistoryLength = (_event: SyntheticEvent | Event, value: number | number[]) => {
    if (!animation) throw new Error("Animation not initialized");
    animation.updateParams({
      historyLength: value as number
    })
  };

  const changeNSamples = (_event: SyntheticEvent | Event, value: number | number[]) => {
    if (!animation) throw new Error("Animation not initialized");
    animation.updateParams({
      nSamples: value as number
    })
  };

  const changeSpeed = (_event: SyntheticEvent | Event, value: number | number[]) => {
    if (!animation) throw new Error("Animation not initialized");
    animation.updateParams({
      speed: value as number
    })
  };

  return (
    <>
      <H2 id="demonstration">Demonstration</H2>
      <Alert severity="info">Click and drag to draw something!</Alert>
      <Stack spacing={2} marginTop={2} direction="column">
        <Stack spacing={2} direction="row">
          <Stack spacing={2} direction="column">
            <Typography>Series size</Typography>
            <Slider
              onChangeCommitted={changeSeriesSize}
              defaultValue={30}
              min={1}
              max={100}
              step={1}
              valueLabelDisplay="auto"
            />
          </Stack>
          <Stack spacing={2} direction="column">
            <Typography>History length</Typography>
            <Slider
              onChange={changeHistoryLength}
              defaultValue={10}
              min={1}
              max={50}
              step={1}
              valueLabelDisplay="auto"
            />
          </Stack>
          <Stack spacing={2} direction="column">
            <Typography>N samples</Typography>
            <Slider
              onChangeCommitted={changeNSamples}
              defaultValue={100}
              min={1}
              max={500}
              step={1}
              valueLabelDisplay="auto"
            />
          </Stack>
          <Stack spacing={2} direction="column">
            <Typography>Speed</Typography>
            <Slider
              onChange={changeSpeed}
              defaultValue={20}
              min={1}
              max={100}
              step={1}
              valueLabelDisplay="auto"
            />
          </Stack>
        </Stack>
        <Box ref={containerRef} sx={{ width: "100%", height: "80vh" }} border={2}>
          <canvas id="fourier-canvas" ref={canvasRef} />
        </Box>
      </Stack>
    </>
  )
}

const headings: HeadingLink[] = [
  { headingNumber: 1, headingText: "Presentation", link: "#presentation" },
  { headingNumber: 1, headingText: "Demonstration", link: "#demonstration" }
]

export default function FourierProject() {
  const { t } = useTranslation("projects", { keyPrefix: "fourier" });
  return (
    <Page headings={headings} githubLink="matthiasgreen/fourier-animation">
      <H1>{t("heading")}</H1>
      <Presentation />
      <Demonstration />
    </Page>
  );
}