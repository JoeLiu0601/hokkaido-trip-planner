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
    id: "sunagawa-sa",
    name: "砂川 SA 休息站",
    area: "道央道",
    type: "休息補給",
    season: ["winter"],
    time: "1h",
    best: "午餐、上廁所、補給、長途中繼",
    desc: "新千歲開往旭川途中很適合作為休息點，吃點熱食、買飲料，也能讓第一天剛下飛機的節奏不要太趕。",
    highlight: "路上找吃的"
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

  // 余市
  {
    id: "nikka-distillery",
    name: "NIKKA 威士忌余市蒸餾所",
    area: "余市",
    type: "釀造所見學",
    season: ["winter"],
    time: "2h",
    best: "威士忌試飲、廠區散步、建築",
    desc: "日本最具代表性的威士忌蒸餾所，免費入場、可試飲，廠區非常漂亮，搭配小樽一起排最順。",
    highlight: "威士忌名所"
  },
  {
    id: "yoichi-fishing-port",
    name: "余市漁港海鮮市場",
    area: "余市",
    type: "海鮮市場",
    season: ["winter"],
    time: "1.5h",
    best: "螃蟹、牡蠣、在地海味",
    desc: "余市港邊有幾間海鮮直賣店，冬天的牡蠣和螃蟹品質很高，價格比小樽觀光區親民許多。",
    highlight: "在地海味"
  },
  {
    id: "kakizaki-store",
    name: "柿崎商店",
    area: "余市",
    type: "海鮮食堂",
    season: ["winter"],
    time: "1h",
    best: "海鮮丼、性價比、在地人也去",
    desc: "余市在地人也愛去的海鮮食堂，二樓可以吃到現撈海鮮丼，份量大、CP 值極高。",
    highlight: "CP 值爆表"
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
    id: "jingisukan",
    name: "成吉思汗烤羊肉",
    area: "札幌",
    type: "在地美食",
    season: ["winter"],
    time: "1.5h",
    best: "羊肉、北海道啤酒、居酒屋氣氛",
    desc: "北海道最代表性的肉料理，推薦薄野周邊的だるま或さっぽろジンギスカン，配生啤非常對味。",
    highlight: "北海道必吃"
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
    id: "hanamaru-miredo",
    name: "根室花まる miredo 店",
    area: "札幌",
    type: "迴轉壽司",
    season: ["winter"],
    time: "1.5h",
    best: "チ・カ・ホ直結、赤れんが周邊、午晚餐",
    desc: "位在大同生命札幌ビル miredo B1F，從札幌站到大通之間的地下步行空間可直結。比車站樓上動線更分散，適合市中心逛街中插入。",
    highlight: "地下步行空間"
  },
  {
    id: "hanamaru-cocono-susukino",
    name: "根室花まる COCONO SUSUKINO 店",
    area: "札幌",
    type: "迴轉壽司",
    season: ["winter"],
    time: "1.5h",
    best: "薄野中心、發券候位、晚餐備案",
    desc: "位在 COCONO SUSUKINO B1F，薄野住宿或晚上活動時很順。店頭發券後可用手機看等待狀況，適合先取號再去附近逛。",
    highlight: "薄野方便"
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
    id: "shiki-hanamaru-susukino",
    name: "町のすし家 四季花まる すすきの店",
    area: "札幌",
    type: "壽司店",
    season: ["winter"],
    time: "1.5h",
    best: "薄野、可預約、壽司晚餐",
    desc: "位在薄野 Recolte Sapporo 2F，適合晚上想吃花まる系但不一定想排迴轉壽司時使用。可預約，對多人或晚餐比較友善。",
    highlight: "薄野可預約"
  },
  {
    id: "shiki-hanamaru-kitaguchi",
    name: "寿司と炉端焼 四季花まる 北口店",
    area: "札幌",
    type: "壽司居酒屋",
    season: ["winter"],
    time: "1.5h",
    best: "札幌站北口、壽司、爐端燒、可預約",
    desc: "札幌站北口附近的花まる系店，除了壽司也有爐端燒與居酒屋感料理。適合想吃海鮮但不要純迴轉壽司的晚上。",
    highlight: "札幌站北口"
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
    best: "平價雜貨、旅行小物、地下街順逛",
    desc: "札幌地下街 Pole Town 的 3COINS，位置在大通到薄野之間，適合和 KINOTOYA BAKE、狸小路、薄野美食一起排。",
    highlight: "Pole Town 分店"
  },
  {
    id: "3coins-aurora-town",
    name: "3COINS OOOPS! 札幌 Aurora Town 店",
    area: "札幌",
    type: "生活雜貨",
    season: ["winter"],
    time: "0.5h",
    best: "小物、配件、地下街避雪",
    desc: "位在札幌地下街 Aurora Town 地下 1 樓，靠近大通站與大通公園，適合放在市區散步或雪天室內逛街備案。",
    highlight: "Aurora Town 分店"
  },
  {
    id: "3coins-apia",
    name: "3COINS 札幌 APIA 店",
    area: "札幌",
    type: "生活雜貨",
    season: ["winter"],
    time: "0.5h",
    best: "札幌站直結、旅行補貨、雜貨",
    desc: "位在 JR 札幌站 APIA 地下街，適合搭車前後或回飯店路上順手補旅行小物，不用特地繞路。",
    highlight: "札幌站直結"
  },
  {
    id: "3coins-naebo",
    name: "3COINS +plus Aeon Mall 札幌苗穗店",
    area: "札幌",
    type: "生活雜貨",
    season: ["winter"],
    time: "0.5h",
    best: "大型商場、雜貨、啤酒博物館周邊",
    desc: "位在 Aeon Mall 札幌苗穗 1 樓，和札幌啤酒博物館、Ario 札幌同區域，適合作為東區商場備案。",
    highlight: "苗穗商場分店"
  },
  {
    id: "3coins-hassamu",
    name: "3COINS +plus Aeon Mall 札幌發寒店",
    area: "札幌",
    type: "生活雜貨",
    season: ["winter"],
    time: "0.5h",
    best: "大型商場、停車方便、雜貨",
    desc: "位在 Aeon Mall 札幌發寒 2 樓，適合自駕或西側行程順路補貨，停車與室內逛街都比較安心。",
    highlight: "發寒商場分店"
  },
  {
    id: "3coins-shin-sapporo",
    name: "3COINS +plus 新札幌 Sunpiazza 店",
    area: "札幌",
    type: "生活雜貨",
    season: ["winter"],
    time: "0.5h",
    best: "新札幌站周邊、室內商場、雜貨",
    desc: "位在新札幌 Sunpiazza B1F，適合東側移動或搭 JR/地鐵經過新札幌時順路逛。",
    highlight: "新札幌分店"
  },
  {
    id: "3coins-hiraoka",
    name: "3COINS +plus Aeon Mall 札幌平岡店",
    area: "札幌",
    type: "生活雜貨",
    season: ["winter"],
    time: "0.5h",
    best: "大型商場、自駕補貨、生活用品",
    desc: "位在 Aeon Mall 札幌平岡 1 樓，離市中心較遠，適合自駕路線剛好經過清田/平岡方向時再安排。",
    highlight: "平岡商場分店"
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
  }
];

