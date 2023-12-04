import React from "react";
import renderer from "react-test-renderer";
import { NavigationContainer } from "@react-navigation/native";
import ChapelPreview from "../../src/components/ChapelPreview";

const mockProps = {
  name: "Chapel Name",
  info: "Chapel Info",
  distance: "5 km",
  address: "Chapel Address",
};

it("renders correctly", () => {
  const tree = renderer
    .create(
      <NavigationContainer>
        <ChapelPreview {...mockProps} />
      </NavigationContainer>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
