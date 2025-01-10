import React, { useState } from 'react';

interface MealPlan {
  meal: string;
  ingredients: string;
  specialInstructions: string;
  pantryStaff: string;
  preparationStatus: string;
  deliveryStatus: string;
}

interface DietChartInfo {
  morning: MealPlan;
  evening: MealPlan;
  night: MealPlan;
}

const DietChart: React.FC = () => {
  const [dietChartInfo, setDietChartInfo] = useState<DietChartInfo>({
    morning: { meal: '', ingredients: '', specialInstructions: '', pantryStaff: '', preparationStatus: '', deliveryStatus: '' },
    evening: { meal: '', ingredients: '', specialInstructions: '', pantryStaff: '', preparationStatus: '', deliveryStatus: '' },
    night: { meal: '', ingredients: '', specialInstructions: '', pantryStaff: '', preparationStatus: '', deliveryStatus: '' },
  });

  const handleInputChange = (time: keyof DietChartInfo, field: keyof MealPlan, value: string) => {
    setDietChartInfo(prevState => ({
      ...prevState,
      [time]: {
        ...prevState[time],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Diet Chart Info:', dietChartInfo);
    // Here you would typically send this data to your backend
  };

  const renderMealPlan = (time: keyof DietChartInfo, icon: React.ReactNode, color: string) => (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden border-l-4 ${color} mb-6`}>
      <div className="bg-gray-100 px-4 py-3 border-b">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          {icon}
          <span className="ml-2">{time.charAt(0).toUpperCase() + time.slice(1)} Meal</span>
        </h3>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label htmlFor={`${time}-meal`} className="block text-sm font-medium text-gray-700">Meal</label>
          <input
            type="text"
            id={`${time}-meal`}
            value={dietChartInfo[time].meal}
            onChange={(e) => handleInputChange(time, 'meal', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor={`${time}-ingredients`} className="block text-sm font-medium text-gray-700">Ingredients</label>
          <textarea
            id={`${time}-ingredients`}
            value={dietChartInfo[time].ingredients}
            onChange={(e) => handleInputChange(time, 'ingredients', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
          />
        </div>
        <div>
          <label htmlFor={`${time}-instructions`} className="block text-sm font-medium text-gray-700">Special Instructions</label>
          <textarea
            id={`${time}-instructions`}
            value={dietChartInfo[time].specialInstructions}
            onChange={(e) => handleInputChange(time, 'specialInstructions', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
          />
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <div className="flex-grow">
            <label htmlFor={`${time}-pantry-staff`} className="block text-sm font-medium text-gray-700">Pantry Staff</label>
            <input
              type="text"
              id={`${time}-pantry-staff`}
              value={dietChartInfo[time].pantryStaff}
              onChange={(e) => handleInputChange(time, 'pantryStaff', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div className="flex-grow">
            <label htmlFor={`${time}-preparation-status`} className="block text-sm font-medium text-gray-700">Preparation Status</label>
            <select
              id={`${time}-preparation-status`}
              value={dietChartInfo[time].preparationStatus}
              onChange={(e) => handleInputChange(time, 'preparationStatus', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select status</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <div className="flex-grow">
            <label htmlFor={`${time}-delivery-status`} className="block text-sm font-medium text-gray-700">Delivery Status</label>
            <select
              id={`${time}-delivery-status`}
              value={dietChartInfo[time].deliveryStatus}
              onChange={(e) => handleInputChange(time, 'deliveryStatus', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderMealPlan('morning', 
        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>, 
        'border-yellow-400'
      )}
      {renderMealPlan('evening', 
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>, 
        'border-orange-400'
      )}
      {renderMealPlan('night', 
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>, 
        'border-blue-400'
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save Diet Chart
      </button>
    </form>
  );
};

export default DietChart;

