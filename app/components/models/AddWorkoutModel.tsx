'use client'

import axios from 'axios';
import { useCallback, useState, useMemo } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import dynamic from 'next/dynamic';

import Model from './models';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import useAddWorkoutModel from '@/app/hooks/useAddWorkoutModel';
import DatePicker from '../inputs/DatePicker';
import OptionTOD from '../inputs/TimeSelector';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getWorkoutId from '@/app/actions/getWorkoutId';



enum STEPS {
    DATE = 0,
    TIME = 1,
    TITLE = 2
}


const AddWorkoutModel = () => {
    const router = useRouter();
    const addWorkoutModel = useAddWorkoutModel();
    const [step, setStep] = useState(STEPS.DATE);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            date: '',
            time: '',
            title:''
        }
    });

    const date = watch('date');
    const time = watch('time');

    const setCustomValue = (id:string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.TITLE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/workouts', data)
        .then(() => {
            toast.success('Workout Created!');
            router.push(`/workouts/new`);
            reset();
            setStep(STEPS.DATE);
            addWorkoutModel.onClose();
        })
        .catch(() => {
            toast.error('Something went wrong.')
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.TITLE) {
            return 'Create';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.DATE) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading 
                title="Add a new workout"
                subtitle="Select the date of your workout"
            />
            <div className="

            ">
                <DatePicker
                    onClickDay={(value) => setCustomValue('date', value)}
                    value={date}
                />
            </div>
        </div>
    )

    if (step === STEPS.TIME) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
            <Heading 
                title="When was your workout ?"
                subtitle="Select the time of your workout"
            />
            <div className='flex justify-center space-x-4'>
                <OptionTOD
                onClick={(time) => setCustomValue('time', time)}
                selected={time === 'Early Morning'}
                label='Early Morning'
                />
                <OptionTOD
                onClick={(time) => setCustomValue('time', time)}
                selected={time === 'Late Morning'}
                label='Late Morning'
                />
            </div>
            <div className='flex justify-center space-x-4'>
                <OptionTOD
                onClick={(time) => setCustomValue('time', time)}
                selected={time === 'Early Afternoon'}
                label='Early Afternoon'
                />
                <OptionTOD
                onClick={(time) => setCustomValue('time', time)}
                selected={time === 'Late Afternoon'}
                label='Late Afternoon'
                />
                <OptionTOD
                onClick={(time) => setCustomValue('time', time)}
                selected={time === 'Evening'}
                label='Evening'
                />
            </div>
        </div>
        );
    }

    if (step === STEPS.TITLE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
            <Heading 
                title="Give your workout a title"
                subtitle="What did you train?"
            />
            <Input
                id="title"
                label="Title"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            </div>
        );
    }
        

    return (
        <Model
            isOpen={addWorkoutModel.isOpen}
            onClose={addWorkoutModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.DATE ? undefined : onBack}
            title="Thebes"
            body={bodyContent}
        />
    );
}

export default AddWorkoutModel;