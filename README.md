# CCRender

A powerful Canvas-based rendering library for creating interactive graphics.

## Features

- Core rendering system for basic shapes and paths
- Layer management system
- Event handling system
- Utility functions for mathematics and color processing
- Performance optimization tools

## Project Structure

```
src/
├── Core/               # Core rendering functionality
│   ├── Canvas.ts      # Canvas context management
│   ├── Renderer.ts    # Main renderer
│   └── Transform.ts   # Transform matrix operations
│
├── Shapes/            # Basic shape implementations
│   ├── Shape.ts       # Base shape class
│   ├── Rectangle.ts   # Rectangle shape
│   ├── Circle.ts      # Circle shape
│   └── Path.ts        # Custom path
│
├── Layers/            # Layer system
│   ├── Layer.ts       # Base layer class
│   ├── ImageLayer.ts  # Image layer
│   └── GroupLayer.ts  # Group layer for composition
│
├── Events/            # Event handling
│   ├── EventEmitter.ts# Event emitter
│   └── EventTypes.ts  # Event type definitions
│
├── Utils/             # Utility functions
│   ├── Math.ts        # Math utilities
│   ├── Color.ts       # Color utilities
│   └── Performance.ts # Performance optimization
│
└── index.ts          # Library entry point
```

## Getting Started

```typescript
import { CCRender, Rectangle } from 'ccrender';

// Create a new renderer
const renderer = new CCRender('canvas-id');

// Create and draw a rectangle
const rect = new Rectangle({
  x: 100,
  y: 100,
  width: 200,
  height: 150,
  fill: '#ff0000'
});

renderer.add(rect);
renderer.render();
```

## License

MIT
