type Props = { page:number; totalPages:number; onPageChange:(p:number)=>void };
export default function Pagination({page,totalPages,onPageChange}:Props){
  const pages = Array.from({length: totalPages}, (_,i)=>i+1);
  return (
    <div className="pagination">
      <button disabled={page<=1} onClick={()=>onPageChange(page-1)}>Prev</button>
      {pages.map(p=> <button key={p} disabled={p===page} onClick={()=>onPageChange(p)}>{p}</button>)}
      <button disabled={page>=totalPages} onClick={()=>onPageChange(page+1)}>Next</button>
    </div>
  );
}
