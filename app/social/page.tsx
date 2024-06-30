export const dynamic = 'force-dynamic'

import getFollowingUsers from "../actions/getFollowingUsers";
import ClientOnly from "../components/ClientOnly";
import SocialClient from "./SocialClient";
import Container from "../components/Container";
import getCurrentUser from "../actions/getCurrentUser";

const SocialPage = async () => {

    const followingUsers = await getFollowingUsers();

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