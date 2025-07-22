import { mainnet, sepolia } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { http, WagmiProvider } from "wagmi";
import { createAppKit, useAppKitTheme } from "@reown/appkit/react";
const mainnetRPC = null;
const sepoliaKey = process.env.SEPOLIA_API_KEY;
const mode = process.env.APP_MODE;
const queryClient = new QueryClient();

const projectId = "a6c1bb6ed617e23667d5a47913416e39";

const metadata = {
  name: "GeneAlpha",
  description: "",
  url: "https://genealpha.ai", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const selectedNetwork = mode == "production" ? mainnet : sepolia;
const transports =
  mode == "production"
    ? { [mainnet.id]: http(mainnetRPC) }
    : { [sepolia.id]: http(`https://sepolia.infura.io/v3/${sepoliaKey}`) };

const generalConfig = {
  projectId,
  networks: [selectedNetwork],
};

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  ...generalConfig,
  transports,
});

createAppKit({
  ...generalConfig,
  adapters: [wagmiAdapter],
  metadata,
  features: {
    analytics: true,
    socials: [],
    email: false,
  },
});

export function AppKitProvider({ children }) {
  const { setThemeVariables } = useAppKitTheme();
  setThemeVariables({
    "--w3m-color-mix": "#0A0B0B",
    "--w3m-color-mix-strength": 20,
    "--w3m-border-radius-master": "1.5px",
    "--w3m-accent": "#bababd",
    "--w3m-font-family": "'Inter', sans-serif",
  });
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
