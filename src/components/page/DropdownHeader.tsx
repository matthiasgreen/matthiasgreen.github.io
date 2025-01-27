import { ReactNode, useState } from "react";
import "./DropdownHeader.css";

export default function DropdownHeader(
    { header, children }: { header: string, children: ReactNode }
) {
    // Header that can be clicked to hide or show children
    const [expanded, setExpanded] = useState(true);

    return (
        <div onClick={() => setExpanded(!expanded)} className="dropdown-header">
            {/* svg of a triangle pointing right */}
            <h2>{expanded ? <>▼</> : <>▶</>} {header}</h2>
            {expanded && children}
        </div>
    )
}