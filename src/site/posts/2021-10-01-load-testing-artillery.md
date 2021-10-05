---
date: 2021-10-01
title: Load testing with Artillery
description: An account on using Artillery to load test an application's backend (and database)
slug: load-testing-artillery
tags:
  - artillery
  - testing
  - performance
  - scaling
---

This is the story about how my team got to know and use
[Artillery](https://artillery.io) to load test the backend (and database) of the
application we're working on.

I'll begin by giving a bit of context on the challenge that led us to need load
testing and Artillery as the right tool for that.

I'll then provide a brief overview on what Artillery is and how to use it to
write and run load tests. I'll also be sharing some of the insights we've
learned along the way, plus some very useful Artillery features and testing
strategies.

## The challenge

So, recently we got some really good news from our product managers. The first
iteration of our application in production has been a success, and as a result,
new users are expected to be onboarded soon.

This means we need to make sure our application and infrastructure will be able
to scale accordingly, as the number of concurrent users is estimated to increase
by a factor of 50 and the database size to grow by a factor of 10.

**Is our current infrastructure able to handle the expected traffic increase?
How will performance be affected?**

Instead of second-guessing, we decided it would be better to rely on concrete
metrics that would help us make better-informed decisions.

## Load testing

At this point, it was clear that we needed a tool to load test the application.
After researching and gathering some in-house positive feedback, we opted to go
with Artillery.

Our application is deployed on a virtual private server using Docker containers,
and follows a common architecture consisting of three main components: frontend
(Nuxt.js), backend API (.NET Core C#), and database (MySQL). In front of
everything we have nginx serving as a reverse proxy.

Even though Artillery is more specifically tailored for backend testing,
Artillery's HTTP testing is ultimately accomplished by sending HTTP requests to
a URI and checking the responses' status and latency.

The way our application is set up allows us to load test the entire stack
(including frontend and nginx), since all requests go through nginx before being
dispatched to and handled by
[`@nuxtjs/proxy`](https://www.npmjs.com/package/@nuxtjs/proxy). This works great
for us, as it more closely resembles real user behavior.

In any case, even if your application is not set up in a similar way, but you'd
still like to test other components of your stack, Artillery's extensibility
(through "hooks", as we'll see later down the article) allows you to introduce
further logic (e.g., HTTP requests to the frontend).

## Artillery

Artillery is an open source Node.js load testing tool. It's designed to test the
**reliability** and **performance** of backend services. It operates by
simulating user behavior, allowing developers, test engineers, and SREs to
verify how their backend services and infrastructure handle traffic spikes and
sustained increases in workload.

Some of its key features include:

- emulation of advanced (complex) user behavior
- extensive protocol support (HTTP, Socket.io, WebSockets + others via plugins)
- writing tests in a declarative style (YAML)
- integration with external monitoring/observability services (e.g.,
  [Datadog](https://www.datadoghq.com/), [Honeycomb](https://www.honeycomb.io/))
- extensibility and customization (JavaScript)
- official [Docker image](https://hub.docker.com/r/artilleryio/artillery) available

### Test specification

An Artillery test script is a YAML file containing one or more scenarios. A
scenario is a sequence of actions (e.g., HTTP requests) that a virtual user goes
through. Here's an example:

```yml
scenarios:
  - name: "login + home page (list products)"
    flow:
      - post:
          url: "/users/login"
          json:
            username: {% raw %}"{{ $processEnvironment.VIRTUSER_USERNAME }}"{% endraw %}
            password: {% raw %}"{{ $processEnvironment.VIRTUSER_PASSWORD }}"{% endraw %}

      - post:
          beforeRequest: ensureSessionCookieSet
          url: "/users/role"
          json:
            selectedRole: "CUSTOMER"
            
      - get:
          beforeRequest: ensureSessionCookieSet
          url: "/services"
```

A really cool feature we were pleasantly surprised to find:
[`Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
support, which allows out-of-the-box session-based cookie authentication.

In the snippet above you may have also noticed `beforeRequest`. It's an
[Artillery "hook"](https://artillery.io/docs/guides/guides/http-reference.html).
"Hooks" allow custom JavaScript logic to be attached to the lifecycle of
scenarios and individual requests.

Other attributes we've found to be very useful:

- `weight`: which can be used to specify the probability of each scenario being
  executed by a new virtual user;
- `think`: which can be used to more realistically mimic human user behavior, by
  pausing the execution for N seconds between requests.

### Test configuration

Besides section `scenarios`, a test script is composed of another main section:
`config`. This is where the test configuration (target URIs, environments,
custom code, etc.) is defined:

```yaml
config:
  timeout: 2
environments:
    staging:
      target: "https://staging.my.app"
      phases:
        - duration: 120
        arrivalRate: 10
    production:
      target: "https://my.app"
      phases:
        - duration: 1200
        arrivalRate: 20
```

Under `phases` we can find the core load phase attributes which determine *how*
Artillery will generate new virtual users during test execution.

For each environment a test may execute one or more
[phases](https://artillery.io/docs/guides/guides/test-script-reference.html#Load-Phases).
Generally, you'll find that test a may begin with a warm-up phase, followed by a
ramp-up phase, and finally end with a maximum load phase.

One feature that we are not currently using (but planning to in the near future)
is [setting up success
conditions](https://artillery.io/docs/guides/guides/test-script-reference.html#Setting-success-conditions-with-ensure).
This enables Artillery to return with non-zero if a certain condition (response
time or error rate) is not met, which may be very useful for integrating
Artillery into CI/CD pipelines. Here's an example:

```yaml
config:
  ensure:
    maxErrorRate: 1
```

Finally, after you've executed the test, you may also examine the results
visually, by uploading the JSON results file to the [Artillery report
viewer](https://reportviewer.artillery.io/).

## Wrapping up

We had a great experience using Artillery. Excellent documentation,
straightforward to set up and start running tests right away.

By combining Artillery's test results with data from an internal observability
service, we were able to confirm that the higher potential for performance
bottlenecks comes from the database.

We've found it very useful to perform several tests using different strategies
(warm-up, ramp-up, and maximum load), mixing up different `phase` attributes and
respective values, to really understand how the current infrastructure performs.

We combined all the results in an Excel sheet which we then examined to derive
the points of inflection (in terms of number of concurrent users and database
size) at which performance and user experience start to go below thresholds
we've defined as acceptable.

As a next step, we'll be adding more computational resources to the database, by
migrating it to a managed database service, as we continue to use Artillery to
monitor the performance improvements that result from implemented infrastructure
updates.

## Resources

Some great resources that helped us along the way:

- [Artillery Docs](https://artillery.io/docs/guides/overview/welcome.html)
- [Artillery Examples](https://github.com/artilleryio/artillery-examples)
- [Load testing using AWS & Artillery - João Tiago (20m talk + 10m Q&A) [2020.05 DevOps Lisbon]](https://www.youtube.com/watch?v=jZSgg9pmw2g)
- [Performance Tests with Artillery - Rafaela Azevedo](https://azevedorafaela.com/2019/06/27/performance-tests-with-artillery/)
- [Automating performance and load tests with Artillery + Keptn - Francesco Lentini](https://www.youtube.com/watch?v=j1Spkw0faq0)
- [Load testing a web application’s serverless backend - James Beswick](https://aws.amazon.com/blogs/compute/load-testing-a-web-applications-serverless-backend/)