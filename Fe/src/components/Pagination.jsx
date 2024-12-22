import React from "react";

function buttons(page, totalPage,setPage) {
  let html = [];
  
  if (totalPage<=3+1) {
    for (let i=1;i<=totalPage;i++) {
        html.push(<a onClick={()=>setPage(i)} className={i==page ? 'active': ''}>{i}</a>)
     }
    return html;
  }
  if (page>3 || page>totalPage-3) {
    html.push(<a onClick={()=>setPage(1)}>1</a>);
    html.push(<a>....</a>);
  }
  let start,end;
  if (page%3==0) {
     end=page;
     start=page-3+1;
  } else {
     start=Math.floor(page/3)*3+1;
     end=Math.min(start+3-1,totalPage);
  }
  if (page>totalPage-3) {
    for (let i=totalPage-3+1;i<=totalPage;i++) {
        html.push(<a onClick={()=>setPage(i)} className={i==page ? 'active': ''}>{i}</a>)
     }
    return html;
  }
  for (let i=start;i<=end;i++) {
    html.push(<a onClick={()=>setPage(i)} className={i==page ? 'active': ''}>{i}</a>)
  }
  if (page<=totalPage-3) {
    if (end<totalPage-1) html.push(<a>...</a>);
    html.push(<a onClick={()=>setPage(totalPage)}>{totalPage}</a>);
  }
  return html;
}

function Pagination({ totalPage, page, setPage }) {
  return (
    <div className="pagination">
      <a onClick={() => setPage(Math.max(1, page - 1))} className="prev">
        « Previous
      </a>
      {buttons(page,totalPage,setPage)}
      <a
        onClick={() => setPage(Math.min(totalPage, page + 1))}
        className="next"
      >
        Next »
      </a> 

      <br/>
      
    </div>
  );
}

export default Pagination;
