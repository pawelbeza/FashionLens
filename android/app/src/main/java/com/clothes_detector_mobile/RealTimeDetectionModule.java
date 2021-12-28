package com.clothes_detector_mobile;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.RectF;
import android.util.Log;

import androidx.annotation.NonNull;

import com.clothes_detector_mobile.env.Utils;
import com.clothes_detector_mobile.tflite.Classifier;
import com.clothes_detector_mobile.tflite.YoloV5Classifier;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;
import org.pytorch.rn.core.image.IImage;
import org.pytorch.rn.core.javascript.JSContext;

import java.io.IOException;
import java.util.List;

public class RealTimeDetectionModule extends ReactContextBaseJavaModule {
    YoloV5Classifier detector = null;
    Context context;

    RealTimeDetectionModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @NonNull
    @NotNull
    @Override
    public String getName() {
        return "RealTimeDetectionModule";
    }

    @ReactMethod
    public void createCalendarEvent(ReadableMap imageRef, Promise promise) throws IOException {
        Log.d("READABLE MAP", "SUCCESS " + imageRef.getString("ID"));
        IImage image = JSContext.unwrapObject(imageRef);
        Log.d("Image", "image width " + image.getHeight() + " image height " + image.getWidth());

        if (detector == null) {
            detector =
                    YoloV5Classifier.create(
                            context.getAssets(),
                            "yolov5s.tflite",
                            "file:///android_asset/clothes.txt",
                            false,
                            640);
        }

        Bitmap cropBitmap = Utils.processBitmap(image.getBitmap(), 640);

        final List<Classifier.Recognition> results = detector.recognizeImage(cropBitmap);

        for (Classifier.Recognition res : results) {
            Log.d("Result ", res.getTitle() + " " + res.getConfidence());
        }

        WritableArray array = new WritableNativeArray();
        for (Classifier.Recognition res : results) {
            WritableMap map = new WritableNativeMap();
            map.putDouble("left", res.getLocation().left);
            map.putDouble("top", res.getLocation().top);
            map.putDouble("right", res.getLocation().right);
            map.putDouble("bottom", res.getLocation().bottom);
            map.putDouble("confidence", res.getConfidence());
            map.putString("name", res.getTitle());

            array.pushMap(map);
        }

        promise.resolve(array);
    }
}
