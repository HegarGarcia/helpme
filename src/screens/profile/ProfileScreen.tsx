import React, { FC, useState } from "react";
import { Text, View, Image } from "react-native";


import Button from "../../components/Button";
import TextInput from "./TextInputBlack";

import { Colors } from "../../styles/base";
import styles from "./styles";

const Icon = require("../../../assets/icon.png");

const SignUpScreen: FC<any> = props => {
    const [username, setUsername] = useState("");

    return (
        <View
            style={styles.container}>
            <Text style={styles.title}>Modificar Cuenta</Text>

            <TextInput onChangeText={setUsername} placeholder='Nombre de Usuario' />

            <Image
                style={{ width: 50, height: 50, alignSelf: "center" }}
                source={Icon}
            />

            <Button
                title='Guardar Cambios'
                backgroundColor={Colors.secondaryLigth}
                onPress={() => props.navigation.navigate("SignIn")}
            />
        </View>
    );
};

export default SignUpScreen;
