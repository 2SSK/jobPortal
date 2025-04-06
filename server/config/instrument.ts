// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://649ba2e32780b190e61c2401fb7a5293@o4509101500858368.ingest.us.sentry.io/4509101541031936",
  integrations: [nodeProfilingIntegration(), Sentry.mongooseIntegration()],
  // Tracing
  // tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is evaluated only once per SDK.init call
  profileSessionSampleRate: 1.0,
  // Trace lifecycle automatically enables profiling during active traces
  profileLifecycle: "trace",
});

// Profiling happens automatically after setting it up with `Sentry.init()`.
// All spans (unless those discarded by sampling) will have profiling data attached to them.
Sentry.startSpan(
  {
    name: "My Span",
  },
  () => {
    // The code executed here will be profiled
  },
);
