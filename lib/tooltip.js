var j = require('jquery');
var domify = require('domify');
var position = require('position');
var template = require('../template');

module.exports = Tooltip;

function Tooltip(el) {
  el = el || domify(template);

  if (el.__tooltip__) {
    return el.__tooltip__;
  }

  this.el = el;
  this.el.__tooltip__ = this;
}

Tooltip.prototype.html = function (html) {
  j(this.el).find('>.content').html(html);
}

Tooltip.prototype.text = function (text) {
  j(this.el).find('>.content').text(text);
}

Tooltip.prototype.resetPosition = function () {
  this.el.classList.remove('top');
  this.el.classList.remove('left');
  this.el.classList.remove('bottom');
  this.el.classList.remove('right');
}

Tooltip.prototype.right = function (offset) {
  this.resetPosition();
  this.el.classList.add('right');
  position(this.el).to(this.target).right(offset).center();
}

Tooltip.prototype.left = function (offset) {
  this.resetPosition();
  this.el.classList.add('left');
  position(this.el).to(this.target).left(offset).center();
}

Tooltip.prototype.top = function (offset) {
  this.resetPosition();
  this.el.classList.add('top');
  position(this.el).to(this.target).top(offset).center();
}

Tooltip.prototype.bottom = function (offset) {
  this.resetPosition();
  this.el.classList.add('bottom');
  position(this.el).to(this.target).bottom(offset).center();
}

Tooltip.prototype.to = function (target) {
  this.target = target;
  position(this.el).to(this.target);

  return this;
}

Tooltip.prototype.at = function (pageX, pageY) {
  return position(this.el).at(pageX, pageY);
}

Tooltip.prototype.show = function () {
  document.body.appendChild(this.el);
  this.el.classList.add('show');
}

Tooltip.prototype.hide = function () {
  document.body.removeChild(this.el);
  this.el.classList.remove('show');
}
