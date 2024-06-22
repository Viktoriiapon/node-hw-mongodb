const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (value) =>
    ['work', 'home', 'personal'].includes(value.toLowerCase());

  if (isType(type)) return type.toLowerCase();
};

const parseIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;
  const isBooleanString = (isFavourite) =>
    ['true', 'false'].includes(isFavourite.toLowerCase());

  if (isBooleanString(isFavourite)) return isFavourite.toLowerCase();
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;
  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
