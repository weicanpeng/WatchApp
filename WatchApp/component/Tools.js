import Storage from './DeviceStorage';
import { NativeModules, PermissionsAndroid } from 'react-native';

export default class Tools {

    static async getImeiFromHardware(item) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
        return new Promise(function (resolve, reject) {
            NativeModules.MyNativeModule.getImei((result) => {
               // alert("imei=" + result)
                Storage.save('imei', { imei: result });

                if (item) {
                    item.imei = result;
                    resolve(item);
                } else {
                    resolve(result);
                }

            });
        });
    }


    static triggerLocationEventPromise(item) {
        alert("trigger"+item.imei);
        alert(item.token);
        return new Promise(function (resolve, reject) {
            fetch('https://api.healthjay.com/eventTriggers/location', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + item.token
                },
                body: JSON.stringify({
                    deviceId: item.imei,
                    latitude: "22.3",
                    longitude: '114.3'
                })
            }).then((response) => response.json()).then(res => {
                 alert(res);
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        });
    }


    static auth(imei) {

        return new Promise(function (resolve, reject) {
            fetch('https://api.healthjay.com/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // hardwareId: imei,
                    email: "weicanpeng@126.com",
                    password: '123456'
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.message = "Auth success") {

                        resolve(responseJson);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    resolve(JSON.stringify(error));
                });
        });

    }

}
