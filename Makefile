.PHONY: help init

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

init: ## Initialize project (first time setup)
	@echo "Copying environment files..."
	@if [ ! -f backend/.env ]; then cp backend/.env.example backend/.env; echo "Created backend/.env"; fi
	@if [ ! -f frontend/.env ]; then cp frontend/.env.example frontend/.env; echo "Created frontend/.env"; fi
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Starting containers..."
	docker-compose up -d
	@echo "Waiting for database to be ready..."
	@bash -c 'until docker-compose exec -T db mysql -uroot -proot -e "SELECT 1" > /dev/null 2>&1; do \
		echo "Waiting for MySQL..."; \
		sleep 2; \
	done'
	@echo "Database is ready!"
	@echo "Installing backend dependencies..."
	docker-compose exec app composer install --no-interaction --prefer-dist --optimize-autoloader
	@echo "Running migrations..."
	docker-compose exec app php artisan migrate --force
	@echo "Seeding database..."
	docker-compose exec app php artisan db:seed --force
	@echo "Setup complete! Access:"
	@echo "  Frontend: http://localhost:3000"
	@echo "  Backend:  http://localhost:8000/api"
