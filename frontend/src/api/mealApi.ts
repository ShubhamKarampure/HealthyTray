// src/api/mealApi.ts
import { MealType, PreparationStatus, DeliveryStatus } from '@/utils/types';
import { API_ROUTES } from "../routes/apiRoute";

export interface MealDetailInput {
    mealType: MealType;
    ingredients: string;
    instructions: string;
    pantryStaffId: string;
}

export async function getPatientMeals(id: string) {
    try {
        const response = await fetch(`${API_ROUTES.MEALS}/patient/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching patient meals:', error);
        throw error;
    }
}

export async function createOrUpdateMeal(patientId: string, mealData: MealDetailInput) {
    try {
        const response = await fetch(`${API_ROUTES.MEALS}/patient/${patientId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mealData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating/updating meal:', error);
        throw error;
    }
}

export async function updateMealStatus(mealId: string, statusData: {
    preparationStatus?: PreparationStatus;
    deliveryStatus?: DeliveryStatus;
    deliveryPersonnelId?: string;
    deliveryNotes?: string;
}) {
    try {
        const response = await fetch(`${API_ROUTES.MEALS}/patient/${mealId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating meal status:', error);
        throw error;
    }
}

export async function getAvailablePantryStaff() {
    try {
        const response = await fetch(`${API_ROUTES.MEALS}/pantry-staff`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching pantry staff:', error);
        throw error;
    }
}

export async function getAvailableDeliveryStaff() {
    try {
        const response = await fetch(`${API_ROUTES.MEALS}/delivery-staff`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching delivery staff:', error);
        throw error;
    }
}
