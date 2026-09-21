const spots = [
  {
    id: "new-chitose-airport",
    name: "新千歲機場",
    area: "新千歲",
    type: "抵達點",
    season: ["winter"],
    time: "0h",
    best: "抵達北海道第一步",
    desc: "12/23 抵達新千歲機場，搭車前往旭川，車程約 2.5 小時。途中可在高速公路服務區稍作停留。",
    highlight: "旅程起點"
  },
  {
    id: "nippon-rentacar-new-chitose",
    name: "NIPPON 租車新千歲機場店",
    area: "新千歲",
    type: "取車",
    season: ["winter"],
    time: "1h",
    best: "機場櫃台、接駁取車、冬季自駕起點",
    desc: "抵達後先到新千歲機場租車櫃台報到，再搭接駁車到營業所取車。冬季建議把手續、接駁與熟悉雪地車況的時間一起抓進行程。",
    highlight: "先取車"
  },
  {
    id: "premier-cabin-asahikawa",
    name: "Premier Hotel-CABIN-旭川",
    area: "旭川",
    type: "入住飯店",
    season: ["winter"],
    time: "1h",
    best: "Check-in、溫泉、旭川站前",
    desc: "第一晚的旭川住宿點，位在旭川站附近，辦理入住後可以先整理行李、休息一下，再步行到市區找晚餐。",
    highlight: "旭川入住"
  },
  {
    id: "tokiwa-park",
    name: "常磐公園",
    area: "旭川",
    type: "公園散步",
    season: ["winter"],
    time: "1h",
    best: "雪景、池畔、公園散步",
    desc: "旭川市中心的老牌公園，冬天很適合短暫散步醒醒腦。若第一天抵達後還有體力，可作為飯店入住後的輕量行程。",
    highlight: "旭川散步"
  },
  {
    id: "kamikawa-shrine",
    name: "上川神社",
    area: "旭川",
    type: "神社參拜",
    season: ["winter"],
    time: "1h",
    best: "旭川鎮守、參拜、靜謐感",
    desc: "旭川代表神社之一，位在神樂岡公園附近。適合和常磐公園擇一或串成旭川市區散步段，讓第一天有一個安靜收尾。",
    highlight: "旭川參拜"
  },
  {
    id: "asahikawa-heiwa-dori",
    name: "旭川平和通買物公園",
    area: "旭川",
    type: "商店街散步",
    season: ["winter"],
    time: "1.5h",
    best: "晚餐、逛街、旭川站前",
    desc: "從旭川站前延伸的步行商店街，周邊有餐廳與店家。很適合放在 Day1 晚上，用來逛街、找晚餐，回飯店也方便。",
    highlight: "逛街找吃的"
  },
  {
    id: "aeon-mall-asahikawa-ekimae",
    name: "AEON MALL 旭川站前",
    area: "旭川",
    type: "購物中心",
    season: ["winter"],
    time: "1h",
    best: "雪靴、防滑鞋、保暖配件、旭川站直結",
    desc: "JR 旭川站直結的室內購物中心，2F 有 ABC-MART SPORTS，可在第一天先補雪靴、防滑鞋或保暖鞋款，再順便買襪子、藥妝與晚餐。冬季尺寸與庫存以現場為準。",
    highlight: "Day1 裝備補給"
  },
  {
    id: "feeeal-asahikawa",
    name: "Feeeal 旭川",
    area: "旭川",
    type: "購物中心",
    season: ["winter"],
    time: "1h",
    best: "平和通、生活雜貨、室內逛街",
    desc: "位在平和通買物公園旁的市中心商場，從旭川站可步行抵達。適合與站前散步、找晚餐一起安排，作為下雪天的室內購物備案。",
    highlight: "平和通旁"
  },
  {
    id: "sunagawa-highway-oasis",
    name: "砂川 Highway Oasis",
    area: "砂川",
    type: "休息補給",
    season: ["winter"],
    time: "0.75h",
    best: "道央道中途休息、北菓樓、伴手禮、洗手間",
    desc: "位在旭川與札幌之間、可由道央道砂川服務區直接進入，適合在 Day 2 Plan B 中途休息 30-45 分鐘，補充飲食、上洗手間或買空知伴手禮後再前往札幌。",
    highlight: "旭川札幌中繼"
  },
  {
    id: "hokkaido-shrine",
    name: "北海道神宮",
    area: "札幌",
    type: "神社散步",
    season: ["winter"],
    time: "1.5h",
    best: "初詣、雪景、安靜感",
    desc: "12/24 抵達札幌後的第一個景點，冬天很適合先把北海道的節奏慢慢打開。",
    highlight: "札幌開場"
  },
  {
    id: "sapporo-odori",
    name: "大通公園",
    area: "札幌",
    type: "城市散步",
    season: ["winter"],
    time: "1.5h",
    best: "雪祭、城市夜景",
    desc: "適合當作抵達北海道後的第一個節奏點，白天走逛，晚上看燈景。",
    highlight: "雪祭核心區"
  },
  {
    id: "shiroi-koibito-park",
    name: "白色戀人公園",
    area: "札幌",
    type: "觀光工廠",
    season: ["winter"],
    time: "2h",
    best: "甜點、拍照、伴手禮",
    desc: "很適合放在札幌市區日，讓第一天或最後一天都比較有收尾感。",
    highlight: "甜點代表"
  },
  {
    id: "sapporo-susukino",
    name: "薄野美食街",
    area: "札幌",
    type: "美食",
    season: ["winter"],
    time: "2h",
    best: "拉麵、海鮮、居酒屋",
    desc: "把晚餐時間留給這裡最剛好，能把札幌的夜生活一次收進來。",
    highlight: "深夜食堂"
  },
  {
    id: "otaru-canal",
    name: "小樽運河",
    area: "小樽",
    type: "經典景點",
    season: ["winter"],
    time: "2h",
    best: "燈光、運河、倉庫群",
    desc: "適合排在中午到傍晚，光線柔和時最有畫面感。",
    highlight: "必拍地標"
  },
  {
    id: "otaru-sakaimachi",
    name: "堺町通",
    area: "小樽",
    type: "街區散步",
    season: ["winter"],
    time: "2.5h",
    best: "甜點、玻璃工藝、伴手禮",
    desc: "如果你喜歡慢慢逛，這條街可以把甜點和小店安排成一整個下午。",
    highlight: "散步感滿分"
  },
  {
    id: "moiwa-yama",
    name: "藻岩山夜景",
    area: "札幌",
    type: "夜景",
    season: ["winter"],
    time: "2h",
    best: "夜景、城市輪廓、傍晚",
    desc: "很適合接在溫泉日後面，用夜景把整天的節奏收住。",
    highlight: "城市夜色"
  },
  {
    id: "unagi-nakajima",
    name: "うなぎ仲じま",
    area: "札幌",
    type: "鰻魚飯",
    season: ["winter"],
    time: "1.5h",
    best: "鰻重、ひつまぶし、Day 5 午餐",
    desc: "位在中島公園站旁的鰻魚料理店，適合 Day 5 中午先吃鰻魚飯，休息後再前往藻岩山看傍晚夜景。午餐最後點餐為 14:00，建議先預約，12 月底營業時間仍要在出發前向店家確認。",
    highlight: "Day5 鰻魚飯"
  },
  {
    id: "furano-field",
    name: "富良野雪原",
    area: "富良野",
    type: "自然風景",
    season: ["winter"],
    time: "2.5h",
    best: "雪原、農場、慢旅行",
    desc: "冬天的富良野不是花海，而是大片安靜的雪景，非常適合慢慢拍。",
    highlight: "白色風景"
  },
  {
    id: "ningle-terrace",
    name: "精靈露臺",
    area: "富良野",
    type: "木屋步道",
    season: ["winter"],
    time: "1.5h",
    best: "森林小屋、燈光、拍照",
    desc: "很適合第一天從新千歲上來後在傍晚停留，再回旭川飯店收尾，童話感很強。",
    highlight: "夜色木屋"
  },
  {
    id: "biei-blue",
    name: "美瑛青池",
    area: "美瑛",
    type: "自然奇景",
    season: ["winter"],
    time: "1.5h",
    best: "藍色湖面、樹影、靜謐感",
    desc: "很適合搭配富良野一起走，形成一條很完整的冬季景觀路線。",
    highlight: "藍色名景"
  },
  {
    id: "yotei-mountain",
    name: "羊蹄山",
    area: "二世谷",
    type: "山景",
    season: ["winter"],
    time: "2h",
    best: "雪山、遠景、攝影",
    desc: "如果你有安排二世谷或洞爺湖周邊自駕，羊蹄山很適合放進路上當作經典雪山風景。",
    highlight: "雪山地標"
  },
  {
    id: "toyako-lake",
    name: "洞爺湖",
    area: "洞爺湖",
    type: "湖景",
    season: ["winter"],
    time: "半日",
    best: "湖景、山景、溫泉飯店",
    desc: "適合放進慢步調的一天，把移動與住宿節奏拉得更舒服。",
    highlight: "住一晚很棒"
  },
  {
    id: "restaurant-boyotei",
    name: "レストラン望羊蹄",
    area: "洞爺湖",
    type: "洋食",
    season: ["winter"],
    time: "1h",
    best: "漢堡排、牛排、蛋包飯、昭和洋食",
    desc: "位在洞爺湖溫泉街的老字號洋食餐廳，保留帶有昭和氣氛的店內空間。適合想吃漢堡排、牛排或蛋包飯時作為午餐或晚餐選項，目前先保留在景點庫，不綁定特定日期。",
    highlight: "洞爺湖老字號"
  },
  {
    id: "noboribetsu-valley",
    name: "登別地獄谷",
    area: "登別",
    type: "地熱景觀",
    season: ["winter"],
    time: "2h",
    best: "地熱、溫泉、煙霧感",
    desc: "如果你想把冬季行程拉得更有特色，這裡非常適合和溫泉旅館搭配。",
    highlight: "地熱名所"
  },
  {
    id: "noboribetsu-onsen-street",
    name: "登別溫泉街",
    area: "登別",
    type: "溫泉街散步",
    season: ["winter"],
    time: "1h",
    best: "閻魔堂、鬼像、伴手禮、小吃、溫泉街散步",
    desc: "地獄谷入口旁的溫泉商店街，餐廳、甜點與伴手禮店集中。走完地獄谷後可順路看閻魔堂與街上的鬼像，停留約 45-60 分鐘；想吃温泉市場海鮮或登別閻魔炒麵可少量品嘗，把正餐留給室蘭天勝本店。",
    highlight: "Day4 散步小吃"
  },
  {
    id: "morning-market",
    name: "函館朝市",
    area: "函館",
    type: "海鮮早餐",
    season: ["winter"],
    time: "1.5h",
    best: "海鮮丼、早餐、在地味",
    desc: "早上排這裡很順，適合把北海道的海味從第一餐就拉滿。",
    highlight: "早餐首選"
  },
  {
    id: "kanemori-warehouse",
    name: "金森紅磚倉庫",
    area: "函館",
    type: "港灣散步",
    season: ["winter"],
    time: "1.5h",
    best: "倉庫群、海港、咖啡",
    desc: "很適合接在函館朝市之後，白天看海港、下午慢慢逛商店和咖啡館。",
    highlight: "港邊經典"
  },
  {
    id: "motomachi",
    name: "元町散步",
    area: "函館",
    type: "街區散步",
    season: ["winter"],
    time: "2h",
    best: "坡道、教會、異國風",
    desc: "函館很適合留一段時間走元町坡道，和夜景一起湊成很完整的城市氣氛。",
    highlight: "函館街景"
  },
  {
    id: "goryokaku",
    name: "五稜郭公園",
    area: "函館",
    type: "歷史景點",
    season: ["winter"],
    time: "2h",
    best: "星形城郭、百萬夜景、展望塔",
    desc: "冬季夜間點燈時很適合安排百萬夜景，和跨年夜景行程可以串成同一天。",
    highlight: "百萬夜景"
  },
  {
    id: "hakodate-mt",
    name: "函館山夜景",
    area: "函館",
    type: "夜景",
    season: ["winter"],
    time: "2h",
    best: "夜景、海港、收尾感",
    desc: "如果你打算南北串遊，函館山非常適合當整趟旅行的收尾。",
    highlight: "壓軸夜景"
  },
  {
    id: "hakodate-hachimangu",
    name: "函館八幡宮",
    area: "函館",
    type: "神社參拜",
    season: ["winter"],
    time: "1.5h",
    best: "跨年參拜、祈福、年末儀式感",
    desc: "跨年夜安排函館八幡宮參拜很有氣氛，能和五稜郭夜景或函館山夜景銜接。",
    highlight: "跨年參拜"
  },
  {
    id: "hakodate-airport",
    name: "函館機場",
    area: "函館",
    type: "離境點",
    season: ["winter"],
    time: "0h",
    best: "返程前最後補給",
    desc: "回程前從函館機場離境，建議預留報到與還車時間，讓最後一天節奏更穩。",
    highlight: "旅程終點"
  },

  // 札幌百貨
  {
    id: "daimaru-sapporo",
    name: "大丸札幌店",
    area: "札幌",
    type: "百貨公司",
    season: ["winter"],
    time: "2h",
    best: "伴手禮、地下食品街、JR Tower",
    desc: "就在札幌車站大樓內，地下食品街是掃伴手禮的最佳據點，北海道限定商品幾乎都在這裡。",
    highlight: "站內最好逛"
  },
  {
    id: "mitsukoshi-sapporo",
    name: "三越札幌店",
    area: "札幌",
    type: "百貨公司",
    season: ["winter"],
    time: "1.5h",
    best: "精品、甜點、食品街",
    desc: "位於大通公園附近，適合逛完公園後順道進來取暖，地下甜點街選擇豐富。",
    highlight: "大通周邊"
  },
  {
    id: "marui-imai-sapporo",
    name: "丸井今井札幌本店",
    area: "札幌",
    type: "百貨公司",
    season: ["winter"],
    time: "2h",
    best: "地下食品街、伴手禮、北海道老舖",
    desc: "札幌市中心老字號百貨，和札幌三越、大通公園在同一區。適合排在大通周邊，買甜點、海鮮加工品和北海道限定伴手禮。",
    highlight: "札幌老字號"
  },
  {
    id: "tokyu-sapporo",
    name: "東急百貨札幌店",
    area: "札幌",
    type: "百貨公司",
    season: ["winter"],
    time: "1.5h",
    best: "札幌站周邊、食品街、日用品",
    desc: "位在札幌站南口附近，和大丸、Stellar Place 可串成車站購物線。下雪天不想移動太遠時，很適合當備案。",
    highlight: "車站南口"
  },
  {
    id: "stellar-place",
    name: "Stellar Place",
    area: "札幌",
    type: "購物中心",
    season: ["winter"],
    time: "2h",
    best: "流行服飾、餐廳、景觀",
    desc: "JR 札幌站正上方的購物中心，頂樓餐廳層可以俯瞰城市，適合雨雪天把一整個下午收在這裡。",
    highlight: "車站正上方"
  },
  {
    id: "apa-sogo",
    name: "SOGO 札幌店（LOFT 同棟）",
    area: "札幌",
    type: "百貨公司",
    season: ["winter"],
    time: "1.5h",
    best: "文具、雜貨、生活選品",
    desc: "SOGO 與 LOFT 同棟，LOFT 樓層的北海道限定雜貨很適合挑伴手禮，順遊大通非常方便。",
    highlight: "雜貨控必逛"
  },
  {
    id: "donki-tanukikoji",
    name: "唐吉訶德 狸小路店",
    area: "札幌",
    type: "購物中心",
    season: ["winter"],
    time: "1h",
    best: "藥妝、零食、伴手禮、狸小路",
    desc: "位在狸小路商店街中心，從大通、Pole Town 與薄野都能步行串接。適合晚上採買藥妝、零食與伴手禮，不需要特地開車前往。",
    highlight: "狸小路採買"
  },

  // 札幌美食
  {
    id: "sapporo-ramen-yokocho",
    name: "札幌拉麵橫丁",
    area: "札幌",
    type: "美食街",
    season: ["winter"],
    time: "1h",
    best: "味噌拉麵、昭和風情、薄野",
    desc: "薄野核心的拉麵橫丁，十幾間小店並排，昭和感氛圍加上濃郁味噌湯頭，是冬天最療癒的一餐。",
    highlight: "拉麵名地"
  },
  {
    id: "soup-curry",
    name: "スープカレー（湯咖哩）",
    area: "札幌",
    type: "在地美食",
    season: ["winter"],
    time: "1h",
    best: "北海道蔬菜、雞腿、暖胃",
    desc: "札幌發源的獨特咖哩料理，湯底清爽帶辣、配料豪邁，推薦 Lavi 或奧芝商店，是最具代表性的在地味。",
    highlight: "札幌起源"
  },
  {
    id: "totori-honten",
    name: "トトリ 本店",
    area: "札幌",
    type: "燒肉",
    season: ["winter"],
    time: "1.5h",
    best: "和牛、サガリ、牛舌、冷麵、薄野晚餐",
    desc: "札幌具代表性的燒肉老店，也是食べログ燒肉 EAST 百名店 2025 入選店。除了和牛與サガリ，招牌冷麵也很受歡迎；離薄野住宿區近，適合抵達札幌後安排晚餐。",
    highlight: "札幌燒肉必吃"
  },
  {
    id: "sapporo-beer-museum",
    name: "札幌啤酒博物館",
    area: "札幌",
    type: "博物館",
    season: ["winter"],
    time: "1.5h",
    best: "啤酒歷史、限定試飲、紅磚建築",
    desc: "北海道代表性的啤酒主題博物館，可自由參觀後到付費試飲區喝限定啤酒。旁邊就是 Ario 札幌，逛完可直接接商場取暖或吃飯。",
    highlight: "啤酒名所"
  },
  {
    id: "ario-sapporo",
    name: "Ario 札幌",
    area: "札幌",
    type: "購物中心",
    season: ["winter"],
    time: "2h",
    best: "商場、餐廳、超市、親子設施",
    desc: "位在札幌啤酒博物館旁的大型商場，冬天很適合當作室內逛街、補給和用餐備案。JR 苗穗站北口步行約 3 分鐘。",
    highlight: "博物館旁商場"
  },
  {
    id: "toriton-kita8",
    name: "Toriton 北8条光星店",
    area: "札幌",
    type: "迴轉壽司",
    season: ["winter"],
    time: "1.5h",
    best: "北海道海鮮、迴轉壽司、人氣排隊店",
    desc: "離札幌啤酒博物館開車約 10 分鐘的人氣迴轉壽司店，食材水準高但常排很久，建議避開尖峰或先把等待時間抓進行程。",
    highlight: "排隊名店"
  },
  {
    id: "hanamaru-stellar-place",
    name: "根室花まる JR Tower Stellar Place 店",
    area: "札幌",
    type: "迴轉壽司",
    season: ["winter"],
    time: "1.5h",
    best: "札幌站直結、北海道旬魚、排隊名店",
    desc: "札幌站上方 Stellar Place 6F 的根室花まる，交通最方便，適合逛大丸、Stellar Place 或搭車前後排。人氣很高，尖峰常要等。",
    highlight: "札幌站首選"
  },
  {
    id: "shiki-hanamaru-tokeidai",
    name: "町のすし家 四季花まる 時計台店",
    area: "札幌",
    type: "壽司店",
    season: ["winter"],
    time: "1.5h",
    best: "時計台、大通、可預約、午餐",
    desc: "靠近札幌時計台與大通公園，氣氛比迴轉壽司更像坐下來慢慢吃。部分時段可電話預約，很適合想避開長時間排隊時當備案。",
    highlight: "大通可預約"
  },
  {
    id: "ramen-haruka",
    name: "札幌拉麵悠 -はるか-",
    area: "札幌",
    type: "拉麵",
    season: ["winter"],
    time: "1h",
    best: "味噌拉麵、辛味噌、拉麵橫丁",
    desc: "元祖札幌拉麵橫丁內的人氣店，主打帶創意感的札幌味噌拉麵，辛味噌和味噌起司都很適合冬天晚上吃。",
    highlight: "橫丁名店"
  },
  {
    id: "kinotoya-bake-pole-town",
    name: "KINOTOYA BAKE Pole Town Store",
    area: "札幌",
    type: "甜點",
    season: ["winter"],
    time: "0.5h",
    best: "極上牛乳霜淇淋、半熟起司、現烤塔",
    desc: "位在札幌地下街 Pole Town 的甜點店，適合逛狸小路、薄野或地下街時順路吃冰淇淋、現烤起司塔與半熟起司。",
    highlight: "地下街甜點"
  },
  {
    id: "3coins-pole-town",
    name: "3COINS 札幌 Pole Town 店",
    area: "札幌",
    type: "生活雜貨",
    season: ["winter"],
    time: "0.5h",
    best: "平價雜貨、旅行小物、Day6 地下街順逛",
    desc: "保留 Pole Town 店，因為同一天已有 KINOTOYA BAKE Pole Town 與薄野拉麵安排；店就在同一條地下街動線上，不必為了 3COINS 額外繞去其他分店。",
    highlight: "Day6 順路首選"
  },
  // 函館購物
  {
    id: "marui-imai-hakodate",
    name: "丸井今井函館店",
    area: "函館",
    type: "百貨公司",
    season: ["winter"],
    time: "1.5h",
    best: "五稜郭、本町商圈、食品與伴手禮",
    desc: "函館本町的代表百貨，離五稜郭公園前市電站很近。若 Day8 在五稜郭一帶，可作為購物、取暖或吃飯備案。",
    highlight: "函館百貨"
  },
  {
    id: "share-star-hakodate",
    name: "シエスタハコダテ",
    area: "函館",
    type: "商場",
    season: ["winter"],
    time: "1.5h",
    best: "無印良品、LOFT、咖啡、五稜郭商圈",
    desc: "五稜郭本町商圈的複合商場，有無印良品、LOFT、咖啡與生活選品。下雪或行程空檔時很好用。",
    highlight: "五稜郭商場"
  },
  {
    id: "kiralis-hakodate",
    name: "キラリス函館",
    area: "函館",
    type: "站前商場",
    season: ["winter"],
    time: "1h",
    best: "函館站前、餐飲、伴手禮",
    desc: "函館站前的複合商場，適合在搭車、還車或回飯店前短暫逛逛。和函館朝市、車站周邊行程很好串。",
    highlight: "函館站前"
  },
  {
    id: "hokkaido-shikisai-hakodate",
    name: "北海道四季彩館 JR 函館店",
    area: "函館",
    type: "伴手禮購物",
    season: ["winter"],
    time: "0.5h",
    best: "函館站內、甜點、最後採買",
    desc: "位在 JR 函館站內的伴手禮店，集合北海道與函館的甜點、零食及加工食品。適合在朝市後、搭車前或前往機場前補齊禮物，冬天不必離開室內。",
    highlight: "站內最後採買"
  },
  {
    id: "hakodate-meijikan",
    name: "函館明治館",
    area: "函館",
    type: "玻璃工藝購物",
    season: ["winter"],
    time: "1h",
    best: "玻璃、音樂盒、工藝伴手禮、港邊",
    desc: "港灣區的歷史建築購物點，以玻璃、音樂盒與手作工藝品為主。可和金森紅磚倉庫、元町散步排在同一段，不需要移車。",
    highlight: "港邊工藝選物"
  },
  {
    id: "mega-donki-hakodate",
    name: "MEGA 唐吉訶德 函館店",
    area: "函館",
    type: "購物中心",
    season: ["winter"],
    time: "1h",
    best: "藥妝、零食、保暖用品、自駕補貨",
    desc: "美原一帶的大型折扣店，適合自駕時補藥妝、零食、日用品與臨時保暖用品。位置不在函館站、元町或五稜郭步行圈內，建議只在開車行程順路時安排。",
    highlight: "自駕補給"
  },

  // 截圖行程新增景點
  {
    id: "biei-shrine",
    name: "美瑛神社",
    area: "美瑛",
    type: "神社參拜",
    season: ["winter"],
    time: "1h",
    best: "丘守、雪景、安靜參拜",
    desc: "美瑛市街附近的鎮守神社，冬天人潮相對少，適合接在美瑛青池或富良野移動途中，讓 Day2 不只是自然景觀，也有一段安靜參拜。",
    highlight: "美瑛祈福"
  },
  {
    id: "hinode-park",
    name: "日之出公園",
    area: "上富良野",
    type: "丘陵展望",
    season: ["winter"],
    time: "1h",
    best: "十勝岳連峰、雪丘、開闊視野",
    desc: "位在上富良野的展望公園，夏季以薰衣草聞名，冬天則適合看雪覆蓋的丘陵與十勝岳方向山景，放在富良野往美瑛之間很順。",
    highlight: "富良野展望"
  },
  {
    id: "sapporo-fushimi-inari",
    name: "札幌伏見稻荷神社",
    area: "札幌",
    type: "神社參拜",
    season: ["winter"],
    time: "1h",
    best: "紅色鳥居、雪景、拍照",
    desc: "札幌市區南側的稻荷神社，雪中的紅色鳥居很有畫面感。若 Day3 從札幌出發去小樽，可先在早上安排短暫停留。",
    highlight: "雪中鳥居"
  },
  {
    id: "otaru-inari-shrine",
    name: "小樽稻荷神社",
    area: "小樽",
    type: "神社參拜",
    season: ["winter"],
    time: "1h",
    best: "在地神社、安靜氛圍、御朱印",
    desc: "小樽在地歷史很深的稻荷神社，位置比運河與堺町通更安靜，適合在小樽散策中加入一段不那麼觀光化的節奏。",
    highlight: "小樽在地感"
  },
  {
    id: "teine-shrine",
    name: "手稻神社",
    area: "札幌",
    type: "神社參拜",
    season: ["winter"],
    time: "1h",
    best: "車站近、參拜、御朱印",
    desc: "靠近 JR 手稻站的神社，從札幌往小樽方向移動時可順路安排。冬天若道路狀況普通，這站比繞遠山區更穩。",
    highlight: "往小樽順路"
  },
  {
    id: "taisho-glass",
    name: "大正硝子館",
    area: "小樽",
    type: "玻璃工藝",
    season: ["winter"],
    time: "1h",
    best: "玻璃器皿、手作體驗、伴手禮",
    desc: "小樽堺町通一帶代表性的玻璃工藝店群，適合放在小樽運河與童話十字路之間，順著街區一路慢慢逛。",
    highlight: "小樽玻璃"
  },
  {
    id: "otaru-meruhen-crossing",
    name: "小樽童話十字路",
    area: "小樽",
    type: "街區地標",
    season: ["winter"],
    time: "0.5h",
    best: "蒸汽鐘、常夜燈、甜點店",
    desc: "堺町通南端的經典路口，周邊有音樂盒堂、甜點與玻璃店。適合作為小樽散步的收尾點，再回札幌。",
    highlight: "小樽收尾點"
  },
  {
    id: "wakadori-naruto-honten",
    name: "若鶏時代 なると 本店",
    area: "小樽",
    type: "小樽美食",
    season: ["winter"],
    time: "1h",
    best: "若鶏半身揚げ、炸雞、午餐",
    desc: "小樽老字號炸雞名店，招牌是外皮酥脆、份量很有存在感的若鶏半身揚げ。離小樽站不遠，適合排在小樽神社與運河散步之間當午餐。",
    highlight: "小樽必吃炸雞"
  },
  {
    id: "popura-farm-otaru",
    name: "ポプラファーム 小樽店",
    area: "小樽",
    type: "甜點",
    season: ["winter"],
    time: "0.5h",
    best: "サンタのヒゲ、哈密瓜、霜淇淋、小樽運河",
    desc: "位在小樽運河前的出拔小路，招牌是半顆哈密瓜搭配霜淇淋的「サンタのヒゲ」。適合和運河、堺町通一起安排；冬季可能縮短營業，出發前再確認。",
    highlight: "哈密瓜霜淇淋"
  },
  {
    id: "muroran-hakucho-bridge-view",
    name: "室蘭白鳥大橋展望台",
    area: "室蘭",
    type: "展望台",
    season: ["winter"],
    time: "1h",
    best: "白鳥大橋、港灣、工場夜景",
    desc: "可眺望白鳥大橋與室蘭港灣的展望點，適合接在登別地獄谷後，當作札幌返回前的海港景觀停留。",
    highlight: "室蘭港景"
  },
  {
    id: "happiness-bell",
    name: "幸福之鐘",
    area: "室蘭",
    type: "展望拍照",
    season: ["winter"],
    time: "0.5h",
    best: "拍照、海景、短暫停留",
    desc: "適合放在室蘭展望行程中的小停留點，停留時間不用長，主要作為 Day4 登別與室蘭之間的輕量拍照點。",
    highlight: "短停拍照"
  },
  {
    id: "tenkatsu-honten-muroran",
    name: "天勝本店",
    area: "室蘭",
    type: "天丼",
    season: ["winter"],
    time: "1h",
    best: "老字號天丼、蝦天婦羅、室蘭午餐",
    desc: "室蘭站附近的大正時代老字號，以醬汁浸潤的蝦天丼聞名。熱門時段可能提早售完，且常見只收現金，適合放在室蘭展望行程的午餐時段。",
    highlight: "室蘭老字號"
  },
  {
    id: "makkari-village",
    name: "真狩村",
    area: "二世谷",
    type: "羊蹄山景點",
    season: ["winter"],
    time: "1h",
    best: "羊蹄山、雪原、鄉村景",
    desc: "真狩村位在羊蹄山南側，是拍攝羊蹄山輪廓很舒服的位置。Day7 從札幌往洞爺湖移動時，可作為羊蹄山景觀停留。",
    highlight: "羊蹄山視角"
  },
  {
    id: "silo-observatory",
    name: "SAIRO 展望台",
    area: "洞爺湖",
    type: "湖景展望",
    season: ["winter"],
    time: "1h",
    best: "洞爺湖全景、有珠山、伴手禮",
    desc: "洞爺湖西側高台的代表展望台，可一次看洞爺湖、山線與火山地形，也適合買點小伴手禮後再進湖畔飯店。",
    highlight: "洞爺湖全景"
  },
  {
    id: "konpira-crater-view",
    name: "金比羅火山口展望台",
    area: "洞爺湖",
    type: "火山地形",
    season: ["winter"],
    time: "1h",
    best: "有珠山火山口、地質景觀、防災遺構",
    desc: "洞爺湖溫泉街附近可理解有珠山噴火地形的景點。冬季步道可能封閉，若現場狀況不佳，可改成在洞爺湖遊客中心周邊短暫停留。",
    highlight: "火山地景"
  },
  {
    id: "hakodate-gokoku-shrine",
    name: "函館護國神社",
    area: "函館",
    type: "神社參拜",
    season: ["winter"],
    time: "1h",
    best: "參拜、函館山山麓、安靜感",
    desc: "位在函館山山麓，從元町或函館山纜車站周邊順路可到。適合放在 Day9 金森紅磚倉庫後，往函館山夜景前銜接。",
    highlight: "山麓參拜"
  },
  {
    id: "ajisai-honten-hakodate",
    name: "函館麺厨房 あじさい 本店",
    area: "函館",
    type: "鹽拉麵",
    season: ["winter"],
    time: "1h",
    best: "味彩鹽拉麵、五稜郭、函館老店",
    desc: "五稜郭旁的函館鹽拉麵代表店，清澈湯頭帶有昆布與海鮮鮮味。適合排在五稜郭散策前後，熱門用餐時段可能需要候位。",
    highlight: "函館鹽拉麵代表"
  },
  {
    id: "lucky-pierrot-bay-area",
    name: "ラッキーピエロ ベイエリア本店（小丑漢堡）",
    area: "函館",
    type: "漢堡",
    season: ["winter"],
    time: "1h",
    best: "中華雞腿漢堡、函館限定、金森紅磚倉庫",
    desc: "函館限定連鎖的第一號店，就在金森紅磚倉庫旁。招牌中華雞腿漢堡份量足，適合當午餐、晚餐或港區散步後的彈性備選。",
    highlight: "函館限定漢堡"
  }
];

