import { useNavigate, useParams } from "react-router-dom";
import { CaloriesMutation } from "../../types.ts";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner.tsx";
import Spinner from "../../components/Spinner/Spinner.tsx";
import React, {useCallback, useEffect, useState} from "react";
import axiosApi from "../../axiosApi.ts";

const emptyDish: CaloriesMutation = {
    id: '',
    time: '',
    description: '',
    calories: '',
};

const MealForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [dishMutation, setDishMutation] = useState<CaloriesMutation>(emptyDish);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const fetchOneDish = useCallback(async (id: string) => {
        setIsFetching(true);
        try {
            const response = await axiosApi.get<CaloriesMutation | null>(`/dishes/${id}.json`);
            if (response.data) {
                setDishMutation(response.data);
            }
        } catch (error) {
            console.error("Error fetching quote:", error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            void fetchOneDish(id);
        } else {
            setDishMutation(emptyDish);
        }
    }, [id, fetchOneDish]);

    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setDishMutation(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const dishesCalories = {
            time: dishMutation.time,
            description: dishMutation.description,
            calories: dishMutation.calories,
        };

        try {
            setIsLoading(true);
            if (id !== undefined) {
                await axiosApi.put(`/dishes/${id}.json`, dishesCalories);
            } else {
                await axiosApi.post('/dishes.json', dishesCalories);
            }
            setDishMutation(emptyDish);
            navigate("/");
        } catch (error) {
            console.error('Error while adding/editing quote:', error);
        } finally {
            setIsLoading(false);
        }
    };

    let form = (
        <form onSubmit={onFormSubmit}>
            <h4>{id ? 'Edit dish' : 'Add new dish'}</h4>
            <div className="form-group">
                <label>Select Meal Type</label>
                <select
                    className="form-control my-3"
                    name="time"
                    value={dishMutation.time}
                    onChange={onFieldChange}
                    required
                >
                    <option value="" disabled={true}>Choose</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Snack">Snack</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                </select>
            </div>
            <div className="form-group">
                <label>Meal Description</label>
                <textarea
                    className="form-control my-3"
                    name="description"
                    value={dishMutation.description}
                    onChange={onFieldChange}
                    rows={3}
                    required
                />
            </div>
            <div className="form-group">
                <label>Calories</label>
                <input
                    type="number"
                    className="form-control my-3"
                    name="calories"
                    value={dishMutation.calories}
                    onChange={onFieldChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mt-2" disabled={isLoading}>
                {isLoading && <ButtonSpinner />}
                {id ? 'Update' : 'Create'}
            </button>
        </form>
    );

    if (isLoading) {
        form = (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <Spinner />
            </div>
        );
    }

    return isFetching ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <Spinner />
        </div>
    ) : (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {form}
                </div>
            </div>
        </div>
    );
};

export default MealForm;
