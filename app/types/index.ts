import { Workout, User, Exercise, Template } from "@prisma/client";

export type SafeFullWorkout = Omit<
    Workout,
    "createdAt"
> & {
    createdAt: string;
};

export type SafeFollowedUser = {
    id: string;
    name: string;
    image?: string | null;
}

export type SafeExercise2 = {
    createdAt: Date;
    id: string;
    name: string;
    Weight: number;
    sets: number;
    Reps: number;
    Rest: number;
};

export type SafeExercises = {
    id: string;
    name: string;
    Weight: number;
    sets: number;
    Reps: number;
    Rest: number;
};

export type SafeWorkout = Omit<
    Workout,
    "createdAt"
> & {
    createdAt: string;
};

export type SafeExercise = Omit<
    Exercise,
    "createdAt"
> & {
    createdAt: string;
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type SafeTemplate = Omit<
    Template,
    "createdAt"
> & {
    createdAt: string;
};
