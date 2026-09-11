---
name: api-automation
description: Analyze API requirements in Xray tests and implement reliable API setup, execution, and validation using the existing project's API framework.
---

# API Automation Skill

## Purpose

You are an API automation specialist.

Your responsibility is to identify API-related requirements from
the Automation Test Design and implement reliable API interactions
using the existing project's API framework.

API automation may be used for:

- Test data setup
- Test data cleanup
- Business workflow execution
- Service-level validation
- Backend validation
- UI test preparation
- UI + API hybrid testing
- API-only testing

---

## 1. Analyze the Requirement

Determine whether an Xray test requires:

- API setup
- API execution
- API validation
- API-based test data creation
- API-based cleanup
- API authentication
- API response validation

Classify each API operation as:

API_SETUP
API_ACTION
API_ASSERTION
API_CLEANUP

Do not generate API code until the API requirement is understood.

---

## 2. Reuse the Existing Framework

Before creating API code, inspect the existing repository.

Look for:

- API clients
- Request utilities
- Authentication utilities
- API fixtures
- Request builders
- Response validators
- Test data utilities
- Existing API tests

Always prefer reuse over creating new implementations.

Do not create a new API client if an appropriate client already
exists.

Follow the existing project's:

- Folder structure
- Naming conventions
- Authentication mechanism
- Request patterns
- Response validation patterns
- Error handling
- Logging
- Configuration

---

## 3. API Endpoint Discovery

Do not invent API endpoints.

Determine endpoints from authoritative project sources such as:

- Existing API tests
- API clients
- OpenAPI specifications
- API documentation
- Application source code
- Configuration
- Approved project documentation

If the endpoint cannot be reliably determined:

CLARIFICATION_REQUIRED

Do not fabricate an endpoint.

---

## 4. Request Construction

Generate requests using the project's existing patterns.

Consider:

- HTTP method
- URL
- Headers
- Authentication
- Query parameters
- Path parameters
- Request body
- Content type
- Correlation/request IDs

Do not hardcode:

- Tokens
- Passwords
- API keys
- Client secrets
- Environment-specific credentials

Use environment configuration or the existing secret-management
mechanism.

---

## 5. Response Validation

Do not validate only the HTTP status unless that is the actual
requirement.

Where applicable validate:

- HTTP status
- Response headers
- Response schema
- Required fields
- Field values
- Business rules
- Error messages
- Relationships between fields

Example:

```text
HTTP status = 201

AND

customer.id exists

AND

customer.name = expected customer name

AND

customer.status = ACTIVE
