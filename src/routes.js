import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'
import { Home } from './pages/home';
import Password from './pages/password';
import Login from './pages/login';
import { Company } from './pages/company';
import { Transactions } from './pages/transactions';
import { Admin } from './pages/admin';
import { TransacationCategory } from './pages/transactionCategory';
import { Dashboard } from './pages/dashboard';
import { Cashflow } from './pages/cashFlow';
import Register from './pages/register';
import { useAuth } from "./hooks/useAuth";
import { useSelector } from "react-redux";

// const { auth, loading } = useAuth();

const Tab = createBottomTabNavigator();

const Routes = () => {
const { user } = useSelector((state) => state.auth);
const initialRouteName = user.id ? 'home' : 'login';
  return (
    <Tab.Navigator 
    initialRouteName={initialRouteName} 
    className='hidden'
    screenOptions={({ route }) => ({
        tabBarStyle: {
          display: !user.id ? 'none' : 'flex',
        },
      })}
    >
        <Tab.Screen 
            name="statement" 
            component={Transactions}
            options={
                {
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({focused, size, color}) => {
                        if (focused) {
                            return <Ionicons size={size} color={color} name='albums'/>
                        }
                        return <Ionicons size={size} color={color} name='albums-outline'/>
                    }

                }
            }
        />

        <Tab.Screen 
            name="cash-flow" 
            component={Cashflow}
            options={
                {
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({focused, size, color}) => {
                        if (focused) {
                            return <Ionicons size={size} color={color} name='cash'/>
                        }
                        return <Ionicons size={size} color={color} name='cash-outline'/>
                    }

                }
            }
        />

        <Tab.Screen 
            name="home" 
            component={Company} 
            options={
                {
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused, size, color}) => {
                        if (focused) {
                            return <Ionicons size={size} color={color} name='home'/>
                        }
                        return <Ionicons size={size} color={color} name='home-outline'/>
                    }

                }
            }
        />

        <Tab.Screen
            name="dashboard" 
            component={Dashboard}
            options={
                {
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({focused, size, color}) => {
                        if (focused) {
                            return <Ionicons size={size} color={color} name='stats-chart'/>
                        }
                        return <Ionicons size={size} color={color} name='stats-chart-outline'/>
                    }

                }
            }
        />

        <Tab.Screen
            name="settings" 
            component={TransacationCategory}
            options={
                {
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({focused, size, color}) => {
                        if (focused) {
                            return <Ionicons size={size} color={color} name='settings'/>
                        }
                        return <Ionicons size={size} color={color} name='settings-outline'/>
                    }

                }
            }
        />
        <Tab.Screen
            name="login" 
            component={Login}
            options={
                {
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarVisible: false,
                    tabBarButton: () => null,
                }
            }
        />
        <Tab.Screen
            name="register" 
            component={Register}
            options={
                {
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarVisible: false,
                    tabBarButton: () => null,
                }
            }
        />
    </Tab.Navigator>
  )
}

export default Routes