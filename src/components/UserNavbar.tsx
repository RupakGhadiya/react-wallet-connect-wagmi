/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extra-boolean-cast */
import { formatWalletAddress } from "../common/commonFunction.ts";
import { useWalletIntegration } from "../hooks/use-wallet-intgegration";
import useZustandStore from "../store/useStore";
import { useAccount } from "wagmi";

const UserNavbar = () => {
  // Connect Wallet
  const { disconnectWallet } = useWalletIntegration();
  const { setWalletConnectModel } = useZustandStore();
  const { isConnected, address } = useAccount();

  const handleConnectButtonClick = async () => {
    // scrollToTop();
    console.log("click");
    if (isConnected) {
      await disconnectWallet();
      setTimeout(() => {
        disconnectWallet();
      }, 1000);
    } else {
      setWalletConnectModel(true);
    }
  };

  return (
    <div className="hidden lg:flex flex-row items-center uppercase">
      {!address && !isConnected ? (
        <button
          className="text-white border-amber-50 px-[20px] py-[8px] h-fit w-max bg-orange-gradient rounded-[100px] text-[16px] border-none font-jogan-bold uppercase letter-spacing: 1.2px"
          onClick={handleConnectButtonClick}
        >
          connect wallet
        </button>
      ) : (
        <div
          className="w-fit bg-[#FFFFFF1A] px-[12px] py-[4px] rounded-[18px] flex gap-[8px] items-center justify-between hover:cursor-pointer"
          onClick={handleConnectButtonClick}
        >
          <div className="text-[18px] font-jogan-bold text-[#F9A034]">
            {address && isConnected && formatWalletAddress(address, 4, 4)}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNavbar;
