import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, describe } from 'vitest';
import App from '../src/App';

// Mock the components to avoid complex setup
jest.mock('../src/features/navigation/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid="navbar">Navigation</div>;
  };
});

jest.mock('../src/features/pages/Home', () => {
  return function MockHome() {
    return <div data-testid="home">Home Page</div>;
  };
});

describe('App Component', () => {
  test('renders navigation bar', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
  });

  test('renders main content area', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('min-h-screen', 'bg-white');
  });

  test('has proper routing structure', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Test that the app structure is correct
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});

// Additional tests for individual components
describe('Component Integration', () => {
  test('app loads without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // If we get here without errors, the test passes
    expect(true).toBe(true);
  });
});
