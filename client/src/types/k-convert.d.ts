declare module 'k-convert' {
  interface KConvert {
    convertTo: (num: number, skipTo?: string) => string;
    convertToNumber: (str: string) => number;
  }
  
  const kconvert: KConvert;
  export default kconvert;
}