---
date: 2026-08-17
title: 'How online card payments actually work'
description: 'A step-by-step walkthrough of an online card payment, from checkout and tokenization through 3DS, authorization, capture, and settlement.'
tags:
  - payments
---

Tapping "pay" looks instant from the checkout page, but it kicks off a chain
of handoffs between the merchant, a payment provider, an acquiring bank, a
card network, and an issuing bank — most of it happening before any money
actually moves. Here's the flow broken into its logical steps.

## 1. Card data capture

The customer enters card details (PAN, expiry, CVV) on the merchant's site. To
avoid full PCI DSS scope, this is usually done via hosted fields/iframes or an
SDK so raw card data never touches the merchant's own servers.

## 2. Tokenization

The card data is sent directly from the browser/app to the payment provider
or a tokenization vault, which returns a token (or sometimes a "network
token" issued by Visa/Mastercard directly) representing the card. The
merchant stores/uses this token instead of the PAN going forward.

## 3. 3D Secure (3DS) authentication

Before authorization (or sometimes as part of it), the transaction may go
through 3DS:

- **Device fingerprinting / risk data collection** — browser/device data is
  silently collected first.
- **Risk-based decision (frictionless vs. challenge)** — the issuer's ACS
  (Access Control Server) decides, based on risk scoring and exemption rules
  (e.g. PSD2 SCA exemptions), whether to challenge the customer.
- **Challenge flow (if triggered)** — customer verifies via OTP, banking app
  push notification, biometrics, etc.
- **Authentication result** — a cryptographic proof (CAVV) and ECI value are
  returned, which shifts liability for fraud from merchant to issuer if
  successful.

## 4. Authorization

The transaction (token + 3DS result, if any) is sent to the acquirer, which
routes it through the card network (Visa/Mastercard/etc.) to the issuing
bank. The issuer checks funds/credit limit, fraud signals, and approves or
declines. This step returns an authorization code and reserves the funds —
but doesn't move money yet.

## 5. Capture

The merchant "captures" the authorized amount — sometimes immediately
(common for e-commerce), sometimes later (common for things like hotel
bookings or shipping-dependent orders). Capture can also be partial.

## 6. Clearing & settlement

Batches of captured transactions are sent from acquirer to card network to
issuer for clearing. Funds actually move between banks here — this is where
the merchant's bank account gets credited, typically 1-3 business days later
depending on the processor.

## 7. Reconciliation

The merchant matches transactions, fees, and payouts against their own order
records — often surfaced via webhooks/reports from the payment provider
(settlement reports, fee breakdowns, chargebacks, refunds).

## How much of this you actually build

Which of these steps a merchant implements directly — versus just calls into
— depends heavily on the integration style:

- **Hosted/redirect checkout** (e.g. Stripe Checkout, PayPal redirect) —
  almost the entire flow is abstracted away. The merchant redirects the
  customer out and gets a webhook back with a pass/fail result, with no
  visibility into tokenization, 3DS UX, or network routing.
- **SDK/Elements-based** (e.g. Stripe Elements, Adyen Components, Braintree
  Drop-in) — the common middle ground. Card capture is embedded via hosted
  fields, and tokenization plus 3DS are triggered by a single SDK call that
  handles the challenge modal internally. The merchant orchestrates _when_
  things happen, not _how_. Capture is usually the one step still in the
  merchant's hands directly — auto-capture vs. a separate API call made
  later.
- **Direct/custom integration** (e.g. an API-only acquirer integration, or a
  direct 3DS Server implementation) — the merchant implements each step
  itself, potentially handling raw card data (full PCI DSS scope) and
  building its own 3DS challenge flow against the EMV 3DS spec. More
  control, but real compliance and engineering burden shifts onto the
  merchant.

Reconciliation (step 7) stays on the merchant regardless of tier — it's
inherently about matching provider data against internal order records.
Clearing and settlement (step 6), on the other hand, are never something a
merchant implements; that happens entirely between acquirer, network, and
issuer.

## Additional flows layered on top

- **Refunds** — reverse part or all of a captured transaction, processed
  similarly through acquirer → network → issuer.
- **Chargebacks/disputes** — issuer-initiated reversal when a cardholder
  disputes a charge, with a defined evidence/response window for the
  merchant.
- **Webhooks/async notifications** — most providers notify the merchant
  asynchronously for state changes, which matters most for redirect-based
  3DS challenges or delayed authorization methods.
