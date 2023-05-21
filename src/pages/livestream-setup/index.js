import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateRandomString } from '../../components/common/commonFunctions'
import { useDispatch } from 'react-redux'
import { getAPIActionJSON } from '../../api/ApiActions'

const EMPTY_SPACE = '\u00A0';

const LivestreamSetup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [legalname, setLegalname] = useState("")
    const [nationality, setNationality] = useState("")
    const [age, setAge] = useState("")
    const [info, setInfo] = useState("")
    const [products, setProducts] = useState("")
    const [apiErr, setApiErr] = useState(EMPTY_SPACE)

    const handleResponse = (response, roomId) => {
        if (!response.success) {
            setApiErr(response.message)
        } else
            navigate(`/livestream?id=${roomId}&role=Host`)
    }
    const handleNext = () => {
        const roomID = generateRandomString()
        dispatch(getAPIActionJSON("savePreset",
            {
                legalname: legalname,
                nationality: nationality,
                age: age,
                info: info,
                products: products,
                roomID: roomID
            }, () => { }, null, (e) => handleResponse(e, roomID)
        ))

    }

    return (
        <div className="body kyc kycB1a" id="kycB1a">
            <div className="home-row">

                <div className="kyc-row kyc-head">
                    <div onClick={() => console.log(legalname, nationality, age, info, products)} className="ps-title">Please provide some informations</div>
                </div>
                <div className="kyc-row">
                    <div className="form-row">
                        <div className="fr-input fi-col6" id="entLegalName">
                            <div className="fi-label fi-must">Your full legal name</div>
                            <input className="fi-input"
                                placeholder="Your fullname on legal documents"
                                value={legalname}
                                onChange={(e) => setLegalname(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="kyc-row">
                    <div className="form-row">
                        <div className="fr-input fi-col3" id="Country">
                            <div className="fi-label fi-must">Nationality</div>
                            <input className="fi-input"
                                placeholder="Your nationality on legal documents"
                                value={nationality}
                                onChange={(e) => setNationality(e.target.value)} />
                        </div>
                        <div className="fr-input fi-col3" id="entTIN">
                            <div className="fi-label fi-must">Age</div>
                            <input className="fi-input" placeholder="Your age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="kyc-row">
                    <div className="form-row">
                        <div className="fr-input fi-col6" id="entDescBiz">
                            <div className="fi-label fi-must">Tell something about yourself</div>
                            <textarea className="fi-input" placeholder="Describe the nature of your business"
                                value={info}
                                onChange={(e) => setInfo(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="kyc-row">
                    <div className="form-row">
                        <div className="fr-input fi-col6" id="entAssetSource">
                            <div className="fi-label fi-must">List of products you will be selling today</div>
                            <textarea
                                className="fi-input"
                                placeholder='1. Iphone 14 Promax 256GB:  2000USD
                            2. Iphone 13 Promax 128GB:   1000USD
                            ....' value={products}
                                onChange={(e) => setProducts(e.target.value)} />
                        </div>
                    </div>
                </div>
                {apiErr !== EMPTY_SPACE && <div className="acc-row fr-msg ">
                    <div className="fr-err"><p>{apiErr}</p></div>
                </div>}
                <div className="kyc-row">
                    <div className="form-row fr-nav">
                        <div class="fn-col">
                            <a class="fr-btn fr-back" id="btn-kyc00" onClick={() => navigate('/dashboard')}>BACK</a>
                        </div>
                        <div className="fn-col">
                            <a onClick={handleNext} className={"fr-btn fr-next"} id="btn-kycB1b">NEXT</a>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default LivestreamSetup