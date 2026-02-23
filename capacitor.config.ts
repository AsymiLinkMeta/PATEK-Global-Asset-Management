import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.patekglobal.app',
  appName: 'Patek Global',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
