# Talent Hub Backend

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker
- Docker Compose

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/PedroNetto404/talent-hub.git
    cd talent-hub
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Copy the `.env` file and configure your environment variables:

    ```sh
    cp .env.example .env
    ```

4. Update the `.env` file with your specific configuration:
    ```dotenv
    // ...existing code...
    ```

### Running the Application

1. Start the Docker containers:

    ```sh
    make docker-up
    ```

2. Run database migrations:

    ```sh
    make database-migrate
    ```

3. Run the development server:
    ```sh
    make dev
    ```

### Additional Commands

- To build the project:

    ```sh
    make build
    ```

- To drop the database:

    ```sh
    make database-drop
    ```

- To truncate the database:

    ```sh
    make database-truncate
    ```

- To lint the code:

    ```sh
    make lint
    ```

- To fix lint issues:
    ```sh
    make lint-fix
    ```

### Cleaning Up

To clean up the project (remove `dist`, `node_modules`, and `logs` directories):

```sh
npm run clean
```

### License

This project is licensed under the ISC License.

## Required Environment Variables

| Variable                    | Description                          |
| --------------------------- | ------------------------------------ |
| `DB_HOST`                   | Database host                        |
| `DB_PORT`                   | Database port                        |
| `DB_USER`                   | Database user                        |
| `DB_PASSWORD`               | Database password                    |
| `DB_NAME`                   | Database name                        |
| `DB_LOG_ENABLED`            | Enable database logging              |
| `DATABASE_URL`              | Database connection URL              |
| `PORT`                      | API server port                      |
| `HOST`                      | API server host                      |
| `API_DOC_ENABLED`           | Enable API documentation             |
| `JWT_ENABLED`               | Enable JWT authentication            |
| `JWT_SECRET`                | JWT secret key                       |
| `JWT_EXPIRES_IN`            | JWT expiration time                  |
| `JWT_AUDIENCE`              | JWT audience                         |
| `JWT_ISSUER`                | JWT issuer                           |
| `PASSWORD_RESET_EXPIRATION` | Password reset token expiration time |
| `PASSWORD_HASH_SALT`        | Password hash salt                   |
| `PASSWORD_RESET_PAGE_URL`   | Password reset page URL              |
| `SYS_ADMIN_ID`              | System admin ID                      |
| `SYS_ADMIN_EMAIL`           | System admin email                   |
| `SYS_ADMIN_PASSWORD`        | System admin password                |
| `BUCKET_ACCESS_KEY_ID`      | S3 bucket access key ID              |
| `BUCKET_SECRET_ACCESS_KEY`  | S3 bucket secret access key          |
| `BUCKET_DEFAULT`            | Default S3 bucket name               |
| `BUCKET_SERVICE_URL`        | S3 bucket service URL                |
| `BUCKET_REGION`             | S3 bucket region                     |
| `BUCKET_EXPOSE_URL`         | S3 bucket expose URL                 |
| `ALLOWED_IMAGE_TYPES`       | Allowed image types                  |
| `MAX_IMAGE_SIZE`            | Maximum image size                   |
| `ALLOWED_CV_TYPES`          | Allowed CV types                     |
| `MAX_CV_SIZE`               | Maximum CV size                      |
| `CACHE_HOST`                | Cache host                           |
| `CACHE_PORT`                | Cache port                           |
| `CLOUD_REGION`              | Cloud region                         |
| `CLOUD_ACCESS_KEY_ID`       | Cloud access key ID                  |
| `CLOUD_SECRET_ACCESS_KEY`   | Cloud secret access key              |
