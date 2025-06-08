import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';

const Dashboard: React.FC = () => {
  const fullText = "Welcome to the Pokemon Dashboard!";
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 30 : 80;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(fullText.substring(0, index + 1));
        setIndex(prev => prev + 1);
        if (index === fullText.length) {
          setIsDeleting(true);
        }
      } else {
        setText(fullText.substring(0, index - 1));
        setIndex(prev => prev - 1);
        if (index === 0) {
          setIsDeleting(false);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      <Navbar />
      
      <div className="flex justify-center flex-col items-center w-screen h-screen">
        <h1 className="text-3xl font-bold text-gray-700 h-12">{text}</h1>

        {/* Statistic and Inventory Cards */}
        <div className="flex flex-row mt-10 gap-6">
          <a href="/dashboard/inventory" className="bg-white shadow-lg rounded-xl p-8 text-center border-red-500 hover:scale-105 transition-transform w-64">
            <h2 className="text-2xl font-bold mb-2 text-red-500 hover:text-red-600">Inventory</h2>
            <p className="text-gray-500">Manage your Pokemon inventory</p>
          </a>
          <a href="/dashboard/statistic" className="bg-white shadow-lg rounded-xl p-8 text-center border-blue-400 hover:scale-105 transition-transform w-64">
            <h2 className="text-2xl font-bold mb-2 text-red-500 hover:text-red-600">Statistic</h2>
            <p className="text-gray-500">View Pokemon Table and charts</p>
          </a>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
