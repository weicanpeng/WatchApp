package com.myreactdemo;


import android.app.Activity;
import android.content.Context;
import android.hardware.SerialManager;
import android.hardware.SerialPort;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.ParcelFileDescriptor;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.util.Log;
import android.widget.EditText;
import android.widget.TextView;
import android.os.Handler;
import java.nio.ByteBuffer;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Timer;
import java.util.TimerTask;
import android.os.SystemClock;

/**
 * (1条消息)Android Studio使用Android_Serialport_Api调试串口 - m0_38047321的博客 - CSDN博客  https://blog.csdn.net/m0_38047321/article/details/78833476
 * 将应用代码由eclipse导入Android studio的方法NDK-Build和Cmake两种方法（以android_serialport_api为例） - maogefff - 博客园  https://www.cnblogs.com/maogefff/p/7819880.html#_label1
 * http://www.codeforge.com/read/290570/AndroidManifest.xml__html
 */
public class SerialChat extends Activity implements Runnable, TextView.OnEditorActionListener {

    private static final String TAG = "SerialChat";

    private TextView mLog;
    private EditText mEditText;
    private ByteBuffer mInputBuffer;
    private ByteBuffer mOutputBuffer;
    private SerialManager mSerialManager;
    private SerialPort mSerialPort;
    private boolean mPermissionRequestPending;
	private static final long HEART_RATE_READ =  5* 1000;	
    private static final int MESSAGE_LOG = 1;
	private static String hexString_13 = "FE";
	private static String hexString_12 = "FD";
	private static String hexString_11 = "FC";
	private static String hexString_10 = "FA";
	private static String hexString_9 = "F9";
	private static String hexString_8 = "F8";
	private static String hexString_7 = "F7 00 00 00 00 00";
	private static String hexString_6 = "F6";
	private static String hexString_5 = "F5 00 00 00 00 00";
	private static String hexString_4 = "F4";
	private static String hexString_3 = "F3";// 读取版本号 
	private static String hexString_2 = "F20000000000";//8bits PPG 和 ECG 信号跟结果
	private static String hexString_1 = "F1";
	private static String hexString_0 = "00";// 读取 HRV 数据 
	private Handler mHandler_1 = new Handler();
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mSerialManager = (SerialManager)getSystemService(Context.SERIAL_SERVICE);
        setContentView(R.layout.serial_chat);
        mLog = (TextView)findViewById(R.id.log);
        mEditText = (EditText)findViewById(R.id.message);
        mEditText.setOnEditorActionListener(this);

        if (false) {
            mInputBuffer = ByteBuffer.allocateDirect(60);
            mOutputBuffer = ByteBuffer.allocateDirect(6);
        } else {
            mInputBuffer = ByteBuffer.allocate(60);
            mOutputBuffer = ByteBuffer.allocate(6);
        }
        
      //  TimerTask task = new TimerTask() {
       //// @Override
    	//	public void run() {	
    	////	}
       //   };
       // Timer timer = new Timer();
        //timer.schedule(task, 15000);
        mHandler.postDelayed(heartBeatRunnable, HEART_RATE_READ);
    }
    private long sendTime = 0L;
