'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _reactLibCSSPropertyOperations = require('react/lib/CSSPropertyOperations');

var _reactLibCSSPropertyOperations2 = _interopRequireDefault(_reactLibCSSPropertyOperations);

var _reactLibShallowEqual = require('react/lib/shallowEqual');

var _reactLibShallowEqual2 = _interopRequireDefault(_reactLibShallowEqual);

var cloneWithProps = _reactAddons2['default'].addons.cloneWithProps;

var Portal = (function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    _classCallCheck(this, Portal);

    _get(Object.getPrototypeOf(Portal.prototype), 'constructor', this).call(this);
    this.state = { active: false };
    this.openPortal = this.openPortal.bind(this);
    this.closePortal = this.closePortal.bind(this);
    this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.portal = null;
    this.node = null;
  }

  _createClass(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.closeOnEsc) {
        document.addEventListener('keydown', this.handleKeydown);
      }

      if (this.props.closeOnOutsideClick) {
        document.addEventListener('mousedown', this.handleOutsideMouseClick);
        document.addEventListener('touchstart', this.handleOutsideMouseClick);
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.isOpened) {
        this.openPortal();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      // portal's 'is open' state is handled through the prop isOpened
      if (typeof newProps.isOpened !== 'undefined') {
        if (newProps.isOpened) {
          if (this.state.active) {
            this.renderPortal(newProps);
          } else {
            this.openPortal();
          }
        }
        if (!newProps.isOpened && this.state.active) {
          this.closePortal();
        }
      }

      // portal handles its own 'is open' state
      if (typeof newProps.isOpened === 'undefined' && this.state.active) {
        this.renderPortal(newProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.closeOnEsc) {
        document.removeEventListener('keydown', this.handleKeydown);
      }

      if (this.props.closeOnOutsideClick) {
        document.removeEventListener('mousedown', this.handleOutsideMouseClick);
        document.removeEventListener('touchstart', this.handleOutsideMouseClick);
      }

      this.closePortal();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _reactLibShallowEqual2['default'])(this.props, nextProps) || !(0, _reactLibShallowEqual2['default'])(this.state, nextState);
    }
  }, {
    key: 'renderPortal',
    value: function renderPortal(props) {
      if (!this.node) {
        this.node = document.createElement('div');
        if (this.props.className) {
          this.node.className = this.props.className;
        }
        if (this.props.style) {
          _reactLibCSSPropertyOperations2['default'].setValueForStyles(this.node, this.props.style);
        }
        document.body.appendChild(this.node);
      }
      this.portal = _reactAddons2['default'].render(_reactAddons2['default'].cloneElement(props.children, { closePortal: this.closePortal }), this.node);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.openByClickOn) {
        return cloneWithProps(this.props.openByClickOn, { openPortal: this.openPortal, active: this.state.active });
      } else {
        return null;
      }
    }
  }, {
    key: 'openPortal',
    value: function openPortal(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      this.setState({ active: true });
      this.renderPortal(this.props);
    }
  }, {
    key: 'closePortal',
    value: function closePortal() {
      if (this.node) {
        _reactAddons2['default'].unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
      }
      this.portal = null;
      this.node = null;
      this.setState({ active: false });

      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }, {
    key: 'handleOutsideMouseClick',
    value: function handleOutsideMouseClick(e) {
      if (!this.state.active) {
        return;
      }
      if (isNodeInRoot(e.target, (0, _reactAddons.findDOMNode)(this.portal))) {
        return;
      }
      e.stopPropagation();
      this.closePortal();
    }
  }, {
    key: 'handleKeydown',
    value: function handleKeydown(e) {
      // ESC
      if (e.keyCode === 27 && this.state.active) {
        this.closePortal();
      }
    }
  }]);

  return Portal;
})(_reactAddons2['default'].Component);

exports['default'] = Portal;

Portal.propTypes = {
  children: _reactAddons2['default'].PropTypes.element.isRequired,
  openByClickOn: _reactAddons2['default'].PropTypes.element,
  closeOnEsc: _reactAddons2['default'].PropTypes.bool,
  closeOnOutsideClick: _reactAddons2['default'].PropTypes.bool,
  isOpened: _reactAddons2['default'].PropTypes.bool,
  onClose: _reactAddons2['default'].PropTypes.func
};

function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
module.exports = exports['default'];