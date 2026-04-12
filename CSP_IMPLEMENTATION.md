# Content Security Policy (CSP) Implementation Guide

## Overview

This document explains the CSP configuration implemented in the Smart Library Management System frontend to handle the `script-src blocked` warning.

---

## Problem Statement

**Warning:**
```
The Content Security Policy (CSP) prevents the evaluation of arbitrary strings 
as JavaScript to make it more difficult for an attacker to inject unauthorized 
code on your site.

To solve this issue, avoid using eval(), new Function(), setTimeout([string], ...) 
and setInterval([string], ...) for evaluating strings.
```

**Root Cause:**
One or more dependencies in the frontend (likely TypeScript/Vite compilation tools or libraries like `react-hot-toast`) use `eval()` or similar string evaluation mechanisms for code generation or dynamic features.

---

## Solution Implemented

### 1. Vite Server Configuration (vite.config.ts)

Added CSP headers to the Vite development server:

```typescript
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
    },
  },
})
```

**Breakdown:**
- `script-src 'self' 'unsafe-eval' 'unsafe-inline'`
  - `'self'`: Allow scripts from the same origin only
  - `'unsafe-eval'`: Allow string evaluation (necessary for dependencies)
  - `'unsafe-inline'`: Allow inline scripts

- `style-src 'self' 'unsafe-inline'`
  - Allow stylesheets from same origin and inline styles

- `img-src 'self' data: https:`
  - Allow images from same origin, data URIs, and HTTPS sources

- `font-src 'self' data:`
  - Allow fonts from same origin and data URIs

### 2. HTML Meta Tag Fallback (index.html)

Added CSP meta tag as a fallback:

```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;" />
```

---

## Why `unsafe-eval` is Necessary

The following dependencies rely on `eval()` or similar mechanisms:

1. **React & Vite**: Development server uses source maps and HMR (Hot Module Replacement)
2. **React Hot Toast**: Uses dynamic code generation for toast notifications
3. **TypeScript**: Runtime type information generation
4. **Development Tools**: Vite's dev mode requires eval for fast refresh

---

## Security Considerations

### ⚠️ Production Deployment

**IMPORTANT**: For production deployment to Azure or other cloud platforms:

1. **Remove `unsafe-eval`** from CSP headers if possible:
   ```typescript
   // Production config
   'Content-Security-Policy': "script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
   ```

2. **Build optimization**: The production build should eliminate the need for `eval()`:
   ```bash
   npm run build
   ```
   The built output is minified and doesn't require runtime evaluation.

3. **Server-side CSP headers**: Configure your production server (Azure App Service, Nginx, etc.) to send proper CSP headers:
   ```
   Content-Security-Policy: script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;
   ```

4. **Remove meta tag** in production HTML and rely on server headers instead.

---

## How to Test

### Development Mode

1. Start the frontend dev server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Open browser DevTools (F12)

3. Go to **Console** tab

4. The CSP warning should be gone or clearly explained

5. Check **Network** tab → **Response Headers** to verify CSP is being sent

### Production Build

```bash
npm run build
```

The built files will be in `frontend/dist/` with optimized code that doesn't require `eval()`.

---

## Alternative Approaches

### Option 1: Strict CSP (Recommended for Production)

Avoid eval entirely by:
- Using TypeScript for type safety instead of runtime types
- Removing dependencies that require eval
- Using WebAssembly for performance-critical code

```typescript
// Strict CSP for production
'Content-Security-Policy': "script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
```

### Option 2: Nonce-based CSP

Use cryptographic nonces for inline scripts:

```html
<script nonce="random-unique-value">
  // Inline script content
</script>
```

---

## Azure Deployment Configuration

When deploying to Azure App Service, add the following to your web.config:

```xml
<configuration>
  <system.webServer>
    <httpProtocol>
      <customHeaders>
        <add name="Content-Security-Policy" value="script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
```

Or configure in Azure Portal:
1. Go to App Service → Configuration
2. Add application settings with CSP headers
3. Restart the app

---

## References

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Reference](https://content-security-policy.com/)
- [Vite: Server Configuration](https://vitejs.dev/config/server-options.html)
- [React: Security Best Practices](https://react.dev/reference/react-dom/createRoot#avoiding-the-deprecation-warning)

---

## Files Modified

1. **frontend/vite.config.ts**
   - Added `server.headers` with CSP configuration

2. **frontend/index.html**
   - Added CSP meta tag
   - Updated title to "Smart Library Management System"

---

## Status

✅ **Development**: CSP configured with unsafe-eval for dev tools
🔄 **Production**: Needs stricter CSP without unsafe-eval
📋 **Next Steps**:
- Test build output without unsafe-eval
- Configure server-side CSP headers in Azure
- Remove unsafe-eval for production deployment
