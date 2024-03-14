import { createProxyMiddleware } from "http-proxy-middleware";

export const authProxy = createProxyMiddleware("/auth", {
  target: "http://127.0.0.1:8080",
  changeOrigin: true,
  pathRewrite: {
    "^/auth": "",
  },
});

export const pastesProxy = createProxyMiddleware("/pastes", {
  target: "http://127.0.0.1:3001",
  changeOrigin: true,
  pathRewrite: {
    "^/pastes": "",
  },
});
