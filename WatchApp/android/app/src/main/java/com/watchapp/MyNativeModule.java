package com.watchapp;

import android.content.Context;
import android.content.Intent;
import android.os.PowerManager;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.widget.Toast;
import android.content.ContextWrapper;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import android.telephony.TelephonyManager;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.provider.Settings;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by Administrator on 2016/10/18.
 */
public class MyNativeModule extends ReactContextBaseJavaModule {
    private Context mContext;
    private LocationManager locationManager;
    PowerManager pm;
    PowerManager.WakeLock wakeLock;
    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }
    @Override
    public String getName() {

        //返回的这个名字是必须的，在rn代码中需要这个名字来调用该类的方法。
        return "MyNativeModule";
    }
    //函数不能有返回值，因为被调用的原生代码是异步的，原生代码执行结束之后只能通过回调函数或者发送信息给rn那边。
    @ReactMethod
    public void rnCallNative(String msg){
        Toast.makeText(mContext,msg,Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void getBattery(Callback callback)
    {
        BatteryManager manager = (BatteryManager) getReactApplicationContext().getSystemService(Context.BATTERY_SERVICE);

        int battery=  manager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);///当前电量百分比

        callback.invoke(battery);
        //manager.getIntProperty(BatteryManager.BATTERY_PROPERTY_STATUS);///充电状态
    }
    @ReactMethod
    public void getBattery2(Callback callback)
    {
        Intent intent = new ContextWrapper(getReactApplicationContext()).
        registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
        int battery= (intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) * 100) /
        intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);

        callback.invoke(battery);
        //manager.getIntProperty(BatteryManager.BATTERY_PROPERTY_STATUS);///充电状态
    }

    @ReactMethod
    public void setDateTime(int year, int month, int day, int hour, int minute)
    {
        try{
            SystemDateTime.setDateTime(year,month,day,hour,minute);
        }catch(Exception ex){

        }
    }
    @ReactMethod
    public void getImei(Callback callback)
    {
       String imei=MobileInfoUtil.getIMEI(mContext);
        callback.invoke(imei);

    }

    @ReactMethod
    public  void getLocation(Callback callback)
    {

        locationManager = (LocationManager) getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);
        //获取所有可用的位置提供器
        List<String> providers = locationManager.getProviders(true);
        String locationProvider = null;
        if (providers.contains(LocationManager.GPS_PROVIDER)) {
            //如果是GPS
            locationProvider = LocationManager.GPS_PROVIDER;
        } else if (providers.contains(LocationManager.NETWORK_PROVIDER)) {
            //如果是Network
            locationProvider = LocationManager.NETWORK_PROVIDER;
        }
        Location location = locationManager.getLastKnownLocation(locationProvider);
        //https://blog.csdn.net/qq_16064871/article/details/72836027
        String latlng="Lat="+location.getLatitude()+"&Lng="+location.getLongitude();
        callback.invoke(latlng);
    }


}