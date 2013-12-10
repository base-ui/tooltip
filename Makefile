
build: components index.js template.js lib/*.js css/tooltip.css
	@component build --copy --dev
	@touch build/done
	@rm build/done
	@echo build done

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
