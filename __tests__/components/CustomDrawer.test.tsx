// import React from "react";
// import { render, fireEvent } from "@testing-library/react-native";
// import CustomDrawer from "../../src/components/CustomDrawer";

// describe("CustomDrawer component", () => {
//   it("renders correctly", () => {
//     const { getByText, getByTestId } = render(
//       <ThemeProvider>
//         <ThemeStorageProvider>
//           <CustomDrawer />
//         </ThemeStorageProvider>
//       </ThemeProvider>
//     );

//     expect(getByText("Diocese de Santos")).toBeTruthy();
//     expect(getByTestId("dark-mode-switch")).toBeTruthy();
//   });

//   it("toggles theme when the Switch is pressed", () => {
//     const { getByTestId } = render(
//       <ThemeProvider>
//         <ThemeStorageProvider>
//           <CustomDrawer />
//         </ThemeStorageProvider>
//       </ThemeProvider>
//     );

//     const switchElement = getByTestId("dark-mode-switch");

//     fireEvent.press(switchElement);

//     expect(switchElement.props.value).toBe(true);
//   });
// });
