package com.watchapp;

import android.app.Activity;
import android.text.TextUtils;
import android.content.Intent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;

/**
 * 原生Activity与React交互——模块
 */
 
public class MyIntentModule extends ReactContextBaseJavaModule {
 
    public MyIntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
 
    @Override
    public String getName() {
        return "IntentMoudle";
    }
    //注意：记住getName方法中的命名名称，JS中调用需要
 
    @ReactMethod
    public void startActivityFromJS(String name, String params){
        try{
            Activity currentActivity = getCurrentActivity();
            if(null!=currentActivity){
                Class toActivity = Class.forName(name);
                Intent intent = new Intent(currentActivity,toActivity);
                intent.putExtra("params", params);
                currentActivity.startActivity(intent);
            }
        }catch(Exception e){
            throw new JSApplicationIllegalArgumentException(
                    "不能打开Activity : "+e.getMessage());
        }
    }
 
    @ReactMethod
    public void dataToJS(Callback successBack, Callback errorBack){
        try{
            Activity currentActivity = getCurrentActivity();
            String result = currentActivity.getIntent().getStringExtra("data");
            if (TextUtils.isEmpty(result)){
                result = "没有数据";
            }
            successBack.invoke(result);
        }catch (Exception e){
            errorBack.invoke(e.getMessage());
        }
    }
//注意：startActivityFromJS、dataToJS方法添加RN注解(@ReactMethod)，否则该方法将不被添加到RN中
}