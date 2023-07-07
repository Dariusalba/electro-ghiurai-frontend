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
        <div className="testpage-m" ref={menuRef}>
            <div className="testpage_mitems">
                <a href="" className="testpage_mitem" ref={(el) => (menuItemsRef.current[0] = el)}>View Account Details</a>
                <a href="" className="testpage_mitem" ref={(el) => (menuItemsRef.current[1] = el)}>View Current Orders</a>
                <a href="/order" className="testpage_mitem" ref={(el) => (menuItemsRef.current[2] = el)}>Create an order</a>
            </div>
            <div className="testpage_mpattern"></div>
            <div className="testpage_mimage"></div>
      </div>
    );
}

export default TestPage;