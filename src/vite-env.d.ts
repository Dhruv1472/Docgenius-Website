/// <reference types="vite/client" />

// Allow importing .md files as raw strings with ?raw suffix
declare module "*.md?raw" {
  const content: string;
  export default content;
}

declare module "*.md" {
  const content: string;
  export default content;
}
