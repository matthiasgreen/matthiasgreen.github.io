import { ReactNode, useState } from "react";
import "./PageTabs.css";

export interface Tab {
    name: string;
    content: ReactNode;
}

export default function PageTabs(
    { tabs }: { tabs: Tab[] }
) {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className="page-tabs">
            <div className="tab-header">
                {tabs.map((tab, i) => (
                    <button key={i} onClick={() => setSelectedTab(i)}>{tab.name}</button>
                ))}
            </div>
            <div className="tab-content">
                {tabs[selectedTab].content}
            </div>
        </div>
    )
}