PROJECT = "talent-hub"

docker-up:
	@echo "Running docker compose on project: $(PROJECT)"
	docker compose -f docker-compose.yml up -d

docker-down:
	@echo "Stopping docker compose on project: $(PROJECT)"
	docker compose -f docker-compose.yml down

docker-down-clean:
	@echo "Stopping docker compose on project: $(PROJECT)"
	docker compose -f docker-compose.yml down -v

dev:
	@echo "Running development server on project: $(PROJECT)"
	npm run dev

build:
	@echo "Building project: $(PROJECT)"
	npm run build

database-drop:
	@echo "Dropping database: $(PROJECT)"
	npm run database:drop

database-migrate:
	@echo "Migrating database: $(PROJECT)"
	npm run database:migrate

database-truncate:
	@echo "Truncating database: $(PROJECT)"
	npm run database:truncate

database-seed:
	@echo "Seeding database: $(PROJECT)"
	npm run database:seed

lint:
	@echo "Linting project: $(PROJECT)"
	npm run lint

lint-fix:
	@echo "Fixing lint issues on project: $(PROJECT)"
	npm run lint:fix

clean:
	@echo "Cleaning project: $(PROJECT)"	
	npm run clean