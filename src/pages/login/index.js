// import "./Auth.css";

// Components
// import { Link } from "react-router-dom";
// import Message from "../../components/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

// Redux
import { login, reset } from "../../slices/authSlice";
import { Header } from "../../components/header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    // console.log(user);

    dispatch(login(user));
    // navigation.navigate("Dashboard")
  };

  // Clean all auth states
  // useEffect(() => {
  //   dispatch(reset());
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log("loading ", loading);
  //  }, [loading]);
 
   useEffect(() => {
    console.log("error local", error);
   }, [error]);

  return (
    <SafeAreaView className='flex-1 h-full items-center' id="login">
      <View className='w-11/12 text-center items-center top-40'>
        <Text className='font-bold text-sky-700 text-4xl'>RiseFyn</Text>
      </View>
      <View className='w-full pt-6 pb-6 items-center justify-center rounded-lg top-44'>
          <Text className='text-black mb-6 text-lg font-bold'> Faça o login para ver o que há de novo </Text>
          <View className='flex-col w-11/12 mt-2 items-center justify-between'>
              <TextInput
                  className='border-gray-400 h-10 border w-full rounded-lg mb-3 p-2'
                  placeholder="E-mail"
                  onChangeText={(e) => setEmail(e)}
                  value={email}
              />
              <TextInput
                  className='border-gray-400 h-10 border w-full rounded-lg mb-3 p-2'
                  placeholder="Senha"
                  onChangeText={(e) => setPassword(e)}
                  value={password}
              />
          </View>
          <View>
            {
              error.length && error.map(item => {
                <Text className='text-red-500'>{item}</Text>
              })
            }
          </View>

          <View className='space-x-3 flex-row w-11/12 mt-2 items-center justify-center top-6'>
            <TouchableOpacity className='bg-slate-400 flex-1 rounded-lg items-center mt-3 mb-3 p-3' onPress={() => navigation.navigate("register")}>
                <Text className='text-white font-bold'>
                    Criar conta
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className='bg-sky-600 flex-1 rounded-lg items-center mt-3 mb-3 p-3' onPress={handleSubmit}>
                <Text className='text-white font-bold'>
                    Entrar
                </Text>
            </TouchableOpacity>
        </View>

      </View>

      {/* <Text className="subtitle">Faça o login para ver o que há de novo.</Text> */}
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p> */}
    
    </SafeAreaView>
  );
};

export default Login;
