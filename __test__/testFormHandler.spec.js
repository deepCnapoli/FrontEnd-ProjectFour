// file: testFormHandler.spec.js
// Import the JavaScript file to test
import { handleSubmit } from "../src/client/js/formHandler";

describe("Testing the Submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();
    });
});

