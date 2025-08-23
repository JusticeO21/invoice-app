import { Component, ErrorInfo, ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";
import { Heading } from "../heading/Heading";
import { Text } from "../text/Text";
import Button from "../button/Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className={styles.errorBoundary} role="alert">
          <div className={styles.content}>
            <div className={styles.icon} aria-hidden="true">
              ⚠️
            </div>
            <Heading className={styles.title}>
              Oops! Something went wrong
            </Heading>
            <Text className={styles.description}>
              We're sorry, but something unexpected happened. Please try refreshing the page or go back to the homepage.
            </Text>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className={styles.errorDetails}>
                <summary>Error Details (Development Only)</summary>
                <pre className={styles.errorStack}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className={styles.actions}>
              <Button 
                onClick={this.handleReload}
                variant="primary"
                aria-label="Reload the page"
              >
                Reload Page
              </Button>
              <Button 
                onClick={this.handleGoHome}
                variant="secondary"
                aria-label="Go to homepage"
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
