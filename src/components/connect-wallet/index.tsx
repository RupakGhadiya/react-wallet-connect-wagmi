/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  type FC,
  type ReactNode,
  useState,
  useEffect,
} from "react";

import toast from "react-hot-toast";

import { useSignMessage, useAccount } from "wagmi";
import {
  MemeIndexLogo,
  WalletSuccessIcon,
} from "../../../public/icons/icon";
import { isMobileDevice } from "../../common/commonFunction";
import { CONNECT_WALLET_OPTIONS } from "../../config/web3.config";
import useZustandStore from "../../store/useStore";
import { useWalletIntegration } from "../../hooks/use-wallet-intgegration";
import PopupModal from "../modal";

const ConnectWalletModal: FC = () => {
  const { connectWallet } = useWalletIntegration();
  const { isConnected, address } = useAccount();
  const {
    walletConnectModel,
    setWalletConnectModel,
    successWalletModel,
    setSuccessWalletModel,
  } = useZustandStore();
  const { signMessageAsync } = useSignMessage();
  const { disconnectWallet } = useWalletIntegration();
  const [selectedOptionIcon, setSelectedOptionIcon] = useState<ReactNode>(null);
  const [connectStatus, setConnectStatus] = useState<
    "idle" | "processing" | "success" | "waitingForSignature"
  >("idle");
  const [loadingModelOpen, setLoadingModelOpen] = useState(false);
  const [pendingSignature, setPendingSignature] = useState(false);

  const handleCloseModal = () => {
    setWalletConnectModel(false);
    setLoadingModelOpen(false);
    setConnectStatus("idle");
    setPendingSignature(false);
  };

  const handleCloseModal2 = async () => {
    setSuccessWalletModel(false);
    setConnectStatus("idle");
  };

  useEffect(() => {
    const handleSignature = async () => {
      if (!isConnected || !address || !pendingSignature) return;

      try {
        setConnectStatus("waitingForSignature");

        const message = "Signature message";
        const signature = await signMessageAsync({ message });

        // call API if needed
        console.log("signature", signature);

        handleCloseModal();
        setLoadingModelOpen(false);
      } catch (error: any) {
        setPendingSignature(false);

        if (error.code === 4001) {
          toast.error("Signature Request rejected.");
          disconnectWallet();
        } else if (error.name === "UnauthorizedProviderError") {
          toast.error("Please connect your wallet first.");
        } else {
          toast.error("Failed to sign message. Please try again.");
        }

        console.error("Message signing failed:", error);
        setConnectStatus("idle");
        setLoadingModelOpen(false);
      }
    };

    handleSignature();
  }, [isConnected, address, pendingSignature]);

  const connectWalletHandle = async (mode: string, Icon?: ReactNode) => {
    setSelectedOptionIcon(Icon || null);

    // Check for MetaMask presence
    if (mode === "metamask") {
      const provider =
        typeof window !== "undefined" ? (window as any).ethereum : null;
      if (!provider || !provider.isMetaMask) {
        handleCloseModal();
        handleCloseModal2();
        toast.error("MetaMask extension not detected!");
        return;
      }
    }

    try {
      if (mode === "metamask") {
        setConnectStatus("processing");
      } else {
        handleCloseModal();
      }

      const walletAddress = await connectWallet(mode);

      if (!walletAddress) throw new Error("Wallet connection failed");

      if (mode !== "metamask") {
        setLoadingModelOpen(true);
      }

      if (walletAddress) {
        setPendingSignature(true);
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
      setConnectStatus("idle");
      setLoadingModelOpen(false);
      setPendingSignature(false);
    }
  };

  const getHeadingTitle = (status: string): string => {
    switch (status) {
      case "idle":
        return "Connect a wallet";
      case "processing":
        return "Connecting Wallet...";
      case "waitingForSignature":
        return "Waiting for Signature...";
      case "success":
        return "Wallet Connected Successfully";
      default:
        return "Connect a wallet";
    }
  };

  const headingTitle = getHeadingTitle(connectStatus);

  return (
    <>
      <PopupModal
        isOpen={walletConnectModel}
        onCloseModal={handleCloseModal}
        headerTitle={headingTitle}
        fixwidth="362px"
        showClose={
          headingTitle === "Connecting Wallet..." ||
          headingTitle === "Waiting for Signature..."
            ? false
            : true
        }
        isSuccess={connectStatus === "success" ? false : true}
        isSignatureMessage={connectStatus === "waitingForSignature"}
      >
        {connectStatus !== "waitingForSignature" ? (
          <div className="flex flex-col items-center justify-center gap-[8px] mt-[30px] w-full">
            {connectStatus === "idle" && (
              <>
                {CONNECT_WALLET_OPTIONS.map(
                  (option, i) =>
                    ((option.isInMobileVisible && isMobileDevice()) ||
                      (option.isInDesktopVisible && !isMobileDevice())) && (
                      <ul
                        key={i}
                        className="flex justify-center flex-col gap-[8px] btn-gradient rounded-[12px] w-full h-[52px] px-[16px] cursor-pointer border border-white ease-linear"
                      >
                        <li
                          className="flex items-center justify-between font-jogan-bold text-white text-[16px]"
                          onClick={() =>
                            connectWalletHandle(option.name, <option.Icon />)
                          }
                        >
                          <span className="p-2 pl-0">{option.title}</span>
                          <option.Icon />
                        </li>
                      </ul>
                    )
                )}
              </>
            )}
            {connectStatus === "processing" && (
              <div className="flex flex-col items-center justify-center gap-[20px] mt-[15px] w-full">
                <div className="flex flex-row w-full items-center justify-center gap-[10px] relative overflow-hidden">
                  <span className="flex flex-row gap-[3px] font-jogan-bold text-white text-[24px] uppercase items-center justify-center">
                    MI
                    <MemeIndexLogo />
                  </span>

                  <div className="relative w-[99px] h-[2px] overflow-hidden rounded-[2px]">
                    <div className="absolute top-0 left-0 w-[200%] h-full bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-repeat-x bg-size-[8px_2px] animate-moveDotLine" />
                  </div>

                  <span>
                    {selectedOptionIcon ? (
                      selectedOptionIcon
                    ) : (
                      <div className="h-16 w-16 border-t-2 border-b-2 border-white rounded-full" />
                    )}
                  </span>
                </div>

                {connectStatus === "processing" && (
                  <p className="font-jogan-bold text-white text-[12px] mb-[27px]">
                    Proceed in your wallet
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-[24px] justify-center items-center">
            <div className="relative w-[48px] h-[48px] flex items-center justify-center">
              <div className="absolute w-full h-full border-4 border-[#B3B3B3] rounded-full"></div>
              <div className="absolute w-full h-full border-4 border-t-[#fff] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>

            <div className="text-center text-[#FFFFFFE5] text-[16px] font-jogan">
              To continue securely, please sign this message using your wallet.
              This will not trigger a transaction or cost any gas.
            </div>
            <button
              onClick={handleCloseModal}
              className="border-[2px] rounded-[100px] w-full py-[6px] px-[20px] text-[#FFFFFF] text-[16px] font-jogan-bold uppercase border-[#F9A034]"
            >
              Close
            </button>
          </div>
        )}
      </PopupModal>

      {/* Loading Modal - Similar structure as main modal */}
      <PopupModal
        isOpen={loadingModelOpen}
        fixwidth="362px"
        onCloseModal={() => setLoadingModelOpen(false)}
        headerTitle={headingTitle}
        showClose={true}
        isSuccess={connectStatus === "success" ? false : true}
        isSignatureMessage={connectStatus === "waitingForSignature"}
      >
        {/* Same content structure as main modal */}
        {connectStatus !== "waitingForSignature" ? (
          <div className="flex flex-col items-center justify-center gap-[8px] mt-[30px] w-full">
            {/* Similar content as main modal */}
          </div>
        ) : (
          <div className="flex flex-col gap-[24px] justify-center items-center">
            <div className="relative w-[48px] h-[48px] flex items-center justify-center">
              <div className="absolute w-full h-full border-4 border-[#B3B3B3] rounded-full"></div>
              <div className="absolute w-full h-full border-4 border-t-[#fff] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>

            <div className="text-center text-[#FFFFFFE5] text-[16px] font-jogan">
              To continue securely, please sign this message using your wallet.
              This will not trigger a transaction or cost any gas.
            </div>
            <button
              onClick={handleCloseModal}
              className="border-[2px] rounded-[100px] w-full py-[6px] px-[20px] text-[#FFFFFF] text-[16px] font-jogan-bold uppercase border-[#F9A034]"
            >
              Close
            </button>
          </div>
        )}
      </PopupModal>

      {/* Success Modal */}
      <PopupModal
        isOpen={successWalletModel}
        onCloseModal={handleCloseModal2}
        headerTitle="Connect Wallet"
        isSuccess={false}
        fixwidth="362px"
      >
        <div className="flex flex-col items-center justify-center gap-[8px] mt-[30px] w-full">
          <div className="flex flex-col items-center justify-center gap-6 mt-[-25px]">
            <WalletSuccessIcon />
            <p className="flex !items-center !justify-center text-center font-jogan-bold text-white text-[20px] w-[70%] mb-[-2.8px] mt-[0px]">
              Wallet Connected Successfully{" "}
            </p>
            <button
              className="!text-black !px-[32px] !pt-[14px] !pb-[17px] max-h-[60px] max-w-[160px] bg-orange-gradient !rounded-[100px] !border-none !font-jogan-bold text-[20px] uppercase"
              onClick={handleCloseModal2}
            >
              Continue
            </button>
          </div>
        </div>
      </PopupModal>
    </>
  );
};

export default ConnectWalletModal;
