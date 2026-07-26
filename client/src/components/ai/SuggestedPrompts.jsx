const prompts = [

"🚀 Portfolio Website",

"🍔 Restaurant Website",

"🛒 Ecommerce Store",

"🤖 AI SaaS Landing",

"📊 Admin Dashboard",

"🎓 College Website",

];

export default function SuggestedPrompts({

onSelect,

}) {

return (

<div className="prompt-list">

{prompts.map((item)=>(

<button

key={item.title}

onClick={()=>onSelect(item)}

>

{item}

</button>

))}

</div>

);

}