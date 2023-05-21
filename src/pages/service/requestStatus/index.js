import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { generateRandomString } from '../../../components/common/commonFunctions';
import { getAPIActionJSON } from '../../../api/ApiActions';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../../../firebase"


const RequestStatus = () => {
    const toastId = React.useRef(null);
    let usernameRedux = useSelector(state => state.user.username)
    let userIDRedux = useSelector(state => state.user.userID)
    const [username, setUsername] = useState(usernameRedux ? usernameRedux : generateRandomString())
    const [userID, setUserID] = useState(userIDRedux ? userIDRedux : generateRandomString())
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id")
    let role_str = searchParams.get("role") || 'Host';
    const streamRole =
        role_str === 'Host'
            ? ZegoUIKitPrebuilt.Host
            : role_str === 'Cohost'
                ? ZegoUIKitPrebuilt.Cohost
                : ZegoUIKitPrebuilt.Audience;
    const navigate = useNavigate()
    const handleResponse = response => {
        console.warn(response)
    }
    const receiveMessage = (message) => {
        const msg = message.message
        if (msg.slice(0, 3) !== "/ai") return
        const data = {
            message: msg.slice(4, msg.length),
            roomID: id,
            fromUser: message.fromUser
        }
        dispatch(getAPIActionJSON("requestAI", data, () => { }, null, (e) => handleResponse(e), "", false))
    }
    let sharedLinks = [];
    sharedLinks.push({
        name: 'Join as audience',
        url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?id=' +
            id +
            '&role=Audience',
    });
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "Chats", `${id}_${username}`), (snapshot) => {
            if (snapshot.data().message && !snapshot.data().response) {
                toastId.current = toast.loading('🦄 Please wait...', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            if (snapshot.data().message && snapshot.data().response) {
                toast.update(toastId.current, { render: snapshot.data().response, type: toast.TYPE.INFO, isLoading: false });

            }
        });
        return () => {
            unsub()
        }
    }, [])
    const myMeeting = async (element) => {
        const appID = 2011609377
        const serverSecret = "5c319edc0bc879c3db316938af3a010a"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            id,
            userID,
            username)
        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.LiveStreaming,
                config: {
                    streamRole,
                    liveStreamingMode: ZegoUIKitPrebuilt.LiveStreamingMode.LiveStreaming
                },
            },
            sharedLinks,
            turnOnMicrophoneWhenJoining: false,
            turnOnCameraWhenJoining: false,
            showUserList: true,
            showRemoveUserButton: role_str === "Host" ? true : false,
            lowerLeftNotification: {
                showUserJoinAndLeave: false,// Hide the user joining/leaving notification on the lower left.
                showTextChat: true,// Hide the text chat on the lower left.
            },
            showPreJoinView: true,
            showMyCameraToggleButton: role_str === "Host" ? true : false,
            showMyMicrophoneToggleButton: role_str === "Host" ? true : false,
            showAudioVideoSettingsButton: role_str === "Host" ? true : false,
            showLayoutButton: role_str === "Host" ? true : false,
            showScreenSharingButton: role_str === "Host" ? true : false,
            onInRoomMessageReceived: (messageInfo) => {
                receiveMessage(messageInfo)
                // Wrap the received in-room messages with appropriate elements and display them in the desired location.
            },
        });

    }
    return (
        <>
            <div class="body kyc kyc04" id="kyc04">
                <div class="home-row">
                    <div
                        className="myCallContainer"
                        ref={myMeeting}
                        style={{ width: '100vw', height: '100vh' }}
                    ></div>

                    <div class="kyc-row">
                        <div class="form-row fr-nav">
                            <div class="fn-col">
                                <a class="fr-btn fr-back" id="btn-kyc00" onClick={() => navigate('/service')}>BACK</a>
                            </div>
                            <div class="fn-col">
                                <a href="#qrcode" class={"fr-btn fr-next"}>GENERATE QR CODE</a>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="popup" id="qrcode">
                    <a href="#kyc04" class="pu-close" id="pu-close"></a>
                    <div class="pu-content">
                        <QRCode
                            id='qrcode'
                            value={window.location.protocol + '//' +
                                window.location.host + window.location.pathname +
                                '?id=' +
                                id +
                                '&role=Audience'}
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
                        />
                        <div className="hi-title">SCAN TO JOIN</div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>

    )
}

export default RequestStatus