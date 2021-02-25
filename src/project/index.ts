import { strings } from "@angular-devkit/core";
import {
  apply,
  chain,
  mergeWith,
  renameTemplateFiles, Rule,
  SchematicContext,
  template,
  Tree,
  url
} from "@angular-devkit/schematics";
import resolveArgs from 'npm-package-arg';
import UrlTemplate from 'url-template';
import versions from "../versions.json";
import { BaseProjectOptions } from "./schema";

export default function (options: BaseProjectOptions): Rule {
  let name = options.name;
  let scope = '';
  if (name.startsWith('@')) {
    const p = name.split('/', 2);
    scope = p[0].substring(1);
    name = strings.dasherize(p[1]);
  }
  let homepage = '';
  let bugs = '';
  let repository = '';
  if (options.repository) {
    if (options.repository.indexOf('github.com') !== -1) {
      const p = resolveArgs(options.repository);
      const hosted = p.hosted as any;
      const info = {
        domain: p.hosted?.domain,
        user: p.hosted?.user,
        project: p.hosted?.project
      }
      homepage = UrlTemplate.parse(hosted.docstemplate).expand(info);
      repository = UrlTemplate.parse(hosted.browsetemplate).expand(info);
      bugs = UrlTemplate.parse(hosted.bugstemplate).expand(info);
    }
  }


  const packageName = (scope ? `@${scope}/` : '') + name;
  return chain([
    async (_: Tree, context: SchematicContext) => {
      context.logger.info('Creating project');
    },
    mergeWith(
      apply(url("./files"), [
        template({
          ...strings,
          ...options,
          packageName,
          name,
          scope,
          homepage,
          repository,
          bugs,
          dot: ".",
          versions,
        }),
        renameTemplateFiles()
      ])
    )
  ]);
}
