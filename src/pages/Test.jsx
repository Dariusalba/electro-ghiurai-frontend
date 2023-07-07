import "../components/TestPage.css";
import React, { useEffect, useRef } from 'react';

function TestPage() {
    const menuRef = useRef(null);
    const menuItemsRef = useRef([]);

    useEffect(() => {
        const menuElement = menuRef.current;
        const menuItems = Array.from(menuItemsRef.current);

        menuItems.forEach((item, index) => {
            item.addEventListener('mouseover', () => {
                menuElement.dataset.activeIndex = index;
            });

            return () => {
                item.removeEventListener('mouseover', () => {
                    menuElement.dataset.activeIndex = index;
                });
            };
        });
    }, []);

    return (
        <div className="testpage_m" ref={menuRef}>
            <div className="testpage_mitems">
                <a href="/" className="testpage_mitem" ref={(el) => (menuItemsRef.current[0] = el)}>Home</a>
                <a href="/" className="testpage_mitem" ref={(el) => (menuItemsRef.current[1] = el)}>Shop</a>
                <a href="/" className="testpage_mitem" ref={(el) => (menuItemsRef.current[2] = el)}>About</a>
                <a href="/" className="testpage_mitem" ref={(el) => (menuItemsRef.current[3] = el)}>Contact Us</a>
            </div>
            <div className="testpage_mpattern"></div>
            <div className="testpage_mimage"></div>
        </div>
    );
}

export default TestPage;