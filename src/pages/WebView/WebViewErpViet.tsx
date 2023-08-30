import CookieManager from '@react-native-cookies/cookies';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthProvider';

type Props = {};

const WebViewErpViet = ({ route }: any) => {
    console.log("????????????????", route?.params);
    const [session_id] = useState<string | any>(route?.params?.cookiesSussces);
    const [urlWebView] = useState<string | any>(route?.params?.urlSussces);

    const [checkCookie, setCheckCookie] = useState<string | any>(true);
    const { isAuthenticated, logout }: any = useAuth();

    const navigation = useNavigation();
    //     const injectScript = `
    //     document.querySelector('.dropdown-item.py-3.fs-4[data-menu="logout"], a.dropdown-item.py-3.fs-4[href="https://v16.erpviet.vn/web/session/logout"]').addEventListener('click', function() {
    //         window.ReactNativeWebView.postMessage('logoutClicked');
    //     });
    // `;
    const injectScript = `
    const logoutLink = document.querySelector('.dropdown-item[data-menu="logout"]');
    
      window.ReactNativeWebView.postMessage(logoutLink);
  `;
    // useEffect(() => {
    // CookieManager.clearAll()
    //     .then((success) => {
    //         console.log('CookieManager.clearAll =>', success);
    //     });
    // navigation.navigate('LoginScreen' as never);
    //     CookieManager.get("https://v16.erpviet.vn")
    //         .then((cookies) => {
    //             // if (isCheckedLog) {
    //             //     setIsChecked(!isChecked);
    //             //     setCookiesSussces(cookies?.session_id?.value);
    //             //     setIsCheckedCookies(true);
    //             // }
    //             if (cookies === undefined || !cookies) {
    //                 navigation.navigate('LoginScreen' as never);
    //                 logout();
    //             }
    //         })
    //         .catch((error) => {
    //             console.log('Error fetching cookies:', error);
    //         });
    // }, [checkCookie]);
    // useEffect(() => {
    //     logout();
    // }, []);

    return (
        <View style={styles.container}>
            <WebView
                // ref={webViewRef}
                source={{
                    uri: urlWebView,
                    headers: {
                        Cookie: `session_id=${session_id}`,
                    },
                }}
                sharedCookiesEnabled={true}
                javaScriptEnabled={true}
                injectedJavaScript={injectScript}
                style={{ height: '100%', width: '100%' }}
                renderLoading={() => <ActivityIndicator />}
                cacheEnabled={false}
                cacheMode="LOAD_NO_CACHE"
                domStorageEnabled={true}
                onLoadEnd={(webViewState) => {
                    setCheckCookie(false);
                }}
                startInLoadingState={true}
                thirdPartyCookiesEnabled={true}
                mixedContentMode="always"
                allowsBackForwardNavigationGestures={false}
                allowsLinkPreview={false}
                incognito={true}
                onMessage={event => {
                    console.log("???zz???", event?.nativeEvent?.url);
                    if (event?.nativeEvent?.url.includes("login")) {
                        console.log("Chuỗi chứa từ 'login'");
                        CookieManager.clearAll()
                            .then((success) => {
                                console.log('CookieManager.clearAll =>', success);
                            });
                        setTimeout(() => {
                            logout();
                        }, 500);
                        navigation.goBack();

                    } else {
                        console.log("Chuỗi không chứa từ 'login'");
                    }
                    // const message = event.nativeEvent.data; // Thông điệp từ trang web
                    // if (message === 'logoutClicked') {
                    //    
                    //     // logout();
                    // }
                }}
            />
        </View>
    );
};


export default WebViewErpViet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});