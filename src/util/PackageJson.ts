/// <reference path="../../types/merge-package.json.d.ts" />
import { jsonc } from 'jsonc';
import mergePackageJsonDeps from 'merge-package.json';

export class PackageJsonUtil {


    public static merge(baseSrc: string, src: string) {

        const baseData = jsonc.parse(baseSrc);
        const data = jsonc.parse(src);
        const mergedDeps = jsonc.parse(mergePackageJsonDeps(baseSrc, "{}", src));

        return jsonc.stringify({
            ...baseData,
            ...data,
            scripts: {
                ...baseData.scripts,
                ...data.scripts,
            },
            dependencies: mergedDeps.dependencies,
            devDependencies: mergedDeps.devDependencies,
            peerDependencies: mergedDeps.peerDependencies,
            optionalDependencies: mergedDeps.optionalDependencies,
            extensionDependencies: mergedDeps.extensionDependencies,
            bundleDependencies: mergedDeps.bundleDependencies,
            bundledDependencies: mergedDeps.bundledDependencies
        }, { space: 4 });
    }



}