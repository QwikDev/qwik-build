/// <reference types="./server" />
declare module '@qwik-client-manifest' {
  const manifest: QwikManifest;
  export { manifest };
}
// MD
declare module '*.md' {
  const node: import("@builder.io/qwik").FunctionComponent;
  export default node
}
// MDX
declare module '*.mdx' {
  const node: import("@builder.io/qwik").FunctionComponent;
  export default node
}