const winterTemplate = {
  1: ["new-chitose-airport", "nippon-rentacar-new-chitose", "premier-cabin-asahikawa", "aeon-mall-asahikawa-ekimae", "tokiwa-park", "kamikawa-shrine", "asahikawa-heiwa-dori"],
  2: ["furano-field", "biei-shrine", "hinode-park", "ningle-terrace", "sapporo-odori", "sapporo-susukino"],
  3: ["sapporo-fushimi-inari", "hokkaido-shrine", "otaru-inari-shrine", "teine-shrine", "wakadori-naruto-honten", "otaru-canal", "taisho-glass", "otaru-meruhen-crossing"],
  4: ["noboribetsu-valley", "noboribetsu-onsen-street", "tenkatsu-honten-muroran", "muroran-hakucho-bridge-view", "happiness-bell"],
  5: ["unagi-nakajima", "moiwa-yama"],
  6: ["sapporo-beer-museum", "ario-sapporo", "toriton-kita8", "kinotoya-bake-pole-town", "3coins-pole-town", "ramen-haruka"],
  7: ["toyako-lake", "makkari-village", "silo-observatory", "konpira-crater-view"],
  8: ["goryokaku"],
  9: ["kanemori-warehouse", "hakodate-hachimangu", "hakodate-gokoku-shrine", "hakodate-mt"],
  10: ["morning-market", "motomachi", "hakodate-airport"]
};

