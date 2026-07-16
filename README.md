# Distributed Tracing with OpenTelemetry & Jaeger

This project demonstrates distributed tracing in a Node.js microservice using OpenTelemetry and Jaeger.

## How to run the stack and generate traces:

1. **Start Jaeger:**
   Run the following command to start the Jaeger all-in-one container:
   `docker-compose up -d`

2. **Install Dependencies:**
   Ensure you have the required npm packages installed:
   `npm install express @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-jaeger`

3. **Start the Node.js Server:**
   Start the application and inject the OpenTelemetry instrumentation:
   `node --require ./instrumentation.js index.js`

4. **Generate Traces:**
   Open your browser and visit: `http://localhost:3000/complex-operation`
   Refresh the page a few times to generate trace data.

5. **View Traces:**
   Navigate to the Jaeger UI at `http://localhost:16686`. Select the service and click "Find Traces" to see the nested manual spans.