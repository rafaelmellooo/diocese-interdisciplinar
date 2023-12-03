import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import ChapelPreview from ".";

describe("ChapelPreview component", () => {
  const mockProps = {
    name: "Chapel Name",
    info: "Chapel Info",
    distance: "5 km",
  };

  it("renders correctly", () => {
    const tree = renderer.create(<ChapelPreview {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls handleScheduleButtonPress when the button is pressed", () => {
    const { getByText } = render(<ChapelPreview {...mockProps} />);

    const mockNavigate = jest.fn();
    jest.mock("@react-navigation/native", () => ({
      useNavigation: () => ({ navigate: mockNavigate }),
      useTheme: () => ({ dark: false, colors: { primary: "#000" } }),
      useWindowDimensions: () => ({ width: 500, height: 800 }),
    }));

    fireEvent.press(getByText("Criar Lembrete"));

    expect(mockNavigate).toHaveBeenCalledWith("NewReminder", {
      name: "Chapel Name",
      info: "Chapel Info",
      distance: "5 km",
    });
  });
});
