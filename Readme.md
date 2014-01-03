
# tooltip

  Base tooltip component

## Installation

  Install with [component(1)](http://component.io):

    $ component install base-ui/tooltip

## Quick Start
```javascript
var Tooltip = require('tooltip');
var tooltip = new Tooltip;

tooltip.appendTo(document.body);
tooltip.text('Hello world');
tooltip.to(document.getElementById('target')).top();
```

## API
### tooltip
#### .at(Number targetX, Number targetY)
#### .to(Element target)
#### .show()
#### .hide()
#### .top(Number offset)
#### .left(Number offset)
#### .bottom(Number offset)
#### .right(Number offset)
#### .text(String text)
#### .html(String html)
#### .fixed()
#### .absolute()


## License

  MIT
