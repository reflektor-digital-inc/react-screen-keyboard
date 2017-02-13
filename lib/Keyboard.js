'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _KeyboardButton = require('./KeyboardButton');

var _KeyboardButton2 = _interopRequireDefault(_KeyboardButton);

var _LatinLayout = require('./layouts/LatinLayout');

var _LatinLayout2 = _interopRequireDefault(_LatinLayout);

var _CyrillicLayout = require('./layouts/CyrillicLayout');

var _CyrillicLayout2 = _interopRequireDefault(_CyrillicLayout);

var _SymbolsLayout = require('./layouts/SymbolsLayout');

var _SymbolsLayout2 = _interopRequireDefault(_SymbolsLayout);

var _BackspaceIcon = require('./icons/BackspaceIcon');

var _BackspaceIcon2 = _interopRequireDefault(_BackspaceIcon);

var _LanguageIcon = require('./icons/LanguageIcon');

var _LanguageIcon2 = _interopRequireDefault(_LanguageIcon);

var _ShiftIcon = require('./icons/ShiftIcon');

var _ShiftIcon2 = _interopRequireDefault(_ShiftIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Keyboard = function (_PureComponent) {
	_inherits(Keyboard, _PureComponent);

	function Keyboard(props) {
		_classCallCheck(this, Keyboard);

		var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this, props));

		_this.handleLetterButtonClick = _this.handleLetterButtonClick.bind(_this);
		_this.handleBackspaceClick = _this.handleBackspaceClick.bind(_this);
		_this.handleLanguageClick = _this.handleLanguageClick.bind(_this);
		_this.handleShiftClick = _this.handleShiftClick.bind(_this);
		_this.handleSymbolsClick = _this.handleSymbolsClick.bind(_this);

		_this.state = {
			currentLanguage: props.defaultLanguage,
			showSymbols: false,
			uppercase: false
		};
		return _this;
	}

	_createClass(Keyboard, [{
		key: 'handleLanguageClick',
		value: function handleLanguageClick() {
			this.setState({ currentLanguage: this.state.currentLanguage === 'latin' ? 'cyrrilic' : 'latin' });
		}
	}, {
		key: 'handleShiftClick',
		value: function handleShiftClick() {
			// console.log("shift!");
			this.setState({ uppercase: !this.state.uppercase });
		}
	}, {
		key: 'handleSymbolsClick',
		value: function handleSymbolsClick() {
			this.setState({ showSymbols: !this.state.showSymbols });
		}
	}, {
		key: 'handleLetterButtonClickHandler',
		value: function handleLetterButtonClickHandler(key) {
			this.handleLetterButtonClick(key);
		}
	}, {
		key: 'handleLetterButtonClick',
		value: function handleLetterButtonClick(key) {
			// console.log("Keyy: ", key);

			if (key == 'Space') key = ' ';

			var _props = this.props,
			    inputNode = _props.inputNode,
			    isFirstLetterUppercase = _props.isFirstLetterUppercase;
			var value = inputNode.value,
			    selectionStart = inputNode.selectionStart,
			    selectionEnd = inputNode.selectionEnd;


			if (this.state.uppercase) {
				key = key.toString().toUpperCase();
			}

			if (typeof value !== "undefined" && value.length > 0) {
				var nextValue = value.substring(0, selectionStart) + key + value.substring(selectionEnd);
			} else {
				var nextValue = isFirstLetterUppercase ? key.toUpperCase() : key;
			}

			// console.log("inputNode ", inputNode);

			this.props.setProp(inputNode.name, nextValue);
			inputNode.value = nextValue;
			if (this.props.onClick) {
				this.props.onClick(nextValue);
			}
			setTimeout(function () {
				inputNode.focus();
				inputNode.setSelectionRange(selectionStart + 1, selectionStart + 1);
			}, 0);
			inputNode.dispatchEvent(new Event('input', { bubbles: true }));

			// Reset uppercase
			this.setState({ uppercase: false });
		}
	}, {
		key: 'handleBackspaceClick',
		value: function handleBackspaceClick() {
			var inputNode = this.props.inputNode;
			var value = inputNode.value,
			    selectionStart = inputNode.selectionStart,
			    selectionEnd = inputNode.selectionEnd;

			var nextValue = void 0;
			var nextSelectionPosition = void 0;
			if (selectionStart === selectionEnd) {
				nextValue = value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
				nextSelectionPosition = selectionStart - 1;
			} else {
				nextValue = value.substring(0, selectionStart) + value.substring(selectionEnd);
				nextSelectionPosition = selectionStart;
			}
			nextSelectionPosition = nextSelectionPosition > 0 ? nextSelectionPosition : 0;

			this.props.setProp(inputNode.name, nextValue);
			inputNode.value = nextValue;
			if (this.props.onClick) {
				this.props.onClick(nextValue);
			}
			setTimeout(function () {
				inputNode.focus();
				inputNode.setSelectionRange(nextSelectionPosition, nextSelectionPosition);
			}, 0);
			inputNode.dispatchEvent(new Event('input', { bubbles: true }));
		}
	}, {
		key: 'getKeys',
		value: function getKeys() {
			var keysSet = void 0;
			if (this.state.showSymbols) {
				keysSet = _SymbolsLayout2.default;
			} else if (this.state.currentLanguage === 'latin') {
				keysSet = _LatinLayout2.default;
			} else {
				keysSet = _CyrillicLayout2.default;
			}

			return keysSet;

			return this.state.uppercase ? keysSet.map(function (keyRow) {
				return keyRow.map(function (key) {
					return key.toUpperCase();
				});
			}) : keysSet;
		}
	}, {
		key: 'getSymbolsKeyValue',
		value: function getSymbolsKeyValue() {
			var symbolsKeyValue = void 0;
			if (!this.state.showSymbols) {
				symbolsKeyValue = '.?!&';
			} else if (this.state.currentLanguage === 'latin') {
				symbolsKeyValue = 'Abc';
			} else {
				symbolsKeyValue = 'Абв';
			}
			return symbolsKeyValue;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props2 = this.props,
			    leftButtons = _props2.leftButtons,
			    rightButtons = _props2.rightButtons,
			    inputNode = _props2.inputNode;

			var keys = this.getKeys();
			var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
			var symbolsKeyValue = this.getSymbolsKeyValue();

			return _react2.default.createElement(
				'div',
				{ className: 'keyboard' },
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					numbers.map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this2.handleLetterButtonClick,
							classes: "keyboard-numberButton",
							key: button
						});
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: 'Del',
						classes: 'keyboard-backspace keyboard-last-in-row',
						onClick: this.handleBackspaceClick
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					keys[0].map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this2.handleLetterButtonClick,
							key: button
						});
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: 'tab',
						classes: 'keyboard-last-in-row',
						onClick: function onClick() {
							return _this2.handleLetterButtonClickHandler(' ');
						}
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					_react2.default.createElement('div', { className: 'keyboard-halfButton' }),
					keys[1].map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this2.handleLetterButtonClick,
							key: button
						});
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: '@',
						onClick: this.handleLetterButtonClick
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: 'é',
						classes: 'keyboard-last-in-row',
						onClick: this.handleLetterButtonClick
					}),
					_react2.default.createElement('div', { className: 'keyboard-halfButton' })
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					keys[2].map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this2.handleLetterButtonClick,
							key: button
						});
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: '-',
						onClick: this.handleLetterButtonClick
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: '_',
						onClick: this.handleLetterButtonClick
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: '.',
						onClick: this.handleLetterButtonClick
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: '\'',
						classes: 'keyboard-last-in-row',
						onClick: this.handleLetterButtonClick
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					_react2.default.createElement(_KeyboardButton2.default, {
						value: 'Shift',
						classes: 'keyboard-shift',
						onClick: this.handleShiftClick
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: 'Space',
						classes: 'keyboard-space',
						onClick: this.handleLetterButtonClick
					})
				)
			);
		}
	}]);

	return Keyboard;
}(_react.PureComponent);

Keyboard.propTypes = {
	leftButtons: _react.PropTypes.arrayOf(_react.PropTypes.node),
	rightButtons: _react.PropTypes.arrayOf(_react.PropTypes.node),
	inputNode: _react.PropTypes.any.isRequired,
	onClick: _react.PropTypes.func,
	isFirstLetterUppercase: _react.PropTypes.bool,
	defaultLanguage: _react.PropTypes.string
};
Keyboard.defaultProps = {
	leftButtons: [],
	rightButtons: [],
	isFirstLetterUppercase: true,
	defaultLanguage: 'cyrrilic'
};
exports.default = Keyboard;
//# sourceMappingURL=Keyboard.js.map