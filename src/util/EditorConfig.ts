
export class EditorConfig {
    public static parse(editorConfig: string) {
        const root: any = {};
        const lines = editorConfig.split('\n');

        let current = root;
        for (const line of lines) {
            const l = line.trim();
            if (l.startsWith('#')) {
                // skip
            } else if (l.startsWith('[') && l.endsWith(']')) {
                const k = l.substr(1, l.length - 2);
                console.log(k, l);
                current = root[k] = {};
            } else if (l.indexOf('=') !== -1) {
                const p = l.split('=');
                const k = p.shift()!.trim();
                const v = p.join('=').trimLeft();
                current[k] = v;
            }
        }

        return root;
    }

    public static stringify(editorConfig: any, lines: string[] = []) {
        for (const key in editorConfig) {
            if (Object.prototype.hasOwnProperty.call(editorConfig, key)) {
                const val = editorConfig[key];
                if (typeof val === 'object') {
                    lines.push(``);
                    lines.push(`[${key}]`);
                    this.stringify(val, lines);
                } else {
                    lines.push(`${key} = ${val}`);
                }
            }
        }
        return lines.join('\n');
    }

}