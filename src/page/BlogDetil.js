import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemLoading from '../components/ItemLoading';
import axios from 'axios';
import { BASE_URL } from '../constants/config';
import ReactImageGallery from 'react-image-gallery';

const BlogDetil = () => {

  const param = useParams()
  const [isLoading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + `/blog/${param.id}/`).then((response) => {
      let temp = [];
      setLoading(false);
      setItem(response.data);
      if (response.data.albums_url.length > 0) {
        response.data.albums_url.map((src) => {
          temp.push({
            original: `${BASE_URL}${src}`,
            thumbnail: `${BASE_URL}${src}`
          })
        })
      }
      setGallery(temp)
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
                {item.youtube_id == "" ?
                  <img
                    className="flex object-cover p-0  md:h-96 h-48 w-full"
                    src={`${BASE_URL}${item.main_image_url}`}
                    alt=""
                  /> :
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe src={`https://www.youtube.com/embed/${item.youtube_id}`} ></iframe>
                  </div>
                }

                <div className="p-5">
                  <a href="#">
                    <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-1">
                      {item.title}
                    </h5>
                  </a>
                  <p className="font-normal text-gray-800 mb-3">
                    {item.summary}
                  </p>
                  <p className="font-normal text-gray-600 mb-4 text-justify	">
                    {item.content}
                  </p>

                  {
                    gallery.length > 0 ?
                      <div className='p-2 my-6'>
                        <h5 className='mb-3'>Gallery Photo</h5>
                        <ReactImageGallery items={gallery} autoPlay={false} />
                      </div>
                      : null
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

export default BlogDetil