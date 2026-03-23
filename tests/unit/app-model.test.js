import { describe, test, expect, beforeEach } from "vitest";
import { AppModel } from "../../src/app-model.js";

describe("app-model", () => {
  let model;

  beforeEach(() => {
    model = new AppModel();
  });

  test("posts starts as empty array", () => {
    expect(model.posts).toEqual([]);
  });

  test("reset clears all state", () => {
    model.posts = [{ id: 1, title: "Hej" }];
    model.selectedTag = "history";
    model.reset();
    expect(model.posts).toEqual([]);
    expect(model.selectedTag).toBeNull();
  });
});