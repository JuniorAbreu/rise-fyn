import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import { PasswordModal } from '../../components/modal';

export function Home() {

  const [size, setSize] = useState(10);
  const [password, setPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const charSet = 'asdfdfdgxbcvbvbghnhjm123456!@#$%¨%&';

  function generatePass() {
    let password = '';
    for (let index = 0; index < size; index++) {
     password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    setPassword(password);
    setShowPasswordModal(true);
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/logo.png")}
      >
      </Image>
      <Text style={styles.title}>{size} Caracteres</Text>

      <View style={styles.area}>
        <Slider
          style={{height: 50}}
          maximumValue={20}
          minimumValue={6}
          value={size}
          onValueChange={(e) => setSize(e.toFixed(0))}
          />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>
          Criar Senha
        </Text>
      </TouchableOpacity>
      <Modal visible={showPasswordModal} animationType='fade' transparent={true}>
        <PasswordModal password={password} onClose={() => setShowPasswordModal((previousState) => !previousState)}>

        </PasswordModal>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 60
  },
  area: {
    marginTop: 14,
    marginBottom: 14,
    width: '80%',
    backgroundColor: '#F3F3FF',
    padding: 8
  },
  button: {
    backgroundColor: 'blue',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  }
});
