import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePatients } from "@/api/patientApi";
import {
  getPatientMeals,
  getAvailableDeliveryStaff,
  updateMealStatus,
} from "@/api/mealApi";
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
  emergencyContact: string;
  roomNumber: string;
  bedNumber: string;
  floorNumber: number;
  dietPlans: any[];
}

interface DeliveryStaff {
  id: string;
  name: string;
  contactInfo: string;
}

interface MealDetail {
  id: string;
  mealType: "Morning" | "Evening" | "Night";
  ingredients: string;
  instructions: string;
  preparationStatus: "Pending" | "InProgress" | "Completed";
  deliveryStatus: "Pending" | "Delivered";
  pantryStaffId: string;
  pantryStaff: {
    name: string;
  };
  deliveryPersonnelId?: string;
  deliveryPersonnel?: {
    name: string;
  };
  deliveredAt?: Date;
  deliveryNotes?: string;
}

interface MealTypeTabProps {
  type: "Morning" | "Evening" | "Night";
  hasExistingMeal: boolean;
  selectedMealType: "Morning" | "Evening" | "Night";
  onSelect: (type: "Morning" | "Evening" | "Night") => void;
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
  const [deliveryStaff, setDeliveryStaff] = useState<DeliveryStaff[]>([]);
  const [formData, setFormData] = useState({
    preparationStatus: meal.preparationStatus,
    deliveryStatus: meal.deliveryStatus,
    deliveryPersonnelId: meal.deliveryPersonnelId || "",
    deliveryNotes: meal.deliveryNotes || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliveryStaff = async () => {
      try {
        const staff = await getAvailableDeliveryStaff();
        setDeliveryStaff(staff);
      } catch (error) {
        setError("Failed to fetch delivery staff");
        console.error("Error fetching delivery staff:", error);
      }
    };

    fetchDeliveryStaff();
  }, []);

