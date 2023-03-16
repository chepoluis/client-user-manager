import { render, screen } from "@testing-library/react";
import Home from "../../../src/scenes/home/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@testing-library/jest-dom/extend-expect";

const theme = createTheme();

describe("tests in <Home />", () => {
  test("should match the snapshot", () => {
    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render the component correctly", () => {
    render(<Home />);

    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Start managing Users\/Accounts\/Teams with ease./i)
    ).toBeInTheDocument();

    const image = screen.getByAltText(/Cute puppy at the office/i);
    expect(image).toBeInTheDocument();
  });
});
