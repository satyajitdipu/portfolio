# Satyajit Sahoo - Portfolio Website

A modern, responsive portfolio website built with React.js showcasing my skills, experience, and projects as a Backend Developer.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Clean and professional design with smooth animations
- **Interactive Navigation**: Smooth scrolling between sections
- **Contact Form**: Easy way for visitors to get in touch
- **Social Links**: Direct links to GitHub, LinkedIn, and HackerRank profiles

## 📋 Sections

- **Hero/Home**: Introduction with name, role, and call-to-action buttons
- **About**: Professional summary and what drives me
- **Skills**: Technical skills with visual progress bars and competencies
- **Experience**: Work history timeline with VirtualTx and HyScaler
- **Education**: Academic background and certifications
- **Contact**: Contact information and message form

## 🛠️ Technologies Used

- React.js
- React Icons
- CSS3 (with animations and gradients)
- HTML5

## 📦 Installation

1. Clone the repository or navigate to the portfolio folder
2. Install dependencies:
```bash
npm install
```

## 🚀 Running the Application

To start the development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `build` folder, ready for deployment.

## 📁 Project Structure

```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js & Header.css
│   │   ├── Hero.js & Hero.css
│   │   ├── About.js & About.css
│   │   ├── Skills.js & Skills.css
│   │   ├── Experience.js & Experience.css
│   │   ├── Education.js & Education.css
│   │   ├── Contact.js & Contact.css
│   │   └── Footer.js & Footer.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎨 Customization

To customize the portfolio with your own information:

1. Update personal information in the component files
2. Modify colors in CSS files (search for gradient colors)
3. Add your own profile picture in the Hero section
4. Update social media links with your profiles

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🌟 Key Features Implementation

- **Smooth Scrolling**: Implemented with smooth scroll behavior
- **Hover Effects**: Interactive elements with smooth transitions
- **Gradient Themes**: Purple/blue gradient theme throughout
- **Mobile Menu**: Hamburger menu for mobile devices
- **Form Handling**: Contact form with mailto functionality

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- How to set up git authentication properly
- Development workflow
- Troubleshooting common issues

## 🔧 Troubleshooting

### Git Push Permission Error (403)

If you encounter a `403` error when pushing to GitHub:

```
remote: Permission to satyajitdipu/portfolio.git denied to satyajitdipu.
fatal: unable to access 'https://github.com/satyajitdipu/portfolio.git/': The requested URL returned error: 403
```

**Quick Fixes:**

1. **Use SSH instead of HTTPS** (Recommended):
   ```bash
   git remote set-url origin git@github.com:satyajitdipu/portfolio.git
   ```

2. **Use GitHub CLI**:
   ```bash
   gh auth login
   gh auth setup-git
   ```

3. **Use Personal Access Token**: Create a token at GitHub Settings → Developer settings → Personal access tokens. When pushing, enter your GitHub username and use the token (not your GitHub password) when prompted for password.

For detailed solutions, see [CONTRIBUTING.md](./CONTRIBUTING.md#git-setup-and-authentication).

## 📄 License

This project is open source and available for personal use.

## 👤 Contact

- **Email**: satyajits1001@gmail.com
- **Phone**: 6372754900
- **LinkedIn**: [satyajit-sahoo-backend](https://www.linkedin.com/in/satyajit-sahoo-backend)
- **GitHub**: [satyajitdipu](https://github.com/satyajitdipu)
- **Location**: Bhubaneswar, Odisha, India

---

Built with ❤️ by Satyajit Sahoo