const legacyDayTwoBackup = ["sapporo-odori", "shiroi-koibito-park", "sapporo-susukino"];
const dayTwoBackup = ["sunagawa-highway-oasis", "shiroi-koibito-park", "sapporo-susukino"];

const winterProfile = {
  label: "12/23-1/1",
  blurb: "新千歲入境，旭川與富良野 1 天；札幌 6 天（含小樽）；洞爺湖 1 天，函館跨年 2 天",
  route: "除函館那天還車，其餘天數都開車",
  style: "冬季限定"
};

const tripDates = ["12/23", "12/24", "12/25", "12/26", "12/27", "12/28", "12/29", "12/30", "12/31", "1/1"];

const daySummaries = {
  1: "從新千歲機場入境、取車後前往旭川。入住後先到旭川站前補雪靴或防滑鞋，再視體力安排常磐公園、上川神社和平和通散步。",
  2: "從旭川走富良野、美瑛與上富良野，傍晚前往札幌，晚上逛大通與薄野。",
  3: "上午安排札幌神社巡禮，接著前往小樽吃午餐、走運河、逛玻璃店與童話十字路。",
  4: "從札幌前往登別，走完地獄谷後逛溫泉街，再到室蘭天勝本店吃天丼，下午安排白鳥大橋展望台和幸福之鐘。",
  5: "札幌自由活動日，中午先吃鰻魚飯，傍晚再上藻岩山看夜景。",
  6: "札幌市區採買與美食日，安排啤酒博物館、商場、迴轉壽司、甜點與拉麵。",
  7: "從札幌前往洞爺湖，途中經過真狩村，抵達後走湖畔、展望台與火山遺跡。",
  8: "從洞爺湖移動到函館，當天以五稜郭為主，晚上入住函館站附近。",
  9: "函館市區一日，走金森倉庫與神社，傍晚上函館山看夜景。",
  10: "函館朝市早餐、元町散步，最後前往函館機場返程。"
};

const spotLogistics = {
  "new-chitose-airport": {
    hours: "機場主體約 06:00-23:00（航班時段可能更早/更晚）",
    access: "JR 快速列車可到札幌；自駕取車後走道央道往旭川約 2.5-3 小時"
  },
  "nippon-rentacar-new-chitose": {
    hours: "常見 07:00-22:00；11-3月常見 07:00-21:00，年末年始可能縮短",
    access: "抵達後到國內線 1F 到着口3附近租車櫃台報到，再搭接駁車到營業所，單程約 10-15 分鐘"
  },
  "premier-cabin-asahikawa": {
    hours: "住宿設施依訂房方案；一般入住時間請以預約頁面為準",
    access: "JR 旭川站步行約 3 分鐘；旭川站前巴士總站步行約 5 分鐘"
  },
  "tokiwa-park": {
    hours: "公園全天可散步；管理事務所常見 08:30-17:15",
    access: "JR 旭川站開車約 5 分鐘，也可由市區步行或搭巴士前往"
  },
  "kamikawa-shrine": {
    hours: "境內可參拜；授與所與御朱印依現場公告",
    access: "位於神樂岡公園內，自駕或計程車較順，冬季注意園內步道積雪"
  },
  "asahikawa-heiwa-dori": {
    hours: "街區全天可走；各店家營業時間不同，晚餐店建議現場確認",
    access: "JR 旭川站步行約 5 分鐘，從飯店步行逛街找餐廳很方便"
  },
  "aeon-mall-asahikawa-ekimae": {
    hours: "AEON MALL 專門店常見 10:00-21:00；ABC-MART SPORTS 也是 10:00-21:00，年末年始可能調整",
    access: "地址：旭川市宮下通7丁目2番5号。JR 旭川站直結，從 Premier Hotel-CABIN 旭川步行約 3-5 分鐘；2F ABC-MART SPORTS 可先找雪靴、防滑鞋與保暖鞋款"
  },
  "feeeal-asahikawa": {
    hours: "各店舖營業時間不同，出發前請以商場公告為準",
    access: "地址：旭川市1条通8丁目108番地。JR 旭川站步行約 5 分鐘，平和通買物公園旁"
  },
  "sunagawa-highway-oasis": {
    hours: "冬季（10/1-4/30）09:00-17:00；餐廳 10:30-17:00（L.O. 16:30），元旦休館",
    access: "地址：砂川市北光336番地7。從旭川往札幌可由道央道砂川 SA 上行線進入專用道路，停車與入館免費"
  },
  "biei-shrine": {
    hours: "境內通年可參拜；授與所依現場公告",
    access: "美瑛站步行約 30 分鐘；自駕停車較順，請勿進入鄰近私有地"
  },
  "hinode-park": {
    hours: "公園可全天停留；冬季視積雪與道路狀況調整",
    access: "JR 上富良野站開車約 5 分鐘，冬季建議自駕並確認路況"
  },
  "ningle-terrace": {
    hours: "冬季常見約 12:00-20:45",
    access: "從旭川/富良野自駕最方便，夜間注意結冰路段"
  },
  "hokkaido-shrine": {
    hours: "境內全天開放；授與所常見 09:00-16:00",
    access: "札幌地鐵圓山公園站步行約 15 分鐘"
  },
  "sapporo-odori": {
    hours: "公園全天可進入；活動檔期時間依主辦單位",
    access: "地鐵大通站出站即達"
  },
  "daimaru-sapporo": {
    hours: "常見 10:00-20:00；餐廳樓層依店舖可能更晚",
    access: "JR 札幌站直結，適合和 Stellar Place、東急百貨串遊"
  },
  "mitsukoshi-sapporo": {
    hours: "常見 10:00-19:30；餐飲與活動依樓層調整",
    access: "地鐵大通站附近，和丸井今井札幌本店步行可串遊"
  },
  "marui-imai-sapporo": {
    hours: "常見 10:30-19:30；食品與活動樓層依官方公告",
    access: "札幌市中央區南一条西2丁目，地鐵大通站步行可達"
  },
  "tokyu-sapporo": {
    hours: "常見 10:00-20:00；餐飲樓層依店舖調整",
    access: "札幌站南口附近，JR/地鐵札幌站步行可達"
  },
  "stellar-place": {
    hours: "購物常見 10:00-21:00；餐廳樓層常見到 23:00",
    access: "JR 札幌站直結，下雪天移動最省力"
  },
  "donki-tanukikoji": {
    hours: "營業時間與年末年始安排請以店鋪公告為準",
    access: "地址：札幌市中央区南3条西4丁目12-1。狸小路商店街內，從大通、Pole Town、薄野皆可步行串接"
  },
  "shiroi-koibito-park": {
    hours: "常見 10:00-18:00",
    access: "地鐵東西線宮之澤站步行可到"
  },
  "sapporo-beer-museum": {
    hours: "自由見學常見 11:00-18:00（最終入館 17:30）；週一、年末年始等可能休館",
    access: "地址：札幌市東区北7条東9丁目1-1。地鐵東区役所前站步行約 10 分鐘；旁邊可接 Ario 札幌"
  },
  "ario-sapporo": {
    hours: "專門店/2F 美食街常見 10:00-21:00；1F 餐廳街常見 11:00-21:00",
    access: "地址：札幌市東区北7条東9丁目2-20。JR 苗穗站北口步行約 3 分鐘，札幌啤酒博物館旁"
  },
  "toriton-kita8": {
    hours: "常見 11:00-22:00（L.O. 21:30）；混雜時可能提前停止受付",
    access: "地址：札幌市東区北8条東5丁目19-1。札幌啤酒博物館開車約 10 分鐘；不接受座位預約，排隊時間要抓寬"
  },
  "hanamaru-stellar-place": {
    hours: "常見 11:00-22:00（L.O. 21:30）；不定休依 Stellar Place",
    access: "地址：札幌市中央区北5条西2丁目 札幌ステラプレイス CENTER 6F。JR 札幌站直結；迴轉壽司席位通常不可預約，建議離峰或先取號"
  },
  "shiki-hanamaru-tokeidai": {
    hours: "日-四/祝 11:00-22:00（L.O. 21:30）；五六/祝前 11:00-23:00（L.O. 22:30）；平日午餐 11:00-15:00",
    access: "地址：札幌市中央区北1条西2丁目1 札幌時計台ビル1F。大通站步行約 3 分鐘；部分時段可電話預約"
  },
  "ramen-haruka": {
    hours: "常見 11:00-14:30、17:00-23:00；賣完可能提前結束，週二晚/週三午常見休息",
    access: "地址：札幌市中央区南5条西3丁目 N・グランデビル1F 元祖ラーメン横丁内，薄野站周邊步行可達"
  },
  "totori-honten": {
    hours: "常見 12:00-24:00，午餐常見 12:00-14:00；年末年始可能休息，建議預約並於出發前確認",
    access: "地址：札幌市中央区南5条西7丁目。從 APA Hotel Sapporo Susukino Ekinishi 步行約 2-4 分鐘，薄野站步行約 8-10 分鐘"
  },
  "kinotoya-bake-pole-town": {
    hours: "常見 10:00-21:00（L.O. 20:45）；休業日同 Pole Town",
    access: "地址：札幌市中央区南2条西3丁目 さっぽろ地下街ポールタウン内。大通、狸小路、薄野都可步行串遊"
  },
  "3coins-pole-town": {
    hours: "常見 10:00-20:00；以札幌地下街公告為準",
    access: "地址：札幌市中央区南2条西3丁目 札幌地下街ポールタウン B1F。與 KINOTOYA BAKE 同在 Pole Town，往薄野拉麵橫丁也順路"
  },
  "sapporo-fushimi-inari": {
    hours: "境內可參拜；授與品與御朱印依社務所公告",
    access: "圓山公園站轉 JR 北海道巴士至慈啓会前，步行約 3 分鐘；市電西線14條站步行約 15 分鐘"
  },
  "teine-shrine": {
    hours: "御朱印受付常見 09:00-17:00",
    access: "JR 手稻站步行約 2 分鐘，往小樽方向移動時很順"
  },
  "otaru-canal": {
    hours: "全天可走訪；點燈與活動依季節",
    access: "JR 小樽站步行約 10-15 分鐘"
  },
  "otaru-sakaimachi": {
    hours: "多數商店約 10:00-18:00",
    access: "可由運河步行串遊，雪天建議防滑鞋"
  },
  "otaru-inari-shrine": {
    hours: "御朱印受付常見 09:00-12:00、13:00-17:00",
    access: "JR 小樽站前搭中央巴士往手宮方向，於手宮公園上周邊步行；自駕較彈性"
  },
  "taisho-glass": {
    hours: "本店常見 09:00-19:00；各分店與體驗時段不同",
    access: "小樽運河與堺町通可步行串遊，體驗課程建議事先預約"
  },
  "otaru-meruhen-crossing": {
    hours: "街區全天可走；周邊商店多為白天到傍晚",
    access: "堺町通南端，從南小樽站或小樽運河皆可步行串遊"
  },
  "wakadori-naruto-honten": {
    hours: "常見 11:00-21:00（L.O. 20:30）；定休日不定休，元旦常見休息",
    access: "地址：小樽市稲穂3丁目16番13号。JR 小樽站步行約 7-8 分鐘；有免費停車位，熱門時段可能需候位"
  },
  "popura-farm-otaru": {
    hours: "官方常見 11:00-17:30（L.O. 17:00）；可能縮短營業，不定休",
    access: "地址：小樽市色内1-1 小樽出抜小路內。JR 小樽站步行約 10 分鐘，位在小樽運河前"
  },
  "moiwa-yama": {
    hours: "纜車常見 10:30-22:00（最終上山提前）",
    access: "市電轉接駁巴士或計程車最順"
  },
  "unagi-nakajima": {
    hours: "午餐 11:30-15:00（L.O. 14:00）；晚餐 17:00-22:00（L.O. 21:00）；年末營業請另行確認",
    access: "地址：札幌市中央區南9條西2丁目2-10 Hotel Mystays Premier Sapporo Park 2F；地下鐵中島公園站步行約 2 分鐘"
  },
  "toyako-lake": {
    hours: "湖畔散步全天可走；遊船/設施依季節營運",
    access: "自駕最方便，冬季注意風雪與能見度"
  },
  "restaurant-boyotei": {
    hours: "11:00-15:30（L.O. 14:30）、17:00-20:30（L.O. 19:30）；常見週三休息，晚間可能視來客提早結束",
    access: "地址：北海道虻田郡洞爺湖町洞爺湖温泉36-12。位於洞爺湖溫泉街並設有停車位，從湖畔主要飯店區步行或短程自駕可達"
  },
  "yotei-mountain": {
    hours: "觀景點全天可停留",
    access: "建議自駕沿線觀景，雪況差時不要進山路"
  },
  "noboribetsu-valley": {
    hours: "步道常見白天較安全（夜間不建議）",
    access: "洞爺湖與札幌間可順路停留，自駕最彈性"
  },
  "noboribetsu-onsen-street": {
    hours: "街區全天可通行；餐廳與商店多約 10:00 起營業，各店時間與休息日不同",
    access: "位在地獄谷入口與登別溫泉巴士總站之間；可續停地獄谷停車場，再步行逛溫泉街與用餐"
  },
  "muroran-hakucho-bridge-view": {
    hours: "展望區通常可自由停留；夜景與冬季路況需注意安全",
    access: "室蘭 IC 往白鳥大橋方向，自駕較方便；白鳥灣展望台也可由崎守站步行約 16 分鐘"
  },
  "happiness-bell": {
    hours: "戶外拍照點通常可自由停留；冬季以現場路況為準",
    access: "建議與室蘭白鳥大橋展望行程一起自駕短停"
  },
  "tenkatsu-honten-muroran": {
    hours: "常見平日 11:00-18:00、週末及假日 11:00-18:30；週四休息，售完可能提早結束",
    access: "地址：室蘭市中央町2丁目3-16。JR 室蘭站步行約 2-3 分鐘；店前無停車位，可使用附近指定停車場，常見僅收現金"
  },
  "makkari-village": {
    hours: "鄉村景觀點全天可停留；冬季請以除雪道路為主",
    access: "從二世谷/洞爺湖方向自駕順路，適合挑安全停車點拍羊蹄山"
  },
  "silo-observatory": {
    hours: "常見 08:30-17:00（11-4月），5-10月常見至 18:00",
    access: "道央道虻田洞爺湖 IC 開車約 15 分鐘；JR 洞爺站開車約 20 分鐘"
  },
  "konpira-crater-view": {
    hours: "散策路常見 4月中旬-9月底 07:00-18:00、10月-11月10日 07:00-16:00；冬季可能封閉",
    access: "從洞爺湖溫泉街或洞爺湖遊客中心周邊步行/短程自駕，請先確認是否開放"
  },
  "goryokaku": {
    hours: "公園全天可走；展望塔常見 09:00-18:00",
    access: "函館市電五稜郭公園前站轉巴士或步行"
  },
  "ajisai-honten-hakodate": {
    hours: "官方營業 11:00-20:25（L.O.）；第 4 個週三休息，遇假日改翌平日",
    access: "地址：函館市五稜郭町29-22。市電五稜郭公園前站步行約 10 分鐘；設有 7 個免費停車位"
  },
  "hakodate-hachimangu": {
    hours: "境內全天開放；授與所多為白天時段",
    access: "可由函館市電末廣町/谷地頭轉步行或計程車"
  },
  "hakodate-mt": {
    hours: "纜車常見 10:00-22:00（季節調整）",
    access: "纜車站可搭巴士/計程車，跨年建議提早卡位"
  },
  "marui-imai-hakodate": {
    hours: "常見 10:00-18:30；跨年與元旦通常縮短或休館，請以年末年始公告為準",
    access: "地址：函館市本町32-15。函館市電五稜郭公園前站步行約 1 分鐘，適合和五稜郭周邊同日安排"
  },
  "share-star-hakodate": {
    hours: "B1F-3F 店舖常見 10:00-20:00；1F Starbucks 常見 07:00-22:00；元旦全館通常休館",
    access: "函館市電五稜郭公園前站下車即達，本町商圈購物備案"
  },
  "kiralis-hakodate": {
    hours: "各店舖與設施不同，出發前看官方樓層/店舖公告",
    access: "函館站前，適合和函館朝市、還車、搭車前後串在一起"
  },
  "hokkaido-shikisai-hakodate": {
    hours: "常見 07:00-20:00；站內個別專櫃可能較早結束，年末年始請確認公告",
    access: "地址：函館市若松町12-13 JR 函館站內。函館站出站即達，可和朝市、キラリス函館串接"
  },
  "hakodate-meijikan": {
    hours: "常見 09:30-18:00；季節性調整與年末年始營業請以官方公告為準",
    access: "地址：函館市豊川町11-17。十字街站步行約 5 分鐘，金森紅磚倉庫與元町周邊皆可步行串遊"
  },
  "mega-donki-hakodate": {
    hours: "常見 09:00-00:00，無固定公休日；年末年始請以店鋪公告為準",
    access: "地址：函館市美原1丁目7-1。非市中心步行圈，建議自駕從五稜郭或函館機場方向順路停靠"
  },
  "hakodate-gokoku-shrine": {
    hours: "社務所窗口常見 09:00-16:00 前後；境內參拜依現場公告",
    access: "函館山麓站出口步行約 3 分鐘，適合與元町/函館山夜景串遊"
  },
  "lucky-pierrot-bay-area": {
    hours: "官方營業 10:00-21:00（餐點 L.O. 20:30）",
    access: "地址：函館市末広町23-18。金森紅磚倉庫旁，市電末廣町站步行約 3 分鐘；店舖無停車場"
  },
  "morning-market": {
    hours: "冬季（1-4月）多數店家常見 06:00 至 14:00 後；跨年店家營業差異很大，12/31 多數可能提早結束",
    access: "地址：函館市若松町9-19。函館站步行約 1-2 分鐘，適合和站內伴手禮店一起安排"
  },
  "kanemori-warehouse": {
    hours: "多數店家常見 09:30-19:00；跨年與元旦通常縮短營業，請以當年度公告為準",
    access: "地址：函館市末広町14-12。函館站可步行或搭市電至十字街，步行約 5 分鐘"
  },
  motomachi: {
    hours: "街區全天可散步；教堂/館舍多為白天開放",
    access: "建議從十字街一路沿坡道慢走"
  },
  "hakodate-airport": {
    hours: "航廈常見約 07:30-20:00（依航班）",
    access: "函館站巴士約 20 分鐘；自駕還車建議預留 60-90 分鐘"
  }
};

