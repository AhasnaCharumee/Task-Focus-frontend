What this folder contains

- `.env.local` — Local environment variables for development (should NOT be committed to git).
- `.env.example` — Example env file you can copy to `.env.local` and customize.

How to use

1. Copy `.env/.env.example` to `.env.local` at the project root (or edit the one in `env/` and move it):

   PowerShell:

   ```powershell
   Copy-Item .\env\.env.example .\.env.local
   ```

2. Edit `.env.local` and set `VITE_API_URL` to your backend API base URL (for example `http://localhost:5000/api`).

3. Restart the Vite dev server so the new variables are loaded:

   ```powershell
   npm run dev
   ```

Notes

- Vite exposes env variables prefixed with `VITE_` to the client. Only put non-sensitive values here; do NOT store secrets you don't want exposed in the browser.
- Add `.env.local` to `.gitignore` if it isn't already ignored.
