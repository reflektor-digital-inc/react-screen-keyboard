import React, {PureComponent, PropTypes} from 'react';
import KeyboardButton from './KeyboardButton';

import LatinLayout from './layouts/LatinLayout';
import CyrillicLayout from './layouts/CyrillicLayout';
import SymbolsLayout from './layouts/SymbolsLayout';

import BackspaceIcon from './icons/BackspaceIcon';
import LanguageIcon from './icons/LanguageIcon';
import ShiftIcon from './icons/ShiftIcon';

export default class Keyboard extends PureComponent {
	static propTypes = {
		leftButtons: PropTypes.arrayOf(PropTypes.node),
		rightButtons: PropTypes.arrayOf(PropTypes.node),
		inputNode: PropTypes.any.isRequired,
		onClick: PropTypes.func,
		isFirstLetterUppercase: PropTypes.bool,
		defaultLanguage: PropTypes.string,
	};

	static defaultProps = {
		leftButtons: [],
		rightButtons: [],
		isFirstLetterUppercase: true,
		defaultLanguage: 'cyrrilic',
	};

	constructor(props) {
		super(props);
		this.handleLetterButtonClick = this.handleLetterButtonClick.bind(this);
		this.handleBackspaceClick = this.handleBackspaceClick.bind(this);
		this.handleLanguageClick = this.handleLanguageClick.bind(this);
		this.handleShiftClick = this.handleShiftClick.bind(this);
		this.handleSymbolsClick = this.handleSymbolsClick.bind(this);

		this.state = {
			currentLanguage: props.defaultLanguage,
			showSymbols: false,
			uppercase: false
		};
	}

	handleLanguageClick() {
		this.setState({currentLanguage: this.state.currentLanguage === 'latin' ? 'cyrrilic' : 'latin'});
	}

	handleShiftClick() {
		// console.log("shift!");
		this.setState({uppercase: !this.state.uppercase});
	}

	handleSymbolsClick() {
		this.setState({showSymbols: !this.state.showSymbols});
	}

	handleLetterButtonClickHandler(key) {
		this.handleLetterButtonClick(key);
	}

	handleLetterButtonClick(key) {
		// console.log("Keyy: ", key);

		if (key == 'Space') key = ' ';

		const {inputNode, isFirstLetterUppercase} = this.props;
		const {value, selectionStart, selectionEnd} = inputNode;
		
		if (this.state.uppercase){
			key = key.toUpperCase();
		}

		if (typeof value !== "undefined" && value.length > 0) {
			var nextValue = value.substring(0, selectionStart) + key + value.substring(selectionEnd);
		}
		else {
			var nextValue = (isFirstLetterUppercase) ? key.toUpperCase() : key;
		}

		// console.log("inputNode ", inputNode);

		this.props.setProp(inputNode.name, nextValue);
		inputNode.value = nextValue;
		if (this.props.onClick) {
			this.props.onClick(nextValue);
		}
		setTimeout(() => {
			inputNode.focus();
			inputNode.setSelectionRange(selectionStart + 1, selectionStart + 1);
		}, 0);
		inputNode.dispatchEvent(new Event('input'));
	}

	handleBackspaceClick() {
		const {inputNode} = this.props;
		const {value, selectionStart, selectionEnd} = inputNode;
		let nextValue;
		let nextSelectionPosition;
		if (selectionStart === selectionEnd) {
			nextValue = value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
			nextSelectionPosition = selectionStart - 1;
		} else {
			nextValue = value.substring(0, selectionStart) + value.substring(selectionEnd);
			nextSelectionPosition = selectionStart;
		}
		nextSelectionPosition = (nextSelectionPosition > 0) ? nextSelectionPosition : 0;

		
		this.props.setProp(inputNode.name, nextValue);
		inputNode.value = nextValue;
		if (this.props.onClick) {
			this.props.onClick(nextValue);
		}
		setTimeout(() => {
			inputNode.focus();
			inputNode.setSelectionRange(nextSelectionPosition, nextSelectionPosition);
		}, 0);
		inputNode.dispatchEvent(new Event('change'));
	}