const requiredTemplateStops = {
  10: ["hakodate-airport"]
};

const accommodations = [
  {
    label: "12/23-12/24 旭川",
    name: "Premier Hotel -CABIN- Asahikawa",
    note: "旭川住宿"
  },
  {
    label: "12/24-12/29 札幌",
    name: "APA Hotel Sapporo Susukino Ekinishi",
    note: "札幌市區住宿"
  },
  {
    label: "12/29-12/30 洞爺湖",
    name: "Toya Kohan Tei",
    note: "湖畔溫泉住宿"
  },
  {
    label: "12/30-1/1 函館",
    name: "La'gent Stay Hakodate Ekimae",
    note: "函館住宿"
  }
];

const dayBaseAreas = {
  1: "新千歲",
  2: "旭川",
  3: "札幌",
  4: "札幌",
  5: "札幌",
  6: "札幌",
  7: "札幌",
  8: "洞爺湖",
  9: "函館",
  10: "函館"
};

const areaDriveMinutes = {
  "新千歲|旭川": 160,
  "新千歲|富良野": 140,
  "新千歲|札幌": 60,
  "旭川|富良野": 65,
  "旭川|美瑛": 40,
  "旭川|砂川": 55,
  "旭川|札幌": 130,
  "砂川|札幌": 70,
  "札幌|小樽": 45,
  "札幌|札幌郊外": 55,
  "札幌|洞爺湖": 120,
  "札幌|登別": 95,
  "札幌|西部山區": 120,
  "札幌|二世谷": 130,
  "洞爺湖|登別": 45,
  "洞爺湖|函館": 155,
  "洞爺湖|二世谷": 75,
  "洞爺湖|西部山區": 80,
  "函館|函館": 20,
  "函館|登別": 170
};

const storageKey = "hokkaido-trip-planner-plan";
const mealPlanKey = "hokkaido-trip-planner-meals";
const planTemplateVersionKey = "hokkaido-trip-planner-plan-template-version";
const previousPlanTemplateVersions = ["2026-08-17-otaru-naruto", "2026-09-21-winter-shopping", "2026-09-22-day5-unagi", "2026-09-22-day5-unagi-lunch", "2026-09-22-day4-noboribetsu-onsen-street"];
const currentPlanTemplateVersion = "2026-09-22-day4-tenkatsu-lunch";
const fixedCarModel = "VOXY";
const savedAtKey = "hokkaido-trip-planner-saved-at";
const syncCodeKey = "hokkaido-trip-planner-sync-code";
const syncClientIdKey = "hokkaido-trip-planner-sync-client-id";
const cloudPendingKey = "hokkaido-trip-planner-cloud-pending";
const syncCodeMinLength = 2;
const syncCodeMaxLength = 40;
const foodTypes = ["美食", "食堂", "市場", "海鮮", "餐", "壽司", "拉麵", "甜點", "炸雞", "燒肉", "洋食", "漢堡", "天丼", "天婦羅", "鰻魚飯"];
const mealSlotDefinitions = [
  { id: "lunch", label: "午餐", defaultTime: "12:00" },
  { id: "dinner", label: "晚餐", defaultTime: "18:30" }
];
const mealPriorityOptions = [
  { value: "flexible", label: "彈性安排" },
  { value: "want", label: "想吃" },
  { value: "must", label: "必吃" }
];
const mealBookingOptions = [
  { value: "check", label: "待確認" },
  { value: "required", label: "需要預約" },
  { value: "booked", label: "已預約" },
  { value: "queue", label: "現場排隊" }
];

function buildPlan() {
  return {
    1: [...winterTemplate[1]],
    2: [...winterTemplate[2]],
    3: [...winterTemplate[3]],
    4: [...winterTemplate[4]],
    5: [...winterTemplate[5]],
    6: [...winterTemplate[6]],
    7: [...winterTemplate[7]],
    8: [...winterTemplate[8]],
    9: [...winterTemplate[9]],
    10: [...winterTemplate[10]]
  };
}

function createDefaultPlan() {
  return buildPlan();
}

function createMealEntry(slotId) {
  const definition = mealSlotDefinitions.find((slot) => slot.id === slotId);
  return {
    primaryId: "",
    backupId: "",
    time: definition?.defaultTime || "",
    priority: "flexible",
    booking: "check",
    note: ""
  };
}

function buildMealPlan() {
  return Object.keys(winterTemplate).reduce((mealPlan, key) => {
    const day = Number(key);
    mealPlan[day] = {
      lunch: createMealEntry("lunch"),
      dinner: createMealEntry("dinner")
    };
    return mealPlan;
  }, {});
}

function normalizeMealEntry(rawEntry, slotId) {
  const fallback = createMealEntry(slotId);
  const primary = spotById(rawEntry?.primaryId);
  const backup = spotById(rawEntry?.backupId);
  const validPriorities = new Set(mealPriorityOptions.map((option) => option.value));
  const validBookings = new Set(mealBookingOptions.map((option) => option.value));
  const rawTime = String(rawEntry?.time || "");

  return {
    primaryId: primary && typeIncludes(primary, foodTypes) ? primary.id : "",
    backupId: backup && typeIncludes(backup, foodTypes) && backup.id !== primary?.id ? backup.id : "",
    time: /^([01]\d|2[0-3]):[0-5]\d$/.test(rawTime) ? rawTime : fallback.time,
    priority: validPriorities.has(rawEntry?.priority) ? rawEntry.priority : fallback.priority,
    booking: validBookings.has(rawEntry?.booking) ? rawEntry.booking : fallback.booking,
    note: typeof rawEntry?.note === "string" ? rawEntry.note.trim().slice(0, 120) : ""
  };
}

function normalizeMealPlan(rawMealPlan) {
  const normalized = buildMealPlan();
  Object.keys(normalized).forEach((key) => {
    const day = Number(key);
    mealSlotDefinitions.forEach((slot) => {
      normalized[day][slot.id] = normalizeMealEntry(rawMealPlan?.[day]?.[slot.id], slot.id);
    });
  });
  normalized[1].lunch = createMealEntry("lunch");
  normalized[10].dinner = createMealEntry("dinner");
  return normalized;
}

function loadMealPlan() {
  const stored = window.localStorage.getItem(mealPlanKey);
  if (!stored) {
    return buildMealPlan();
  }

  try {
    return normalizeMealPlan(JSON.parse(stored));
  } catch {
    return buildMealPlan();
  }
}

function ensureRequiredStops(plan) {
  Object.keys(requiredTemplateStops).forEach((key) => {
    const day = Number(key);
    if (!Array.isArray(plan[day])) {
      plan[day] = [];
    }

    requiredTemplateStops[day].forEach((spotId) => {
      if (spotById(spotId) && !plan[day].includes(spotId)) {
        plan[day].push(spotId);
      }
    });
  });

  return plan;
}

function planStopsEqual(first, second) {
  return Array.isArray(first)
    && Array.isArray(second)
    && first.length === second.length
    && first.every((spotId, index) => spotId === second[index]);
}

function migratePreviousTemplate(plan) {
  let changed = false;
  const dayOne = plan[1] || [];
  const hotelIndex = dayOne.indexOf("premier-cabin-asahikawa");

  if (hotelIndex >= 0 && !dayOne.includes("aeon-mall-asahikawa-ekimae")) {
    dayOne.splice(hotelIndex + 1, 0, "aeon-mall-asahikawa-ekimae");
    changed = true;
  }

  if (planStopsEqual(plan[2], legacyDayTwoBackup)) {
    plan[2] = [...dayTwoBackup];
    changed = true;
  }

  if (planStopsEqual(plan[5], ["moiwa-yama"])
    || planStopsEqual(plan[5], ["moiwa-yama", "unagi-nakajima"])) {
    plan[5] = [...winterTemplate[5]];
    changed = true;
  }

  if (planStopsEqual(plan[4], ["noboribetsu-valley", "muroran-hakucho-bridge-view", "happiness-bell"])
    || planStopsEqual(plan[4], ["noboribetsu-valley", "noboribetsu-onsen-street", "muroran-hakucho-bridge-view", "happiness-bell"])) {
    plan[4] = [...winterTemplate[4]];
    changed = true;
  }

  return changed;
}

function loadPlan() {
  const stored = window.localStorage.getItem(storageKey);
  if (!stored) {
    return createDefaultPlan();
  }

  try {
    const storedTemplateVersion = window.localStorage.getItem(planTemplateVersionKey);
    if (![...previousPlanTemplateVersions, currentPlanTemplateVersion].includes(storedTemplateVersion)) {
      return createDefaultPlan();
    }

    const parsed = JSON.parse(stored);
    const plan = Object.keys(winterTemplate).reduce((accumulator, key) => {
      const day = Number(key);
      accumulator[day] = Array.isArray(parsed[day]) ? parsed[day].filter((id) => spotById(id)) : [];
      return accumulator;
    }, {});

    if (previousPlanTemplateVersions.includes(storedTemplateVersion)) {
      const normalizedChanged = Object.keys(winterTemplate).some((key) => {
        const day = Number(key);
        return !planStopsEqual(Array.isArray(parsed[day]) ? parsed[day] : [], plan[day]);
      });
      const migrationChanged = migratePreviousTemplate(plan);
      window.localStorage.setItem(storageKey, JSON.stringify(plan));
      window.localStorage.setItem(planTemplateVersionKey, currentPlanTemplateVersion);
      if (normalizedChanged || migrationChanged) {
        window.localStorage.setItem(cloudPendingKey, "1");
      }
    }

    const hasAnyStops = Object.values(plan).some((dayStops) => dayStops.length > 0);
    return hasAnyStops ? ensureRequiredStops(plan) : createDefaultPlan();
  } catch {
    return createDefaultPlan();
  }
}

function savePlan() {
  window.localStorage.setItem(storageKey, JSON.stringify(state.plan));
  window.localStorage.setItem(mealPlanKey, JSON.stringify(state.mealPlan));
  window.localStorage.setItem(planTemplateVersionKey, currentPlanTemplateVersion);
}

function loadSavedAt() {
  return window.localStorage.getItem(savedAtKey) || "";
}

function loadSyncCode() {
  return window.localStorage.getItem(syncCodeKey) || "";
}

function loadCloudPending() {
  return window.localStorage.getItem(cloudPendingKey) === "1";
}

function getOrCreateClientId() {
  const existing = window.localStorage.getItem(syncClientIdKey);
  if (existing) {
    return existing;
  }

  const newId = `client-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(syncClientIdKey, newId);
  return newId;
}

const state = {
  selectedDay: 1,
  search: "",
  spotArea: "all",
  spotCategory: "all",
  spotPage: 0,
  summaryMode: "day",
  alternativePreview: "B",
  focusId: spots[0].id,
  plan: loadPlan(),
  mealPlan: loadMealPlan(),
  dragging: null,
  carModel: fixedCarModel,
  dirty: false,
  editRevision: 0,
  cloudPending: loadCloudPending(),
  lastSavedAt: loadSavedAt(),
  syncCode: loadSyncCode(),
  pendingChangeSummary: "初始化行程",
  pendingChangeDetail: "套用目前規劃",
  changeLog: []
};

const dom = {
  searchInput: document.getElementById("search-input"),
  dayTabs: document.getElementById("day-tabs"),
  itineraryList: document.getElementById("itinerary-list"),
  itineraryDropzone: document.getElementById("itinerary-dropzone"),
  spotGrid: document.getElementById("spot-grid"),
  spotAreaTabs: document.getElementById("spot-area-tabs"),
  spotCategoryTabs: document.getElementById("spot-category-tabs"),
  spotPagination: document.getElementById("spot-pagination"),
  dayNote: document.getElementById("day-note"),
  metricDays: document.getElementById("metric-days"),
  metricSpots: document.getElementById("metric-spots"),
  metricSeason: document.getElementById("metric-season"),
  focusArea: document.getElementById("focus-area"),
  focusCopy: document.getElementById("focus-copy"),
  styleValue: document.getElementById("style-value"),
  routeValue: document.getElementById("route-value"),
  carModelValue: document.getElementById("car-model-value"),
  updatedValue: document.getElementById("updated-value"),
  focusTag: document.getElementById("focus-tag"),
  focusTitle: document.getElementById("focus-title"),
  focusDesc: document.getElementById("focus-desc"),
  focusMeta: document.getElementById("focus-meta"),
  focusPractical: document.getElementById("focus-practical"),
  changeLogGrid: document.getElementById("change-log-grid"),
  stayGrid: document.getElementById("stay-grid"),
  savePlanBtn: document.getElementById("save-plan-btn"),
  printPlanBtn: document.getElementById("print-plan-btn"),
  printReport: document.getElementById("print-report"),
  saveStatus: document.getElementById("save-status"),
  syncCodeInput: document.getElementById("sync-code-input"),
  connectSyncBtn: document.getElementById("connect-sync-btn"),
  syncStatus: document.getElementById("sync-status"),
  uiMessage: document.getElementById("ui-message"),
  mealSlots: document.getElementById("meal-slots"),
  mealProgress: document.getElementById("meal-progress")
};

let uiMessageTimer = null;

const cloud = {
  initialized: false,
  connecting: false,
  initializationPromise: null,
  configured: false,
  db: null,
  modules: null,
  unsubscribe: null,
  activeCode: "",
  connectionAttempt: 0,
  pendingTimer: null,
  pushInFlight: false,
  applyingRemote: false,
  clientId: getOrCreateClientId(),
  version: 0,
  syncedRevision: 0,
  basePlan: null
};

function getEditorLabel() {
  return cloud.clientId.replace("client-", "裝置-");
}

function recordChange(summary, detail = "") {
  state.pendingChangeSummary = summary;
  state.pendingChangeDetail = detail;
}

function getMapUrl(spot) {
  const query = `${spot.name} ${spot.area} 北海道`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getAccommodationMapUrl(hotel) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name)}`;
}

