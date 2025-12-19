---
permalink: /
title: "Nicolás Izquierdo – Political Scientist"
description: "Official academic profile of Nicolás Izquierdo, Master's student in Social Sciences at IC3JM, with degrees in Law and Political Science from UC3M."
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<h1 style="
  position:absolute;
  left:-9999px;
  top:auto;
  width:1px;
  height:1px;
  overflow:hidden;
">
  Nicolás Izquierdo, Political Science, Political Scientist, Political Economy
</h1>

<figure style="margin:0;">
  <img src="marx-painting-HD.jpg"
       alt="Workers’ Delegation Before the Magistrate by Johann Peter Hasenclever"
       style="width:660px; height:200px; object-fit:cover; display:block;">
  <figcaption style="font-size:0.9em; margin-top:-13px; margin-bottom:20px;">
    <span style="font-style:italic;
                 text-decoration:underline;
                 text-decoration-skip-ink:auto;">
      Workers’ Delegation Before the Magistrate</span>
    by Johann Peter Hasenclever
  </figcaption>
</figure>

Welcome! My name is Nicolás Izquierdo and I am a Master's student in Social Sciences at the 
[Carlos III–Juan March Institute (IC3JM)](https://ic3jm.es/en/postgraduates/master-degree-social-sciences/). 
I also hold both degrees in [Law (LL.B.)](https://www.uc3m.es/bachelor-degree/law) 
and [Political Science (B.A.)](https://www.uc3m.es/bachelor-degree/political-science) 
from the University Carlos III of Madrid.  

My research interests lie in comparative political economy and labor politics, encompassing issues of organized interests, contentious politics, and redistribution. I am particularly interested in how labor mobilization shapes policy outcomes and mass preferences across advanced democracies. I also study courts and legal processes, focusing on how private economic interests influence judicial decision-making.

Outside academia, I enjoy <button id="pc-link" class="link-like">political cinema</button> and <a href="https://www.chess.com/member/nicolas_izq">playing chess</a>.

You can find my full CV [here](/CV-nicolas-izquierdo-11-25.pdf).

<style>
.link-like{background:none;border:0;padding:0;color:inherit;text-decoration:underline;cursor:pointer;font:inherit}
#pc{position:absolute;z-index:9999;width:320px;max-width:92vw;background:#fff;border:1px solid rgba(0,0,0,.12);border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,.14);display:none;overflow:hidden}
#pc h{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid rgba(0,0,0,.08);background:rgba(0,0,0,.02)}
#pc h span{font-size:12px;color:rgba(0,0,0,.6)}
#pc h button{border:0;background:none;font-size:18px;cursor:pointer;color:rgba(0,0,0,.6)}
#pc b{display:grid;grid-template-columns:92px 1fr;gap:12px;padding:12px}
#pc img{width:92px;height:128px;object-fit:cover;border-radius:10px;background:rgba(0,0,0,.05)}
#pc t{font-size:14.5px;font-weight:600;display:block;margin-bottom:6px}
#pc m{font-size:12.5px;color:rgba(0,0,0,.65)}
</style>

<div id="pc" role="dialog" aria-label="Daily political cinema recommendation">
  <h><span>Today’s pick</span><button id="pcx" type="button" aria-label="Close">×</button></h>
  <b id="pcb"><span style="font-size:13px;color:rgba(0,0,0,.7)">Loading…</span></b>
</div>

<script>
const M=[
{id:"Billy Elliot",u:"https://en.wikipedia.org/wiki/Billy_Elliot"},
{id:"Bloody Sunday",u:"https://en.wikipedia.org/wiki/Bloody_Sunday_(2002_film)"},
{id:"Made in Dagenham",u:"https://en.wikipedia.org/wiki/Made_in_Dagenham"},
{id:"Tierra y libertad",u:"https://en.wikipedia.org/wiki/Land_and_Freedom"},
{id:"The Wind That Shakes the Barley",u:"https://en.wikipedia.org/wiki/The_Wind_That_Shakes_the_Barley_(film)"},
{id:"La battaglia di Algeri",u:"https://en.wikipedia.org/wiki/The_Battle_of_Algiers"},
{id:"Октябрь (Десять дней, которые потрясли мир)",u:"https://en.wikipedia.org/wiki/October_(1928_film)"},
{id:"Броненосец «Потёмкин»",u:"https://en.wikipedia.org/wiki/Battleship_Potemkin"},
{id:"Cidade de Deus",u:"https://en.wikipedia.org/wiki/City_of_God_(2002_film)"},
{id:"Иди и смотри",u:"https://en.wikipedia.org/wiki/Come_and_See"},
{id:"Soy Cuba",u:"https://en.wikipedia.org/wiki/I_Am_Cuba"},
{id:"Attica",u:"https://en.wikipedia.org/wiki/Attica_(film)"},
{id:"Puerto Rico",u:"https://en.wikipedia.org/wiki/Puerto_Rico_(film)"},
{id:"La hora de los hornos",u:"https://en.wikipedia.org/wiki/The_Hour_of_the_Furnaces"},
{id:"Castro’s Spies",u:"https://en.wikipedia.org/wiki/Castro%27s_Spies"},
{id:"They Do Not Exist",u:"https://en.wikipedia.org/wiki/They_Do_Not_Exist"},
{id:"Тіні забутих предків",u:"https://en.wikipedia.org/wiki/Shadows_of_Forgotten_Ancestors"},
{id:"Above Us the Earth",u:"https://en.wikipedia.org/wiki/Above_Us_the_Earth"},
{id:"On the Same River",u:"https://en.wikipedia.org/wiki/On_the_Same_River"},
{id:"The Debt",u:"https://en.wikipedia.org/wiki/The_Debt_(1988_film)"},
{id:"Cuba 30 Anni Dopo",u:"https://en.wikipedia.org/wiki/Cuba_30_Anni_Dopo"},
{id:"Non dago Mikel?",u:"https://en.wikipedia.org/wiki/Where_Is_Mikel%3F"},
{id:"Salvador (Puig Antich)",u:"https://en.wikipedia.org/wiki/Salvador_(film)"},
{id:"Pada",u:"https://en.wikipedia.org/wiki/Pada_(film)"},
{id:"Reds",u:"https://en.wikipedia.org/wiki/Reds_(film)"},
{id:"Hunger",u:"https://en.wikipedia.org/wiki/Hunger_(2008_film)"},
{id:"Snowpiercer",u:"https://en.wikipedia.org/wiki/Snowpiercer"},
{id:"La Haine",u:"https://en.wikipedia.org/wiki/La_Haine"},
{id:"Vladimir and Rosa",u:"https://en.wikipedia.org/wiki/Vladimir_and_Rosa"},
{id:"Rosa Luxemburg",u:"https://en.wikipedia.org/wiki/Rosa_Luxemburg_(film)"},
{id:"Salt of the Earth",u:"https://en.wikipedia.org/wiki/Salt_of_the_Earth_(1954_film)"},
{id:"Black Panthers",u:"https://en.wikipedia.org/wiki/Black_Panthers_(film)"},
{id:"South of the Border",u:"https://en.wikipedia.org/wiki/South_of_the_Border_(2009_film)"},
{id:"The Coconut Revolution",u:"https://en.wikipedia.org/wiki/The_Coconut_Revolution"},
{id:"The Black Power Mixtape 1967–1975",u:"https://en.wikipedia.org/wiki/The_Black_Power_Mixtape_1967%E2%80%931975"},
{id:"Hasta la Victoria Siempre",u:"https://en.wikipedia.org/wiki/Hasta_la_Victoria_Siempre"},
{id:"Novecento",u:"https://en.wikipedia.org/wiki/1900_(film)"},
{id:"White Dog",u:"https://en.wikipedia.org/wiki/White_Dog_(film)"},
{id:"Ogro",u:"https://en.wikipedia.org/wiki/Operation_Ogre"},
{id:"La Commune (Paris, 1871)",u:"https://en.wikipedia.org/wiki/La_Commune_(Paris,_1871)"},
{id:"Paul Goodman Changed My Life",u:"https://en.wikipedia.org/wiki/Paul_Goodman_Changed_My_Life"},
{id:"Matewan",u:"https://en.wikipedia.org/wiki/Matewan"},
{id:"La Chinoise",u:"https://en.wikipedia.org/wiki/La_Chinoise"},
{id:"Innocence",u:"https://en.wikipedia.org/wiki/Innocence_(2018_film)"},
{id:"Gaza Fights for Freedom",u:"https://en.wikipedia.org/wiki/Gaza_Fights_for_Freedom"},
{id:"Triumph Over Violence",u:"https://en.wikipedia.org/wiki/Triumph_Over_Violence"},
{id:"I Am Cuba, the Siberian Mammoth",u:"https://en.wikipedia.org/wiki/I_Am_Cuba,_the_Siberian_Mammoth"},
{id:"The Legend of Rita",u:"https://en.wikipedia.org/wiki/The_Legend_of_Rita"},
{id:"Camp de Thiaroye",u:"https://en.wikipedia.org/wiki/Camp_de_Thiaroye"},
{id:"Ленин в Октябре",u:"https://en.wikipedia.org/wiki/Lenin_in_October"},
{id:"Стачка",u:"https://en.wikipedia.org/wiki/Strike_(1925_film)"},
{id:"Malcolm X",u:"https://en.wikipedia.org/wiki/Malcolm_X_(film)"},
{id:"The Revolution Will Not Be Televised",u:"https://en.wikipedia.org/wiki/The_Revolution_Will_Not_Be_Televised_(film)"},
{id:"The Spirit of ’45",u:"https://en.wikipedia.org/wiki/The_Spirit_of_%2745"},
{id:"Yawar Mallku",u:"https://en.wikipedia.org/wiki/Blood_of_the_Condor"},
{id:"Los Canadienses",u:"https://en.wikipedia.org/wiki/Los_Canadienses"},
{id:"Until Tomorrow, Comrades",u:"https://en.wikipedia.org/wiki/Until_Tomorrow,_Comrades"},
{id:"Le jeune Karl Marx",u:"https://en.wikipedia.org/wiki/The_Young_Karl_Marx"},
{id:"Platform",u:"https://en.wikipedia.org/wiki/Platform_(2000_film)"},
{id:"Freedomfighters",u:"https://en.wikipedia.org/wiki/Freedomfighters"},
{id:"Red Army/PFLP: Declaration of World War",u:"https://en.wikipedia.org/wiki/Red_Army/PFLP:_Declaration_of_World_War"},
{id:"Judas and the Black Messiah",u:"https://en.wikipedia.org/wiki/Judas_and_the_Black_Messiah"},
{id:"Kanehsatake: 270 Years of Resistance",u:"https://en.wikipedia.org/wiki/Kanehsatake:_270_Years_of_Resistance"},
{id:"Class of Struggle",u:"https://en.wikipedia.org/wiki/Class_of_Struggle"},
{id:"The Fall of Communism as Seen in Gay Pornography",u:"https://en.wikipedia.org/wiki/The_Fall_of_Communism_as_Seen_in_Gay_Pornography"},
{id:"Property Is No Longer a Theft",u:"https://en.wikipedia.org/wiki/Property_Is_No_Longer_a_Theft"},
{id:"Four Days in September",u:"https://en.wikipedia.org/wiki/Four_Days_in_September"},
{id:"Black Is… Black Ain’t",u:"https://en.wikipedia.org/wiki/Black_Is..._Black_Ain%27t"},
{id:"Confessions of a Congressman",u:"https://en.wikipedia.org/wiki/Confessions_of_a_Congressman"},
{id:"Angela Davis: Portrait of a Revolutionary",u:"https://en.wikipedia.org/wiki/Angela_Davis:_Portrait_of_a_Revolutionary"},
{id:"Those Whom Death Refused",u:"https://en.wikipedia.org/wiki/Those_Whom_Death_Refused"},
{id:"Freedom Road",u:"https://en.wikipedia.org/wiki/Freedom_Road"},
{id:"Return to Haifa",u:"https://en.wikipedia.org/wiki/Return_to_Haifa_(film)"},
{id:"Eyes of the Rainbow",u:"https://en.wikipedia.org/wiki/Eyes_of_the_Rainbow"},
{id:"Marxist Poetry: The Making of The Battle of Algiers",u:"https://en.wikipedia.org/wiki/Marxist_Poetry:_The_Making_of_The_Battle_of_Algiers"},
{id:"Riso amaro",u:"https://en.wikipedia.org/wiki/Bitter_Rice"},
{id:"The Red Detachment of Women",u:"https://en.wikipedia.org/wiki/The_Red_Detachment_of_Women"},
{id:"Black and Cuba",u:"https://en.wikipedia.org/wiki/Black_and_Cuba"},
{id:"Poble rebel",u:"https://en.wikipedia.org/wiki/Poble_rebel"},
{id:"Profit Motive and the Whispering Wind",u:"https://en.wikipedia.org/wiki/Profit_Motive_and_the_Whispering_Wind"},
{id:"Jamila, the Algerian",u:"https://en.wikipedia.org/wiki/Jamila,_the_Algerian"},
{id:"Человек с киноаппаратом",u:"https://en.wikipedia.org/wiki/Man_with_a_Movie_Camera"},
{id:"A Corner in Wheat",u:"https://en.wikipedia.org/wiki/A_Corner_in_Wheat"},
{id:"Старое и новое",u:"https://en.wikipedia.org/wiki/The_General_Line"},
{id:"Jenin, Jenin",u:"https://en.wikipedia.org/wiki/Jenin,_Jenin"},
{id:"The Motorcycle Diaries",u:"https://en.wikipedia.org/wiki/The_Motorcycle_Diaries"},
{id:"The Brickmakers",u:"https://en.wikipedia.org/wiki/The_Brickmakers"},
{id:"La batalla de Chile",u:"https://en.wikipedia.org/wiki/The_Battle_of_Chile"},
{id:"City Girl",u:"https://en.wikipedia.org/wiki/City_Girl_(film)"},
{id:"A Fuga",u:"https://en.wikipedia.org/wiki/A_Fuga"},
{id:"The Darty Report",u:"https://en.wikipedia.org/wiki/The_Darty_Report"},
{id:"The Third Part of the Night",u:"https://en.wikipedia.org/wiki/The_Third_Part_of_the_Night"},
{id:"La Planète sauvage",u:"https://en.wikipedia.org/wiki/Fantastic_Planet"},
{id:"Fresa y chocolate",u:"https://en.wikipedia.org/wiki/Strawberry_and_Chocolate"},
{id:"Sambizanga",u:"https://en.wikipedia.org/wiki/Sambizanga"},
{id:"79 Springs",u:"https://en.wikipedia.org/wiki/79_Springs"},
{id:"Cecilia",u:"https://en.wikipedia.org/wiki/Cecilia_(film)"},
{id:"Lucía",u:"https://en.wikipedia.org/wiki/Luc%C3%ADa_(film)"},
{id:"Escape from Segovia",u:"https://en.wikipedia.org/wiki/Escape_from_Segovia"},
{id:"The Forgotten War",u:"https://en.wikipedia.org/wiki/The_Forgotten_War_(film)"},
{id:"The Atomic Café",u:"https://en.wikipedia.org/wiki/The_Atomic_Caf%C3%A9"},
{id:"A Bug’s Life",u:"https://en.wikipedia.org/wiki/A_Bug%27s_Life"},
{id:"The Third Generation",u:"https://en.wikipedia.org/wiki/The_Third_Generation_(film)"},
{id:"¡Las Sandinistas!",u:"https://en.wikipedia.org/wiki/%C2%A1Las_Sandinistas!"},
{id:"Concerning Violence",u:"https://en.wikipedia.org/wiki/Concerning_Violence"},
{id:"They Fought for Their Motherland",u:"https://en.wikipedia.org/wiki/They_Fought_for_Their_Motherland"},
{id:"Le grain et l’ivraie",u:"https://en.wikipedia.org/wiki/Grain_in_Ear"},
{id:"South",u:"https://en.wikipedia.org/wiki/South_(1999_film)"},
{id:"Deus Pátria Autoridade",u:"https://en.wikipedia.org/wiki/Deus_P%C3%A1tria_Autoridade"},
{id:"기생충",u:"https://en.wikipedia.org/wiki/Parasite_(film)"},
{id:"万引き家族",u:"https://en.wikipedia.org/wiki/Shoplifters"},
{id:"Trop tôt, trop tard",u:"https://en.wikipedia.org/wiki/Too_Early_/_Too_Late"},
{id:"Punishment Park",u:"https://en.wikipedia.org/wiki/Punishment_Park"},
{id:"Tout va bien",u:"https://en.wikipedia.org/wiki/Tout_Va_Bien"},
{id:"Летят журавли",u:"https://en.wikipedia.org/wiki/The_Cranes_Are_Flying"},
{id:"Under the Open Sky",u:"https://en.wikipedia.org/wiki/Under_the_Open_Sky"},
{id:"Scenes from the Class Struggle in Portugal",u:"https://en.wikipedia.org/wiki/Scenes_from_the_Class_Struggle_in_Portugal"},
{id:"The Edge of Democracy",u:"https://en.wikipedia.org/wiki/The_Edge_of_Democracy"},
{id:"Paradise Now",u:"https://en.wikipedia.org/wiki/Paradise_Now"},
{id:"The Ruling Class",u:"https://en.wikipedia.org/wiki/The_Ruling_Class_(film)"},
{id:"Suite Habana",u:"https://en.wikipedia.org/wiki/Suite_Habana"},
{id:"The Navigators",u:"https://en.wikipedia.org/wiki/The_Navigators_(film)"},
{id:"The Act of Killing",u:"https://en.wikipedia.org/wiki/The_Act_of_Killing"},
{id:"Sorry to Bother You",u:"https://en.wikipedia.org/wiki/Sorry_to_Bother_You"},
{id:"Bread and Roses",u:"https://en.wikipedia.org/wiki/Bread_and_Roses_(2000_film)"},
{id:"Memorias del subdesarrollo",u:"https://en.wikipedia.org/wiki/Memories_of_Underdevelopment"},
{id:"Machuca",u:"https://en.wikipedia.org/wiki/Machuca"},
{id:"Let the Fire Burn",u:"https://en.wikipedia.org/wiki/Let_the_Fire_Burn"},
{id:"Sardar Udham",u:"https://en.wikipedia.org/wiki/Sardar_Udham"},
{id:"Marighella",u:"https://en.wikipedia.org/wiki/Marighella_(film)"},
{id:"The House I Live In",u:"https://en.wikipedia.org/wiki/The_House_I_Live_In_(2012_film)"},
{id:"Klassenverhältnisse",u:"https://en.wikipedia.org/wiki/Class_Relations"},
{id:"Germania anno zero",u:"https://en.wikipedia.org/wiki/Germany,_Year_Zero"},
{id:"State of Siege",u:"https://en.wikipedia.org/wiki/State_of_Siege_(film)"},
{id:"Che, Part One",u:"https://en.wikipedia.org/wiki/Che_(2008_film)"},
{id:"Che, Part Two",u:"https://en.wikipedia.org/wiki/Che:_Part_Two"},
{id:"Exterminate All the Brutes",u:"https://en.wikipedia.org/wiki/Exterminate_All_the_Brutes"},
{id:"La mort de Guillem",u:"https://en.wikipedia.org/wiki/The_Death_of_Guillem"},
{id:"I compagni",u:"https://en.wikipedia.org/wiki/The_Organizer"},
{id:"Még kér a nép",u:"https://en.wikipedia.org/wiki/Red_Psalm"},
{id:"La classe operaia va in paradiso",u:"https://en.wikipedia.org/wiki/The_Working_Class_Goes_to_Heaven"},
{id:"Sátántangó",u:"https://en.wikipedia.org/wiki/S%C3%A1t%C3%A1ntang%C3%B3"}
];

const q=s=>document.querySelector(s),
L=q("#pc-link"),P=q("#pc"),B=q("#pcb"),X=q("#pcx");

const key=()=>{const d=new Date();return d.getUTCFullYear()+""+(d.getUTCMonth()+1)+d.getUTCDate()},
idx=s=>{let h=0;for(let c of s)h=(h<<5)-h+c.charCodeAt(0);return Math.abs(h)%M.length},
pick=()=>M[idx(key())];

const api=u=>`https://en.wikipedia.org/api/rest_v1/page/summary/${u.split("/").pop()}`,
yr=s=>(s||"").match(/\b(18|19|20)\d{2}\b/)?.[0];

const place=()=>{
  const r=L.getBoundingClientRect();
  P.style.left=r.left+scrollX+"px";
  P.style.top=r.bottom+scrollY+8+"px";
};

async function show(){
  P.style.display="block"; place();
  B.innerHTML='<span style="font-size:13px;color:rgba(0,0,0,.7)">Loading…</span>';
  const m=pick(); let d=null;
  try{const r=await fetch(api(m.u)); if(r.ok)d=await r.json()}catch{}
  const t=(d&&d.title)||m.id, y=yr(d?.extract), img=d?.thumbnail?.source, meta=d?.description||"";
  B.innerHTML=(img?`<img src="${img}" alt="Poster for ${t}">`:`<div style="width:92px;height:128px;border-radius:10px;background:rgba(0,0,0,.05)"></div>`)
    +`<div><t>${t}${y?` (${y})`:""}</t><m>${meta}</m></div>`;
  place();
}

L.addEventListener("click",e=>{e.preventDefault();P.style.display==="block"?P.style.display="none":show();});
X.addEventListener("click",()=>P.style.display="none");
document.addEventListener("click",e=>{if(P.style.display==="block"&&!P.contains(e.target)&&e.target!==L)P.style.display="none";});
document.addEventListener("keydown",e=>{if(e.key==="Escape")P.style.display="none";});
addEventListener("resize",()=>P.style.display==="block"&&place());
</script>
