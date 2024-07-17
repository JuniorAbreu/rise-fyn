// import "./Auth.css";

// Components
// import { Link } from "react-router-dom";
// import Message from "../../components/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

// Redux
import { register, reset } from "../../slices/authSlice";
import { Header } from "../../components/header";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };
    dispatch(register(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);


  useEffect(() => {
   console.log("error local register", error);
  }, [error]);

  return (
    <SafeAreaView className='flex-1 h-full' id="register">
      <View className='w-11/12 text-center items-center top-40'>
        <Text className='font-bold text-sky-700 text-4xl'>RiseFyn</Text>
      </View>
      <View className='w-full pt-6 pb-6 items-center justify-center rounded-lg top-44'>
          <View className='flex-col w-11/12 mt-2 items-center justify-between'>
            <TextInput
                className='border-gray-400 h-10 border w-full rounded-lg mb-3 p-2'
                placeholder="Nome"
                onChangeText={(e) => setName(e)}
                value={name}
            />
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
            <TextInput
                className='border-gray-400 h-10 border w-full rounded-lg mb-3 p-2'
                placeholder="Confirme a senha"
                onChangeText={(e) => setConfirmPassword(e)}
                value={confirmPassword}
            />
          </View>

          <View>
            <Text className='text-red-500'>{error}</Text>
          </View>

          <View className='space-x-3 flex-row w-11/12 mt-2 items-center justify-center top-6'>
            <TouchableOpacity className='bg-sky-600 flex-1 rounded-lg items-center mt-3 mb-3 p-3' onPress={handleSubmit}>
                <Text className='text-white font-bold'>
                    Criar conta
                </Text>
            </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
    // <div id="register">
    //   <h2>ReactGram</h2>
    //   <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       placeholder="Nome"
    //       onChange={(e) => setName(e.target.value)}
    //       value={name}
    //     />
    //     <input
    //       type="email"
    //       placeholder="E-mail"
    //       onChange={(e) => setEmail(e.target.value)}
    //       value={email}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Senha"
    //       onChange={(e) => setPassword(e.target.value)}
    //       value={password}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Confirme a senha"
    //       onChange={(e) => setConfirmPassword(e.target.value)}
    //       value={confirmPassword}
    //     />
    //     {!loading && <input type="submit" value="Cadastrar" />}
    //     {loading && <input type="submit" disabled value="Aguarde..." />}
    //     {error && <Message msg={error} type="error" />}
    //   </form>
    //   <p>
    //     Já tem conta? <Link to="/login">Clique aqui</Link>
    //   </p>
    // </div>
  );
};

export default Register;
