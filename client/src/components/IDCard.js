import React, { Component } from 'react';
import logo from '../logo.svg';

export default class IDCard extends Component {
    render() {
        return(
            <div>
                {/* <img className="id-lanyard" src="assets/lanyard.png" alt="lanyard"/> */}
                <div className="id-card">
                    <div className="id-black">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div className="id-maroon"></div>
                    <div className="id-skyblue"></div>
                    <div className="id-content">
                        <b>NUS Computer Science</b><br/>
                        <img className="intro-selfie" src='assets/selfie_2.png' alt="profile"/>
                        <br/>
                        <b>GI HUN KO</b><br/>
                        <b>Software Engineer, Singapore</b><br/>
                        <a href="https://github.com/nordic96" target="_blank" rel="noreferrer"><img className="link-icon" src="assets/github-logo.png" alt="github icon"/></a>
                        &nbsp;<a href="https://www.linkedin.com/in/gi-hun-ko-863619184/" target="_blank" rel="noreferrer"><img className="link-icon" src="assets/Linkedin-Icon.png" alt="linkedin icon"/></a>
                        &nbsp;<a href="https://www.hackerrank.com/kogihun" target="_blank" rel="noreferrer"><img className="link-icon" src="assets/hackerrank.svg" alt="hackerrank icon"/></a>
                        &nbsp;<a href="https://leetcode.com/nordic59/" target="_blank" rel="noreferrer"><img className="link-icon" src="assets/leetcode_logo.png" alt="leetcode icon"/></a>
                        <br/><img className="id-barcode" src="assets/barcode.png" alt="barcode" />
                    </div>
                    <div className="id-skyblue"></div>
                    <div className="id-maroon"></div>
                    <div className="id-black"></div>
                </div>
                <div className="intro-desc">
                    <h1><b>Ko Gi Hun's Portfolio Website</b></h1>
                    <p>
                    "I am a Korean Computer Science student at NUS. 
                    My career goal is to become an expert in software engineering, as well as able to work along with fantastic people to design a software that is easily interactable, with simple, but attractive design. 
                    </p>
                    <p>I am currently specialising my degree in Artificial Intelligence (A. I), and I love projects that are hybrid of AI and software engineering. 
                    I do not bound myself in A. I and I persistently learn new tech stack to improve my skills! :)"</p>
                </div>
            </div>
        )
    }
}