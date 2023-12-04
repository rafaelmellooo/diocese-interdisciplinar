import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import CustomPicker from "../../src/components/CustomPicker";

describe("CustomPicker component", () => {
  it("renders correctly", () => {
    const mockOnCityChange = jest.fn();
    const tree = renderer
      .create(<CustomPicker onChange={mockOnCityChange} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

//   it("calls onCityChange when a city is selected", () => {
//     const mockOnCityChange = jest.fn();
//     const { getByLabelText } = render(
//       <CustomPicker onChange={mockOnCityChange} />
//     );

//     fireEvent.changeText(
//       getByLabelText("Selecione uma cidade"),
//       "Bertioga - SP"
//     );

//     expect(mockOnCityChange).toHaveBeenCalledWith(60);
//   });
});
