import Header from "../components/Header";
import Speakers from "./Speakers";
import Layout from "./Layout";
import { AuthProvider } from "../contexts/AuthContext";

function App() {
	return (
		<AuthProvider initialLoginUser="JP">
			<Layout startingTheme="light">
				<div>
					<Header />
					<Speakers />
				</div>
			</Layout>
		</AuthProvider>
	);
}

export default App;