  const validateForm = () => {
    if (formData.deliveryStatus === "Delivered" && !formData.deliveryPersonnelId) {
      setError("Please assign a delivery staff member before marking as delivered");
      return false;
    }
    if (formData.deliveryStatus === "Delivered" && formData.preparationStatus !== "Completed") {
      setError("Meal must be completed before marking as delivered");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        ...formData,
        deliveredAt: formData.deliveryStatus === "Delivered" ? new Date() : undefined,
      };
      await onUpdate(meal.id, updateData);
      onClose();
    } catch (error) {
      setError("Failed to update meal status");
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
    setError(null); // Clear error when user makes changes
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-blue-800">Update Meal Status</h3>
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
              Preparation Status
            </label>
            <select
              name="preparationStatus"
              value={formData.preparationStatus}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={loading}
            >
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign Delivery Staff
            </label>
            <select
              name="deliveryPersonnelId"
              value={formData.deliveryPersonnelId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={loading}
            >
              <option value="">Select Delivery Staff</option>
              {deliveryStaff.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
            </select>
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

const PatientMealManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const pantryUserId = "67814cdbc17394c1a07baff8"; // Get this from your auth context or props
  const [patient, setPatient] = useState<Patient | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<"Morning" | "Evening" | "Night" | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [meals, setMeals] = useState<{ [key: string]: MealDetail | null }>({
    Morning: null,
    Evening: null,
    Night: null,
  });

  // Filter meals assigned to the current pantry user
  const getPantryAssignedMeals = (patientMeals: any) => {
    const filteredMeals = {
      Morning: patientMeals.morningMeal && patientMeals.morningMeal.pantryStaffId === pantryUserId 
        ? patientMeals.morningMeal 
        : null,
      Evening: patientMeals.eveningMeal && patientMeals.eveningMeal.pantryStaffId === pantryUserId 
        ? patientMeals.eveningMeal 
        : null,
      Night: patientMeals.nightMeal && patientMeals.nightMeal.pantryStaffId === pantryUserId 
        ? patientMeals.nightMeal 
        : null
    };

    return filteredMeals;
  };

  // Get available meal types (only those assigned to pantry user)
  const getAvailableMealTypes = () => {
    return Object.entries(meals)
      .filter(([_, meal]) => meal !== null && meal.pantryStaffId === pantryUserId)
      .map(([type]) => type as "Morning" | "Evening" | "Night");
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (!id) return;
        const data = await getSinglePatients(id);
        if (data) {
          const formattedPatient = {
            ...data,
            mealStatus: data.dietPlans.length > 0 ? "Assigned" : "Not Assigned",
          };
          setPatient(formattedPatient);
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    const fetchData = async () => {
      try {
        if (!id) return;
        const patientMeals = await getPatientMeals(id);

        if (patientMeals) {
          // Filter meals for the current pantry user
          const filteredMeals = getPantryAssignedMeals(patientMeals);
          setMeals(filteredMeals);
          
          // Set the first available meal type as selected
          const firstAvailableMeal = Object.entries(filteredMeals)
            .find(([_, meal]) => meal !== null);
          if (firstAvailableMeal) {
            setSelectedMealType(firstAvailableMeal[0] as "Morning" | "Evening" | "Night");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
    fetchData();
  }, [id, pantryUserId]);

  const handleStatusUpdate = async (mealId: string, statusData: any) => {
    try {
      const updatedMeal = await updateMealStatus(mealId, statusData);
      // Only update if the meal is still assigned to this pantry user
      if (updatedMeal.pantryStaffId === pantryUserId) {
        setMeals((prevMeals) => ({
          ...prevMeals,
          [selectedMealType!]: updatedMeal,
        }));
      }
    } catch (error) {
      console.error("Error updating meal status:", error);
      throw error;
    }
  };


  const getMealStatusColor = (status: string): string => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "InProgress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const MealTypeTab: React.FC<MealTypeTabProps> = ({
    type,
    hasExistingMeal,
    selectedMealType,
    onSelect,
  }) => (
    <button
      onClick={() => onSelect(type)}
      className={`relative px-6 py-3 text-sm font-medium flex items-center space-x-2 ${
        selectedMealType === type
          ? "border-b-2 border-blue-500 text-blue-600"
          : "text-gray-500 hover:text-blue-600"
      }`}
    >
      <span>{type} Meal</span>
      {hasExistingMeal && (
        <span className="w-2 h-2 rounded-full bg-green-400" />
      )}
    </button>
  );

  const MealContent: React.FC = () => {
    const currentMeal = meals[selectedMealType];

    return (
      <div className="p-6">
        {currentMeal ? (
          <div className="bg-white rounded-lg border border-blue-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-blue-800 mb-4">
                    Meal Details
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium text-gray-700 mb-2">
                        Ingredients
                      </div>
                      <p className="text-gray-600">{currentMeal.ingredients}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium text-gray-700 mb-2">
                        Instructions
                      </div>
                      <p className="text-gray-600">{currentMeal.instructions}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-blue-800 mb-4">
                    Status & Assignment
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Preparation Status</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getMealStatusColor(
                          currentMeal.preparationStatus
                        )}`}
                      >
                        {currentMeal.preparationStatus}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Delivery Status</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getMealStatusColor(
                          currentMeal.deliveryStatus
                        )}`}
                      >
                        {currentMeal.deliveryStatus}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="font-medium text-gray-700 mb-2">
                        Assigned Pantry Staff
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-800 font-medium">
                            {currentMeal.pantryStaff.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-gray-600">
                          {currentMeal.pantryStaff.name}
                        </span>
                      </div>
                    </div>
                    {currentMeal.deliveryPersonnel && (
                      <div className="pt-2 border-t border-gray-200">
                        <div className="font-medium text-gray-700 mb-2">
                          Assigned Delivery Staff
                        </div>
                        <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-800 font-medium">
                              {currentMeal.deliveryPersonnel.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-gray-600">
                            {currentMeal.deliveryPersonnel.name}
                          </span>
                        </div>
                      </div>
                    )}
                    {currentMeal.deliveryNotes && (
                      <div className="pt-2 border-t border-gray-200">
                        <div className="font-medium text-gray-700 mb-2">
                          Delivery Notes
                        </div>
                        <p className="text-gray-600">{currentMeal.deliveryNotes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setShowStatusModal(true)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update Status & Delivery
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <div className="text-gray-500 mb-4">
                No meal plan available for {selectedMealType.toLowerCase()}
              </div>
            </div>
          </div>
        )}

        {showStatusModal && meals[selectedMealType] && (
          <StatusUpdateModal
            meal={meals[selectedMealType]!}
            onClose={() => setShowStatusModal(false)}
            onUpdate={handleStatusUpdate}
          />
        )}
      </div>
    );
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
          <div className="mb-8">
            <h1 className="text-3xl text-blue-800 mb-2">
              Patient Meal Management
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
            <div className="p-6 border-b border-blue-100">
              <h2 className="text-xl text-blue-800">Patient Information</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Name:</span> {patient?.name}
                </div>
                <div>
                  <span className="font-medium">Age:</span> {patient?.age}
                </div>
                <div>
                  <span className="font-medium">Gender:</span> {patient?.gender}
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Room:</span>{" "}
                  {patient?.roomNumber}-{patient?.bedNumber}
                </div>
                <div>
                  <span className="font-medium">Floor:</span>{" "}
                  {patient?.floorNumber}
                </div>
                <div>
                  <span className="font-medium">Contact:</span>{" "}
                  {patient?.contactInfo}
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Diseases:</span>{" "}
                  {patient?.diseases}
                </div>
                <div>
                  <span className="font-medium">Allergies:</span>{" "}
                  {patient?.allergies}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-blue-100">
            {getAvailableMealTypes().length > 0 ? (
              <>
                <div className="border-b border-blue-100">
                  <div className="flex">
                    {getAvailableMealTypes().map((type) => (
                      <MealTypeTab
                        key={type}
                        type={type}
                        hasExistingMeal={!!meals[type]}
                        selectedMealType={selectedMealType || "Morning"}
                        onSelect={setSelectedMealType}
                      />
                    ))}
                  </div>
                </div>
                <MealContent />
              </>
            ) : (
              <div className="p-6">
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-8">
                  <div className="text-center">
                    <div className="text-gray-500 mb-4">
                      No meals are currently assigned to you for this patient
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientMealManagement;