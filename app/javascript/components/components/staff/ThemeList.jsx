import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ThemeApi from '../../../api/theme-api';

class ThemeList extends React.Component {

    onDeleteClick(event) {
        ThemeApi.destroy(event.target.name).then(() => {
            location.reload();
        });
    }

    onSetDefaultClick(event) {
        this.props.onSetDefaultClick(event);
    }

    renderEditButtons(theme) {
        if (!theme.editable) return;

        return (
            <span>
                <span className='mdc-list-item__meta material-icons list-meta-item' aria-label='Delete'>
                    <a href='#' className='unstyled-link' name={theme.name} onClick={this.onDeleteClick.bind(this)}>
                        delete
                    </a>
                </span>

                <span className='mdc-list-item__meta material-icons list-meta-item' aria-label='Edit'>
                    <Link className='unstyled-link' to={`/staff/themes/${theme.name}`}>
                        edit
                    </Link>
                </span>
            </span>
        )
    }

    renderThemeList() {
        return (
            this.props.themes.map((theme) => {
                let starColor = theme.name == this.props.globalTheme.name ? '#FFEA00' : 'black';

                return (
                    <li key={theme.id} className='mdc-list-item theme-list'>
                        <span className='mdc-list-item__text'>
                            {theme.name}

                            <span className='mdc-list-item__secondary-text'>
                                {theme.description}
                            </span>
                        </span>

                        <span className='list-meta-items'>
                            {this.renderEditButtons(theme)}
                            <span className='mdc-list-item__meta material-icons list-meta-item' aria-label='Set Default'>
                                <a href='#' className='unstyled-link' name={theme.name} onClick={this.onSetDefaultClick.bind(this)} style={{ color: starColor }}>
                                    grade
                                </a>
                            </span>
                        </span>
                    </li>
                );
            })
        )
    }

    render() {
        return (
            <div className='content-5'>
                {this.renderThemeList()}
            </div>
        );
    }
}

ThemeList.propTypes = {
    themes: PropTypes.arrayOf(PropTypes.object),
    globalTheme: PropTypes.object
};

export default ThemeList;