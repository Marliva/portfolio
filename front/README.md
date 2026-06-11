# Portfolio — Cédric Levasseur

Personal full-stack web developer portfolio, designed and developed from scratch.

## Overview

> Live link coming soon

## Tech stack

**Front-end**
- React 19
- Vite 8
- Tailwind CSS 4

**Back-end**
- Laravel 12
- Laravel Sanctum 4
- MySQL

## Project structure
portfolio/
├── front/     → React application (Vite)
└── back/      → Laravel API

## Features

- Project showcase with 3D tilt effect on hover
- Contact form connected to a Laravel REST API
- Protected admin dashboard (Sanctum) to manage received messages
- Dark mode, responsive design

## Local installation

### Requirements
- Node.js 20+
- PHP 8.3+
- Composer 2+
- MySQL

### Front-end

```bash
cd front
npm install
npm run dev
```

### Back-end

```bash
cd back
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## Contact

- GitHub : https://github.com/Marliva
- LinkedIn : https://www.linkedin.com/in/c-levasseur76/