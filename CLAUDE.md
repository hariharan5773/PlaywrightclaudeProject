# AI Test Automation Project

## 1. Project Purpose

This repository contains an end-to-end test automation framework
using Playwright and TypeScript.

The objective of this project is to use AI to transform task card containing test cases
maintained in JIRA into reliable, maintainable and executable
end-to-end automation.

The automation may involve:

- Web UI interactions
- API/service interactions
- Database validation
- Test data setup
- Test data cleanup
- Business-level assertions

The originating JIRA task card containing test cases is the source of truth for the business test intent.

The objective is NOT simple text-to-code conversion.

The objective is to produce reliable end-to-end automation that
correctly implements the business intent of the task card containing test case.

---

# 2. Technology Stack

Primary technologies:

- TypeScript
- Playwright
- JIRA
- Xray
- GitHub
- Database: MySQL
- CI/CD: GitHub Actions

AI:

- Claude

External integrations are provided through MCP servers where
available.

---

# 3. High-Level Architecture

The intended workflow is:

JIRA task card
    ↓
Test Analysis
    ↓
Test Intent Model
    ↓
Automation Test Design
    ↓
Existing Framework Analysis
    ↓
Playwright/API/Database Implementation
    ↓
AI Code Review
    ↓
Test Execution
    ↓
Failure Analysis
    ↓
Human Approval
    ↓
GitHub Pull Request
    ↓
CI/CD

The AI should maintain traceability between:

Task card ID
    ↓
Test Intent
    ↓
Generated Test
    ↓
Git commit / PR
    ↓
Execution result

---

# 4. Repository Structure

Follow the existing repository structure.

Expected structure may include:

tests/
pages/
fixtures/
utils/
database/
api/
test-data/

Do not create new directories if an existing directory already
serves the required purpose.

Before creating new files, inspect the repository and determine
whether an existing component can be reused.

---

# 5. General Automation Principles

Always prefer:

1. Existing framework components
2. Existing Page Objects
3. Existing fixtures
4. Existing utilities
5. Existing API clients
6. Existing database utilities

over creating new implementations.

Do not duplicate existing functionality.

Generated code must be maintainable and consistent with the
existing framework.

Do not introduce a new architectural pattern unless explicitly
requested.

---

# 6.Test Case Rules

When processing an test case from task card:

- Preserve the task card ID.
- Preserve the original test step meaning.
- Preserve expected results.
- Preserve preconditions.
- Preserve test data.
- Maintain step-level traceability.

Every step must be mapped to an automation action,
validation, setup operation, cleanup operation, or explicit
clarification request.

Do not silently ignore a test step.

Do not invent missing business requirements.

If an step is ambiguous, mark it as:

CLARIFICATION_REQUIRED

and explain what information is missing.

---

# 7. Test Intent Model

Do not generate Playwright code directly from raw natural-language
Xray steps when an intermediate Test Intent Model can be created.

The Test Intent Model should identify:

- UI actions
- UI assertions
- API actions
- API assertions
- Database actions
- Database assertions
- Test data
- Preconditions
- Postconditions
- Cleanup
- Dependencies
- Required captured values

The Test Intent Model should be validated before code generation.

---

# 8. Playwright Rules

Use Playwright with TypeScript.

Follow the existing Playwright framework architecture.

Use:

- Stable locators
- Accessible roles where appropriate
- Existing Page Objects
- Existing fixtures
- Playwright assertions
- Built-in waiting mechanisms

Avoid:

- Arbitrary waitForTimeout calls
- Fragile selectors
- Excessive XPath
- Hardcoded credentials
- Hardcoded environment-specific values
- Duplicate Page Objects
- Duplicate utilities

Do not generate selectors based solely on assumptions.

If the required UI element cannot be reliably identified,
inspect the application using the available Playwright tools
or request clarification.

Assertions must validate the actual business requirement.

Do not add weak assertions merely to make a test pass.

---

# 9. Database Rules

Database validation is an important part of this framework.

Database operations may be required for:

- Test data setup
- Test data cleanup
- Business validation
- Cross-system validation
- Persistence validation

Prefer existing database clients and utilities.

Never hardcode database credentials.

Never expose database secrets in source code.

Use parameterized queries.

For validation activities, prefer read-only database access.

Do not modify database data unless the operation is explicitly
required for test setup or cleanup.

Do not invent:

- Database names
- Schema names
- Table names
- Column names
- Relationships
- SQL queries

If the required database information cannot be determined from
the available project context, mark the requirement as
CLARIFICATION_REQUIRED.

Database validation should verify meaningful business state.

Example:

UI:
Create customer

Database:
Retrieve customer using customer ID

