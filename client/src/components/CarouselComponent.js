import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
import makeCarousel from 'react-reveal/makeCarousel';
import styled, { css } from 'styled-components';

export default class CarouselComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            projects: []
        };
      } 
      
      fetchProjects() {
        fetch('/fetchProjects')
        .then(res => res.json())
        .then(
          (projects) => {
            console.log(projects)
            this.setState({
              isLoaded: true,
              projects: projects
            });
          },
          (ex) => {
            console.log('Fetch failed, ', ex);
          }
        )
      }
    
    componentDidMount() {
      this.fetchProjects();
    }
    render() {
      const width = "100%", height = "44vh";
      const Container = styled.div`
      margin: auto;
      position: relative;
      overflow: hidden;
      width: ${width};
      height: ${height};
      `;
      const Children  = styled.div`
      width: ${width};
      position: relative;
      height: ${height};
      `;
      const Arrow = styled.div`
      text-shadow: 1px 1px 1px #fff;
      z-index: 100;
      line-height: ${height};
      text-align: center;
      position: absolute;
      top: 0;
      width: 10%;
      font-size: 3em;
      cursor: pointer;
      user-select: none;
      ${props => props.right ? css`left: 90%;` : css`left: 0%;`}
      `;
      const CarouselUI = ({ position, handleClick, children }) => (
        <Container>
          <Children>
            {children}
            <Arrow onClick={handleClick} data-position={position - 1}>{'<'}</Arrow>
            <Arrow right onClick={handleClick} data-position={position + 1}>{'>'}</Arrow>
          </Children>
        </Container>
      );
      const Carousel = makeCarousel(CarouselUI);
      return (
      <Carousel>
          {this.state.projects.map((project) => {
              return(
                  <Slide right>
                      <div className="proj-card">
                          <img className="img-proj-card" src={project.medialink}/>
                          <h2>{project.name} ({project.devyear})</h2> 
                          <div className="desc">
                              {project.desc}
                          </div>
                      </div>
                  </Slide>
              )
          })}
        </Carousel>
        );
    };
}