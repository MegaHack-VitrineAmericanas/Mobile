import React, {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import logoVitrineAmericanas from '../../assets/Icons/logo/logo_home.png';
import LoadingAnimation from '../../components/LoadingAnimation';

import {
    Container,
    ImageView,
    Logo,
    ButtonLogin,
    ButtonLoginText,
    ButtonFacebook,
    ButtonTextFacebook,
    CreateAccountButton,
    CreateAccountText,
    ViewInput,
    TextInput,
} from './styles';

export default function SignIn({navigation}) {
    const passRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = () => {
        setLoading(true);
        try {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    if (user) {
                        navigation.replace('LoadDataScreen');
                    }
                })
                .catch(e => {
                    setLoading(false);
                    setPassword('');
                });
        } catch (e) {
            setLoading(false);
            console.warn(e);
        }
    };

    const handleSignUp = nav => {
        nav.navigate('SignUpScreen');
    };

    const handleSignInFacebook = () => {
        console.log('Clicou login facebook');
    };

    return (
        <Container>
            {loading && <LoadingAnimation />}
            {!loading && (
                <>
                    <ImageView>
                        <Logo source={logoVitrineAmericanas} />
                    </ImageView>
                    <ViewInput>
                        <Icon name="mail" size={20} color="#ff9000" />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="E-mail"
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="next"
                            keyboardType="email-address"
                            onSubmitEditing={() => passRef.current.focus()}
                        />
                    </ViewInput>
                    <ViewInput>
                        <Icon name="lock" size={20} color="#ff9000" />
                        <TextInput
                            ref={passRef}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Senha"
                            secureTextEntry
                            autoCapitalize="none"
                            returnKeyType="send"
                            onSubmitEditing={() => handleSignIn()}
                        />
                    </ViewInput>
                    <ButtonLogin onPress={() => handleSignIn(navigation)}>
                        <ButtonLoginText>LOGIN</ButtonLoginText>
                    </ButtonLogin>
                    <ButtonFacebook>
                        <ButtonTextFacebook
                            onPress={() => {
                                handleSignInFacebook();
                            }}>
                            ENTRAR COM FACEBOOK
                        </ButtonTextFacebook>
                    </ButtonFacebook>
                    <CreateAccountButton
                        onPress={() => handleSignUp(navigation)}>
                        <CreateAccountText>
                            Não sou cadastrado
                        </CreateAccountText>
                    </CreateAccountButton>
                </>
            )}
        </Container>
    );
}
