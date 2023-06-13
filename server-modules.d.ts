/// <reference types="./server" />
/// <reference types="./core" />
declare module '@qwik-client-manifest' {
  const manifest: import('./optimizer').QwikManifest;
  export { manifest };
}
// MD
declare module '*.md' {
  const node: FunctionComponent;
  export const frontmatter: Record<string, any>;
  export default node;
}
// MDX
declare module '*.mdx' {
  const node: FunctionComponent;
  export const frontmatter: Record<string, any>;
  export default node;
}
// Image ?jsx
declare module '*?jsx' {
  const Cmp: FunctionComponent<Omit<QwikIntrinsicElements['img'], 'src' | 'width' | 'height' | 'srcSet'>>
  export default Cmp;
  export const width: number;
  export const height: number;
  export const srcSet: string;
}
