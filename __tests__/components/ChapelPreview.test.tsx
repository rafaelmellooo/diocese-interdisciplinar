import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import { NavigationContainer } from "@react-navigation/native";

import ChapelPreview from "../../src/components/ChapelPreview";

describe("ChapelPreview component", () => {
  const mockProps = {
    name: "Chapel Name",
    info: "Chapel Info",
    distance: "5 km",
    address: "Chapel Address",
  };

  it("renders correctly", () => {
    const tree = renderer.create(
      <NavigationContainer>
        <ChapelPreview {...mockProps} />
      </NavigationContainer>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("calls handleReminderButtonPress when the button is pressed", () => {
    const { getByText } = render(
      <ChapelPreview {...mockProps} />
    );

    const mockNavigate = jest.fn();
    jest.mock("@react-navigation/native", () => ({
      useNavigation: () => ({ navigate: jest.fn }),

      useTheme: () => ({
        dark: false, colors: {
          dark: false,
          colors: {
            primary: '#1386F2',
            background: '#F5F3F3',
            card: '#F5F3F3',
            text: '#0A1D33',
            border: '#1386F2',
            notification: 'rgb(255, 69, 58)',
          },
        }
      })
    }));

    jest.mock("react-native", () => ({
      useWindowDimensions: () => ({ width: 500, height: 800 })
    }));

    fireEvent.press(getByText("Criar Lembrete"));

    expect(mockNavigate).toHaveBeenCalledWith("NewReminder", {
      name: mockProps.name,
      info: mockProps.info,
      distance: mockProps.distance,
      address: mockProps.address,
    });
  });
});
