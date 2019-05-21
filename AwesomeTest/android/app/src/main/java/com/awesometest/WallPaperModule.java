package com.awesometest;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
//import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;


import android.app.WallpaperManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.DisplayMetrics;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import com.awesometest.Utils;

public class WallPaperModule extends ReactContextBaseJavaModule {

    private WallpaperManager wallpaperManager;
    private DisplayMetrics metrics = null;
    private ReactApplicationContext context;

    public WallPaperModule(ReactApplicationContext reactContext){
        super(reactContext);
        context = reactContext;
        wallpaperManager = WallpaperManager.getInstance(reactContext);
        
    }

    @Override
    public String getName() {
        return "WallPaperModlue";
    }

    @ReactMethod
    public void setWallPaper(
            String imgUrl,
            int width, 
            int height,
            Callback successCallback,
            Callback errorCallback) {
    //   自定义封装的设置壁纸方法
        metrics =  Utils.setWallpaperManagerFitScreen(context, width, height);
        Bitmap bitmap = returnBitMap(imgUrl);
        try{
            wallpaperManager.setBitmap(bitmap);
            successCallback.invoke();
            // promise.resolve(wallpaperManager);
        }catch(Exception e){
            e.printStackTrace();
            errorCallback.invoke(e);
            // promise.reject(e);
        }
    }

    /*
    *    get image from network
    *    @param [String]imageURL
    *    @return [BitMap]image
    */
    private Bitmap returnBitMap(String url){
        URL myFileUrl = null;
        Bitmap bitmap = null;
        try {
            myFileUrl = new URL(url);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        try {
            HttpURLConnection conn = (HttpURLConnection) myFileUrl.openConnection();
            conn.setDoInput(true);
            conn.connect();
            InputStream is = conn.getInputStream();
            bitmap = BitmapFactory.decodeStream(is);
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Bitmap wallpaper = Utils.centerCrop(bitmap, metrics);
        return wallpaper;
    }



}