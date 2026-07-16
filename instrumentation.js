// Require the OpenTelemetry packages specified in the requirements
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

// 1. Configure the Jaeger Exporter
const jaegerExporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces', // Exact endpoint from the PDF
});

// 2. Initialize the OpenTelemetry SDK
const sdk = new NodeSDK({
  serviceName: 'my-tracing-service', // You can change this to match your app's name (e.g., 'orders-service')
  traceExporter: jaegerExporter,
  instrumentations: [
    // This automatically instruments HTTP requests, Express, etc.
    getNodeAutoInstrumentations()
  ],
});

// 3. Start the SDK and log successful initialization
sdk.start();
console.log('OpenTelemetry initialized and Jaeger Exporter configured.');

// (Optional but recommended) Gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK terminated'))
    .catch((error) => console.error('Error terminating OpenTelemetry SDK', error))
    .finally(() => process.exit(0));
});