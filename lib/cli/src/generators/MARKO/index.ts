import {
  getVersions,
  retrievePackageJson,
  writePackageJson,
  getBabelDependencies,
  installDependencies,
  copyTemplate,
} from '../../helpers';
import { Generator } from '../generator';

const generator: Generator = async (npmOptions, { storyFormat }) => {
  const [storybookVersion, addonActionVersion, addonKnobsVersion] = await getVersions(
    npmOptions,
    '@storybook/marko',
    '@storybook/addon-actions',
    '@storybook/addon-knobs'
  );

  copyTemplate(__dirname, storyFormat);

  const packageJson = await retrievePackageJson();

  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.devDependencies = packageJson.devDependencies || {};

  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.storybook = 'start-storybook -p 6006';
  packageJson.scripts['build-storybook'] = 'build-storybook';

  writePackageJson(packageJson);

  const babelDependencies = await getBabelDependencies(npmOptions, packageJson);

  installDependencies({ ...npmOptions, packageJson }, [
    `@storybook/marko@${storybookVersion}`,
    `@storybook/addon-actions@${addonActionVersion}`,
    `@storybook/addon-knobs@${addonKnobsVersion}`,
    ...babelDependencies,
  ]);
};

export default generator;