import { ConnectButton } from "@web3uikit/web3";

export default function Header() {
  return (
    <div className="border-b-2">
      Decentralized lottery
      <ConnectButton moralisAuth={false} />
    </div>
  );
}
