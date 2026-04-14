// Set these before running: node seed-communities.js
const token = process.env.SUPABASE_API_TOKEN || "";
const ref = process.env.SUPABASE_PROJECT_REF || "";

const communities = [
  // ─── Ontario — Haudenosaunee / Mohawk ───
  ["Six Nations of the Grand River","six-nations-grand-river","ON","Haudenosaunee","Mohawk / Cayuga","She:kon",30000,"Six Nations Reserve No. 40",43.0586,-80.1159,false,"local"],
  ["Akwesasne","akwesasne","ON","Haudenosaunee (Mohawk)","Mohawk","She:kon",12000,"Akwesasne Reserve",44.9981,-74.728,false,"local"],
  ["Tyendinaga Mohawk Territory","tyendinaga-mohawk","ON","Haudenosaunee (Mohawk)","Mohawk","She:kon",8000,"Tyendinaga Mohawk Territory",44.1631,-77.1025,false,"local"],
  ["Mohawks of the Bay of Quinte","mohawks-bay-quinte","ON","Haudenosaunee (Mohawk)","Mohawk","She:kon",9500,"Tyendinaga Territory",44.18,-77.08,false,"local"],
  ["Wahta Mohawks","wahta-mohawks","ON","Haudenosaunee (Mohawk)","Mohawk","She:kon",900,"Wahta Mohawk Territory",45.07,-79.61,false,"local"],
  ["Oneida Nation of the Thames","oneida-thames","ON","Haudenosaunee (Oneida)","Oneida","Shekólih",6000,"Oneida Settlement",42.83,-81.37,false,"local"],
  // ─── Ontario — Anishinaabe Southern ───
  ["Mississaugas of the Credit First Nation","mississaugas-credit","ON","Anishinaabe (Mississauga)","Ojibwe","Boozhoo",2600,"New Credit Reserve",43.08,-80.12,false,"local"],
  ["Mississaugas of Scugog Island","mississaugas-scugog","ON","Anishinaabe (Mississauga)","Ojibwe","Boozhoo",700,"Scugog Island Reserve",44.2,-78.89,false,"local"],
  ["Hiawatha First Nation","hiawatha","ON","Anishinaabe (Mississauga)","Ojibwe","Boozhoo",900,"Hiawatha Reserve",44.35,-78.26,false,"local"],
  ["Curve Lake First Nation","curve-lake","ON","Anishinaabe (Mississauga)","Ojibwe","Boozhoo",2500,"Curve Lake Reserve",44.48,-78.37,false,"local"],
  ["Alderville First Nation","alderville","ON","Anishinaabe (Mississauga)","Ojibwe","Boozhoo",1200,"Alderville Reserve",44.16,-78.09,false,"local"],
  ["Rama First Nation","rama","ON","Anishinaabe (Chippewa)","Ojibwe","Boozhoo",2100,"Rama Reserve",44.63,-79.32,false,"local"],
  ["Georgina Island First Nation","georgina-island","ON","Anishinaabe (Chippewa)","Ojibwe","Boozhoo",600,"Georgina Island Reserve",44.35,-79.35,false,"local"],
  ["Beausoleil First Nation","beausoleil","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2500,"Christian Island Reserve",44.83,-80.2,false,"regional"],
  // ─── Ontario — Bruce Peninsula / Saugeen ───
  ["Chippewas of Nawash Unceded First Nation","chippewas-nawash","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2700,"Cape Croker Reserve",44.89,-81.05,false,"regional"],
  ["Saugeen First Nation","saugeen","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",3500,"Saugeen Reserve No. 29",44.55,-81.28,false,"regional"],
  // ─── Ontario — Southwestern ───
  ["Chippewas of Kettle and Stony Point","kettle-stony-point","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2500,"Kettle and Stony Point Reserve",43.21,-81.77,false,"local"],
  ["Chippewas of the Thames First Nation","chippewas-thames","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2800,"Chippewa of the Thames Reserve",42.82,-81.46,false,"local"],
  ["Aamjiwnaang First Nation","aamjiwnaang","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2700,"Sarnia Reserve",42.95,-82.39,false,"local"],
  ["Walpole Island First Nation (Bkejwanong)","walpole-island","ON","Anishinaabe (Ojibwe/Odawa/Potawatomi)","Ojibwe","Boozhoo",4500,"Walpole Island Reserve",42.58,-82.5,false,"local"],
  ["Caldwell First Nation","caldwell","ON","Anishinaabe (Potawatomi)","Potawatomi","Bozho",400,"Point Pelee Area",41.96,-82.52,false,"local"],
  // ─── Ontario — Lenape (Delaware) ───
  ["Delaware Nation at Moraviantown","delaware-moraviantown","ON","Lenape (Delaware)","Lenape","He",1300,"Moravian Reserve",42.64,-81.9,false,"local"],
  ["Munsee-Delaware Nation","munsee-delaware","ON","Lenape (Munsee-Delaware)","Munsee","He",600,"Munsee-Delaware Reserve",42.82,-81.43,false,"local"],
  // ─── Ontario — Parry Sound / Muskoka ───
  ["Wasauksing First Nation","wasauksing","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1100,"Parry Island Reserve",45.33,-80.05,false,"local"],
  ["Shawanaga First Nation","shawanaga","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",550,"Shawanaga Reserve",45.49,-80.12,false,"local"],
  ["Magnetawan First Nation","magnetawan","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",350,"Magnetawan Reserve",45.55,-79.86,false,"local"],
  ["Henvey Inlet First Nation","henvey-inlet","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",700,"Henvey Inlet Reserve",45.61,-80.32,false,"regional"],
  ["Moose Deer Point First Nation","moose-deer-point","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",400,"Moose Deer Point Reserve",45.12,-79.82,false,"local"],
  ["Dokis First Nation","dokis","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",500,"Dokis Reserve",46.14,-80.08,false,"local"],
  // ─── Ontario — Algonquin ───
  ["Pikwakanagan (Golden Lake)","pikwakanagan","ON","Algonquin","Algonquin","Kwé",2700,"Golden Lake Reserve",45.53,-77.29,false,"local"],
  ["Algonquins of Pikwakanagan","algonquins-pikwakanagan","ON","Algonquin","Algonquin","Kwé",2500,"Golden Lake Reserve No. 39",45.54,-77.3,false,"local"],
  ["Shabot Obaadjiwan First Nation","shabot-obaadjiwan","ON","Algonquin","Algonquin","Kwé",300,"Sharbot Lake Area",44.77,-76.68,false,"local"],
  ["Antoine First Nation","antoine","ON","Algonquin","Algonquin","Kwé",200,"Antoine Reserve",47.35,-79.7,false,"regional"],
  // ─── Ontario — Nipissing / Sudbury ───
  ["Nipissing First Nation","nipissing","ON","Anishinaabe","Ojibwe","Boozhoo",2700,"Nipissing Reserve",46.31,-79.53,false,"local"],
  ["Temagami First Nation","temagami","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",800,"Bear Island Reserve",46.98,-80.07,false,"regional"],
  ["Atikameksheng Anishnawbek","atikameksheng","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2800,"Whitefish Lake Reserve",46.37,-81.27,false,"local"],
  ["Wahnapitae First Nation","wahnapitae","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",400,"Wahnapitae Reserve",46.6,-80.78,false,"local"],
  // ─── Ontario — Manitoulin Island ───
  ["Wikwemikong","wikwemikong","ON","Anishinaabe (Odawa/Ojibwe/Potawatomi)","Ojibwe","Boozhoo",8000,"Wikwemikong Unceded Indian Reserve",45.723,-81.705,false,"regional"],
  ["M'Chigeeng First Nation","mchigeeng","ON","Anishinaabe (Odawa)","Ojibwe","Boozhoo",3000,"M'Chigeeng Reserve",45.82,-82.06,false,"regional"],
  ["Aundeck Omni Kaning First Nation","aundeck-omni-kaning","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",800,"Sucker Creek Reserve",45.8,-81.92,false,"regional"],
  ["Sheguiandah First Nation","sheguiandah","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",300,"Sheguiandah Reserve",45.87,-81.87,false,"regional"],
  ["Zhiibaahaasing First Nation","zhiibaahaasing","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",100,"Cockburn Island Reserve",45.98,-83.31,true,"remote"],
  // ─── Ontario — North Shore / Algoma ───
  ["Whitefish River First Nation","whitefish-river","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1100,"Whitefish River Reserve",45.96,-81.58,false,"regional"],
  ["Sagamok Anishnawbek","sagamok","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",3200,"Sagamok Reserve",46.15,-81.74,false,"regional"],
  ["Serpent River First Nation","serpent-river","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1000,"Serpent River Reserve",46.22,-82.3,false,"regional"],
  ["Thessalon First Nation","thessalon","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",500,"Thessalon Reserve",46.25,-83.55,false,"regional"],
  ["Mississauga First Nation","mississauga-fn","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1200,"Mississagi River Reserve",46.3,-82.75,false,"regional"],
  ["Garden River First Nation","garden-river","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",3000,"Garden River Reserve",46.52,-84.09,false,"regional"],
  ["Batchewana First Nation","batchewana","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",3200,"Rankin Reserve",46.77,-84.4,false,"regional"],
  // ─── Ontario — North Shore / Superior ───
  ["Michipicoten First Nation","michipicoten","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",900,"Michipicoten Reserve",47.93,-84.88,false,"regional"],
  ["Pic Mobert First Nation","pic-mobert","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",700,"Pic Mobert Reserve",48.69,-85.69,false,"regional"],
  ["Biigtigong Nishnaabeg (Pic River)","biigtigong","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1400,"Heron Bay Reserve",48.74,-86.34,false,"regional"],
  ["Pays Plat First Nation","pays-plat","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",200,"Pays Plat Reserve",48.82,-87.49,false,"regional"],
  ["Red Rock Indian Band (Lake Helen)","red-rock","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1100,"Lake Helen Reserve",48.94,-87.26,false,"regional"],
  ["Fort William First Nation","fort-william","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2500,"Fort William Reserve",48.36,-89.32,false,"regional"],
  ["Animbiigoo Zaagi''igan Anishinaabek","animbiigoo-zaagiigan","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",300,"Beardmore Reserve",49.6,-87.97,false,"regional"],
  ["Ginoogaming First Nation","ginoogaming","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",600,"Long Lake Reserve",49.88,-86.31,false,"regional"],
  ["Long Lake No. 58 First Nation","long-lake-58","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",700,"Long Lake Reserve No. 58",49.78,-86.45,false,"regional"],
  ["Aroland First Nation","aroland","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",800,"Aroland Reserve",50.23,-86.96,true,"remote"],
  ["Constance Lake First Nation","constance-lake","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe / Cree","Boozhoo",1800,"Constance Lake Reserve",49.88,-83.57,true,"remote"],
  ["Marten Falls First Nation","marten-falls","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe / Cree","Boozhoo",600,"Marten Falls Reserve",51.34,-85.8,true,"remote"],
  // ─── Ontario — Timiskaming / Northeast ───
  ["Matachewan First Nation","matachewan","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",400,"Matachewan Reserve",47.95,-80.65,false,"regional"],
  ["Mattagami First Nation","mattagami","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",500,"Mattagami Reserve",47.58,-81.48,false,"regional"],
  ["Flying Post First Nation","flying-post","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe / Cree","Boozhoo",300,"Flying Post Reserve",47.82,-82.0,false,"regional"],
  ["Beaverhouse First Nation","beaverhouse","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",400,"Kirkland Lake Area",48.14,-80.04,false,"regional"],
  ["Wahgoshig First Nation","wahgoshig","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe / Cree","Boozhoo",350,"Wahgoshig Reserve",49.13,-80.67,false,"regional"],
  ["Chapleau Ojibwe First Nation","chapleau-ojibwe","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",350,"Chapleau Reserve",47.83,-83.39,false,"regional"],
  ["Brunswick House First Nation","brunswick-house","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe / Cree","Boozhoo",400,"Brunswick House Reserve",47.81,-82.38,false,"regional"],
  ["Missanabie Cree First Nation","missanabie-cree","ON","Cree","Cree","Wachiya",400,"Missanabie Area",48.05,-83.53,false,"regional"],
  // ─── Ontario — Rainy River / Treaty 3 ───
  ["Rainy River First Nations","rainy-river","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1100,"Rainy River Reserve",48.72,-94.57,false,"regional"],
  ["Couchiching First Nation","couchiching","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2400,"Couchiching Reserve",48.79,-93.37,false,"regional"],
  ["Naicatchewenin First Nation","naicatchewenin","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",400,"Naicatchewenin Reserve",48.75,-93.6,false,"regional"],
  ["Nigigoonsiminikaaning First Nation","nigigoonsiminikaaning","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",400,"Red Gut Reserve",48.81,-93.42,false,"regional"],
  ["Mitaanjigamiing First Nation","mitaanjigamiing","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",250,"Stanjikoming Reserve",48.65,-93.3,false,"regional"],
  ["Seine River First Nation","seine-river","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",500,"Seine River Reserve",48.63,-92.33,false,"regional"],
  ["Lac La Croix First Nation","lac-la-croix","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",400,"Lac La Croix Reserve",48.36,-92.15,true,"remote"],
  ["Lac des Mille Lacs First Nation","lac-des-mille-lacs","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",600,"Lac des Mille Lacs Reserve",48.85,-90.2,false,"regional"],
  ["Naotkamegwanning First Nation (Whitefish Bay)","whitefish-bay","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1100,"Whitefish Bay Reserve",49.12,-93.95,false,"regional"],
  ["Ojibways of Onigaming First Nation","onigaming","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",800,"Sabaskong Bay Reserve",49.08,-94.02,false,"regional"],
  ["Big Grassy River First Nation","big-grassy-river","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",400,"Big Grassy River Reserve",49.12,-94.43,false,"regional"],
  ["Northwest Angle No. 33 First Nation","northwest-angle-33","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",300,"Northwest Angle Reserve",49.34,-94.91,true,"remote"],
  // ─── Ontario — Kenora / Lake of the Woods ───
  ["Wauzhushk Onigum Nation","wauzhushk-onigum","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",600,"Rat Portage Reserve",49.68,-94.38,false,"regional"],
  ["Washagamis Bay First Nation","washagamis-bay","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",350,"Obashkaandagaang Reserve",49.32,-93.98,false,"regional"],
  ["Shoal Lake No. 40 First Nation","shoal-lake-40","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",600,"Shoal Lake Reserve No. 40",49.67,-95.06,true,"remote"],
  ["Iskatewizaagegan No. 39 Independent First Nation","iskatewizaagegan","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",300,"Shoal Lake Reserve No. 39",49.6,-95.12,true,"remote"],
  ["Eagle Lake First Nation","eagle-lake","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",550,"Eagle Lake Reserve",49.76,-93.4,false,"regional"],
  ["Wabigoon Lake Ojibway Nation","wabigoon-lake","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",500,"Wabigoon Lake Reserve",49.74,-92.47,false,"regional"],
  ["Wabauskang First Nation","wabauskang","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",200,"Wabauskang Reserve",50.4,-92.85,true,"remote"],
  ["Grassy Narrows First Nation (Asubpeeschoseewagong)","grassy-narrows","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1600,"Grassy Narrows Reserve",50.22,-94.58,true,"remote"],
  ["Wabaseemoong Independent Nations","wabaseemoong","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2000,"Whitedog Reserve",50.13,-94.07,true,"remote"],
  // ─── Ontario — Sioux Lookout / Patricia ───
  ["Lac Seul First Nation","lac-seul","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",3500,"Lac Seul Reserve",50.29,-92.2,true,"remote"],
  ["Cat Lake First Nation","cat-lake","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",700,"Cat Lake Reserve",51.72,-91.81,true,"remote"],
  ["Slate Falls Nation","slate-falls","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",250,"Slate Falls Reserve",51.17,-91.58,true,"remote"],
  ["Mishkeegogamang First Nation","mishkeegogamang","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1600,"Osnaburgh Reserve",51.15,-90.22,true,"remote"],
  ["Pikangikum First Nation","pikangikum","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",4000,"Pikangikum Reserve",51.81,-93.97,true,"remote"],
  ["Poplar Hill First Nation","poplar-hill","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",500,"Poplar Hill Reserve",52.08,-94.31,true,"remote"],
  // ─── Ontario — Far North (Treaty 9) ───
  ["Eabametoong First Nation (Fort Hope)","eabametoong","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2000,"Fort Hope Reserve",51.56,-87.91,true,"remote"],
  ["Neskantaga First Nation (Lansdowne House)","neskantaga","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",400,"Lansdowne House Reserve",52.24,-87.84,true,"remote"],
  ["Nibinamik First Nation (Summer Beaver)","nibinamik","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",400,"Summer Beaver Reserve",52.75,-88.53,true,"remote"],
  ["Webequie First Nation","webequie","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",900,"Webequie Reserve",52.96,-87.35,true,"remote"],
  ["North Caribou Lake First Nation (Weagamow)","north-caribou-lake","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe / Cree","Boozhoo",1000,"Weagamow Lake Reserve",52.95,-90.99,true,"remote"],
  ["Wunnumin Lake First Nation","wunnumin-lake","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",500,"Wunnumin Lake Reserve",52.89,-89.27,true,"remote"],
  ["Kingfisher Lake First Nation","kingfisher-lake","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",600,"Kingfisher Lake Reserve",53.01,-89.86,true,"remote"],
  ["Wapekeka First Nation","wapekeka","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",450,"Wapekeka Reserve",53.85,-89.57,true,"remote"],
  ["Kasabonika Lake First Nation","kasabonika-lake","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",900,"Kasabonika Lake Reserve",53.53,-88.62,true,"remote"],
  ["Sandy Lake First Nation","sandy-lake","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe / Cree","Boozhoo",3000,"Sandy Lake Reserve",53.06,-93.34,true,"remote"],
  ["Deer Lake First Nation","deer-lake","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",1100,"Deer Lake Reserve",52.63,-94.07,true,"remote"],
  ["Kee-Way-Win First Nation","keewaywin","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",500,"Kee-Way-Win Reserve",52.98,-92.74,true,"remote"],
  ["North Spirit Lake First Nation","north-spirit-lake","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",350,"North Spirit Lake Reserve",52.49,-93.04,true,"remote"],
  ["Wawakapewin First Nation","wawakapewin","ON","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",150,"Long Dog Lake",52.42,-89.68,true,"remote"],
  // ─── Ontario — Cree / Mushkegowuk ───
  ["Moose Cree First Nation","moose-cree","ON","Cree","Cree","Wachiya",4500,"Moose Factory Reserve",51.27,-80.6,true,"remote"],
  ["Attawapiskat First Nation","attawapiskat","ON","Cree","Cree","Wachiya",3500,"Attawapiskat Reserve",52.93,-82.43,true,"remote"],
  ["Fort Albany First Nation","fort-albany","ON","Cree","Cree","Wachiya",3700,"Fort Albany Reserve",52.21,-81.6,true,"remote"],
  ["Kashechewan First Nation","kashechewan","ON","Cree","Cree","Wachiya",2500,"Kashechewan Reserve",52.29,-81.67,true,"remote"],
  ["Weenusk First Nation (Peawanuck)","weenusk","ON","Cree","Cree","Wachiya",300,"Winisk Reserve",54.99,-85.44,true,"remote"],
  ["Taykwa Tagamou Nation","taykwa-tagamou","ON","Cree","Cree","Wachiya",600,"New Post Reserve",50.0,-81.68,true,"remote"],
  ["Chapleau Cree First Nation","chapleau-cree","ON","Cree","Cree","Wachiya",400,"Chapleau Cree Reserve",47.84,-83.4,false,"regional"],
  ["MoCreebec Eeyoud","mocreebec","ON","Cree","Cree","Wachiya",800,"Moose Factory",51.25,-80.61,true,"remote"],
  // ─── Ontario — Oji-Cree / Far North ───
  ["Sachigo Lake First Nation","sachigo-lake","ON","Oji-Cree","Oji-Cree","Wachiya",600,"Sachigo Lake Reserve",53.87,-92.17,true,"remote"],
  ["Bearskin Lake First Nation","bearskin-lake","ON","Oji-Cree","Oji-Cree","Wachiya",600,"Bearskin Lake Reserve",53.93,-91.05,true,"remote"],
  ["Muskrat Dam First Nation","muskrat-dam","ON","Oji-Cree","Oji-Cree","Wachiya",350,"Muskrat Dam Lake Reserve",53.44,-91.76,true,"remote"],
  ["Kitchenuhmaykoosib Inninuwug","kitchenuhmaykoosib","ON","Oji-Cree","Oji-Cree","Wachiya",1200,"Big Trout Lake Reserve",53.82,-89.87,true,"remote"],
  ["Fort Severn First Nation","fort-severn","ON","Cree","Cree","Wachiya",500,"Fort Severn Reserve",56.02,-87.65,true,"remote"],
  ["Koocheching First Nation","koocheching","ON","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",200,"Windigo Lake Reserve",51.59,-91.54,true,"remote"],
  // ─── Quebec — Mohawk ───
  ["Kahnawà:ke","kahnawake","QC","Haudenosaunee (Mohawk)","Mohawk","She:kon",11000,"Kahnawake Mohawk Territory",45.4,-73.68,false,"local"],
  ["Kanesatake","kanesatake","QC","Haudenosaunee (Mohawk)","Mohawk","She:kon",2500,"Kanesatake Territory",45.48,-74.08,false,"local"],
  // ─── Quebec — Wendat ───
  ["Wendake","wendake","QC","Wendat (Huron)","Wendat","Kwé",4200,"Wendake Reserve",46.87,-71.35,false,"local"],
  // ─── Quebec — Algonquin ───
  ["Kitigan Zibi","kitigan-zibi","QC","Algonquin (Anishinaabe)","Algonquin","Kwé",3200,"Kitigan Zibi Reserve",46.28,-75.8,false,"local"],
  ["Lac-Simon","lac-simon","QC","Algonquin (Anishinaabe)","Algonquin","Kwé",2400,"Lac-Simon Reserve",48.06,-77.37,false,"regional"],
  ["Pikogan (Abitibiwinni)","pikogan","QC","Algonquin (Anishinaabe)","Algonquin","Kwé",1200,"Pikogan Reserve",48.58,-79.31,false,"regional"],
  ["Timiskaming First Nation","timiskaming","QC","Algonquin (Anishinaabe)","Algonquin","Kwé",2000,"Timiskaming Reserve",47.32,-79.46,false,"regional"],
  ["Kebaowek First Nation (Eagle Village)","kebaowek","QC","Algonquin (Anishinaabe)","Algonquin","Kwé",900,"Kebaowek Reserve",47.24,-79.43,false,"regional"],
  ["Long Point First Nation (Winneway)","long-point-winneway","QC","Algonquin (Anishinaabe)","Algonquin","Kwé",900,"Long Point Reserve",47.42,-78.87,false,"regional"],
  ["Wolf Lake First Nation","wolf-lake","QC","Algonquin (Anishinaabe)","Algonquin","Kwé",300,"Wolf Lake",47.51,-78.4,false,"regional"],
  ["Barriere Lake (Mitchikanibikok Inik)","barriere-lake","QC","Algonquin (Anishinaabe)","Algonquin","Kwé",700,"Rapid Lake Reserve",47.05,-76.72,true,"remote"],
  // ─── Quebec — Atikamekw ───
  ["Wemotaci","wemotaci","QC","Atikamekw","Atikamekw","Kwé",1600,"Wemotaci Reserve",47.92,-73.78,true,"remote"],
  ["Manawan","manawan","QC","Atikamekw","Atikamekw","Kwé",2600,"Manawan Reserve",47.21,-74.38,true,"remote"],
  ["Opitciwan","opitciwan","QC","Atikamekw","Atikamekw","Kwé",2800,"Opitciwan Reserve",48.37,-74.94,true,"remote"],
  // ─── Quebec — Innu ───
  ["Mashteuiatsh","mashteuiatsh","QC","Innu (Pekuakamiulnuatsh)","Innu-aimun","Kwé",6500,"Mashteuiatsh Reserve",48.57,-72.24,false,"regional"],
  ["Pessamit","pessamit","QC","Innu","Innu-aimun","Kwé",4000,"Pessamit Reserve",48.98,-68.62,false,"regional"],
  ["Uashat mak Mani-utenam","uashat-mani-utenam","QC","Innu","Innu-aimun","Kwé",5500,"Uashat mak Mani-utenam Reserve",50.22,-66.38,false,"regional"],
  ["Essipit","essipit","QC","Innu","Innu-aimun","Kwé",800,"Essipit Reserve",48.35,-69.41,false,"regional"],
  ["Ekuanitshit (Mingan)","ekuanitshit","QC","Innu","Innu-aimun","Kwé",600,"Mingan Reserve",50.3,-64.03,false,"regional"],
  ["Nutashkuan (Natashquan)","nutashkuan","QC","Innu","Innu-aimun","Kwé",1100,"Nutashkuan Reserve",50.19,-61.82,true,"remote"],
  ["Unamen Shipu (La Romaine)","unamen-shipu","QC","Innu","Innu-aimun","Kwé",1200,"La Romaine Reserve",50.21,-60.68,true,"remote"],
  ["Pakua Shipu (Saint-Augustin)","pakua-shipu","QC","Innu","Innu-aimun","Kwé",400,"Pakua Shipu",51.22,-58.65,true,"remote"],
  ["Matimekush-Lac John","matimekush-lac-john","QC","Innu","Innu-aimun","Kwé",900,"Matimekush-Lac John Reserve",54.81,-66.82,true,"remote"],
  // ─── Quebec — Mi''kmaq ───
  ["Listuguj Mi''gmaq","listuguj","QC","Mi''kmaq (Mi''gmaq)","Mi''kmaq","Kwe Kwe",4000,"Listuguj Reserve",48.06,-66.73,false,"regional"],
  ["Gesgapegiag","gesgapegiag","QC","Mi''kmaq","Mi''kmaq","Kwe Kwe",1600,"Gesgapegiag Reserve",48.18,-65.99,false,"regional"],
  ["Gespeg","gespeg","QC","Mi''kmaq","Mi''kmaq","Kwe Kwe",700,"Gaspé Area",48.83,-64.48,false,"regional"],
  // ─── Quebec — Abenaki ───
  ["Odanak","odanak","QC","Abenaki (W8banaki)","Abenaki","Kwai",800,"Odanak Reserve",46.08,-72.83,false,"local"],
  ["Wôlinak","wolinak","QC","Abenaki (W8banaki)","Abenaki","Kwai",400,"Wôlinak Reserve",46.28,-72.22,false,"local"],
  // ─── Quebec — Naskapi ───
  ["Kawawachikamach (Naskapi)","kawawachikamach","QC","Naskapi","Naskapi","Wachiya",1100,"Kawawachikamach",54.86,-66.87,true,"remote"],
  // ─── Quebec — Cree (Eeyou Istchee) ───
  ["Chisasibi","chisasibi","QC","Cree (Eeyou)","Cree","Wachiya",5000,"Chisasibi",53.79,-78.92,true,"remote"],
  ["Wemindji","wemindji","QC","Cree (Eeyou)","Cree","Wachiya",1700,"Wemindji",53.01,-78.84,true,"remote"],
  ["Eastmain","eastmain","QC","Cree (Eeyou)","Cree","Wachiya",800,"Eastmain",52.24,-78.51,true,"remote"],
  ["Waskaganish","waskaganish","QC","Cree (Eeyou)","Cree","Wachiya",2500,"Waskaganish",51.48,-78.76,true,"remote"],
  ["Nemaska","nemaska","QC","Cree (Eeyou)","Cree","Wachiya",800,"Nemaska",51.69,-76.22,true,"remote"],
  ["Mistissini","mistissini","QC","Cree (Eeyou)","Cree","Wachiya",4500,"Mistissini",50.42,-73.87,true,"remote"],
  ["Oujé-Bougoumou","ouje-bougoumou","QC","Cree (Eeyou)","Cree","Wachiya",800,"Oujé-Bougoumou",49.92,-74.04,true,"remote"],
  ["Waswanipi","waswanipi","QC","Cree (Eeyou)","Cree","Wachiya",2200,"Waswanipi",49.74,-75.96,true,"remote"],
  ["Whapmagoostui","whapmagoostui","QC","Cree (Eeyou)","Cree","Wachiya",1000,"Whapmagoostui",55.28,-77.76,true,"remote"],
  // ─── Manitoba — Southern / Anishinaabe / Dakota ───
  ["Peguis First Nation","peguis","MB","Anishinaabe (Ojibwe/Cree)","Ojibwe / Cree","Boozhoo",11000,"Peguis Reserve",51.05,-96.65,false,"regional"],
  ["Sagkeeng First Nation (Fort Alexander)","sagkeeng","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",8000,"Fort Alexander Reserve",50.63,-96.34,false,"regional"],
  ["Sandy Bay Ojibway First Nation","sandy-bay-mb","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",6500,"Sandy Bay Reserve",50.85,-99.38,false,"regional"],
  ["Lake Manitoba First Nation","lake-manitoba","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",3500,"Lake Manitoba Reserve",50.54,-98.93,false,"regional"],
  ["Long Plain First Nation","long-plain","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",4500,"Long Plain Reserve",49.64,-98.27,false,"local"],
  ["Roseau River Anishinabe First Nation","roseau-river","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2500,"Roseau River Reserve",49.15,-97.23,false,"local"],
  ["Brokenhead Ojibway Nation","brokenhead","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2500,"Brokenhead Reserve",50.24,-96.53,false,"local"],
  ["Swan Lake First Nation","swan-lake-mb","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1500,"Swan Lake Reserve",49.44,-98.89,false,"local"],
  ["Canupawakpa Dakota Nation (Oak Lake)","canupawakpa","MB","Dakota","Dakota","Hau",800,"Oak Lake Reserve",49.67,-100.71,false,"regional"],
  ["Dakota Tipi First Nation","dakota-tipi","MB","Dakota","Dakota","Hau",500,"Dakota Tipi Reserve",49.71,-98.29,false,"local"],
  ["Sioux Valley Dakota Nation","sioux-valley","MB","Dakota","Dakota","Hau",2800,"Sioux Valley Reserve",49.76,-100.13,false,"regional"],
  ["Dakota Plains Wahpeton Oyate","dakota-plains","MB","Dakota","Dakota","Hau",500,"Dakota Plains Reserve",49.63,-98.74,false,"local"],
  ["Birdtail Sioux Dakota Nation","birdtail-sioux","MB","Dakota","Dakota","Hau",700,"Birdtail Creek Reserve",50.42,-101.0,false,"regional"],
  // ─── Manitoba — Central / Interlake ───
  ["Fisher River Cree Nation","fisher-river","MB","Cree","Cree","Tansi",4500,"Fisher River Reserve",51.16,-97.29,false,"regional"],
  ["Kinonjeoshtegon First Nation (Jackhead)","jackhead","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",700,"Jackhead Reserve",51.62,-96.95,false,"regional"],
  ["Lake St. Martin First Nation","lake-st-martin","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",3200,"Lake St. Martin Reserve",51.29,-98.16,false,"regional"],
  ["Little Saskatchewan First Nation","little-saskatchewan","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2000,"Little Saskatchewan Reserve",51.36,-98.36,false,"regional"],
  ["Pinaymootang First Nation (Fairford)","pinaymootang","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",3000,"Fairford Reserve",51.34,-98.55,false,"regional"],
  ["Bloodvein First Nation","bloodvein","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2000,"Bloodvein Reserve",51.81,-96.72,true,"remote"],
  ["Hollow Water First Nation","hollow-water","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1600,"Hollow Water Reserve",51.22,-96.37,false,"regional"],
  ["Black River First Nation","black-river-mb","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1200,"Black River Reserve",50.92,-96.35,false,"regional"],
  // ─── Manitoba — Northern Cree ───
  ["Norway House Cree Nation","norway-house","MB","Cree","Cree","Tansi",8000,"Norway House Reserve",53.97,-97.84,true,"remote"],
  ["Cross Lake First Nation (Pimicikamak)","cross-lake","MB","Cree","Cree","Tansi",8500,"Cross Lake Reserve",54.61,-97.77,true,"remote"],
  ["Garden Hill First Nation","garden-hill","MB","Anishinaabe (Ojibwe/Cree)","Ojibwe / Cree","Boozhoo",4500,"Garden Hill Reserve",53.93,-94.68,true,"remote"],
  ["St. Theresa Point First Nation","st-theresa-point","MB","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",4000,"St. Theresa Point Reserve",53.84,-94.85,true,"remote"],
  ["Wasagamack First Nation","wasagamack","MB","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",2200,"Wasagamack Reserve",53.92,-94.96,true,"remote"],
  ["Red Sucker Lake First Nation","red-sucker-lake","MB","Anishinaabe (Ojibwe/Cree)","Ojibwe","Boozhoo",1200,"Red Sucker Lake Reserve",54.07,-93.57,true,"remote"],
  ["Oxford House First Nation (Bunibonibee)","oxford-house","MB","Cree","Cree","Tansi",3000,"Oxford House Reserve",54.95,-95.27,true,"remote"],
  ["God''s Lake First Nation","gods-lake","MB","Cree","Cree","Tansi",1800,"God''s Lake Reserve",54.56,-94.73,true,"remote"],
  ["Shamattawa First Nation","shamattawa","MB","Cree","Cree","Tansi",1600,"Shamattawa Reserve",55.86,-92.09,true,"remote"],
  ["Tataskweyak Cree Nation (Split Lake)","tataskweyak","MB","Cree","Cree","Tansi",4000,"Split Lake Reserve",56.27,-96.1,true,"remote"],
  ["York Factory First Nation","york-factory","MB","Cree","Cree","Tansi",1100,"York Factory Reserve",56.83,-92.31,true,"remote"],
  ["Fox Lake Cree Nation","fox-lake","MB","Cree","Cree","Tansi",2200,"Fox Lake Reserve",56.4,-94.5,true,"remote"],
  ["War Lake First Nation","war-lake","MB","Cree","Cree","Tansi",300,"Ilford",56.06,-95.61,true,"remote"],
  ["Nisichawayasihk Cree Nation (Nelson House)","nisichawayasihk","MB","Cree","Cree","Tansi",5000,"Nelson House Reserve",55.76,-98.85,true,"remote"],
  ["Marcel Colomb First Nation","marcel-colomb","MB","Cree","Cree","Tansi",500,"Lynn Lake Area",56.85,-101.05,true,"remote"],
  ["O-Pipon-Na-Piwin Cree Nation (South Indian Lake)","o-pipon-na-piwin","MB","Cree","Cree","Tansi",1200,"South Indian Lake",56.78,-98.93,true,"remote"],
  ["Barren Lands First Nation (Brochet)","barren-lands","MB","Dene","Dene","Edlanét''e",800,"Brochet",57.88,-101.68,true,"remote"],
  ["Northlands Denesuline First Nation (Lac Brochet)","northlands-denesuline","MB","Dene","Dene","Edlanét''e",1100,"Lac Brochet",58.62,-101.47,true,"remote"],
  ["Sayisi Dene First Nation","sayisi-dene","MB","Dene","Dene","Edlanét''e",500,"Tadoule Lake",58.71,-98.5,true,"remote"],
  // ─── Manitoba — Western ───
  ["Ebb and Flow First Nation","ebb-and-flow","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2500,"Ebb and Flow Reserve",51.08,-99.6,false,"regional"],
  ["Rolling River First Nation","rolling-river","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2200,"Rolling River Reserve",50.54,-100.08,false,"regional"],
  ["Keeseekoowenin Ojibway First Nation","keeseekoowenin","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1800,"Keeseekoowenin Reserve",50.86,-99.98,false,"regional"],
  ["Waywayseecappo First Nation","waywayseecappo","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",3000,"Waywayseecappo Reserve",50.57,-101.27,false,"regional"],
  ["Tootinaowaziibeeng Treaty Reserve","tootinaowaziibeeng","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",1500,"Valley River Reserve",51.14,-100.79,false,"regional"],
  ["Gamblers First Nation","gamblers","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",250,"Gamblers Reserve",50.72,-101.2,false,"regional"],
  ["Pine Creek First Nation","pine-creek-mb","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",2500,"Pine Creek Reserve",52.06,-100.92,false,"regional"],
  ["Sapotaweyak Cree Nation","sapotaweyak","MB","Cree","Cree","Tansi",2800,"Pelican Rapids Reserve",52.45,-101.14,false,"regional"],
  ["Wuskwi Sipihk First Nation (Indian Birch)","wuskwi-sipihk","MB","Cree","Cree","Tansi",800,"Indian Birch Reserve",52.23,-100.55,false,"regional"],
  // ─── Manitoba — Winnipeg / Southern / The Pas ───
  ["Winnipeg First Nations (urban)","winnipeg-fn","MB","Various","Various","Boozhoo",90000,"Winnipeg Urban",49.8951,-97.1384,false,"local"],
  ["Buffalo Point First Nation","buffalo-point","MB","Anishinaabe (Ojibwe)","Ojibwe","Boozhoo",150,"Buffalo Point Reserve",49.08,-95.23,false,"regional"],
  ["Opaskwayak Cree Nation (The Pas)","opaskwayak","MB","Cree","Cree","Tansi",6500,"Opaskwayak Reserve",53.83,-101.25,false,"regional"],
  ["Mosakahiken Cree Nation (Moose Lake)","mosakahiken","MB","Cree","Cree","Tansi",2500,"Moose Lake Reserve",53.76,-100.33,true,"remote"],
  ["Chemawawin Cree Nation (Easterville)","chemawawin","MB","Cree","Cree","Tansi",2800,"Easterville Reserve",53.16,-99.18,false,"regional"],
  ["Misipawistik Cree Nation (Grand Rapids)","misipawistik","MB","Cree","Cree","Tansi",1200,"Grand Rapids Reserve",53.18,-99.28,false,"regional"],
  ["Mathias Colomb Cree Nation (Pukatawagan)","mathias-colomb","MB","Cree","Cree","Tansi",3500,"Pukatawagan Reserve",55.74,-101.12,true,"remote"],
  ["Thompson (urban First Nations)","thompson-fn","MB","Cree","Cree","Tansi",5000,"Thompson Urban",55.743,-97.856,false,"regional"],
  // ─── New Brunswick — Wolastoqiyik (Maliseet) ───
  ["Tobique First Nation (Neqotkuk)","tobique","NB","Wolastoqiyik (Maliseet)","Wolastoqey","Kwe",2400,"Tobique Reserve",46.78,-67.08,false,"regional"],
  ["Woodstock First Nation","woodstock-fn","NB","Wolastoqiyik (Maliseet)","Wolastoqey","Kwe",1100,"Woodstock Reserve",46.15,-67.6,false,"regional"],
  ["Kingsclear First Nation (Pilick)","kingsclear","NB","Wolastoqiyik (Maliseet)","Wolastoqey","Kwe",1000,"Kingsclear Reserve",45.92,-66.81,false,"regional"],
  ["St. Mary''s First Nation","st-marys","NB","Wolastoqiyik (Maliseet)","Wolastoqey","Kwe",1800,"St. Mary''s Reserve",45.96,-66.64,false,"regional"],
  ["Oromocto First Nation","oromocto-fn","NB","Wolastoqiyik (Maliseet)","Wolastoqey","Kwe",700,"Oromocto Reserve",45.84,-66.47,false,"regional"],
  ["Madawaska Maliseet First Nation","madawaska-maliseet","NB","Wolastoqiyik (Maliseet)","Wolastoqey","Kwe",400,"Madawaska Reserve",47.36,-68.32,false,"regional"],
  // ─── New Brunswick — Mi''kmaq ───
  ["Elsipogtog First Nation (Big Cove)","elsipogtog","NB","Mi''kmaq","Mi''kmaq","Kwe Kwe",3500,"Big Cove Reserve",46.63,-65.08,false,"regional"],
  ["Esgenoôpetitj First Nation (Burnt Church)","esgenoopetitj","NB","Mi''kmaq","Mi''kmaq","Kwe Kwe",2000,"Burnt Church Reserve",47.15,-65.16,false,"regional"],
  ["Eel Ground First Nation (Natoaganeg)","eel-ground","NB","Mi''kmaq","Mi''kmaq","Kwe Kwe",1200,"Eel Ground Reserve",46.97,-65.51,false,"regional"],
  ["Metepenagiag Mi''kmaq Nation (Red Bank)","metepenagiag","NB","Mi''kmaq","Mi''kmaq","Kwe Kwe",700,"Red Bank Reserve",46.93,-65.72,false,"regional"],
  ["Pabineau First Nation","pabineau","NB","Mi''kmaq","Mi''kmaq","Kwe Kwe",350,"Pabineau Reserve",47.53,-65.69,false,"regional"],
  ["Eel River Bar First Nation (Ugpi''ganjig)","eel-river-bar","NB","Mi''kmaq","Mi''kmaq","Kwe Kwe",700,"Eel River Bar Reserve",47.91,-66.08,false,"regional"],
  ["Buctouche Mi''kmaq Nation (Fort Folly)","buctouche","NB","Mi''kmaq","Mi''kmaq","Kwe Kwe",200,"Fort Folly Reserve",46.04,-64.83,false,"regional"],
  ["Indian Island First Nation","indian-island-nb","NB","Mi''kmaq","Mi''kmaq","Kwe Kwe",200,"Indian Island Reserve",46.6,-64.86,false,"regional"],
  ["Bouctouche First Nation","bouctouche-fn","NB","Mi''kmaq","Mi''kmaq","Kwe Kwe",150,"Buctouche Reserve",46.47,-64.73,false,"regional"],
  // ─── Nova Scotia — Mi''kmaq (all 13 NS First Nations) ───
  ["Membertou First Nation","membertou","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",2000,"Membertou Reserve",46.14,-60.17,false,"regional"],
  ["Eskasoni First Nation","eskasoni","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",4500,"Eskasoni Reserve",45.94,-60.61,false,"regional"],
  ["Potlotek First Nation (Chapel Island)","potlotek","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",700,"Chapel Island Reserve",45.82,-60.93,false,"regional"],
  ["We''koqma''q First Nation (Waycobah)","wekoqmaq","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",1100,"Whycocomagh Reserve",45.97,-61.12,false,"regional"],
  ["Wagmatcook First Nation","wagmatcook","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",700,"Wagmatcook Reserve",46.17,-60.97,false,"regional"],
  ["Pictou Landing First Nation","pictou-landing","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",600,"Pictou Landing Reserve",45.65,-62.55,false,"regional"],
  ["Paq''tnkek Mi''kmaw Nation","paqtnkek","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",600,"Afton Reserve",45.68,-61.87,false,"regional"],
  ["Millbrook First Nation","millbrook","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",2200,"Millbrook Reserve",45.35,-63.25,false,"regional"],
  ["Sipekne''katik First Nation (Indian Brook)","sipeknekatik","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",2800,"Indian Brook Reserve",44.98,-63.64,false,"regional"],
  ["Glooscap First Nation","glooscap","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",350,"Horton Reserve",45.07,-64.31,false,"regional"],
  ["Annapolis Valley First Nation","annapolis-valley-fn","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",350,"Cambridge Reserve",44.98,-64.73,false,"regional"],
  ["Bear River First Nation (L''sitkuk)","bear-river","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",400,"Bear River Reserve",44.62,-65.64,false,"regional"],
  ["Acadia First Nation","acadia-fn","NS","Mi''kmaq","Mi''kmaq","Kwe Kwe",1500,"Yarmouth / Gold River Reserves",43.84,-66.12,false,"regional"],
];

const cols = "name,slug,province,nation,language,greeting,population,reserve_name,latitude,longitude,is_remote,delivery_zone";

const values = communities.map(row => {
  return "(" + row.map(v => {
    if (v === null || v === undefined) return "NULL";
    if (typeof v === "boolean") return v.toString();
    if (typeof v === "number") return v.toString();
    return "'" + String(v).replace(/'/g, "''") + "'";
  }).join(",") + ")";
}).join(",\n");

const sql = `
-- Update province constraint for Maritime provinces
ALTER TABLE public.communities DROP CONSTRAINT IF EXISTS communities_province_check;
ALTER TABLE public.communities ADD CONSTRAINT communities_province_check CHECK (province IN ('ON', 'QC', 'MB', 'NB', 'NS'));

DELETE FROM public.communities;
INSERT INTO public.communities (${cols}) VALUES
${values};
`;

async function run() {
  console.log("Seeding " + communities.length + " communities...");
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ query: sql })
  });
  console.log("Status:", res.status);
  const text = await res.text();
  console.log(text.substring(0, 300));

  // Verify
  const res2 = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ query: "SELECT count(*) as total, province FROM public.communities GROUP BY province ORDER BY province" })
  });
  const counts = await res2.json();
  console.log("\nCommunities seeded:");
  const labels = { ON: "Ontario", QC: "Quebec", NB: "New Brunswick", NS: "Nova Scotia" };
  counts.forEach(r => console.log("  " + (labels[r.province] || r.province) + ": " + r.total));
  console.log("  Total: " + counts.reduce((s, r) => s + parseInt(r.total), 0));
}

run();
