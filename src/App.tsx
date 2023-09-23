import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";

import { AppNavbar } from "views";
import { BoardDetails, Home } from "pages";

function App() {
    return (
        <Router>
            <Flex w="100vw" h="100vh" maxW="100vw" maxH="100vh" direction="column" align="center">
                <AppNavbar />
                <Switch>
                    <Route exact path="/board/:id">
                        <BoardDetails />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Flex>
        </Router>
    );
}

export default App;
