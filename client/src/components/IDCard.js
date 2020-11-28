import React, { Component } from 'react';

export default class IDCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                {/* <img className="id-lanyard" src="assets/lanyard.png" alt="lanyard"/> */}
                <div className="id-card">
                    <div className="id-black"></div>
                    <div className="id-maroon"></div>
                    <div className="id-skyblue"></div>
                    <div className="id-content">
                        <b>NUS Computer Science</b><br/>
                        <img className="intro-selfie" src='assets/selfie_2.png' alt="profile"/>
                        <br/>
                        <b>GI HUN KO</b><br/>
                        <b>Software Engineer</b><br/>
                        <b>Singapore</b><br/>
                        <div className="id-content-gray">
                            <a href="https://github.com/nordic96"><img className="link-icon" src="assets/github-logo.png" alt="github icon"/></a>
                            &nbsp;<a href="https://www.linkedin.com/in/gi-hun-ko-863619184/"><img className="link-icon" src="assets/Linkedin-Icon.png" alt="linkedin icon"/></a>
                            &nbsp;<a href="https://www.hackerrank.com/kogihun"><img className="link-icon" src="assets/hackerrank.svg" alt="hackerrank icon"/></a>
                        </div>
                    </div>
                    <div className="id-skyblue"></div>
                    <div className="id-maroon"></div>
                    <div className="id-black"></div>
                </div>
                <div className="intro-desc">
                    <h2>Ko Gi Hun's Portfolio Website</h2>
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