import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CityPicker from ".";

describe("CityPicker component", () => {
  it("renders correctly", () => {
    const mockOnCityChange = jest.fn();
    const { getByText, getByTestId } = render(
      <CityPicker onCityChange={mockOnCityChange} />
    );

    expect(getByText("Selecione uma cidade")).toBeTruthy();
  });

  it("calls onCityChange when a city is selected", () => {
    const mockOnCityChange = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <CityPicker onCityChange={mockOnCityChange} />
    );

    fireEvent.changeText(
      getByLabelText("Selecione uma cidade"),
      "Bertioga - SP"
    );

    expect(mockOnCityChange).toHaveBeenCalledWith(60);
  });
});
