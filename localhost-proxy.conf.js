"use strict";

module.exports = [
  {
    context: [
      "/api",
      "/auth"
    ],
    target: "http://localhost:3001",
    secure: false,
    changeOrigin: true
  }
];
