import getCurrentUser from "../actions/getCurrentUser";
import getFollowingUsers from "../actions/getFollowingUsers";
import Button from "../components/Button";
import ClientOnly from "../components/ClientOnly";
import AddFriendModel from "../components/models/AddFriendModel";
import useAddFriendModel from "../hooks/useAddFriendModel";
import SocialClient from "./SocialClient";
import Container from "../components/Container";

const SocialPage = async () => {

    const followingUsers = await getFollowingUsers();
    const CurrentUser = await getCurrentUser();

    if (!CurrentUser) {
        return null;
    }

    if(!followingUsers) {
        return null;
    }

    return (
        <ClientOnly>
            <Container>
                <SocialClient
                    Users={followingUsers}
                />
            </Container>
        </ClientOnly>
     );
}
 
export default SocialPage;