```markdown
# AGENTS.md - AI Coding Agent Guidelines

These guidelines outline the structure and principles for development of AI coding agents within this repository.  Adherence to these principles is crucial for maintaining a sustainable, maintainable, and reliable codebase.

## 1. DRY (Don't Repeat Yourself)

*   **Module Decomposition:** Each module or component of the agent should have a single, well-defined purpose. Avoid creating excessive abstractions or shared logic.
*   **Function Reuse:** Wherever possible, reuse existing components and algorithms.  Implement common functionalities into dedicated functions or classes.
*   **Abstraction:**  Use abstract classes and interfaces to define contracts for common behaviors, reducing code duplication.
*   **Consistent Naming:** Employ consistent naming conventions across the codebase to improve readability and maintainability.

## 2. KISS (Keep It Simple, Stupid)

*   **Minimal Complexity:**  Strive for simple, easily understandable code.  Avoid unnecessary complexity or convoluted logic.
*   **Readability:** Prioritize code readability.  Use clear variable names, comments, and indentation.
*   **Small Functions:**  Keep functions as small as reasonably possible. Each function should have a single, well-defined task.
*   **Avoid Over-Engineering:** Resist the urge to over-engineer solutions.  Prioritize simplicity over cleverness.

## 3. SOLID Principles

*   **Single Responsibility Principle:** Each class or module should have one primary responsibility.
*   **Open/Closed Principle:** The agent should be extensible without modifying its existing code.  New features should be added through new classes or modules without altering the core logic.
*   **Liskov Substitution Principle:**  Subclasses should be able to replace base classes without affecting the correctness of the program.
*   **Interface Segregation Principle:** Clients should not be forced to satisfy abstraction contracts they do not need.
*   **Dependency Inversion Principle:**  High-level modules should not depend on low-level modules. Interfaces should define contracts.

## 4. YAGNI (You Aren't Gonna Need It)

*   **Future-Proofing:**  Only implement functionality that is currently required.  Do not add features without a clear justification for their addition.
*   **Avoid Unnecessary Complexity:**  Don't introduce complexity early on – build the basic structure first.
*   **Refactor Only When Needed:**  Refactor only when the code is fundamentally broken and doesn’t solve a problem.

## 5. Development Workflow & Practices

*   **Unit Testing:**  All code must be thoroughly unit tested to verify its functionality. Test cases should cover all critical scenarios.
*   **Code Reviews:**  All changes should undergo mandatory code reviews by at least two developers before being merged.
*   **Documentation:**  Document all functions, classes, and modules with clear and concise comments explaining their purpose and usage.
*   **Version Control:** Use Git for version control and adhere strictly to branching strategies.
*   **Static Analysis:** Utilize static analysis tools to identify potential bugs and code smells.

## 6. Code Structure & File Size

*   **Maximum Code Length:** Each file shall not exceed 180 lines of code.
*   **Modular File Design:** Files should be logically grouped based on functionality or scope.  Consider using a hierarchical file structure.
*   **File Organization:** Follow a consistent file naming convention.

## 7. Test Coverage Requirements

*   **Target Coverage:**  Achieve at least 80% test coverage across all files.
*   **Test Data:**  Use realistic and representative test data to simulate real-world scenarios.
*   **Test Cases:**  Create comprehensive test cases covering various input conditions and expected outputs.

## 8.  Tools & Technologies

*   Use a language and framework suitable for the agent’s purpose (specify language and framework).
*   Employ appropriate testing frameworks and tools (specify framework and tools).

## 9.  Example Code Structure (Illustrative)

```
agents.md
├── __init__.py
├── module1.py
├── module2.py
├── utils.py
├── data_processing.py
└── ...
```

## 10.  Reporting and Metrics

*   **Code Quality Metrics:** Track code complexity metrics (cyclomatic complexity, etc.) using tools.
*   **Test Coverage Reports:** Generate regular test coverage reports.
*   **Review Feedback:**  Actively solicit and respond to feedback from reviewers.

These guidelines are designed to promote high-quality, maintainable, and reliable AI coding agent development. Consistent application of these principles will significantly improve the overall stability and usefulness of this project.
```