import _ from 'lodash';

const transformNestedFields = (data: any, inclusions: any): any => {
  for (const [key, value] of Object.entries(inclusions)) {
    const nestedData = data[key];

    if (!nestedData) continue;

    if (_.isObject(value) && 'include' in value) {
      data[key] = Array.isArray(nestedData)
        ? {
            create: nestedData.map(item =>
              transformNestedFields(item, value.include)
            ),
          }
        : {
            create: transformNestedFields(nestedData, value.include),
          };
    } else if (_.isObject(value)) {
      data[key] = Array.isArray(nestedData)
        ? {
            create: nestedData.map(item =>
              transformNestedFields(item, value)
            ),
          }
        : {
            create: transformNestedFields(nestedData, value),
          };
    } else if (Array.isArray(nestedData)) {
      data[key] = {
        create: nestedData.map(item => ({ ...item })),
      };
    } else {
      data[key] = { create: nestedData };
    }
  }
  return data;
};

const prismaUtils = {
  transformNestedFields,
};

export default prismaUtils;
