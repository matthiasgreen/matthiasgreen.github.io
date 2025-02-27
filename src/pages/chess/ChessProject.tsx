import { Chessboard } from "react-chessboard";
import { Trans, useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { is_move_legal, needs_promotion, make_move, respond } from "chess-engine";
import { Alert, Box, Container, styled, Typography } from "@mui/material";
import MyCodeBlock from "../../components/page/MyCodeBlock";
import { boardRepSnippet, gameStateSnippet, knightMoveGenSnippet, makeUnmakeSnippet, moveRepresentationSnippet } from "./snippets";
import { HeadingLink } from "../../components/page/NavigationDrawer";
import Page from "../../components/page/Page";

const H2 = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4)
}));

const H3 = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2)
}));

function Presentation() {
  const { t } = useTranslation("projects", { keyPrefix: "chess.presentation" });
  return (
    <>
      <H2 variant="h2" id="presentation">{t("heading")}</H2>
      <H3 variant="h3" id="introduction">{t("introduction.heading")}</H3>
      <Typography variant='body1'>
        {t("introduction.part1")}
        {t("introduction.part2")}
        {t("introduction.part3")}
        {t("introduction.part4")}
        {t("introduction.part5")}
      </Typography>

      <H3 variant="h3" id="problem">{t("problem.heading")}</H3>
      <Typography variant='body1'>
        {t("problem.part1")}
        {t("problem.part2")}
        {t("problem.part3")}
        {t("problem.part4")}
        {t("problem.part5")}
      </Typography>
  
      {/* <H3 variant="h3" id="steps">{t("steps.heading")}</H3>
      <Typography variant='body1'>{t("steps.part1")}</Typography>
      <Typography variant='body1' component='div'>
        <ul>
          <li>
            <Trans t={t} i18nKey={"steps.bullet.part1"} />
            <Trans t={t} i18nKey={"steps.bullet.part2"} />
          </li>
          <Trans t={t} i18nKey={"steps.bullet.part3"} />
          <li><Trans t={t} i18nKey={"steps.bullet.part4"} /></li>
          <li><Trans t={t} i18nKey={"steps.bullet.part5"} /></li>
          <li><Trans t={t} i18nKey={"steps.bullet.part6"} /></li>
          <li><Trans t={t} i18nKey={"steps.bullet.part7"} /></li>
          <li><Trans t={t} i18nKey={"steps.bullet.part8"} /></li>
          <li><Trans t={t} i18nKey={"steps.bullet.part9"} /></li>
        </ul>
      </Typography>
      <Typography variant='body1'>
        {t("steps.part2")}
        {t("steps.part3")}
        {t("steps.part4")}
      </Typography> */}
    </>
  )
}

function PlayChess() {
  const container = useRef<HTMLDivElement>(null);

  const getWidth = (container: HTMLDivElement | null) => Math.min(container?.clientWidth || window.innerWidth * 0.8, window.innerHeight * 0.8);

  const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [width, setWidth] = useState(getWidth(container.current));

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(getWidth(container.current!));
    });
  }, []);

  function makeMove(move: string) {
    const newState = make_move({ fen: fen, pgn: "" }, move);
    console.log(newState);
    setFen(respond({ fen: newState.fen, pgn: "" }).fen);
  }

  function handleMove(sourceSquare: string, targetSquare: string, _piece: string) {
    const move = sourceSquare + targetSquare;
    if (!is_move_legal(fen, move)) {
      console.log("illegal")
      return false;
    }
    if (needs_promotion(fen, move)) {
      return false;
    }

    makeMove(move);

    return true;
  }

  function onPromotionCheck(sourceSquare: string, targetSquare: string, _piece: string) {
    return is_move_legal(fen, sourceSquare + targetSquare) && needs_promotion(fen, sourceSquare + targetSquare);
  }

  function onPromotionPieceSelect(piece?: string, promoteFromSquare?: string, promoteToSquare?: string) {
    if (!piece || !promoteFromSquare || !promoteToSquare) {
      return false;
    }
    let move = promoteFromSquare + promoteToSquare;
    if (!is_move_legal(fen, move)) {
      return false;
    }
    move += piece[1].toLowerCase();
    makeMove(move);
    return true;
  }

  return (
    <>
      <H2 variant="h2" id="play-chess">Play Chess</H2>
      <Alert severity='info'>This engine is running in your browser! Compiled from Rust to WebAssembly using wasm-pack.</Alert>
      <Container sx={{ marginTop: 4, marginBottom: 2 }}>
        <Box ref={container} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: width }}>
            <Chessboard
              id="default-board"
              position={fen}
              onPieceDrop={handleMove}
              onPromotionCheck={onPromotionCheck}
              onPromotionPieceSelect={onPromotionPieceSelect}
              boardWidth={width}
            />
          </Box>
        </Box>
      </Container>
    </>
  )
}

