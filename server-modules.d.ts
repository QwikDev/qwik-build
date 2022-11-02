/// <reference types="./server" />
declare module '@qwik-client-manifest' {
  const manifest: QwikManifest;
  export { manifest };
}
// CSS
declare module '*.css' {
  /**
   * @deprecated Use `import style from './style.css?inline'` instead.
   */
  const css: unknown
  export default css
}
declare module '*.scss' {
  /**
   * @deprecated Use `import style from './style.scss?inline'` instead.
   */
  const css: unknown
  export default css
}
declare module '*.sass' {
  /**
   * @deprecated Use `import style from './style.sass?inline'` instead.
   */
  const css: unknown
  export default css
}
declare module '*.less' {
  /**
   * @deprecated Use `import style from './style.less?inline'` instead.
   */
  const css: unknown
  export default css
}
declare module '*.styl' {
  /**
   * @deprecated Use `import style from './style.styl?inline'` instead.
   */
  const css: unknown
  export default css
}
declare module '*.stylus' {
  /**
   * @deprecated Use `import style from './style.stylus?inline'` instead.
   */
  const css: unknown
  export default css
}
declare module '*.pcss' {
  /**
   * @deprecated Use `import style from './style.pcss?inline'` instead.
   */
  const css: unknown
  export default css
}
declare module '*.sss' {
  /**
   * @deprecated Use `import style from './style.sss?inline'` instead.
   */
  const css: unknown
  export default css
}