function getAreaDriveEstimate(fromArea, toArea) {
  if (!fromArea || !toArea) {
    return null;
  }

  if (fromArea === toArea) {
    return 20;
  }

  const direct = areaDriveMinutes[`${fromArea}|${toArea}`];
  if (typeof direct === "number") {
    return direct;
  }

  const reverse = areaDriveMinutes[`${toArea}|${fromArea}`];
  if (typeof reverse === "number") {
    return reverse;
  }

  if (fromArea.includes("札幌") || toArea.includes("札幌")) {
    return 80;
  }

  return 120;
}

function formatDriveMinutes(minutes) {
  if (typeof minutes !== "number") {
    return "預估車程待確認";
  }

  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  if (!hour) {
    return `預估車程約 ${minute} 分鐘`;
  }
  if (!minute) {
    return `預估車程約 ${hour} 小時`;
  }
  return `預估車程約 ${hour} 小時 ${minute} 分鐘`;
}

function getDriveInfoForStop(day, index, spotId) {
  const spot = spotById(spotId);
  if (!spot) {
    return "預估車程待確認";
  }

  const dayStops = state.plan[day] || [];
  if (index <= 0) {
    const baseArea = dayBaseAreas[day] || spot.area;
    const minutes = getAreaDriveEstimate(baseArea, spot.area);
    return `${formatDriveMinutes(minutes)}（由 ${baseArea} 出發）`;
  }

  const prevSpot = spotById(dayStops[index - 1]);
  if (!prevSpot) {
    return "預估車程待確認";
  }

  const minutes = getAreaDriveEstimate(prevSpot.area, spot.area);
  return `${formatDriveMinutes(minutes)}（由 ${prevSpot.name} 前往）`;
}

function getDriveInfoForFocus() {
  let foundDay = 0;
  let foundIndex = -1;

  Object.keys(state.plan).forEach((key) => {
    const day = Number(key);
    const index = state.plan[day].indexOf(state.focusId);
    if (index >= 0) {
      foundDay = day;
      foundIndex = index;
    }
  });

  if (!foundDay) {
    const focusSpot = spotById(state.focusId);
    if (!focusSpot) {
      return "預估車程待確認";
    }
    const minutes = getAreaDriveEstimate(dayBaseAreas[state.selectedDay] || focusSpot.area, focusSpot.area);
    return `${formatDriveMinutes(minutes)}（以 Day ${state.selectedDay} 起點估算）`;
  }

  return getDriveInfoForStop(foundDay, foundIndex, state.focusId);
}

function normalizeSyncCode(rawCode) {
  return String(rawCode || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "")
    .slice(0, syncCodeMaxLength);
}

function isValidSyncCode(code) {
  return new RegExp(`^[a-z0-9_-]{${syncCodeMinLength},${syncCodeMaxLength}}$`).test(code);
}

function hasPendingCloudChanges() {
  return cloud.pushInFlight || state.cloudPending || state.editRevision > cloud.syncedRevision;
}

function isSyncConfigValid() {
  const config = window.HOKKAIDO_SYNC_CONFIG || {};
  const required = ["apiKey", "authDomain", "projectId", "appId"];
  return required.every((field) => typeof config[field] === "string" && config[field].trim());
}

function setSyncStatus(message) {
  if (dom.syncStatus) {
    dom.syncStatus.textContent = `雲端同步：${message}`;
  }
}

function setUiMessage(message = "", kind = "info") {
  if (!dom.uiMessage) {
    return;
  }

  if (uiMessageTimer) {
    window.clearTimeout(uiMessageTimer);
    uiMessageTimer = null;
  }

  if (!message) {
    dom.uiMessage.textContent = "";
    dom.uiMessage.hidden = true;
    dom.uiMessage.removeAttribute("data-kind");
    return;
  }

  dom.uiMessage.textContent = message;
  dom.uiMessage.hidden = false;
  dom.uiMessage.dataset.kind = kind;

  uiMessageTimer = window.setTimeout(() => {
    setUiMessage("");
  }, 3200);
}

function updateSyncUi() {
  if (dom.syncCodeInput) {
    dom.syncCodeInput.value = state.syncCode;
  }

  if (dom.connectSyncBtn) {
    dom.connectSyncBtn.textContent = state.syncCode ? "重新連線同步" : "啟用自動同步";
  }
}

async function ensureCloudInitialized() {
  if (cloud.initialized) {
    return true;
  }

  if (cloud.initializationPromise) {
    return cloud.initializationPromise;
  }

  if (!isSyncConfigValid()) {
    cloud.configured = false;
    setSyncStatus("尚未設定（請先填 sync-config.js）");
    return false;
  }

  cloud.connecting = true;
  setSyncStatus("初始化中...");
  const config = window.HOKKAIDO_SYNC_CONFIG;

  cloud.initializationPromise = (async () => {
    try {
      const [{ initializeApp, getApp, getApps }, firestoreModule] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js")
      ]);

      const app = getApps().length ? getApp() : initializeApp(config);
      cloud.modules = firestoreModule;
      cloud.db = firestoreModule.getFirestore(app);
      cloud.initialized = true;
      cloud.configured = true;
      setSyncStatus("已就緒");
      return true;
    } catch (error) {
      console.error("Cloud sync initialization failed", error);
      setSyncStatus("初始化失敗，請重新連線");
      setUiMessage("Firebase 初始化失敗，請檢查網路後重試", "warn");
      return false;
    } finally {
      cloud.connecting = false;
      cloud.initializationPromise = null;
    }
  })();

  return cloud.initializationPromise;
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function getLocalCloudPlan() {
  return {
    ...cloneJson(state.plan),
    _meals: cloneJson(state.mealPlan)
  };
}

function getRemoteCloudPlan(payload) {
  const plan = normalizeImportedPlan(payload?.plan || {});
  const rawMeals = payload?.plan?._meals ?? payload?.mealPlan;
  return {
    ...plan,
    _meals: rawMeals === undefined ? buildMealPlan() : normalizeMealPlan(rawMeals)
  };
}

function valuesEqual(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}

function chooseMergedValue(baseValue, localValue, remoteValue) {
  if (valuesEqual(localValue, baseValue)) {
    return cloneJson(remoteValue);
  }
  if (valuesEqual(remoteValue, baseValue)) {
    return cloneJson(localValue);
  }
  return cloneJson(localValue);
}

function mergeCloudPlans(basePlan, localPlan, remotePlan) {
  const merged = {};
  Object.keys(winterTemplate).forEach((key) => {
    const day = Number(key);
    merged[day] = chooseMergedValue(basePlan?.[day] || [], localPlan?.[day] || [], remotePlan?.[day] || []);
  });

  merged._meals = buildMealPlan();
  Object.keys(merged._meals).forEach((key) => {
    const day = Number(key);
    mealSlotDefinitions.forEach((slot) => {
      const fields = Object.keys(createMealEntry(slot.id));
      fields.forEach((field) => {
        merged._meals[day][slot.id][field] = chooseMergedValue(
          basePlan?._meals?.[day]?.[slot.id]?.[field],
          localPlan?._meals?.[day]?.[slot.id]?.[field],
          remotePlan?._meals?.[day]?.[slot.id]?.[field]
        );
      });
      merged._meals[day][slot.id] = normalizeMealEntry(merged._meals[day][slot.id], slot.id);
    });
  });

  return merged;
}

function buildSyncPayload(plan = getLocalCloudPlan()) {
  return {
    plan,
    carModel: fixedCarModel,
    updatedAt: Date.now(),
    updatedBy: cloud.clientId
  };
}

function applyRemotePayload(payload) {
  const hasRemoteMeals = payload?.plan?._meals !== undefined || payload?.mealPlan !== undefined;
  const remotePlan = getRemoteCloudPlan(payload);
  state.plan = normalizeImportedPlan(remotePlan);
  if (hasRemoteMeals) {
    state.mealPlan = normalizeMealPlan(remotePlan._meals);
  }
  state.carModel = fixedCarModel;
  state.selectedDay = 1;

  const hasFocus = Object.values(state.plan).some((dayList) => dayList.length > 0);
  const firstId = hasFocus ? Object.values(state.plan).flat()[0] : spots[0].id;
  state.focusId = firstId || spots[0].id;

  const savedIso = typeof payload?.updatedAt === "number" ? new Date(payload.updatedAt).toISOString() : new Date().toISOString();
  state.lastSavedAt = savedIso;
  state.dirty = false;
  state.cloudPending = !hasRemoteMeals;
  if (state.cloudPending) {
    window.localStorage.setItem(cloudPendingKey, "1");
  } else {
    window.localStorage.removeItem(cloudPendingKey);
  }
  cloud.syncedRevision = state.editRevision;
  cloud.version = typeof payload?.version === "number" ? payload.version : cloud.version;
  cloud.basePlan = remotePlan;
  state.changeLog = Array.isArray(payload?.changes) ? payload.changes.slice(0, 30) : [];
  savePlan();
  window.localStorage.setItem(savedAtKey, state.lastSavedAt);
  render();
  updateSaveUi();
  return { needsMealMigration: !hasRemoteMeals };
}

async function pushCloudState() {
  if (!cloud.initialized || !cloud.activeCode || cloud.applyingRemote || cloud.pushInFlight) {
    return false;
  }

  const { doc, runTransaction } = cloud.modules;
  const ref = doc(cloud.db, "tripPlans", cloud.activeCode);
  const pushedRevision = state.editRevision;
  const localPlan = getLocalCloudPlan();
  const syncPayload = cloneJson(buildSyncPayload(localPlan));
  let pushSucceeded = false;
  cloud.pushInFlight = true;

  try {
    const changeItem = {
      at: Date.now(),
      by: getEditorLabel(),
      clientId: cloud.clientId,
      summary: String(state.pendingChangeSummary || "更新行程").slice(0, 80),
      detail: String(state.pendingChangeDetail || "").slice(0, 160)
    };

    const result = await runTransaction(cloud.db, async (transaction) => {
      const snapshot = await transaction.get(ref);
      const data = snapshot.exists() ? snapshot.data() : {};
      const remotePlan = getRemoteCloudPlan(data);
      const basePlan = cloud.basePlan || remotePlan;
      const mergedPlan = mergeCloudPlans(basePlan, localPlan, remotePlan);
      const currentVersion = typeof data?.version === "number" ? data.version : 0;
      const existingChanges = Array.isArray(data?.changes) ? data.changes : [];
      const nextVersion = currentVersion + 1;
      const nextChanges = [changeItem, ...existingChanges].slice(0, 30);

      transaction.set(ref, {
        ...syncPayload,
        plan: mergedPlan,
        version: nextVersion,
        changes: nextChanges
      }, { merge: true });

      return { version: nextVersion, changes: nextChanges, plan: mergedPlan };
    });

    cloud.version = result.version;
    cloud.basePlan = cloneJson(result.plan);
    pushSucceeded = true;
    state.changeLog = result.changes.slice(0, 30);
    state.lastSavedAt = new Date().toISOString();
    cloud.syncedRevision = Math.max(cloud.syncedRevision, pushedRevision);
    if (state.editRevision === pushedRevision) {
      state.plan = normalizeImportedPlan(result.plan);
      state.mealPlan = normalizeMealPlan(result.plan._meals);
      state.dirty = false;
      state.cloudPending = false;
      window.localStorage.removeItem(cloudPendingKey);
    }
    savePlan();
    window.localStorage.setItem(savedAtKey, state.lastSavedAt);
    render();
    updateSaveUi();
    setSyncStatus("同步完成");
  } catch (error) {
    console.error("Cloud sync push failed", error);
    setSyncStatus("同步失敗，本機變更仍保留");
  } finally {
    cloud.pushInFlight = false;
    if (hasPendingCloudChanges()) {
      queueCloudPush(pushSucceeded ? 0 : 5000);
    }
  }

  return pushSucceeded;
}

function queueCloudPush(delay = 700) {
  if (!cloud.initialized || !cloud.activeCode || cloud.applyingRemote) {
    return;
  }

  if (cloud.pendingTimer) {
    window.clearTimeout(cloud.pendingTimer);
  }

  cloud.pendingTimer = window.setTimeout(() => {
    cloud.pendingTimer = null;
    pushCloudState();
  }, delay);
}

async function connectCloudSync(rawCode) {
  const trimmed = String(rawCode || "").trim();
  const code = normalizeSyncCode(rawCode);
  if (!code) {
    setSyncStatus("請先輸入同步代碼");
    setUiMessage("請輸入 2–40 字同步代碼，例如 py", "warn");
    return;
  }

  if (!isValidSyncCode(code)) {
    setSyncStatus("同步代碼格式不符");
    setUiMessage("同步代碼須為 2–40 字，只能使用英數、-、_", "warn");
    return;
  }

  if (trimmed !== code) {
    setUiMessage("同步代碼已自動修正為英數小寫格式", "info");
  }

  state.syncCode = code;
  window.localStorage.setItem(syncCodeKey, code);
  updateSyncUi();

  const attemptId = ++cloud.connectionAttempt;
  const ready = await ensureCloudInitialized();
  if (!ready || attemptId !== cloud.connectionAttempt) {
    return;
  }

  if (cloud.pendingTimer) {
    window.clearTimeout(cloud.pendingTimer);
    cloud.pendingTimer = null;
  }

  if (cloud.unsubscribe) {
    cloud.unsubscribe();
    cloud.unsubscribe = null;
  }

  const { doc, getDoc, onSnapshot } = cloud.modules;
  const ref = doc(cloud.db, "tripPlans", code);
  cloud.activeCode = "";
  setSyncStatus("連線中...");

  try {
    const snapshot = await getDoc(ref);
    if (attemptId !== cloud.connectionAttempt) {
      return;
    }

    cloud.activeCode = code;
    if (snapshot.exists()) {
      const data = snapshot.data();
      const remoteVersion = Number.isSafeInteger(data?.version) ? data.version : 0;
      if (hasPendingCloudChanges()) {
        cloud.basePlan = getRemoteCloudPlan(data);
        cloud.version = Math.max(cloud.version, remoteVersion);
        setSyncStatus("已連線，正在保留並送出本機變更");
        queueCloudPush(0);
      } else {
        let remoteResult;
        try {
          cloud.applyingRemote = true;
          remoteResult = applyRemotePayload(data);
        } finally {
          cloud.applyingRemote = false;
        }
        setSyncStatus("已連線，自動同步中");
        if (remoteResult?.needsMealMigration) {
          queueCloudPush(0);
        }
      }
    } else {
      recordChange("建立雲端同步", `同步代碼：${code}`);
      state.cloudPending = true;
      window.localStorage.setItem(cloudPendingKey, "1");
      const created = await pushCloudState();
      setSyncStatus(created ? "已連線，已建立雲端資料" : "雲端建立失敗，本機資料仍保留");
    }
  } catch (error) {
    console.error("Cloud sync connection failed", error);
    if (attemptId !== cloud.connectionAttempt) {
      return;
    }

    cloud.activeCode = "";
    setSyncStatus("連線失敗，請稍後重試");
    if (error?.code === "permission-denied") {
      setUiMessage("Firebase 規則拒絕讀寫，請先發布 firestore.rules", "warn");
    } else {
      setUiMessage("雲端連線失敗，請檢查網路或 Firebase 規則", "warn");
    }
    return;
  }

  cloud.unsubscribe = onSnapshot(
    ref,
    (docSnap) => {
      if (attemptId !== cloud.connectionAttempt || !docSnap.exists()) {
        return;
      }

      const data = docSnap.data();
      if (!data) {
        return;
      }

      const remoteVersion = Number.isSafeInteger(data.version) ? data.version : 0;
      if (remoteVersion <= cloud.version) {
        return;
      }

      if (hasPendingCloudChanges()) {
        setSyncStatus(`收到遠端 v${remoteVersion}；先保留本機變更`);
        return;
      }

      let remoteResult;
      try {
        cloud.applyingRemote = true;
        remoteResult = applyRemotePayload(data);
      } finally {
        cloud.applyingRemote = false;
      }
      setSyncStatus(`已同步到最新版本 v${remoteVersion}`);
      if (remoteResult?.needsMealMigration) {
        queueCloudPush(0);
      }
    },
    (error) => {
      console.error("Cloud sync listener failed", error);
      if (attemptId !== cloud.connectionAttempt || cloud.activeCode !== code) {
        return;
      }

      cloud.unsubscribe = null;
      cloud.activeCode = "";
      setSyncStatus("即時同步中斷，請重新連線");
      if (error?.code === "permission-denied") {
        setUiMessage("Firebase 規則拒絕即時同步，請檢查 Firestore 規則", "warn");
      } else {
        setUiMessage("即時同步已中斷，請按「重新連線同步」重試", "warn");
      }
    }
  );
}

