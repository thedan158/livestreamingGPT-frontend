import React, { createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QRCode from 'qrcode.react';
import { getAPIActionJSON } from "../../api/ApiActions";
import { QrReader } from "react-qr-reader";


const ERR_MISSING_FIELD = "This field is required"


export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username)
    const role = useSelector(state => state.user.role)
    const [apiErr, setApiErr] = useState(null)
    const tfIDNumber = createRef()

    const checkValidation = () => {
        const idNumber = tfIDNumber.current.value
        if (!idNumber) {
            setApiErr(ERR_MISSING_FIELD)
            return false
        }
        return true
    }

    const handleSearch = () => {
        const idNumber = tfIDNumber.current.value
        const success = checkValidation()
        if (success) {
            navigate(`/livestream?id=${idNumber}&role=Audience`)
        }
    }
    return (
        <div className="body home" id="home">
            <div className="home-row">
                <div className="home-banner">
                    <div className="home-intro">
                        <div className="hi-title">JOIN OUR LIVESTREAMING COMMUNITY</div>
                        <div className="hi-desc">
                            <p>Search for on-going livestream, start your own livestream or scan QR CODE</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <a style={{ margin: 20 }} className="hi-btn" href="#search">SEARCH FOR LIVESTREAM</a>
                            {/* <a style={{ margin: 20 }} className="hi-btn" href="#payment">PAYMENT</a> */}
                        </div>
                        <div style={{ display: 'flex' }}>
                            <a style={{ margin: 20 }} className="hi-btn" onClick={() => { navigate("/service") }}>START YOUR LIVESTREAM</a>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <a style={{ margin: 20 }} className="hi-btn" href="#qrcode">SCAN QR CODE</a>
                            <a style={{ margin: 20 }} className="hi-btn" onClick={() => { navigate("/") }}>LOG OUT</a>
                        </div>
                    </div>
                    <div className="hi-img"><img src="images/chaiinfolio/home/kyc-banner.jpg" /></div>
                </div>
            </div>
            <div class="popup" id="qrcode">
                <a href="#home" class="pu-close" id="pu-close"></a>
                <div class="pu-content">
                    {role === "user" ? (<QRCode
                        id='qrcode'
                        value={`${window.location.protocol + '//' + window.location.host}/profile?user=${username}`}
                        size={250}
                        level={'H'}
                        includeMargin={true}
                        imageSettings={{
                            src: "images/chaiinfolio/theme/chaiinfolio-favicon.gif",
                            x: undefined,
                            y: undefined,
                            height: 50,
                            width: 50,
                            excavate: true,
                        }}
                    />) : (
                        <div>
                            <QrReader
                                onResult={(result, error) => {
                                    if (!!result) {
                                        window.open(result?.text, "_blank");
                                    }
                                }}
                                style={{ width: '50%' }}
                            />
                        </div>
                    )}
                    <div className="hi-title">SCAN FOR INFORMATION</div>
                </div>
            </div>
            <div class="popup" id="search">
                <a href="#home" class="pu-close" id="pu-close"></a>
                <div class="pu-content">
                    <div style={{ marginBottom: 20 }} className="hi-title">ENTER LIVESTREAM ID NUMBER</div>
                    <input ref={tfIDNumber} style={{ marginBottom: 20 }} className="fi-input" placeholder="ID Number..." />
                    <div class="kyc-row fr-msg">
                        {apiErr && <div class="fr-err"><p>{apiErr}</p></div>}
                    </div>
                    <div className="fn-col">
                        <a onClick={handleSearch} className="fr-btn fr-submit" >SEARCH</a>
                    </div>
                </div>
            </div>
            <div class="popup" id="payment" >
                <a href="#home" class="pu-close" id="pu-close"></a>
                <div class="pu-content">
                    <p>Thank you for your interest in ChaiinFolio.  This service is not online temporary! Please comeback later !</p>
                    <p>Thank you for your support!</p>
                </div>
            </div>
        </div>
    );
}