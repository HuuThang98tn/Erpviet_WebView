// App.js
import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import CookieManager from '@react-native-cookies/cookies';

export default function App() {
    const webviewRef: any = useRef(null);
    const [mainUrl, setMainUrl] = useState('');
    const [email, setEmail] = useState('tranhuuthangfpttn@gmail.com');
    const [password, setPassword] = useState('izi@123$');

    useEffect(() => {
        loadLoginPage();
    }, []);

    const loadLoginPage = () => {
        setMainUrl('https://erp.izisolution.vn/web/login');
    };

    const onNavigationStateChange = (navState: any) => {
        const redirectUrl = navState.url;
        if (redirectUrl.includes('https://erp.izisolution.vn/web/login')) {
            handleLogin();
        }
    };
    const handleNavigationError = () => {
        console.log("Failed to navigate to 'https://erp.izisolution.vn/web#home'");
        Alert.alert("Navigation Error", "Failed to navigate to the desired page.");
    };

    const handleLogin = () => {
        const loginScript = `
        document.getElementById('login').value = '${email}';
        document.getElementById('password').value = '${password}';
      `;
        const loginBtnScript = `
      const loginButton = document.querySelector('.btn.btn-primary.btn-block');
      if (loginButton) {
        loginButton.click();

      }
    `;
        setTimeout(() => {
            if (webviewRef.current) {
                webviewRef.current.injectJavaScript(loginScript);
                setTimeout(() => {
                    webviewRef.current.injectJavaScript(loginBtnScript);
                }, 2500);
            }
        }, 2000);
    };
    const handleWebViewMessage = (event: any) => {
        console.log(event);

        const message = event.nativeEvent.data;
        if (message === "login_success") {
            // Xử lý khi đăng nhập thành công
            console.log("Đăng nhập thành công");
        } else if (message === "login_failure") {
            // Xử lý khi đăng nhập thất bại
            console.log("Đăng nhập thất bại");
        }
    };
    return (
        <View style={styles.container}>
            {/* <WebView
                showsVerticalScrollIndicator={false}
                style={{ opacity: 0.99 }}
                ref={webviewRef}
                renderLoading={() => <ActivityIndicator />}
                startInLoadingState={true}
                source={{ uri: mainUrl }}
                onShouldStartLoadWithRequest={(event) => !event.url.includes('https://erp.izisolution.vn/web#home')}
                onNavigationStateChange={onNavigationStateChange}
                onMessage={(event) => { handleWebViewMessage(event); }}
                javaScriptEnabled={true}
                injectedJavaScript={`
                (function() {
                    window.ReactNativeWebView.postMessage(JSON.stringify(message));

                })();
              `}
                cacheEnabled={false}
                cacheMode="LOAD_NO_CACHE"
                domStorageEnabled={true}
                thirdPartyCookiesEnabled={true}
                mixedContentMode="always"
                allowsBackForwardNavigationGestures={false}
                allowsLinkPreview={false}
                incognito={true}
            /> */}
            <WebView
                // ref={webViewRef}
                source={{
                    uri: 'https://erp.izisolution.vn',
                    headers: {
                        Cookie: 'session_id=79596806cd46f607e854a19c7d561e27ea9b5e1c',
                    },
                }}
                sharedCookiesEnabled={true}
                // javaScriptEnabled={true}
                // injectedJavaScript={injectScript}
                style={{ height: '100%', width: '100%' }}
                onHttpError={(syntheticEvent) => {
                    // const { nativeEvent } = syntheticEvent;
                    // console.warn('WebView received error status code: ', nativeEvent.statusCode);
                }}
                onLoadEnd={(syntheticEvent) => {
                    // update component to be aware of loading status
                    const { nativeEvent } = syntheticEvent;
                    // console.log(nativeEvent);
                    // console.log(syntheticEvent);
                }}
                // sharedCookiesEnabled={true}
                cacheEnabled={false}
                cacheMode="LOAD_NO_CACHE"
                domStorageEnabled={true}
                onMessage={event => {
                    console.log("??????????");

                    // Xử lý thông điệp từ trang web
                    console.log('Message from WebView:', event);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});



// const [session_id, setSession_id] = useState<string | any>("");
// const webViewRef = useRef(null);

// const injectScript = `
//     (function() {
//         const loginInput = document.getElementById("login");
//         const passwordInput = document.getElementById("password");
//         const submitButton = document.querySelector("button[type='submit']");

//         loginInput.value = "tranhuuthangfpttn@gmail.com";
//         passwordInput.value = "izi@123$";

//         submitButton.click();
//         window.postMessage(JSON.stringify(message));
//       })();
//   `;
// useEffect(() => {
//     try {
//         CookieManager.get('https://erp.izisolution.vn')
//             .then((cookies) => {
//                 console.log('CookieManager.get =>', cookies);
//             });

//     } catch (error) {
//         console.log(error);
//         // setVisibleLogins(false);

//     } finally {
//         // setVisibleLogins(false);
//     }
// }, []);

{/* <WebView
                // ref={webViewRef}
                source={{
                    uri: 'https://erp.izisolution.vn',
                    // headers: {
                    //     Cookie: 'session_id=04ec2c0be196bd848d59bfd72ca4cdcb3e1f9845',
                    // },
                }}
                sharedCookiesEnabled={true}
                // javaScriptEnabled={true}
                // injectedJavaScript={injectScript}
                style={{ height: '100%', width: '100%' }}
                onHttpError={(syntheticEvent) => {
                    // const { nativeEvent } = syntheticEvent;
                    // console.warn('WebView received error status code: ', nativeEvent.statusCode);
                }}
                onLoadEnd={(syntheticEvent) => {
                    // update component to be aware of loading status
                    const { nativeEvent } = syntheticEvent;
                    // console.log(nativeEvent);
                    // console.log(syntheticEvent);
                }}
                // sharedCookiesEnabled={true}
                cacheEnabled={false}
                cacheMode="LOAD_NO_CACHE"
                domStorageEnabled={true}
                onMessage={event => {
                    console.log("??????????");

                    // Xử lý thông điệp từ trang web
                    console.log('Message from WebView:', event);
                }}
            /> */}