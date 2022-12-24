import axios from 'axios';
import React, { useEffect, useState } from 'react' 
import ItemLoading from '../components/ItemLoading';
import ListItem from '../components/ListItem';
import SlideDown from '../components/SlideDown'
import { BASE_URL } from '../constants/config';
import dateFormat from 'dateformat';
import NoItem from '../components/NoItem';

const Home = () => {
    const [blogs, setBlogs] = useState([])
    const [events, setEvents] = useState([])
    const [loadingBlog, setLoadingBlog] = useState(true);
    const [loadingEvent, setLoadingEvent] = useState(true);

    useEffect(() => {
        axios.get(BASE_URL + '/blog/').then((response) => {
            setLoadingBlog(false);
            setBlogs(response.data);

        }).catch((e) => {
            setLoadingBlog(false);
        });
        axios.get(BASE_URL + '/event/').then((response) => {
            setLoadingEvent(false);
            setEvents(response.data);

        }).catch((e) => {
            setLoadingEvent(false);
        })
    }, [])
    return (
        <div>
            {/* <div  className="text-white bg-gradient-to-l from-slate-700 to-slate-900 flex w-full md:mt-[-2rem] mt-[-2rem]  md:h-48 h-36 bg-white-900"></div> */}
            <SlideDown>
                <div className='w-full h-full mx-auto text-center text-slate-900 flex-row justify-center'>
                    <h1 className='md:text-xl  text-slate-900 mb-2'>Welcome to</h1>
                    <h1 className='md:text-3xl text-2xl text-slate-900'>Toyota Manufacturers Club</h1>
                </div>
            </SlideDown>
            <div className="grid md:grid-cols-2 grid-rows-none md:gap-8 gap-16 md:mt-16 mt-10 mb-10">
                <div>
                    <h4 className='text-left mb-6'>Latest Post</h4>
                    <div className="grid grid-rows-none grid-flow-row md:gap-4 gap-8">
                        {
                            loadingBlog === false ?
                                (blogs.length > 0 ? blogs.map((item, index) => (
                                    index <= 2 ?
                                        <ListItem key={item.pk}
                                            title={item.youtube_id === "" ? item.title : `[Youtube] ${item.title}`}
                                            subtitle={item.summary}
                                            path={`blog/${item.pk}`}
                                            image={`${BASE_URL}${item.main_image_url}`} /> : null
                                )) : <NoItem title="There are no yet post" />)
                                : <ItemLoading />
                        }
                    </div>
                </div>

                <div>
                    <h4 className='text-left mb-6'>Latest Events</h4>
                    <div className="grid grid-rows-none grid-flow-row md:gap-4 gap-8">
                        {
                            loadingEvent === false ?
                                (events.length > 0 ? events.map((item, index) => (
                                    index <= 2 ?
                                        <ListItem key={item.pk}
                                            title={item.is_free === true ? `[Free] ${item.title}` : item.title}
                                            subtitle={`${item.venue} ,  ${dateFormat(item.date, "dddd dd mmmm yyyy")} `}
                                            path={`event/${item.pk}`}
                                            image={`${BASE_URL}${item.main_image_url}`} /> : null
                                )) : <NoItem title="There are no events currently available" />)
                                : <ItemLoading />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home