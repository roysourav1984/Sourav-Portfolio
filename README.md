# Sourav Portfolio

A modern, dynamic portfolio website built with Next.js, React, and TypeScript. Features a comprehensive showcase of professional experience, skills, initiatives, certifications, and achievements with an admin panel for content management.

## Features

- **Dynamic Content Sections**: Hero, summary, focus areas, initiatives, experience, skills matrix, certifications, awards, and education
- **Admin Panel**: Manage all portfolio content with authentication
- **Database-Driven**: PostgreSQL + Drizzle ORM for persistent data storage
- **Responsive Design**: Tailwind CSS for modern, mobile-friendly styling
- **Smooth Animations**: Framer Motion for engaging transitions and effects
- **Type-Safe**: Full TypeScript support across the codebase
- **Optimized Performance**: ISR (Incremental Static Regeneration) with 1-hour revalidation

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 16.2.9
- **Frontend**: React 19.2.4, TypeScript
- **Styling**: Tailwind CSS 4, PostCSS
- **Database**: PostgreSQL, Drizzle ORM
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Testing**: Jest, React Testing Library
- **Authentication**: bcryptjs

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sourav-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables by creating a `.env.local` file with your database connection string

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page (main portfolio)
│   ├── layout.tsx         # Root layout
│   ├── admin/             # Admin panel pages
│   ├── experience/        # Experience detail pages
│   ├── initiatives/       # Initiatives view
│   ├── focus-areas/       # Focus areas view
│   ├── credentials/       # Certifications view
│   ├── recognition/       # Awards view
│   └── [slug]/            # Dynamic pages
├── components/
│   ├── sections/          # Page sections (Hero, Experience, Skills, etc.)
│   ├── ui/                # Reusable UI components
│   └── admin/             # Admin panel components
├── lib/
│   ├── data/              # Data fetching functions
│   └── hooks/             # Custom React hooks
└── public/                # Static assets
```

## Available Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

## Admin Panel

Access the admin panel at `/admin` to manage all portfolio content including:
- Hero section content
- Professional summary
- Focus areas
- Initiatives
- Experience and roles
- Skills and competencies
- Certifications
- Awards and recognition
- Education history
- Contact information

## Content Sections

The portfolio includes the following sections:

1. **Hero**: Eye-catching introduction with headline and call-to-action
2. **Summary**: Professional overview and key highlights
3. **Focus Areas**: Core areas of expertise and specialization
4. **Initiatives**: Projects, programs, or major accomplishments
5. **Experience**: Detailed work history and roles
6. **Skills Matrix**: Technical and functional skills organized by category
7. **Certifications**: Professional certifications and credentials
8. **Awards**: Recognition and achievements
9. **Education**: Academic background and qualifications

## Performance

- Uses ISR with 1-hour revalidation for optimal performance
- Tailwind CSS for minimal CSS bundle size
- Image optimization via Next.js Image component
- Code-splitting and lazy loading for components

## Development

- Comprehensive test suite included
- ESLint configuration for code quality
- TypeScript for type safety
- Modular component architecture

## Learn More

For more information about the technologies used:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
