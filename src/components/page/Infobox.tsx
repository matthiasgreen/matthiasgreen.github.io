import { ReactNode } from "react";
import "./Infobox.css";

export default function Infobox(
    { children }: { children: ReactNode }
) {
    return (
        <div className="infobox">
            🛈 {children}
        </div>
    )
}