function formatSavedAt(isoText) {
  if (!isoText) {
    return "";
  }

  const date = new Date(isoText);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function updateSaveUi() {
  if (dom.savePlanBtn) {
    dom.savePlanBtn.disabled = !state.dirty;
  }

  if (!dom.saveStatus) {
    return;
  }

  if (state.dirty) {
    dom.saveStatus.textContent = "有未儲存變更";
    return;
  }

  const savedText = formatSavedAt(state.lastSavedAt);
  dom.saveStatus.textContent = savedText ? `已儲存：${savedText}` : "尚未儲存變更";
}

function persistState() {
  recordChange("手動儲存行程", `Day ${state.selectedDay} 內容已更新`);
  state.cloudPending = true;
  window.localStorage.setItem(cloudPendingKey, "1");
  savePlan();
  state.lastSavedAt = new Date().toISOString();
  window.localStorage.setItem(savedAtKey, state.lastSavedAt);
  state.dirty = false;
  renderSummary();
  updateSaveUi();
  queueCloudPush(0);
}

function markDirty() {
  state.dirty = true;
  state.editRevision += 1;
  renderSummary();
  updateSaveUi();
  queueCloudPush();
}

function normalizeImportedPlan(rawPlan) {
  const normalized = buildPlan();

  Object.keys(winterTemplate).forEach((key) => {
    const day = Number(key);
    if (!Array.isArray(rawPlan?.[day])) {
      normalized[day] = [];
      return;
    }

    const uniqueIds = new Set();
    normalized[day] = rawPlan[day].filter((id) => {
      if (!spotById(id) || uniqueIds.has(id)) {
        return false;
      }
      uniqueIds.add(id);
      return true;
    });
  });

  return ensureRequiredStops(normalized);
}

function exportPlanAsJson() {
  const payload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    carModel: fixedCarModel,
    plan: state.plan,
    mealPlan: state.mealPlan
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `hokkaido-plan-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function importPlanFromFile(file) {
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const importedPlan = normalizeImportedPlan(parsed?.plan ?? parsed);
    state.plan = importedPlan;
    state.mealPlan = normalizeMealPlan(parsed?.mealPlan ?? parsed?.plan?._meals ?? parsed?._meals ?? {});

    state.carModel = fixedCarModel;

    const hasFocus = Object.values(state.plan).some((dayList) => dayList.length > 0);
    const firstId = hasFocus ? Object.values(state.plan).flat()[0] : spots[0].id;
    state.focusId = firstId || spots[0].id;
    state.selectedDay = 1;
    recordChange("匯入行程", "由 JSON 匯入並覆蓋目前內容");
    markDirty();
    render();
  } catch {
    setUiMessage("匯入失敗：JSON 格式不正確", "warn");
  }
}

function spotById(id) {
  return spots.find((spot) => spot.id === id);
}

function getSpotLogistics(id) {
  return spotLogistics[id] || null;
}

function resetToDefaultPlan() {
  const confirmed = window.confirm("這會清除目前的行程與用餐安排，是否繼續？");
  if (!confirmed) {
    return;
  }

  try {
    window.localStorage.removeItem(dayTwoOriginalKey());
  } catch {
    setUiMessage("無法清除原行程備份，請確認瀏覽器允許儲存後再試。", "warn");
    return;
  }

  state.plan = createDefaultPlan();
  state.mealPlan = buildMealPlan();
  state.selectedDay = 1;
  state.summaryMode = "day";
  state.focusId = state.plan[1][0] || spots[0].id;
  recordChange("恢復預設行程", "清除目前行程與用餐安排，重置為 10 天預設行程");
  markDirty();
  render();
}

function addSpotToDay(spotId, day, mode = "toggle") {
  const selectedDay = Object.keys(state.plan).find((planDay) => state.plan[Number(planDay)].includes(spotId));
  if (selectedDay && Number(selectedDay) !== day) {
    const spot = spotById(spotId);
    setUiMessage(`${spot?.name || "此景點"} 已在 Day ${selectedDay}，先移除才能改到其他天`, "warn");
    state.selectedDay = Number(selectedDay);
    state.focusId = spotId;
    render();
    return;
  }

  const list = state.plan[day];
  const spot = spotById(spotId);
  if (mode === "toggle" && list.includes(spotId)) {
    state.plan[day] = list.filter((id) => id !== spotId);
    recordChange("移除景點", `Day ${day}：${spot?.name || spotId}`);
  } else if (!list.includes(spotId)) {
    list.push(spotId);
    recordChange("加入景點", `Day ${day}：${spot?.name || spotId}`);
  }
  state.selectedDay = day;
  state.focusId = spotId;
  markDirty();
  render();
}

function removeSpotFromDay(spotId, day) {
  const spot = spotById(spotId);
  state.plan[day] = state.plan[day].filter((id) => id !== spotId);
  if (state.focusId === spotId) {
    state.focusId = state.plan[day][0] || spots[0].id;
  }
  recordChange("移除景點", `Day ${day}：${spot?.name || spotId}`);
  markDirty();
  render();
}

function removeSpotAtIndex(day, index) {
  const list = state.plan[day];
  if (index < 0 || index >= list.length) {
    return;
  }

  const [removed] = list.splice(index, 1);
  const removedSpot = spotById(removed);
  if (state.focusId === removed) {
    state.focusId = list[0] || spots[0].id;
  }
  recordChange("拖曳移除景點", `Day ${day}：${removedSpot?.name || removed}`);
  markDirty();
  render();
}

function moveSpotInDay(day, fromIndex, toIndex) {
  const list = state.plan[day];
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) {
    return;
  }

  const [moved] = list.splice(fromIndex, 1);
  list.splice(toIndex, 0, moved);
  const movedSpot = spotById(moved);
  recordChange("調整景點順序", `Day ${day}：${movedSpot?.name || moved} 由第 ${fromIndex + 1} 站移到第 ${toIndex + 1} 站`);
  markDirty();
  renderItinerary();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getMealCandidates(day) {
  const dayAreas = new Set((state.plan[day] || []).map((id) => spotById(id)?.area).filter(Boolean));
  return spots
    .filter((spot) => typeIncludes(spot, foodTypes))
    .sort((first, second) => {
      const firstPreferred = dayAreas.has(first.area) ? 0 : 1;
      const secondPreferred = dayAreas.has(second.area) ? 0 : 1;
      if (firstPreferred !== secondPreferred) {
        return firstPreferred - secondPreferred;
      }
      return `${first.area}${first.name}`.localeCompare(`${second.area}${second.name}`, "zh-Hant");
    });
}

function getMealSlotsForDay(day) {
  return mealSlotDefinitions.filter((slot) => {
    if (day === 1 && slot.id === "lunch") {
      return false;
    }
    if (day === 10 && slot.id === "dinner") {
      return false;
    }
    return true;
  });
}

function renderMealOptions(day, selectedId, excludedId, placeholder) {
  const options = getMealCandidates(day)
    .filter((spot) => spot.id !== excludedId)
    .map((spot) => `
      <option value="${spot.id}" ${spot.id === selectedId ? "selected" : ""}>${escapeHtml(spot.area)}｜${escapeHtml(spot.name)}</option>
    `)
    .join("");
  return `<option value="">${placeholder}</option>${options}`;
}

function updateMealEntry(slotId, field, rawValue) {
  const day = state.selectedDay;
  const current = state.mealPlan[day]?.[slotId] || createMealEntry(slotId);
  const allowedFields = new Set(["primaryId", "backupId", "time", "priority", "booking", "note"]);
  if (!allowedFields.has(field)) {
    return;
  }

  const value = field === "note" ? String(rawValue || "").slice(0, 120) : String(rawValue || "");
  if (field === "backupId" && value && value === current.primaryId) {
    setUiMessage("備選餐廳不能和首選相同", "warn");
    renderMealPlanner();
    return;
  }

  const next = normalizeMealEntry({ ...current, [field]: value }, slotId);
  if (field === "primaryId" && next.primaryId && next.primaryId === current.backupId) {
    next.backupId = "";
  }

  state.mealPlan[day][slotId] = next;
  const definition = mealSlotDefinitions.find((slot) => slot.id === slotId);
  const primaryName = spotById(next.primaryId)?.name || "尚未安排";
  recordChange(`更新${definition?.label || "餐食"}`, `Day ${day}：${primaryName}`);
  markDirty();
  renderMealPlanner();
  renderDayTabs();
}

function clearMealEntry(slotId) {
  const definition = mealSlotDefinitions.find((slot) => slot.id === slotId);
  state.mealPlan[state.selectedDay][slotId] = createMealEntry(slotId);
  recordChange(`清除${definition?.label || "餐食"}`, `Day ${state.selectedDay}`);
  markDirty();
  renderMealPlanner();
  renderDayTabs();
}

function isMealEntryDefault(entry, slotId) {
  return valuesEqual(normalizeMealEntry(entry, slotId), createMealEntry(slotId));
}

function renderMealPlanner() {
  if (!dom.mealSlots) {
    return;
  }

  const day = state.selectedDay;
  const meals = state.mealPlan[day] || buildMealPlan()[day];
  const slots = getMealSlotsForDay(day);
  const arrangedCount = slots.filter((slot) => meals[slot.id]?.primaryId).length;
  if (dom.mealProgress) {
    dom.mealProgress.textContent = `${arrangedCount} / ${slots.length} 已安排`;
  }

  dom.mealSlots.innerHTML = slots.map((slot) => {
    const entry = meals[slot.id] || createMealEntry(slot.id);
    const primary = spotById(entry.primaryId);
    const logistics = primary ? getSpotLogistics(primary.id) : null;
    const priorityLabel = mealPriorityOptions.find((option) => option.value === entry.priority)?.label || "彈性安排";
    const bookingLabel = mealBookingOptions.find((option) => option.value === entry.booking)?.label || "待確認";
    const priorityOptions = mealPriorityOptions.map((option) => `
      <option value="${option.value}" ${option.value === entry.priority ? "selected" : ""}>${option.label}</option>
    `).join("");
    const bookingOptions = mealBookingOptions.map((option) => `
      <option value="${option.value}" ${option.value === entry.booking ? "selected" : ""}>${option.label}</option>
    `).join("");

    return `
      <section class="meal-slot" aria-labelledby="meal-${day}-${slot.id}-title">
        <div class="meal-slot-head">
          <div>
            <p class="meal-time-label">${escapeHtml(entry.time || slot.defaultTime)}</p>
            <h4 id="meal-${day}-${slot.id}-title">${slot.label}</h4>
          </div>
          <div class="meal-status-tags">
            <span class="tag ${entry.priority === "must" ? "meal-tag-important" : ""}">${priorityLabel}</span>
            <span class="tag ${entry.booking === "booked" ? "meal-tag-booked" : ""}">${bookingLabel}</span>
          </div>
        </div>

        <div class="meal-fields">
          <label class="meal-field meal-field-primary">
            <span>首選餐廳</span>
            <select class="meal-control" data-meal-slot="${slot.id}" data-meal-field="primaryId">
              ${renderMealOptions(day, entry.primaryId, "", "尚未安排")}
            </select>
          </label>
          <label class="meal-field meal-field-backup">
            <span>備選餐廳</span>
            <select class="meal-control" data-meal-slot="${slot.id}" data-meal-field="backupId">
              ${renderMealOptions(day, entry.backupId, entry.primaryId, "沒有備選")}
            </select>
          </label>
          <label class="meal-field meal-field-time">
            <span>時間</span>
            <input class="meal-control" type="time" value="${escapeHtml(entry.time)}" data-meal-slot="${slot.id}" data-meal-field="time" />
          </label>
          <label class="meal-field meal-field-priority">
            <span>優先度</span>
            <select class="meal-control" data-meal-slot="${slot.id}" data-meal-field="priority">${priorityOptions}</select>
          </label>
          <label class="meal-field meal-field-booking">
            <span>訂位狀態</span>
            <select class="meal-control" data-meal-slot="${slot.id}" data-meal-field="booking">${bookingOptions}</select>
          </label>
          <label class="meal-field meal-field-note">
            <span>備註</span>
            <input class="meal-control" type="text" maxlength="120" value="${escapeHtml(entry.note)}" placeholder="取號、預約時間、想吃的餐點" data-meal-slot="${slot.id}" data-meal-field="note" />
          </label>
        </div>

        ${primary ? `
          <div class="meal-selection">
            <div>
              <strong>${escapeHtml(primary.name)}</strong>
              <span>${escapeHtml(primary.area)} · ${escapeHtml(primary.highlight)}</span>
              ${logistics?.hours ? `<small>常見營業：${escapeHtml(logistics.hours)}</small>` : ""}
            </div>
            <div class="meal-selection-actions">
              <a class="map-link" href="${getMapUrl(primary)}" target="_blank" rel="noopener noreferrer">Google Maps</a>
              <button class="small-button alt" type="button" data-meal-focus="${primary.id}">看概覽</button>
            </div>
          </div>
        ` : ""}

        <button class="small-button alt meal-clear" type="button" data-clear-meal="${slot.id}" ${isMealEntryDefault(entry, slot.id) ? "disabled" : ""}>清除此餐</button>
      </section>
    `;
  }).join("");

  dom.mealSlots.querySelectorAll("[data-meal-field]").forEach((control) => {
    control.addEventListener("change", () => {
      updateMealEntry(control.dataset.mealSlot, control.dataset.mealField, control.value);
    });
  });

  dom.mealSlots.querySelectorAll("[data-clear-meal]").forEach((button) => {
    button.addEventListener("click", () => clearMealEntry(button.dataset.clearMeal));
  });

  dom.mealSlots.querySelectorAll("[data-meal-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      state.focusId = button.dataset.mealFocus;
      state.summaryMode = "spot";
      renderSummary();
      revealSpotDetails();
    });
  });
}

function dayTwoOriginalKey() {
  return `hokkaido-day2-original:${state.syncCode || "local"}`;
}

function isDayTwoBackup() {
  return JSON.stringify(state.plan[2]) === JSON.stringify(dayTwoBackup);
}

function getDayTwoSnapshot() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(dayTwoOriginalKey()));
    if (Array.isArray(saved?.original) && saved.original.every((id) => spotById(id))) return saved;
  } catch { /* Use the default original route when no valid snapshot exists. */ }
  return null;
}

function getDayTwoOriginal() {
  const snapshot = getDayTwoSnapshot();
  if (snapshot?.backupActive || isDayTwoBackup()) return snapshot?.original || [...winterTemplate[2]];
  return [...state.plan[2]];
}

function renderDayAlternative() {
  const panel = document.getElementById("day-alternative");
  document.getElementById("day-alternative-shell").hidden = state.selectedDay !== 2;
  panel.hidden = state.selectedDay !== 2;
  if (panel.hidden) return;
  const backup = state.alternativePreview === "B";
  const ids = backup ? dayTwoBackup : getDayTwoOriginal();
  const applied = JSON.stringify(state.plan[2]) === JSON.stringify(ids);
  panel.innerHTML = `
    <h3>Day 2 · 富良野行程備案</h3>
    <div class="alternative-tabs">
      <button type="button" class="small-button" data-alternative="A" aria-pressed="${!backup}">原行程</button>
      <button type="button" class="small-button" data-alternative="B" aria-pressed="${backup}">Plan B · 札幌景點版</button>
    </div>
    <p>${backup ? "假設不幸遇到火山活動或道路管制，導致美瑛、富良野支線無法通行，就切換 Plan B：從旭川出發，途中在砂川 Highway Oasis 休息補給，再前往白色戀人公園，晚上在薄野吃飯。" : "保留美瑛、富良野的安排，再前往札幌；若曾套用備案，這裡會還原切換前的景點順序。"}</p>
    <p class="alternative-route">${ids.map((id) => escapeHtml(spotById(id).name)).join(" → ") || "尚未安排景點"}</p>
    <p>遇封路或不適合開車時，先留在安全地點確認交通狀況。餐食安排會保留，切換後請檢查餐廳地點。</p>
    <p>原行程備份保留在這台裝置，套用後的行程照常同步。</p>
    <button type="button" class="small-button" id="apply-day-alternative" ${applied ? "disabled" : ""}>${applied ? "目前已套用此方案" : backup ? "套用 Plan B" : "還原原行程"}</button>`;
  panel.querySelectorAll("[data-alternative]").forEach((button) => {
    button.addEventListener("click", () => {
      state.alternativePreview = button.dataset.alternative;
      renderDayAlternative();
    });
  });
  panel.querySelector("#apply-day-alternative").addEventListener("click", () => {
    const conflict = ids.find((id) => Object.entries(state.plan).some(([day, stops]) => Number(day) !== 2 && stops.includes(id)));
    if (conflict) {
      setUiMessage(`${spotById(conflict).name} 已安排在其他天，請先移除再套用方案。`, "warn");
      return;
    }
    try {
      const snapshot = getDayTwoSnapshot();
      const original = backup ? (snapshot?.backupActive ? snapshot.original : [...state.plan[2]]) : ids;
      window.localStorage.setItem(dayTwoOriginalKey(), JSON.stringify({ original, backupActive: backup }));
    } catch {
      setUiMessage("無法備份原行程，請確認瀏覽器允許儲存後再試。", "warn");
      return;
    }
    state.plan[2] = [...ids];
    state.summaryMode = "day";
    recordChange(backup ? "套用 Day 2 備案" : "還原 Day 2 原行程", ids.map((id) => spotById(id).name).join(" → "));
    markDirty();
    render();
  });
}

function renderDayTabs() {
  const previousScroll = dom.dayTabs.scrollLeft;
  dom.dayTabs.innerHTML = Array.from({ length: 10 }, (_, index) => {
    const day = index + 1;
    const places = state.plan[day].length;
    const mealSlots = getMealSlotsForDay(day);
    const mealCount = mealSlots.filter((slot) => state.mealPlan[day]?.[slot.id]?.primaryId).length;
    return `
      <button class="day-tab ${state.selectedDay === day ? "active" : ""}" data-day="${day}" data-drop-day="${day}">
        <strong>Day ${day} (${tripDates[index]})</strong>
        <span>${places} 個點位 · 餐 ${mealCount}/${mealSlots.length}</span>
      </button>
    `;
  }).join("");

  dom.dayTabs.scrollLeft = previousScroll;
  dom.dayTabs.querySelectorAll("[data-day]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDay = Number(button.dataset.day);
      state.summaryMode = "day";
      render();
    });
  });

  dom.dayTabs.querySelectorAll("[data-drop-day]").forEach((button) => {
    button.addEventListener("dragover", (event) => {
      if (!Array.from(event.dataTransfer.types || []).includes("application/x-hokkaido-spot")) {
        return;
      }
      event.preventDefault();
      button.classList.add("drop-target");
      event.dataTransfer.dropEffect = "copy";
    });

    button.addEventListener("dragleave", () => {
      button.classList.remove("drop-target");
    });

    button.addEventListener("drop", (event) => {
      event.preventDefault();
      const spotId = event.dataTransfer.getData("application/x-hokkaido-spot");
      if (!spotId) {
        return;
      }
      button.classList.remove("drop-target");
      addSpotToDay(spotId, Number(button.dataset.dropDay), "add");
    });
  });
}

function renderItinerary() {
  const ids = state.plan[state.selectedDay];
  dom.dayNote.textContent = `今天編輯第 ${state.selectedDay} 天的行程，建議保持同區域或同主題移動。`;

  if (!ids.length) {
    dom.itineraryList.innerHTML = `
      <div class="stop-card">
        <div class="stop-top">
          <div>
            <h3>這一天還是空白的</h3>
            <p class="stop-desc">從右邊的景點庫拖曳進來，或先點按加入，讓路線先有骨架。</p>
          </div>
        </div>
      </div>
    `;
  } else {
    dom.itineraryList.innerHTML = ids
      .map((id, index) => {
        const spot = spotById(id);
        return `
          <article class="stop-card" draggable="true" data-index="${index}" data-spot-id="${spot.id}">
            <div class="stop-top">
              <div>
                <div class="stop-title-row">
                  <span class="drag-handle" aria-hidden="true">⋮⋮</span>
                  <h3>${index + 1}. ${spot.name}</h3>
                </div>
                <p class="stop-desc">${spot.desc}</p>
                <p class="spot-extra">${getDriveInfoForStop(state.selectedDay, index, spot.id)}</p>
                <a class="map-link" href="${getMapUrl(spot)}" target="_blank" rel="noopener noreferrer">Google Maps 導航</a>
              </div>
              <span class="tag">${spot.time}</span>
            </div>
            <div class="place-meta">
              <span class="tag">${spot.area}</span>
              <span class="tag">${spot.type}</span>
              <span class="tag">${spot.best}</span>
            </div>
            <div class="stop-actions">
              <button class="small-button" data-move-up="${spot.id}">上移</button>
              <button class="small-button" data-move-down="${spot.id}">下移</button>
              <button class="small-button alt" data-focus="${spot.id}">看細節</button>
              <button class="small-button" data-remove="${spot.id}">移除</button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  dom.itineraryList.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => removeSpotFromDay(button.dataset.remove, state.selectedDay));
  });

  dom.itineraryList.querySelectorAll("[data-move-up]").forEach((button) => {
    button.addEventListener("click", () => {
      if (ids.length < 2) {
        return;
      }
      const index = ids.indexOf(button.dataset.moveUp);
      const toIndex = index <= 0 ? ids.length - 1 : index - 1;
      moveSpotInDay(state.selectedDay, index, toIndex);
    });
  });

  dom.itineraryList.querySelectorAll("[data-move-down]").forEach((button) => {
    button.addEventListener("click", () => {
      if (ids.length < 2) {
        return;
      }
      const index = ids.indexOf(button.dataset.moveDown);
      const toIndex = index >= ids.length - 1 ? 0 : index + 1;
      moveSpotInDay(state.selectedDay, index, toIndex);
    });
  });

  dom.itineraryList.querySelectorAll("[data-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      state.focusId = button.dataset.focus;
      state.summaryMode = "spot";
      render();
      revealSpotDetails();
    });
  });

  dom.itineraryList.querySelectorAll(".stop-card[draggable='true']").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      state.dragging = Number(card.dataset.index);
      card.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("application/x-hokkaido-stop-index", card.dataset.index);
    });

    card.addEventListener("dragend", () => {
      state.dragging = null;
      card.classList.remove("dragging");
      dom.itineraryList.querySelectorAll(".drop-target").forEach((dropCard) => dropCard.classList.remove("drop-target"));
    });

    card.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (state.dragging === null) {
        return;
      }
      card.classList.add("drop-target");
      event.dataTransfer.dropEffect = "move";
    });

    card.addEventListener("dragleave", () => {
      card.classList.remove("drop-target");
    });

    card.addEventListener("drop", (event) => {
      event.preventDefault();
      const fromIndex = Number(event.dataTransfer.getData("application/x-hokkaido-stop-index"));
      const toIndex = Number(card.dataset.index);
      card.classList.remove("drop-target");
      moveSpotInDay(state.selectedDay, fromIndex, toIndex);
    });
  });

  if (!dom.itineraryList.dataset.dropBound) {
    dom.itineraryList.dataset.dropBound = "true";

    dom.itineraryList.addEventListener("dragover", (event) => {
      if (!Array.from(event.dataTransfer.types || []).includes("application/x-hokkaido-spot")) {
        return;
      }
      event.preventDefault();
      dom.itineraryList.classList.add("drop-target");
      event.dataTransfer.dropEffect = "copy";
    });

    dom.itineraryList.addEventListener("dragleave", () => {
      dom.itineraryList.classList.remove("drop-target");
    });

    dom.itineraryList.addEventListener("drop", (event) => {
      const spotId = event.dataTransfer.getData("application/x-hokkaido-spot");
      if (!spotId) {
        return;
      }
      event.preventDefault();
      dom.itineraryList.classList.remove("drop-target");
      addSpotToDay(spotId, state.selectedDay, "add");
    });
  }

  if (!dom.itineraryDropzone.dataset.dropBound) {
    dom.itineraryDropzone.dataset.dropBound = "true";

    dom.itineraryDropzone.addEventListener("dragover", (event) => {
      if (!Array.from(event.dataTransfer.types || []).includes("application/x-hokkaido-stop-index")) {
        return;
      }
      event.preventDefault();
      dom.itineraryDropzone.classList.add("active-dropzone");
      event.dataTransfer.dropEffect = "move";
    });

    dom.itineraryDropzone.addEventListener("dragleave", () => {
      dom.itineraryDropzone.classList.remove("active-dropzone");
    });

    dom.itineraryDropzone.addEventListener("drop", (event) => {
      const fromIndex = Number(event.dataTransfer.getData("application/x-hokkaido-stop-index"));
      if (Number.isNaN(fromIndex)) {
        return;
      }
      event.preventDefault();
      dom.itineraryDropzone.classList.remove("active-dropzone");
      removeSpotAtIndex(state.selectedDay, fromIndex);
    });
  }
}

