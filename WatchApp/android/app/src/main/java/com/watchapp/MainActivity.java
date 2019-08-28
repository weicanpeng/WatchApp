package com.watchapp;

import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

     /**
      * 设置启动页
      */
      @Override
      protected void onCreate(Bundle savedInstanceState) {
         // SplashScreen.show(this);  // 展示启动页设置代码
         SplashScreen.show(this, R.style.SplashScreenTheme);
          super.onCreate(savedInstanceState);
      }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "WatchApp";
    }
}
