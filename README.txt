☕ Playwright Test Automation Portfolio

This repository contains a full test automation solution built with Playwright, covering both:

🖥 UI Automation – for coffee-cart.app

🔌 API Automation – for dummy-json

The project demonstrates modern end-to-end testing practices, secure authentication handling, parallel execution, and scalable test architecture.

🚀 Project Overview

This repository is split into three Playwright projects, executed in parallel using 3 workers for optimized performance:
UI Tests – Coffee Cart Application
API Authentication Setup
API Tests – Dummy JSON

All projects run concurrently to reduce execution time and simulate real CI environments.

🖥 UI Automation – Coffee Cart App
UI tests validate real user interactions with the coffee ordering application.

What is covered:
✔ Page redirection
✔ Adding items to cart
✔ Cart total validation
✔ Discount logic validation
✔ Removing items
✔ Checkout & purchase confirmation

Example Scenarios:
- Add single and multiple products
- Validate promotional discount behavior
- Confirm correct cart calculation
- Complete purchase flow with modal interaction
- Validate UI notifications and state reset

🔌 API Automation – Dummy JSON
API tests validate backend behavior using Playwright’s built-in request fixture.

Validations Include:

✔ Authenticated requests
✔ Response status verification
✔ Full response schema validation
✔ Nested object structure validation
✔ Polling for async operations

The product validation ensures API contracts remain stable and predictable.

🔐 Advanced Authentication Setup
This project uses an advanced authentication strategy:
A dedicated setup project performs API login
Credentials are securely stored in GitHub Secrets
Authentication token is retrieved dynamically
Token is stored in process.env.API_TOKEN
Subsequent tests reuse this token automatically

This approach:
✔ Avoids repeated login calls
✔ Improves test performance
✔ Keeps credentials secure
✔ Follows CI/CD best practices

🏗 Architecture Highlights
- Modular test structure
- Separate setup project for authentication
- Secure environment variable handling
- Parallel execution (3 workers)
- Clean test isolation
- CI-ready configuration