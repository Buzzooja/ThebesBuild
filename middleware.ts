export { default } from "next-auth/middleware";

export const config ={
    matcher: [
        "/profile",
        "/social",
        "/templateInd",
        "/templates",
        "/workouts",
    ]
}