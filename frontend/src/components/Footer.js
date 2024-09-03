import React from 'react';
import "./footer.css"

const Footer = () => {
  return (
    <footer>
        <div className="container footer-container">
            <div className="col-3">
                <img src="https://www.pngkit.com/png/detail/141-1416995_generic-logo-transparent-background.png" alt="" />
                <br />
                <div className="social">
                    <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                    <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>

                </div>
                <br />
                <span className="address">Address: 33290 Allen Ave, Abbotsford, BC, V2S 2L4
                </span>
            </div>
            <div className="col-3">
                <h6>About</h6>
                <p>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati magni sint pariatur consequatur perspiciatis voluptas.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. 
                </p>
            </div>
            <div className="col-3">
                <h6>Get Help</h6>
                <a href="#"><i className="fa-brands fa-whatsapp"></i>Whatsapp Help Line</a>

            </div>
            <div className="col-3">
                <h6>Contact</h6>
                <a href="#">mailme@gmail.com</a>
            </div>
        </div>
        <div className="copyright">
            Copyright &#169; 2024 | ShopNotch All rights reserved
        </div>
    </footer>
  );
};

export default Footer;
