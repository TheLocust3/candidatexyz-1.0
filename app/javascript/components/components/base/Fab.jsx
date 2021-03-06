import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDCRipple } from '@material/ripple';

import { uuid } from '../../../helpers';

class Fab extends React.Component {

    constructor(props) {
        super(props);

        this.state = { uuid: `fab-${uuid()}`, theme: _.cloneDeep(this.props.theme) }
    }

    componentDidMount() {
        MDCRipple.attachTo(document.querySelector(`#${this.state.uuid}`));
    }

    theme() {
        return _.isEmpty(this.props.themeOverride) ? this.state.theme : this.props.themeOverride;
    }

    themedClassName(className) {
        let theme = this.theme();

        return `${theme.classNamePrefix}${className}`
    }

    themedStyle() {
        let theme = this.theme();

        if (_.isEmpty(theme.styling) || _.isEmpty(theme.styling.fab)) {
            theme.styling = { fab: {} };
        }

        let styles = theme.styling.fab;
        let customPanelTheme = _.isEmpty(this.props.customPanelTheme) ? {} : this.props.customPanelTheme;

        // ie needs a background color override
        styles = { backgroundColor: '#00427c', ...styles, ...styles.custom, ...customPanelTheme, ...customPanelTheme.custom };

        return styles;
    }

    render() {
        let { className, style, condensed, children, theme, themeOverride, customPanelTheme, dispatch, ...props } = this.props;

        className = _.isEmpty(className) ? '' : className;
        let fabMiniClassName = condensed ? this.themedClassName('fab--mini') : '';

        return (
            <button id={this.state.uuid} className={`relative ${this.themedClassName('fab')} ${fabMiniClassName} ${className}`} style={{  ...this.themedStyle(), ...style }} {...props}>
                {children}
            </button>
        );
    }
}

Fab.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    condensed: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string
    ]).isRequired,
    themeOverride: PropTypes.object,
    customPanelTheme: PropTypes.object
};

function mapStateToProps(state) {
    return {
        theme: state.themes.globalTheme,
    };
}

export default connect(mapStateToProps)(Fab);
