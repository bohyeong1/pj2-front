import { useState, useEffect } from 'react'
import connectData from '../../../utilData/UtilFunction'

function useFetch(toggle , handle_fun){
    // state
    const [dataStore, setDataStore] = useState(null)

    // api 호출
    useEffect(() => {
        // fetch data
        async function select_data(filter_category, toggle_key) {
            let data
            try {
                data = await connectData('http://127.0.0.1:3700/api/common', 'POST', {
                filter: filter_category,
                counts: 12,
                keyword: toggle_key || null,
                })
            } catch (e) {
                console.log(e)
            } finally {
                setDataStore(data.accomodations)
                const data_length = data.accomodations.length
                handle_fun(data_length)
            }}

        // 초기 렌딩 & 전체 클릭
        if (toggle.key === 'default') {
            select_data('all')
        } 
        // 버튼 클릭
        else {
            select_data('category', toggle.key)
        }
    }, [toggle])

    return dataStore
}

export default useFetch