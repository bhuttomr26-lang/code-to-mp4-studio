# Code-to-MP4 Studio

A lightweight Vite frontend for configuring image and video projects.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
Import this repository into Vercel. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.

## Current limitations
This is the frontend starter only. The Render MP4 button does not submit a real job yet. A separately hosted background rendering worker/API and storage are needed for persistent Blender/FFmpeg rendering. Settings are saved only in the current browser.
