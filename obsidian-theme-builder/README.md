# Obsidian Theme Builder

A modern, documentation-driven theme builder for Obsidian with real-time preview and color palette management.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 📚 Documentation Driven Design

This project follows a **Documentation Driven Design (DDD)** approach, meaning:

- **Documentation First**: All features are documented before implementation
- **Living Documentation**: Documentation is updated alongside code changes
- **Usage Examples**: Each feature includes practical usage examples
- **Implementation Details**: Technical details are included in the same document

### Viewing Documentation

1. Start the development server: `npm run dev`
2. Open `http://localhost:5173`
3. Click "📚 Documentation" to view the living documentation
4. Navigate through features, guides, and API references

## 🎨 Features

- **Color Palette Management**: Create and manage color schemes with harmony generation
- **Theme Customization**: Visual interface for customizing Obsidian themes
- **Live Preview**: Real-time preview of theme changes
- **Export & Import**: Share and backup your themes
- **Documentation Viewer**: Built-in markdown documentation with navigation

## 🏗️ Architecture

The project is built with modern web technologies:

- **React 19** with TypeScript for type safety
- **Zustand** for lightweight state management
- **Chroma.js** for color manipulation and harmony
- **React Markdown** for documentation rendering
- **Vite** for fast development and building

## 📖 Documentation Structure

```
docs/
├── README.md              # Main documentation index
├── guides/               # User and development guides
│   ├── quick-start.md    # Getting started guide
│   └── development.md    # Development workflow
├── features/             # Feature documentation
│   ├── color-palette.md  # Color management
│   ├── theme-customization.md
│   ├── export-import.md
│   └── live-preview.md
├── api/                  # API reference
│   ├── core.md
│   ├── color-utils.md
│   └── theme-generation.md
└── architecture/         # System architecture
    ├── overview.md
    ├── components.md
    ├── state.md
    └── data-flow.md
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd obsidian-theme-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Workflow

1. **Document First**: Write documentation before implementing features
2. **Follow Standards**: Adhere to the `.cursorrules` guidelines
3. **Test Examples**: Ensure all documentation examples work
4. **Update Docs**: Keep documentation in sync with code changes

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## 📝 Documentation Standards

Each documentation file follows this format:

```markdown
# Feature Name

## Overview
Brief description of what this feature does and why it exists.

## Usage
Step-by-step instructions for using the feature.

### Examples
Practical examples with code snippets.

## Implementation
Technical details about how the feature is implemented.

### Code Structure
Key components, functions, and their purposes.

### Dependencies
Required libraries and their roles.

## API Reference
Detailed API documentation if applicable.
```

## 🤝 Contributing

We welcome contributions! Please follow our Documentation Driven Design approach:

1. **Read the Development Guide**: Check `docs/guides/development.md`
2. **Follow .cursorrules**: Adhere to the established coding standards
3. **Document First**: Write documentation before implementing features
4. **Test Everything**: Ensure all examples and code work correctly

### Development Rules

- All features must be documented before implementation
- Documentation must include both usage and implementation details
- Code examples must be tested and working
- Follow TypeScript and React best practices
- Maintain accessibility and performance standards

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Obsidian](https://obsidian.md/) for the amazing note-taking app
- [Chroma.js](https://gka.github.io/chroma.js/) for color manipulation
- [React Markdown](https://github.com/remarkjs/react-markdown) for documentation rendering

---

**Remember**: Documentation is not an afterthought - it's the foundation of our development process! 📚✨
