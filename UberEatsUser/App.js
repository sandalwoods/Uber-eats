import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/Navigation";

import { Amplify, Analytics } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
import AuthContextProvider from "./src/contexts/AuthContext";
import BasketContextProvider from "./src/contexts/BasketContext";
import OrderContextProvider from "./src/contexts/OrderContext";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <BasketContextProvider>
          <OrderContextProvider>
            <RootNavigator />
          </OrderContextProvider>
        </BasketContextProvider>
      </AuthContextProvider>

      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
