
import { useEffect } from "react";
import { checkSession } from "../modules/basicApis";
import { userStore } from "../stores/UserStore";
import PostField from "../components/posting/PostField";
import Feed from "../components/feed/Feed";
function Home() {


  return (
    <div className='min-h-full'>
      <h2>Home View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      <PostField />
      <Feed/>
    </div>
  );
}

export default Home