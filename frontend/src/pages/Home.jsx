
import { useEffect } from "react";
import { checkSession } from "../modules/basicApis";
import { userStore } from "../stores/UserStore";
import PostField from "../components/posting/PostField";
import Feed from "../components/feed/Feed";
function Home() {


  return (
    <div className='min-h-full'>
      <div className="grid gap-4">
      <PostField />
      <Feed/>
      </div>
    </div>
  );
}

export default Home