function DeepDive() {
  const { t } = useTranslation("projects", { keyPrefix: "chess.deepDive" });
  return (
    <>
      <H3 variant="h3" id="deep-dive-introduction">{t("introduction.heading")}</H3>
      <Typography variant='body1'>{t("introduction.part1")}</Typography>
      <H3 variant="h3" id="board-representation">{t("boardRepresentation.heading")}</H3>
      <Typography variant='body1'>
          {t("boardRepresentation.part1")}
          {t("boardRepresentation.part2")}
          {t("boardRepresentation.part3")}
          {t("boardRepresentation.part4")}
          {t("boardRepresentation.part5")}
          {t("boardRepresentation.part6")}
      </Typography>
      <MyCodeBlock language="rust">
        {boardRepSnippet}
      </MyCodeBlock>
      <H3 variant="h3" id="game-state">{t("gameState.heading")}</H3>
      <Typography variant='body1'>
          {t("gameState.part1")}
          {t("gameState.part2")}
          {t("gameState.part3")}
      </Typography>
      <MyCodeBlock language="rust">
        {gameStateSnippet}
      </MyCodeBlock>
      <H3 variant="h3" id="move-representation">{t("moveRepresentation.heading")}</H3>
      <Typography variant="body1">
          {t("moveRepresentation.part1")}
          {t("moveRepresentation.part2")}
      </Typography>
      <MyCodeBlock language="rust">
        {moveRepresentationSnippet}
      </MyCodeBlock>
      <H3 variant="h3" id="move-generation">{t("moveGeneration.heading")}</H3>
      <Typography variant="body1" component='div'>
          {t("moveGeneration.part1")}
          {t("moveGeneration.part2")}
          {t("moveGeneration.part3")}
          {t("moveGeneration.part4")}
          {t("moveGeneration.part5.intro")}
          <ul>
            <li>{t("moveGeneration.part5.bullet1")}</li>
            <li>{t("moveGeneration.part5.bullet2")}</li>
            <li>{t("moveGeneration.part5.bullet3")}</li>
            <li>{t("moveGeneration.part5.bullet4")}</li>
            <li>{t("moveGeneration.part5.bullet5")}</li>
            <li>{t("moveGeneration.part5.bullet6")}</li>
          </ul>
      </Typography>
      <MyCodeBlock language="rust">
        {knightMoveGenSnippet}
      </MyCodeBlock>
      <Typography variant='body1'>
        {t("moveGeneration.part6")}
        {t("moveGeneration.part7")}
        {t("moveGeneration.part8")}
      </Typography>
      <H3 variant="h3" id="make-unmake">{t("makeUnmake.heading")}</H3>
      <Typography variant='body1'>
        {t("makeUnmake.part1")}
        {t("makeUnmake.part2")}
        {t("makeUnmake.part3")}
        {t("makeUnmake.part4")}
        {t("makeUnmake.part5")}
        {t("makeUnmake.part6")}
        {t("makeUnmake.part7")}
        {t("makeUnmake.part8")}
        {t("makeUnmake.part9")}
        {t("makeUnmake.part10")}
      </Typography>
      <MyCodeBlock language="rust">
        {makeUnmakeSnippet}
      </MyCodeBlock>
      <H3 variant="h3" id="evaluation">{t("evaluation.heading")}</H3>
      <Typography variant="body1">
        {t("evaluation.part1")}
        {t("evaluation.part2")}
        {t("evaluation.part3")}
        {t("evaluation.part4")}
        {t("evaluation.part5")}
        {t("evaluation.part6")}
        {t("evaluation.part7")}
        {t("evaluation.part8")}
        {t("evaluation.part9")}
      </Typography>
      <H3 variant="h3" id="search">{t("search.heading")}</H3>
      <Typography variant="body1">
        {t("search.part1")}
      </Typography>
      <Typography variant="h4" id="minimax">{t("search.minimax.heading")}</Typography>
      <Typography variant="body1">
        {t("search.minimax.part1")}
        {t("search.minimax.part2")}
        {t("search.minimax.part3")}
        {t("search.minimax.part4")}
      </Typography>
    </>
  )
}

const headings: HeadingLink[] = [
  { headingNumber: 1, headingText: "Presentation", link: "#presentation", subHeadings: [
    { headingNumber: 2, headingText: "Introduction", link: "#introduction" },
    { headingNumber: 2, headingText: "Problem", link: "#problem" },
    // { headingNumber: 2, headingText: "Steps", link: "#steps" }
  ]},
  { headingNumber: 1, headingText: "Play Chess", link: "#play-chess" },
  { headingNumber: 1, headingText: "Deep Dive", link: "#deep-dive-introduction", subHeadings: [
    { headingNumber: 2, headingText: "Board Representation", link: "#board-representation" },
    { headingNumber: 2, headingText: "Game State", link: "#game-state" },
    { headingNumber: 2, headingText: "Move Representation", link: "#move-representation" },
    { headingNumber: 2, headingText: "Move Generation", link: "#move-generation" },
    { headingNumber: 2, headingText: "Make/Unmake", link: "#make-unmake" },
    { headingNumber: 2, headingText: "Evaluation", link: "#evaluation" },
    { headingNumber: 2, headingText: "Search", link: "#search", subHeadings: [
      { headingNumber: 3, headingText: "Minimax", link: "#minimax" }
    ]}
  ]}
]


export default function ChessProject() {
  const { t } = useTranslation("projects", { keyPrefix: "chess.tabs" });
  return (
    <Page headings={headings}>
      <Presentation />
      <PlayChess />
      <DeepDive />
    </Page>
  )
}