function matchesFilters(spot) {
  const term = state.search.trim().toLowerCase();
  return matchesSpotArea(spot) && matchesSpotCategory(spot) && (!term || [spot.name, spot.area, spot.type, spot.desc, spot.best, spot.highlight]
    .join(" ")
    .toLowerCase()
    .includes(term));
}

function matchesSpotArea(spot) {
  return state.spotArea === "all" || spot.area === state.spotArea;
}

const spotCategories = [
  { id: "all", label: "全部" },
  { id: "sightseeing", label: "景點類" },
  { id: "shopping", label: "逛街購物" },
  { id: "food", label: "美食" }
];

const spotAreas = [
  { id: "all", label: "全部" },
  ...Array.from(new Set(spots.map((spot) => spot.area))).map((area) => ({ id: area, label: area }))
];

const shoppingSpotIds = new Set([
  "asahikawa-heiwa-dori",
  "aeon-mall-asahikawa-ekimae",
  "feeeal-asahikawa",
  "otaru-sakaimachi",
  "taisho-glass",
  "kanemori-warehouse",
  "daimaru-sapporo",
  "mitsukoshi-sapporo",
  "marui-imai-sapporo",
  "tokyu-sapporo",
  "stellar-place",
  "apa-sogo",
  "donki-tanukikoji",
  "ario-sapporo",
  "3coins-pole-town",
  "marui-imai-hakodate",
  "share-star-hakodate",
  "kiralis-hakodate",
  "hokkaido-shikisai-hakodate",
  "hakodate-meijikan",
  "mega-donki-hakodate"
]);
const utilityTypes = ["抵達點", "離境點", "取車", "入住飯店", "休息補給"];

function typeIncludes(spot, keywords) {
  return keywords.some((keyword) => spot.type.includes(keyword) || spot.name.includes(keyword));
}

function matchesSpotCategory(spot) {
  if (state.spotCategory === "all") {
    return true;
  }

  if (state.spotCategory === "shopping") {
    return shoppingSpotIds.has(spot.id);
  }

  if (state.spotCategory === "food") {
    return typeIncludes(spot, foodTypes);
  }

  if (state.spotCategory === "sightseeing") {
    return !shoppingSpotIds.has(spot.id)
      && !typeIncludes(spot, foodTypes)
      && !typeIncludes(spot, utilityTypes);
  }

  return true;
}

function getCategoryCount(categoryId) {
  const previousCategory = state.spotCategory;
  state.spotCategory = categoryId;
  const count = spots.filter((spot) => matchesSpotArea(spot) && matchesSpotCategory(spot)).length;
  state.spotCategory = previousCategory;
  return count;
}

function getAreaCount(areaId) {
  const previousArea = state.spotArea;
  state.spotArea = areaId;
  const count = spots.filter((spot) => matchesSpotArea(spot) && matchesSpotCategory(spot)).length;
  state.spotArea = previousArea;
  return count;
}

function renderSpotAreaTabs() {
  if (!dom.spotAreaTabs) {
    return;
  }

  dom.spotAreaTabs.innerHTML = spotAreas
    .map((area) => `
      <button class="spot-category-tab ${state.spotArea === area.id ? "active" : ""}" data-area="${escapeHtml(area.id)}" type="button">
        <span>${escapeHtml(area.label)}</span>
        <strong>${getAreaCount(area.id)}</strong>
      </button>
    `)
    .join("");

  dom.spotAreaTabs.querySelectorAll("[data-area]").forEach((button) => {
    button.addEventListener("click", () => {
      state.spotArea = button.dataset.area;
      state.spotPage = 0;
      renderSpotGrid();
      renderSpotAreaTabs();
      renderSpotCategoryTabs();
    });
  });
}

function renderSpotCategoryTabs() {
  if (!dom.spotCategoryTabs) {
    return;
  }

  dom.spotCategoryTabs.innerHTML = spotCategories
    .map((category) => `
      <button class="spot-category-tab ${state.spotCategory === category.id ? "active" : ""}" data-category="${category.id}" type="button">
        <span>${category.label}</span>
        <strong>${getCategoryCount(category.id)}</strong>
      </button>
    `)
    .join("");

  dom.spotCategoryTabs.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.spotCategory = button.dataset.category;
      state.spotPage = 0;
      renderSpotGrid();
      renderSpotAreaTabs();
      renderSpotCategoryTabs();
    });
  });
}

const SPOTS_PER_PAGE = 10;

