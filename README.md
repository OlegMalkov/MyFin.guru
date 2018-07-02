git clone mfg-rn
cd mfg-rn
cd modules
git clone mfg-base
cd mfg-base
npm i
npm link
git clone mfg-overview
cd mfg-overview
npm i
npm link mfg-base
npm link

cd mfg-rn
npm i
npm link mfg-base
npm link mfg-overview

open mfg-rn/index.js

edit
const { App } = require('./modules/mfg-base/makeApp.js').makeApp([
  ...require('./modules/mfg-overview/overviewModulesRegistry.js').overviewModuleRegistry
]);

cd mfg-rn
npm run ios:dev:SE