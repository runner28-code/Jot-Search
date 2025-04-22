# InTulsa Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Style Guide
- TailwindCSS for styling
    - Base `rem` is set to 10px for easy calculation
    - Custom styles, breakpoints, etc are stored in `tailwind.config.js`
    - Declare variables for reused styles
        - Leave trailing spaces for chaining styles
            ```
            const linkStyles = 'hover:text-royalBlue mt-3 ';
            const linkColor = 'text-slateGray ';

            className={linkStyles + linkColorHeader} instead of className={linkStyles + ' ' + linkColorHeader}
            ```
- No multi-line ternary operators
- An `if` statement followed only by an `else` should be refactored to be just an `if` followed by a return statement of the other condition's logic without being in an `else`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

You may also see any lint errors in the console.