const winterTemplate = {
  1: ["new-chitose-airport", "nippon-rentacar-new-chitose", "sunagawa-sa", "premier-cabin-asahikawa", "tokiwa-park", "kamikawa-shrine", "asahikawa-heiwa-dori"],
  2: ["furano-field", "biei-shrine", "hinode-park", "ningle-terrace", "sapporo-odori", "sapporo-susukino"],
  3: ["sapporo-fushimi-inari", "hokkaido-shrine", "otaru-inari-shrine", "teine-shrine", "wakadori-naruto-honten", "otaru-canal", "taisho-glass", "otaru-meruhen-crossing"],
  4: ["noboribetsu-valley", "muroran-hakucho-bridge-view", "happiness-bell"],
  5: ["moiwa-yama"],
  6: ["sapporo-beer-museum", "ario-sapporo", "3coins-naebo", "toriton-kita8", "kinotoya-bake-pole-town", "3coins-pole-town", "3coins-aurora-town", "3coins-apia", "ramen-haruka"],
  7: ["toyako-lake", "makkari-village", "silo-observatory", "konpira-crater-view"],
  8: ["goryokaku"],
  9: ["kanemori-warehouse", "hakodate-hachimangu", "hakodate-gokoku-shrine", "hakodate-mt"],
  10: ["morning-market", "motomachi", "hakodate-airport"]
};

