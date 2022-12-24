import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../constants/config';
import ItemLoading from '../components/ItemLoading';
import dateFormat from 'dateformat';

const EventDetil = () => {
  const param = useParams()
  const [isLoading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(BASE_URL + `/event/${param.id}/`).then((response) => {
      let temp = [];
      setLoading(false);
      setItem(response.data);
    }).catch((e) => {
      setLoading(false);
    });
  }, [])

  return (
    <>
      {
        isLoading == false ?
          <div>
            <div className="w-full mx-auto">
              <div className="bg-white shadow-md border border-gray-200 rounded-lg  mb-5">
                <img
                  className="flex object-cover p-0  md:h-96 h-48 w-full"
                  src={`${BASE_URL}${item.main_image_url}`}
                  alt=""
                />

                <div className="p-5">
                  <a href="#">
                    <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-1">
                      {item.title}
                    </h5>
                  </a>
                  <p className="font-normal text-gray-800 mb-3">
                    {`${item.venue} ,  ${dateFormat(item.date, "dddd dd mmmm yyyy")} `}
                  </p>
                  <p className="font-normal text-gray-600 mb-4 text-justify	">
                    {item.description}
                  </p>
                  {
                    item.is_free == true ?
                      <div class="bg-emerald-100 border-t border-b border-emerald-500 text-emerald-700 px-4 py-3" role="alert">
                        <p class="font-bold">Free Event</p>
                      </div> :
                      <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                        <p class="font-bold">@Price / Partisipant</p>
                        <p class="text-sm">
                         {
                            new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            }).format(item.price)
                          }
                        </p>
                      </div>
                  }

                </div>
              </div>
            </div>
          </div>
          : <ItemLoading />
      }
    </>
  )
}

export default EventDetil