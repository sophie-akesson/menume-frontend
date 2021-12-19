# MenuMe

## Getting Started

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Style guide

### Naming

- Variable names should be in camelCase.
- Function names should be in camelCase.
- Component names & component file names should be in PascalCase.
- Type, interface and enum names should be in PascalCase.
- Other file names should be in camelCase.
- Branch names should be in kebab-case.

### Components

- Component files should contain one component.
- Functions related to the component should be placed in its own file in the same folder, unless it's useful elsewhere and can be used as a utility.

### Styles

- Component .sass files should be put in the component folder.
- Avoid using hard coded units for sizing. Use defined sizing from the global styling.

### Functions

- Shared functions should be placed in src/utils.
- One export per file.

### Types

- Should be placed close to where it's used, in a component folder for example.
- If a type is shared then it should be placed in src/interfaces.
- Is not limited to one export per file for components. Shared types should have one export per file.

### Folders

### `/src`

```
├── assets/
│    └── icons
│    └── images
├── components
│    └── ComponentName/
│          └── index.ts
│          └── ComponentName.tsx
│          └── ComponentPart.tsx
│          └── AnotherComponentPart.tsx
│          └── aFunction.ts
│          └── types.ts
│          └── tests/
├── lib/
├── pages/
├── styles/
├── interfaces/
├── utils
```
