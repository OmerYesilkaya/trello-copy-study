import { Flex } from "@chakra-ui/layout";
import Navbar from "components/Navbar/Navbar";
import Home from "pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	return (
		<Flex w="100vw" h="100vh" direction="column" align="center">
			<Navbar />
			<Router>
				<Switch>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
		</Flex>
	);
}

export default App;
