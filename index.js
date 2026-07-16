const express = require('express');
// Import the OpenTelemetry API to create manual spans
const { trace } = require('@opentelemetry/api');

const app = express();
const port = 3000;

// Initialize a tracer for our custom manual spans
const tracer = trace.getTracer('manual-instrumentation-tracer');

// --- Internal Function 1 ---
async function validateInput(query) {
    // Start a manual span using the pattern from the PDF
    const span = tracer.startSpan('validateInput');
    try {
        // Simulating a fast internal process (50ms)
        await new Promise(resolve => setTimeout(resolve, 50));
        return { valid: true };
    } finally {
        span.end(); // Always ensure the span is closed
    }
}

// --- Internal Function 2 ---
async function fetchDataFromCache(key) {
    const span = tracer.startSpan('fetchDataFromCache');
    try {
        // Simulating a database or cache lookup (150ms)
        await new Promise(resolve => setTimeout(resolve, 150));
        return { data: 'sample-data-for-' + key };
    } finally {
        span.end();
    }
}

// --- Internal Function 3 ---
async function computeHeavyResult(data) {
    const span = tracer.startSpan('computeHeavyResult');
    try {
        // Simulating heavy CPU work (200ms)
        await new Promise(resolve => setTimeout(resolve, 200));
        return 'SUCCESS_COMPUTED';
    } finally {
        span.end();
    }
}

// --- The Required Endpoint ---
app.get('/complex-operation', async (req, res) => {
    try {
        // Call the 3 internal functions sequentially
        const isValid = await validateInput(req.query);
        const data = await fetchDataFromCache('my-secret-key');
        const finalResult = await computeHeavyResult(data);

        // Send the final response
        res.status(200).json({
            message: "Complex operation completed",
            result: finalResult
        });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});