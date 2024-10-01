import React, { useState } from 'react';

// Example components
const DefaultComponent = () => <div>Default Component</div>;
const AnotherComponent = () => <div>Another Component</div>;
const ThirdComponent = () => <div>Third Component</div>;

const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <button onClick={() => onSelect('default')}>Default</button>
      <button onClick={() => onSelect('another')}>Another</button>
      <button onClick={() => onSelect('third')}>Third</button>
    </div>
  );
};

const MainComponent = () => {
  const [activeComponent, setActiveComponent] = useState('default'); // Set default component

  const renderComponent = () => {
    switch (activeComponent) {
      case 'default':
        return <DefaultComponent />;
      case 'another':
        return <AnotherComponent />;
      case 'third':
        return <ThirdComponent />;
      default:
        return <DefaultComponent />;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={setActiveComponent} />
      <div className="main-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default MainComponent;
