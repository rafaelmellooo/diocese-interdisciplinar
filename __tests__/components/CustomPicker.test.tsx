// import React from "react";
// import { render, fireEvent } from "@testing-library/react-native";
// import CustomPicker from "../../src/components/CustomPicker";

// describe("CustomPicker component", () => {
//   it("renders correctly", () => {
//     const mockOnCityChange = jest.fn();
//     const { getByText, getByTestId } = render(
//       <CustomPicker onChange={mockOnCityChange} />
//     );

//     expect(getByText("Selecione uma cidade")).toBeTruthy();
//   });

//   it("calls onCityChange when a city is selected", () => {
//     const mockOnCityChange = jest.fn();
//     const { getByTestId, getByLabelText } = render(
//       <CustomPicker onChange={mockOnCityChange} />
//     );

//     fireEvent.changeText(
//       getByLabelText("Selecione uma cidade"),
//       "Bertioga - SP"
//     );

//     expect(mockOnCityChange).toHaveBeenCalledWith(60);
//   });
// });
