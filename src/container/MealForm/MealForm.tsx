import axiosApi from "../../axiosApi.ts";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Calories, CaloriesMutation} from "../../types.ts";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner.tsx";

const emptyDish = {
    id: '',
    time: '',
    description: '',
    calories: 0,
};

const MealForm: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [dish, setDish] = useState<Calories>(emptyDish);
    const [dishMutation, setDishMutation] = useState<CaloriesMutation>({
        id: '',
        time: '',
        description: '',
        calories: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const fetchOneDish = useCallback(async (id: string) => {
        setIsFetching(true);
        try {
            const response = await axiosApi.get<Calories | null>(`/quotes/${id}.json`);
            if (response.data) {
                setDish(response.data);
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
            setDish(emptyDish)
        }
    }, [id, fetchOneDish]);

    const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target;

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
                await axiosApi.put(`/quotes/${id}.json`, dishesCalories);
            } else {
                await axiosApi.post('/quotes.json', dishesCalories);

            }
            setDish(emptyDish)
            navigate("/");
        } catch (error) {
            console.error('Error while adding/editing quote:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const form = (
        <form onSubmit={onFormSubmit}>
            <h4>{dish.id ? 'Edit dish' : 'Add new dish'}</h4>
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
                {isLoading && <ButtonSpinner/>}
                {dish.id ? 'Update' : 'Create'}
            </button>
        </form>
    );

    return isFetching ? isFetching : (
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