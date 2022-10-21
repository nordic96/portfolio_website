import React, { useState, useEffect } from 'react';
import './App.css';

// Custom Components
import NavBar from './components/NavBar';
import DesignCard from './components/DesignCard';
import { FullDesignDesc } from './globals';
import FooterComponent from './components/FooterComponent';
import IntroSection from './components/IntroSection/IntroSection';

import { CardColumns } from 'react-bootstrap';
import LabelContainer from 'labelcontainer';
import ProjectSection from './components/ProjectSection';

const Home = () => {
    const labelInstance = LabelContainer.getInstance();
    const [designs, setDesigns] = useState<Array<FullDesignDesc>>([]);
    const [isDesignsLoaded, setIsDesignsLoaded] = useState<boolean>(false);

    useEffect(() => {
        fetch('/api/fetchDesigns')
            .then((res) => res.json())
            .then(
                (designs) => {
                    setDesigns(designs);
                    setIsDesignsLoaded(true);
                },
                (ex) => {
                    console.log('Fetch failed, ', ex);
                    setIsDesignsLoaded(false);
                }
            );
    }, []);

    return (
        <div className="App">
            <NavBar />
            <IntroSection />
            <div className={'relative flex-column px-16 -top-4'}>
                <ProjectSection />
                <div className="item-intro" id="designs-link">
                    <h2 className="display-4">
                        <b>Design Works</b>
                    </h2>
                    <p className="lead">{labelInstance.getLabel('cca_msg')}</p>
                    <hr className="my-4" />
                    <p></p>
                </div>
                <div className="container-design">
                    <div>
                        <CardColumns>
                            {isDesignsLoaded
                                ? designs.map(
                                      (
                                          design: FullDesignDesc,
                                          index: number
                                      ) => {
                                          return (
                                              <DesignCard
                                                  key={index}
                                                  designProject={design}
                                              />
                                          );
                                      }
                                  )
                                : "Design details fetch request failed :'( please refresh the page again!"}
                        </CardColumns>
                    </div>
                </div>
                <hr className="my-4" />
            </div>
            <FooterComponent />
        </div>
    );
};

export default Home;
