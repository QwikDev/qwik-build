/// <reference types="./server" />
/// <reference types="./core" />
declare module '@qwik-client-manifest' {
  const manifest: QwikManifest;
  export { manifest };
}
// MD
declare module '*.md' {
  const node: FunctionComponent;
  export default node;
}
// MDX
declare module '*.mdx' {
  const node: FunctionComponent;
  export default node;
}
