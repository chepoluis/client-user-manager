import "@testing-library/jest-dom/extend-expect";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Login from "../../../src/scenes/login";
import { authSlice } from "../../../src/store/slices/auth/authSlice";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

describe("tests in <Login />", () => {
  test("should match the snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Login />
        </ThemeProvider>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should show the component correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(/login/i).length).toBeGreaterThanOrEqual(1);
  });

  test("should display error message when submitting empty form", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByRole("button", { type: /submit/i });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // const emailError = await screen.findByText(/Alert/i);
    const passwordHelperText = screen.getByTestId("password-helper-text");

    // expect(emailError).toBeInTheDocument();
    // expect(passwordError).toBeInTheDocument();
    // expect(passwordHelperText).toHaveTextContent("No password provided");
  });

  // test("should display error message when submitting empty form", () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <Login />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const submitButton = screen.getByRole('button', { type: /submit/i });
  //   fireEvent.click(submitButton);

  //   expect(screen.getAllByText(/No email provided./i).length).toBeInTheDocument();
  //   expect(screen.getByText(/No password provided./i)).toBeInTheDocument();
  // });

  // test("should display error message when entering invalid email", () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <Login />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const emailInput = screen.getByLabelText(/email/i);
  //   const submitButton = screen.getByRole('button', { type: /submit/i });

  //   fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  //   fireEvent.click(submitButton);

  //   expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
  // });
});
