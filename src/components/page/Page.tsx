// Page component (with children) adds common elements to any page

import { ReactNode } from "react";
import Navbar from "../common/Navbar";
import LanguageSelector from "../common/LanguageSelector";
import './Page.css';

export default function Page({ children }: { children: ReactNode }) {
    const navElements = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Contact', link: '/contact' }
    ];
    return (
        <>
            <Navbar navElements={navElements}/>
            <LanguageSelector />
            <div className="content">
                {children}
            </div>
        </>
    )
}