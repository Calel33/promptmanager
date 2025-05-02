import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import '../styles/globals.css';

// Where CopilotKit will proxy requests to. If you're using Copilot Cloud, this environment variable will be empty.
const runtimeUrl = process.env.NEXT_PUBLIC_COPILOTKIT_RUNTIME_URL;
// When using Copilot Cloud, all we need is the publicApiKey.
const publicApiKey = process.env.NEXT_PUBLIC_COPILOT_API_KEY;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CopilotKit
      runtimeUrl={runtimeUrl}
      publicApiKey={publicApiKey}
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </CopilotKit>
  );
}

export default MyApp; 