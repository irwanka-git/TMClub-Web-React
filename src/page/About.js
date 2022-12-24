import React, { useEffect, useState } from 'react'
import ItemLoading from '../components/ItemLoading';
import axios from 'axios';
import { BASE_URL } from '../constants/config';
import ReactImageGallery from 'react-image-gallery';
import parse from 'html-react-parser';

const About = () => {
  const [isLoading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + `/about/about/`).then((response) => {
      if (response.data.length > 0) {
        let id = response.data[0].id
        axios.get(BASE_URL + `/about/about/${id}/`).then((responseDetil) => {
          setLoading(false);
          setItem(responseDetil.data)
          let temp = [];
          if (responseDetil.data.organizations.length > 0) {
            if (responseDetil.data.organizations.length > 0) {
              responseDetil.data.organizations.map((src) => {
                temp.push({
                  original: `${src.image_url}`,
                  thumbnail: `${src.image_url}`
                })
              })
            }
            setGallery(temp)
          }
        }).catch((e) => {
          setLoading(false);
        });
      }
    }).catch((e) => {
      setLoading(false);
    });
  }, [])

  return (
    <>
      {
        isLoading == false ?
          item != null ? <div className='mb-10'>
            <h2 className='mt-4 text-left font-bold text-xl mb-6'>{item.md}</h2>
            <div className='mb-5 about-html'>
              {parse(item.description)}
            </div>
            {
              item.annual_directories.length > 0 ?
                <div className='mt-10'>
                  <h2 className='text-left font-bold mb-2 uppercase'> Annual Directory</h2>
                  <ul>
                    {
                      item.annual_directories.map((annual, index) => (
                        <li> <a target="_blank" href={`${annual.url}`} className='text-blue-800'>{annual.display_name}</a></li>
                      ))
                    }
                  </ul>
                </div>
                : null
            }

            {
              gallery.length > 0 ?
                <div className='mt-10'>
                  <h2 className='text-left font-bold mb-5 uppercase'> Organizational Structure</h2>
                  <ReactImageGallery items={gallery} autoPlay={false} />
                </div>
                : null
            }

          </div> : null :
          <ItemLoading />
      }
    </>

  )
}

export default About