import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { MDCSelect } from '@material/select';
import { connect } from 'react-redux';

import { uuid } from '../../../helpers';

class Select extends React.Component {

    constructor(props) {
        super(props);

        this.state = { uuid: `select-${uuid()}`, theme: _.cloneDeep(this.props.theme) };
    }

    mdcInit() {
        if (this.theme().classNamePrefix == 'mdc-') {
            const select = new MDCSelect(document.querySelector(`#${this.state.uuid}`));

            if (this.props.selectedIndex != null) {
                select.selectedIndex = this.props.selectedIndex;
            }
        }
    }

    componentDidMount() {
        this.mdcInit();
    }

    componentDidUpdate() {
        this.mdcInit();
    }

    theme() {
        return _.isEmpty(this.props.themeOverride) ? this.state.theme : this.props.themeOverride;
    }

    themedClassName(className) {
        return `${this.theme().classNamePrefix}${className}`
    }

    themedStyle() {
        let theme = this.theme();

        if (_.isEmpty(theme.styling) || _.isEmpty(theme.styling.select)) {
            theme.styling = { select: {} };
        }

        let styles = theme.styling.select;
        let customPanelTheme = _.isEmpty(this.props.customPanelTheme) ? {} : this.props.customPanelTheme;
        styles = { ...styles, ...styles.custom, ...customPanelTheme, ...customPanelTheme.custom };

        return styles;
    }

    renderNone() {
        let { label, onChange, selectedIndex, children, theme, themeOverride, dispatch, ...props } = this.props;

        return (
            <div>
                <div style={{ ...this.themedStyle() }}>
                    {label}
                </div>

                <select onChange={(event) => { this.props.onChange(event.target) }} {...props}>
                    {children}
                </select>
            </div>
        )
    }

    renderMdc() {
        let { className, label, onChange, selectedIndex, children, theme, themeOverride, customPanelTheme, dispatch, ...props } = this.props;
        className = _.isEmpty(className) ? '' : className;

        return (
            <div className={`${this.themedClassName('select')} ${className}`} id={this.state.uuid} role='listbox' data-mdc-auto-init='MDCSelect' {...props}>
                <select onChange={(event) => { this.props.onChange(event.target) }} className={this.themedClassName('select__native-control')}>
                    {children}
                </select>

                <label className={this.themedClassName('floating-label')} style={{ ...this.themedStyle() }}>
                    {this.props.label}
                </label>
                
                <div className={this.themedClassName('line-ripple')} />
            </div>
        );
    }

    render() {
        if (this.theme().classNamePrefix == 'mdc-') {
            return this.renderMdc();
        } else {
            return this.renderNone();
        }
    }
}

Select.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired,
    themeOverride: PropTypes.object,
    customPanelTheme: PropTypes.object
};

function mapStateToProps(state) {
    return {
        theme: state.themes.globalTheme,
    };
}

export default connect(mapStateToProps)(Select);
