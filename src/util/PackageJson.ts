/// <reference path="../../types/merge-package.json.d.ts" />
import mergePackageJson from 'merge-package.json';

export class PackageJsonUtil {
    public static merge(base:string, add:string) {
        return mergePackageJson(base, "{}", add);
    }
}