Validation:
Customer exists
AND customer status is ACTIVE
AND customer name matches expected value

---

# 10. Test Data Rules

Prefer existing test-data mechanisms.

Test data may originate from:

- Xray
- Fixtures
- Test data files
- API setup
- Database setup
- Generated dynamic data
- Environment configuration

Do not hardcode sensitive data.

Do not commit credentials or secrets.

Tests should use independent test data where required for
parallel execution.

Avoid shared mutable test data.

---

# 11. API Rules

If the test requires API interactions:

- Reuse existing API clients.
- Follow existing authentication mechanisms.
- Validate HTTP status and business response.
- Avoid hardcoded credentials.
- Do not invent API endpoints.
- Do not invent request or response schemas.

If the API contract is unavailable, request clarification or
inspect the available project documentation/code before proceeding.

---

# 12. Framework Reuse

Before creating a new:

- Page Object
- Component
- Fixture
- API client
- Database utility
- Test-data utility
- Helper

search the existing repository.

If an appropriate implementation already exists, reuse it.

If an existing implementation is similar but incomplete,
prefer extending it when doing so does not break existing tests.

---

# 13. Git and GitHub Rules

AI-generated automation must normally be committed to a
dedicated branch.

Recommended branch format:

qa/<task-id>

Example:

qa/ABC-123

Before creating a Pull Request:

1. Generate the automation.
2. Review the implementation.
3. Execute the relevant test.
4. Analyze failures.
5. Fix automation defects where appropriate.
6. Run the test again.
7. Verify that the code is formatted and linted.
8. Verify traceability to Xray.
9. Create the branch/commit.
10. Create a GitHub Pull Request.

The AI must NOT merge the Pull Request unless explicitly
authorized.

The initial workflow requires human approval before merge.

---

# 14. Pull Request Requirements

The PR should include:

- Xray test ID
- Xray test title
- Summary of generated automation
- Files created/modified
- UI validations
- API validations
- Database validations
- Test execution result
- Known limitations
- Clarifications or assumptions
- AI review result

Example PR title:

AI Automation: ABC-123 - Create Customer E2E Test

---

# 15. AI Safety Rules

Never invent missing information.

Never fabricate:

- Selectors
- URLs
- API endpoints
- Database schemas
- SQL
- Credentials
- Expected results
- Business rules

When information is uncertain:

1. Inspect available project resources.
2. Use available MCP tools.
3. Check existing code/documentation.
4. If uncertainty remains, request clarification.

Do not change an assertion simply because a test fails.

A failing test may indicate:

- Application defect
- Test defect
- Environment problem
- Test-data problem
- Database problem
- Timing problem

Determine the likely cause before modifying the automation.

---

# 16. MCP Tool Usage

Use available MCP tools when they provide authoritative
information or are required to perform an action.

Potential MCP integrations include:

- JIRA/Xray
- GitHub
- Playwright
- Database

Use JIRA/Xray MCP to retrieve authoritative test information.

Use repository/GitHub capabilities to inspect and modify
automation code.

Use Playwright capabilities to inspect and execute browser
workflows.

Use database capabilities to inspect schema and perform approved
test-data or validation operations.

Do not use an MCP tool unnecessarily.

Prefer the authoritative source:

Xray → test requirements
Repository → automation implementation
Database → database state
Playwright → browser/application state
GitHub → repository/PR state

---

# 17. Human Approval

The AI may:

- Analyze Xray tests
- Generate automation
- Execute tests
- Diagnose failures
- Create branches
- Commit code
- Create Pull Requests

The AI should NOT merge Pull Requests without explicit
authorization.

Human reviewers remain responsible for final approval of
business-critical automation.

---

# 18. Definition of Done

An AI-generated test is considered complete only when:

- The Xray test has been successfully interpreted.
- All Xray steps have traceability.
- Required UI automation is implemented.
- Required API automation is implemented.
- Required database validation is implemented.
- Existing framework components are reused.
- No secrets are present in generated code.
- Code follows repository conventions.
- AI code review has passed.
- The test has been executed.
- Failures have been analyzed.
- Appropriate automation defects have been corrected.
- The final test passes or the reason for failure is documented.
- The Xray test ID is traceable from the automation.
- A GitHub PR has been created when requested.

---

# 19. Primary Objective

Always optimize for:

RELIABILITY > CODE GENERATION SPEED

MAINTAINABILITY > CODE VOLUME

BUSINESS VALIDATION > UI-ONLY VALIDATION

REUSE > DUPLICATION

EVIDENCE > ASSUMPTION

HUMAN APPROVAL > UNSAFE AUTONOMOUS CHANGES
