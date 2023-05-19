import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { get } from '../../services/api';
import NewsArticle from './NewsArticle';
import {ImSpinner3} from "react-icons/im";
import { useIsAuthenticated } from 'react-auth-kit';


const NewsPage = () => {
    const isAuthinticated = useIsAuthenticated();
    const [filters, setFilters] = useState({
        q: '',
        author: '',
        category: '',
        sort: 'desc',
        source: '',
    });
    const [debounce, setDebounce] = useState({
        q: '',
        author: '',
        category: '',
        sort: 'desc',
        source: '',
    });


    const getArticles = async () => {
        const response = await get('/news', {
            search_params:{
                q: filters.q,
                sort: filters.sort,
                author: filters.author,
                category: filters.category,
            },
            source:filters.source? filters.source : []
        });
        return response.news;
    };

    const getSources = async () => {
        const response = await get('/sources');
        return response.sources
    };

    const { data: articles, status, refetch:refetchArticles, isLoading, isFetching } = useQuery(['articles', filters], getArticles, {
        enabled: true,
    });

    const { data: sources } = useQuery(['sources'], getSources, {
        enabled: true,
    });

    const load = () => {
        setFilters(debounce);
        refetchArticles();
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div className='my-6'>
            <div className="flex justify-around my-6">
                <form className='flex flex-col justify-center gap-10' onSubmit={e=>{e.preventDefault();load();}}>

                    <div className='flex justify-center gap-10'>
                        <input type='text' className='input' onChange={e=>setDebounce(prevDebounce=>{return {...prevDebounce, q:e.target.value}})} placeholder='Search' value={debounce.q} />

                        <select className='select select-bordered ' onChange={e=>setDebounce(prevDebounce=>{return {...prevDebounce, source:e.target.value}})} value={debounce.source}>
                            <option value="">All Sources</option>
                            {sources?.map(source=>{return <option key={`source-${source.id}`} value={source.id}>{source.name}</option>})}
                        </select>

                        <select
                            className="select select-bordered "
                            onChange={e=>setDebounce(prevDebounce=>{return {...prevDebounce, sort:e.target.value}})} 
                            value={debounce.sort}
                        >
                            <option value="desc">Desc</option>
                            <option value="asc">Asc</option>
                        </select>
                    </div>
                    <div className='flex justify-center gap-10'>
                        <input type='text' className='input' onChange={e=>setDebounce(prevDebounce=>{return {...prevDebounce, author:e.target.value}})} placeholder='Search by Author' value={debounce.author} />
                        <input type='text' className='input' onChange={e=>setDebounce(prevDebounce=>{return {...prevDebounce, category:e.target.value}})} placeholder='Search by Category' value={debounce.category} />

                    </div>
                    <button className='btn btn-primary' type='submit'>Refreash Results &nbsp;
                    {isFetching?<ImSpinner3 />:''}
                    </button>
                    {/* TODO:: add a save preference function that would save and recall user prefered filters */}
                </form>
            </div>

            {(isLoading )? <div className='flex justify-center py-12 min-h-[60vh]'><progress className="progress w-56"></progress></div>
                : articles?.length>0? articles?.map((article, index) => (
                    <NewsArticle key={`article-${index}`} article={article} />
                )) : <div className='text-center flex justify-center py-12 min-h-[60vh]'>No news found, try adjusting your search filters</div> }  
        
        </div>
    );
};

export default NewsPage;
