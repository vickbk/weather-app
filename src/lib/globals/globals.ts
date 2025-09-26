"use client";

const __global: any = globalThis || {};
type Globals = {
  name: string;
  value: any;
};
export default class CustomGlobals {
  static add(...g: (Globals | [string, any])[]) {
    let allGlobals = g;
    let index = 0;
    for (; index < allGlobals.length; index++) {
      const __g: Globals = CustomGlobals.convertToGloabalObject(
        allGlobals[index]
      );
      __global[__g.name] = __g.value;
    }
  }
  static get<T = any>(name: string): T {
    return __global[name];
  }
  private static convertToGloabalObject(g: Globals | [string, any]): Globals {
    if (g instanceof Array) {
      const [name, value] = g;
      return { name, value };
    }
    return g;
  }
}
