import { renderHook, act } from "@testing-library/react";
import useModal from "../../src/hooks/useModal";

describe("useModal hook tests", () => {
  test("should return initial state of modal as closed", () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.openModal).toBe(false);
  });

  test("should open modal when handleOpenModal is called", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.handleOpenModal();
    });
    expect(result.current.openModal).toBe(true);
  });

  test("should close modal when handleCloseModal is called", () => {
    const { result } = renderHook(() => useModal());
    // Simulates synchronous updates to a component's state or props
    // and ensures that any side effects are processed and completed
    // before the test check is performed
    act(() => {
      result.current.handleOpenModal();
      result.current.handleCloseModal();
    });
    expect(result.current.openModal).toBe(false);
  });
});
