# 2. Initial technology stack

Date: 2020-05-22

## Status

Accepted

## Context

_The issue motivating this decision, and any context that influences or constrains the decision._

Services should be easy to setup and to maintain.

## Decision

_The change that we're proposing or have agreed to implement._

We propose to build our services with the following core technologies / tools:

-   node.js,
-   fastify,
-   Apollo GraphQL.

## Consequences

_What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated._

Pro:

-   Our developers speak Javascript, so they can start without learning a new programming language or environment.
-   Fastify is a lightweight yet powerful web framework. It has a very good documentation and is actively maintained.
-   GraphQL allows a schema-first development of services. Apollo GraphQL is a sophisticated implementation of GraphQL.
