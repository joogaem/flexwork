import React from 'react';
import '../../resources/styles/Footer.scss';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img
                        src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F7f28b2c00c330876f285822b6323e55d.cdn.bubble.io%2Ff1686685319389x618461784580355300%2Fimage%25201840%2520%25281%2529.png?w=192&h=46&auto=compress&fit=crop&dpr=1"
                        alt="FlexWork Logo"
                    />
                </div>
                <div className="footer-info">
                    <p>&copy; 2023 FlexWork. All rights reserved.</p>
                    <nav>
                        <a href="/about">About Us</a>
                        <a href="/contact">Contact</a>
                        <a href="/privacy">Privacy Policy</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
