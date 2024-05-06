  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "rimraf ./dist && tsc",
    "start": "npm run build && node dist/index.ts"
  },