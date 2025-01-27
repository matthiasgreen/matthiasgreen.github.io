import { useState } from 'react';
import { NavElement } from './NavElement';
import { animated, useSpring } from 'react-spring';
import './Navbar.css';
import burgerLogo from '../../assets/burger-menu.svg';

export default function Navbar( {navElements}: {navElements: NavElement[]} ) {
    // Small burger in circle in top left corner
    // Hover expands downwards into a small menu with links
    const [expanded, setExpanded] = useState(false);
    const listAnimation = useSpring({
        transform: expanded ? 'scaleY(1) translateY(0%)' : 'scaleY(0) translateY(-100%)',
        opacity: expanded ? 1 : 0,
        config: { tension: 200, friction: 20 }
    });
    const burgerAnimation = useSpring({
        // Shift off screen to the left
        transform: expanded ? 'translateX(-300%)' : 'translateX(0%)',
        // opacity: expanded ? 0 : 1,
        config: { tension: 200, friction: 20 }
    });

    return (
        <nav className="navbar">
            <div
                className='burger'
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
            >
                <animated.div style={burgerAnimation} className='burger-icon'>
                    <img src={burgerLogo} alt="Burger menu"/>
                </animated.div>
                <animated.ul style={listAnimation} className='nav-list'>
                    {navElements.map((element, index) => (
                        <li key={index} className="nav-item">
                            <a href={element.link}>{element.name}</a>
                        </li>
                    ))}
                </animated.ul>
            </div>
        </nav>
    )
}