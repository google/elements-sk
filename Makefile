.PHONY: clean-build
clean-build:
	npm run clean; npm run build

.PHONY: test
test:
	npx karma start --single-run --browsers ChromeHeadless

.PHONY: login
login:
	npm login --registry https://wombat-dressing-room.appspot.com

.PHONY: publish
publish:
	npm run clean; npm run build; cd elements-sk; npm publish

.PHONY: update-major
update-major:
	cd src; npm version major
	echo "Don't forget to publish."

.PHONY: update-minor
update-minor:
	cd src; npm version minor
	echo "Don't forget to publish."

.PHONY: update-patch
update-patch:
	cd src; npm version patch
	echo "Don't forget to publish."

.PHONY: docs
docs:
	npx jsdoc -c jsdoc.config.js

.PHONY: icons
icons:
	go run generate_icons.go

.PHONY: npm-deps
npm-deps:
	npm ci
