# kings-chair

Static gallery site for King's Chair — a hairdressing salon.

## Docker

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine with Compose v2.

### Local preview

Build and serve the site at http://localhost:8080:

```bash
docker compose up --build
```

The `images/` directory must be present before building (it is referenced by `index.html`).

### Live edit mode

Mount the project directory into nginx so HTML, JS, and image changes appear without rebuilding:

```bash
docker compose --profile dev-live up
```

### Production

Build and run the image directly:

```bash
docker build -t kings-chair .
docker run -p 80:80 kings-chair
```

Terminate HTTPS at your reverse proxy or load balancer in production; the container serves HTTP on port 80.

## Customisation

- Replace `images/logo.svg` with your salon logo
- Swap `images/gallery/placeholder-*.jpg` with real salon photos
- Update contact details and the Book now link in `index.html`
