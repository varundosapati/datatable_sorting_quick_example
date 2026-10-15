import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // base: "./",
  plugins: [react()],
  build: {
    outDir:'dist'
  },

  test: {
    globals: true, // Makes Vitest APIs globally available like Jest
    environment: 'happy-dom', // Simulates browser environment
    setupFiles: './vitest.setup.js', // Optional: for global test setup
  },
  server: {
    host: '0.0.0.0', // This makes the server listen on all network interfaces
    port: 8080, // Optional: Specify a port, 8080 is the default
    allowedHosts: [
      'localhost', // Allowed by default, but good to include for clarity
      'fx-fcb-dashboardui-dev.apps.ocp.uat.svbank.com',
      'fx-fcb-dashboardui-uat.apps.ocp.uat.svbank.com',
     // 'fx-fcb-branchui-prod-dr.apps.ocpdr.corp.svbank.com',
      //'fx-fcb-branchui-prod.apps.ocp.corp.svbank.com'
    ],
    proxy: {
      '/PaymentValidationRules': {
        target: 'https://paymentsmetadata-paymentshub-qa.apps.ocp.uat.svbank.com',
        changeOrigin: true,
        secure: false,
        //rewite: (path) => path.replace(/^\/pvrmhost/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying:', req.url, '-> https://paymentsmetadata-paymentshub-qa.apps.ocp.uat.svbank.com');
          });
        }
      },
    }

  },
})
