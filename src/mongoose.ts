import { Schema, Model, Document } from 'mongoose';

interface TimestampsFields {
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}

interface TimestampsMethods {
  readonly $create: Function;
  readonly $update: Function;
  readonly $delete: Function;
}

interface CrossServicesPopulateMethods {
  readonly myPopulate: (
    path: string | ReadonlyArray<string>,
  ) => Promise<Document>;
}

interface CrossServicesPopulateStatics {
  readonly myPopulate: (
    doc: Document | ReadonlyArray<Document>,
    path: string | ReadonlyArray<string>,
  ) => Promise<Document | ReadonlyArray<Document>>;
}

/**
 * Replace native mongoose's `timestamps` with additional `deletedAt` field
 * @param schema Mongoose Schema
 * @param _ Options
 */
function timestampsPlugin(schema: Schema, _: any) {
  // custom fields
  schema.add({
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  });

  // remove private fields on toJSON
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_: any, ret: any) => ({
      ...ret,
      _id: undefined,
      deletedAt: undefined,
    }),
  });

  // attach conditions on find hooks
  const hooks = {
    query () {
      (this as any).where({
        deletedAt: { $exists: false },
      });
    },
  };
  [
    'count',
    'countDocuments',
    'find',
    'findOne',
    'findOneAndRemove',
    'findOneAndUpdate',
    'update',
    'updateOne',
    'updateMany',
  ].forEach(method => schema.pre(method, hooks.query));

  // custom methods with fields injected on create, update & delete
  // tslint:disable-next-line: no-object-mutation
  Object.assign(schema.methods, {
    $create() {
      (this as any).set({
        createdAt: Date.now(),
      });

      return (this as any).save();
    },

    $update(changes: {readonly [key: string]: any}) {
      (this as any).set({
        ...changes,
        updatedAt: Date.now(),
      });

      return (this as any).save();
    },

    $delete() {
      (this as any).set({
        deletedAt: Date.now(),
      });

      return (this as any).save();
    },
  });
}

/**
 * Cross Services population
 */
// tslint:disable-next-line: cognitive-complexity
function crossServicesPopulatePlugin(schema: Schema) {
  // find cross services paths in schema
  // tslint:disable-next-line: readonly-array
  const csPathsAndOption: any[] = [];
  eachPathRecursive(schema, (path: string, schemaType: any) => {
    if (schemaType.options && schemaType.options.crossServices) {
      const option = schemaType.options.crossServices;

      csPathsAndOption.push({ path, option });
    } else if (schemaType.options &&
      schemaType.options.type &&
      schemaType.options.type[0] &&
      schemaType.options.type[0].crossServices) {
      const option = schemaType.options.type[0].crossServices;

      csPathsAndOption.push({ path, option });
    }
  });

  const populate = async function (
    model: Model<Document>,
    doc: Document | ReadonlyArray<Document>,
    path: string | ReadonlyArray<string>,
  ) {
    if (!doc || (Array.isArray(doc) && doc.length === 0)) {
      return doc;
    }
    if (!path || path.length === 0) {
      return doc;
    }

    const docs = Array.isArray(doc) ? doc : [doc];
    const [paths, csPaths] = extractPaths(
      Array.isArray(path) ? path : (path as string).split(' '),
      csPathsAndOption.map(({ path }) => path),
    );

    if (paths.length > 0) {
      await model.populate(docs, paths as any);
    }
    if (csPaths.length > 0) {
      const toPopulate = csPathsAndOption.filter(({ path }) => csPaths.includes(path));

      await Promise.all(toPopulate.map(async ({ path, option: { id = 'id', cb } }) => {
        // extract ids from docs
        const ids = docs.reduce(
          (prev, doc) => {
            const pathValue = doc.get(path);

            if (Array.isArray(pathValue)) {
              return pathValue.length === 0
                ? prev
                : prev.concat(pathValue.filter(Boolean).map(String));
            }

            return !pathValue || prev.includes(pathValue.toString())
              ? prev
              : prev.concat(pathValue.toString());
          },
          [],
        );
        // fetch data from another service
        const objects = await cb(ids);

        // set populated data
        docs.forEach((doc) => {
          const pathValue = doc.get(path);

          if (Array.isArray(pathValue)) {
            doc.set(
              path,
              pathValue.length > 0
                ? pathValue.map(i => objects.find((o: any) => o[id] === i.toString()))
                : [],
              Schema.Types.Mixed,
            );
          } else {
            doc.set(
              path,
              pathValue
                ? objects.find((o: any) => o[id] === pathValue.toString())
                : null,
              Schema.Types.Mixed,
            );
          }
        });
      }));
    }
  };

  // tslint:disable-next-line: no-object-mutation
  Object.assign(schema.statics, {
    myPopulate(doc: any, path: any) {
      return populate(this as any, doc, path);
    },
  });
  // tslint:disable-next-line: no-object-mutation
  Object.assign(schema.methods, {
    myPopulate(path: any) {
      return populate(this.constructor as any, this as any, path);
    },
  });
}

const toCrossServicesOption = ({ id, client }: any) => ({
  id,
  cb: (ids: ReadonlyArray<string>) => client.list({
    filter: '_id',
    _id: ids.join(','),
    skip: 0,
    limit: 0,
  }),
});

// tslint:disable-next-line: readonly-array
function eachPathRecursive(schema: any, handler: any, path: string[] = []) {
  schema.eachPath((pathname: string, schemaType: any) => {
    path.push(pathname);

    if (schemaType.schema) {
      eachPathRecursive(schemaType.schema, handler, path);
    } else {
      handler(path.join('.'), schemaType);
    }

    path.pop();
  });
}
function extractPaths(
  paths: ReadonlyArray<string>,
  csPaths: ReadonlyArray<string>,
) {
  return paths.reduce(
    (prev, path) => csPaths.includes(path)
      ? [prev[0], prev[1].concat(path)]
      : [prev[0].concat(path), prev[1]],
    [[] as ReadonlyArray<string>, [] as ReadonlyArray<string>],
  );
}

export {
  TimestampsFields, TimestampsMethods,
  timestampsPlugin,

  CrossServicesPopulateMethods, CrossServicesPopulateStatics,
  crossServicesPopulatePlugin,
  toCrossServicesOption,
};
