import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconAntDesign } from '../../styles/IconHelper';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import InputCustom from '../../components/Form/InputCustom';
import TouchableOpacityConfirm from '../../components/Form/TouchableOpacityConfirm';
import { Image } from 'react-native';
import { REQUIREIMG } from '../../utils/RequireImage';
import { useAuth } from '../../context/AuthProvider';
import { Picker } from '@react-native-picker/picker';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { serviceRegister } from '../../configs/auth/ServiceRegister';
import ModalLoading from '../../components/Modal/ModalLoading';

type Props = {};
const fieldOfActivity = [
    { label: 'Bán lẻ', value: 'Bán lẻ' },
    { label: 'Nhà hàng (F&B)', value: 'Nhà hàng (F&B)' },
    { label: 'Dược Phẩm', value: 'Dược Phẩm' },
    { label: 'Thương mại', value: 'Thương mại' },
    { label: 'Sản xuất', value: 'Sản xuất' },
    { label: 'Dịch vụ', value: 'Dịch vụ' },
    { label: 'Spa', value: 'Spa' },
    { label: 'Khác', value: 'Khác' },
    { label: 'Lĩnh vực hoạt động', value: 'default' },

    // Thêm các phần tử khác vào đây
];
const enterpriseSize = [

    { label: 'Ít hơn 25 nhân sự', value: 'Ít hơn 25 nhân sự' },
    { label: 'Từ 25 - 50 nhân sự', value: 'Từ 25 - 50 nhân sự' },
    { label: 'Từ 50 - 100 nhân sự', value: 'Từ 50 - 100 nhân sự' },
    { label: 'Trên 100 nhân sự', value: 'Trên 100 nhân sự' },
    { label: 'Quy mô doanh nghiệp', value: 'default' },

];
const RegisterScreen = (props: Props) => {
    const navigation = useNavigation();
    const [errors, setErrors] = useState<string | any>({});
    const [visibleLogins, setVisibleLogins] = useState<boolean>(false);
    const { isAuthenticated, logout, login }: any = useAuth();
    const [inputs, setInputs] = useState<string | any>({
        inputCompany: "",
        // inputFieldOfActivity: "",
        // inputEnterpriseSize: "",
        inputContact: "",
        inputTitle: "",
        inputEmail: "",
        inputNumber: "",
        inputWebsite: "",
        inputNotes: "",
    });
    const [inputFieldOfActivity, setInputFieldOfActivity] = useState('default'); // Giá trị ban đầu
    const [inputEnterpriseSize, setInputEnterpriseSize] = useState('default'); // Giá trị ban đầu
    const [isVisibleActivity, setIsVisibleActivity] = useState<boolean>(false); // Giá trị ban đầu
    const [errorActivity, setErrorActivity] = useState<string>('default'); // Giá trị ban đầu
    const [isVisibleSize, setIsVisibleSize] = useState<boolean>(false); // Giá trị ban đầu
    const [errorSize, setErrorSize] = useState<string>('default'); // Giá trị ban đầu
    const access_token = "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0";
    const handleOnchange = (text: any, input: any) => {
        setInputs((prevState: any) => ({ ...prevState, [input]: text }));
    };
    const handleError = (error: any, input: any) => {
        setErrors((prevState: any) => ({ ...prevState, [input]: error }));

    };
    useEffect(() => {
        login();
    }, []);
    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.inputCompany) {
            handleError('Vui lòng nhập tên công ty', 'inputCompany');
            isValid = false;
        }
        if (inputFieldOfActivity === "default") {
            // handleError('Vui lòng nhập lĩnh vực hoạt động', 'inputFieldOfActivity');
            setErrorActivity('Vui lòng nhập lĩnh vực hoạt động');
            setIsVisibleActivity(true);
            isValid = false;
        }
        if (inputEnterpriseSize === "default") {
            // handleError('Vui lòng nhập quy mô doanh nghiệp', 'inputEnterpriseSize');
            setErrorSize('Vui lòng nhập quy mô doanh nghiệp');
            setIsVisibleSize(true);
            isValid = false;
        }
        if (!inputs.inputContact) {
            handleError('Vui lòng nhập tên người liên hệ', 'inputContact');
            isValid = false;
        }
        if (!inputs.inputTitle) {
            handleError('Vui lòng nhập chức danh', 'inputTitle');
            isValid = false;
        }
        if (!inputs.inputEmail) {
            handleError('Vui lòng nhập email', 'inputEmail');
            isValid = false;
        }
        if (!inputs.inputNumber) {
            handleError('Vui lòng nhập số điện thoại', 'inputNumber');
            isValid = false;
        }
        // if (!inputs.inputWebsite) {
        //     handleError('Vui lòng nhập tên đăng nhập', 'inputWebsite');
        //     isValid = false;
        // }
        if (!inputs.inputNotes) {
            handleError('Vui lòng nhập nội dung yêu cầu', 'inputNotes');
            isValid = false;
        }
        if (isValid) {
            setVisibleLogins(true);
            handleLogin();
        };
    };
    const handleLogin = () => {
        const bodyData = {
            token: access_token,
            lang: "vi_VN",
            phone: inputs?.inputNumber,
            email: inputs?.inputEmail,
            web: inputs?.inputWebsite,
            number_of_employees: inputEnterpriseSize,
            business: inputFieldOfActivity,
            domain_name: "",
            company: inputs?.inputCompany,
            contact: inputs?.inputContact,
            cooperation_partner: "AB",
            country_state_id: null,
            partner_industry_id: null,
            partner_job_id: null,
            service_code: "S01",
            vat: "a12313",
            description: inputs?.inputNotes,
        };
        try {
            serviceRegister(bodyData)
                .then((response) => {
                    if (response.data?.message === "Success") {
                        Alert.alert("Thông báo", "Đăng ký thành công");
                        setTimeout(() => {
                            handleBack();
                        }, 1500);
                    }
                    setVisibleLogins(false);
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert("Thông báo", error.message);
                    setVisibleLogins(false);
                });
        } catch (error: any) {
            Alert.alert("Thông báo", error.message);
            setVisibleLogins(false);
        }


    };
    const handleBack = () => {
        navigation.goBack();
    };
    return (
        <SafeAreaView style={styles.styleContainer}>
            {/* <View style={styles.styleHeader}>
                <IconAntDesign
                    onPress={handleBack}
                    name='arrowleft'
                    style={{
                        color: colors.WHITE,
                        fontSize: 22,
                        marginRight: 10,
                        padding: 12,
                    }}
                />
                <Text style={styles.styleTextHeader}>Đăng ký tài khoản</Text>
            </View> */}
            <ScrollView style={styles.styleBodys}>
                <View style={styles.styleViewLogo}>
                    <Image
                        source={REQUIREIMG.img_logo_erp_viet}
                        style={styles.styleLogo}
                        resizeMode='contain'
                    />
                </View>
                <View style={styles.styleViewForm}>
                    <InputCustom
                        onChangeText={(text: any) => handleOnchange(text, 'inputCompany')}
                        onFocus={() => handleError(null, 'inputCompany')}
                        iconName="account-group-outline"
                        label={null}
                        placeholder="Tên công ty *"
                        error={errors?.inputCompany}
                        valueText={inputs?.inputCompany}
                    />
                    <View style={styles.styleSlected}>
                        <Picker
                            onFocus={() => setIsVisibleActivity(false)}
                            selectedValue={inputFieldOfActivity}
                            onValueChange={(itemValue) => setInputFieldOfActivity(itemValue)}
                        >
                            {fieldOfActivity.map((item) => (
                                <Picker.Item key={item.value} label={item.label} value={item.value} />
                            ))}
                        </Picker>
                    </View>
                    {isVisibleActivity && <Text style={{ paddingHorizontal: 6, marginTop: 6, color: colors.WHITE, fontSize: 12 }}>{errorActivity}</Text>}

                    {/* <InputCustom
                        onChangeText={(text: any) => handleOnchange(text, 'inputFieldOfActivity')}
                        onFocus={() => handleError(null, 'inputFieldOfActivity')}
                        iconName="apache-kafka"
                        label={null}
                        placeholder="Lĩnh vực hoạt động *"
                        error={errors?.inputFieldOfActivity}
                        valueText={inputs?.inputFieldOfActivity}
                    /> */}
                    {/* <InputCustom
                        onChangeText={(text: any) => handleOnchange(text, 'inputEnterpriseSize')}
                        onFocus={() => handleError(null, 'inputEnterpriseSize')}
                        iconName="animation-outline"
                        label={null}
                        placeholder="Quy mô doanh nghiệp *"
                        error={errors?.inputEnterpriseSize}
                        valueText={inputs?.inputEnterpriseSize}
                    /> */}
                    <View style={styles.styleSlected}>
                        <Picker
                            onFocus={() => setIsVisibleSize(false)}

                            selectedValue={inputEnterpriseSize}
                            onValueChange={(itemValue) => setInputEnterpriseSize(itemValue)}
                        >
                            {enterpriseSize.map((item) => (
                                <Picker.Item key={item.value} label={item.label} value={item.value} />
                            ))}
                        </Picker>
                    </View>
                    {isVisibleSize && <Text style={{ paddingHorizontal: 6, marginTop: 6, color: colors.WHITE, fontSize: 12 }}>{errorSize}</Text>
                    }
                    <InputCustom
                        onChangeText={(text: any) => handleOnchange(text, 'inputContact')}
                        onFocus={() => handleError(null, 'inputContact')}
                        iconName="account-settings-outline"
                        label={null}
                        placeholder="Người liên hệ *"
                        error={errors?.inputContact}
                        valueText={inputs?.inputContact}
                    />
                    <InputCustom
                        onChangeText={(text: any) => handleOnchange(text, 'inputTitle')}
                        onFocus={() => handleError(null, 'inputTitle')}
                        iconName="account-settings-outline"
                        label={null}
                        placeholder="Chức danh *"
                        error={errors?.inputTitle}
                        valueText={inputs?.inputTitle}
                    />
                    <InputCustom
                        onChangeText={(text: any) => handleOnchange(text, 'inputEmail')}
                        onFocus={() => handleError(null, 'inputEmail')}
                        iconName="email-check-outline"
                        label={null}
                        placeholder="Email *"
                        error={errors?.inputEmail}
                        valueText={inputs?.inputEmail}
                    />
                    <InputCustom
                        onChangeText={(text: any) => handleOnchange(text, 'inputNumber')}
                        onFocus={() => handleError(null, 'inputNumber')}
                        iconName="card-account-phone-outline"
                        label={null}
                        placeholder="Số điện thoại *"
                        error={errors?.inputNumber}
                        valueText={inputs?.inputNumber}
                    />
                    <InputCustom
                        onChangeText={(text: any) => handleOnchange(text, 'inputWebsite')}
                        onFocus={() => handleError(null, 'inputWebsite')}
                        iconName="web"
                        label={null}
                        placeholder="Website"
                        error={errors?.inputWebsite}
                        valueText={inputs?.inputWebsite}
                    />
                    <InputCustom
                        onChangeText={(text: any) => handleOnchange(text, 'inputNotes')}
                        onFocus={() => handleError(null, 'inputNotes')}
                        iconName="microsoft-onenote"
                        label={null}
                        placeholder="Nội dung yêu cầu"
                        error={errors?.inputNotes}
                        valueText={inputs?.inputNotes}
                    />

                    <View style={styles.styleButton}>
                        <TouchableOpacityConfirm
                            textInput="Đăng ký"
                            onPress={validate}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleBack}
                        style={styles.styleRegister} >
                        <Text style={styles.styleRegisterText}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ModalLoading
                visible={visibleLogins}
            />
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    styleContainer: {
        flex: 1
    },
    styleHeader: {
        height: 58,
        flexDirection: "row",
        backgroundColor: colors.VIOLETS_HEADER,
        alignItems: "center",
        // justifyContent :"center"

    },
    styleBodys: {
        flex: 1,
        backgroundColor: colors.VIOLETS
    },
    styleTextHeader: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.WHITE,
    },
    styleViewForm: {
        flex: 8,
        marginHorizontal: 10,
        paddingBottom: 24
    },
    styleButton: {
        marginVertical: 24
    },
    styleRegister: {
        justifyContent: "center",
        alignItems: "center",
    },
    styleRegisterText: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.WHITE
    },
    styleViewLogo: {
        height: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    styleLogo: {
        width: '100%',
        height: 68
    },
    styleSlected: {
        height: 48,
        backgroundColor: colors.WHITE,
        // flexDirection: 'row',
        marginTop: 15,
        borderWidth: 0.5,
        borderRadius: 6,
        justifyContent: "center",
    }
});