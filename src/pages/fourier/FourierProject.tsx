import { useEffect, useRef } from "react";
import PageTabs from "../../components/page/PageTabs";
import "./FourierProject.css";
import { FourierAnimation } from "fourier-animation";
import Infobox from "../../components/page/Infobox";

function Presentation() {
    return (
        <>
            <h2> Introduction </h2>
            <p> Coming soon </p>
        </>
    )
}

function Demonstration() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;
        const animation = new FourierAnimation(canvasRef.current);
        const resizeCanvas = () => {
            if (!containerRef.current || !canvasRef.current) throw new Error("Canvas or container not found");
            animation.resizeCanvas(containerRef.current.clientHeight, containerRef.current.clientWidth);
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        function animate() {
            animation.renderFrame();
            requestAnimationFrame(animate);
        }
        animate();
    }, []);

    return (
        <>
            <Infobox><span>Click and drag to draw something!</span></Infobox>
            <div ref={containerRef} className="canvas-container">
                <canvas ref={canvasRef} ></canvas>
            </div>
        </>
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