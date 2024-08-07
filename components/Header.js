import { ConnectButton } from "@web3uikit/web3";

export default function Header() {
  return (
    <div>
      Decentralized lottery
      <ConnectButton moralisAuth={false} />
    </div>
  );
}
