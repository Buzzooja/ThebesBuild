'use client';

import useAddWorkoutModel from "@/app/hooks/useAddWorkoutModel";
import Button from "../Button";
import Heading from "../Heading";

const AddWorkout = () => {

    const addWorkout = useAddWorkoutModel();

    return (
        <>
            <Heading
                title="Add new Workouts here"
                center={true}
            />
            <div className="flex justify-center items-center">
                <div>
                    <Button
                        label="Add Workout"
                        onClick={addWorkout.onOpen}
                    />
                </div>
            </div>
        </>
    )
}

export default AddWorkout;