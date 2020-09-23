function getValuesWithProperty(obj: any, propertyName: string): Array<any> {
  const propertyValues: Array<unknown> = [];
  if (Array.isArray(obj)) {
    obj.forEach((element: any) => {
      if (typeof element === 'object') {
        getValuesWithProperty(element, propertyName).forEach((e) =>
          propertyValues.push(e)
        );
      }
    });
  } else if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (Object.prototype.hasOwnProperty.call(obj, propertyName))
      propertyValues.push(obj[propertyName]);
    keys.forEach((key) => {
      if (typeof obj[key] === 'object')
        getValuesWithProperty(obj[key], propertyName).forEach((e) =>
          propertyValues.push(e)
        );
    });
  }
  return propertyValues;
}
export default getValuesWithProperty;
