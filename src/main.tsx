import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { QUERY_CLIENT, WAGMI_CONFIG } from "./config/web3.config.ts";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider>
      <WagmiProvider config={WAGMI_CONFIG}>
        <QueryClientProvider client={QUERY_CLIENT}>
          <App />
          <Toaster />
        </QueryClientProvider>
      </WagmiProvider>
    </ConfigProvider>
  </StrictMode>
);
