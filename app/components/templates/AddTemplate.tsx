'use client';

import useAddTemplateModel from "@/app/hooks/useAddTemplateModel";
import Button from "../Button";
import Heading from "../Heading";

const AddTemplate = () => {

    const addTemplate = useAddTemplateModel();

    return (
        <>
            <Heading
                title="Add new Templates here"
                center={true}
            />
            <div className="flex justify-center items-center">
                <div>
                    <Button
                        label="Add Template"
                        onClick={addTemplate.onOpen}
                    />
                </div>
            </div>
        </>
    )
}

export default AddTemplate;