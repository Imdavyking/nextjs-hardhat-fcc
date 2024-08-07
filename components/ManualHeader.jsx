import { useEffect } from "react";
import { useMoralis } from "react-moralis";
export default function ManualHeader() {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactiveWeb3,
    isWeb3EnabledLoading,
  } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account change to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactiveWeb3();
        console.log(`no account found`);
      }
    });
  }, []);
  return (
    <div>
      {account ? (
        <div>Connected to {account}</div>
      ) : (
        <button
          disabled={isWeb3EnabledLoading}
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "injected");
            }
          }}
        >
          Connect
        </button>
      )}
    </div>
  );
}
