import { SyntheticEvent, useEffect, useRef, useState } from "react";
import PageTabs from "../../components/page/PageTabs";
import "./FourierProject.css";
import { FourierAnimation } from "fourier-animation";
import Infobox from "../../components/page/Infobox";
import { Slider, Stack, Typography } from "@mui/material";

function Presentation() {
    return (
        <>
            <h2> Article coming soon, check out the demonstration </h2>
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
            <Infobox><span>Click and drag to draw something!</span></Infobox>
            <Stack spacing={2} direction="row">
                <Stack spacing={2} direction="column">
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
                <div ref={containerRef} className="canvas-container">
                    <canvas ref={canvasRef} ></canvas>
                </div>
            </Stack>
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