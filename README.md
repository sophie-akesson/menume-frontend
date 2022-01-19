# MenuMe

## About

This project uses Next for its flexible building solutions (SSR, SSG, ISR). In this case, server side rendering was chosen for easy use with Strapi. In more detail, the application uses Nookies to set cookies server side which are used for storing JWT tokens. It is also used to fetch data on demand, users of Menume will be responsible for their own content and can make changes to their own data.

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

- Component folder should contain files for one component, placing another component folder inside the component is OK.
- Functions related to the component should be placed in its own file in the same folder, unless it's useful elsewhere and can be used as a utility.

### Styles

- Component .scss files should be put in the component folder.
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
├── components/
│    └── ComponentName/
│          └── index.ts
│          └── aFunction.ts
│          └── ComponentName.tsx
│          └── ComponentName.module.scss
│          └── types.ts
│          └── ComponentPart/
│                   └── ComponentPart.tsx
│                   └── types.ts
│                   └── aFunction.ts
│                   └── ComponentPart.module.scss
├── interfaces/
├── lib/
├── pages/
├── styles/
├── utils/
```
