# Development Guide

## Overview

This guide explains how to contribute to the Obsidian Theme Builder project following our Documentation Driven Design (DDD) approach. All development must follow the established patterns and documentation-first methodology.

## Usage

### Setting Up Your Development Environment

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd obsidian-theme-builder
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Documentation**
   - Navigate to `http://localhost:5173`
   - Click "📚 Documentation" to view the living documentation
   - Familiarize yourself with the existing documentation structure

### Development Workflow

#### Step 1: Document First
Before writing any code, create or update the relevant documentation:

1. **Identify the Feature**
   - What problem does it solve?
   - Who will use it?
   - How should it work?

2. **Create Documentation**
   - Add a new markdown file in the appropriate `docs/` subdirectory
   - Follow the established documentation format
   - Include usage examples and implementation details

3. **Get Review**
   - Have the documentation reviewed by the team
   - Ensure it follows DDD principles
   - Verify all examples are clear and accurate

#### Step 2: Plan Implementation
1. **Update Architecture Docs**
   - Modify `docs/architecture/` files if needed
   - Document new components and their relationships
   - Update data flow diagrams

2. **Define Interfaces**
   - Create TypeScript interfaces in `src/types/`
   - Document complex types with JSDoc
   - Ensure type safety

#### Step 3: Implement Feature
1. **Follow Established Patterns**
   - Use the component structure from existing features
   - Follow naming conventions
   - Implement proper error handling

2. **Write Tests**
   - Test all code examples from documentation
   - Implement unit tests for utility functions
   - Ensure accessibility compliance

3. **Update Documentation**
   - Keep documentation in sync with implementation
   - Add any missing details
   - Verify all examples work correctly

### Examples

#### Adding a New Feature
```bash
# 1. Create feature documentation
touch docs/features/new-feature.md

# 2. Update documentation index
# Edit docs/README.md to include new feature

# 3. Create feature branch
git checkout -b feature/new-feature

# 4. Implement feature
# Follow documentation specifications

# 5. Test and update docs
npm test
# Update documentation with any changes

# 6. Submit pull request
git add .
git commit -m "feat: add new feature with documentation"
git push origin feature/new-feature
```

#### Documentation Template
```markdown
# New Feature Name

## Overview
Brief description of the feature and its purpose.

## Usage
Step-by-step instructions for users.

### Examples
```javascript
// Practical code examples
const example = new Feature();
example.doSomething();
```

## Implementation
Technical details about the implementation.

### Code Structure
- Component descriptions
- Function purposes
- Data flow explanation

### Dependencies
- Required libraries
- External services
- Internal dependencies

## API Reference
Detailed API documentation.
```

## Implementation

### Project Structure

```
obsidian-theme-builder/
├── docs/                    # Documentation (Documentation First!)
│   ├── README.md           # Main documentation index
│   ├── guides/             # User and development guides
│   ├── features/           # Feature documentation
│   ├── api/               # API reference
│   └── architecture/      # System architecture
├── src/
│   ├── components/        # React components
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Utility functions
│   └── stores/           # Zustand stores
├── public/               # Static assets
└── .cursorrules          # Development rules
```

### Code Standards

#### TypeScript Configuration
```typescript
// Always use strict typing
interface FeatureProps {
  required: string;
  optional?: number;
  callback: (value: string) => void;
}

// Use proper component typing
const FeatureComponent: React.FC<FeatureProps> = ({ required, optional, callback }) => {
  // Implementation
};
```

#### Component Structure
```typescript
// src/components/FeatureComponent.tsx
import React from 'react';
import './FeatureComponent.css';

interface FeatureComponentProps {
  // Props interface
}

const FeatureComponent: React.FC<FeatureComponentProps> = (props) => {
  // Component logic
  return (
    <div className="feature-component">
      {/* Component JSX */}
    </div>
  );
};

export default FeatureComponent;
```

#### State Management
```typescript
// src/stores/featureStore.ts
import { create } from 'zustand';

interface FeatureState {
  // State interface
}

interface FeatureActions {
  // Action interfaces
}

const useFeatureStore = create<FeatureState & FeatureActions>((set) => ({
  // State and actions implementation
}));
```

### Dependencies

#### Core Dependencies
- **React 19**: Latest React with hooks
- **TypeScript**: Type safety and development experience
- **Zustand**: Lightweight state management
- **Chroma.js**: Color manipulation and harmony
- **React Markdown**: Documentation rendering

#### Development Dependencies
- **Vite**: Fast development server and build tool
- **ESLint**: Code linting and standards enforcement
- **Prettier**: Code formatting
- **TypeScript**: Type checking and compilation

### Testing Strategy

#### Documentation Testing
- All code examples must be tested
- Documentation links must be valid
- Examples must produce expected results
- Screenshots must be current

#### Code Testing
```typescript
// Example test structure
describe('FeatureComponent', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle user interactions', () => {
    // Test user interactions
  });

  it('should be accessible', () => {
    // Test accessibility
  });
});
```

## API Reference

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run tests
npm test

# Preview production build
npm run preview
```

### Documentation Commands

```bash
# Validate documentation links
npm run docs:validate

# Generate documentation index
npm run docs:index

# Test documentation examples
npm run docs:test
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/documentation-driven-feature

# Make changes (documentation first!)
git add docs/features/new-feature.md
git commit -m "docs: add new feature documentation"

# Implement feature
git add src/components/NewFeature.tsx
git commit -m "feat: implement new feature"

# Update documentation with implementation details
git add docs/features/new-feature.md
git commit -m "docs: update with implementation details"

# Push and create pull request
git push origin feature/documentation-driven-feature
```

## Quality Assurance

### Code Review Checklist

- [ ] Documentation is written before implementation
- [ ] All examples in documentation are tested
- [ ] TypeScript types are properly defined
- [ ] Components follow established patterns
- [ ] Accessibility requirements are met
- [ ] Performance considerations are addressed
- [ ] Error handling is implemented
- [ ] Tests are written and passing

### Documentation Review

- [ ] Follows established format
- [ ] Includes practical examples
- [ ] Implementation details are accurate
- [ ] Links to related documentation
- [ ] No broken links or references
- [ ] Code examples are syntactically correct
- [ ] Examples produce expected results

### Performance Checklist

- [ ] Bundle size is optimized
- [ ] Components are properly memoized
- [ ] Large components use lazy loading
- [ ] Re-renders are minimized
- [ ] Performance is profiled regularly

## Troubleshooting

### Common Issues

1. **Documentation not rendering**
   - Check markdown syntax
   - Verify file is in correct directory
   - Ensure navigation is updated

2. **TypeScript errors**
   - Check interface definitions
   - Verify import statements
   - Ensure proper typing

3. **Component not working**
   - Check documentation examples
   - Verify prop interfaces
   - Test in isolation

### Getting Help

- Check existing documentation in `docs/`
- Review `.cursorrules` for development standards
- Consult the architecture documentation
- Ask for code review from team members

## Best Practices

### Documentation First
- Always write documentation before code
- Keep documentation and code in sync
- Test all documentation examples
- Update documentation with every change

### Code Quality
- Use TypeScript for type safety
- Follow established patterns
- Write clean, readable code
- Implement proper error handling

### Testing
- Test all code examples
- Write unit tests for utilities
- Test components in isolation
- Ensure accessibility compliance

### Collaboration
- Use conventional commit messages
- Create focused pull requests
- Review documentation thoroughly
- Keep communication clear and concise

Remember: **Good documentation is the foundation of maintainable code.**