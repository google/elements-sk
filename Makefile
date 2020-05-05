.PHONY: default
default: icons
	npx webpack-cli --mode=development

.PHONY: release
release: icons
	npm ci
	npx webpack-cli --mode=production

.PHONY: serve
serve: icons
	npx webpack-dev-server --mode=production --content-base ./dist --watch-poll

.PHONY: test
test:
	# Run the generated tests just once under Xvfb.
	npx karma start --single-run --browsers=ChromeHeadlessCustom

.PHONY: login
login:
	npm login --registry https://wombat-dressing-room.appspot.com

.PHONY: publish
publish: icons
	cd elements-sk; npm publish

.PHONY: update-major
update-major:
	cd elements-sk; npm version major
	echo "Don't forget to publish."

.PHONY: update-minor
update-minor:
	cd elements-sk; npm version minor
	echo "Don't forget to publish."

.PHONY: update-patch
update-patch:
	cd elements-sk; npm version patch
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
