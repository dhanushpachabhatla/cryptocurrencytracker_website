import React from 'react'
import Header from '../components/Common/Header'
import NewsComponent from '../components/News'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { settingNewsObject } from '../functions/settingNewsObject';
import Footer from './../components/Common/Footer/footer';
import Loader from '../components/Common/Loader';
import NewsHeading from '../components/NewsHeading';
function News() {
    // const [newsdata, setnewsdata] = useState({})
    const [newsdata, setnewsdata] = useState([]);
    const [isLoading, setisLoading] = useState(true)

    const options = {
        method: 'GET',
        url: 'https://news-api14.p.rapidapi.com/v2/search/publishers',
        params: {
            query: 'cryptocurrency'
        },
        headers: {
            'x-rapidapi-key': '3dbb383bcamshc3c064afefbc698p12489bjsn7117f94f31c3',
            'x-rapidapi-host': 'news-api14.p.rapidapi.com'
        }
    };

    useEffect(() => {
        setisLoading(true)
        axios.request(options).then((response) => {
            if (response.data && response.data.data) {
                // Pass only the array to settingNewsObject
                settingNewsObject(response.data.data, setnewsdata);
            }
            setisLoading(false)
        })
        .catch((e) => {
            console.log(e.message);
            setisLoading(false)
        });
    }, []);

    return (
        <div>
            {isLoading ? (
                <>
                <Header />
                <Loader />
                </>
            ) : (
                <>
                <Header />
                    <NewsHeading />
                    <NewsComponent newsdata={newsdata} />
                    <Footer />
                </>
            )}
        </div>

    )
}
//pub_58310e968d10cd7c86763f8713ead25450617
export default News