const modelMockCreator = (method: string, returnValue: any) => ({
  [method]: () => returnValue,
});

export default modelMockCreator;
