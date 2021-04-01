import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import CustomerService from "./services/CustomerService";
import UserCouponsService from "./services/UserCouponsService";
import { createStackNavigator } from "@react-navigation/stack";
import ScheduleTaskPage from "./Pages/ScheduleTaskPage";
import TodoTaskPage from "./Pages/TodoTaskPage";
import StorePage from "./Pages/Store";
import UserCouponsPage from "./Pages/UserCouponsPage";
import UserOffersPage from "./Pages/UserOffersPage";
import PurchaseCoupon from "./Pages/PurchaseCoupon";
import ScheduleForm from "./components/Forms/ScheduleForm";
import UserOffersService from "./services/UserOffersService";
import OfferDetailsPage from "./Pages/OfferDetailsPage";


export default function App() {
  useEffect(() => {
    CustomerService.loadData();
    UserCouponsService.loadCouponsData();
    UserOffersService.loadOffersData();
  });

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={NavBar} />
        <Stack.Screen
          options={({ route }) => ({ title: route.params.name })}
          name="Schedule-Task-Page"
          component={ScheduleTaskPage}
        />
        <Stack.Screen
          options={({ route }) => ({ title: route.params.name })}
          name="Todo-Task-Page"
          component={TodoTaskPage}
        />
        <Stack.Screen
          options={({ route }) => ({ title: route.params.name })}
          name="Store-Page"
          component={StorePage}
        />
        <Stack.Screen
          options={({ route }) => ({ title: route.params.name })}
          name="User-Coupons-Page"
          component={UserCouponsPage}
        />
        <Stack.Screen
          options={({ route }) => ({ title: route.params.name })}
          name="User-Offers-Page"
          component={UserOffersPage}
        />
        <Stack.Screen
          options={({ route }) => ({ title: route.params.name })}
          name="Purchase-Coupon"
          component={PurchaseCoupon}
        />
        <Stack.Screen
          options={({ route }) => ({ title: route.params.name })}
          name="Offers-Details-Page"
          component={OfferDetailsPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
