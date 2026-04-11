# Truck Mat Configurator

Premium truck mat product configurator - a self-contained React application for customizing truck floor mats, door panels, and accessories.

## Features

- Material and color selection
- Carpet edging (lemovanie) customization
- Custom embroidery (nášivky) with thread color selection
- Door panel configuration with same-as carpet options
- Step-by-step accordion-based UI
- Mobile-responsive design
- Premium "same-as" CTA components for quick selection

## Tech Stack

- React 18 (pre-compiled JSX, self-contained HTML)
- CSS-in-JS with inline styles
- No external dependencies beyond React/ReactDOM CDN

## Usage

Open `index.html` in a browser. The configurator is fully self-contained.

## Development

Edit `konfigurator.jsx` and compile with:
```bash
npx babel --plugins @babel/plugin-transform-react-jsx konfigurator.jsx -o konfigurator_compiled.js
```
