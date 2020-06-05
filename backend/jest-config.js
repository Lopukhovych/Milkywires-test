module.exports = {
	testEnvironment: "node",
	verbose: true,
	moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
	// collectCoverage: true,
	// collectCoverageFrom: [
	// 	"**/*.{ts,js}",
	// 	"!**/node_modules/**",
	// 	"!**/dist/**",
	// 	"!**/coverage/**",
	// 	"!**/migrations/**",
	// 	"!**/models/**",
	// 	"!**/seeders/**"
	// ],
	transform: {
		"\\.ts$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
		"^.+\\.tsx?$": "ts-jest"
	},
	coverageThreshold: {
		"global": {
			"branches": 100,
			"functions": 100,
			"lines": 100,
			"statements": 100
		}
	},
	"modulePaths": [
		"."
	],
	coverageReporters: [
		"text",
		"text-summary"
	],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$",
	testPathIgnorePatterns: [
		"/node_modules/",
		"/dist/",
		"/coverage/",
		"/backend/jest-config.ts"
	]
};
