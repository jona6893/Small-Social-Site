import React, { useEffect } from 'react'
import { feedStore } from '../../stores/FeedStore';
import { getFeed, getLikes } from '../../modules/feedApis';
import Post from './Post';
import { userStore } from '../../stores/UserStore';


function Feed() {
    const {feedList, setFeedList} = feedStore();
    const {userInfo} = userStore();

    useEffect(() => {

        async function fetchFeed() {
        const feed = await getFeed(userInfo.user_id)
        setFeedList(feed)
        console.log(feed)

        }
        console.log("feed")
       if(userInfo.user_id){
        console.log('fetching feed')
           fetchFeed();
       }
        

    }, [userInfo.user_id])



    function sortFeed(value) {
      const sortedFeed = value.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
     return sortedFeed
    }


    return (
        <section className="mx-auto max-w-screen-xl">
            <div className='mx-auto flex flex-col gap-4 items-center'>
                 {sortFeed(feedList)?.map((post) => (
                    <Post key={post.post_id} post={post}/>
                ))} 
            </div>
        </section>
    );
}

export default Feed