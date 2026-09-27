# Render Deployment

This repository contains two Render services:

- `calvixo-api`: Django Web Service
- `calvixo-frontend`: Vite React Static Site
- `calvixo-db`: PostgreSQL database

## Blueprint deployment

1. In Render, choose **New > Blueprint** and select this repository.
2. Render will read `render.yaml`.
3. After the first deploy, update the hostname values in `render.yaml` if you choose names other than the defaults.
4. Migrations run during the backend build. If you need to run them manually from the backend service shell:

```bash
python manage.py migrate
python manage.py bootstrap_admin
```

## Required backend environment variables

The Blueprint creates the core variables automatically. Add these manually when email is needed:

```text
EMAIL_HOST_USER=your-smtp-user
EMAIL_HOST_PASSWORD=your-smtp-app-password
```

`DJANGO_SECRET_KEY` must remain private. Do not commit `.env` files or SMTP credentials.

## Uploaded files

Render Web Service storage is ephemeral. Menu and profile uploads will be lost after a restart or deploy unless a persistent disk or object storage provider is configured. For production, use S3-compatible storage or Cloudinary and configure Django storage accordingly.

## Health checks

After deployment, verify:

```text
https://calvixo-api.onrender.com/menus/public/
https://calvixo-frontend.onrender.com
```