import React, { Component } from 'react';
import makeCarousel from 'react-reveal/makeCarousel';
import Slide from 'react-reveal/Slide';
import styled, { css } from 'styled-components';

export default class CarouselComponent extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const Container = styled.div`
        margin: auto;
        position: relative;
        overflow: hidden;
        width: 90%;
        height: 50vh;
        `;
        const CarouselUI = ({ children }) => <Container>{children}</Container>;
        const Carousel = makeCarousel(CarouselUI);    
        
        return (
        <Carousel defaultWait={2000}>
            <Slide right>
                <div>
                    <img className="img-proj-card" src='assets/temppi.png'/>
                    <h2>TempPi (2018)</h2> 
                    <div className="desc">
                        <p>TempPi was my first self-driven IoT project after I joined the university.
                        The name was gotten from the idea 'Temp'erature and Raspberry'Pi', as the project basically
                        captures the room temperature using the sensor and displays in the LCD display componenet, wired with
                        the RaspberryPi I/O board.</p>
                        <p>TempPi was written in Python, to control most of its electronic component parts that the RaspberryPi can handle,
                        and it gave me a hands on experience in writing in Python.</p>
                    </div>
                </div>
            </Slide>
            <Slide right>
                <div>
                    {/* <img src='assets/temppi.png'/> */}
                    <h2>Covid-19 Classifier (2020, Group Project)</h2>
                    <p>Slide description</p>
                </div>
            </Slide>
        </Carousel>
        );
    };
}