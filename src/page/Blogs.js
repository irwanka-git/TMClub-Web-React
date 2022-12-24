import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../constants/config';
import ListItem from '../components/ListItem';
import NoItem from '../components/NoItem';
import ItemLoading from '../components/ItemLoading';
import SearchComponent from '../components/SearchComponent'; 

const Blogs = () => {

  const [blogsApi, setBlogsApi] = useState([])
  const [blogs, setBlogs] = useState([])
  const [loadingBlog, setLoadingBlog] = useState(true);
  useEffect(() => {
    axios.get(BASE_URL + '/blog/').then((response) => {
      setLoadingBlog(false);
      setBlogsApi(response.data);
      setBlogs(response.data);

    }).catch((e) => {
      setLoadingBlog(false);
    });
  }, [])

  const setFilterBlog = (keyword) => {
    if (keyword === "") {
      setBlogs(blogsApi)
    } else {
      setBlogs(blogsApi.filter(function (item) {
        return item.title.toLowerCase().includes(keyword) || item.summary.toLowerCase().includes(keyword)
      }))
    }
  }

  return (
    <div>
      <SearchComponent onChange={setFilterBlog} />
      <h2 className='mt-4 text-left font-bold text-xl mb-6'>Latest Posts</h2>
      <div className="grid grid-rows-none  gap-4 mb-10">
        {
          loadingBlog === false ?
            (blogs.length > 0 ? blogs.map((item, index) => (
              <ListItem className="w-full" key={item.pk}
              title={ item.youtube_id ==="" ? item.title : `[Youtube] ${item.title}` }
                subtitle={item.summary}
                path={`/blog/${item.pk}`}
                image={`${BASE_URL}${item.main_image_url}`} />
            )) : <NoItem title="There are no posts" />)
            : <ItemLoading />
        }
      </div>
    </div>
  )
}

export default Blogs