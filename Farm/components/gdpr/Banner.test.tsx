import { render, fireEvent, screen } from "@testing-library/react-native";
import GDPRBanner from "./Banner";
import "fake-indexeddb/auto";
import '@testing-library/jest-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe("GDPRBanner", () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  it("should show the banner initially", () => {
    render(<GDPRBanner />);

    expect(screen.getByText(/This website uses cookies/)).toBeInTheDocument();
  });

  it("should hide the banner after accepting", () => {
    render(<GDPRBanner />);

    const acceptButton = screen.getByRole("button", { name: "Accept" });

    fireEvent.click(acceptButton);

    expect(AsyncStorage.getItem("gdpr_accepted")).toBe("true");
    expect(
      screen.queryByText(/This website uses cookies/)
    ).not.toBeInTheDocument();
  });

  it("should hide the banner if already accepted", () => {
    AsyncStorage.setItem("gdpr_accepted", "true");

    render(<GDPRBanner />);

    expect(
      screen.queryByText(/This website uses cookies/)
    ).not.toBeInTheDocument();
  });
});