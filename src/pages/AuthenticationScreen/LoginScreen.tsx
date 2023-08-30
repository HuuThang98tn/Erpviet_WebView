import { StyleSheet, Text, View, Keyboard, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import InputCustom from '../../components/Form/InputCustom';
import TouchableOpacityConfirm from '../../components/Form/TouchableOpacityConfirm';
import { REQUIREIMG } from '../../utils/RequireImage';
import colors from '../../styles/colors';
import ModalLoading from '../../components/Modal/ModalLoading';
import { useNavigation } from '@react-navigation/native';
import CookieManager from '@react-native-cookies/cookies';
import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthProvider';
// import { useIsFocused } from '@react-navigation/native';

type Props = {};

const LoginScreen = (props: Props) => {
    const navigation = useNavigation();
    const [visibleLogins, setVisibleLogins] = useState<boolean>(false);
    const [isCheckedLog, setisCheckedLog] = useState<boolean>(false);
    const [isCheckedCookies, setIsCheckedCookies] = useState<boolean>(false);

    const [errors, setErrors] = useState<string | any>({});
    const [inputs, setInputs] = useState<string | any>({
        inputUrl: "",
        inputUserName: "",
        inputPassword: "",
    });
    // const [inputs, setInputs] = useState<string | any>({
    //     inputUrl: "v16.erpviet.vn",
    //     inputUserName: "admin",
    //     inputPassword: "izi@03082023",
    // });
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const webViewRef: any = useRef(null); // Tạo tham chiếu cho WebView
    const [cookiesRun, setCookiesRun] = useState<string | any | []>("");
    const [cookiesSussces, setCookiesSussces] = useState<string | any | []>("");
    const [urlSussces, setUrlSussces] = useState<string | any | []>("");
    // const [urlCheck, setUrlCheck] = useState<string | any | []>("");
    // const useWebKit = true;
    const [isCheckUrlError, setIsCheckUrlError] = useState<boolean>(true);
    const { isAuthenticated, login, logout }: any = useAuth();
    // const isFocused = useIsFocused();

    // console.log("isAuthenticatedisAuthenticated", isAuthenticated);
    // console.log("cookiesRuncookiesRuncookiesRuncookiesRun", cookiesRun);
    // console.log("cookiesSusscescookiesSusscescookiesSussces", cookiesSussces);
    // console.log("isCheckUrlErrorisCheckUrlErrorisCheckUrlErrorisCheckUrlErrorisCheckUrlError", isCheckUrlError);

    // const getData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('my-key');
    //         if (value !== null) {
    //             // value previously stored
    //         }
    //     } catch (e) {
    //         // error reading value
    //     }
    // };
    // const storeData = async (value: any) => {
    //     try {
    //         await AsyncStorage.setItem('my-key', value);
    //     } catch (e) {
    //         // saving error
    //     }
    // };
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         logout(); //setFalse
    //     }
    // }, [isAuthenticated]);

    // useEffect(() => {
    //     CookieManager.get(`https://${inputs?.inputUrl}/web/login`)
    //         .then((cookies) => {
    //             console.log('DOMAIN_WEBLOGIN:', cookies);
    //             if (cookies?.session_id?.value === "") {
    //                 // // Alert.alert("Sai thông tin đăng nhập????????????????");
    //                 // setVisibleLogins(false);
    //                 // setIsCheckedCookies(false);
    //             } else {
    //                 setCookiesRun(cookies?.session_id?.value);
    //                 // handleLogin();
    //                 // console.log("handleLogin", cookies);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log('Error fetching cookies:', error);
    //         });
    // }, [inputs]);

    useEffect(() => {
        if (isCheckedLog) {
            setisCheckedLog(false);
            setTimeout(() => {
                setVisibleLogins(false);
                setIsCheckedCookies(false);
                if (cookiesRun === cookiesSussces) {
                    Alert.alert("Thông báo", "Sai thông tin đăng nhập!!!");
                    setCookiesSussces("");
                    setCookiesRun("");
                } else if (cookiesRun !== cookiesSussces) {
                    const routeParams = {
                        cookiesSussces: cookiesSussces,
                        urlSussces: urlSussces
                    };
                    login();
                    navigation.navigate('WebViewErpViet', routeParams as any);
                    // console.log(routeParams);
                    // setInputs([
                    //     {
                    //         inputUrl: "",
                    //         inputUserName: "",
                    //         inputPassword: "",

                    //     }
                    // ]);
                    // setCookiesSussces("");
                    // setCookiesRun("");
                }
                // setVisibleLogins(false);
            }, 1500);
        }

    }, [cookiesSussces, isCheckedCookies]);

    useEffect(() => {
        if (isAuthenticated) {
            logout();
        }
    }, [inputs]);

    const validate = async () => {
        logout();
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.inputUrl) {
            handleError('Vui lòng nhập địa chỉ ERPVIET', 'inputUrl');
            isValid = false;
        }
        if (!inputs.inputUserName) {
            handleError('Vui lòng nhập tên đăng nhập', 'inputUserName');
            isValid = false;
        }
        if (!inputs.inputPassword) {
            handleError('Vui lòng nhập mật khẩu đăng nhập', 'inputPassword');
            isValid = false;
        }
        if (isValid) {
            setVisibleLogins(true);
            setTimeout(() => {
                try {
                    CookieManager.get(urlSussces)
                        .then((cookies) => {
                            console.log('DOMAIN_WEBLOGIN:', cookies);
                            if (isCheckUrlError === false) {
                                Alert.alert("Thông báo", "Sai thông tin đăng nhập!!!");
                                setCookiesSussces("");
                                setCookiesRun("");
                                setVisibleLogins(false);
                                setIsCheckedCookies(false);
                                setisCheckedLog(false);
                            } else if (cookies?.session_id?.value === "") {
                                Alert.alert("Thông báo", "Sai thông tin đăng nhập!!!");
                                setVisibleLogins(false);
                                setIsCheckedCookies(false);
                                setisCheckedLog(false);
                            } else {
                                setisCheckedLog(true);
                                setCookiesRun(cookies?.session_id?.value);
                                handleLogin();
                                console.log("handleLogin", cookies);
                            }
                        })
                        .catch((error) => {
                            console.log('Error fetching cookies:', error);
                            setCookiesSussces("");
                            setCookiesRun("");
                            setVisibleLogins(false);
                            setIsCheckedCookies(false);
                            setisCheckedLog(false);

                        });
                } catch (error: any) {
                    Alert.alert("Thông báo", error.message);
                }

            }, 1000);
        };
    };
    const handleLogin = () => {
        const loginScript = `
        document.getElementById('login').value = '${inputs.inputUserName}';
        document.getElementById('password').value = '${inputs.inputPassword}';
      `;
        const loginBtnScript = `
      const loginButton = document.querySelector('.btn.btn-primary.btn-block, .btn.btn-primary');
      if (loginButton) {
        loginButton.click();
      }
    `;
        setTimeout(() => {
            if (webViewRef.current) {
                webViewRef.current.injectJavaScript(loginScript);
                setTimeout(() => {
                    webViewRef.current.injectJavaScript(loginBtnScript);
                }, 1000);
            }
        }, 1000);
    };
    ///Kiểm tra lại đoạn này

    const onLoadEnd = (webViewState: any) => {
        const { nativeEvent } = webViewState;
        if (nativeEvent?.code !== -2)
            setIsCheckUrlError(true);
        setTimeout(() => {
            setUrlSussces(nativeEvent?.url);
            CookieManager.get(nativeEvent?.url)
                .then((cookies) => {
                    if (isCheckedLog) {
                        setIsChecked(!isChecked);
                        setCookiesSussces(cookies?.session_id?.value);
                        setIsCheckedCookies(true);
                    }
                })
                .catch((error) => {

                    console.log('============>:', error);
                });
        }, 1000);

    };

    const handleOnchange = (text: any, input: any) => {
        setInputs((prevState: any) => ({ ...prevState, [input]: text }));
    };
    const handleError = (error: any, input: any) => {
        setErrors((prevState: any) => ({ ...prevState, [input]: error }));
    };
    const onPressRegister = () => {
        setInputs({
            inputUrl: "",
            inputUserName: "",
            inputPassword: "",
        });
        setCookiesSussces("");
        // setCookiesRun("");
        setVisibleLogins(false);
        setIsCheckedCookies(false);
        setisCheckedLog(false);
        // login();
        navigation.navigate("RegisterScreen" as never);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.VIOLETS }}>
            <View style={styles.styleViewLogo}>
                <Image
                    source={REQUIREIMG.img_logo_erp_viet}
                    style={styles.styleLogo}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.styleViewForm}>
                <InputCustom
                    onChangeText={(text: any) => handleOnchange(text, 'inputUrl')}
                    onFocus={() => handleError(null, 'inputUrl')}
                    iconName="web"
                    label={null}
                    placeholder="congty.erpviet.vn"
                    error={errors.inputUrl}
                    valueText={inputs.inputUrl}
                />
                <InputCustom
                    onChangeText={(text: any) => handleOnchange(text, 'inputUserName')}
                    onFocus={() => handleError(null, 'inputUserName')}
                    iconName="account-settings-outline"
                    label={null}
                    placeholder="Tài khoản"
                    error={errors.inputUserName}
                    valueText={inputs.inputUserName}
                />
                <InputCustom
                    onChangeText={(text: any) => handleOnchange(text, 'inputPassword')}
                    onFocus={() => handleError(null, 'inputPassword')}
                    iconName="lock-outline"
                    label={null}
                    placeholder="Mật khẩu"
                    error={errors.inputPassword}
                    valueText={inputs.inputPassword}
                    password={true}
                />
                <View style={styles.styleButton}>
                    <TouchableOpacityConfirm
                        textInput="Đăng nhập"
                        onPress={validate}
                    />
                </View>
                <TouchableOpacity
                    onPress={onPressRegister}
                    style={styles.styleRegister} >
                    <Text style={styles.styleRegisterText}>
                        Đăng ký
                    </Text>
                </TouchableOpacity>

            </View>
            <ModalLoading
                visible={visibleLogins}
            />
            {isAuthenticated === false && <View style={{ width: 0, height: 0, }}>
                <WebView
                    ref={webViewRef}
                    source={{ uri: inputs?.inputUrl !== "" ? `https://${inputs?.inputUrl}/web/login` : "" }}
                    // style={{ display: 'none' }}
                    sharedCookiesEnabled={true}
                    onHttpError={(syntheticEvent) => { console.log("??"); }}
                    onLoadEnd={(webViewState) => { onLoadEnd(webViewState); }}
                    onMessage={event => {
                        console.log("??????", event);
                    }}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.warn('WebView error: ', nativeEvent);
                        if (nativeEvent?.code === -2) {
                            setIsCheckUrlError(false);
                            // setCookiesRun("");
                            // setCookiesSussces("");
                        }
                    }}
                    cacheEnabled={false}
                    cacheMode="LOAD_NO_CACHE"
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    thirdPartyCookiesEnabled={true}
                    mixedContentMode="always"
                    allowsBackForwardNavigationGestures={false}
                    allowsLinkPreview={false}
                    incognito={true}
                />
            </View>}
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({

    styleViewLogo: {
        flex: 2.5,
        justifyContent: "center",
        alignItems: "center"
    },
    styleLogo: {
        width: '100%',
        height: 68
    },
    styleViewForm: {
        flex: 8,
        marginHorizontal: 10
    },
    styleButton: {
        marginVertical: 32
    },
    styleRegister: {
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
    },
    styleRegisterText: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.WHITE
    }
});