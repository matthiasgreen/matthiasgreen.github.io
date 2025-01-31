import { useEffect, useRef, useState } from "react";
import PageTabs from "../../components/page/PageTabs";
import "./FourierProject.css";
import { FourierAnimation } from "fourier-animation";
import Infobox from "../../components/page/Infobox";
import { Slider, Stack, Typography } from "@mui/material";

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

    const changeSeriesSize = (event: Event, value: number | number[]) => {
        if (!animation) throw new Error("Animation not initialized");
        animation.updateParams({
            seriesSize: value as number
        })
    };

    const changeHistoryLength = (event: Event, value: number | number[]) => {
        if (!animation) throw new Error("Animation not initialized");
        animation.updateParams({
            historyLength: value as number
        })
    };

    const changeNSamples = (event: Event, value: number | number[]) => {
        if (!animation) throw new Error("Animation not initialized");
        animation.updateParams({
            nSamples: value as number
        })
    };

    const changeSpeed = (event: Event, value: number | number[]) => {
        if (!animation) throw new Error("Animation not initialized");
        animation.updateParams({
            speed: value as number
        })
    };

    return (
        <>
            <Infobox><span>Click and drag to draw something!</span></Infobox>
            <Stack spacing={2} direction="row">
                <Stack spacing={2} direction="column">
                    <Typography>Series size</Typography>
                    <Slider 
                        onChange={changeSeriesSize}
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
                        onChange={changeNSamples}
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