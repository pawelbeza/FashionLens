package com.clothes_detector_mobile.tflite;

import android.content.res.AssetManager;

import java.io.IOException;

public class DetectorFactory {
    public static YoloV5Classifier getDetector(
            final AssetManager assetManager,
            final String modelFilename)
            throws IOException {
        String labelFilename = "file:///android_asset/coco.txt";
        int inputSize = 640;;

        return YoloV5Classifier.create(assetManager, modelFilename, labelFilename, false,
                inputSize);
    }

}
