module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coverageDirectory: "coverage",
};
