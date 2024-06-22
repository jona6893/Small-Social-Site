import React, { useEffect, useRef } from 'react'
import { feedStore } from '../../stores/FeedStore';
import { deletePost, getFeed, getLikes } from '../../modules/feedApis';
import Post from './Post';
import { userStore } from '../../stores/UserStore';
import autoAnimate from "@formkit/auto-animate";


function Feed() {
    const {feedList, setFeedList} = feedStore();
    const {userInfo} = userStore();
    const parent = useRef(null);

    useEffect(() => {

        async function fetchFeed() {
        const feed = await getFeed(userInfo.user_id)
        setFeedList(feed)
        console.log(feed)

        }
        console.log("feed")
       if(userInfo.user_id && feedList.length === 0){
        console.log('fetching feed')
           fetchFeed();
       }
        

    }, [userInfo.user_id])

    async function handleDelete(postId) {
      console.log("delete");
      const response = await deletePost(postId);
      console.log(response);
      if (response[0].post_id) {
        const newFeed = feedList.filter((post) => post.post_id !== postId);
        setFeedList(newFeed);
      }
    }

    console.log(feedList)
      useEffect(() => {
        parent.current && autoAnimate(parent.current);
      }, [parent]);



    function sortFeed(value) {
      const sortedFeed = value.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
     return sortedFeed
    }


    return (
      <section ref={parent} className="mx-auto w-full max-w-screen-xl flex flex-col gap-4 items-center">
          {sortFeed(feedList)?.map((post) => (
            <Post key={post.post_id} post={post} handleDelete={handleDelete} />
          ))}
      </section>
    );
}

export default Feed