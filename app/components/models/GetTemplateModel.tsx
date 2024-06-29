'use client';

import { SafeTemplate } from "@/app/types";
import Model from "./models";
import useGetTemplatesModel from "@/app/hooks/useGetTemplatesModel";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { toast } from 'react-hot-toast';
import Heading from "../Heading";
import Option from "../inputs/Option";

interface GetTemplatesModelProps {
    templates?: SafeTemplate[] | null;
    workoutId: string;
}

const GetTemplatesModel: React.FC<GetTemplatesModelProps> = ({
    templates = [],
    workoutId,
}) => {
    const router = useRouter();
    const getTemplatesModel = useGetTemplatesModel();

    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            templateId: '',
            workoutId,
        }
    });

    const templateId = watch('templateId');

    const setCustomValue = (id:string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/useTemplate', data)
        .then(() => {
            toast.success('Template Used!');
            router.refresh();
            reset();
            getTemplatesModel.onClose();
        })
        .catch(() => {
            toast.error('Something went wrong.')
        }).finally(() => {
            setIsLoading(false);
        })
    } 

    const actionLabel = 'Use Template';

    
    let bodyContent = (
        <div>
            {templates ? templates.map((template) => {
                return (
                    <Option
                        key={template.id} 
                        onClick={(value) => setCustomValue('templateId', value)}
                        selected={templateId === template.id}
                        value={template.id}
                        label={template.name}
                    />
                )
            }) : 
            <div></div>
            }
        </div>
    )

    return (
        <Model
        isOpen={getTemplatesModel.isOpen}
        onClose={getTemplatesModel.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={undefined}
        secondaryAction={undefined}
        title="Thebes"
        body={bodyContent}
        />
    )
}

export default GetTemplatesModel;