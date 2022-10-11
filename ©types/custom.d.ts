declare interface IClassNames {
  [className: string]: string;
}
declare module "*.html?raw" {
  const classNames: string;
  export = classNames;
}
