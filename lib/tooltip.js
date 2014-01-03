var j = require('jquery');
var domify = require('domify');
var template = require('../template');

module.exports = Tooltip;

function Tooltip(el) {
  el = el || domify(template);

  if (el.__tooltip__ instanceof Tooltip) {
    return el.__tooltip__;
  }

  this.el = el;
  this.el.__tooltip__ = this;
}

Tooltip.prototype.arrowHeight = 6;
Tooltip.prototype.arrowWidth = 6;

Tooltip.prototype.targetX = 0;
Tooltip.prototype.targetY = 0;
Tooltip.prototype.targetWidth = 0;
Tooltip.prototype.targetHeight = 0;

Tooltip.prototype.positionX = 0;
Tooltip.prototype.positionY = 0;

Tooltip.prototype.html = function (html) {
  j(this.el).find('>.content').html(html);
}

Tooltip.prototype.text = function (text) {
  j(this.el).find('>.content').text(text);
}

Tooltip.prototype.top = function (offset) {
  offset = offset || 0;
  this.resetDirection();
  this.el.classList.add('top');

  var x = this.targetX + (this.targetWidth / 2) - (this.el.offsetWidth / 2);
  var y = this.targetY - this.el.offsetHeight - this.arrowHeight - offset;

  this.position(x, y);

  return this;
}

Tooltip.prototype.right = function (offset) {
  offset = offset || 0;
  this.resetDirection();
  this.el.classList.add('right');

  var x = this.targetX + this.targetWidth + this.arrowWidth + offset;
  var y = this.targetY + (this.targetHeight / 2) - (this.el.offsetHeight / 2);

  this.position(x, y);

  return this;
}

Tooltip.prototype.bottom = function (offset) {
  offset = offset || 0;
  this.resetDirection();
  this.el.classList.add('bottom');

  var x = this.targetX + (this.targetWidth / 2) - (this.el.offsetWidth / 2);
  var y = this.targetY + this.targetHeight + this.arrowHeight + offset;

  this.position(x, y);

  return this;
}

Tooltip.prototype.left = function (offset) {
  offset = offset || 0;
  this.resetDirection();
  this.el.classList.add('left');

  var x = this.targetX - this.el.offsetWidth - this.arrowWidth - offset;
  var y = this.targetY + (this.targetHeight / 2) - (this.el.offsetHeight / 2);

  this.position(x, y);

  return this;
}

Tooltip.prototype.at = function (targetX, targetY) {
  this.setTarget(targetX, targetY, 0, 0);

  return this;
}

Tooltip.prototype.to = function (target) {
  var targetRect = target.getBoundingClientRect();

  this.setTarget(targetRect.left, targetRect.top, target.offsetWidth, target.offsetHeight);

  return this;
}

Tooltip.prototype.setTarget = function (x, y, width, height) {
  if (this.el.parentNode === null) {
    throw new Error('Tooltip is not appended to DOM');
  }

  if (this.el.classList.contains('fixed')) {
    this.targetX = x;
    this.targetY = y;
  } else {
    this.targetX = x + window.pageXOffset;
    this.targetY = y + window.pageYOffset;
  }

  this.targetWidth = width;
  this.targetHeight = height;

  return this;
}

Tooltip.prototype.position = function (x, y) {
  if (this.el.parentNode === null) {
    throw new Error('Tooltip is not appended to DOM');
  }

  this.positionX = x;
  this.positionY = y;
  this.el.style.left = x + 'px';
  this.el.style.top = y + 'px'; 
}

Tooltip.prototype.appendTo = function (parent) {
  parent.appendChild(this.el);
}

Tooltip.prototype.remove = function () {
  this.el.parentNode.removeChild(this.el);
}

Tooltip.prototype.hide = function () {
  this.el.classList.remove('show');
}

Tooltip.prototype.show = function () {
  this.el.classList.add('show');
}

Tooltip.prototype.fixed = function () {
  this.el.classList.add('fixed');

  return this;
}

Tooltip.prototype.absolute = function () {
  this.el.classList.remove('fixed');

  return this;
}

Tooltip.prototype.resetDirection = function () {
  this.el.classList.remove('top');
  this.el.classList.remove('left');
  this.el.classList.remove('bottom');
  this.el.classList.remove('right');
}

Tooltip.prototype.isHidden = function () {
  if (this.el.classList.contains('show')) {
    return false;
  }

  return true;
}
