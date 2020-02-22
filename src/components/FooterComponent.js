import React from 'react';

/**
 * Component for the App footer
 * @param {*} props 
 */
function Footer(props) {
    return (
        <footer className="footer pt-3 pb-3" id="websiteFooter">
        <div className="container">
            <div className="row">
                <div className="col-12 offset-md-1 col-md-5">
                    <h5>Address</h5>
                    <p>Athens, Greece </p>
                    <p>PC: 11147</p>
                    <p><i className="fa fa-phone"></i> +210 24444444 </p>
                    <p><i className="fa fa-fa"></i> +210 24444445 </p>
                    <p><i className="fa fa-email"></i> info@petcareplatform.com</p>
                </div>
                <div className="col-12 col-md-6 align-self-center">
                    <div className="text-center">
                        <a className="btn btn-social-icon btn-google" href="http://google.com/+">
                            <i className="fa fa-google-plus"></i> </a>
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id=">
                            <i className="fa fa-facebook"></i> </a>
                        <a className="btn btn-social-icon btn-facebook"> href="http://www.linkedin.com/in/">
                            <i className="fa fa-linkedin"></i> </a>
                        <a className="btn btn-social-icon btn-twitter"> href="http://twitter.com/">
                            <i className="fa fa-twitter"></i> </a>
                        <a className="btn btn-social-icon btn-google"> href="http://youtube.com/">
                            <i className="fa fa-youtube"></i> </a>
                        <a className="btn btn-social-icon" href="mailto:">
                            <i className="fa fa-envelope-o"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
}


export default Footer;