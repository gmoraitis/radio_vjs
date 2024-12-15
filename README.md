# radio_vjs
A simple vanilla Javascript project to fetch some radio stations from Athens. Its done based on my curiosity and for educational procedures to interact with some Javascript concepts. The API that i used is Radio Browser.

**NOTES to remember**


## ROT Framework: The Rule of Three
For each level, consider whether you can:

- **a)** Break it down into simpler parts?
- **b)** Create a simpler example first?
- **c)** Do the opposite (start with a simpler example, then break it down)?

The ROT framework provides steps to help solve problems, especially when working on projects or implementing new features.

The framework has three levels, typically approached in descending order: 3, 2, then 1. *OR, in other words, the TOP to DOWN aproach.* 

**III: Conceptual Patterns**
This level stems from what you want to build or the features you want to implement.

**II: JavaScript Concepts (Patterns & Asynchronous Programming)**
This level elaborates on each part identified in Level III. You go *down* now,and asking what blocks of code or patterns should i use?  

**I: Core JavaScript Concepts (Syntax & Features)**
This level details the core JavaScript concepts required for each concept outlined in Level II, which, in turn, is based on each part of Level III. You are at the *bottom* now, working with each available javascript syntax part. 

The following example is based on a simple JavaScript project called radio_vjs. This project fetches radio stations from a free API, allowing users to listen to them, navigate between stations, and control the volume using their computer keyboard. It aims to simulate a basic radio listening experience.


**I. Core JavaScript Concepts (Syntax & Features):**

1.  **`const` and `let`:** These are modern variable declaration keywords introduced in ES6 (ES2015).
    *   `const`: Declares a constant, meaning its value cannot be reassigned after initialization.
    *   `let`: Declares a variable with block scope, meaning it's only accessible within the block of code where it's defined (e.g., inside a `for` loop or `if` statement).
    *   *In the code:* Used for declaring variables like `apiEndpoint`, `frequencyDisplay`, `currentStationIndex`, etc.

2.  **Arrow Functions:** A concise syntax for writing function expressions.
    *   *In the code:* Used in event listeners: `document.getElementById("prev").addEventListener("click", () => { ... });` and in the sort function: `myStations.sort((a, b) => a.frequency - b.frequency);`

3.  **Template Literals:** Allow embedding expressions inside strings using backticks (\`).
    *   *In the code:* Used for setting the inner text of the frequency display: `frequencyDisplay.innerText = \`${station.name}\`;`

4.  **String Methods:**
    *   `trim()`: Removes whitespace from both ends of a string.
    *   `toLowerCase()`: Converts a string to lowercase.
    *   `match()`: Searches a string for a match against a regular expression.
    *   *In the code:* Used for processing station names: `station.name.trim().toLowerCase()`, `station.name.match(/\b\d+\.\d{1}\b/)`.

5.  **Type Conversion:** `parseFloat()` converts a string to a floating-point number.
    *   *In the code:* Used to convert the frequency string to a number: `parseFloat(frequencyMatch[0])`.

6.  **Array Methods:**
    *   `forEach()`: Executes a provided function once for each array element.
    *   `some()`: Tests whether at least one element in the array passes the provided function.
    *   `sort()`: Sorts the elements of an array in place.
    *   `push()`: Adds one or more elements to the end of an array.
    *   *In the code:* Used extensively for processing the station data.

7.  **Regular Expressions:** Used for pattern matching in strings.
    *   *In the code:* Used to extract the frequency from the station name: `station.name.match(/\b\d+\.\d{1}\b/)`.

8.  **Object Literals:** Used to create objects with key-value pairs.
    *   *In the code:* Used to create station objects: `{ name: ..., url: ..., frequency: ..., favicon: ... }`.

9.  **Event Listeners:** Used to handle user interactions (clicks, key presses).
    *   *In the code:* Used to handle navigation button clicks and keyboard events.

10. **DOM Manipulation:** Interacting with HTML elements using the Document Object Model.
    *   `document.getElementById()`: Selects an HTML element by its ID.
    *   `innerText`: Sets the text content of an element.
    *   `src`: Sets the source of an `<img>` or `<audio>` element.
    *   `style.display`: Sets the display style of an element.
    *   *In the code:* Used to update the UI with station information and control the audio player.

11. **Conditional Statements:** `if`, `else if`, `else` for controlling program flow.
    *   *In the code:* Used in data processing, error handling, and volume control.

12. **Switch Statement:** Provides a more efficient way to handle multiple conditions based on a single expression.
    *   *In the code:* Used for handling different keyboard events.

13. **Modulo Operator (`%`):** Returns the remainder of a division.
    *   *In the code:* Used for wrapping around the station index: `currentStationIndex = (currentStationIndex + 1) % myStations.length;`

14. **setTimeout():** Used to execute a function once after a specified delay.
    *   *In the code:* used for handling the volume info message display.

**II. JavaScript Concepts (Patterns & Asynchronous Programming):**

1.  **Asynchronous Programming with `async`/`await`:** This is a crucial concept for handling operations that take time, such as fetching data from an API.
    *   `async`: Marks a function as asynchronous, allowing it to use `await`.
    *   `await`: Pauses the execution of an `async` function until a Promise resolves.
    *   *In the code:* Used in `getGreekStations()` and `init()` to fetch data from the API.

2.  **Promises:** Represents the eventual result of an asynchronous operation. `fetch()` returns a Promise.
    *   *In the code:* Implicitly used with `fetch()`.

3.  **Error Handling with `try...catch`:** Used to handle exceptions that might occur during code execution.
    *   *In the code:* Used in `getGreekStations()` and `init()` to handle potential errors during API requests and data processing.

4.  **Global Variables (with caveats):** As discussed earlier, the code uses global variables for sharing data between functions. While convenient for small scripts, this approach can lead to issues in larger projects.

**III. Conceptual Patterns:**

1.  **Fetching and Processing Data from an API:** This is a common pattern in web development. The code demonstrates the steps involved:
    *   Making an API request using `fetch()`.
    *   Handling the response (checking for errors, parsing JSON).
    *   Processing and filtering the data.

2.  **Updating the UI Based on Data:** The code demonstrates how to dynamically update the UI based on data fetched from an API.
