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
        border: 1px solid red;
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
                    {/* <img src='assets/temppi.png'/> */}
                    <h1>Slide 1</h1> 
                    <p>Slide description</p>
                </div>
            </Slide>
            <Slide right>
                <div>
                    {/* <img src='assets/temppi.png'/> */}
                    <h1>Slide 2</h1>
                    <p>Slide description</p>
                </div>
            </Slide>
        </Carousel>
        );
    };
}