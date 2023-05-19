import { useState } from "react";

const NewsArticle = ({ article }) => {
    const { title, content, author, image, source, pubDate, category } = article;
    const [ state , setState ] = useState({ showMore: false });
    const date = new Date(pubDate);
    const formattedDate = date.toLocaleString({
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

    const trimmedContent = content?.slice(0, 400);
    const remainingContent = content?.slice(400);

  
    return (
      <article className="border rounded-lg bg-white m-2 px-4">
        <div className="hero min-h-fit">
            <div className="hero-content flex-col lg:flex-row lg:justify-between">
                <img src={image} className=" rounded-lg shadow-2xl lg:w-1/3" />
                <div className="lg:w-2/3">
                    <h2 className="text-3xl font-bold mt-4 mb-1">
                    {title}
                    </h2>
                    <p className="py-6">
                    {trimmedContent}
                    {(!state.showMore && remainingContent) && (
                    <button className="btn btn-accent btn-xs mx-4" onClick={() => setState({ showMore: true })}>Read More</button>
                    )}
                    {state.showMore && (
                    <>
                        {remainingContent}
                        <button className="btn btn-accent btn-outline btn-xs mx-4" onClick={() => setState({ showMore: false })}>Read Less</button>
                    </>
                    )}
                    </p>

                    <div className="flex justify-between my-4">
                        <div className="badge badge-secondary mb-4">{formattedDate}</div>
                        <div className="badge badge-secondary mb-4">{author}</div>
                    </div>
                    <div className="flex flex-wrap gap-1 text-sm">
                        Categories: 
                        {category && typeof category == 'array'?
                        category?.map(cat=>{return <div key={`category-${cat}`} className="badge badge-primary mb-4">{cat}</div>})
                        :(typeof category == 'string')?category:''
                    }
                    </div>
                    <div className="text-sm mb-2 text-end">
                        Source: {source}
                    </div>
                </div>
            </div>
        </div>
      </article>
    );
  };
  
  export default NewsArticle;