# Ardmir Shpk

A modern, responsive business website for Ardmir Shpk showcasing their diverse portfolio of services across multiple industries with rich visual storytelling and interactive design.

## 🌟 Features

- Modern, responsive design
- Multi-language support (English and Albanian)
- Project showcase with filtering capabilities
- Interactive hero section with image carousel
- Services overview
- About section with key statistics
- Testimonials section
- Contact form
- Mobile-friendly navigation

## 🛠️ Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - Framer Motion for animations
  - i18next for internationalization

- **Backend:**
  - Express.js
  - TypeScript
  - JSON file-based data storage
  - RESTful API endpoints

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ardmir-shpk.git
cd ardmir-shpk
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
ardmir-shpk/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── lib/          # Utility functions and data
│   │   ├── styles/       # Global styles
│   │   └── types/        # TypeScript type definitions
├── server/                # Backend Express application
│   ├── routes/           # API routes
│   └── data.json         # Project data
├── public/               # Static assets
│   └── images/          # Image files
└── shared/              # Shared types and utilities
```

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run check` - Run TypeScript type checking

## 🌐 API Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/project-categories` - Get project categories
- `GET /api/services` - Get all services
- `GET /api/about-stats` - Get about section statistics
- `GET /api/testimonials` - Get testimonials
- `POST /api/contact` - Submit contact form

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Ardmir Shpk - Initial work

## 🙏 Acknowledgments

- Shadcn UI for the beautiful component library
- Unsplash for the stock images
- All contributors who have helped with the project