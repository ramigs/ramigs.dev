---
date: 2022-02-12
title: "[TIL] How to fix error CORS OPTIONS Missing Allow Header"
description: "How to fix error CORS OPTIONS Missing Allow Header"
slug: how-to-fix-cors-options-missing-allow-header
tags:
  - til
  - http
  - options
  - cors
---

TIL how to fix errors such as `OPTIONS
https://id.dev.nordikcoin.com/auth/questionnaire CORS Missing Allow Header` and
`Reason: header 'authorization' is not allowed according to header
'Access-Control Allow-Headers' from CORS preflight response.`, which tend to
manifest specially when working in local development.

Header `Access-Control-Allow-Headers` is a response header to a preflight
request (`OPTIONS`).

These issues can be fixed from the server side either by setting header
`Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS`,
`Access-Control-Allow-Headers: authorization`, or both.

From Postman the request may succeed, but only because Postman is more
permissive than the browser and does not send the preflight request `OPTIONS`.

