# Security Policy

## Supported version

Only the latest version on the `main` branch receives security fixes.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting for this repository. Do not include active sync codes, exported itineraries, Firebase credentials, or personal travel information in a public issue.

## Sync-code security model

The sync code acts as a shared access key: anyone who knows it can read and update that itinerary. The planner intentionally supports the short code `py` for a small private travel group, so it must not contain sensitive personal information.

Firebase Web API keys are public client configuration, not server secrets. Access control depends on the deployed Firestore rules in `firestore.rules`.
