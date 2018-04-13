import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { MDCSelect } from '@material/select';
import { connect } from 'react-redux';

class Select extends React.Component {

    constructor(props) {
        super(props);

        this.state = { uuid: `select-${Math.round(Math.random() * 1000000)}` }; // TODO: find better way to do this
    }

    themedClassName(className) {
        return `${this.props.theme.classNamePrefix}${className}`
    }

    componentDidMount() {
        const select = new MDCSelect(document.querySelector(`#${this.state.uuid}`));
        select.listen('MDCSelect:change', () => {
            this.props.onChange(select);
        });

        if (this.props.selectedIndex != null) {
            select.selectedIndex = this.props.selectedIndex;
        }
    }

    renderLabel() {
        let floatClassName = this.props.selectedIndex == null ? '' : this.themedClassName('select__label--float-above');

        return (
            <div className={`${this.themedClassName('select__label')} ${floatClassName}`}>
                {this.props.label}
            </div>
        )
    }

    render() {
        let { className, label, onChange, selectedIndex, children, theme, dispatch, ...props } = this.props;

        className = _.isEmpty(className) ? '' : className;

        return (
            <div className={`${this.themedClassName('select')} ${className}`} id={this.state.uuid} role='listbox' data-mdc-auto-init='MDCSelect' {...props}>
                <div className={this.themedClassName('select__surface')} tabIndex='0'>
                    {this.renderLabel()}
                    <div className={this.themedClassName('select__selected-text')} />
                    <div className={this.themedClassName('select__bottom-line')} />
                </div>

                <div className={`${this.themedClassName('menu')} ${this.themedClassName('select__menu')}`}>
                    <ul className={`${this.themedClassName('list')} ${this.themedClassName('menu__items')}`}>
                        {children}
                    </ul>
                </div>
            </div>
        );
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
    ]).isRequired
};

function mapStateToProps(state) {
    return {
        theme: state.themes.globalTheme,
    };
}

export default connect(mapStateToProps)(Select);
