import { useEffect, useRef } from "react";
import PageTabs from "../../components/page/PageTabs";
import "./FourierProject.css";

function Presentation() {
    return (
        <>
            <h2> Introduction </h2>
            <p> Coming soon </p>
        </>
    )
}

function Demonstration() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas == null) {
            alert("Canvas not found");
            return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            alert("Context not found");
            return;
        }

        // const renderer = new FourierRenderer(ctx);
        // const animate = () => {
        //     renderer.renderFrame();
        //     requestAnimationFrame(animate);
        // }
        // animate();
    });

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

export default function FourierProject() {
    return (
        <PageTabs tabs={[
            { name: "Presentation", content: <Presentation />},
            { name: "Demonstration", content: <Demonstration />}
        ]} />
    )
}