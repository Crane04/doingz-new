// Declaration for CSS side-effect imports
declare module "*.css" {
  const content: string; // Treat as string for side-effects
  export default content;
}
