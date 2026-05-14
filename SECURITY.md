# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Muqaren seriously. If you believe you have found a security vulnerability, please report it to us privately.

**Do not open a public issue.** Instead, please follow these steps:

1. **Contact**: Email the project maintainers with a detailed description of the vulnerability
2. **Include**: Steps to reproduce, affected versions, and potential impact
3. **Response**: We will acknowledge receipt within 48 hours and provide a timeline for resolution

## Security Best Practices

- Never commit `.env` files or secrets to the repository
- Use `.env.example` as a template for required environment variables
- Keep dependencies up to date with `npm audit`
- Review scraping targets' terms of service before deployment

## Disclosure Policy

We follow a coordinated disclosure process:

1. The vulnerability is reported privately
2. A fix is developed and tested
3. A new version is released with the fix
4. Public disclosure occurs after the fix is available