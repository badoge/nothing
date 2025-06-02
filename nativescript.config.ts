import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.alienpls.nothing',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  version: '1.0.0', 
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;