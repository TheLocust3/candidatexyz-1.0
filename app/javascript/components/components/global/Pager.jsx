import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

class Pager extends React.Component {

    renderLeft() {
        if (this.props.page == 0) return;

        return (
            <Link to={`${this.props.url}?page=${this.props.page - 1}`} className='page-number'>
                &lt;
            </Link>
        );
    }

    renderRight() {
        if (this.props.page >= this.props.numberOfPages - 1) return;

        return (
            <Link to={`${this.props.url}?page=${this.props.page + 1}`} className='page-number'>
                &gt;
            </Link>
        );
    }

    render() {
        return (
            <div className='pager'>
                {this.renderLeft()}

                {_.range(0, this.props.numberOfPages).map((number) => {
                    if (this.props.page == number) {
                        return (
                            <span key={number} className='page-number page-number-selected'>
                                {number + 1}
                            </span>
                        )
                    }

                    return (
                        <Link to={`${this.props.url}?page=${number}`} key={number} className='page-number'>
                            {number + 1}
                        </Link>
                    )
                })}

                {this.renderRight()}
            </div>
        );
    }
}

Pager.propTypes = {
    numberOfPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired
};

export default Pager;
