package com.watchapp;


import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import  android.widget.RelativeLayout;
import android.widget.TextView;
import android.content.Intent;
import androidx.annotation.Nullable;

/**
 * 
 * https://blog.csdn.net/csdn_aiyang/article/details/78397409
 */

public class MyActivity extends Activity{



    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(createView());
        Intent intent1=new Intent();
                intent1.setAction("android.intent.action.CHS_Broad_BroadcastReceiver");
                intent1.putExtra("msg", "哈哈哈");
                sendBroadcast(intent1);
    }

    private View createView() {
        LinearLayout ll= new LinearLayout(this);
        ll.setGravity(Gravity.CENTER);
        ll.setLayoutParams(new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        // 设置文字
        TextView mTextView = new TextView(this);
        mTextView.setText("hello world");
        LinearLayout.LayoutParams mLayoutParams = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        // 在父类布局中添加它，及布局样式
        ll.addView(mTextView, mLayoutParams);
        return ll;
    }
}