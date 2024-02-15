// pages/index.tsx
import React from 'react';
import SubscriptionForm from './components/SubscriptionForm';


const Home: React.FC = () => {
  return (
    <div>
      <h1>My Blog</h1>
      <SubscriptionForm />
    </div>
  );
};

export default Home;
