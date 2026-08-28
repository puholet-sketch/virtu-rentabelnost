async function boot(){
  const data = await (await fetch("data/summary.json")).json();
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  set("gen-date", data.generated||"");
  set("latest-period", data.latest_period||"—");
  const t=data.latest_totals||{};
  const fmt=v=>{if(v==null)return"—";const n=Number(v);if(Math.abs(n)>=1e6)return(n/1e6).toFixed(2)+" млн ₽";return Math.round(n).toLocaleString("ru-RU")+" ₽";};
  set("kpi-rev", fmt(t.revenues)); set("kpi-profit", fmt(t.profit)); set("kpi-exp", fmt(t.expenses));
  const m=t.revenues?(t.profit/t.revenues*100):null; set("kpi-margin", m==null?"—":m.toFixed(1)+" %");
  const esc=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
  const tb=document.querySelector("#top-table tbody");
  (data.top_by_revenue||[]).forEach(p=>{const tr=document.createElement("tr");tr.innerHTML=`<td>${esc(p.name)}</td><td class="num">${fmt(p.revenues)}</td><td class="num">${fmt(p.profit)}</td><td class="num">${p.margin_pct==null?"—":p.margin_pct+" %"}</td>`;tb.appendChild(tr);});
  const mb=document.querySelector("#months-table tbody");
  (data.months||[]).forEach(mo=>{const tt=mo.totals||{};const tr=document.createElement("tr");tr.innerHTML=`<td>${esc(mo.period||mo.source)}</td><td class="num">${fmt(tt.revenues)}</td><td class="num">${fmt(tt.profit)}</td><td class="num">${(mo.projects||[]).length}</td>`;mb.appendChild(tr);});
}
boot();