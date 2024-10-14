.DEFAULT_GOAL := help
GODIR = cd go/
JSDIR = cd javascript/
TSDIR = cd typescript/
PYDIR = cd python/

.PHONY: go-client
#? go-client: Run Go client.
go-client:
	@$(GODIR) && go run client/client.go

.PHONY: go-server
#? go-server: Run Go server.
go-server:
	@$(GODIR) && go run server/server.go

.PHONY: js-client
#? js-client: Run JavaScript client.
js-client:
	@$(JSDIR) && npm run client

.PHONY: js-server
#? js-server: Run JavaScript server.
js-server:
	@$(JSDIR) && npm run server

.PHONY: ts-client
#? ts-client: Run TypeScript client.
ts-client:
	@$(TSDIR) && npm run client

.PHONY: ts-server
#? ts-server: Run TypeScript server.
ts-server:
	@$(TSDIR) && npm run server

.PHONY: py-client
#? py-client: Run Python client.
py-client:
	@$(PYDIR) && uv run client.py

.PHONY: py-server
#? py-server: Run Python server.
py-server:
	@$(PYDIR) && uv run server.py

#? help: Get more info on make commands.
help: Makefile
	@echo ''
	@echo 'Usage:'
	@echo '  make [target]'
	@echo ''
	@echo 'Targets:'
	@sed -n 's/^#?//p' $< | column -t -s ':' | sed -e 's/^/ /'
