# Satyajit Portfolio

A modern, responsive personal portfolio website built with React.js, showcasing my skills, projects, experience, and blog posts.

## Features

- **Hero Section**: Eye-catching introduction with call-to-action
- **About**: Personal background and professional summary
- **Skills**: Technical skills and competencies
- **Experience**: Work experience and career highlights
- **Education**: Academic background and certifications
- **Timeline**: Career and project timeline
- **Projects**: Showcase of development projects with GitHub links
- **Resume**: Downloadable resume
- **Testimonials**: Client and colleague testimonials
- **Blog**: Personal blog posts and technical articles
- **Gallery**: Visual showcase of work and designs
- **Contact**: Contact form and social links
- **Newsletter**: Email subscription for updates

## Technologies Used

- React.js
- CSS3
- React Icons
- React Testing Library
- Jest

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/satyajitdipu/portfolio.git
   cd portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Admin Panel (Local)

An `AdminPanel` component is included on the site to let you add / edit / remove projects locally. Data is stored in the browser's `localStorage` under the key `portfolioData`. To import the bundled sample data open the Admin Panel and click **Import Defaults**. This is intentionally a lightweight local administration interface useful for demoing content without a backend.

## Project Structure

```
src/
  components/
    About.js
    Blog.js
    Contact.js
    Education.js
    Experience.js
    Footer.js
    Gallery.js
    Header.js
    Hero.js
    Newsletter.js
    Projects.js
    Resume.js
    Skills.js
    Testimonials.js
    Timeline.js
  App.js
  index.js
public/
  index.html
```

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is private.