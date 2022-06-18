const modelMockCreator = ({
  methodName,
  returnValue,
  method,
}: {
  methodName: string,
  returnValue?: any,
  method?: (...args: any) => any
}) => ({
  [methodName]: method || (() => returnValue),
});

export default modelMockCreator;
