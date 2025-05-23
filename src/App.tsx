import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Prediction } from './pages/Prediction';
import { Results } from './pages/Results';

// Simple router for the app
type Route = 'home' | 'prediction' | 'results';

function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [predictionData, setPredictionData] = useState<any>(null);

  // Navigation functions
  const navigateTo = (route: Route) => setCurrentRoute(route);
  
  // Render the current page based on route
  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <Home onStart={() => navigateTo('prediction')} />;
      case 'prediction':
        return (
          <Prediction 
            onComplete={(data) => {
              setPredictionData(data);
              navigateTo('results');
            }} 
          />
        );
      case 'results':
        return (
          <Results 
            predictionData={predictionData} 
            onReset={() => {
              setPredictionData(null);
              navigateTo('home');
            }}
          />
        );
      default:
        return <Home onStart={() => navigateTo('prediction')} />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

export default App;