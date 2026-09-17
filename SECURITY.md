# Security Policy

## Supported version

Only the latest version on the `main` branch receives security fixes.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting for this repository. Do not include active sync codes, exported itineraries, Firebase credentials, or personal travel information in a public issue.

## Sync-code security model

The sync code acts as a shared access key: anyone who knows it can read and update that itinerary. Short codes such as `py` are convenient but guessable. Do not store sensitive personal information in the planner, and use the generated random code when confidentiality matters.

Firebase Web API keys are public client configuration, not server secrets. Access control depends on the deployed Firestore rules in `firestore.rules`.
