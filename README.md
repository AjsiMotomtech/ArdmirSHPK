# Ardmir Shpk Website

A modern, responsive business website for Ardmir Shpk showcasing their diverse portfolio of services across multiple industries with rich visual storytelling and interactive design.

## Features

- **Responsive Design**: Fully responsive website that looks great on all devices
- **Multilingual Support**: Bilingual support for Albanian (SQ) and English (EN)
- **Modern UI**: Clean, professional design with interactive components
- **Content Management**: Admin panel for managing projects, services, and contact messages
- **Contact Form**: Integrated contact form with Formspree
- **Project Showcase**: Display of various projects categorized by industry

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **Translation**: i18next for multilingual support
- **Form Handling**: @formspree/react for form submissions
- **State Management**: React Query for data fetching
- **Routing**: Wouter for client-side routing
- **Data Storage**: JSON file-based storage for content management

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Access the website at: http://localhost:5000

## Project Structure

- `/client`: Frontend React application
  - `/src/components`: React components
  - `/src/lib`: Utility functions and API services
  - `/src/locales`: Translation files
  - `/src/pages`: Page components
- `/server`: Backend Express server
  - `routes.ts`: API endpoints
  - `dataService.ts`: Data storage and retrieval
  - `emails.ts`: Email service
- `/shared`: Shared schema definitions

## Admin Panel

To access the admin panel, navigate to `/admin-ardmir` and enter the access code: `ardmir2024`

The admin panel allows you to:
- View and manage projects
- View and manage services
- View and delete contact messages

## Contact Form

The contact form integrates with Formspree for email delivery. To configure email settings:

1. Update the Formspree form ID in `client/src/components/ContactSection.tsx`
2. Set up email environment variables in production for proper email delivery

## Deployment

The application is ready for deployment on any platform that supports Node.js applications.

## License

This project is licensed under the MIT License.