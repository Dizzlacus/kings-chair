# kings-chair

Static gallery site for King's Chair — a hairdressing salon.

## Docker

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine with Compose v2.

### Local preview (auto-sync on save)

Build once, then sync file changes into the container automatically. Works from `/Library/PersonalProjects` without Docker File Sharing setup:

```bash
docker compose down
docker compose up --build --watch
```

Open http://localhost:8080 — save a file, then refresh the browser.

Do **not** use `--profile live` (removed — it required a bind mount that fails on this Mac path).

Requires Docker Compose v2.22+ (`docker compose version` to check).

### One-off build (no watch)

```bash
docker compose up --build
```

Rebuild the image after each change.

```bash
docker build -t kings-chair .
docker run -p 80:80 kings-chair
```

Terminate HTTPS at your reverse proxy or load balancer in production; the container serves HTTP on port 80.

## Customisation

- Logo: `images/logo.png` (brand colours: `#ffffff`, `#313131`, `#f46910`)
- Hero image: `images/hero.jpg`
- Gallery: `images/gallery/*.png`
- Update the Book now link in `index.html` if you add a dedicated booking URL