	getKeys() {
		let keysSet;
		if (this.state.showSymbols) {
			keysSet = SymbolsLayout;
		} else if (this.state.currentLanguage === 'latin') {
			keysSet = LatinLayout;
		} else {
			keysSet = CyrillicLayout;
		}

		return keysSet;

		return this.state.uppercase ?
			keysSet.map(keyRow => keyRow.map(key => key.toUpperCase()))
			: keysSet;
	}

	getSymbolsKeyValue() {
		let symbolsKeyValue;
		if (!this.state.showSymbols) {
			symbolsKeyValue = '.?!&';
		} else if (this.state.currentLanguage === 'latin') {
			symbolsKeyValue = 'Abc';
		} else {
			symbolsKeyValue = 'Абв';
		}
		return symbolsKeyValue;
	}

	render() {
		const {leftButtons, rightButtons, inputNode} = this.props;
		const keys = this.getKeys();
		const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
		const symbolsKeyValue = this.getSymbolsKeyValue();

		return (
			<div className="keyboard">
				<div className="keyboard-row">
					{numbers.map((button) =>
						<KeyboardButton
							value={button}
							onClick={this.handleLetterButtonClick}
							classes={"keyboard-numberButton"}
							key={button}
						/>
					)}
					<KeyboardButton
						value='Del'
						classes="keyboard-backspace keyboard-last-in-row"
						onClick={this.handleBackspaceClick}
					/>
				</div>

				<div className="keyboard-row">
					{keys[0].map((button) =>
						<KeyboardButton
							value={button}
							onClick={this.handleLetterButtonClick}
							key={button}
						/>
					)}
					<KeyboardButton
							value={'tab'}
							classes="keyboard-last-in-row"
							onClick={()=>this.handleLetterButtonClickHandler(' ')}
						/>
				</div>

				<div className="keyboard-row">
					<div className="keyboard-halfButton"></div>
					{keys[1].map((button) =>
						<KeyboardButton
							value={button}
							onClick={this.handleLetterButtonClick}
							key={button}
						/>
					)}
					<KeyboardButton
							value={'@'}
							onClick={this.handleLetterButtonClick}
						/>
						<KeyboardButton
							value={'é'}
							classes="keyboard-last-in-row"
							onClick={this.handleLetterButtonClick}
						/>
					<div className="keyboard-halfButton"></div>
				</div>

				<div className="keyboard-row">
					{keys[2].map((button) =>
						<KeyboardButton
							value={button}
							onClick={this.handleLetterButtonClick}
							key={button}
						/>
					)}
						<KeyboardButton
							value={'-'}
							onClick={this.handleLetterButtonClick}
						/>

						<KeyboardButton
							value={'_'}
							onClick={this.handleLetterButtonClick}
						/>


						<KeyboardButton
							value={'.'}
							onClick={this.handleLetterButtonClick}
						/>


						<KeyboardButton
							value={`'`}
							classes="keyboard-last-in-row"
							onClick={this.handleLetterButtonClick}
						/>
						{
				// 	<KeyboardButton
				// 		value={symbolsKeyValue}
				// 		onClick={this.handleSymbolsClick}
				// 	/>
						}
				</div>
			

				<div className="keyboard-row">
					{
						// leftButtons
					}
					<KeyboardButton
						value={'Shift'}
						classes="keyboard-shift"
						onClick={this.handleShiftClick}
					/>
					{
					// <KeyboardButton
					// 	value={<LanguageIcon />}
					// 	onClick={this.handleLanguageClick}
					// />
					}
					{
					// 	true ?
					// 	<KeyboardButton
					// 		value={'@'}
					// 		onClick={this.handleLetterButtonClick}
					// 	/>
					// : null
				}
					<KeyboardButton
						value={'Space'}
						classes="keyboard-space"
						onClick={this.handleLetterButtonClick}
					/>



					{
						// rightButtons
					}
				</div>
			</div>
		);
	}
}
