import React, { Component } from 'react';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import TweenOne from 'rc-tween-one';
import '../css/navbar.css';

class NavBar extends Component {

    geInterval = (e) => {
        switch (e.index) {
            case 0:
                return 0;
            case 1:
                return 150;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                return 150 + 450 + (e.index - 2) * 10;
            default:
                return 150 + 450 + (e.index - 6) * 35;
        }
    }
    getEnter = (e) => {
        const t = {
            opacity: 0,
            scale: 0.8,
            y: '-100%',
        };
        if (e.index >= 2 && e.index <= 6) {
            return { ...t, y: '-30%', duration: 150 };
        }
        return t;
    }

    getSplit = (e) => {
        const t = e.split(' ');
        const c = [];
        t.forEach((str, i) => {
            c.push((
                <span key={`${str}-${i}`}>
          {str}
        </span>
            ));
            if (i < t.length - 1) {
                c.push(<span key={` -${i}`}> </span>);
            }
        });
        return c;
    }

    render() {
        return (
            <div className="combined-wrapper">

                <div className="combined">
                    <div className="combined-shape">
                        <div className="shape-left">
                            <TweenOne
                                animation={[
                                    { x: 500, type: 'from', ease: 'easeInOutQuint', duration: 600 },
                                    { x: -500, ease: 'easeInOutQuart', duration: 450, delay: -150 },
                                ]}
                            />
                        </div>
                        <div className="shape-right">
                            <TweenOne
                                animation={[
                                    { x: -500, type: 'from', ease: 'easeInOutQuint', duration: 600 },
                                    { x: 500, ease: 'easeInOutQuart', duration: 450, delay: -150 },
                                ]}
                            />
                        </div>
                    </div>
                    <Texty
                        className="title"
                        type="flash"
                        delay={400}
                        enter={this.getEnter}
                        interval={this.geInterval}
                        component={TweenOne}
                        componentProps={{
                            animation: [

                                {
                                    letterSpacing: 3,
                                    scale: 1,
                                    ease: 'easeInOutQuint',
                                    duration: 300,
                                }
                            ],
                        }}
                    >
                        Restaurant Recommender
                    </Texty>
                    <TweenOne
                        className="combined-bar"
                        animation={{ delay: 2000, width: 0, x: 158, type: 'from', ease: 'easeInOutExpo' }}
                    />
                    <Texty
                        className="content"
                        type="bottom"
                        split={this.getSplit}
                        delay={2200}
                        interval={30}
                    >
                        Finding restaurants was never easier!
                    </Texty>
                </div>

            </div>
        );
    }
}

export default NavBar;