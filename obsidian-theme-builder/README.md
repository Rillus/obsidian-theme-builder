# Obsidian Theme Builder

A web-based WYSIWYG editor for creating custom Obsidian themes without requiring CSS knowledge. Built with React, TypeScript, and following Documentation Driven Design principles.

## 🚀 Current Status

### ✅ Completed Stages

#### Stage 1: Foundation & Setup
- [x] Modern web development environment with React 18 + TypeScript
- [x] Vite build tool configuration
- [x] Project structure and folder organization
- [x] ESLint and formatting setup
- [x] Basic README and documentation

#### Stage 2: Obsidian CSS Variable Research & Mapping
- [x] Complete CSS variable database (400+ variables)
- [x] Variable categorization by component
- [x] TypeScript interfaces for theme data
- [x] CSS variable mapping system

#### Stage 3: Core Theme Engine ⭐ **JUST COMPLETED**
- [x] Theme data model with validation
- [x] CSS generation engine
- [x] Theme export functionality (manifest.json + theme.css)
- [x] State management with Zustand
- [x] Undo/redo functionality
- [x] File export utilities
- [x] Complete theme builder interface
- [x] Color, typography, layout, and component controls

### 🔄 Next Stage: Stage 4 - Preview System
- [ ] Obsidian UI mockup components
- [ ] Real-time preview updates
- [ ] Light/dark mode switching
- [ ] Responsive preview layouts

## 🎯 Features

### Current Features (Stage 3)
- **Visual Theme Editor**: Intuitive interface for creating themes
- **Color Management**: Full color palette customization
- **Typography Controls**: Font family, size, weight, and spacing
- **Layout Settings**: Sidebar width, padding, border radius
- **Component Styling**: Button, input, and modal customization
- **Real-time Validation**: Instant feedback on theme configuration
- **Export Options**: Download as files or ZIP, copy CSS to clipboard
- **Undo/Redo**: Full history management
- **Theme Import/Export**: Load and save theme configurations

### Planned Features
- **Live Preview**: Real-time Obsidian interface preview
- **Advanced Color Tools**: Color harmony, accessibility checking
- **Font Integration**: Google Fonts and custom font upload
- **Theme Templates**: Pre-built theme presets
- **Community Sharing**: Theme marketplace features

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: CSS Modules
- **File Handling**: JSZip for ZIP exports
- **Development**: ESLint, Prettier

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd obsidian-theme-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Usage

1. **Switch to Theme Builder**: Click the "🎨 Theme Builder" button in the header
2. **Customize Colors**: Use the Colors tab to set your theme's color palette
3. **Adjust Typography**: Configure fonts, sizes, and weights in the Typography tab
4. **Modify Layout**: Set spacing, border radius, and component dimensions
5. **Style Components**: Customize buttons, inputs, and modals
6. **Export Theme**: Click "Export Theme" to download your theme files
7. **Install in Obsidian**: Copy the generated files to your Obsidian themes folder

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ThemeBuilder.tsx # Main theme builder interface
│   ├── DocumentationViewer.tsx
│   └── MarkdownRenderer.tsx
├── data/               # Static data
│   └── obsidian-variables.ts # CSS variable mappings
├── store/              # State management
│   └── themeStore.ts   # Zustand store
├── types/              # TypeScript type definitions
│   ├── theme.ts        # Theme interfaces
│   └── css-variables.ts
├── utils/              # Utility functions
│   ├── themeEngine.ts  # Core theme engine
│   └── fileExport.ts   # File export utilities
└── App.tsx             # Main application component
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run type checking
npx tsc --noEmit
```

## 📋 Development Roadmap

### Stage 4: Preview System (Next)
- Obsidian interface mockup
- Real-time preview updates
- Light/dark mode switching

### Stage 5: Color Management System
- Advanced color picker
- Color harmony suggestions
- Accessibility contrast checking

### Stage 6: Typography Management
- Google Fonts integration
- Font preview and loading
- Typography presets

### Stage 7: User Interface & Experience
- Responsive design improvements
- Keyboard shortcuts
- Advanced export options

### Stage 8: Advanced Features
- Component-specific customization
- Theme templates and presets
- Custom CSS injection

### Stage 9: Testing & Quality Assurance
- Comprehensive test suite
- Cross-browser compatibility
- Performance optimization

### Stage 10: Documentation & Deployment
- User documentation
- Deployment infrastructure
- Analytics and monitoring

## 🤝 Contributing

This project follows Documentation Driven Design principles. All features must be documented before implementation.

1. Read the [Product Requirements Document](PRD_Obsidian_Theme_Builder.md)
2. Check the current stage and requirements
3. Create feature documentation first
4. Implement the feature
5. Update documentation as needed

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Obsidian team for the excellent note-taking app
- React and TypeScript communities
- All contributors to the open-source ecosystem

---

**Current Version**: Stage 3 Complete  
**Last Updated**: January 2025  
**Next Milestone**: Stage 4 - Preview System
