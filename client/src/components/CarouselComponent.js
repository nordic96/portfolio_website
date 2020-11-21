import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
import makeCarousel from 'react-reveal/makeCarousel';
import styled from 'styled-components';

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
        <Carousel>
            {this.state.projects.map((project) => {
                return(
                    <Slide right>
                        <div>
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