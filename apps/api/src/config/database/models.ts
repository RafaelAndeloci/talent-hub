/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRequire } from 'module';
const requireSync = createRequire(__filename);
import path from 'path';

import database from '.';
import klawSync from 'klaw-sync';
import { Model, ModelStatic, Sequelize } from 'sequelize';

const modelsBasePath = path.resolve(__dirname, '../../api');

const models = {} as any;
models.sequelize = database;
models.Sequelize = Sequelize;

klawSync(modelsBasePath, {
    traverseAll: true,
    nodir: true,
    filter: ({ path }) => path.indexOf('-model') > 0,
}).forEach(({ path }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __esModule, ...rest } = requireSync(path);
    const values = Object.values(rest);

    if (!values?.length) {
        return;
    }

    const model = values[0] as ModelStatic<Model<any, any>>;
    models[model.name] = model;
});

export default models;