function renderSpotGrid() {
  const list = spots.filter(matchesFilters);
  const totalPages = Math.max(1, Math.ceil(list.length / SPOTS_PER_PAGE));
  if (state.spotPage >= totalPages) {
    state.spotPage = totalPages - 1;
  }
  const pageList = list.slice(state.spotPage * SPOTS_PER_PAGE, (state.spotPage + 1) * SPOTS_PER_PAGE);

  dom.spotGrid.innerHTML = pageList
    .map((spot) => {
      const selectedDay = Object.keys(state.plan).find((day) => state.plan[Number(day)].includes(spot.id));
      const isSelected = Boolean(selectedDay);
      const buttonLabel = isSelected ? `已加入 Day ${selectedDay}` : `＋ 加入 Day ${state.selectedDay}`;
      const logistics = getSpotLogistics(spot.id);
      const quickHours = logistics?.hours ? `<p class="spot-extra">常見營業：${logistics.hours}</p>` : "";
      const quickDrive = `<p class="spot-extra">${getDriveInfoForStop(state.selectedDay, 0, spot.id)}</p>`;
      return `
        <article class="spot-card ${isSelected ? "selected" : ""}" data-spot="${spot.id}" draggable="${isSelected ? "false" : "true"}">
          <div class="spot-top">
            <div>
              <h3>${spot.name}</h3>
              <p class="spot-desc">${spot.desc}</p>
              ${quickHours}
              ${quickDrive}
              <a class="map-link" href="${getMapUrl(spot)}" target="_blank" rel="noopener noreferrer">Google Maps 導航</a>
            </div>
            <span class="tag">${spot.time}</span>
          </div>
          <div class="place-meta">
            <span class="tag">${spot.area}</span>
            <span class="tag">${spot.type}</span>
            <span class="tag">${spot.highlight}</span>
          </div>
          <div class="stop-actions">
            <button class="small-button alt" data-add="${spot.id}" ${isSelected ? "disabled" : ""}>${buttonLabel}</button>
            <button class="small-button" data-pin="${spot.id}">看概覽</button>
          </div>
        </article>
      `;
    })
    .join("");

  if (!list.length) {
    dom.spotGrid.innerHTML = `
      <div class="stop-card">
        <div class="stop-top">
          <div>
            <h3>沒有找到符合條件的景點</h3>
            <p class="stop-desc">可以換個地區、類型或關鍵字再找一次。</p>
          </div>
        </div>
      </div>
    `;
    dom.spotPagination.innerHTML = "";
    return;
  }

  // 分頁控制列
  dom.spotPagination.innerHTML = `
    <button class="page-btn" id="spot-prev" ${state.spotPage === 0 ? "disabled" : ""}>&#8249;</button>
    <span class="page-info">${state.spotPage + 1} / ${totalPages}</span>
    <button class="page-btn" id="spot-next" ${state.spotPage >= totalPages - 1 ? "disabled" : ""}>&#8250;</button>
  `;
  document.getElementById("spot-prev").addEventListener("click", () => {
    if (state.spotPage > 0) { state.spotPage--; renderSpotGrid(); }
  });
  document.getElementById("spot-next").addEventListener("click", () => {
    if (state.spotPage < totalPages - 1) { state.spotPage++; renderSpotGrid(); }
  });

  dom.spotGrid.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      addSpotToDay(button.dataset.add, state.selectedDay);
    });
  });

  dom.spotGrid.querySelectorAll("[data-pin]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.focusId = button.dataset.pin;
      state.summaryMode = "spot";
      render();
      revealSpotDetails();
    });
  });

  dom.spotGrid.querySelectorAll(".spot-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if ((event.target).closest("button, a")) return;
      state.focusId = card.dataset.spot;
      state.summaryMode = "spot";
      renderSummary();
      revealSpotDetails();
    });

    card.addEventListener("dragstart", (event) => {
      if (card.getAttribute("draggable") !== "true") {
        event.preventDefault();
        return;
      }
      state.dragging = card.dataset.spot;
      card.classList.add("dragging");
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData("application/x-hokkaido-spot", card.dataset.spot);
      event.dataTransfer.setData("text/plain", card.dataset.spot);
    });

    card.addEventListener("dragend", () => {
      state.dragging = null;
      card.classList.remove("dragging");
      dom.dayTabs.querySelectorAll(".drop-target").forEach((dropButton) => dropButton.classList.remove("drop-target"));
      dom.itineraryList.classList.remove("drop-target");
    });
  });
}

function renderSummary() {
  document.getElementById("back-to-day").hidden = state.summaryMode === "day";
  const focus = spotById(state.focusId) || spots[0];
  const logistics = getSpotLogistics(focus.id);
  const uniqueAreas = new Set(
    Object.values(state.plan)
      .flat()
      .map((id) => spotById(id)?.area)
      .filter(Boolean)
  );

  dom.metricDays.textContent = String(Object.keys(state.plan).length);
  dom.metricSpots.textContent = String(spots.length);
  dom.metricSeason.textContent = winterProfile.label;
  dom.focusArea.textContent = [...uniqueAreas].slice(0, 3).join(" / ") || "尚未開始排程";
  dom.focusCopy.textContent = "12/23～1/1。從新千歲機場入境，旭川 1 天；札幌 6 天；洞爺湖 1 天，函館 2 天。";
  dom.styleValue.textContent = winterProfile.style;
  dom.routeValue.textContent = winterProfile.route;
  dom.carModelValue.textContent = fixedCarModel;
  if (state.dirty) {
    dom.updatedValue.textContent = "尚未儲存";
  } else {
    dom.updatedValue.textContent = formatSavedAt(state.lastSavedAt) || "尚未儲存";
  }

  if (state.summaryMode === "day") {
    const day = state.selectedDay;
    const daySpots = (state.plan[day] || []).map((id) => spotById(id)).filter(Boolean);
    const dayAreas = [...new Set(daySpots.map((spot) => spot.area))];
    const meals = state.mealPlan[day] || {};
    const mealSlots = getMealSlotsForDay(day);
    const arrangedMeals = mealSlots.filter((slot) => meals[slot.id]?.primaryId).length;

    if (dom.focusTag) {
      dom.focusTag.textContent = "當日行程";
    }
    dom.focusTitle.textContent = `Day ${day} · ${tripDates[day - 1]}`;
    dom.focusDesc.textContent = daySpots.length
      ? (day === 2 && isDayTwoBackup()
          ? "Plan B：假設美瑛、富良野方向因火山活動或道路管制無法通行，從旭川出發，途中在砂川 Highway Oasis 休息補給，再前往白色戀人公園，晚上到薄野吃飯。"
          : JSON.stringify(state.plan[day]) === JSON.stringify(winterTemplate[day])
            ? daySummaries[day]
            : `從${dayBaseAreas[day]}出發，安排${dayAreas.join("、")}共 ${daySpots.length} 個點位，包含${[...new Set(daySpots.map((spot) => spot.type))].slice(0, 3).join("、")}。`)
      : "這天還沒有安排景點，可以從左側清單加入。";
    dom.focusMeta.innerHTML = `
      <span class="tag">${dayBaseAreas[day] || "未設定起點"} 出發</span>
      <span class="tag">${daySpots.length} 個點位</span>
      <span class="tag">餐食 ${arrangedMeals}/${mealSlots.length}</span>
    `;

    if (dom.focusPractical) {
      dom.focusPractical.innerHTML = `
        <details class="day-route-details"><summary>查看 ${daySpots.length} 個點位的順序</summary><p>${daySpots.map((spot) => escapeHtml(spot.name)).join(" → ") || "尚未安排景點"}</p></details>
      `;
    }
  } else {
    if (dom.focusTag) {
      dom.focusTag.textContent = "景點詳情";
    }
    dom.focusTitle.textContent = focus.name;
    dom.focusDesc.textContent = focus.desc;
    dom.focusMeta.innerHTML = `
      <span class="tag">${focus.area}</span>
      <span class="tag">${focus.type}</span>
      <span class="tag">${focus.best}</span>
      <span class="tag">建議停留 ${focus.time}</span>
    `;

    if (dom.focusPractical) {
      dom.focusPractical.innerHTML = logistics
        ? `
          <p><strong>常見營業：</strong>${logistics.hours}</p>
          <p><strong>交通建議：</strong>${logistics.access}</p>
          <p><strong>${getDriveInfoForFocus()}</strong></p>
          <p><a class="map-link" href="${getMapUrl(focus)}" target="_blank" rel="noopener noreferrer">Google Maps 導航（${focus.name}）</a></p>
          <p>提醒：營業時間與交通班次可能因季節調整，請以官方最新公告為準。</p>
        `
        : `
          <p><strong>${getDriveInfoForFocus()}</strong></p>
          <p><a class="map-link" href="${getMapUrl(focus)}" target="_blank" rel="noopener noreferrer">Google Maps 導航（${focus.name}）</a></p>
          <p>提醒：此景點尚未補齊營業與交通資訊，可先用地圖快速確認當日資訊。</p>
        `;
    }
  }

  if (dom.changeLogGrid) {
    if (!state.changeLog.length) {
      dom.changeLogGrid.innerHTML = `
        <article class="change-log-card">
          <p class="change-log-main">尚無雲端變更紀錄</p>
          <p class="change-log-sub">啟用同步後，會顯示最近編輯內容與版本。</p>
        </article>
      `;
    } else {
      const previousDetails = dom.changeLogGrid.querySelector(".change-log-details");
      const wasOpen = Boolean(previousDetails?.open);
      const visibleChanges = state.changeLog.slice(0, 4);
      const olderChanges = state.changeLog.slice(4);
      const renderChangeLogCard = (item, index) => {
        const candidateTime = typeof item?.at === "number" && Number.isFinite(item.at) ? new Date(item.at) : null;
        const timeText = candidateTime && !Number.isNaN(candidateTime.getTime())
          ? formatSavedAt(candidateTime.toISOString())
          : "時間未知";
        const summary = typeof item?.summary === "string" ? item.summary.slice(0, 80) : "更新行程";
        return `
          <article class="change-log-card">
            <p class="change-log-main">v${Math.max(cloud.version - index, 1)} ${escapeHtml(summary)}</p>
            <p class="change-log-sub">${timeText}</p>
          </article>
        `;
      };

      const olderChangesHtml = olderChanges.length
        ? `
          <details class="change-log-details"${wasOpen ? " open" : ""}>
            <summary class="change-log-summary">
              <span>查看較早紀錄</span>
              <span class="change-log-count">${olderChanges.length} 筆</span>
            </summary>
            <div class="change-log-more-list">
              ${olderChanges.map((item, index) => renderChangeLogCard(item, index + 4)).join("")}
            </div>
          </details>
        `
        : "";

      dom.changeLogGrid.innerHTML = `${visibleChanges.map(renderChangeLogCard).join("")}${olderChangesHtml}`;
    }
  }

  dom.stayGrid.innerHTML = accommodations
    .map((hotel) => `
      <article class="stay-card">
        <span class="stay-label">${hotel.label}</span>
        <h3>${hotel.name}</h3>
        <p>${hotel.note}</p>
        <a class="map-link" href="${getAccommodationMapUrl(hotel)}" target="_blank" rel="noopener noreferrer">Google Maps 導航</a>
      </article>
    `)
    .join("");
}

function getAccommodationForDay(day) {
  if (day === 1) return accommodations[0];
  if (day >= 2 && day <= 6) return accommodations[1];
  if (day === 7) return accommodations[2];
  if (day === 8 || day === 9) return accommodations[3];
  return null;
}

function renderPrintReport() {
  if (!dom.printReport) {
    return;
  }

  const generatedAt = new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());

  const accommodationCards = accommodations
    .map((hotel) => `
      <article class="print-hotel">
        <span>${escapeHtml(hotel.label)}</span>
        <strong>${escapeHtml(hotel.name)}</strong>
        <small>${escapeHtml(hotel.note)}</small>
      </article>
    `)
    .join("");

  const dayPages = tripDates
    .map((date, index) => {
      const day = index + 1;
      const daySpots = (state.plan[day] || []).map((id) => spotById(id)).filter(Boolean);
      const dayAreas = [...new Set(daySpots.map((spot) => spot.area))];
      const hotel = getAccommodationForDay(day);
      const meals = state.mealPlan[day] || {};

      const stopsHtml = daySpots.length
        ? daySpots
            .map((spot, spotIndex) => `
              <li class="print-stop">
                <span class="print-stop-number">${spotIndex + 1}</span>
                <div class="print-stop-copy">
                  <h3>${escapeHtml(spot.name)}</h3>
                  <p>${escapeHtml(spot.area)} · ${escapeHtml(spot.type)} · ${escapeHtml(spot.time)}</p>
                  <small>${escapeHtml(getDriveInfoForStop(day, spotIndex, spot.id))}</small>
                </div>
                <a href="${getMapUrl(spot)}">地圖</a>
              </li>
            `)
            .join("")
        : `<li class="print-empty">尚未安排景點</li>`;

      const mealsHtml = getMealSlotsForDay(day)
        .map((slot) => {
          const entry = meals[slot.id] || createMealEntry(slot.id);
          const primary = spotById(entry.primaryId);
          const backup = spotById(entry.backupId);
          const details = [
            primary?.name || "尚未安排",
            backup ? `備選：${backup.name}` : "",
            entry.note || ""
          ].filter(Boolean);
          return `
            <div class="print-meal">
              <strong>${escapeHtml(slot.label)} ${escapeHtml(entry.time || slot.defaultTime)}</strong>
              <span>${escapeHtml(details.join(" · "))}</span>
            </div>
          `;
        })
        .join("");

      return `
        <article class="print-day">
          <header class="print-day-head">
            <div>
              <span>DAY ${day}</span>
              <h2>${escapeHtml(date)} · ${escapeHtml(dayAreas.join(" / ") || dayBaseAreas[day] || "待安排")}</h2>
            </div>
            <p>${daySpots.length} 個點位</p>
          </header>

          <ol class="print-stop-list">${stopsHtml}</ol>

          <section class="print-day-footer">
            <div class="print-meals">
              <h3>餐食安排</h3>
              ${mealsHtml || `<p>當日無餐食欄位</p>`}
            </div>
            <div class="print-night">
              <h3>${hotel ? "今晚住宿" : "當日安排"}</h3>
              <strong>${hotel ? escapeHtml(hotel.name) : "函館機場返程"}</strong>
              <span>${hotel ? escapeHtml(hotel.note) : "請預留報到與安檢時間"}</span>
            </div>
          </section>
        </article>
      `;
    })
    .join("");

  dom.printReport.innerHTML = `
    <header class="print-cover">
      <div class="print-cover-top">
        <span class="print-kicker">HOKKAIDO WINTER TRIP</span>
        <span>12/23 - 1/1</span>
      </div>
      <h1>北海道冬季行程</h1>
      <p>從新千歲機場入境，旭川 1 天；札幌 6 天；洞爺湖 1 天，函館 2 天。</p>

      <div class="print-stats">
        <div><span>行程</span><strong>10 天</strong></div>
        <div><span>人數</span><strong>4 人</strong></div>
        <div><span>交通</span><strong>自駕</strong></div>
        <div><span>車型</span><strong>${escapeHtml(fixedCarModel)}</strong></div>
      </div>

      <div class="print-route">
        <span>新千歲</span><b>→</b><span>旭川／富良野</span><b>→</b><span>札幌／小樽</span><b>→</b><span>洞爺湖</span><b>→</b><span>函館</span>
      </div>

      <section class="print-hotels">
        <h2>住宿安排</h2>
        <div>${accommodationCards}</div>
      </section>

      <footer>行程快照產生於 ${escapeHtml(generatedAt)}</footer>
    </header>
    ${dayPages}
  `;
}

function printPlanAsPdf() {
  renderPrintReport();
  const previousTitle = document.title;
  document.title = "北海道冬季行程_12-23至01-01";
  dom.printReport?.setAttribute("aria-hidden", "false");

  window.addEventListener("afterprint", () => {
    document.title = previousTitle;
    dom.printReport?.setAttribute("aria-hidden", "true");
  }, { once: true });

  window.requestAnimationFrame(() => window.print());
}

function render() {
  renderDayAlternative();
  renderDayTabs();
  renderMealPlanner();
  renderItinerary();
  renderSpotAreaTabs();
  renderSpotCategoryTabs();
  renderSpotGrid();
  renderSummary();
}

function revealSpotDetails() {
  if (window.matchMedia("(max-width: 640px)").matches) {
    document.getElementById("focus-card").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  }
}

function positionDaySummary() {
  const card = document.getElementById("focus-card");
  const mobileHost = document.getElementById("mobile-day-summary");
  const desktopHost = document.querySelector(".detail-panel");
  if (window.matchMedia("(max-width: 640px)").matches) {
    mobileHost.appendChild(card);
  } else {
    desktopHost.insertBefore(card, desktopHost.querySelector(".change-log-section"));
  }
}

function bindGlobalEvents() {
  positionDaySummary();
  window.matchMedia("(max-width: 640px)").addEventListener("change", positionDaySummary);
  document.getElementById("back-to-day").addEventListener("click", () => {
    state.summaryMode = "day";
    renderSummary();
  });
  dom.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    state.spotPage = 0;
    renderSpotGrid();
  });

  dom.savePlanBtn?.addEventListener("click", persistState);
  dom.printPlanBtn?.addEventListener("click", printPlanAsPdf);
  window.addEventListener("beforeprint", renderPrintReport);
  dom.connectSyncBtn?.addEventListener("click", () => connectCloudSync(dom.syncCodeInput?.value));
  dom.syncCodeInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      connectCloudSync(dom.syncCodeInput?.value);
    }
  });

  window.addEventListener("beforeunload", (event) => {
    if (!state.dirty) {
      return;
    }
    event.preventDefault();
    event.returnValue = "";
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      persistState();
    }
  });

  document.getElementById("reset-plan-btn")?.addEventListener("click", resetToDefaultPlan);
}

bindGlobalEvents();
render();
updateSaveUi();
updateSyncUi();

if (state.syncCode) {
  connectCloudSync(state.syncCode);
} else {
  setSyncStatus("未啟用");
}
