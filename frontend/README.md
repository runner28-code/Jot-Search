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

