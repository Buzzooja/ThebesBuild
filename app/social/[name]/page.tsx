import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getSearchedUsers from "@/app/actions/getSearchedUsers";
import FriendBody from "@/app/components/social/friendBody";

interface IParams {
    name: string;
}

const SearchFriendPage = async ({ params }: { params: IParams }) => {
    const searchedUsers = await getSearchedUsers(params);
    const currentUser = await  getCurrentUser();

    if(searchedUsers.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset/>
            </ClientOnly>
        )
    }
    return ( 
        <ClientOnly>
          <div className="justify-center items-center flex pt-24 overflow-hidden overflow-y-auto">
            <div
              className="
                flex
                flex-col
                w-full
                md:w-4/6
                lg:w-3/6
                xl:w-2/5
                gap-8
                overflow-auto
              ">
              {searchedUsers.map((user) => {
                const date = user.createdAt;
                return (
                  <FriendBody
                      date={date}
                      user={user}
                      key={user.name}
                  />
                )
              })}
            </div>
          </div>
        </ClientOnly>
     );
}
 
export default SearchFriendPage;