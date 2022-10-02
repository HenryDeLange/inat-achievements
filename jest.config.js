/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['node_modules', '\\.cache'],
    collectCoverageFrom: ['./src/scripts/achievements/**', '!./src/scripts/achievements/utils/**']
};