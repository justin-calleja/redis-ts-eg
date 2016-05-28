export {}

declare global {
  interface String {
    startsWith(searchString: string, position?: number): boolean;
  }
}
