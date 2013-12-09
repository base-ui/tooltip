var position = require('position');

module.exports = Tooltip;

function Tooltip(el) {
  if (el.__tooltip__) {
    return el.__tooltip__;
  }

  this.el = el;
  this.el.__tooltip__ = this;
}

Tooltip.prototype.to = function (target) {
  return position(this.el).to(target);
}

Tooltip.prototype.at = function (pageX, pageY) {
  return position(this.el).at(pageX, pageY);
}

Tooltip.prototype.show = function () {
  this.el.classList.add('show');
}

Tooltip.prototype.hide = function () {
  this.el.classList.remove('show');
}
