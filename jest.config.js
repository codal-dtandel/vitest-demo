// jest.config.js

const nextJest = require('next/jest')

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' })

// Any custom config you want to pass to Jest
const customJestConfig = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/out/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/components/**',
    '!**/public/**',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // "axios": "axios/dist/node/axios.cjs",

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$':
      '<rootDir>/__mocks__/fileMock.js',
      '^@/functionalComponents/(.*)$': '<rootDir>/functionalComponents/$1',
      '^@/utils/(.*)$': '<rootDir>/utils/$1',
      '^@/context/(.*)$': '<rootDir>/context/$1',
      '^@/customHooks/(.*)$': '<rootDir>/customHooks/$1',
      '^@/redux/(.*)$': '<rootDir>/redux/$1',
      '^@/services/(.*)$': '<rootDir>/services/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/out/',
    '<rootDir>/.storybook/',
    '<rootDir>/Lambda/',
    '<rootDir>/automation/',
    '<rootDir>/playwright-automation/',
    '<rootDir>/dist/',
    '<rootDir>/stories/',
    '<rootDir>/coverage/',
    '<rootDir>/components/',
    '<rootDir>/__tests__/mockdApiResponseData/',
    '<rootDir>/__tests__/components/',
    // '<rootDir>/__tests__/pages/',
    '<rootDir>/public/',
    '<rootDir>/redux/',
    '<rootDir>/actions/',
    '<rootDir>/reducers/',
    '<rootDir>/Twilio/',
    '<rootDir>/utils/',
    '<rootDir>/aws/',
    '<rootDir>/styles/iconfont/demo-files/',
    '<rootDir>/siteData/',
    '<rootDir>/puppetter-cucumber/',
    '<rootDir>/Automation/',
  ],
  testEnvironment: 'jsdom',
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  roots: ["<rootDir>", "<rootDir>/./__mocks__"],
  moduleDirectories: ['node_modules', __dirname],
  reporters: ["default", "jest-junit"],

}


// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig)

process.env = Object.assign(process.env, {
  API_URL: "https://qa-4-api.tacorosa.club",
  SOCKET_URL: "https://qa-4-chat.tacorosa.club",
  RECAPTCHA_SITE_KEY: "RECAPTCHA_SITE_KEY",
  TIMTHUMB_URL: "https://qa-4-api.tacorosa.club/generatecrop.php",
  GOOGLE_ANALYTICS_ID: "GOOGLE_ANALYTICS_ID_PLACEHOLDER",
  APP_URL: "https://qa-4.tacorosa.club",
  GOOGLE_TAG_MANAGER_ID: "GOOGLE_TAG_MANAGER_ID_PLACEHOLDER",
  TEXTPANTHER_APP_URL: "https://textpanther.com",
  SLYDIN_APP_URL: "https://www.slyd.in",
  IS_AUTOMATION_ENV: "'true'",
  SENTRY_DSN: "",
  NMI_TOKENIZATION_KEY: "NMI_TOKENIZATION_KEY",
  GOOGLE_SIGNIN_CLIENT_ID: "GOOGLE_SIGNIN_CLIENT_ID",
  AWS_WAF_JS_URL: "GOOGLE_SIGNIN_CLIENT_ID",
  AWS_REGION: "us-east-2",
  IS_TWILIO_SERVICES_ENABLED: "0",
  CLARITY_ID: "CLARITY_ID_PLACEHOLDER",
  APPLICATION_NAME: "SP",

});