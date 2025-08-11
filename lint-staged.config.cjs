module.exports = {
  "*.{ts,tsx,js,jsx}": [
    "eslint --max-warnings=0 --fix",
    "prettier -w"
  ],
  "*.{json,css,md,yml,yaml}": ["prettier -w"]
};
