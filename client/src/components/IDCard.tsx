import React from 'react';

import logo from '../logo.svg';
import LabelContainer from 'labelcontainer';
import { Icons } from '../constants/profileIcons';
import IDIcon from './IDIcon/IDIcon';

const IDCard = () => {
    const labelInstance = LabelContainer.getInstance();
    return (
        <div>
            <div className="id-card">
                <div className="id-black">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className="id-maroon"></div>
                <div className="id-skyblue"></div>
                <div className="id-content">
                    <b>NUS Computer Science</b>
                    <br />
                    <img
                        className="intro-selfie"
                        src="assets/selfie_2.png"
                        alt="profile"
                    />
                    <br />
                    <b>GI HUN KO</b>
                    <br />
                    <b>Software Engineer, Singapore</b>
                    <br />
                    {Icons.map((x, i) => {
                        return <IDIcon {...x} key={i} />;
                    })}
                    <br />
                    <img
                        className="id-barcode"
                        src="assets/barcode.png"
                        alt="barcode"
                    />
                </div>
                <div className="id-skyblue"></div>
                <div className="id-maroon"></div>
                <div className="id-black"></div>
            </div>
            <div className="intro-desc">
                <h1>
                    <b>{labelInstance.getLabel('title')}</b>
                </h1>
                <p>
                    {
                        '"I am a Korean Computer Science student at NUS. My career goal is to become an expert in software engineering, as well as able to work along with fantastic people to design a software that is easily interactable, with simple, but attractive design.'
                    }
                </p>
                <p>
                    {
                        'I am currently specialising my degree in Artificial Intelligence (A. I), and I love projects that are hybrid of AI and software engineering. I do not bound myself in A. I and I persistently learn new tech stack to improve my skills! :)"'
                    }
                </p>
            </div>
        </div>
    );
};

export default React.memo(IDCard);
