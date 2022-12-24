import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../constants/config';
import ListItem from '../components/ListItem';
import NoItem from '../components/NoItem';
import ItemLoading from '../components/ItemLoading';
import dateFormat from 'dateformat';
import SearchComponent from '../components/SearchComponent';

const Events = () => {
  const [events, setevents] = useState([])
  const [eventsApi, seteventsApi] = useState([])
  const [loadingBlog, setLoadingBlog] = useState(true);
  useEffect(() => {
    axios.get(BASE_URL + '/event/').then((response) => {
      setLoadingBlog(false);
      seteventsApi(response.data);
      setevents(response.data);

    }).catch((e) => {
      setLoadingBlog(false);
    });
  }, [])

  const setFilterEvent = (keyword) => {
    if (keyword === "") {
      setevents(eventsApi)
    } else {
      setevents(eventsApi.filter(function (item) {
        return item.title.toLowerCase().includes(keyword)
      }))
    }
  }

  return (
    <div>
      <SearchComponent onChange={setFilterEvent} />
      <h2 className='text-left font-bold text-xl mt-10 mb-6'>Latest Event</h2>
      <div className="grid grid-rows-none  gap-4 mb-10">
        {
          loadingBlog === false ?
            (events.length > 0 ? events.map((item, index) => (
              <ListItem className="w-full"
                title={item.is_free === true ? `[Free] ${item.title}` : item.title} key={item.pk}
                subtitle={`${item.venue} ,  ${dateFormat(item.date, "dddd dd mmmm yyyy")} `}
                path={`/event/${item.pk}`}
                image={`${BASE_URL}${item.main_image_url}`} />
            )) : <NoItem title="There are no events" />)
            : <ItemLoading />
        }
      </div>
    </div>
  )
}

export default Events