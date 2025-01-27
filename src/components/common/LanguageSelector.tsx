import { useTranslation } from "react-i18next";
import "./LanguageSelector.css";

import { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import './Navbar.css';
import languageIcon from '../../assets/language-icon.svg';


export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [expanded, setExpanded] = useState(false);
    const listAnimation = useSpring({
        transform: expanded ? 'scaleY(1) translateY(0%)' : 'scaleY(0) translateY(-100%)',
        opacity: expanded ? 1 : 0,
        config: { tension: 200, friction: 20 }
    });
    const iconAnimation = useSpring({
        // Shift off screen to the left
        transform: expanded ? 'translateX(300%)' : 'translateX(0%)',
        // opacity: expanded ? 0 : 1,
        config: { tension: 200, friction: 20 }
    });

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }

    return (
        <div className="language-selector"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            <animated.div style={iconAnimation} className='language-icon'>
                <img src={languageIcon} alt="Language icon"/>
            </animated.div>
            <animated.ul style={listAnimation} className='language-list'>
                <li className="language-item" onClick={() => changeLanguage('en')}>
                    <button>EN</button>
                </li>
                <li className="language-item" onClick={() => changeLanguage('fr')}>
                    <button>FR</button>
                </li>
            </animated.ul>
        </div>
    )
}