"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getAll = exports.getById = void 0;
const getById = ({ params: { id } }, res) => {
    res.status(200).json({
        id,
        fullName: 'Pedro Netto',
    });
};
exports.getById = getById;
const getAll = ({ query }, res) => {
    res.status(200).json({
        count: 1,
        limit: query.limit ?? 10,
        offset: query.offset ?? 0,
        pageCount: 1,
        records: [],
    });
};
exports.getAll = getAll;
const create = ({ body }, res) => {
    res.status(201).json({
        ...body,
        id: '',
    });
};
exports.create = create;
const update = ({ params: { id }, body }, res) => {
    res.status(200).json({
        id,
        ...body,
    });
};
exports.update = update;
const remove = ({ params: { id } }, res) => {
    res.status(204).end();
};
exports.remove = remove;
