/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface ZustandStore {
  walletConnectModel: boolean;
  setWalletConnectModel: (value: boolean) => void;

  successWalletModel: boolean;
  setSuccessWalletModel: (value: boolean) => void;
}

const useZustandStore = create<ZustandStore>((set) => ({
  walletConnectModel: false,
  setWalletConnectModel: (value) => set({ walletConnectModel: value }),
  
  successWalletModel: false,
  setSuccessWalletModel: (value) => set({ successWalletModel: value }),
}));

export default useZustandStore;
