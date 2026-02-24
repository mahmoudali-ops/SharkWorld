🌊 SharkWorlds – Tourism & Experience Platform

SharkWorlds is a live, production-ready tourism and experiences platform built to manage tours, bookings, multilingual content, and SEO optimization with a strong focus on performance, scalability, and security.

🚀 Live Website:
👉 https://www.sharkworlds.de/

📌 Project Overview

The system is structured into two fully connected environments:

🌐 Client Website

Browse tours & experiences

SEO-friendly slug-based routing

Multi-language support

Booking requests with email notifications

Fully responsive UI (mobile, tablet, desktop)

Optimized performance with SSR

🛠️ Admin Dashboard

Full management of tours & categories

Dynamic multi-language content control

Image & media management

SEO metadata control (Meta Title, Description, Keywords)

Booking management panel

Role-based secured access

All content is fully dynamic and managed without hardcoded text.

🧱 System Architecture
🔹 Backend Architecture

Clean Layered Architecture (API → Application → Domain → Infrastructure)

Repository + Unit of Work + Specification Pattern

DTO-based RESTful API design

Dependency Injection & SOLID principles

Centralized exception handling & logging

🔹 Frontend Architecture

Standalone Angular architecture

Feature-based module separation (Client / Admin)

Lazy-loaded routes & components

Server-Side Rendering (SSR) with client hydration

🛠️ Tech Stack
Backend

ASP.NET Core Web API (.NET 8)

C#

Entity Framework Core

SQL Server

Redis (Caching)

JWT Authentication (HttpOnly Cookies)

ASP.NET Core Identity

Swagger

Frontend

Angular 17

TypeScript

Angular Signals

Angular SSR

Bootstrap 5

RxJS

Reactive Forms

DevOps & Integrations

Git & GitHub

Production HTTPS Deployment

SMTP Email Integration

Image optimization (WebP, compression)

🔐 Authentication & Security

JWT-based authentication

Tokens stored in HttpOnly Secure Cookies

Role-based authorization

Protected admin routes

Secure CORS configuration

HTTPS-only communication

🌍 Internationalization (i18n)

Fully dynamic multilingual system.

Supported languages:
🇬🇧 English | 🇩🇪 German

Language handling on backend & frontend

Admin-controlled translations

No static or hardcoded content

⚡ Performance Optimizations
Backend

Redis caching with custom caching attributes

Server-side pagination

Optimized EF Core queries

Async/Await across I/O operations

Frontend

Server-Side Rendering (SSR)

Lazy loading

Client hydration

SEO & Lighthouse optimized builds

📈 SEO Features

Server-Side Rendering (SSR)

Dynamic Meta Tags

Open Graph tags

Sitemap.xml

SEO-friendly slug routing

Admin-controlled SEO metadata

✉️ Booking & Email System

Booking requests linked to  tours

SMTP email notifications

Booking data stored in database

Admin management panel

🧑‍💻 Author

Mahmoud Ali
Full Stack .NET & Angular Developer

⭐ Notes

This is a real production deployment.

Actively running on a live domain.

Built using enterprise-level patterns and best practices.
