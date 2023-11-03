package com.example.lab_6_34;

import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;

import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;

import android.content.pm.PackageManager;
import android.Manifest;
import androidx.core.app.ActivityCompat;

public class MainActivity extends FlutterActivity {
    private static final String CHANNEL_BATTERY = "samples.flutter.dev/battery";
    private static final String CHANNEL_LOCATION= "samples.flutter.dev/location";
    private static final String CHANNEL_DATA = "samples.flutter.dev/data";
    @Override
    public void configureFlutterEngine(FlutterEngine flutterEngine) {

        super.configureFlutterEngine(flutterEngine);

        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL_BATTERY)
                .setMethodCallHandler((call, result) -> {
                    if (call.method.equals("getBatteryLevel")) {
                        int batteryLevel = getBatteryLevel();
                        if (batteryLevel != -1) {
                            result.success(batteryLevel);
                        } else {
                            result.error("UNAVAILABLE", "Battery level not available.", null);
                        }
                    } else {
                        result.notImplemented();
                    }
                });

        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL_LOCATION)
                .setMethodCallHandler((call, result) -> {
                    if (call.method.equals("checkLocationPermission")) {
                        boolean hasPermission = checkLocationPermission();
                        result.success(hasPermission);
                    } else {
                        result.notImplemented();
                    }
                });

        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL_DATA)
                .setMethodCallHandler((call, result) -> {
                    if (call.method.equals("getData")) {
                        String data = getDataFromPlatform();
                        result.success(data);
                    } else if (call.method.equals("setData")) {
                        String data = call.arguments();
                        setDataToPlatform(data);
                        result.success(null);
                    } else {
                        result.notImplemented();
                    }
                });
    }

    private String getDataFromPlatform() {
        String data = "ilya";
        return data;
    }

    private void setDataToPlatform(String data) {
        // data treatment
    }

    private int getBatteryLevel() {
        int batteryLevel = -1;
        if (VERSION.SDK_INT >= VERSION_CODES.LOLLIPOP) {
            BatteryManager batteryManager = (BatteryManager) getSystemService(Context.BATTERY_SERVICE);
            batteryLevel = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);
        } else {
            Intent intent = registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
            int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
            int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
            if (level != -1 && scale != -1) {
                batteryLevel = (int) ((level / (float) scale) * 100);
            }
        }
        return batteryLevel;
    }

    private boolean checkLocationPermission() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
            return true;
        } else {
            return false;
        }
    }
}