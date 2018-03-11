import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router-dom';

import TextContent from './content/TextContent';
import JoinCard from '../components/common/JoinCard';
import JoinTeamPanel from '../components/common/JoinTeamPanel'
import Slideshow from '../components/common/Slideshow';

export default class Index extends React.Component {

    componentDidMount() {
        $('.header-image').css('background-image', 'url(https://static1.squarespace.com/static/598dd363a5790a4026dac8ab/t/59cd9e5032601e2e1011ec17/1506647684440/Seth-headshot-smile.jpg?format=2500w)');
    }

    render() {
        return (
            <div>
                <JoinCard />

                <div className='content'>
                    <Slideshow images={[ 'https://static1.squarespace.com/static/598dd363a5790a4026dac8ab/59b80b5eccc5c57630823222/59b80b5ef43b558af35fdbde/1506485137482/IMG_1527+copy.JPG?format=1000w', 'https://static1.squarespace.com/static/598dd363a5790a4026dac8ab/59b80b5eccc5c57630823222/59e773aeb07869e5602d55c0/1508340678954/IMG_1790+copy.JPG?format=1000w', 'https://static1.squarespace.com/static/598dd363a5790a4026dac8ab/59b80b5eccc5c57630823222/59b80b7c37c581a69ce50d65/1506485130673/DSC_2874+copy.JPG?format=1000w', 'https://static1.squarespace.com/static/598dd363a5790a4026dac8ab/59b80b5eccc5c57630823222/59b80b692994caa2f5fe13f4/1506485127056/140712-0622.jpg?format=1000w', 'https://static1.squarespace.com/static/598dd363a5790a4026dac8ab/59b80b5eccc5c57630823222/59cb2374ccc5c5f4ec3125b0/1506485120534/P1070026+copy.JPG?format=1000w' ]}>
                        <div className='mdc-typography--headline'>
                            <b><TextContent identifier='slideshowBlurb' /></b>
                        </div><br />

                        <Link to='/meet' className='link'><div className='mdc-typography--headline'><TextContent identifier='slideshowLink' /></div></Link>
                    </Slideshow>

                    <JoinTeamPanel />
                </div>
            </div>
        );
    }
}