private Runnable heartBeatRunnable = new Runnable() {

        @Override
        public void run() {
			if (System.currentTimeMillis() - sendTime >= HEART_RATE_READ) {
			 	Log.e("SerialChat", "hexString_2 heartBeatRunnable");
				send_text(hexString_2);
				}
				mHandler_1.postDelayed(this, HEART_RATE_READ);
			}
    };
    @Override
    public void onResume() {
        super.onResume();

        String[] ports = mSerialManager.getSerialPorts();
        Log.e("SerialChat", "ports is ====" +  ports[0] );
        if (ports != null && ports.length > 0) {
            try {
				Log.e("SerialChat", "ports[0] is ====" +  ports[0] );
                mSerialPort = mSerialManager.openSerialPort(ports[0], 115200);
                if (mSerialPort != null) {
                    new Thread(this).start();
                }
            } catch (IOException e) {
            }
        }
		mHandler.removeCallbacks(heartBeatRunnable);
		mHandler.postDelayed(heartBeatRunnable, HEART_RATE_READ);
    }

    @Override
    public void onPause() {
        super.onPause();
    mHandler.removeCallbacks(heartBeatRunnable);
    }

    @Override
    public void onDestroy() {
		mHandler.removeCallbacks(heartBeatRunnable);
        if (mSerialPort != null) {
            try {
                mSerialPort.close();
            } catch (IOException e) {
            }
            mSerialPort = null;
        }
        super.onDestroy();
    }


  public  String decodeHexStr(int dataCoding, String hexStr) {
        String realStr = null;
        try {
            if (hexStr != null) {
                if (dataCoding == 15) {
                    realStr = new String(decodeHex(hexStr.toCharArray()), "ISO8859-1");
                } else if ((dataCoding & 0x0C) == 0x08) {
                    realStr = new String(decodeHex(hexStr.toCharArray()), "UnicodeBigUnmarked");
                } else {
                    realStr = new String(decodeHex(hexStr.toCharArray()), "ISO8859-1");
                }
            }
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        
        return realStr;
    }

    public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
		
        if (/* actionId == EditorInfo.IME_ACTION_DONE && */ mSerialPort != null) {
			
            try {
                String text = v.getText().toString();
                Log.d(TAG, "write: " + text);
				
                byte[] bytes = decodeHex(text.toCharArray());
                mOutputBuffer.clear();
                mOutputBuffer.put(bytes);
                mSerialPort.write(mOutputBuffer, bytes.length);
            } catch (IOException e) {
                Log.e(TAG, "write failed", e);
            }
            v.setText("");
            return true;
        }
        Log.d(TAG, "onEditorAction " + actionId + " event: " + event);
        return false;
    }

    public void run() {
        Log.d(TAG, "run");
        int ret = 0;
        int HR = 0;
        int BP_h = 0;
        int BP_l = 0;
         
        int head = 0;
        byte[] buffer = new byte[60];
        while (ret >= 0) {
            try {
                Log.d(TAG, "calling read");
                mInputBuffer.clear();
                ret = mSerialPort.read(mInputBuffer);
                Log.d(TAG, "read returned " + ret);
                mInputBuffer.get(buffer, 0, ret);
            } catch (IOException e) {
                Log.e(TAG, "read failed", e);
                break;
            }

            if (ret > 0) {
                Message m = Message.obtain(mHandler, MESSAGE_LOG);
				Log.d("gzl", "gzl mSerialPort recv: " + encodeHexStr(buffer));
				head=(int)buffer[0];
				
				if(head==(-14))
				{
					
					BP_h=(int)buffer[1];
					BP_l=(int)buffer[2];
					HR=(int)buffer[3];
					if((HR!=(-1))&&(HR<0))
					{
						HR=256+HR;
						}
					if((BP_h!=(-1))&&(BP_h<0))
					{
						BP_h=256+BP_h;
						}
						
					if((BP_l!=(-1))&&(BP_l<0))
					{
						BP_l=256+BP_l;
						}
					Log.d("gzl", "gzl mSerialPort BP_h: " + BP_h);
					Log.d("gzl", "gzl mSerialPort BP_l: " +BP_l);
					Log.d("gzl", "gzl mSerialPort HR: " + HR);
					//=-1 不需要显示
				}
				
                String text = new String(buffer, 0, ret);
                Log.d(TAG, "chat: " + text);
                m.obj = text;
                mHandler.sendMessage(m);
            }
        }
        Log.d(TAG, "thread out");
    }

   Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case MESSAGE_LOG:
                    mLog.setText(mLog.getText() + (String)msg.obj);
                    break;
             }
        }
    };

  
    /** 
     * 用于建立十六进制字符的输出的小写字符数组 
     */  
 
  
    /** 
     * 用于建立十六进制字符的输出的大写字符数组 
     */  
    private  final char[] DIGITS_LOWER = { '0', '1', '2', '3', '4', '5',  
            '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' }; 
    private  final char[] DIGITS_UPPER = { '0', '1', '2', '3', '4', '5',  
            '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };  
  
    /** 
     * 将字节数组转换为十六进制字符数组 
     *  
     * @param data 
     *            byte[] 
     * @return 十六进制char[] 
     */  
    public  char[] encodeHex(byte[] data) {  
        return encodeHex(data, true);  
    }  
  
    /** 
     * 将字节数组转换为十六进制字符数组 
     *  
     * @param data 
     *            byte[] 
     * @param toLowerCase 
     *            <code>true</code> 传换成小写格式 ， <code>false</code> 传换成大写格式 
     * @return 十六进制char[] 
     */  
    public  char[] encodeHex(byte[] data, boolean toLowerCase) {  
        return encodeHex(data, toLowerCase ? DIGITS_LOWER : DIGITS_UPPER);  
    }  
  
    /** 
     * 将字节数组转换为十六进制字符数组 
     *  
     * @param data 
     *            byte[] 
     * @param toDigits 
     *            用于控制输出的char[] 
     * @return 十六进制char[] 
     */  
    protected  char[] encodeHex(byte[] data, char[] toDigits) {  
        int l = data.length;  
        char[] out = new char[l << 1];  
        // two characters form the hex value.  
        for (int i = 0, j = 0; i < l; i++) {  
            out[j++] = toDigits[(0xF0 & data[i]) >>> 4];  
            out[j++] = toDigits[0x0F & data[i]];  
        }  
        return out;  
    }  
  
    /** 
     * 将字节数组转换为十六进制字符串 
     *  
     * @param data 
     *            byte[] 
     * @return 十六进制String 
     */  
    public  String encodeHexStr(byte[] data) {  
        return encodeHexStr(data, true);  
    }  
  
    /** 
     * 将字节数组转换为十六进制字符串 
     *  
     * @param data 
     *            byte[] 
     * @param toLowerCase 
     *            <code>true</code> 传换成小写格式 ， <code>false</code> 传换成大写格式 
     * @return 十六进制String 
     */  
    public  String encodeHexStr(byte[] data, boolean toLowerCase) {  
        return encodeHexStr(data, toLowerCase ? DIGITS_LOWER : DIGITS_UPPER);  
    }  
  
    /** 
     * 将字节数组转换为十六进制字符串 
     *  
     * @param data 
     *            byte[] 
     * @param toDigits 
     *            用于控制输出的char[] 
     * @return 十六进制String 
     */  
    protected  String encodeHexStr(byte[] data, char[] toDigits) {  
        return new String(encodeHex(data, toDigits));  
    }  
  
    /** 
     * 将十六进制字符数组转换为字节数组 
     *  
     * @param data 
     *            十六进制char[] 
     * @return byte[] 
     * @throws RuntimeException 
     *             如果源十六进制字符数组是一个奇怪的长度，将抛出运行时异常 
     */  
    public  byte[] decodeHex(char[] data) {  
  
        int len = data.length;  
  
        if ((len & 0x01) != 0) {  
            throw new RuntimeException("Odd number of characters.");  
        }  
  
        byte[] out = new byte[len >> 1];  
  
        // two characters form the hex value.  
        for (int i = 0, j = 0; j < len; i++) {  
            int f = toDigit(data[j], j) << 4;  
            j++;  
            f = f | toDigit(data[j], j);  
            j++;  
            out[i] = (byte) (f & 0xFF);  
        }  
  
        return out;  
    }  
  
    /** 
     * 将十六进制字符转换成一个整数 
     *  
     * @param ch 
     *            十六进制char 
     * @param index 
     *            十六进制字符在字符数组中的位置 
     * @return 一个整数 
     * @throws RuntimeException 
     *             当ch不是一个合法的十六进制字符时，抛出运行时异常 
     */  
    protected  int toDigit(char ch, int index) {  
        int digit = Character.digit(ch, 16);  
        if (digit == -1) {  
            throw new RuntimeException("Illegal hexadecimal character " + ch  
                    + " at index " + index);  
        }  
        return digit;  
    }  
  
 
  
  
    private void send_text(String text) {
		 if (/* actionId == EditorInfo.IME_ACTION_DONE && */ mSerialPort != null)
		 {
			 Log.e("SerialChat", "mSerialPort ok");
		 try {
	//	String text = "ttttt";
		//	byte[] bytes = text.getBytes();	
        	byte[] bytes = decodeHex(text.toCharArray());
        	mOutputBuffer.clear();	
			mOutputBuffer.put(bytes);
			mSerialPort.write(mOutputBuffer, bytes.length);
			
		} catch (IOException e) {
                Log.e("SerialChat", "mSerialPort fail");
            }
		}else{Log.e("SerialChat", "mSerialPort null");}
	sendTime = System.currentTimeMillis();	
	}
}
