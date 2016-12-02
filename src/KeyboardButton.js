import React, {PureComponent, PropTypes} from 'react';

export default class KeyboardButton extends PureComponent {
	static propTypes = {
		value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]),
		classes: PropTypes.string,
		onClick: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.value);
	}

	handleTab() {
		this.props.onClick('&tab;');
	}

	render() {
		if (this.props.value == "tab") {
			return (
				<button className={'keyboard-button' + ' ' + this.props.classes} onClick={this.handleTab}>
					Tab
				</button>
			);
		}

		return (
			<button className={'keyboard-button' + ' ' + this.props.classes} onClick={this.handleClick}>
				{this.props.value}
			</button>
		);
	}
}
