import { Chessboard } from "react-chessboard";
import DropdownHeader from "../../components/page/DropdownHeader";
import PageTabs from "../../components/page/PageTabs";
import "./ChessProject.css";
import { Trans, useTranslation } from "react-i18next";
import { useState } from "react";
import { evaluate, is_move_legal, needs_promotion, make_move, respond } from "chess-engine";
import Infobox from "../../components/page/Infobox";

function Presentation() {
    const { t } = useTranslation("projects", { keyPrefix: "chess.presentation" });
    return (
        <>
            <h2> {t("introduction.heading")} </h2>
            <p> 
                {t("introduction.part1")}
                {t("introduction.part2")}
                {t("introduction.part3")}
                {t("introduction.part4")}
                {t("introduction.part5")}
            </p>
            <h2> {t("problem.heading")} </h2>
            <p> 
                {t("problem.part1")}
                {t("problem.part2")}
                {t("problem.part3")}
                {t("problem.part4")}
                {t("problem.part5")}
            </p>
            <h2> {t("steps.heading")} </h2>
            <p>{t("steps.part1")}</p>
            <ul>
                <li>
                    <Trans t={t} i18nKey={"steps.bullet.part1"}/>
                    <Trans t={t} i18nKey={"steps.bullet.part2"}/>
                </li>
                <Trans t={t} i18nKey={"steps.bullet.part3"}/>
                <li><Trans t={t} i18nKey={"steps.bullet.part4"}/></li>
                <li><Trans t={t} i18nKey={"steps.bullet.part5"}/></li>
                <li><Trans t={t} i18nKey={"steps.bullet.part6"}/></li>
                <li><Trans t={t} i18nKey={"steps.bullet.part7"}/></li>
                <li><Trans t={t} i18nKey={"steps.bullet.part8"}/></li>
                <li><Trans t={t} i18nKey={"steps.bullet.part9"}/></li>
            </ul>
            <p>
                {t("steps.part2")}
                {t("steps.part3")}
                {t("steps.part4")}
            </p>

        </>
    )
}

function PlayChess() {
    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

    function makeMove(move: string) {
        const newState = make_move({fen: fen, pgn: ""}, move);
        console.log(newState);
        setFen(respond({fen: newState.fen, pgn: ""}).fen);
    }

    function handleMove(sourceSquare: string, targetSquare: string, piece: string) {
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

    function onPromotionCheck(sourceSquare: string, targetSquare: string, piece: string) {
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
            <Infobox><span>This engine is running in your browser! Compiled from Rust to WebAssembly using wasm-pack. </span></Infobox>
            <div className="chessboard-container">
                <Chessboard 
                    id="default-board"
                    position={fen}
                    onPieceDrop={handleMove}
                    onPromotionCheck={onPromotionCheck}
                    onPromotionPieceSelect={onPromotionPieceSelect}
                />
            </div>
        </>
    )
}

function DeepDive() {
    const { t } = useTranslation("projects", { keyPrefix: "chess.deepDive" });
    return (
        <>
            <DropdownHeader header={t("introduction.heading")}>
                <p>
                    {t("introduction.part1")}
                </p>
            </DropdownHeader>
            <DropdownHeader header={t("boardRepresentation.heading")}>
                <p>
                    {t("boardRepresentation.part1")}
                    {t("boardRepresentation.part2")}
                    {t("boardRepresentation.part3")}
                    {t("boardRepresentation.part4")}
                    {t("boardRepresentation.part5")}
                    {t("boardRepresentation.part6")}
                </p>
            </DropdownHeader>
            <DropdownHeader header={t("gameState.heading")}>
                <p>
                    {t("gameState.part1")}
                    {t("gameState.part2")}
                    {t("gameState.part3")}
                </p>
            </DropdownHeader>
            <DropdownHeader header={t("moveRepresentation.heading")}>
                <p>
                    {t("moveRepresentation.part1")}
                    {t("moveRepresentation.part2")}
                </p>
            </DropdownHeader>
            <DropdownHeader header={t("moveGeneration.heading")}>
                <p>
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
                    {t("moveGeneration.part6")}
                    {t("moveGeneration.part7")}
                    {t("moveGeneration.part8")}
                </p>
            </DropdownHeader>
            <DropdownHeader header={t("makeUnmake.heading")}>
                <p>
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
                </p>
            </DropdownHeader>
            <DropdownHeader header={t("evaluation.heading")}>
                <p>
                    {t("evaluation.part1")}
                    {t("evaluation.part2")}
                    {t("evaluation.part3")}
                    {t("evaluation.part4")}
                    {t("evaluation.part5")}
                    {t("evaluation.part6")}
                    {t("evaluation.part7")}
                    {t("evaluation.part8")}
                    {t("evaluation.part9")}
                </p>
            </DropdownHeader>
            <DropdownHeader header={t("search.heading")}>
                <p>
                    {t("search.part1")}
                </p>
                <h3>{t("search.minimax.heading")}</h3>
                <p>
                    {t("search.minimax.part1")}
                    {t("search.minimax.part2")}
                    {t("search.minimax.part3")}
                    {t("search.minimax.part4")}
                </p>
            </DropdownHeader>
        </>
    )
}


export default function ChessProject() {
    const { t } = useTranslation("projects", { keyPrefix: "chess.tabs" });
    return (
        <PageTabs tabs={[
            { name: t("presentation"), content: <Presentation /> },
            { name: t("play"), content: <PlayChess /> },
            { name: t("deepDive"), content: <DeepDive /> }
        ]} />
    )
}