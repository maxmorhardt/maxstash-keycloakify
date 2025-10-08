![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=2F73BF)
![Keycloak](https://img.shields.io/badge/Keycloak-blue?style=for-the-badge&logo=keycloak)

![Static Badge](https://img.shields.io/badge/license-Apache%202.0-green)

## Overview
This repo contains a Keycloak theme using keycloakify-starter

## Quick start
```bash
git clone https://github.com/keycloakify/keycloakify-starter
cd keycloakify-starter
npm install 
```

## Testing the theme locally
[Documentation](https://docs.keycloakify.dev/testing-your-theme)

## How to customize the theme
[Documentation](https://docs.keycloakify.dev/customization-strategies)

## Building the theme
```bash
npm run build-keycloak-theme
```

Note that by default Keycloakify generates multiple .jar files for different versions of Keycloak.  
You can customize this behavior, see documentation [here](https://docs.keycloakify.dev/features/compiler-options/keycloakversiontargets).

## Initializing the account theme
```bash
npx keycloakify initialize-account-theme
```

## Initializing the email theme
```bash
npx keycloakify initialize-email-theme
```

## Important commands
```bash
# Add new ftl to storybook
npx keycloakify add-story

# Export ftl to react component for full customization
npx keycloakify eject-page

# Starts keycloak docker container with theme
npx keycloakify start-keycloak
```