const winterProfile = {
  label: "12/23-1/1",
  blurb: "新千歲入境，旭川與富良野 1 天；札幌 6 天（含小樽、余市）；洞爺湖 1 天，函館跨年 2 天",
  route: "除函館那天還車，其餘天數都開車",
  style: "冬季限定"
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
  "sunagawa-sa": {
    hours: "下行餐飲/商店冬季常見 09:00-19:00；上行冬季常見 09:00-19:00",
    access: "新千歲往旭川走道央道時可順路停靠，適合午餐、補給與上廁所"
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
  "hanamaru-miredo": {
    hours: "常見 11:00-22:00",
    access: "地址：札幌市中央区北3条西3丁目1 大同生命札幌ビル miredo B1F。チ・カ・ホ地下步行空間直結，札幌站到大通之間最順"
  },
  "hanamaru-cocono-susukino": {
    hours: "常見 11:00-21:00（L.O. 20:30）；發券機常見 10:00 開始",
    access: "地址：札幌市中央区南4条西4丁目1-1 COCONO SUSUKINO B1F。薄野站旁；店頭發券後可用手機確認等待狀況"
  },
  "shiki-hanamaru-tokeidai": {
    hours: "日-四/祝 11:00-22:00（L.O. 21:30）；五六/祝前 11:00-23:00（L.O. 22:30）；平日午餐 11:00-15:00",
    access: "地址：札幌市中央区北1条西2丁目1 札幌時計台ビル1F。大通站步行約 3 分鐘；部分時段可電話預約"
  },
  "shiki-hanamaru-susukino": {
    hours: "月-四 11:00-15:00、17:00-22:00；五/祝前至 23:00；六 11:00-23:00；日祝 11:00-22:00",
    access: "地址：札幌市中央区南4条西2丁目2-4 レコルトサッポロ 2F。薄野周邊步行可達；可預約，適合晚餐備案"
  },
  "shiki-hanamaru-kitaguchi": {
    hours: "營業時間與定休日依官方店鋪公告；建議出發前確認",
    access: "地址：札幌市北区北7条西1丁目2-6 NCO札幌 B1F。札幌站北口周邊；花まる系中偏壽司居酒屋，可預約"
  },
  "ramen-haruka": {
    hours: "常見 11:00-14:30、17:00-23:00；賣完可能提前結束，週二晚/週三午常見休息",
    access: "地址：札幌市中央区南5条西3丁目 N・グランデビル1F 元祖ラーメン横丁内，薄野站周邊步行可達"
  },
  "kinotoya-bake-pole-town": {
    hours: "常見 10:00-21:00（L.O. 20:45）；休業日同 Pole Town",
    access: "地址：札幌市中央区南2条西3丁目 さっぽろ地下街ポールタウン内。大通、狸小路、薄野都可步行串遊"
  },
  "3coins-pole-town": {
    hours: "常見 10:00-20:00；以札幌地下街公告為準",
    access: "地址：札幌市中央区南2条西3丁目 札幌地下街ポールタウン B1F。大通到薄野地下街順路"
  },
  "3coins-aurora-town": {
    hours: "常見 10:00-20:00；以札幌地下街公告為準",
    access: "地址：札幌市中央区大通西2丁目 札幌地下街オーロラタウン B1F。大通站、大通公園旁"
  },
  "3coins-apia": {
    hours: "常見 10:00-21:00；以 APIA 公告為準",
    access: "地址：札幌市中央区北5条西3丁目 JRタワースクエア札幌アピア B1F。JR/地鐵札幌站直結"
  },
  "3coins-naebo": {
    hours: "商場常見 10:00-21:00；以 Aeon Mall 札幌苗穗公告為準",
    access: "地址：札幌市東区東苗穂2条3丁目1-1 イオンモール札幌苗穂 1F。札幌啤酒博物館/Ario 一帶自駕可順路"
  },
  "3coins-hassamu": {
    hours: "商場常見 10:00-21:00；以 Aeon Mall 札幌發寒公告為準",
    access: "地址：札幌市西区発寒8条12丁目1 イオンモール札幌発寒 2F。適合自駕或西側路線順路"
  },
  "3coins-shin-sapporo": {
    hours: "商場常見 10:00-21:00；以 Sunpiazza 公告為準",
    access: "地址：札幌市厚別区厚別中央2条5丁目7番 サンピアザ B1F。JR/地鐵新札幌站周邊"
  },
  "3coins-hiraoka": {
    hours: "商場常見 10:00-21:00；以 Aeon Mall 札幌平岡公告為準",
    access: "地址：札幌市清田区平岡3条5-3-1 イオンモール札幌平岡 1F。偏郊區，自駕順路再排"
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
  "nikka-distillery": {
    hours: "常見約 09:00-16:00（最後入場提前）",
    access: "JR 余市站步行約 5-10 分鐘"
  },
  "kakizaki-store": {
    hours: "常見約 10:00-19:00（食堂常提早結束）",
    access: "JR 余市站步行可達，尖峰時段需排隊"
  },
  "moiwa-yama": {
    hours: "纜車常見 10:30-22:00（最終上山提前）",
    access: "市電轉接駁巴士或計程車最順"
  },
  "toyako-lake": {
    hours: "湖畔散步全天可走；遊船/設施依季節營運",
    access: "自駕最方便，冬季注意風雪與能見度"
  },
  "yotei-mountain": {
    hours: "觀景點全天可停留",
    access: "建議自駕沿線觀景，雪況差時不要進山路"
  },
  "noboribetsu-valley": {
    hours: "步道常見白天較安全（夜間不建議）",
    access: "洞爺湖與札幌間可順路停留，自駕最彈性"
  },
  "muroran-hakucho-bridge-view": {
    hours: "展望區通常可自由停留；夜景與冬季路況需注意安全",
    access: "室蘭 IC 往白鳥大橋方向，自駕較方便；白鳥灣展望台也可由崎守站步行約 16 分鐘"
  },
  "happiness-bell": {
    hours: "戶外拍照點通常可自由停留；冬季以現場路況為準",
    access: "建議與室蘭白鳥大橋展望行程一起自駕短停"
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
  "hakodate-hachimangu": {
    hours: "境內全天開放；授與所多為白天時段",
    access: "可由函館市電末廣町/谷地頭轉步行或計程車"
  },
  "hakodate-mt": {
    hours: "纜車常見 10:00-22:00（季節調整）",
    access: "纜車站可搭巴士/計程車，跨年建議提早卡位"
  },
  "marui-imai-hakodate": {
    hours: "常見 10:00-18:30",
    access: "函館市電五稜郭公園前站步行可達，適合和五稜郭周邊同日安排"
  },
  "share-star-hakodate": {
    hours: "B1F-3F 店舖常見 10:00-20:00；1F Starbucks 常見 07:00-22:00",
    access: "函館市電五稜郭公園前站下車即達，本町商圈購物備案"
  },
  "kiralis-hakodate": {
    hours: "各店舖與設施不同，出發前看官方樓層/店舖公告",
    access: "函館站前，適合和函館朝市、還車、搭車前後串在一起"
  },
  "hakodate-gokoku-shrine": {
    hours: "社務所窗口常見 09:00-16:00 前後；境內參拜依現場公告",
    access: "函館山麓站出口步行約 3 分鐘，適合與元町/函館山夜景串遊"
  },
  "morning-market": {
    hours: "多數店家常見 05:00-14:00",
    access: "函館站步行約 2-5 分鐘"
  },
  "kanemori-warehouse": {
    hours: "多數店家常見 09:30-19:00",
    access: "函館站可步行或搭市電至十字街"
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
  "旭川|札幌": 130,
  "札幌|小樽": 45,
  "札幌|余市": 65,
  "札幌|札幌郊外": 55,
  "札幌|洞爺湖": 120,
  "札幌|登別": 95,
  "札幌|西部山區": 120,
  "札幌|二世谷": 130,
  "小樽|余市": 35,
  "余市|二世谷": 80,
  "洞爺湖|登別": 45,
  "洞爺湖|函館": 155,
  "洞爺湖|二世谷": 75,
  "洞爺湖|西部山區": 80,
  "函館|函館": 20,
  "函館|登別": 170
};

const storageKey = "hokkaido-trip-planner-plan";
const planTemplateVersionKey = "hokkaido-trip-planner-plan-template-version";
const currentPlanTemplateVersion = "2026-08-17-otaru-naruto";
const fixedCarModel = "VOXY";
const savedAtKey = "hokkaido-trip-planner-saved-at";
const syncCodeKey = "hokkaido-trip-planner-sync-code";
const syncClientIdKey = "hokkaido-trip-planner-sync-client-id";

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

function loadPlan() {
  const stored = window.localStorage.getItem(storageKey);
  if (!stored) {
    return createDefaultPlan();
  }

  try {
    if (window.localStorage.getItem(planTemplateVersionKey) !== currentPlanTemplateVersion) {
      return createDefaultPlan();
    }

    const parsed = JSON.parse(stored);
    const plan = Object.keys(winterTemplate).reduce((accumulator, key) => {
      const day = Number(key);
      accumulator[day] = Array.isArray(parsed[day]) ? parsed[day].filter((id) => spotById(id)) : [];
      return accumulator;
    }, {});

    const hasAnyStops = Object.values(plan).some((dayStops) => dayStops.length > 0);
    return hasAnyStops ? ensureRequiredStops(plan) : createDefaultPlan();
  } catch {
    return createDefaultPlan();
  }
}

function savePlan() {
  window.localStorage.setItem(storageKey, JSON.stringify(state.plan));
  window.localStorage.setItem(planTemplateVersionKey, currentPlanTemplateVersion);
}

function loadSavedAt() {
  return window.localStorage.getItem(savedAtKey) || "";
}

function loadSyncCode() {
  return window.localStorage.getItem(syncCodeKey) || "";
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
  spotCategory: "all",
  spotPage: 0,
  focusId: spots[0].id,
  plan: loadPlan(),
  dragging: null,
  carModel: fixedCarModel,
  dirty: false,
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
  focusTitle: document.getElementById("focus-title"),
  focusDesc: document.getElementById("focus-desc"),
  focusMeta: document.getElementById("focus-meta"),
  focusPractical: document.getElementById("focus-practical"),
  changeLogGrid: document.getElementById("change-log-grid"),
  stayGrid: document.getElementById("stay-grid"),
  savePlanBtn: document.getElementById("save-plan-btn"),
  exportPlanBtn: document.getElementById("export-plan-btn"),
  importPlanBtn: document.getElementById("import-plan-btn"),
  importPlanFile: document.getElementById("import-plan-file"),
  saveStatus: document.getElementById("save-status"),
  syncCodeInput: document.getElementById("sync-code-input"),
  connectSyncBtn: document.getElementById("connect-sync-btn"),
  syncStatus: document.getElementById("sync-status"),
  uiMessage: document.getElementById("ui-message")
};

let uiMessageTimer = null;

const cloud = {
  initialized: false,
  connecting: false,
  configured: false,
  db: null,
  modules: null,
  unsubscribe: null,
  activeCode: "",
  pendingTimer: null,
  applyingRemote: false,
  clientId: getOrCreateClientId(),
  version: 0
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
    .slice(0, 40);
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

  if (!isSyncConfigValid()) {
    cloud.configured = false;
    setSyncStatus("尚未設定（請先填 sync-config.js）");
    return false;
  }

  cloud.connecting = true;
  setSyncStatus("初始化中...");
  const config = window.HOKKAIDO_SYNC_CONFIG;

  try {
    const [{ initializeApp }, firestoreModule] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js")
    ]);

    const app = initializeApp(config);
    cloud.modules = firestoreModule;
    cloud.db = firestoreModule.getFirestore(app);
    cloud.initialized = true;
    cloud.configured = true;
    setSyncStatus("已就緒");
    return true;
  } catch {
    setSyncStatus("初始化失敗（請檢查 sync-config.js）");
    return false;
  } finally {
    cloud.connecting = false;
  }
}

function buildSyncPayload() {
  return {
    plan: state.plan,
    carModel: fixedCarModel,
    updatedAt: Date.now(),
    updatedBy: cloud.clientId
  };
}

function applyRemotePayload(payload) {
  const importedPlan = normalizeImportedPlan(payload?.plan || {});
  state.plan = importedPlan;
  state.carModel = fixedCarModel;
  state.selectedDay = 1;

  const hasFocus = Object.values(state.plan).some((dayList) => dayList.length > 0);
  const firstId = hasFocus ? Object.values(state.plan).flat()[0] : spots[0].id;
  state.focusId = firstId || spots[0].id;

  const savedIso = typeof payload?.updatedAt === "number" ? new Date(payload.updatedAt).toISOString() : new Date().toISOString();
  state.lastSavedAt = savedIso;
  state.dirty = false;
  cloud.version = typeof payload?.version === "number" ? payload.version : cloud.version;
  state.changeLog = Array.isArray(payload?.changes) ? payload.changes.slice(0, 4) : [];
  savePlan();
  window.localStorage.setItem(savedAtKey, state.lastSavedAt);
  render();
  updateSaveUi();
}

async function pushCloudState() {
  if (!cloud.initialized || !cloud.activeCode || cloud.applyingRemote) {
    return;
  }

  const { doc, runTransaction } = cloud.modules;
  const ref = doc(cloud.db, "tripPlans", cloud.activeCode);

  try {
    const changeItem = {
      at: Date.now(),
      by: getEditorLabel(),
      clientId: cloud.clientId,
      summary: state.pendingChangeSummary || "更新行程",
      detail: state.pendingChangeDetail || ""
    };

    const result = await runTransaction(cloud.db, async (transaction) => {
      const snapshot = await transaction.get(ref);
      const data = snapshot.exists() ? snapshot.data() : {};
      const currentVersion = typeof data?.version === "number" ? data.version : 0;
      const existingChanges = Array.isArray(data?.changes) ? data.changes : [];
      const nextVersion = currentVersion + 1;
      const nextChanges = [changeItem, ...existingChanges].slice(0, 30);

      transaction.set(ref, {
        ...buildSyncPayload(),
        version: nextVersion,
        changes: nextChanges
      }, { merge: true });

      return { version: nextVersion, changes: nextChanges };
    });

    cloud.version = result.version;
    state.changeLog = result.changes.slice(0, 4);
    state.lastSavedAt = new Date().toISOString();
    state.dirty = false;
    savePlan();
    window.localStorage.setItem(savedAtKey, state.lastSavedAt);
    updateSaveUi();
    setSyncStatus("同步完成");
  } catch (error) {
    console.error("Cloud sync push failed", error);
    setSyncStatus("同步失敗，稍後重試");
  }
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
    setUiMessage("同步代碼只接受英數、-、_", "warn");
    return;
  }

  if (trimmed !== code) {
    setUiMessage("同步代碼已自動修正為英數小寫格式", "info");
  }

  state.syncCode = code;
  window.localStorage.setItem(syncCodeKey, code);
  updateSyncUi();

  const ready = await ensureCloudInitialized();
  if (!ready) {
    return;
  }

  if (cloud.unsubscribe) {
    cloud.unsubscribe();
    cloud.unsubscribe = null;
  }

  const { doc, getDoc, onSnapshot } = cloud.modules;
  const ref = doc(cloud.db, "tripPlans", code);
  cloud.activeCode = code;
  setSyncStatus("連線中...");

  try {
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      cloud.applyingRemote = true;
      applyRemotePayload(snapshot.data());
      cloud.applyingRemote = false;
      setSyncStatus("已連線，自動同步中");
    } else {
      recordChange("建立雲端同步", `同步代碼：${code}`);
      await pushCloudState();
      setSyncStatus("已連線，已建立雲端資料");
    }
  } catch (error) {
    console.error("Cloud sync connection failed", error);
    setSyncStatus("連線失敗，請稍後重試");
    if (error?.code === "permission-denied") {
      setUiMessage("Firebase 規則拒絕讀寫，請先發布 firestore.rules", "warn");
    } else {
      setUiMessage("雲端連線失敗，請檢查網路或 Firebase 規則", "warn");
    }
    return;
  }

  cloud.unsubscribe = onSnapshot(ref, (docSnap) => {
    const data = docSnap.data();
    if (!docSnap.exists() || !data) {
      return;
    }

    const remoteVersion = typeof data.version === "number" ? data.version : 0;
    if (remoteVersion <= cloud.version && data.updatedBy === cloud.clientId) {
      return;
    }

    cloud.applyingRemote = true;
    applyRemotePayload(data);
    cloud.applyingRemote = false;
    setSyncStatus(`已同步到最新版本 v${remoteVersion}`);
  });
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
    version: 1,
    exportedAt: new Date().toISOString(),
    carModel: fixedCarModel,
    plan: state.plan
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

function applyWinterTemplate() {
  state.plan = createDefaultPlan();
  state.selectedDay = 1;
  state.focusId = state.plan[1][0] || spots[0].id;
  recordChange("套用冬季範本", "重置為 10 天預設行程");
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

function renderDayTabs() {
  const dates = ["12/23", "12/24", "12/25", "12/26", "12/27", "12/28", "12/29", "12/30", "12/31", "1/1"];
  dom.dayTabs.innerHTML = Array.from({ length: 10 }, (_, index) => {
    const day = index + 1;
    const places = state.plan[day].length;
    return `
      <button class="day-tab ${state.selectedDay === day ? "active" : ""}" data-day="${day}" data-drop-day="${day}">
        <strong>Day ${day} (${dates[index]})</strong>
        <span>${places} 個點位</span>
      </button>
    `;
  }).join("");

  dom.dayTabs.querySelectorAll("[data-day]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDay = Number(button.dataset.day);
      const firstSpot = state.plan[state.selectedDay][0];
      if (firstSpot) {
        state.focusId = firstSpot;
      }
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
      render();
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
  return matchesSpotCategory(spot) && (!term || [spot.name, spot.area, spot.type, spot.desc, spot.best, spot.highlight]
    .join(" ")
    .toLowerCase()
    .includes(term));
}

const spotCategories = [
  { id: "all", label: "全部" },
  { id: "sightseeing", label: "景點類" },
  { id: "shopping", label: "逛街購物" },
  { id: "food", label: "美食" }
];

const shoppingTypes = ["商店街", "百貨", "商場", "購物", "買物", "玻璃", "硝子", "街區地標", "堺町", "金森", "童話", "Stellar"];
const foodTypes = ["美食", "食堂", "市場", "海鮮", "餐", "壽司", "拉麵", "甜點", "炸雞"];
const utilityTypes = ["抵達點", "離境點", "取車", "入住飯店", "休息補給"];

function typeIncludes(spot, keywords) {
  return keywords.some((keyword) => spot.type.includes(keyword) || spot.name.includes(keyword));
}

function matchesSpotCategory(spot) {
  if (state.spotCategory === "all") {
    return true;
  }

  if (state.spotCategory === "shopping") {
    return typeIncludes(spot, shoppingTypes);
  }

  if (state.spotCategory === "food") {
    return typeIncludes(spot, foodTypes);
  }

  if (state.spotCategory === "sightseeing") {
    return !typeIncludes(spot, shoppingTypes)
      && !typeIncludes(spot, foodTypes)
      && !typeIncludes(spot, utilityTypes);
  }

  return true;
}

function getCategoryCount(categoryId) {
  const previousCategory = state.spotCategory;
  state.spotCategory = categoryId;
  const count = spots.filter(matchesSpotCategory).length;
  state.spotCategory = previousCategory;
  return count;
}

function renderSpotCategoryTabs() {
  if (!dom.spotCategoryTabs) {
    return;
  }

  dom.spotCategoryTabs.innerHTML = spotCategories
    .map((category) => `
      <button class="spot-category-tab ${state.spotCategory === category.id ? "active" : ""}" data-category="${category.id}">
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
            <p class="stop-desc">可以換個關鍵字再找一次。</p>
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
      render();
    });
  });

  dom.spotGrid.querySelectorAll(".spot-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if ((event.target).closest("button")) return;
      state.focusId = card.dataset.spot;
      renderSummary();
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
  dom.focusCopy.textContent = `目前是 4 人自駕，行程集中在 ${winterProfile.blurb}，除函館那天會還車，其餘天數都會開車。`;
  dom.styleValue.textContent = winterProfile.style;
  dom.routeValue.textContent = winterProfile.route;
  dom.carModelValue.textContent = fixedCarModel;
  if (state.dirty) {
    dom.updatedValue.textContent = "尚未儲存";
  } else {
    dom.updatedValue.textContent = formatSavedAt(state.lastSavedAt) || "尚未儲存";
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

  if (dom.changeLogGrid) {
    if (!state.changeLog.length) {
      dom.changeLogGrid.innerHTML = `
        <article class="change-log-card">
          <p class="change-log-main">尚無雲端變更紀錄</p>
          <p class="change-log-sub">啟用同步後，會顯示最近編輯內容與版本。</p>
        </article>
      `;
    } else {
      dom.changeLogGrid.innerHTML = state.changeLog
        .slice(0, 4)
        .map((item, index) => {
          const timeText = formatSavedAt(new Date(item.at || Date.now()).toISOString());
          const summary = item.summary || "更新行程";
          return `
            <article class="change-log-card">
              <p class="change-log-main">v${Math.max(cloud.version - index, 1)} ${summary}</p>
              <p class="change-log-sub">${timeText}</p>
            </article>
          `;
        })
        .join("");
    }
  }

  dom.stayGrid.innerHTML = accommodations
    .map((hotel) => `
      <article class="stay-card">
        <span class="stay-label">${hotel.label}</span>
        <h3>${hotel.name}</h3>
        <p>${hotel.note}</p>
      </article>
    `)
    .join("");
}

function render() {
  renderDayTabs();
  renderItinerary();
  renderSpotCategoryTabs();
  renderSpotGrid();
  renderSummary();
}

function bindGlobalEvents() {
  dom.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    state.spotPage = 0;
    renderSpotGrid();
  });

  dom.savePlanBtn?.addEventListener("click", persistState);
  dom.exportPlanBtn?.addEventListener("click", exportPlanAsJson);
  dom.importPlanBtn?.addEventListener("click", () => dom.importPlanFile?.click());
  dom.connectSyncBtn?.addEventListener("click", () => connectCloudSync(dom.syncCodeInput?.value));
  dom.syncCodeInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      connectCloudSync(dom.syncCodeInput?.value);
    }
  });
  dom.importPlanFile?.addEventListener("change", async (event) => {
    const [file] = event.target.files || [];
    await importPlanFromFile(file);
    event.target.value = "";
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

  document.querySelector('[data-action="apply-winter"]').addEventListener("click", applyWinterTemplate);
  document.querySelector('[data-action="focus-sapporo"]').addEventListener("click", () => {
    state.focusId = "moiwa-yama";
    state.selectedDay = 4;
    render();
  });

  document.querySelector('[data-action="focus-hakodate"]').addEventListener("click", () => {
    state.focusId = "hakodate-mt";
    state.selectedDay = 10;
    render();
  });
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
