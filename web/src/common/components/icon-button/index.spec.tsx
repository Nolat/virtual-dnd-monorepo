import React from "react";

import { fireEvent, render } from "test";

import { Default } from "./index.stories";

describe("Icon button component", () => {
  it("should be clickable", () => {
    const fn = jest.fn();
    const { getByTestId } = render(<Default onClick={fn} />);
    const button = getByTestId("icon-button");
    fireEvent.click(button);
    expect(fn).toBeCalledTimes(1);
  });
});