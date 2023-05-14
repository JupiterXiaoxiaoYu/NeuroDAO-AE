import styles from "../styles/Home.module.css";

// import Dashboard from "./dashboard"
import MyDAO from "./myDAO/index"


const WalletConnectionStatus = Object.freeze({
	Error: 0,
	Connecting: 1,
	Connected: 2,
});

export default function Home() {
//   const { aeSdk, address, networkId, connectToWallet } = useAeternitySDK();
// 	const [balance, setBalance] = useState('loading...');
// 	const [isLoading, setIsLoading] = useState<boolean>(false);
// 	const [message, setMessage] = useState<string | undefined>();

	// useEffect(() => {
	// 	(async () => {
	// 		setIsLoading(true);
	// 		setMessage('Searching for Wallet ...');
	// 		try {
	// 			await connectToWallet();
	// 			setMessage(undefined);
	// 		} catch (error) {
	// 			if (!(error instanceof Error)) throw error;
	// 			setMessage(error.message);
	// 		} finally {
	// 			setIsLoading(false);
	// 		}
	// 	})();
	// }, [connectToWallet]);

	// useEffect(() => {
	// 	(async () => {
	// 		if (networkId == null || address == null) return;

	// 		if (networkId !== network.id) {
	// 			setMessage(`Current network "${networkId}" is not supported. Please switch network in the wallet.`);
	// 			return;
	// 		}
	// 		setMessage(undefined);
			
	// 		const _balance = await aeSdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
	// 		setBalance(_balance);
	// 	})();
	// }, [aeSdk, networkId, address]);

  console.log('sddasd')
  
  return (
    <MyDAO />
  );
}
