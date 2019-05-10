import { getItem, makeItemSelector } from "../../selectors/items";

test("get item should work", () => {
  const item = {
    loading: false,
    data: [{ testId: "testdata" }],
    error: null
  };
  const state = {
    items: {
      testId: item
    }
  };
  const props = {
    itemId: "testId"
  };
  const result = getItem(state, props);
  expect(result).toEqual(item);
});

test("get item should work with no data in store", () => {
  const props = {
    itemId: "testId"
  };
  const result = getItem({ items: {} }, props);
  expect(result).toEqual(undefined);
});

test("make item selector should work", () => {
  const item = {
    loading: false,
    data: [{ testId: "testdata" }],
    error: null
  };
  const state = {
    items: {
      testId: item
    }
  };
  const props = {
    itemId: "testId"
  };
  const result = makeItemSelector()(state, props);
  expect(result).toEqual(item);
});

test("make item selector should work with no data in store", () => {
  const props = {
    itemId: "testId"
  };
  const result = makeItemSelector()({ items: {} }, props);
  expect(result).toEqual({
    loading: false,
    data: null,
    error: null
  });
});
