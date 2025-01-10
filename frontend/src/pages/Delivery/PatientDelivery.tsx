import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePatients } from "@/api/patientApi";
import { getPatientMeals, updateMealStatus } from "@/api/mealApi";
import { useAuth } from "@/context/AuthContext";
// Interfaces
interface Patient {
  id: string;
  name: string;
  age: number;
  diseases: string;
  allergies: string;
  gender: string;
  contactInfo: string;
  roomNumber: string;
  bedNumber: string;
  floorNumber: number;
}

interface MealDetail {
  id: string;
  mealType: "Morning" | "Evening" | "Night";
  ingredients: string;
  instructions: string;
  preparationStatus: "Pending" | "InProgress" | "Completed";
  deliveryStatus: "Pending" | "Delivered";
  deliveryPersonnelId: string;
  deliveryPersonnel: {
    name: string;
  };
  pantryStaff: {
    name: string;
  };
  deliveredAt?: Date;
  deliveryNotes?: string;
}

interface StatusUpdateModalProps {
  meal: MealDetail;
  onClose: () => void;
  onUpdate: (mealId: string, statusData: any) => Promise<void>;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  meal,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    deliveryStatus: meal.deliveryStatus,
    deliveryNotes: meal.deliveryNotes || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const updateData = {
        ...formData,
        deliveredAt: formData.deliveryStatus === "Delivered" ? new Date() : undefined,
      };
      await onUpdate(meal.id, updateData);
      onClose();
    } catch (error) {
      setError("Failed to update delivery status");
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-blue-800">Update Delivery Status</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Status
            </label>
            <select
              name="deliveryStatus"
              value={formData.deliveryStatus}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={loading}
            >
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Notes
            </label>
            <textarea
              name="deliveryNotes"
              value={formData.deliveryNotes}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Add any delivery notes..."
              disabled={loading}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeliveryMealManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {user}  = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [meals, setMeals] = useState<MealDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState<MealDetail | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        
        // Fetch patient details
        const patientData = await getSinglePatients(id);
        setPatient(patientData);

        // Fetch meals
        const mealsData = await getPatientMeals(id);
        // Filter meals assigned to the current delivery personnel
        const assignedMeals = Object.values(mealsData).filter(
          (meal: any) => meal && meal.deliveryPersonnelId === user.id
        );
        setMeals(assignedMeals);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleStatusUpdate = async (mealId: string, statusData: any) => {
    try {
      const updatedMeal = await updateMealStatus(mealId, statusData);
      setMeals(prevMeals => 
        prevMeals.map(meal => 
          meal.id === mealId ? updatedMeal : meal
        )
      );
    } catch (error) {
      console.error("Error updating meal status:", error);
      throw error;
    }
  };

  const getStatusColor = (status: string): string => {
    return status === "Delivered" 
      ? "bg-green-100 text-green-800" 
      : "bg-yellow-100 text-yellow-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-blue-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl text-blue-800 mb-2">
              Meal Delivery Management
            </h1>
          </div>

          {/* Patient Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
            <div className="p-6 border-b border-blue-100">
              <h2 className="text-xl text-blue-800">Patient Information</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Name:</span> {patient?.name}
                </div>
                <div>
                  <span className="font-medium">Room:</span> {patient?.roomNumber}-{patient?.bedNumber}
                </div>
                <div>
                  <span className="font-medium">Floor:</span> {patient?.floorNumber}
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Allergies:</span> {patient?.allergies}
                </div>
                <div>
                  <span className="font-medium">Contact:</span> {patient?.contactInfo}
                </div>
              </div>
            </div>
          </div>

          {/* Meals Section */}
          <div className="space-y-6">
            {meals.length > 0 ? (
              meals.map((meal) => (
                <div key={meal.id} className="bg-white rounded-lg border border-blue-100 p-6">
                  <h3 className="text-xl text-blue-800 mb-4">{meal.mealType} Meal</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Delivery Information */}
                    <div>
                      <h4 className="text-lg font-medium text-blue-800 mb-4">
                        Delivery Information
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Delivery Status</span>
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(meal.deliveryStatus)}`}>
                              {meal.deliveryStatus}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Preparation Status</span>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              meal.preparationStatus === "Completed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {meal.preparationStatus}
                            </span>
                          </div>
                        </div>
                        {meal.deliveryNotes && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="font-medium text-gray-700 mb-2">
                              Delivery Notes
                            </div>
                            <p className="text-gray-600">{meal.deliveryNotes}</p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setSelectedMeal(meal);
                          setShowStatusModal(true);
                        }}
                        disabled={meal.preparationStatus !== "Completed"}
                        className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300"
                      >
                        Update Delivery Status
                      </button>
                    </div>

                    {/* Meal Details */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-medium text-gray-700 mb-2">
                          Meal Details
                        </div>
                        <p className="text-gray-600">{meal.instructions}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-medium text-gray-700 mb-2">
                          Prepared By
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-800 font-medium">
                              {meal.pantryStaff.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-gray-600">
                            {meal.pantryStaff.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-8">
                  <div className="text-center text-gray-500">
                    No meals are currently assigned to you for this patient
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Status Update Modal */}
      {showStatusModal && selectedMeal && (
        <StatusUpdateModal
          meal={selectedMeal}
          onClose={() => {
            setShowStatusModal(false);
            setSelectedMeal(null);
          }}
          onUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default DeliveryMealManagement;