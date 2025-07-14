
const WalletOnboardingUI = () => {
  return (
    <div className="text-[#fff] text-[12px] font-jogan-bold relative">
      {/* Header */}
      <div className="flex flex-row gap-[20px] mt-6 mb-3 justify-center items-center">
        <img
          src=""
          alt="Best Wallet Logo"
          className="h-[40px] w-[40px]"
        />
        <span className="">
          Best Wallet is a beginner-friendly app that makes it easy to buy our
          presale token. Follow the steps below to get started.
        </span>{" "}
      </div>
      <div className="w-full border-b-[0.2px] border-[#fff]"></div>
      {/* Main Content */}
      {/* Steps & QR */}
      <div className="w-full flex flex-row justify-center items-center mt-3">
        <ul className="text-left space-y-3 text-[13px]">
          <li className="flex justify-start items-center">
            <span className="w-6 h-6 min-w-[25px] text-[13px] min-h-[25px] bg-[#717bbc] border-[2px] border-white leading-none mr-[10px] rounded-full flex justify-center items-center">
              1
            </span>{" "}
            Scan the QR code to download Best Wallet App
          </li>
          <li className="flex justify-start items-center">
            <span className="w-6 h-6 min-w-[25px] text-[13px] min-h-[25px] bg-[#717bbc] border-[2px] border-white leading-none mr-[10px] rounded-full flex justify-center items-center">
              2
            </span>{" "}
            Create your account
          </li>
          <li className="flex justify-start items-center">
            <span className="w-6 h-6 min-w-[25px] text-[13px] min-h-[25px] bg-[#717bbc] border-[2px] border-white leading-none mr-[10px] rounded-full flex justify-center items-center">
              3
            </span>{" "}
            Buy in-app with card or crypto
          </li>
        </ul>

        <div className="p-1 bg-[#fff] rounded-[5px]">
          <img src="" alt="QR Code" />
        </div>
      </div>
    </div>
  );
};

export default WalletOnboardingUI;
