'use client';

import { SafeExercise, SafeUser, SafeWorkout } from "@/app/types";
import Input from "../inputs/Input";
import useLoginModel from "@/app/hooks/useLoginModel";
import { useRouter } from "next/navigation";
import { useCallback, useState, useMemo } from "react";
import axios from "axios";
import Model from './models';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import useDeleteTemplateModel from "@/app/hooks/useDeleteTemplateModel";

interface DeleteTemplateModelProps {
    templateId: string;
    userId: string;
}

const DeleteTemplateModel: React.FC<DeleteTemplateModelProps> = ({
    templateId,
    userId
}) => {
    const router = useRouter();
    const deleteTemplateModel = useDeleteTemplateModel();

    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = () => {
        setIsLoading(true);

        axios.delete(`/api/templates/${templateId}`)
        .then(() => {
            toast.success('Template Deleted!');
            router.push(`/templates/${userId}`);
            deleteTemplateModel.onClose();
            router.refresh;
        })
        .catch(() => {
            toast.error('Something went wrong.')
        }).finally(() => {
            setIsLoading(false);
        })
    } 
    
    const actionLabel = 'Delete Template';

    let bodyContent = (
        <div>
            <div className="flex flex-col gap-8">
        <Heading
          title="Delete Template?"
          subtitle="Are you sure you would like to delete your template?"
        />
      </div>
        </div>
    )

    return (
        <Model
            isOpen={deleteTemplateModel.isOpen}
            onClose={deleteTemplateModel.onClose}
            onSubmit={(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={undefined}
            secondaryAction={undefined}
            title="Thebes"
            body={bodyContent}
        />
    );
}
 
export default DeleteTemplateModel;