import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePatients } from "@/api/patientApi";
import {
  getPatientMeals,
  createOrUpdateMeal,
  updateMealStatus,
  getAvailablePantryStaff,
} from "@/api/mealApi";

// Interfaces remain the same
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

interface PantryStaff {
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

interface MealFormProps {
  onClose: () => void;
  onSubmit: (mealData: {
    ingredients: string;
    instructions: string;
    pantryStaffId: string;
  }) => void;
  selectedMealType: "Morning" | "Evening" | "Night";
  existingMeal: MealDetail | null;
  availablePantryStaff: PantryStaff[];
}

const MealForm: React.FC<MealFormProps> = ({
  onClose,
  onSubmit,
  selectedMealType,
  existingMeal,
  availablePantryStaff,
}) => {
  const [formData, setFormData] = useState({
    ingredients: existingMeal?.ingredients || "",
    instructions: existingMeal?.instructions || "",
    pantryStaffId: existingMeal?.pantryStaffId || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl text-blue-800">
            {existingMeal ? "Update" : "Create"} {selectedMealType} Meal Plan
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Enter ingredients list"
              required
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preparation Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Enter preparation instructions"
              required
            />
          </div>

          <div>
            <label
              htmlFor="pantryStaffId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Assign Pantry Staff
            </label>
            <select
              id="pantryStaffId"
              name="pantryStaffId"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.pantryStaffId}
              onChange={handleChange}
              required
            >
              <option value="">Select Pantry Staff</option>
              {availablePantryStaff.map((staff) => (
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
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {existingMeal ? "Update" : "Create"} Meal Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PatientMealManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<
    "Morning" | "Evening" | "Night"
  >("Morning");
  const [showMealForm, setShowMealForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availablePantryStaff, setAvailablePantryStaff] = useState<
    PantryStaff[]
  >([]);
  const [meals, setMeals] = useState<{ [key: string]: MealDetail | null }>({
    Morning: null,
    Evening: null,
    Night: null,
  });

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
       
        const [patientMeals, pantryStaff] = await Promise.all([
          getPatientMeals(id),
          getAvailablePantryStaff(),
        ]);
        console.log(pantryStaff);

        setAvailablePantryStaff(pantryStaff);

        if (patientMeals) {
          setMeals({
            Morning: patientMeals.morningMeal,
            Evening: patientMeals.eveningMeal,
            Night: patientMeals.nightMeal,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
    fetchData();
  }, [id]);

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

  const handleMealFormSubmit = async (mealData: {
    ingredients: string;
    instructions: string;
    pantryStaffId: string;
  }) => {
    try {
      if (!id) return;

      const mealPayload = {
        mealType: selectedMealType,
        ...mealData,
      };

      const response = await createOrUpdateMeal(id, mealPayload);

      if (response) {
        setMeals((prevMeals) => ({
          ...prevMeals,
          [selectedMealType]: response,
        }));
      }

      setShowMealForm(false);
    } catch (error) {
      console.error("Error creating/updating meal:", error);
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
                      <p className="text-gray-600">
                        {currentMeal.instructions}
                      </p>
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
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowMealForm(true)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Update Meal Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <div className="text-gray-500 mb-4">
                No meal plan created for {selectedMealType.toLowerCase()} yet
              </div>
              <button
                onClick={() => setShowMealForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Meal Plan
              </button>
            </div>
          </div>
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
            <div className="border-b border-blue-100">
              <div className="flex">
                {["Morning", "Evening", "Night"].map((type) => (
                  <MealTypeTab
                    key={type}
                    type={type as "Morning" | "Evening" | "Night"}
                    hasExistingMeal={!!meals[type]}
                    selectedMealType={selectedMealType}
                    onSelect={setSelectedMealType}
                  />
                ))}
              </div>
            </div>

            <MealContent />
          </div>
        </div>
      </main>

      {showMealForm && (
        <MealForm
          onClose={() => setShowMealForm(false)}
          onSubmit={handleMealFormSubmit}
          selectedMealType={selectedMealType}
          existingMeal={meals[selectedMealType]}
          availablePantryStaff={availablePantryStaff}
        />
      )}
    </div>
  );
};

export default PatientMealManagement;

